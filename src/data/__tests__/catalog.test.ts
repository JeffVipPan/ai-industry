import { describe, expect, it } from 'vitest';
import { dataAdapter } from '../adapters';
import { companies } from '../companies';
import { financialHistory } from '../financial';
import { flagshipCompanyIds, getFlagshipData } from '../flagships';
import { getLayerById, layers } from '../layers';
import { relationships } from '../relationships';
import { findConnectedNodeIds, searchCatalog } from '../selectors';
import { getSortedTimelineEvents, timelineEvents } from '../timeline';
import type { Company } from '../../types/company';

describe('AI industry catalog data contract', () => {
  it('keeps the whole catalog data-driven and clearly marked by data source', async () => {
    const layers = await dataAdapter.getLayers();

    expect(layers).toHaveLength(15);
    expect(companies.length).toBeGreaterThanOrEqual(80);
    expect(relationships.length).toBeGreaterThanOrEqual(200);

    expect(layers.every((layer) => layer._meta.dataSource === 'illustrative-demo')).toBe(true);
    expect(companies.every((company) => company._meta.dataSource === 'static-estimate')).toBe(true);
    expect(
      relationships.every((relationship) =>
        ['illustrative-demo', 'source-terminal-demo'].includes(relationship._meta.dataSource),
      ),
    ).toBe(true);
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

  it('migrates expanded company coverage from the source terminal without changing the app schema', () => {
    const companyById = new Map(companies.map((company) => [company.id, company]));
    const layerIdSet = new Set(layers.map((layer) => layer.id));
    const expandedCompanyIds = [
      'vertiv',
      'coreweave',
      'huawei-cloud',
      'deepseek',
      'pinecone',
      'cursor',
      'figure-ai',
      'baidu-apollo',
    ];

    expect(companies.length).toBeGreaterThanOrEqual(115);
    expandedCompanyIds.forEach((id) => expect(companyById.has(id)).toBe(true));
    expect(companyById.get('coreweave')?.aiBusiness.layerIds).toContain('cloud-platform');
    expect(companyById.get('huawei-ascend')?.aiBusiness.coreProducts).toEqual(expect.arrayContaining(['Ascend AI processors']));
    expect(
      companies.every((company) => company.aiBusiness.layerIds.every((layerId) => layerIdSet.has(layerId))),
    ).toBe(true);
  });

  it('migrates source terminal relationships into the current relationship graph schema', () => {
    const knownNodeIds = new Set([...companies.map((company) => company.id), ...layers.map((layer) => layer.id)]);
    const importedRelationships = relationships.filter((relationship) => relationship._meta.dataSource === 'source-terminal-demo');
    const coreweaveConnections = findConnectedNodeIds('company', 'coreweave', relationships);

    expect(importedRelationships.length).toBeGreaterThanOrEqual(90);
    expect(
      importedRelationships.some(
        (relationship) =>
          relationship.from.id === 'nvidia' && relationship.to.id === 'coreweave' && relationship.type === 'customer',
      ),
    ).toBe(true);
    expect(
      importedRelationships.some(
        (relationship) =>
          relationship.from.id === 'openai' &&
          relationship.to.id === 'microsoft-copilot' &&
          relationship.type === 'model-provider',
      ),
    ).toBe(true);
    expect(
      importedRelationships.every(
        (relationship) => knownNodeIds.has(relationship.from.id) && knownNodeIds.has(relationship.to.id),
      ),
    ).toBe(true);
    expect(coreweaveConnections.directIds).toEqual(expect.arrayContaining(['nvidia', 'supermicro', 'vistra']));
  });

  it('uses richer layer analysis copied from the source terminal data', () => {
    const chipDesign = getLayerById('chip-design');

    expect(chipDesign?.description.long.zh).toContain('算力性能');
    expect(chipDesign?.businessModel).toEqual(expect.arrayContaining(['芯片/加速卡销售']));
    expect(chipDesign?.chinaLandscape.keyBottlenecks).toEqual(expect.arrayContaining(['高端 GPU', 'CUDA 生态', 'HBM 供给']));
  });

  it('attaches a sourceAsOf snapshot label to every static-estimate company', () => {
    const offenders = companies
      .filter((company) => company._meta.dataSource === 'static-estimate')
      .filter((company) => !company._meta.sourceAsOf || company._meta.sourceAsOf.trim() === '');

    expect(offenders.map((company) => company.id)).toEqual([]);
  });

  it('attaches metric sources for every metric rendered on company detail pages', () => {
    const offenders = companies.flatMap((company) => {
      const metricSources = (
        company as typeof company & {
          metricSources?: Record<string, { label?: string; date?: string }>;
        }
      ).metricSources;
      const headlineSourceKey =
        typeof company.publicMetrics?.marketCap === 'number'
          ? 'marketCap'
          : company.privateMetrics?.valuation
            ? 'valuation'
            : 'marketCap';
      const requiredKeys = [headlineSourceKey, 'aiRevenueShare', 'pe', 'grossMargin'];

      return requiredKeys
        .filter((key) => !metricSources?.[key]?.label || !metricSources[key]?.date)
        .map((key) => `${company.id}:${key}`);
    });

    expect(offenders).toEqual([]);
  });

  it('gives strategic top companies dated metric source entries', () => {
    const companyById = new Map(companies.map((company) => [company.id, company]));
    const strategicTopCompanyIds = [
      'nvidia',
      'tsmc',
      'openai',
      'aws',
      'microsoft-azure',
      'google-cloud',
      'oracle-cloud',
      'asml',
      'sk-hynix',
      'micron',
    ];

    strategicTopCompanyIds.forEach((companyId) => {
      const metricSources = (
        companyById.get(companyId) as
          | (Company & {
              metricSources?: Record<string, { label?: string; date?: string; url?: string }>;
            })
          | undefined
      )?.metricSources;
      const sourceEntries = Object.values(metricSources ?? {});

      expect(metricSources?.aiRevenueShare?.date).toBeTruthy();
      expect(sourceEntries.some((source) => source.url?.startsWith('https://'))).toBe(true);
    });
  });

  it('uses static approximate real metrics for representative companies instead of generated demo values', () => {
    const byId = new Map(companies.map((company) => [company.id, company]));

    expect(byId.get('nvidia')?.publicMetrics?.marketCap).toBe(3_200_000_000_000);
    expect(byId.get('nvidia')?.publicMetrics?.revenue).toBe(130_500_000_000);
    expect(byId.get('nvidia')?.aiBusiness.aiRevenueShare).toBe(0.88);
    expect(byId.get('tsmc')?.publicMetrics?.revenue).toBe(122_400_000_000);
    expect(byId.get('state-grid')?.privateMetrics?.valuation).toBe(4_500_000_000_000);
    expect(byId.get('openai')?.privateMetrics?.valuation).toBe(300_000_000_000);
    expect(byId.get('alibaba-cloud')?.publicMetrics?.revenue).toBe(15_000_000_000);
  });

  it('aligns the latest financial history point with static headline metrics', () => {
    expect(financialHistory.nvidia.at(-1)).toMatchObject({
      year: 2025,
      revenue: 130.5,
      profit: 72.9,
      grossMargin: 0.75,
      aiRevenue: 115.2,
    });
    expect(financialHistory.tsmc.at(-1)).toMatchObject({
      year: 2025,
      revenue: 122.4,
      profit: 55.2,
      grossMargin: 0.599,
      aiRevenue: 63.6,
    });
  });

  it('registers requested companies as flagship research pages with complete data sections', () => {
    const requestedFlagshipIds = [
      'tsmc',
      'ase',
      'sk-hynix',
      'micron',
      'samsung-memory',
      'microsoft-azure',
      'aws',
      'google-cloud',
      'oracle-cloud',
      'openai',
    ];

    expect(flagshipCompanyIds).toEqual(expect.arrayContaining(requestedFlagshipIds));

    requestedFlagshipIds.forEach((companyId) => {
      const flagship = getFlagshipData(companyId);

      expect(flagship?.researchNote.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(flagship?.keyDependencies).toHaveLength(3);
      expect(flagship?.chinaComparison.peers.length).toBeGreaterThanOrEqual(2);
      expect(flagship?.financialHistory.points).toHaveLength(5);
    });
  });

  it('registers every screenshot map company as a complete flagship research page', () => {
    const screenshotCompanyIds = [
      'microsoft-copilot',
      'salesforce',
      'servicenow',
      'adobe',
      'palantir',
      'cursor',
      'perplexity',
      'midjourney',
      'openai',
      'anthropic',
      'google-deepmind',
      'meta-ai',
      'mistral',
      'deepseek',
      'xai',
      'alibaba-qwen',
      'microsoft-azure',
      'aws',
      'google-cloud',
      'oracle-cloud',
      'coreweave',
      'equinix',
      'digital-realty',
      'supermicro',
      'nvidia',
      'amd',
      'broadcom',
      'tsmc',
      'sk-hynix',
      'asml',
      'applied-materials',
      'lam-research',
      'constellation',
      'nextera',
      'state-grid',
      'longi',
      'vistra',
    ];

    expect(flagshipCompanyIds).toEqual(expect.arrayContaining(screenshotCompanyIds));

    screenshotCompanyIds.forEach((companyId) => {
      const flagship = getFlagshipData(companyId);

      expect(flagship?.researchNote.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(flagship?.keyDependencies).toHaveLength(3);
      expect(flagship?.chinaComparison.peers.length).toBeGreaterThanOrEqual(2);
      expect(flagship?.financialHistory.points).toHaveLength(5);
    });
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
    expect(timelineEvents.filter((event) => !(event.whyItMatters?.zh ?? '').trim()).map((event) => event.id)).toEqual([]);
    expect(new Set(timelineEvents.map((event) => event.id)).size).toBe(timelineEvents.length);
    expect(timelineEvents.every((event) => event.linkedLayerIds?.every((layerId) => layerIds.has(layerId)) ?? true)).toBe(
      true,
    );
    expect(
      timelineEvents.every((event) => event.linkedCompanyIds?.every((companyId) => companyIds.has(companyId)) ?? true),
    ).toBe(true);
  });

  it('sorts timeline events by date before presentation', () => {
    const sortedEvents = getSortedTimelineEvents();

    sortedEvents.slice(1).forEach((event, index) => {
      const previous = sortedEvents[index];
      const previousMonth = previous.month ?? 0;
      const currentMonth = event.month ?? 0;

      expect(event.year * 100 + currentMonth).toBeGreaterThanOrEqual(previous.year * 100 + previousMonth);
    });
  });
});
