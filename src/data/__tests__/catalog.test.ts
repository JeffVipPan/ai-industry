import { describe, expect, it } from 'vitest';
import { dataAdapter } from '../adapters';
import { companies } from '../companies';
import { relationships } from '../relationships';
import { findConnectedNodeIds, searchCatalog } from '../selectors';
import { timelineEvents } from '../timeline';

describe('AI industry catalog data contract', () => {
  it('keeps the whole catalog data-driven and clearly marked as illustrative demo data', async () => {
    const layers = await dataAdapter.getLayers();

    expect(layers).toHaveLength(15);
    expect(companies.length).toBeGreaterThanOrEqual(80);
    expect(relationships.length).toBeGreaterThanOrEqual(200);

    expect(layers.every((layer) => layer._meta.dataSource === 'illustrative-demo')).toBe(true);
    expect(companies.every((company) => company._meta.dataSource === 'illustrative-demo')).toBe(true);
    expect(relationships.every((relationship) => relationship._meta.dataSource === 'illustrative-demo')).toBe(true);
  });

  it('derives highlighted relationships from relationship data instead of page-specific hard-coding', () => {
    const connected = findConnectedNodeIds('company', 'nvidia', relationships);

    expect(connected.directIds).toEqual(expect.arrayContaining(['tsmc', 'sk-hynix', 'aws', 'openai', 'tesla']));
    expect(connected.byType.supplier).toEqual(expect.arrayContaining(['tsmc', 'sk-hynix']));
    expect(connected.byType.customer).toEqual(expect.arrayContaining(['aws', 'openai', 'tesla']));
    expect(connected.edges.every((edge) => edge.from.id === 'nvidia' || edge.to.id === 'nvidia')).toBe(true);
  });

  it('supports search across layers, companies, technologies, and relationship types', () => {
    const results = searchCatalog('CUDA');

    expect(results.some((result) => result.type === 'company' && result.id === 'nvidia')).toBe(true);
    expect(searchCatalog('芯片设计').some((result) => result.type === 'layer' && result.id === 'chip-design')).toBe(true);
    expect(searchCatalog('supplier').some((result) => result.type === 'relationship-type')).toBe(true);
  });

  it('keeps timeline events factual, source-backed, and non-generated', async () => {
    const layers = await dataAdapter.getLayers();
    const layerIds = new Set(layers.map((layer) => layer.id));
    const companyIds = new Set(companies.map((company) => company.id));
    const expectedMilestones = [
      ['alexnet-2012', 2012, 'global'],
      ['transformer-2017', 2017, 'global'],
      ['china-ai-plan-2017', 2017, 'china'],
      ['chatgpt-2022', 2022, 'us'],
      ['eu-ai-act-2024', 2024, 'eu'],
      ['deepseek-r1-2025', 2025, 'china'],
      ['eu-ai-gigafactories-2026', 2026, 'eu'],
      ['un-ai-scientific-panel-2026', 2026, 'global'],
      ['gemini-31-pro-2026', 2026, 'us'],
      ['openai-amazon-2026', 2026, 'us'],
      ['vera-rubin-2026', 2026, 'us'],
      ['physical-ai-industrial-2026', 2026, 'global'],
      ['gpt55-2026', 2026, 'us'],
      ['claude-opus-47-2026', 2026, 'us'],
      ['deepseek-v4-2026', 2026, 'china'],
      ['china-agent-governance-2026', 2026, 'china'],
      ['isomorphic-series-b-2026', 2026, 'eu'],
    ];
    const alexNet = timelineEvents.find((event) => event.id === 'alexnet-2012');

    expect(alexNet?.year).toBe(2012);
    expect(alexNet?.region).toBe('global');
    expect(alexNet?.title.zh).toContain('AlexNet');

    expectedMilestones.forEach(([id, year, region]) => {
      const event = timelineEvents.find((item) => item.id === id);

      expect(event?.year).toBe(year);
      expect(event?.region).toBe(region);
    });

    expect(timelineEvents.every((event) => !/signal\s*\d+|信号\s*\d+/i.test(`${event.title.en} ${event.title.zh}`))).toBe(true);
    expect(timelineEvents.length).toBeGreaterThanOrEqual(54);
    expect(timelineEvents.filter((event) => event.year === 2026)).toHaveLength(11);
    expect(new Set(timelineEvents.map((event) => event.category))).toEqual(
      new Set(['model', 'hardware', 'infra', 'application', 'capital', 'policy']),
    );
    expect(timelineEvents.every((event) => event.sources.length > 0)).toBe(true);
    expect(timelineEvents.every((event) => event.sources.every((source) => source.url.startsWith('https://')))).toBe(true);
    expect(new Set(timelineEvents.map((event) => event.id)).size).toBe(timelineEvents.length);
    expect(timelineEvents.every((event) => event.linkedLayerIds?.every((layerId) => layerIds.has(layerId)) ?? true)).toBe(
      true,
    );
    expect(
      timelineEvents.every((event) => event.linkedCompanyIds?.every((companyId) => companyIds.has(companyId)) ?? true),
    ).toBe(true);
  });
});
