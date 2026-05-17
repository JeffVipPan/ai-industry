import { describe, expect, it } from 'vitest';
import type { SankeyOptionInput } from '../ValueFlowSankey';
import { buildSankeyOption } from '../ValueFlowSankey';

const baseInput: SankeyOptionInput = {
  nodes: [
    { id: 'src', name: '源节点', role: 'source' },
    { id: 'mid', name: '中转节点', role: 'intermediate' },
    { id: 'dst-a', name: '终点 A', role: 'terminal' },
    { id: 'dst-b', name: '终点 B', role: 'terminal' },
  ],
  links: [
    {
      id: 'L1',
      source: 'src',
      target: 'mid',
      value: 60,
      flowType: 'revenue',
      label: '收入流',
      description: '从源到中转',
    },
    {
      id: 'L2',
      source: 'mid',
      target: 'dst-a',
      value: 40,
      flowType: 'cost',
      label: '成本流',
      description: '中转到终点 A',
    },
    {
      id: 'L3',
      source: 'mid',
      target: 'dst-b',
      value: 20,
      flowType: 'capex',
      label: 'capex 流',
      description: '中转到终点 B',
    },
  ],
  compact: false,
  pinnedFlowId: null,
  unit: '单位',
};

describe('buildSankeyOption', () => {
  it('maps nodes and links 1:1 into the sankey series', () => {
    const option = buildSankeyOption(baseInput);
    const series = (option.series as Array<Record<string, unknown>>)[0];

    expect(series.type).toBe('sankey');
    expect((series.data as unknown[]).length).toBe(baseInput.nodes.length);
    expect((series.links as unknown[]).length).toBe(baseInput.links.length);
  });

  it('assigns line color by flow type and node color by role', () => {
    const option = buildSankeyOption(baseInput);
    const series = (option.series as Array<Record<string, unknown>>)[0];
    const data = series.data as Array<{ name: string; itemStyle: { color: string } }>;
    const links = series.links as Array<{ source: string; lineStyle: { color: string } }>;

    const sourceNode = data.find((node) => node.name === '源节点');
    const terminalNode = data.find((node) => node.name === '终点 A');
    expect(sourceNode?.itemStyle.color).toBe('#5ac8fa');
    expect(terminalNode?.itemStyle.color).toBe('#86868b');

    const revenueLink = links.find((link) => link.source === '源节点');
    const capexLink = links.find((link) => link.source === '中转节点' && link.lineStyle.color === '#ff9f0a');
    expect(revenueLink?.lineStyle.color).toBe('#0071e3');
    expect(capexLink).toBeTruthy();
  });

  it('uses the default opacity when no link is pinned', () => {
    const option = buildSankeyOption(baseInput);
    const series = (option.series as Array<Record<string, unknown>>)[0];
    const links = series.links as Array<{ lineStyle: { opacity: number } }>;

    for (const link of links) {
      expect(link.lineStyle.opacity).toBeCloseTo(0.32);
    }
  });

  it('raises pinned link opacity and dims the rest when a link is pinned', () => {
    const option = buildSankeyOption({ ...baseInput, pinnedFlowId: 'L2' });
    const series = (option.series as Array<Record<string, unknown>>)[0];
    const links = series.links as Array<{ flowId: string; lineStyle: { opacity: number } }>;

    const pinned = links.find((link) => link.flowId === 'L2');
    const others = links.filter((link) => link.flowId !== 'L2');

    expect(pinned?.lineStyle.opacity).toBeCloseTo(0.78);
    for (const other of others) {
      expect(other.lineStyle.opacity).toBeCloseTo(0.1);
    }
  });

  it('shrinks node width, gap, and label font in compact mode', () => {
    const wide = buildSankeyOption(baseInput);
    const compact = buildSankeyOption({ ...baseInput, compact: true });
    const wideSeries = (wide.series as Array<Record<string, unknown>>)[0];
    const compactSeries = (compact.series as Array<Record<string, unknown>>)[0];

    expect(compactSeries.nodeWidth).toBeLessThan(wideSeries.nodeWidth as number);
    expect(compactSeries.nodeGap).toBeLessThan(wideSeries.nodeGap as number);

    const wideLabel = wideSeries.label as { fontSize: number };
    const compactLabel = compactSeries.label as { fontSize: number };
    expect(compactLabel.fontSize).toBeLessThan(wideLabel.fontSize);
  });

  it('attaches adjacency emphasis and a tooltip formatter', () => {
    const option = buildSankeyOption(baseInput);
    const series = (option.series as Array<Record<string, unknown>>)[0];
    const emphasis = series.emphasis as { focus: string };
    const tooltip = option.tooltip as { formatter: unknown };

    expect(emphasis.focus).toBe('adjacency');
    expect(typeof tooltip.formatter).toBe('function');
  });

  it('carries the original link payload so click handlers can recover it', () => {
    const option = buildSankeyOption(baseInput);
    const series = (option.series as Array<Record<string, unknown>>)[0];
    const links = series.links as Array<{ flowId: string; flowLabel: string; flowDescription: string; flowUnit: string; flowType: string }>;

    const sample = links.find((link) => link.flowId === 'L1');
    expect(sample).toMatchObject({
      flowId: 'L1',
      flowLabel: '收入流',
      flowDescription: '从源到中转',
      flowUnit: '单位',
      flowType: 'revenue',
    });
  });
});
