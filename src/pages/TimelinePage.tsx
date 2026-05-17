import { useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { getSortedTimelineEvents } from '../data/timeline';
import type { TimelineCategory } from '../types/timeline';
import { Badge } from '../components/ui/Badge';
import { regionLabel, timelineCategoryLabel } from '../lib/labels';
import { EventCard } from '../components/timeline/EventCard';

const categories: Array<TimelineCategory | 'all'> = ['all', 'model', 'hardware', 'infra', 'application', 'capital', 'policy'];
const regions = ['all', 'global', 'us', 'china', 'eu', 'asia'] as const;

export const TimelinePage = () => {
  const [category, setCategory] = useState<TimelineCategory | 'all'>('all');
  const [region, setRegion] = useState<(typeof regions)[number]>('all');
  const sortedEvents = useMemo(() => getSortedTimelineEvents(), []);
  const events = useMemo(
    () =>
      sortedEvents.filter((event) => {
        if (category !== 'all' && event.category !== category) return false;
        if (region !== 'all' && event.region !== region) return false;
        return true;
      }),
    [category, region, sortedEvents],
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
          <span>来源已核验的时间线</span>
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

      <div className="relative max-w-5xl pb-8">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-[#8ec5ff] via-slate-700/20 to-transparent" />
        {events.length > 0 ? (
          <div className="space-y-5">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="relative pl-10 md:pl-14">
            <div className="rounded-lg border border-slate-200/80 bg-white px-5 py-6 text-sm leading-7 text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
              当前过滤组合没有事件，试着放宽主题或地区。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
