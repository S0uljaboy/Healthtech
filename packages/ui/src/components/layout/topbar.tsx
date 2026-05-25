import React from 'react';
import { cn } from '@healthtech/utils';
import { Bell, Search } from 'lucide-react';
import { Input } from '../input';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  searchAction?: React.ReactNode;
  notificationAction?: React.ReactNode;
  userMenu?: React.ReactNode;
}

export const Topbar = React.forwardRef<HTMLElement, TopbarProps>(
  ({ className, searchAction, notificationAction, userMenu, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "h-16 px-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-900 sticky top-0 z-10 w-full",
          className
        )}
        {...props}
      >
        <div className="flex-1 max-w-md hidden md:flex items-center relative">
          {searchAction || (
            <>
              <Search className="w-4 h-4 text-zinc-500 absolute left-3" />
              <Input 
                placeholder="Comando (Ctrl+K)..." 
                className="pl-9 h-9 bg-zinc-900/50 border-zinc-800"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {notificationAction || (
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
            </button>
          )}
          
          {userMenu || (
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer">
              <span className="text-xs font-medium text-zinc-300">JD</span>
            </div>
          )}
        </div>
      </header>
    );
  }
);
Topbar.displayName = 'Topbar';
