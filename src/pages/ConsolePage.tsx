import {
  ArrowRight,
  BarChart3,
  Building2,
  Cpu,
  Database,
  Factory,
  Gauge,
  Landmark,
  Layers3,
  Network,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  consoleHeroMetrics,
  getConsoleFlowLanes,
  getConsoleNodeInsight,
  getDefaultConsoleNode,
  type ConsoleFlowNode,
  type ConsoleIconKey,
  type ConsoleStatus,
  type ConsoleTone,
} from '../components/console/consoleFlowModel';
import { displayCountry } from '../lib/labels';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';

const iconByKey: Record<ConsoleIconKey, typeof Zap> = {
  budget: Landmark,
  chip: Cpu,
  cloud: Database,
  company: Building2,
  energy: Zap,
  factory: Factory,
  model: Sparkles,
  network: Network,
  server: Server,
  software: Gauge,
};

const toneClasses: Record<ConsoleTone, { card: string; active: string; chip: string; text: string }> = {
  blue: {
    card: 'border-[#b8d8ff] bg-[#eef6ff]',
    active: 'border-[#0071e3] bg-[#e8f2ff] shadow-[0_18px_42px_rgba(0,113,227,0.12)]',
    chip: 'border-[#b8d8ff] bg-[#eef6ff] text-[#005ecb]',
    text: 'text-[#0071e3]',
  },
  mint: {
    card: 'border-[#bfe7cd] bg-[#effaf2]',
    active: 'border-[#34c759] bg-[#effaf2] shadow-[0_18px_42px_rgba(52,199,89,0.11)]',
    chip: 'border-[#bfe7cd] bg-[#effaf2] text-[#167a35]',
    text: 'text-[#167a35]',
  },
  amber: {
    card: 'border-[#f7d89a] bg-[#fff7e7]',
    active: 'border-[#ff9f0a] bg-[#fff7e7] shadow-[0_18px_42px_rgba(255,159,10,0.12)]',
    chip: 'border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]',
    text: 'text-[#9a5b00]',
  },
  lavender: {
    card: 'border-[#dfc5ef] bg-[#f8f1fd]',
    active: 'border-[#af52de] bg-[#f8f1fd] shadow-[0_18px_42px_rgba(175,82,222,0.12)]',
    chip: 'border-[#dfc5ef] bg-[#f8f1fd] text-[#7a2ea0]',
    text: 'text-[#7a2ea0]',
  },
  rose: {
    card: 'border-[#f3c0ca] bg-[#fff2f4]',
    active: 'border-[#ff6b81] bg-[#fff2f4] shadow-[0_18px_42px_rgba(255,107,129,0.12)]',
    chip: 'border-[#f3c0ca] bg-[#fff2f4] text-[#a12b42]',
    text: 'text-[#a12b42]',
  },
};

const statusMeta: Record<ConsoleStatus, { label: string; className: string; dot: string }> = {
  stable: {
    label: '稳定',
    className: 'border-[#bfe7cd] bg-[#effaf2] text-[#167a35]',
    dot: 'bg-[#34c759]',
  },
  watch: {
    label: '关注',
    className: 'border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]',
    dot: 'bg-[#ff9f0a]',
  },
  critical: {
    label: '瓶颈',
    className: 'border-[#f3c0ca] bg-[#fff2f4] text-[#a12b42]',
    dot: 'bg-[#ff6b81]',
  },
};

const firstDrillableNode = (nodes: ConsoleFlowNode[]) => nodes.find((node) => node.layerId) ?? nodes[0];

const ConsoleNodeCard = ({
  active,
  node,
  onSelect,
}: {
  active: boolean;
  node: ConsoleFlowNode;
  onSelect: (node: ConsoleFlowNode) => void;
}) => {
  const Icon = iconByKey[node.iconKey];
  const status = statusMeta[node.status];
  const tone = toneClasses[node.tone];

  return (
    <button
      type="button"
      aria-label={node.layerId ? `下钻${node.title}` : `${node.title}资金入口`}
      aria-pressed={active}
      onClick={() => onSelect(node)}
      className={cn(
        'group flex h-[188px] w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border bg-white p-0 text-left shadow-[0_14px_36px_rgba(29,29,31,0.055)] transition hover:-translate-y-0.5 hover:border-[#8bbdff]',
        active ? tone.active : tone.card,
      )}
    >
      <span className="flex min-h-0 flex-1 flex-col px-4 pb-3 pt-4">
        <span className="flex items-start justify-between gap-3">
          <span className={cn('grid h-10 w-10 place-items-center rounded-full border bg-white', tone.chip)}>
            <Icon className="h-5 w-5" />
          </span>
          <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium', status.className)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
            {status.label}
          </span>
        </span>
        <span className="mt-4 text-base font-semibold text-[#1d1d1f]">{node.title}</span>
        <span className="mt-2 block min-h-[42px] text-xs leading-5 text-[#6e6e73]">{node.subtitle}</span>
      </span>
      <span className="block border-t border-white/70 bg-white/68 px-4 py-3">
        <span className={cn('inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold shadow-[0_8px_18px_rgba(29,29,31,0.045)] transition group-hover:translate-x-0.5', tone.chip)}>
          {node.layerId ? '下钻' : '资金入口'}
          {node.layerId ? <ArrowRight className="h-3.5 w-3.5" /> : null}
        </span>
      </span>
    </button>
  );
};

export const ConsolePage = () => {
  const lanes = useMemo(() => getConsoleFlowLanes(), []);
  const defaultNode = getDefaultConsoleNode();
  const [activeLaneIndex, setActiveLaneIndex] = useState(() =>
    Math.max(
      0,
      lanes.findIndex((lane) => lane.nodes.some((node) => node.id === defaultNode.id)),
    ),
  );
  const [activeNode, setActiveNode] = useState<ConsoleFlowNode>(defaultNode);
  const mode = useAppStore((state) => state.mode);
  const insight = getConsoleNodeInsight(activeNode, mode);
  const activeLane = lanes[activeLaneIndex];

  const handleLaneChange = (index: number) => {
    const nextLane = lanes[index];
    setActiveLaneIndex(index);
    setActiveNode(firstDrillableNode(nextLane.nodes));
  };

  return (
    <div className="relative z-10 mx-auto max-w-[1480px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <section className="research-hero-surface overflow-hidden rounded-[28px] border border-[#d2d2d7]/85 px-5 py-8 shadow-[0_24px_70px_rgba(29,29,31,0.08)] sm:px-7 lg:px-9">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                AI 产业链智能研究终端
              </Badge>
              <Badge className="border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]">
                DEMO INTELLIGENCE
              </Badge>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-[#1d1d1f] sm:text-5xl lg:text-6xl">
              AI 产业链投研控制台
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#515154]">
              把参考终端里的宏观链路、瓶颈节点和下钻洞察，改造成当前项目的浅色研究界面。先看资金与能力怎么穿过产业链，再进入层级和公司详情。
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ['当前区域', mode === 'china' ? '中国画像' : '全球画像'],
                ['默认节点', insight?.layer.name.zh ?? '芯片设计'],
                ['国产化率', insight ? `${insight.localizationRate}%` : 'N/A'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#d2d2d7] bg-white/82 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">{label}</p>
                  <p className="mt-2 truncate text-sm font-semibold text-[#1d1d1f]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {consoleHeroMetrics.map((metric) => (
              <div key={metric.label} className={cn('rounded-2xl border p-5 shadow-[0_14px_36px_rgba(29,29,31,0.055)]', toneClasses[metric.tone].card)}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e6e73]">{metric.label}</p>
                <p className="mt-3 text-2xl font-semibold text-[#1d1d1f]">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#6e6e73]">示意数据 · {metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge className="gap-2">
              <Network className="h-3.5 w-3.5" />
              宏观关系总图
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#1d1d1f] sm:text-4xl">单点下钻的产业链节点拓扑</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#6e6e73]">
              主画布只展示宏观链路和状态微标。点击节点后，右侧洞察面板同步披露核心结论、国产替代、瓶颈指标和代表公司。
            </p>
          </div>
          <Link to="/value-flow">
            <Button variant="primary">
              查看价值流
              <BarChart3 className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {lanes.map((lane, index) => {
            const active = index === activeLaneIndex;
            return (
              <button
                key={lane.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleLaneChange(index)}
                className={cn(
                  'rounded-2xl border p-5 text-left shadow-[0_14px_36px_rgba(29,29,31,0.045)] transition hover:-translate-y-0.5',
                  active ? toneClasses[lane.tone].active : 'border-[#d2d2d7] bg-white/86 hover:border-[#8bbdff]',
                )}
              >
                <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', toneClasses[lane.tone].chip)}>{lane.badge}</span>
                <span className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-[#1d1d1f]">{lane.label}</span>
                  <span className="rounded-full border border-[#d2d2d7] bg-white px-2.5 py-1 text-[11px] text-[#86868b]">
                    {active ? '正在查看' : '切换查看'}
                  </span>
                </span>
                <span className="mt-3 block text-sm leading-6 text-[#6e6e73]">{lane.thesis}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
          <div
            data-testid="console-node-canvas"
            className="h-fit min-w-0 self-start overflow-hidden rounded-[28px] border border-[#d2d2d7]/85 bg-white/88 shadow-[0_26px_70px_rgba(29,29,31,0.08)] backdrop-blur-xl"
          >
            <div className="border-b border-[#d2d2d7]/75 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Badge className={toneClasses[activeLane.tone].chip}>{activeLane.badge}</Badge>
                  <h3 className="mt-3 text-2xl font-semibold text-[#1d1d1f]">{activeLane.label}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6e6e73]">{activeLane.thesis}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-right">
                  {[
                    ['NODES', `${activeLane.nodes.length}`],
                    ['ACTIVE', activeNode.layerId ? '01' : '00'],
                    ['RISK', '20%'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-[#d2d2d7] bg-[#fbfbfd] px-3 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">{label}</p>
                      <p className="mt-1 font-mono text-lg font-semibold text-[#1d1d1f]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto p-5">
              <div className="flex min-w-[1900px] items-center gap-4">
                {activeLane.nodes.map((node, index) => (
                  <div key={`${activeLane.id}-${node.id}`} className="flex items-center gap-4">
                    <ConsoleNodeCard node={node} active={activeNode.id === node.id} onSelect={setActiveNode} />
                    {index < activeLane.nodes.length - 1 ? (
                      <div className="relative h-px w-12 shrink-0 bg-gradient-to-r from-[#d2d2d7] via-[#8bbdff] to-[#d2d2d7]">
                        <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-[#86868b]" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {insight ? (
              <div data-testid="console-lower-left-insight" className="border-t border-[#d2d2d7]/75 bg-[#fbfbfd]/72 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Badge className={toneClasses[insight.node.tone].chip}>节点下钻数据</Badge>
                    <h4 className="mt-3 text-2xl font-semibold text-[#1d1d1f]">{insight.layer.name.zh}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#6e6e73]">从参考终端弹框迁移的核心结论、替代路径、瓶颈和指标。</p>
                  </div>
                  <span className="rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-xs font-medium text-[#86868b]">
                    {insight.node.status === 'critical' ? '瓶颈' : insight.node.status === 'watch' ? '关注' : '稳定'}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
                  <section className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                    <p className="text-sm font-semibold text-[#1d1d1f]">核心结论</p>
                    <p className="mt-3 text-sm leading-7 text-[#515154]">{insight.conclusion}</p>
                  </section>

                  <section className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#1d1d1f]">中国替代路径</p>
                      <span className="font-mono text-sm font-semibold text-[#1d1d1f]">{insight.localizationRate}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#5ac8fa] via-[#f5e06d] to-[#34c759]"
                        style={{ width: `${Math.max(0, Math.min(insight.localizationRate, 100))}%` }}
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      {insight.trends.map((item) => (
                        <p key={item} className="rounded-xl border border-[#d2d2d7] bg-[#fbfbfd] px-3 py-2 text-sm leading-6 text-[#515154]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <section className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8d8d93]">Bottlenecks</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {insight.bottlenecks.map((item) => (
                        <Badge key={item} className="border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {insight.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                        <p className="text-sm text-[#86868b]">{metric.label}</p>
                        <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{metric.value}</p>
                        <p className="mt-2 text-xs leading-5 text-[#6e6e73]">{metric.description}</p>
                      </div>
                    ))}
                  </section>
                </div>

                {insight.glossary.length ? (
                  <section className="mt-4 rounded-2xl border border-[#d2d2d7] bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">术语解释</p>
                        <p className="mt-1 text-xs leading-5 text-[#86868b]">当前节点里的高频专业词</p>
                      </div>
                      <Badge className={toneClasses[insight.node.tone].chip}>Glossary</Badge>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {insight.glossary.map((entry) => (
                        <article key={entry.term} className="rounded-2xl border border-[#e5e5ea] bg-[#fbfbfd] p-4">
                          <p className="text-sm font-semibold text-[#1d1d1f]">{entry.label}</p>
                          <p className="mt-2 text-xs leading-6 text-[#515154]">{entry.definition}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            ) : null}
          </div>

          <aside
            aria-label="节点洞察"
            className="self-start rounded-[28px] border border-[#cfd9e8] bg-white/92 shadow-[0_26px_70px_rgba(29,29,31,0.10)] backdrop-blur-xl"
          >
            {insight ? (
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#86868b]">Insight Panel</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#1d1d1f]">{insight.layer.name.zh}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6e6e73]">{insight.node.subtitle}</p>
                  </div>
                  <span className={cn('grid h-12 w-12 place-items-center rounded-full border', toneClasses[insight.node.tone].chip)}>
                    <Layers3 className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-[#d2d2d7] bg-[#fbfbfd] p-4">
                  <p className="text-sm font-semibold text-[#1d1d1f]">核心结论</p>
                  <p className="mt-2 text-sm leading-7 text-[#515154]">{insight.conclusion}</p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {insight.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
                      <p className="text-sm text-[#86868b]">{metric.label}</p>
                      <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{metric.value}</p>
                      <p className="mt-2 text-xs leading-5 text-[#6e6e73]">{metric.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#1d1d1f]">瓶颈与替代路径</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {insight.bottlenecks.map((item) => (
                      <Badge key={item} className="border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    {insight.trends.map((item) => (
                      <p key={item} className="rounded-2xl border border-[#d2d2d7] bg-[#fbfbfd] px-3 py-2 text-sm leading-6 text-[#515154]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#1d1d1f]">代表公司</p>
                    <Link to={`/layers/${insight.layer.id}`} className="text-xs font-semibold text-[#0071e3]">
                      查看层级详情
                    </Link>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {insight.companies.map((company) => (
                      <Link
                        key={company.id}
                        to={`/companies/${company.id}`}
                        className="rounded-2xl border border-[#d2d2d7] bg-white px-3 py-2 text-sm transition hover:border-[#8bbdff] hover:bg-[#f7fbff]"
                      >
                        <span className="font-semibold text-[#1d1d1f]">{company.name.zh}</span>
                        <span className="ml-2 text-xs text-[#86868b]">
                          {displayCountry(company.basicInfo.country)} · {company.aiBusiness.coreProducts[0]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
                <Badge className="border-[#f7d89a] bg-[#fff7e7] text-[#9a5b00]">资金入口</Badge>
                <h3 className="mt-4 text-2xl font-semibold text-[#1d1d1f]">{activeNode.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#6e6e73]">
                  这个节点代表需求预算来源，不对应单一产业层。继续点击右侧链路节点，查看可下钻的产业层洞察。
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};
