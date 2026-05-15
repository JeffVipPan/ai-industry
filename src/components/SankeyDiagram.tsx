import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { useMemo } from 'react';
import type { ValueFlowScenario } from '../types/valueFlow';

type SankeyNode = {
  id: string;
  name: string;
  category: string;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
};

type SankeyLink = {
  source: string | SankeyNode;
  target: string | SankeyNode;
  value: number;
  type: string;
  width?: number;
};

const colorByCategory: Record<string, string> = {
  'revenue-source': '#0071e3',
  intermediate: '#34c759',
  'final-beneficiary': '#ff9f0a',
};

export const SankeyDiagram = ({ scenario }: { scenario: ValueFlowScenario }) => {
  const graph = useMemo(() => {
    const generator = sankey<SankeyNode, SankeyLink>()
      .nodeId((node) => node.id)
      .nodeWidth(14)
      .nodePadding(24)
      .extent([
        [12, 12],
        [860, 420],
      ]);
    return generator({
      nodes: scenario.nodes.map((node) => ({
        id: node.id,
        name: node.label.zh,
        category: node.category,
      })),
      links: scenario.links.map((link) => ({ ...link })),
    });
  }, [scenario]);

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-700/20 bg-white p-3 shadow-[0_18px_55px_rgba(0,0,0,0.045)]">
      <svg viewBox="0 0 880 440" className="min-h-[360px] min-w-[820px]">
        <defs>
          <linearGradient id="flowGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#0071e3" stopOpacity="0.18" />
            <stop offset="52%" stopColor="#34c759" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ff9f0a" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {graph.links.map((link, index) => (
          <path
            key={`${String((link.source as SankeyNode).id)}-${String((link.target as SankeyNode).id)}-${index}`}
            d={sankeyLinkHorizontal()(link) ?? undefined}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth={Math.max(1, link.width ?? 1)}
            strokeOpacity={0.85}
          />
        ))}
        {graph.nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x0}
              y={node.y0}
              width={(node.x1 ?? 0) - (node.x0 ?? 0)}
              height={(node.y1 ?? 0) - (node.y0 ?? 0)}
              rx={4}
              fill={colorByCategory[node.category]}
              opacity={scenario.bottlenecks.includes(node.id) ? 0.9 : 0.62}
            />
            <text x={(node.x1 ?? 0) + 8} y={((node.y0 ?? 0) + (node.y1 ?? 0)) / 2} dominantBaseline="middle" fill="#3a3a3c" fontSize={12}>
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
