import type { HTMLAttributes, PropsWithChildren } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

const badgeClassName =
  'inline-flex items-center rounded-full border border-[#b8d8ff] bg-[#eef6ff] px-2.5 py-1 text-xs font-medium text-[#005ecb]';

export const Badge = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <span
    {...props}
    className={cn(badgeClassName, className)}
  >
    {children}
  </span>
);

export const LinkBadge = ({ children, className, ...props }: PropsWithChildren<LinkProps>) => (
  <Link
    {...props}
    className={cn(
      badgeClassName,
      'transition hover:border-[#0071e3] hover:bg-[#e8f2ff] hover:text-[#004a9f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]',
      className,
    )}
  >
    {children}
  </Link>
);
