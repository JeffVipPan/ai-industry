import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useState } from 'react';
import { valueFlowPathViews, valueFlowScenarios } from '../data/value-flows';
import { useAppStore } from '../store/useAppStore';
import type {
  NormalizedValueFlowLink,
  NormalizedValueFlowScenario,
  ValueFlowPathLink,
  ValueFlowPathView,
} from '../types/valueFlow';
import { Badge } from './ui/Badge';

type AnalysisView = 'allocation' | 'topology';
type FlowType = NormalizedValueFlowLink['flowType'];
type NodeRole = 'source' | 'intermediate' | 'terminal' | 'path';

export type SankeyNodeInput = {
  id: string;
  name: string;
  role: NodeRole;
};

export type SankeyLinkInput = {
  id: string;
  source: string;
  target: string;
  value: number;
  flowType: FlowType;
  label: string;
  description: string;
  sourceLabel?: string;
  targetLabel?: string;
};

export type SankeyOptionInput = {
  nodes: SankeyNodeInput[];
  links: SankeyLinkInput[];
  compact: boolean;
  pinnedFlowId: string | null;
  unit: string;
};

const flowColors: Record<FlowType, string> = {
  revenue: '#0071e3',
  cost: '#af52de',
  capex: '#ff9f0a',
  profit: '#34c759',
  compute: '#ff2d55',
};

const flowTypeLabels: Record<FlowType, string> = {
  revenue: '收入',
  cost: '成本',
  capex: '资本开支',
  profit: '利润池',
  compute: '算力',
};

const evidenceLabels: Record<NormalizedValueFlowLink['evidence'], string> = {
  'public-disclosure': '公开披露',
  'source-informed-estimate': '资料推算',
  'analyst-assumption': '分析假设',
};

const confidenceLabels: Record<NormalizedValueFlowLink['confidence'], string> = {
  high: '高置信',
  medium: '中置信',
  low: '低置信',
};

const nodeColors: Record<NodeRole, string> = {
  source: '#5ac8fa',
  intermediate: '#0071e3',
  terminal: '#86868b',
  path: '#3a3a3c',
};

const formatValue = (value: number, unit = '单位') =>
  `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unit}`;

export const buildSankeyOption = (input: SankeyOptionInput) => {
  const { nodes, links, compact, pinnedFlowId, unit } = input;

  const nameById = new Map<string, string>();
  for (const node of nodes) nameById.set(node.id, node.name);

  const data = nodes.map((node) => ({
    name: node.name,
    itemStyle: {
      color: nodeColors[node.role],
      borderColor: 'rgba(29,29,31,0.12)',
      borderWidth: 1,
    },
  }));

  const linkData = links.map((link) => {
    const opacity =
      pinnedFlowId == null ? 0.32 : pinnedFlowId === link.id ? 0.78 : 0.1;
    return {
      source: nameById.get(link.source) ?? link.source,
      target: nameById.get(link.target) ?? link.target,
      value: link.value,
      lineStyle: { color: flowColors[link.flowType], opacity, curveness: 0.55 },
      flowId: link.id,
      flowLabel: link.label,
      flowDescription: link.description,
      flowType: link.flowType,
      flowUnit: unit,
    };
  });

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(210,210,215,0.85)',
      borderWidth: 1,
      padding: 10,
      textStyle: { color: '#1d1d1f', fontSize: 12 },
      extraCssText:
        'box-shadow: 0 18px 55px rgba(0,0,0,0.12); border-radius: 8px; max-width: 320px;',
      formatter: (params: {
        dataType?: string;
        name?: string;
        data?: Record<string, unknown>;
      }) => {
        if (params.dataType === 'edge' && params.data) {
          const d = params.data as {
            source: string;
            target: string;
            value: number;
            flowLabel: string;
            flowDescription: string;
            flowType: FlowType;
            flowUnit: string;
          };
          const typeLabel = flowTypeLabels[d.flowType];
          return (
            `<div style="font-weight:600;color:#1d1d1f">${d.source} → ${d.target}</div>` +
            `<div style="margin-top:4px;color:#6e6e73">${d.flowLabel} · <span style="font-family:SFMono-Regular,monospace">${formatValue(d.value, d.flowUnit)}</span></div>` +
            `<div style="margin-top:6px;font-size:11px;color:#86868b">${d.flowDescription}</div>` +
            `<div style="margin-top:6px;font-size:11px;color:${flowColors[d.flowType]}">${typeLabel}</div>`
          );
        }
        return `<div style="font-weight:600;color:#1d1d1f">${params.name ?? '节点'}</div>`;
      },
    },
    series: [
      {
        type: 'sankey',
        data,
        links: linkData,
        nodeWidth: compact ? 12 : 16,
        nodeGap: compact ? 8 : 14,
        nodeAlign: 'justify',
        draggable: !compact,
        emphasis: { focus: 'adjacency', blurScope: 'global' },
        label: {
          color: '#1d1d1f',
          fontSize: compact ? 10 : 12,
          fontFamily:
            '"PingFang SC","Hiragino Sans GB","Microsoft YaHei",ui-sans-serif,sans-serif',
        },
        itemStyle: { borderColor: 'rgba(29,29,31,0.12)', borderWidth: 1 },
        lineStyle: { curveness: 0.55 },
        layoutIterations: 32,
      },
    ],
  };
};

const preferredScenarioId = (mode: 'global' | 'china') =>
  mode === 'china' ? 'china-substitution-100' : 'application-revenue-100';
const preferredPathViewId = (mode: 'global' | 'china') =>
  mode === 'china' ? 'china-substitution-network' : 'economic-map';

const selectScenario = (scenarioId: string): NormalizedValueFlowScenario =>
  valueFlowScenarios.find((s) => s.id === scenarioId) ?? valueFlowScenarios[0];

const selectPathView = (viewId: string): ValueFlowPathView =>
  valueFlowPathViews.find((v) => v.id === viewId) ?? valueFlowPathViews[0];

const topologyNodes = (links: ValueFlowPathLink[]): SankeyNodeInput[] => {
  const nodes = new Map<string, SankeyNodeInput>();
  links.forEach((link) => {
    nodes.set(link.source, { id: link.source, name: link.sourceLabel, role: 'path' });
    nodes.set(link.target, { id: link.target, name: link.targetLabel, role: 'path' });
  });
  return Array.from(nodes.values());
};

export const ValueFlowSankey = ({ compact = false }: { compact?: boolean }) => {
  const mode = useAppStore((state) => state.mode);
  const [analysisView, setAnalysisView] = useState<AnalysisView>('topology');
  const [scenarioId, setScenarioId] = useState(() => preferredScenarioId(mode));
  const [pathViewId, setPathViewId] = useState(() => preferredPathViewId(mode));
  const [pinnedFlowId, setPinnedFlowId] = useState<string | null>(null);

  const displayView: AnalysisView = compact ? 'allocation' : analysisView;
  const scenario = selectScenario(scenarioId);
  const pathView = selectPathView(pathViewId);

  useEffect(() => {
    setScenarioId(preferredScenarioId(mode));
    setPathViewId(preferredPathViewId(mode));
    setPinnedFlowId(null);
  }, [mode]);

  useEffect(() => {
    setPinnedFlowId(null);
  }, [analysisView, scenarioId, pathViewId]);

  const optionInput: SankeyOptionInput = useMemo(() => {
    if (displayView === 'allocation') {
      return {
        nodes: scenario.nodes.map((node) => ({
          id: node.id,
          name: node.label.zh,
          role: node.role,
        })),
        links: scenario.links.map((link) => ({
          id: link.id,
          source: link.source,
          target: link.target,
          value: link.value,
          flowType: link.flowType,
          label: link.label,
          description: link.description,
        })),
        compact,
        pinnedFlowId,
        unit: scenario.unit,
      };
    }
    return {
      nodes: topologyNodes(pathView.links),
      links: pathView.links.map((link) => ({
        id: link.id,
        source: link.source,
        target: link.target,
        value: link.value,
        flowType: link.flowType,
        label: link.label,
        description: link.description,
        sourceLabel: link.sourceLabel,
        targetLabel: link.targetLabel,
      })),
      compact,
      pinnedFlowId,
      unit: pathView.unit,
    };
  }, [compact, displayView, pathView, pinnedFlowId, scenario]);

  const option = useMemo(() => buildSankeyOption(optionInput), [optionInput]);

  const height = compact ? 420 : displayView === 'topology' ? 720 : 640;

  const handleChartClick = (params: { dataType?: string; data?: { flowId?: string } }) => {
    if (compact) return;
    if (params.dataType !== 'edge') return;
    const id = params.data?.flowId;
    if (!id) return;
    setPinnedFlowId((current) => (current === id ? null : id));
  };

  const rootAllocation = useMemo(
    () => scenario.links.filter((l) => l.source === scenario.rootNodeId),
    [scenario],
  );
  const nodeLabelById = useMemo(
    () => new Map(scenario.nodes.map((n) => [n.id, n.label.zh])),
    [scenario],
  );
  const activeAllocationFlow =
    (pinnedFlowId && scenario.links.find((l) => l.id === pinnedFlowId)) ??
    rootAllocation[0] ??
    scenario.links[0];
  const activePathFlow =
    (pinnedFlowId && pathView.links.find((l) => l.id === pinnedFlowId)) ??
    pathView.links[0];

  return (
    <section className="glass-panel overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 border-b border-slate-700/20 p-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">AI 价值流</h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
            <span>标准化 100 单位模型，非真实 $B 财务数据。</span>
            <span>路径强度指数，不代表金额。</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!compact ? (
            <div className="flex rounded-full border border-slate-700/20 bg-[#fbfbfd] p-1">
              {[
                { id: 'allocation' as const, label: '标准化分配' },
                { id: 'topology' as const, label: '路径强度' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAnalysisView(item.id)}
                  className={`min-h-9 rounded-full px-4 text-sm font-medium transition ${
                    displayView === item.id
                      ? 'bg-[#1d1d1f] text-[#fff] shadow-[0_10px_24px_rgba(29,29,31,0.16)]'
                      : 'text-slate-400 hover:bg-white hover:text-[#005ecb]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
          <Badge className="border-[#d7e7ff] bg-white text-slate-400">
            {displayView === 'allocation' ? '标准化估算模型' : '路径强度视图'}
          </Badge>
        </div>
      </div>

      {!compact ? (
        <div className="flex gap-2 overflow-x-auto border-b border-slate-700/20 bg-[#fbfbfd]/82 px-5 py-4">
          {(displayView === 'allocation' ? valueFlowScenarios : valueFlowPathViews).map((item) => {
            const selected =
              displayView === 'allocation' ? item.id === scenario.id : item.id === pathView.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (displayView === 'allocation') {
                    setScenarioId(item.id);
                  } else {
                    setPathViewId(item.id);
                  }
                }}
                className={`min-h-11 min-w-fit rounded-full border px-4 text-sm transition ${
                  selected
                    ? 'border-[#0071e3] bg-[#e8f2ff] text-[#005ecb]'
                    : 'border-slate-700/20 bg-white text-slate-400 hover:border-[#8bbdff] hover:text-[#005ecb]'
                }`}
              >
                {item.title.zh}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={compact ? 'p-4' : 'grid gap-0 lg:grid-cols-[1fr_360px]'}>
        <div className="min-w-0 bg-white/72 p-4">
          <ReactECharts
            option={option}
            style={{ height, width: '100%' }}
            notMerge
            lazyUpdate
            onEvents={compact ? undefined : { click: handleChartClick }}
          />
        </div>

        {!compact ? (
          <aside className="border-t border-slate-700/20 bg-[#fbfbfd]/90 p-5 lg:border-l lg:border-t-0">
            {displayView === 'allocation' ? (
              <>
                <div>
                  <Badge>{scenario.title.zh}</Badge>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {scenario.description.zh}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {rootAllocation.map((link) => (
                    <div
                      key={link.id}
                      className="rounded-lg border border-slate-700/20 bg-white p-3"
                    >
                      <p className="text-xs text-slate-500">{link.label}</p>
                      <p className="mt-1 font-mono text-sm text-slate-100">
                        {formatValue(link.value, scenario.unit)}
                      </p>
                    </div>
                  ))}
                </div>

                {activeAllocationFlow ? (
                  <div className="mt-5 rounded-xl border border-slate-700/20 bg-white p-4">
                    <Badge className="border-slate-700/20 bg-slate-950/35 text-slate-400">
                      {flowTypeLabels[activeAllocationFlow.flowType]}
                    </Badge>
                    <h3 className="mt-3 text-base font-semibold text-white">
                      {activeAllocationFlow.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {activeAllocationFlow.description}
                    </p>
                    <p className="mt-3 font-mono text-xs text-slate-500">
                      {nodeLabelById.get(activeAllocationFlow.source) ?? activeAllocationFlow.source}{' '}
                      →{' '}
                      {nodeLabelById.get(activeAllocationFlow.target) ?? activeAllocationFlow.target}{' '}
                      · {formatValue(activeAllocationFlow.value, scenario.unit)}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {evidenceLabels[activeAllocationFlow.evidence]} ·{' '}
                      {confidenceLabels[activeAllocationFlow.confidence]}
                    </p>
                    {pinnedFlowId === activeAllocationFlow.id ? (
                      <button
                        type="button"
                        onClick={() => setPinnedFlowId(null)}
                        className="mt-3 text-xs text-[#005ecb] underline"
                      >
                        取消钉住
                      </button>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-5 space-y-2">
                  {scenario.notes.map((note) => (
                    <p
                      key={note}
                      className="rounded-lg bg-slate-950/35 px-3 py-2 text-xs leading-5 text-slate-500"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <Badge>{pathView.title.zh}</Badge>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {pathView.description.zh}
                  </p>
                </div>

                <div className="mt-5 rounded-lg border border-slate-700/20 bg-white p-3">
                  <p className="text-xs text-slate-500">指标口径</p>
                  <p className="mt-1 font-mono text-sm text-slate-100">{pathView.unit}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{pathView.caveat}</p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {pathView.links.slice(0, 6).map((link) => (
                    <div
                      key={link.id}
                      className="rounded-lg border border-slate-700/20 bg-white p-3"
                    >
                      <p className="text-xs text-slate-500">
                        {link.sourceLabel} → {link.targetLabel}
                      </p>
                      <p className="mt-1 font-mono text-sm text-slate-100">
                        {formatValue(link.value, pathView.unit)}
                      </p>
                    </div>
                  ))}
                </div>

                {activePathFlow ? (
                  <div className="mt-5 rounded-xl border border-slate-700/20 bg-white p-4">
                    <Badge className="border-slate-700/20 bg-slate-950/35 text-slate-400">
                      {flowTypeLabels[activePathFlow.flowType]}
                    </Badge>
                    <h3 className="mt-3 text-base font-semibold text-white">
                      {activePathFlow.sourceLabel} → {activePathFlow.targetLabel}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {activePathFlow.description}
                    </p>
                    <p className="mt-3 font-mono text-xs text-slate-500">
                      {activePathFlow.label} · {formatValue(activePathFlow.value, pathView.unit)}
                    </p>
                    {pinnedFlowId === activePathFlow.id ? (
                      <button
                        type="button"
                        onClick={() => setPinnedFlowId(null)}
                        className="mt-3 text-xs text-[#005ecb] underline"
                      >
                        取消钉住
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </aside>
        ) : null}
      </div>
    </section>
  );
};
