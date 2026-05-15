import type { PropsWithChildren } from 'react';

export const MetricCard = ({
  label,
  value,
  children,
}: PropsWithChildren<{
  label: string;
  value: string;
}>) => (
  <div className="glass-panel rounded-lg p-4">
    <p className="text-xs uppercase text-slate-500">{label}</p>
    <p className="mt-2 font-mono text-2xl text-white">{value}</p>
    {children ? <div className="mt-2 text-sm text-slate-400">{children}</div> : null}
  </div>
);
