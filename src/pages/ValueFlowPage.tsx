import { useState } from 'react';
import { valueFlowScenarios } from '../data/value-flows';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { SankeyDiagram } from '../components/SankeyDiagram';
import { Badge } from '../components/ui/Badge';

export const ValueFlowPage = () => {
  const [scenarioId, setScenarioId] = useState(valueFlowScenarios[0].id);
  const scenario = valueFlowScenarios.find((item) => item.id === scenarioId) ?? valueFlowScenarios[0];

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>L2 价值流动</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">收入和利润流向哪里</h1>
          <p className="mt-4 max-w-2xl text-slate-400">以 Sankey Diagram 展示收入流、成本流、资本开支流和关键利润池。</p>
        </div>
        <DemoDataNotice />
      </div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {valueFlowScenarios.map((item) => (
          <button
            key={item.id}
            onClick={() => setScenarioId(item.id)}
            className={`min-h-11 min-w-fit rounded-md border px-3 text-sm transition ${
              item.id === scenario.id ? 'border-slate-950 bg-slate-950 text-[#fbfbfd]' : 'border-slate-700/35 bg-white text-slate-400 hover:text-white'
            }`}
          >
            {item.title.zh}
          </button>
        ))}
      </div>
      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <SankeyDiagram scenario={scenario} />
        </div>
        <aside className="glass-panel rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-white">{scenario.title.zh}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">{scenario.description.zh}</p>
          <div className="mt-6">
            <p className="mb-2 text-sm text-slate-500">瓶颈</p>
            <div className="flex flex-wrap gap-2">
              {scenario.bottlenecks.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm text-slate-500">关键受益者</p>
            <div className="flex flex-wrap gap-2">
              {scenario.keyBeneficiaries.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
