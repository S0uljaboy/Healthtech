import React from 'react';
import { cn } from '@healthtech/utils';

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, label, value, change, trend = 'neutral', icon, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          "p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2", 
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-400">{label}</span>
          {icon && <div className="text-zinc-500">{icon}</div>}
        </div>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
          {change && (
            <span className={cn(
              "text-sm font-medium mb-1",
              trend === 'up' ? "text-emerald-500" : trend === 'down' ? "text-red-500" : "text-zinc-500"
            )}>
              {change}
            </span>
          )}
        </div>
      </div>
    );
  }
);
StatsCard.displayName = 'StatsCard';
