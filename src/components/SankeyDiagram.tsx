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
  'revenue-source': '#67e8f9',
  intermediate: '#60a5fa',
  'final-beneficiary': '#a78bfa',
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
    <div className="w-full max-w-full overflow-x-auto rounded-lg border border-slate-700/30 bg-slate-950/35 p-3">
      <svg viewBox="0 0 880 440" className="min-h-[360px] min-w-[820px]">
        <defs>
          <linearGradient id="flowGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.34" />
          </linearGradient>
        </defs>
        {graph.links.map((link, index) => (
          <path
            key={`${String((link.source as SankeyNode).id)}-${String((link.target as SankeyNode).id)}-${index}`}
            d={sankeyLinkHorizontal()(link) ?? undefined}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth={Math.max(1, link.width ?? 1)}
            strokeOpacity={0.72}
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
              opacity={scenario.bottlenecks.includes(node.id) ? 0.92 : 0.72}
            />
            <text x={(node.x1 ?? 0) + 8} y={((node.y0 ?? 0) + (node.y1 ?? 0)) / 2} dominantBaseline="middle" fill="#e2e8f0" fontSize={12}>
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
