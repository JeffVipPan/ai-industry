import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { companiesByLayer } from '../data/companies';
import { layers } from '../data/layers';
import { valueFlowScenarios } from '../data/value-flows';
import { timelineEvents } from '../data/timeline';
import { useAppStore } from '../store/useAppStore';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SankeyDiagram } from '../components/SankeyDiagram';
import { pricingPowerLabel } from '../lib/labels';

const HeroNetwork = () => {
  const dots = Array.from({ length: 72 }, (_, index) => ({
    left: `${8 + ((index * 37) % 84)}%`,
    top: `${12 + ((index * 53) % 66)}%`,
    delay: (index % 12) * 0.08,
    scale: 0.55 + (index % 5) * 0.18,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.9, 0.18] }}
        transition={{ duration: 1.15, delay: 0.3, ease: 'easeOut' }}
        className="absolute left-1/2 top-1/2 h-px w-[70vw] origin-center -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
      />
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0, x: index % 2 ? -80 : 80, y: index % 3 ? 70 : -70 }}
          animate={{ opacity: 0.74, scale: dot.scale, x: 0, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 1.2 + dot.delay, duration: 0.8 }, scale: { delay: 1.2 + dot.delay, duration: 0.8 }, y: { repeat: Infinity, duration: 4 + (index % 5), delay: dot.delay } }}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-glow"
          style={{ left: dot.left, top: dot.top }}
        />
      ))}
    </div>
  );
};

const LayerSummaryCard = ({ layerId, expanded, onToggle }: { layerId: string; expanded: boolean; onToggle: () => void }) => {
  const layer = layers.find((item) => item.id === layerId)!;
  const companies = companiesByLayer(layer.id);
  const { markExplored, setHoveredId } = useAppStore();

  return (
    <motion.article
      layout
      onMouseEnter={() => setHoveredId(layer.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="glass-panel min-w-0 rounded-lg p-4"
    >
      <button
        onClick={() => {
          onToggle();
          markExplored(layer.id);
        }}
        className="flex w-full min-w-0 items-center gap-4 text-left"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full border border-cyan-200/30 bg-slate-950/60" style={{ boxShadow: `0 0 26px ${layer.visualIdentity.color}40` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layer.visualIdentity.color }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold text-white">{layer.name.zh}</span>
          <span className="block truncate text-sm text-slate-400">{layer.description.short.zh}</span>
        </span>
        <span className="hidden font-mono text-xs text-slate-500 sm:block">{companies.length} 家公司</span>
      </button>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-400">
        <div className="rounded-md bg-slate-950/35 p-2">
          <p>壁垒</p>
          <p className="font-mono text-cyan-100">{layer.technicalBarrier}/5</p>
        </div>
        <div className="rounded-md bg-slate-950/35 p-2">
          <p>国产率</p>
          <p className="font-mono text-cyan-100">{Math.round(layer.chinaLandscape.localizationRate * 100)}%</p>
        </div>
        <div className="rounded-md bg-slate-950/35 p-2">
          <p>定价权</p>
          <p className="font-mono text-cyan-100">{pricingPowerLabel[layer.pricingPower]}</p>
        </div>
      </div>
      <AnimatePresence>
        {expanded ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-5 space-y-4 border-t border-slate-700/35 pt-4">
              <p className="text-sm leading-6 text-slate-300">{layer.description.long.zh}</p>
              <div className="flex flex-wrap gap-2">
                {layer.coreTechnologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs text-slate-500">全球龙头</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.globalLandscape.leaders.map((id) => (
                      <Link key={id} to={`/companies/${id}`} className="rounded-md bg-slate-950/45 px-2 py-1 text-xs text-slate-200 hover:text-cyan-100">
                        {id}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs text-slate-500">中国代表</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.chinaLandscape.representatives.map((id) => (
                      <Link key={id} to={`/companies/${id}`} className="rounded-md bg-slate-950/45 px-2 py-1 text-xs text-slate-200 hover:text-cyan-100">
                        {id}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={`/layers/${layer.id}`}>
                <Button variant="outline">
                  进入详情
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
};

export const HomePage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const chainOpacity = useTransform(scrollYProgress, [0.18, 0.56], [0, 1]);

  return (
    <div className="relative z-10">
      <section ref={heroRef} className="relative grid min-h-screen place-items-center overflow-hidden px-4">
        <HeroNetwork />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl font-thin text-white sm:text-7xl">AI 全产业链智能研究终端</h1>
          <p className="mt-4 font-mono text-sm text-slate-400">AI Industry Intelligence Terminal</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55, y: [0, 4, 0] }}
          transition={{ opacity: { delay: 3.2 }, y: { repeat: Infinity, duration: 2 } }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-slate-400"
        >
          <ChevronDown className="h-4 w-4" />
          <span>向下探索</span>
        </motion.div>
      </section>

      <motion.section style={{ opacity: chainOpacity }} className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>L2 产业链全景</Badge>
            <h2 className="mt-4 text-3xl font-light text-white sm:text-5xl">从能源到具身智能的价值链</h2>
          </div>
          <DemoDataNotice compact />
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {layers.map((layer) => (
            <LayerSummaryCard
              key={layer.id}
              layerId={layer.id}
              expanded={expandedId === layer.id}
              onToggle={() => setExpandedId((current) => (current === layer.id ? null : layer.id))}
            />
          ))}
        </div>
      </motion.section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 lg:grid-cols-[1.25fr_.75fr]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <Badge>L3 预览</Badge>
              <h2 className="mt-3 text-2xl font-light text-white">AI 价值流向预览</h2>
            </div>
            <Link to="/value-flow" className="text-sm text-cyan-100 hover:text-white">
              查看完整
            </Link>
          </div>
          <SankeyDiagram scenario={valueFlowScenarios[0]} />
        </div>
        <div className="glass-panel min-w-0 rounded-lg p-5">
          <Badge>时间线</Badge>
          <h2 className="mt-3 text-2xl font-light text-white">技术与资本时间线</h2>
          <div className="mt-6 space-y-4">
            {timelineEvents.slice(-6).map((event) => (
              <Link key={event.id} to="/timeline" className="block rounded-md border border-slate-700/35 bg-slate-950/35 p-3 transition hover:border-cyan-300/30">
                <p className="font-mono text-xs text-cyan-200">{event.year}</p>
                <p className="mt-1 text-sm text-slate-100">{event.title.zh}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
