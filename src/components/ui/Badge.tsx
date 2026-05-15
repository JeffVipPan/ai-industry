import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/8 px-2.5 py-1 text-xs font-medium text-cyan-100',
      className,
    )}
  >
    {children}
  </span>
);
