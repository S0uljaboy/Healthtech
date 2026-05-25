'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@healthtech/ui';
import { useAuthStore } from '@/features/auth/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = () => {
    // Mock login: actually set a user in the auth store to bypass AuthProvider protection
    setAuth(
      { id: 'usr_1', email: 'admin@healthtech.com', tenantId: 'tnt_1', roles: ['admin'] },
      'mock_token_123'
    );
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-950 flex flex-col gap-8 shadow-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-2">
            <span className="text-xl font-bold">H</span>
          </div>
          <h1 className="text-2xl font-bold">Acesso à Plataforma</h1>
          <p className="text-zinc-500 text-center">Entre para acessar os painéis de saúde mental escolar.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button variant="primary" className="w-full h-12" onClick={handleLogin}>
            Entrar no Sistema (Bypass)
          </Button>
        </div>
      </div>
    </div>
  );
}
