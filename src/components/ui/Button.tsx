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
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:opacity-50',
      variant === 'primary' && 'border border-[#0071e3] bg-[#0071e3] text-white shadow-glow hover:bg-[#0066cc]',
      variant === 'ghost' && 'text-slate-300 hover:bg-slate-950/35 hover:text-white',
      variant === 'outline' && 'border border-slate-500/25 bg-white/70 text-slate-200 hover:border-slate-400 hover:bg-white',
      className,
    )}
    {...props}
  />
);
