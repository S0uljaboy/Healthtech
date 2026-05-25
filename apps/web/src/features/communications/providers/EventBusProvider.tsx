'use client';

import React, { createContext, useContext, useEffect } from 'react';

type EventType = 
  | 'observation.created'
  | 'risk.escalated'
  | 'ai.completed'
  | 'notification.created'
  | 'timeline.updated';

interface EventBusContextType {
  emit: (event: EventType, payload: any) => void;
  subscribe: (event: EventType, callback: (payload: any) => void) => () => void;
}

const EventBusContext = createContext<EventBusContextType | null>(null);

export const EventBusProvider = ({ children }: { children: React.ReactNode }) => {
  const listeners = React.useRef(new Map<EventType, Set<(payload: any) => void>>());

  const emit = React.useCallback((event: EventType, payload: any) => {
    console.log(`[EventBus] ${event}`, payload);
    const callbacks = listeners.current.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(payload));
    }
  }, []);

  const subscribe = React.useCallback((event: EventType, callback: (payload: any) => void) => {
    if (!listeners.current.has(event)) {
      listeners.current.set(event, new Set());
    }
    listeners.current.get(event)!.add(callback);

    return () => {
      listeners.current.get(event)?.delete(callback);
    };
  }, []);

  return (
    <EventBusContext.Provider value={{ emit, subscribe }}>
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = () => {
  const context = useContext(EventBusContext);
  if (!context) throw new Error('useEventBus must be used within EventBusProvider');
  return context;
};
