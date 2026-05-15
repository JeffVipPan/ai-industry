import { ArrowRight, BookOpen, Network, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { companiesByLayer } from '../data/companies';
import { layers } from '../data/layers';
import { timelineEvents } from '../data/timeline';
import { valueFlowScenarios } from '../data/value-flows';
import { useAppStore } from '../store/useAppStore';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SankeyDiagram } from '../components/SankeyDiagram';
import { pricingPowerLabel } from '../lib/labels';

const researchQuestions = [
  {
    question: 'NVIDIA 的护城河主要来自哪里？',
    answer: '从芯片设计进入，继续阅读 CUDA 生态、HBM 供给、TSMC 制造和云厂商采购。',
    href: '/companies/nvidia',
  },
  {
    question: 'AI 利润池正在流向产业链哪一段？',
    answer: '从价值流开始，看收入、资本开支与关键受益者如何分布。',
    href: '/value-flow',
  },
  {
    question: '中国 AI 产业链的瓶颈在哪里？',
    answer: '切换到中国视角后，从设备、制造、HBM 和模型生态逐层展开。',
    href: '/map',
  },
];

const chapters = [
  {
    eyebrow: 'Chapter 01',
    title: '算力仍是最集中的利润池',
    copy: '先进 GPU、HBM、封装和晶圆制造共同决定训练集群的扩张速度，也决定产业链中最强的定价权。',
    href: '/layers/chip-design',
    surface: 'research-blue-surface',
  },
  {
    eyebrow: 'Chapter 02',
    title: '云平台把资本开支转化为服务',
    copy: '云厂商连接上游芯片、数据中心和下游模型公司，是观察 AI 需求强弱的核心窗口。',
    href: '/layers/cloud-platform',
    surface: 'research-mint-surface',
  },
  {
    eyebrow: 'Chapter 03',
    title: '模型与应用进入商业化验证',
    copy: '基础模型、Agent 框架和 AI 应用的价值分配仍在变化，关键是工作流嵌入和数据闭环。',
    href: '/layers/foundation-models',
    surface: 'research-lavender-surface',
  },
];

const LayerSummaryCard = ({ layerId }: { layerId: string }) => {
  const layer = layers.find((item) => item.id === layerId)!;
  const companies = companiesByLayer(layer.id);
  const { markExplored, setHoveredId } = useAppStore();

  return (
    <Link
      to={`/layers/${layer.id}`}
      onClick={() => markExplored(layer.id)}
      onMouseEnter={() => setHoveredId(layer.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="group block min-w-0 rounded-lg border border-slate-700/20 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_20px_55px_rgba(0,0,0,0.07)]"
      style={{
        background: `linear-gradient(180deg, ${layer.visualIdentity.color}16, rgba(255,255,255,.96) 46%)`,
      }}
    >
      <div className="flex items-start gap-4">
        <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layer.visualIdentity.color }} />
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold text-white">{layer.name.zh}</span>
          <span className="mt-1 block text-sm leading-6 text-slate-400">{layer.description.short.zh}</span>
        </span>
        <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-200" />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-slate-400">
        <div className="rounded-lg bg-slate-950/35 p-2">
          <p>壁垒</p>
          <p className="mt-1 font-mono text-slate-100">{layer.technicalBarrier}/5</p>
        </div>
        <div className="rounded-lg bg-slate-950/35 p-2">
          <p>国产率</p>
          <p className="mt-1 font-mono text-slate-100">{Math.round(layer.chinaLandscape.localizationRate * 100)}%</p>
        </div>
        <div className="rounded-lg bg-slate-950/35 p-2">
          <p>公司</p>
          <p className="mt-1 font-mono text-slate-100">{companies.length}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{pricingPowerLabel[layer.pricingPower]}定价权</Badge>
        <Badge>{layer.coreTechnologies[0]}</Badge>
      </div>
    </Link>
  );
};

const MinimalExplorer = () => {
  const visibleLayers = layers.slice(0, 8);

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-slate-700/20 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/20" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/20" />
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-[#fbfbfd] shadow-glow">
        AI 产业链
      </div>
      {visibleLayers.map((layer, index) => {
        const angle = (index / visibleLayers.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 132;
        return (
          <Link
            key={layer.id}
            to={`/layers/${layer.id}`}
            className="absolute rounded-full border border-slate-700/20 bg-slate-950/35 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white hover:text-cyan-200"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {layer.name.zh}
          </Link>
        );
      })}
    </div>
  );
};

export const HomePage = () => {
  const [activeQuestion, setActiveQuestion] = useState(researchQuestions[0]);

  return (
    <div className="relative z-10">
      <section className="research-hero-surface flex min-h-[92vh] flex-col justify-center border-b border-slate-700/20 px-4 pb-16 pt-28">
        <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <Badge>AI Industry Research</Badge>
          <h1 className="mt-6 text-5xl font-semibold leading-none text-white sm:text-7xl">看清 AI 产业链。</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            从一个问题开始，也可以沿着产业层、公司关系、价值流和关键事件逐步深入。界面保持干净，内容像研究文档一样可读。
          </p>
          <div className="mx-auto mt-8 max-w-2xl rounded-full border border-slate-700/20 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 rounded-full bg-slate-950/35 px-4 py-3 text-left">
              <Search className="h-5 w-5 shrink-0 text-cyan-200" />
              <span className="min-w-0 flex-1 text-sm text-slate-200">{activeQuestion.question}</span>
              <Link to={activeQuestion.href} className="hidden rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white sm:inline-flex">
                展开路径
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {researchQuestions.map((item) => (
              <button
                key={item.question}
                onClick={() => setActiveQuestion(item)}
                className={`rounded-full border px-3 py-2 text-xs transition ${
                  item.question === activeQuestion.question
                    ? 'border-[#0071e3] bg-[#e8f2ff] text-[#005ecb]'
                    : 'border-slate-700/20 bg-white text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.question}
              </button>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">{activeQuestion.answer}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to={activeQuestion.href}>
              <Button variant="primary">
                开始探索
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="#research-docs" className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-cyan-200 hover:text-white">
              <BookOpen className="h-4 w-4" />
              研究文档
            </Link>
          </div>
          <Link
            to={chapters[0].href}
            className="research-blue-surface mx-auto mt-10 flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-slate-700/20 px-4 py-3 text-left shadow-[0_12px_36px_rgba(0,0,0,0.04)] transition hover:bg-white"
          >
            <span>
              <span className="block text-xs text-slate-500">{chapters[0].eyebrow}</span>
              <span className="mt-1 block text-sm font-semibold text-white">{chapters[0].title}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-cyan-200" />
          </Link>
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>章节式探索</Badge>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">先理解产业链，再进入节点。</h2>
          </div>
          <DemoDataNotice compact />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Link key={chapter.title} to={chapter.href} className={`group rounded-2xl p-6 shadow-[0_18px_55px_rgba(0,0,0,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_68px_rgba(0,0,0,0.08)] ${chapter.surface}`}>
              <p className="text-xs text-slate-500">{chapter.eyebrow}</p>
              <h3 className="mt-5 text-2xl font-semibold leading-tight text-white">{chapter.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{chapter.copy}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                继续阅读
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="research-docs" className="mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge>研究文档结构</Badge>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">每一层都像一篇可以继续追问的研究笔记。</h2>
          <p className="mt-5 text-base leading-8 text-slate-400">
            详情页会把信息整理为核心结论、关键指标、上下游关系、相关公司和下一步阅读。它不是炫技的图，而是可以稳定阅读和复用的知识结构。
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['核心结论', '关键指标', '上下游关系', '相关公司'].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg border border-slate-700/20 p-4 ${
                  ['research-blue-surface', 'research-mint-surface', 'research-amber-surface', 'research-lavender-surface'][index]
                }`}
              >
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">作为每个详情页的固定阅读锚点。</p>
              </div>
            ))}
          </div>
        </div>
        <MinimalExplorer />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>L2 产业层</Badge>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">从能源到具身智能的价值链</h2>
          </div>
          <Link to="/map" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
            打开完整图谱
            <Network className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {layers.map((layer) => (
            <LayerSummaryCard key={layer.id} layerId={layer.id} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-10 lg:grid-cols-[1.18fr_.82fr]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <Badge>价值流预览</Badge>
              <h2 className="mt-3 text-2xl font-semibold text-white">收入和利润如何穿过产业链</h2>
            </div>
            <Link to="/value-flow" className="text-sm font-medium text-cyan-200">
              查看完整
            </Link>
          </div>
          <SankeyDiagram scenario={valueFlowScenarios[0]} />
        </div>
        <div className="glass-panel min-w-0 rounded-2xl p-5">
          <Badge>时间线</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-white">技术与资本时间线</h2>
          <div className="mt-6 space-y-3">
            {timelineEvents.slice(-6).map((event) => (
              <Link key={event.id} to="/timeline" className="block rounded-lg border border-slate-700/20 bg-white p-3 transition hover:border-slate-400">
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
