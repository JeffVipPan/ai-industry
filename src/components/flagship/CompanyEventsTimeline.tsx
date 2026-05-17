import { CalendarDays, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../../data/timeline';
import type { TimelineCategory, TimelineEvent } from '../../types/timeline';
import { Badge } from '../ui/Badge';

const categoryLabel: Record<TimelineCategory, string> = {
  model: '模型',
  hardware: '硬件',
  infra: '基础设施',
  application: '应用',
  capital: '资本',
  policy: '政策',
};

const monthLabel = (month?: number) => (month ? `${String(month).padStart(2, '0')} 月` : '');

const getCompanyEvents = (companyId: string): TimelineEvent[] =>
  timelineEvents
    .filter((event) => event.linkedCompanyIds?.includes(companyId))
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return (b.month ?? 0) - (a.month ?? 0);
    });

type CompanyEventsTimelineProps = {
  companyId: string;
};

export const CompanyEventsTimeline = ({ companyId }: CompanyEventsTimelineProps) => {
  const events = getCompanyEvents(companyId);
  if (events.length === 0) return null;

  return (
    <section className="company-section-panel p-5">
      <div className="company-section-header">
        <div>
          <p className="company-section-eyebrow">事件账本</p>
          <div className="mt-1 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">关键事件时间线</h2>
          </div>
        </div>
        <Badge>{events.length} 条事件</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">仅展示由公开新闻稿、官方公告或 IR 资料背书的事件。</p>

      <ol className="mt-6 space-y-5 border-l border-slate-700/20 pl-5">
        {events.map((event) => (
          <li key={event.id} className="relative">
            <span
              className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white"
              style={{ backgroundColor: event.visualIdentity.color }}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="font-mono text-sm text-cyan-200">
                {event.year}
                {event.month ? ` · ${monthLabel(event.month)}` : ''}
              </p>
              <Badge>{categoryLabel[event.category]}</Badge>
              {event.importance >= 4 ? <Badge>核心</Badge> : null}
            </div>
            <h3 className="mt-1 text-base font-semibold text-white">{event.title.zh}</h3>
            <p className="mt-1 text-sm leading-7 text-slate-400">{event.description.zh}</p>
            {event.sources.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {event.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-200"
                  >
                    {source.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-5 border-t border-slate-700/20 pt-4 text-sm">
        <Link to="/timeline" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white">
          查看完整时间线
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
