'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Topbar, Input } from '@healthtech/ui';
import { Search, Bell, AlertCircle, Calendar, MessageSquare, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useStudents } from '@/features/students/api/students-api';
import { useWebSocket } from '@/features/communications/providers/WebSocketProvider';

export function AppTopbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: students } = useStudents();
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useWebSocket();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside and handle Ctrl+K
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredStudents = students?.filter((s: any) => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5) || [];

  const SearchAction = (
    <div className="relative w-full" ref={searchRef}>
      <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
      <Input 
        id="global-search-input"
        placeholder="Buscar alunos (Ctrl+K)..." 
        className="pl-9 h-9 bg-zinc-900/50 border-zinc-800 w-full focus:ring-1 focus:ring-indigo-500 transition-all"
        onFocus={() => setIsSearchOpen(true)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-12 left-0 w-full md:w-[400px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-2 flex flex-col gap-1">
              {searchQuery.length === 0 ? (
                <div className="p-4 text-center text-zinc-500 text-sm">Digite para buscar alunos...</div>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student: any) => (
                  <Link 
                    key={student.id} 
                    href={`/students/${student.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {student.fullName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-200">{student.fullName}</span>
                      <span className="text-xs text-zinc-500">{student.classroom?.name || 'Sem Turma'}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-zinc-500 text-sm">Nenhum aluno encontrado.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const NotificationAction = (
    <div className="relative" ref={notifRef}>
      <button 
        onClick={() => setIsNotifOpen(!isNotifOpen)}
        className={`relative p-2 transition-colors rounded-full ${isNotifOpen ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-zinc-950 text-[10px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isNotifOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-12 right-0 w-[350px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
              <h3 className="font-semibold text-white">Notificações</h3>
              {unreadCount > 0 && (
                <button onClick={() => markAllAsRead()} className="text-xs text-indigo-400 hover:text-indigo-300">Marcar todas como lidas</button>
              )}
            </div>
            <div className="flex flex-col max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  Nenhuma notificação no momento.
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => markAsRead(n.id)}
                    className={`p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors flex gap-4 cursor-pointer ${!n.read ? 'bg-zinc-800/30' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      n.type === 'alert' ? 'bg-red-500/10' : 
                      n.type === 'message' ? 'bg-indigo-500/10' : 'bg-blue-500/10'
                    }`}>
                      {n.type === 'alert' ? <AlertCircle className="w-4 h-4 text-red-500" /> : 
                       n.type === 'message' ? <MessageSquare className="w-4 h-4 text-indigo-400" /> :
                       <Bell className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium ${!n.read ? 'text-white' : 'text-zinc-300'}`}>{n.title}</span>
                      <span className="text-xs text-zinc-400 mt-1 line-clamp-2">{n.message}</span>
                      <span className="text-xs text-zinc-600 mt-2">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-zinc-800 text-center bg-zinc-950/50">
              <button className="text-sm text-zinc-400 hover:text-white">Ver todas as notificações</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <Topbar 
      searchAction={SearchAction}
      notificationAction={NotificationAction}
    />
  );
}
