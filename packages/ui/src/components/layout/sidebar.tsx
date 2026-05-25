import React from 'react';
import { cn } from '@healthtech/utils';
import { LayoutDashboard, Users, AlertCircle, Settings, LogOut } from 'lucide-react';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activePath?: string;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Alunos', path: '/students' },
  { icon: AlertCircle, label: 'Alertas', path: '/alerts' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, activePath = '/dashboard', ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "w-64 flex flex-col bg-zinc-950 border-r border-zinc-900 h-screen overflow-y-auto",
          className
        )}
        {...props}
      >
        <div className="h-16 flex items-center px-6 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">HT</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">HealthTech</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activePath.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-zinc-900 text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-400")} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all group">
            <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
            Sair
          </button>
        </div>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';
