import { CircleDollarSign, Factory, SplitSquareHorizontal } from 'lucide-react';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { ValueFlowSankey } from '../components/ValueFlowSankey';
import { Badge } from '../components/ui/Badge';

const insights = [
  {
    title: '应用层收入 ≠ 应用层利润',
    icon: CircleDollarSign,
    body: 'AI SaaS 与智能体收入在留在应用层之前，可能先流向模型 API、云推理、GPU 折旧和数据中心电力成本。',
  },
  {
    title: '瓶颈环节拥有更强定价权',
    icon: Factory,
    body: '当供给稀缺且切换成本较高时，GPU、HBM、先进封装、领先制程代工和 EUV 设备等节点更容易捕获价值。',
  },
  {
    title: '中国替代路径分层推进',
    icon: SplitSquareHorizontal,
    body: '机会主要集中在部分设备/材料、国产 AI 芯片、云平台、基础模型、AI 基础设施和应用；EUV、HBM 与类 CUDA 生态仍是关键差距。',
  },
];

export const ValueFlowPage = () => (
  <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
    <section className="research-hero-surface mb-6 rounded-2xl border border-slate-700/20 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge>价值流研究</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">AI 收入与利润流向哪里？</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
            本页使用桑基图展示企业 AI 收入、云资本开支、GPU 成本、HBM 采购、晶圆代工支出和设备资本开支如何在 AI 栈中流动。
          </p>
        </div>
        <DemoDataNotice />
      </div>
    </section>

    <section className="mb-6 grid gap-4 lg:grid-cols-3">
      {insights.map((insight) => {
        const Icon = insight.icon;

        return (
          <article
            key={insight.title}
            className="rounded-lg border border-slate-700/20 bg-white/86 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:border-[#8bbdff] hover:bg-white"
          >
            <Icon className="h-5 w-5 text-cyan-200" />
            <h2 className="mt-3 text-lg font-semibold text-white">{insight.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">{insight.body}</p>
          </article>
        );
      })}
    </section>

    <ValueFlowSankey />
  </div>
);
