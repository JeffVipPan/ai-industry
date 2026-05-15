import { Info } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

type ReadingHintProps = PropsWithChildren<{
  className?: string;
}>;

export const ReadingHint = ({ children, className }: ReadingHintProps) => (
  <p
    className={cn(
      'inline-flex max-w-2xl items-start gap-2 rounded-full border border-[#b8d8ff] bg-[#eef6ff] px-3 py-2 text-xs leading-5 text-[#005ecb]',
      className,
    )}
  >
    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    <span>{children}</span>
  </p>
);
