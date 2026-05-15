import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'outline';
  }
>;

export const Button = ({ className, variant = 'ghost', ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300/40 disabled:opacity-50',
      variant === 'primary' && 'border border-cyan-300/40 bg-cyan-300/10 text-cyan-100 shadow-glow hover:bg-cyan-300/15',
      variant === 'ghost' && 'text-slate-300 hover:bg-cyan-300/5 hover:text-white',
      variant === 'outline' && 'border border-slate-500/25 bg-slate-950/35 text-slate-200 hover:border-cyan-300/35 hover:bg-cyan-300/5',
      className,
    )}
    {...props}
  />
);
