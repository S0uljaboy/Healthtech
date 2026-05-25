'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth/providers/auth-provider';
import { WebSocketProvider } from '@/features/communications/providers/WebSocketProvider';
import { EventBusProvider } from '@/features/communications/providers/EventBusProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EventBusProvider>
          <WebSocketProvider>
            {children}
          </WebSocketProvider>
        </EventBusProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
