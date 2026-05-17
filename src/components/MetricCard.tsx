import type { PropsWithChildren } from 'react';

type MetricSource = {
  label: string;
  url?: string;
  date: string;
};

type MetricCardProps = PropsWithChildren<{
  label: string;
  value: string;
  source?: MetricSource;
}>;

export const MetricCard = ({ label, value, source, children }: MetricCardProps) => (
  <div className="metric-card">
    <span className="metric-card-accent" aria-hidden="true" />
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className="mt-3 break-words font-mono text-[clamp(1.45rem,3vw,2.45rem)] leading-none text-white">{value}</p>
    {children ? <div className="mt-3 text-sm leading-6 text-slate-400">{children}</div> : null}
    {source ? (
      <p className="mt-4 line-clamp-2 text-[11px] leading-5 text-slate-500" title={`${source.label} · ${source.date}`}>
        {source.url ? (
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200">
            {source.label}
          </a>
        ) : (
          <span>{source.label}</span>
        )}
        <span className="ml-1 font-mono">· {source.date}</span>
      </p>
    ) : null}
  </div>
);
