'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@healthtech/ui';
import { useEventBus } from '@/features/communications/providers/EventBusProvider';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { emit } = useEventBus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Simulate sending feedback through EventBus
    emit('notification.created', {
      id: `feedback_${Date.now()}`,
      title: 'Feedback Enviado',
      message: 'A equipe de suporte recebeu sua mensagem. Obrigado!',
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false,
    });

    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-6 md:bottom-6 z-50">
      {isOpen ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 w-80 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Ajuda & Suporte</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Encontrou um problema ou tem uma sugestão? Escreva aqui..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="primary" size="sm" type="submit" className="w-full flex justify-center items-center gap-2">
              <Send className="w-4 h-4" /> Enviar Feedback
            </Button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex justify-center items-center shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
