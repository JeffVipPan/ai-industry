import { ExternalLink } from 'lucide-react';
import { getCompanyById } from '../../data/companies';
import { getLayerById } from '../../data/layers';
import { regionLabel, timelineCategoryLabel } from '../../lib/labels';
import type { TimelineEvent } from '../../types/timeline';
import { LinkBadge } from '../ui/Badge';
import { ImportanceIndicator } from './ImportanceIndicator';

type EventCardProps = {
  event: TimelineEvent;
};

const formatEventDate = (year: number, month?: number) => (month ? `${year}.${String(month).padStart(2, '0')}` : `${year}`);

export const EventCard = ({ event }: EventCardProps) => {
  const linkedLayerIds = event.linkedLayerIds ?? [];
  const linkedCompanyIds = event.linkedCompanyIds ?? [];
  const hasInternalLinks = linkedLayerIds.length > 0 || linkedCompanyIds.length > 0;

  return (
    <article data-testid="timeline-event" className="relative pl-10 md:pl-14">
      <span
        className="absolute left-[0.8rem] top-5 h-4 w-4 rounded-full border-4 border-white shadow-glow md:left-[1.3rem]"
        style={{ backgroundColor: event.visualIdentity.color }}
      />
      <div className="overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.16)]">
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-semibold uppercase text-slate-500">
            <span className="text-slate-900">{formatEventDate(event.year, event.month)}</span>
            <span aria-hidden="true">·</span>
            <span>{regionLabel[event.region]}</span>
            <span aria-hidden="true">·</span>
            <span>{timelineCategoryLabel[event.category]}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <ImportanceIndicator importance={event.importance} />
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
              {event.sources.length} 个来源
            </span>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-5">
          <h2 className="text-xl font-semibold leading-snug text-slate-950">{event.title.zh}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{event.description.zh}</p>
          <blockquote className="mt-5 border-l-2 border-[#b79a3d] bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800">
            <span aria-hidden="true" className="mr-1 text-base font-semibold text-[#9a7c33]">
              “
            </span>
            {event.whyItMatters.zh}
            <span aria-hidden="true" className="ml-1 text-base font-semibold text-[#9a7c33]">
              ”
            </span>
          </blockquote>
        </div>

        <div className="border-t border-slate-200 px-4 py-4 sm:px-5">
          {hasInternalLinks ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {linkedLayerIds.map((id) => (
                <LinkBadge key={id} to={`/layers/${id}`}>
                  {getLayerById(id)?.name.zh ?? id} →
                </LinkBadge>
              ))}
              {linkedCompanyIds.map((id) => (
                <LinkBadge key={id} to={`/companies/${id}`}>
                  {getCompanyById(id)?.name.zh ?? id} →
                </LinkBadge>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {event.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#b8d9ff] bg-[#f4f9ff] px-3 text-xs font-medium text-[#005ecb] transition hover:border-[#0071e3] hover:bg-[#e8f2ff]"
              >
                {source.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
