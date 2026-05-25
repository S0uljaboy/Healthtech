import React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { cn } from '@healthtech/utils';

export interface AppShellProps {
  children: React.ReactNode;
  activePath?: string;
  topbar?: React.ReactNode;
}

export function AppShell({ children, activePath, topbar }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">
      <Sidebar activePath={activePath} className="hidden md:flex flex-shrink-0" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {topbar || <Topbar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div 
      className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
