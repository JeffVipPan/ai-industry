import { describe, expect, it } from 'vitest';
import { dataAdapter } from '../adapters';
import { companies } from '../companies';
import { relationships } from '../relationships';
import { findConnectedNodeIds, searchCatalog } from '../selectors';

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
});
