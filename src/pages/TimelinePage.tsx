import { useMemo, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import { getLayerById } from '../data/layers';
import type { TimelineCategory } from '../types/timeline';
import { Badge } from '../components/ui/Badge';
import { regionLabel, timelineCategoryLabel } from '../lib/labels';

const categories: Array<TimelineCategory | 'all'> = ['all', 'model', 'hardware', 'infra', 'application', 'capital', 'policy'];
const regions = ['all', 'global', 'us', 'china', 'eu', 'asia'] as const;

const formatEventDate = (year: number, month?: number) => (month ? `${year}.${String(month).padStart(2, '0')}` : `${year}`);

export const TimelinePage = () => {
  const [category, setCategory] = useState<TimelineCategory | 'all'>('all');
  const [region, setRegion] = useState<(typeof regions)[number]>('all');
  const events = useMemo(
    () =>
      timelineEvents.filter((event) => {
        if (category !== 'all' && event.category !== category) return false;
        if (region !== 'all' && event.region !== region) return false;
        return true;
      }),
    [category, region],
  );

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>L2 时间线</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">AI 技术与资本时间线</h1>
          <p className="mt-4 max-w-2xl text-slate-400">用安静的事件卡片梳理模型、硬件、基础设施、应用、资本和政策的演进。</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#b8d9ff] bg-[#f4f9ff] px-3 py-2 text-xs text-[#005ecb]">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>来源已核验 · Source-backed timeline</span>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`min-h-11 rounded-full border px-3 text-sm ${category === item ? 'border-[#0071e3] bg-[#e8f2ff] text-[#005ecb]' : 'border-slate-700/35 bg-white text-slate-400'}`}
          >
            {timelineCategoryLabel[item]}
          </button>
        ))}
        {regions.map((item) => (
          <button
            key={item}
            onClick={() => setRegion(item)}
            className={`min-h-11 rounded-full border px-3 text-sm ${region === item ? 'border-[#0071e3] bg-[#e8f2ff] text-[#005ecb]' : 'border-slate-700/35 bg-white text-slate-400'}`}
          >
            {regionLabel[item]}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl pb-8">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-[#8ec5ff] via-slate-700/20 to-transparent md:left-36" />
        <div className="space-y-5">
          {events.map((event) => (
            <article
              key={event.id}
              data-testid="timeline-event"
              className="relative grid gap-4 pl-10 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 md:pl-0"
            >
              <span className="absolute left-[0.8rem] top-7 h-4 w-4 rounded-full border-4 border-white shadow-glow md:left-[8.5rem]" style={{ backgroundColor: event.visualIdentity.color }} />
              <div className="pt-1 md:pt-5 md:text-right">
                <p className="font-mono text-3xl text-cyan-100">{formatEventDate(event.year, event.month)}</p>
                <p className="mt-1 text-xs text-slate-500">{regionLabel[event.region]} · {timelineCategoryLabel[event.category]}</p>
              </div>
              <div className="glass-panel rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold leading-snug text-white">{event.title.zh}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{event.description.zh}</p>
                  </div>
                  <span className="h-3 w-3 shrink-0 rounded-full shadow-glow" style={{ backgroundColor: event.visualIdentity.color }} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {event.linkedLayerIds?.map((id) => <Badge key={id}>{getLayerById(id)?.name.zh ?? id}</Badge>)}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
