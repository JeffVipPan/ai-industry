import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../data/timeline';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { HowToReadDialog } from '../components/HowToReadDialog';
import { ReadingHint } from '../components/ReadingHint';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ValueFlowSankey } from '../components/ValueFlowSankey';

const researchQuestions = [
  {
    question: '英伟达的护城河主要来自哪里？',
    answer: '从芯片设计进入，继续阅读 CUDA 生态、HBM 供给、台积电制造和云厂商采购。',
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
    eyebrow: '第一章',
    title: '算力仍是最集中的利润池',
    copy: '先进 GPU、HBM、封装和晶圆制造共同决定训练集群的扩张速度，也决定产业链中最强的定价权。',
    href: '/layers/chip-design',
    surface: 'research-blue-surface',
  },
  {
    eyebrow: '第二章',
    title: '云平台把资本开支转化为服务',
    copy: '云厂商连接上游芯片、数据中心和下游模型公司，是观察 AI 需求强弱的核心窗口。',
    href: '/layers/cloud-platform',
    surface: 'research-mint-surface',
  },
  {
    eyebrow: '第三章',
    title: '模型与应用进入商业化验证',
    copy: '基础模型、Agent 框架和 AI 应用的价值分配仍在变化，关键是工作流嵌入和数据闭环。',
    href: '/layers/foundation-models',
    surface: 'research-lavender-surface',
  },
];

export const HomePage = () => {
  const [activeQuestion, setActiveQuestion] = useState(researchQuestions[0]);

  return (
    <div className="relative z-10">
      <section className="research-hero-surface flex min-h-[78vh] flex-col justify-center border-b border-slate-700/20 px-4 pb-16 pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-semibold leading-none text-white sm:text-7xl">看清 AI 产业链。</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
              从一个问题进入，逐层展开 AI 产业链的供给、利润与瓶颈。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {researchQuestions.map((item) => (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setActiveQuestion(item)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm transition ${
                    item.question === activeQuestion.question
                      ? 'border-[#0071e3] bg-[#e8f2ff] text-[#005ecb] shadow-[0_10px_28px_rgba(0,113,227,0.12)]'
                      : 'border-slate-700/20 bg-white text-slate-400 hover:border-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.question}
                </button>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">{activeQuestion.answer}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to={activeQuestion.href}>
                <Button variant="primary">
                  开始探索
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <HowToReadDialog />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>章节式探索</Badge>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">先理解产业链，再进入节点。</h2>
            <ReadingHint className="mt-4">先读 3 个章节，建立 AI 产业链的主线判断。</ReadingHint>
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

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-[1.18fr_.82fr]">
        <div className="lg:col-span-2">
          <ReadingHint>价值流看收入和利润怎么分配，时间线看技术与资本事件。</ReadingHint>
        </div>
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
          <ValueFlowSankey compact />
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

      <section className="mx-auto max-w-7xl px-4 pb-24">
        <Link
          to="/map"
          className="research-blue-surface group flex flex-col gap-5 rounded-2xl border border-slate-700/20 px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.055)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_68px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <span className="min-w-0">
            <h2 className="text-xl font-semibold leading-tight text-white">完整 12 层产业链图谱</h2>
            <span className="mt-2 block text-sm leading-6 text-slate-400">
              从能源到具身智能，按物理供给 → 芯片 → 算力 → 智能变现展开。
            </span>
          </span>
          <span className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-cyan-200">
            打开图谱
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>
    </div>
  );
};
