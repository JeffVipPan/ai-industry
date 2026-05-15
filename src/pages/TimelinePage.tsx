import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { timelineEvents } from '../data/timeline';
import { getLayerById } from '../data/layers';
import type { TimelineCategory } from '../types/timeline';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { Badge } from '../components/ui/Badge';
import { regionLabel, timelineCategoryLabel } from '../lib/labels';

const categories: Array<TimelineCategory | 'all'> = ['all', 'model', 'hardware', 'infra', 'application', 'capital'];
const regions = ['all', 'global', 'china'] as const;

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
          <h1 className="mt-4 text-4xl font-light text-white sm:text-6xl">AI 技术与资本时间线</h1>
          <p className="mt-4 max-w-2xl text-slate-400">滚动驱动的关键事件序列，覆盖模型、硬件、基础设施、应用和资本。</p>
        </div>
        <DemoDataNotice compact />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`min-h-11 rounded-md border px-3 text-sm ${category === item ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100' : 'border-slate-700/35 bg-slate-950/45 text-slate-400'}`}
          >
            {timelineCategoryLabel[item]}
          </button>
        ))}
        {regions.map((item) => (
          <button
            key={item}
            onClick={() => setRegion(item)}
            className={`min-h-11 rounded-md border px-3 text-sm ${region === item ? 'border-violet-300/40 bg-violet-300/10 text-violet-100' : 'border-slate-700/35 bg-slate-950/45 text-slate-400'}`}
          >
            {regionLabel[item]}
          </button>
        ))}
      </div>

      <div className="relative overflow-x-auto pb-8">
        <div className="absolute left-0 right-0 top-24 hidden h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/45 to-violet-300/0 md:block" />
        <div className="grid gap-4 md:auto-cols-[300px] md:grid-flow-col">
          {events.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: (index % 6) * 0.04 }}
              className="glass-panel rounded-lg p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-3xl text-cyan-100">{event.year}</p>
                  <p className="mt-1 text-xs text-slate-500">{regionLabel[event.region]} · {timelineCategoryLabel[event.category]}</p>
                </div>
                <span className="h-3 w-3 rounded-full shadow-glow" style={{ backgroundColor: event.visualIdentity.color }} />
              </div>
              <h2 className="mt-6 text-lg font-semibold text-white">{event.title.zh}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{event.description.zh}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {event.linkedLayerIds?.map((id) => <Badge key={id}>{getLayerById(id)?.name.zh ?? id}</Badge>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
