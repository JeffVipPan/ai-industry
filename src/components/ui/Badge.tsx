import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-[#b8d8ff] bg-[#eef6ff] px-2.5 py-1 text-xs font-medium text-[#005ecb]',
      className,
    )}
  >
    {children}
  </span>
);
