import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { companies } from '../../data/companies';
import { layers } from '../../data/layers';
import { relationships, relationshipTypes } from '../../data/relationships';
import { LayerCakeGraph, buildLayerCakeRows, buildRelationshipGraphModel } from '../RelationshipGraph';

describe('buildRelationshipGraphModel', () => {
  it('builds a layered network with industry layers as the left backbone', () => {
    const graph = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
    });

    const energy = graph.nodes.find((node) => node.id === 'energy');
    const constellation = graph.nodes.find((node) => node.id === 'constellation');

    expect(energy?.data.kind).toBe('layer');
    expect(constellation?.data.kind).toBe('company');
    expect(constellation?.position.x).toBeGreaterThan(energy?.position.x ?? 0);
    expect(graph.edges.length).toBeGreaterThan(0);
  });

  it('filters companies by layer, market mode, country text, and active relationship types', () => {
    const graph = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'energy',
      countryFilter: '中国',
      relationshipTypes: ['ecosystem'],
    });

    const nodeIds = new Set(graph.nodes.map((node) => node.id));

    expect(nodeIds.has('energy')).toBe(true);
    expect(nodeIds.has('state-grid')).toBe(true);
    expect(nodeIds.has('constellation')).toBe(false);
    expect(graph.edges.every((edge) => edge.data?.type === 'ecosystem')).toBe(true);
  });

  it('marks the selected node and its direct relationship neighborhood for emphasis', () => {
    const graph = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
      selectedNodeId: 'nvidia',
    });

    expect(graph.highlightedNodeIds).toContain('nvidia');
    expect(graph.highlightedNodeIds).toContain('tsmc');
    expect(graph.highlightedEdgeIds.length).toBeGreaterThan(0);
  });

  it('renders a curated subset by default and reports the full candidate counts', () => {
    const curated = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
    });

    const full = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
      showAll: true,
    });

    const curatedCompanies = curated.nodes.filter((node) => node.data.kind === 'company');
    const fullCompanies = full.nodes.filter((node) => node.data.kind === 'company');

    expect(curatedCompanies.length).toBeLessThan(fullCompanies.length);
    expect(curated.totalCompanyCount).toBe(full.totalCompanyCount);
    expect(curated.totalCompanyCount).toBe(fullCompanies.length);
  });

  it('expands the specified nodes and their direct neighbors beyond the curated set', () => {
    const baseline = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
    });

    const expanded = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
      expandedNodeIds: new Set(['nvidia']),
    });

    const baselineIds = new Set(baseline.nodes.map((node) => node.id));
    const expandedIds = new Set(expanded.nodes.map((node) => node.id));

    expect(expandedIds.has('nvidia')).toBe(true);
    expect(expandedIds.has('tsmc')).toBe(true);
    expect(expanded.nodes.length).toBeGreaterThan(baseline.nodes.length);
    expect(baselineIds.size).toBeLessThanOrEqual(expandedIds.size);
  });

  it('omits edge labels until a node is selected to expose them', () => {
    const noSelection = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
    });
    expect(noSelection.edges.every((edge) => edge.label === undefined)).toBe(true);

    const withSelection = buildRelationshipGraphModel({
      inputLayers: layers,
      inputCompanies: companies,
      inputRelationships: relationships,
      mode: 'global',
      layerFilter: 'all',
      countryFilter: '',
      relationshipTypes,
      selectedNodeId: 'nvidia',
    });
    const labeledEdges = withSelection.edges.filter((edge) => edge.label);
    expect(labeledEdges.length).toBeGreaterThan(0);
    labeledEdges.forEach((edge) => {
      expect(withSelection.highlightedEdgeIds).toContain(edge.id);
    });
  });

  it('renders the original five-layer graph as a separate companion view', () => {
    render(createElement(LayerCakeGraph, { mode: 'global' }));

    expect(screen.getByTestId('layer-cake-graph')).toBeTruthy();
    expect(screen.getByRole('heading', { name: '五层产业链图谱' })).toBeTruthy();
    expect(screen.getAllByText('能源').length).toBeGreaterThan(0);
    expect(screen.getByText('芯片与制造')).toBeTruthy();
  });

  it('uses curated representative companies for five-layer rows', () => {
    const rows = buildLayerCakeRows(layers, companies, 'global');
    const applications = rows.find((row) => row.id === 'applications');
    const models = rows.find((row) => row.id === 'models');

    expect(applications?.companies.length).toBeGreaterThan(applications?.featuredCompanies.length ?? 0);
    expect(applications?.featuredCompanies.map((company) => company.id)).toContain('microsoft-copilot');
    expect(applications?.featuredCompanies.map((company) => company.id)).not.toContain('microsoft-azure');
    expect(models?.featuredCompanies.map((company) => company.id)).toContain('openai');
    expect(models?.featuredCompanies.map((company) => company.id)).not.toContain('nvidia');
  });
});
