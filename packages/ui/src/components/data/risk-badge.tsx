import React from 'react';
import { cn } from '@healthtech/utils';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'neutral';

export interface RiskBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: RiskLevel;
  label?: string;
}

const riskStyles: Record<RiskLevel, string> = {
  critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  neutral: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
};

const defaultLabels: Record<RiskLevel, string> = {
  critical: 'Crítico',
  high: 'Alto',
  medium: 'Médio',
  low: 'Baixo',
  neutral: 'Neutro',
};

export const RiskBadge = React.forwardRef<HTMLSpanElement, RiskBadgeProps>(
  ({ className, level, label, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
          riskStyles[level],
          className
        )}
        {...props}
      >
        {label || defaultLabels[level]}
      </span>
    );
  }
);
RiskBadge.displayName = 'RiskBadge';
