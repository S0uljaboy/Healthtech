'use client';
import { useState } from 'react';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { ParentDashboardView } from '@/features/dashboard/ParentDashboardView';
import { ClinicalDashboardView } from '@/features/dashboard/ClinicalDashboardView';
import { Button } from '@healthtech/ui';

export default function Home() {
  const [role, setRole] = useState<'admin' | 'psychologist' | 'parent'>('admin');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Demo Mode Top Bar */}
      <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between z-50 shadow-md">
        <span className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Demo Mode Active
        </span>
        <div className="flex items-center gap-2">
          <span className="text-indigo-100 text-xs mr-2">Switch Role:</span>
          <Button 
            variant={role === 'admin' ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setRole('admin')}
            className={role === 'admin' ? 'bg-white text-indigo-600 hover:bg-zinc-100' : 'bg-indigo-800/50 border-transparent text-indigo-100 hover:bg-indigo-700'}
          >
            School Admin
          </Button>
          <Button 
            variant={role === 'psychologist' ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setRole('psychologist')}
            className={role === 'psychologist' ? 'bg-white text-indigo-600 hover:bg-zinc-100' : 'bg-indigo-800/50 border-transparent text-indigo-100 hover:bg-indigo-700'}
          >
            Clinical Platform
          </Button>
          <Button 
            variant={role === 'parent' ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setRole('parent')}
            className={role === 'parent' ? 'bg-white text-indigo-600 hover:bg-zinc-100' : 'bg-indigo-800/50 border-transparent text-indigo-100 hover:bg-indigo-700'}
          >
            Parent Portal
          </Button>
        </div>
      </div>

      {/* Main Content Rendered by Role */}
      <div className="flex-1 bg-zinc-950">
        {role === 'admin' && <DashboardView />}
        {role === 'psychologist' && <ClinicalDashboardView />}
        {role === 'parent' && <ParentDashboardView />}
      </div>
    </div>
  );
}
