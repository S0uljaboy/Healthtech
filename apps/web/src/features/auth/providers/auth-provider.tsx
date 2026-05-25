'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { useRouter, usePathname } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { hydrated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) return;

    // Bypass auth redirect for demo mode
    // We let the user navigate freely
  }, [hydrated, user, pathname, router]);

  // Don't render anything until the store has hydrated the session state from local storage
  if (!hydrated) {
    return null; // or a nice full screen skeleton loading
  }

  return <>{children}</>;
}
