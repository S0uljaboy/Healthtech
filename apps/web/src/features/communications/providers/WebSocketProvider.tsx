'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { useEventBus } from '@/features/communications/providers/EventBusProvider';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'message';
  timestamp: string;
  read: boolean;
}

interface WebSocketContextType {
  socket: Socket | null;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const offlineQueue = React.useRef<any[]>([]);
  const { user } = useAuthStore();
  const { emit } = useEventBus();

  useEffect(() => {
    if (!user) return;

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('[WebSocket] Online - Reconnecting Queue...');
      setIsConnected(true);
      newSocket.emit('authenticate', { userId: user.id });
      
      // Flush offline queue
      while (offlineQueue.current.length > 0) {
        const item = offlineQueue.current.shift();
        newSocket.emit(item.event, item.payload);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('[WebSocket] Offline - Sync Stalled');
      setIsConnected(false);
    });

    newSocket.on('notification', (payload: Notification) => {
      console.log('[WebSocket] Orchestrator Received:', payload);
      setNotifications((prev) => [payload, ...prev].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      emit('notification.created', payload);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, emit]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    if (isConnected && socket) socket.emit('notification.read', { id });
    else offlineQueue.current.push({ event: 'notification.read', payload: { id } });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (isConnected && socket) socket.emit('notification.read_all');
    else offlineQueue.current.push({ event: 'notification.read_all', payload: {} });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <WebSocketContext.Provider value={{ socket, notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
