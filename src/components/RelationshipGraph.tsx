import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import { useEffect, useMemo } from 'react';
import { companies, getCompanyById } from '../data/companies';
import { getLayerById, layers } from '../data/layers';
import { relationships, relationshipTypes as allRelationshipTypes } from '../data/relationships';
import { relationshipTypeLabel, displayCountry } from '../lib/labels';
import type { EntityRef } from '../types/common';
import type { Company } from '../types/company';
import type { Layer } from '../types/layer';
import type { Relationship, RelationshipType } from '../types/relationship';

type ViewMode = 'global' | 'china';

type LayerCakeRowDefinition = {
  id: string;
  title: string;
  enTitle: string;
  thesis: string;
  layerIds: string[];
};

export type LayerCakeRow = LayerCakeRowDefinition & {
  layers: Layer[];
  companies: Company[];
  featuredCompanies: Company[];
};

type RelationshipNodeData = {
  label: string;
  kind: 'layer' | 'company';
  rowId?: string;
  subtitle?: string;
  color?: string;
  highlighted: boolean;
  muted: boolean;
};

type RelationshipEdgeData = {
  type: RelationshipType;
  strength: Relationship['strength'];
  highlighted: boolean;
};

type BuildRelationshipGraphModelOptions = {
  inputLayers: Layer[];
  inputCompanies: Company[];
  inputRelationships: Relationship[];
  mode: ViewMode;
  layerFilter: string;
  countryFilter: string;
  relationshipTypes: RelationshipType[];
  selectedNodeId?: string;
  expandedNodeIds?: ReadonlySet<string>;
  showAll?: boolean;
  topCompaniesPerLayer?: number;
};

type RelationshipGraphModel = {
  nodes: Node<RelationshipNodeData>[];
  edges: Edge<RelationshipEdgeData>[];
  highlightedNodeIds: string[];
  highlightedEdgeIds: string[];
  totalCompanyCount: number;
  totalRelationshipCount: number;
};

const DEFAULT_TOP_COMPANIES_PER_LAYER = 3;
const LAYER_X = 60;
const COMPANY_HORIZONTAL_START = 230;
const COMPANY_COLUMN_GAP = 190;
const COMPANY_ROW_GAP = 56;
const COMPANIES_PER_LAYER_COLUMN = 4;
const LAYER_BAND_PADDING = 24;
const LAYER_BAND_MIN_HEIGHT = 80;
const LAYER_HEADER_OFFSET = 20;

const layerCakeDefinitions: LayerCakeRowDefinition[] = [
  {
    id: 'applications',
    title: 'AI 应用',
    enTitle: 'Applications',
    thesis: '把模型能力转成可付费的工作流、自动化和用户体验。',
    layerIds: ['ai-applications', 'autonomous-robotics-ai-native-software'],
  },
  {
    id: 'models',
    title: '模型与智能体',
    enTitle: 'Models',
    thesis: '把算力、数据和训练方法转化为可调用的智能能力。',
    layerIds: ['foundation-models', 'ai-infra-agent-framework'],
  },
  {
    id: 'infrastructure',
    title: '云与基础设施',
    enTitle: 'Infrastructure',
    thesis: '把服务器、网络、数据中心和云平台组织为可交付的 AI 工厂。',
    layerIds: ['cloud-platform', 'servers-networking', 'data-center'],
  },
  {
    id: 'chips',
    title: '芯片与制造',
    enTitle: 'Chips',
    thesis: '提供 GPU、存储、制造、封装、设备材料与 EDA 等硅基能力。',
    layerIds: [
      'semiconductor-equipment',
      'semiconductor-materials',
      'eda-ip',
      'chip-design',
      'wafer-manufacturing',
      'advanced-packaging',
      'hbm-memory',
    ],
  },
  {
    id: 'energy',
    title: '能源',
    enTitle: 'Energy',
    thesis: '决定 AI 数据中心能否持续、低成本、可扩张地运行。',
    layerIds: ['energy'],
  },
];

const layerCakeFeaturedCompanyIds: Record<string, string[]> = {
  applications: [
    'microsoft-copilot',
    'salesforce',
    'servicenow',
    'adobe',
    'palantir',
    'cursor',
    'perplexity',
    'midjourney',
  ],
  models: ['openai', 'anthropic', 'google-deepmind', 'meta-ai', 'mistral', 'deepseek', 'xai', 'alibaba-qwen'],
  infrastructure: ['microsoft-azure', 'aws', 'google-cloud', 'oracle-cloud', 'coreweave', 'equinix', 'digital-realty', 'supermicro'],
  chips: ['nvidia', 'amd', 'broadcom', 'tsmc', 'sk-hynix', 'asml', 'applied-materials', 'lam-research'],
  energy: ['constellation', 'nextera', 'state-grid', 'longi', 'vistra'],
};

const refKey = (ref: EntityRef) => ref.id;

const labelForRef = (ref: EntityRef) => {
  if (ref.type === 'company') return getCompanyById(ref.id)?.name.zh ?? ref.id;
  return getLayerById(ref.id)?.name.zh ?? ref.id;
};

const primaryLayerForCompany = (company: Company, inputLayers: Layer[]) => {
  const layerId = company.aiBusiness.layerIds.find((id) => inputLayers.some((layer) => layer.id === id));
  return layerId ? inputLayers.find((layer) => layer.id === layerId) : undefined;
};

const modeMatches = (company: Company, mode: ViewMode) => mode === 'global' || company.basicInfo.region === 'china';

const countryMatches = (company: Company, countryFilter: string) => {
  const query = countryFilter.trim().toLowerCase();
  if (!query) return true;

  return [company.basicInfo.country, displayCountry(company.basicInfo.country), company.basicInfo.headquarters]
    .join(' ')
    .toLowerCase()
    .includes(query);
};

const relationshipTouchesNode = (relationship: Relationship, nodeId: string) => relationship.from.id === nodeId || relationship.to.id === nodeId;

const rowIdByLayerId = new Map(layerCakeDefinitions.flatMap((row) => row.layerIds.map((layerId) => [layerId, row.id] as const)));

export const buildLayerCakeRows = (inputLayers: Layer[], inputCompanies: Company[], mode: ViewMode): LayerCakeRow[] =>
  layerCakeDefinitions.map((definition) => {
    const rowLayerIds = new Set(definition.layerIds);
    const rowLayers = inputLayers.filter((layer) => rowLayerIds.has(layer.id));
    const rowCompanies = inputCompanies.filter(
      (company) => modeMatches(company, mode) && company.aiBusiness.layerIds.some((layerId) => rowLayerIds.has(layerId)),
    );
    const rowCompanyById = new Map(rowCompanies.map((company) => [company.id, company]));
    const featuredCompanies = (layerCakeFeaturedCompanyIds[definition.id] ?? [])
      .map((companyId) => rowCompanyById.get(companyId))
      .filter(Boolean) as Company[];

    return {
      ...definition,
      layers: rowLayers,
      companies: rowCompanies,
      featuredCompanies: featuredCompanies.length > 0 ? featuredCompanies : rowCompanies.slice(0, definition.id === 'chips' ? 8 : 5),
    };
  });

export const buildRelationshipGraphModel = ({
  inputLayers,
  inputCompanies,
  inputRelationships,
  mode,
  layerFilter,
  countryFilter,
  relationshipTypes,
  selectedNodeId,
  expandedNodeIds,
  showAll = false,
  topCompaniesPerLayer = DEFAULT_TOP_COMPANIES_PER_LAYER,
}: BuildRelationshipGraphModelOptions): RelationshipGraphModel => {
  const activeTypes = new Set(relationshipTypes);
  const visibleLayers = inputLayers.filter((layer) => layerFilter === 'all' || layer.id === layerFilter);
  const visibleLayerIds = new Set(visibleLayers.map((layer) => layer.id));
  const allCandidateCompanies = inputCompanies.filter((company) => {
    if (!modeMatches(company, mode) || !countryMatches(company, countryFilter)) return false;
    if (layerFilter === 'all') return company.aiBusiness.layerIds.some((layerId) => inputLayers.some((layer) => layer.id === layerId));
    return company.aiBusiness.layerIds.includes(layerFilter);
  });
  const candidateCompanyIds = new Set(allCandidateCompanies.map((company) => company.id));

  const isCandidateRef = (ref: EntityRef) => (ref.type === 'layer' ? visibleLayerIds.has(ref.id) : candidateCompanyIds.has(ref.id));
  const candidateRelationships = inputRelationships.filter(
    (relationship) => activeTypes.has(relationship.type) && isCandidateRef(relationship.from) && isCandidateRef(relationship.to),
  );

  const degreeMap = new Map<string, number>();
  candidateRelationships.forEach((relationship) => {
    degreeMap.set(relationship.from.id, (degreeMap.get(relationship.from.id) ?? 0) + 1);
    degreeMap.set(relationship.to.id, (degreeMap.get(relationship.to.id) ?? 0) + 1);
  });

  const companiesByPrimaryAll = new Map<string, Company[]>();
  allCandidateCompanies.forEach((company) => {
    const primaryLayer = primaryLayerForCompany(company, inputLayers);
    const groupKey = primaryLayer?.id ?? 'unassigned';
    companiesByPrimaryAll.set(groupKey, [...(companiesByPrimaryAll.get(groupKey) ?? []), company]);
  });

  const filteredByUser = layerFilter !== 'all' || countryFilter.trim() !== '';
  const expandedSet = expandedNodeIds ?? new Set<string>();
  const renderAll = showAll || filteredByUser;

  const renderedCompanyIds = new Set<string>();
  if (renderAll) {
    allCandidateCompanies.forEach((company) => renderedCompanyIds.add(company.id));
  } else {
    companiesByPrimaryAll.forEach((list) => {
      list
        .slice()
        .sort((a, b) => (degreeMap.get(b.id) ?? 0) - (degreeMap.get(a.id) ?? 0) || a.id.localeCompare(b.id))
        .slice(0, topCompaniesPerLayer)
        .forEach((company) => renderedCompanyIds.add(company.id));
    });
  }

  const focusIds = new Set<string>(expandedSet);
  if (selectedNodeId) focusIds.add(selectedNodeId);
  focusIds.forEach((id) => {
    if (candidateCompanyIds.has(id)) renderedCompanyIds.add(id);
  });
  candidateRelationships.forEach((relationship) => {
    if (!focusIds.has(relationship.from.id) && !focusIds.has(relationship.to.id)) return;
    if (relationship.from.type === 'company') renderedCompanyIds.add(relationship.from.id);
    if (relationship.to.type === 'company') renderedCompanyIds.add(relationship.to.id);
  });

  const visibleCompanies = allCandidateCompanies.filter((company) => renderedCompanyIds.has(company.id));
  const visibleCompanyIds = new Set(visibleCompanies.map((company) => company.id));
  const isVisibleRef = (ref: EntityRef) => (ref.type === 'layer' ? visibleLayerIds.has(ref.id) : visibleCompanyIds.has(ref.id));
  const visibleRelationships = candidateRelationships.filter(
    (relationship) => isVisibleRef(relationship.from) && isVisibleRef(relationship.to),
  );

  const refs = new Map<string, EntityRef>();
  visibleLayers.forEach((layer) => refs.set(layer.id, { type: 'layer', id: layer.id }));
  visibleRelationships.forEach((relationship) => {
    refs.set(refKey(relationship.from), relationship.from);
    refs.set(refKey(relationship.to), relationship.to);
  });

  const selectedRelationships = selectedNodeId ? visibleRelationships.filter((relationship) => relationshipTouchesNode(relationship, selectedNodeId)) : [];
  const highlightedNodeIds = new Set<string>();
  const highlightedEdgeIds = new Set<string>();
  if (selectedNodeId) {
    highlightedNodeIds.add(selectedNodeId);
    selectedRelationships.forEach((relationship) => {
      highlightedEdgeIds.add(relationship.id);
      highlightedNodeIds.add(relationship.from.id);
      highlightedNodeIds.add(relationship.to.id);
    });
  }

  const companiesByPrimaryLayer = new Map<string, Company[]>();
  visibleCompanies.forEach((company) => {
    const primaryLayer = primaryLayerForCompany(company, inputLayers);
    const groupKey = primaryLayer?.id ?? 'unassigned';
    companiesByPrimaryLayer.set(groupKey, [...(companiesByPrimaryLayer.get(groupKey) ?? []), company]);
  });

  const layerYPositions = new Map<string, number>();
  let cumulativeY = 60;
  visibleLayers.forEach((layer) => {
    const layerCompanies = companiesByPrimaryLayer.get(layer.id) ?? [];
    const rowCount = Math.max(1, Math.ceil(layerCompanies.length / COMPANIES_PER_LAYER_COLUMN));
    const bandHeight = Math.max(LAYER_BAND_MIN_HEIGHT, rowCount * COMPANY_ROW_GAP + LAYER_BAND_PADDING);
    layerYPositions.set(layer.id, cumulativeY);
    cumulativeY += bandHeight;
  });

  const nodes: Node<RelationshipNodeData>[] = Array.from(refs.values()).map((ref) => {
    const highlighted = highlightedNodeIds.size === 0 || highlightedNodeIds.has(ref.id);
    if (ref.type === 'layer') {
      const layer = inputLayers.find((item) => item.id === ref.id);
      const bandY = layerYPositions.get(ref.id) ?? 0;
      return {
        id: ref.id,
        type: 'default',
        data: {
          label: labelForRef(ref),
          kind: 'layer',
          rowId: rowIdByLayerId.get(ref.id),
          subtitle: layer?.name.en,
          color: layer?.visualIdentity.color,
          highlighted,
          muted: highlightedNodeIds.size > 0 && !highlighted,
        },
        position: {
          x: LAYER_X,
          y: bandY + LAYER_HEADER_OFFSET,
        },
        style: {
          borderColor: highlighted ? '#0071e3' : 'rgba(210,210,215,0.95)',
          borderRadius: 14,
          background: `${layer?.visualIdentity.color ?? '#0071e3'}24`,
          color: '#1d1d1f',
          fontWeight: 700,
          opacity: highlighted ? 1 : 0.38,
          minWidth: 138,
          boxShadow: highlighted ? '0 14px 34px rgba(0,113,227,.14)' : '0 6px 16px rgba(0,0,0,.05)',
        },
      };
    }

    const company = inputCompanies.find((item) => item.id === ref.id);
    const primaryLayer = company ? primaryLayerForCompany(company, inputLayers) : undefined;
    const bandY = primaryLayer ? layerYPositions.get(primaryLayer.id) ?? 0 : 0;
    const siblings = companiesByPrimaryLayer.get(primaryLayer?.id ?? 'unassigned') ?? [];
    const siblingIndex = Math.max(siblings.findIndex((item) => item.id === ref.id), 0);
    const columnIndex = siblingIndex % COMPANIES_PER_LAYER_COLUMN;
    const rowIndex = Math.floor(siblingIndex / COMPANIES_PER_LAYER_COLUMN);

    return {
      id: ref.id,
      type: 'default',
      data: {
        label: company?.name.zh ?? ref.id,
        kind: 'company',
        rowId: primaryLayer ? rowIdByLayerId.get(primaryLayer.id) : undefined,
        subtitle: company?.name.en,
        color: company?.visualIdentity.color ?? primaryLayer?.visualIdentity.color,
        highlighted,
        muted: highlightedNodeIds.size > 0 && !highlighted,
      },
      position: {
        x: COMPANY_HORIZONTAL_START + columnIndex * COMPANY_COLUMN_GAP,
        y: bandY + LAYER_HEADER_OFFSET + rowIndex * COMPANY_ROW_GAP,
      },
      style: {
        borderColor: highlighted ? '#0071e3' : 'rgba(210,210,215,0.95)',
        borderRadius: 999,
        background: '#ffffff',
        color: '#1d1d1f',
        opacity: highlighted ? 1 : 0.34,
        minWidth: 128,
        boxShadow: highlighted ? '0 14px 34px rgba(0,113,227,.14)' : '0 6px 16px rgba(0,0,0,.05)',
      },
    };
  });

  const hasSelection = highlightedEdgeIds.size > 0;
  const edges: Edge<RelationshipEdgeData>[] = visibleRelationships.map((relationship) => {
    const highlighted = !hasSelection || highlightedEdgeIds.has(relationship.id);
    const showLabel = hasSelection && highlightedEdgeIds.has(relationship.id);
    return {
      id: relationship.id,
      source: relationship.from.id,
      target: relationship.to.id,
      label: showLabel ? relationshipTypeLabel[relationship.type] : undefined,
      animated: highlighted && relationship.strength >= 4,
      data: {
        type: relationship.type,
        strength: relationship.strength,
        highlighted,
      },
      style: {
        strokeWidth: highlighted ? 1.25 + relationship.strength / 2 : 1,
        stroke: highlighted ? '#0071e3' : 'rgba(110,110,115,.28)',
        opacity: highlighted ? (hasSelection ? 0.85 : 0.5) : 0.18,
      },
    };
  });

  return {
    nodes,
    edges,
    highlightedNodeIds: Array.from(highlightedNodeIds),
    highlightedEdgeIds: Array.from(highlightedEdgeIds),
    totalCompanyCount: allCandidateCompanies.length,
    totalRelationshipCount: candidateRelationships.length,
  };
};

type RelationshipGraphProps = {
  target?: EntityRef;
  dense?: boolean;
  mode?: ViewMode;
  layerFilter?: string;
  countryFilter?: string;
  relationshipTypes?: RelationshipType[];
  selectedLayerRowId?: string;
  onSelectLayerRow?: (rowId: string) => void;
  onSelectCompany?: (companyId: string) => void;
  onSelectLayer?: (layerId: string) => void;
  showDemandPanel?: boolean;
  height?: number | string;
  minHeight?: number | string;
  expandedNodeIds?: ReadonlySet<string>;
  showAll?: boolean;
  onToggleShowAll?: (next: boolean) => void;
};

export const getRelationshipsForNode = (nodeId: string, activeTypes: RelationshipType[], sourceRelationships = relationships) => {
  const activeTypeSet = new Set(activeTypes);
  return sourceRelationships.filter(
    (relationship) =>
      activeTypeSet.has(relationship.type) && (relationship.from.id === nodeId || relationship.to.id === nodeId),
  );
};

const layerCakeVisuals: Record<string, { code: string; accent: string; wash: string; label: string }> = {
  applications: { code: 'L5', accent: '#d99bb6', wash: 'rgba(217,155,182,0.17)', label: '需求兑现层' },
  models: { code: 'L4', accent: '#98c5e6', wash: 'rgba(152,197,230,0.16)', label: '智能生产层' },
  infrastructure: { code: 'L3', accent: '#8fd0a9', wash: 'rgba(143,208,169,0.16)', label: '算力工厂层' },
  chips: { code: 'L2', accent: '#d7bf73', wash: 'rgba(215,191,115,0.18)', label: '硅基供给层' },
  energy: { code: 'L1', accent: '#acd37b', wash: 'rgba(172,211,123,0.16)', label: '电力底座层' },
};

type LayerCakeGraphProps = {
  mode?: ViewMode;
  variant?: 'default' | 'map';
  selectedRowId?: string;
  selectedLayerId?: string;
  selectedCompanyId?: string;
  onSelectRow?: (rowId: string) => void;
  onSelectLayer?: (layerId: string) => void;
  onSelectCompany?: (companyId: string) => void;
};

export const LayerCakeGraph = ({
  mode = 'global',
  variant = 'default',
  selectedRowId,
  selectedLayerId,
  selectedCompanyId,
  onSelectRow,
  onSelectLayer,
  onSelectCompany,
}: LayerCakeGraphProps) => {
  const rows = useMemo(() => buildLayerCakeRows(layers, companies, mode), [mode]);
  const isMapVariant = variant === 'map';
  const mapLabelByRowId: Record<string, { title: string; enTitle: string }> = {
    applications: { title: 'AI 应用', enTitle: 'Applications' },
    models: { title: '模型', enTitle: 'Models' },
    infrastructure: { title: '基础设施', enTitle: 'Infrastructure' },
    chips: { title: '芯片', enTitle: 'Chips' },
    energy: { title: '能源', enTitle: 'Energy' },
  };

  return (
    <section
      data-testid="layer-cake-graph"
      className="relative overflow-hidden rounded-[24px] border border-[#d8d0b0]/35 bg-[#030403] p-4 shadow-[0_30px_80px_rgba(29,29,31,0.18)] sm:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 12% 0%, rgba(139,216,255,0.16), transparent 30%), radial-gradient(circle at 88% 18%, rgba(216,184,90,0.12), transparent 26%), linear-gradient(180deg, rgba(248,244,230,0.08), transparent 18%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(248,244,230,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,230,.2) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage: 'repeating-linear-gradient(12deg, transparent 0 18px, rgba(255,255,255,.32) 19px, transparent 20px)',
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8b85a]">
              {isMapVariant ? 'AI FIVE-LAYER CAKE' : '原产业链图谱'}
            </p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight text-[#fffdf4] sm:text-3xl">
              {isMapVariant ? '能源 -> 芯片 -> 基础设施 -> 模型 -> 应用' : '五层产业链图谱'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgba(248,244,230,0.82)]">
              {isMapVariant
                ? '点击每一层查看它在 AI 产业链里的角色，也可以点公司切换到公司详情。'
                : '这张图保留原来的“应用 → 模型 → 基础设施 → 芯片 → 能源”读法，用于先看产业分层和每层代表公司。'}
            </p>
          </div>
          <span className="rounded-full border border-[rgba(248,244,230,0.28)] bg-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs font-medium text-[rgba(248,244,230,0.86)]">
            {mode === 'china' ? '中国视角' : '全球视角'}
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {rows.map((row) => {
            const visual = layerCakeVisuals[row.id];
            const rowSelected =
              selectedRowId === row.id ||
              Boolean(selectedLayerId && row.layerIds.includes(selectedLayerId)) ||
              Boolean(selectedCompanyId && row.companies.some((company) => company.id === selectedCompanyId));
            const rowLabel = isMapVariant ? mapLabelByRowId[row.id] : undefined;

            return (
              <section
                key={row.id}
                data-testid={`layer-cake-row-${row.id}`}
                role={onSelectRow ? 'button' : undefined}
                tabIndex={onSelectRow ? 0 : undefined}
                aria-pressed={onSelectRow ? rowSelected : undefined}
                onClick={onSelectRow ? () => onSelectRow(row.id) : undefined}
                onKeyDown={
                  onSelectRow
                    ? (event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return;
                        event.preventDefault();
                        onSelectRow(row.id);
                      }
                    : undefined
                }
                className={`relative overflow-hidden rounded-[20px] border p-4 outline-none transition sm:p-5 ${
                  onSelectRow ? 'cursor-pointer hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#8bd8ff]/60' : ''
                }`}
                style={{
                  borderColor: rowSelected ? '#8bd8ff' : `${visual.accent}b8`,
                  background: `linear-gradient(100deg, ${visual.wash} 0%, rgba(8,10,9,0.96) 38%, rgba(11,13,12,0.9) 100%)`,
                  boxShadow: rowSelected
                    ? 'inset 0 0 0 1px rgba(139,216,255,0.34), 0 0 34px rgba(139,216,255,0.12)'
                    : 'inset 0 0 0 1px rgba(248,244,230,0.16), 0 16px 38px rgba(0,0,0,0.22)',
                }}
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-2" style={{ backgroundColor: `${visual.accent}b8` }} />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${visual.accent}, transparent)` }}
                />
                <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <span
                        className="rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold tracking-[0.14em]"
                        style={{ borderColor: `${visual.accent}80`, backgroundColor: visual.wash, color: visual.accent }}
                      >
                        {visual.code}
                      </span>
                      <h3 className="text-xl font-semibold text-[#fffdf4]">{rowLabel?.title ?? row.title}</h3>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[rgba(248,244,230,0.72)]">
                        {rowLabel?.enTitle ?? row.enTitle}
                      </span>
                      <span
                        className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                        style={{ borderColor: `${visual.accent}55`, backgroundColor: visual.wash, color: visual.accent }}
                      >
                        {visual.label}
                      </span>
                      {onSelectRow ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelectRow(row.id);
                          }}
                          className="rounded-full border px-3 py-1 text-xs font-semibold transition hover:-translate-y-0.5"
                          style={
                            rowSelected
                              ? {
                                  borderColor: '#f6f1df',
                                  backgroundColor: 'rgba(246,241,223,0.14)',
                                  color: '#fffdf4',
                                  boxShadow: `0 0 18px ${visual.accent}30`,
                                }
                              : {
                                  borderColor: 'rgba(248,244,230,0.48)',
                                  backgroundColor: 'rgba(255,255,255,0.05)',
                                  color: '#fbf7e8',
                                }
                          }
                        >
                          {rowSelected ? '当前层级' : '查看层级'}
                        </button>
                      ) : null}
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgba(248,244,230,0.84)]">{row.thesis}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {row.layers.map((layer) => {
                        const selected = selectedLayerId === layer.id;
                        const chipStyle = selected
                          ? {
                              borderColor: '#8bd8ff',
                              backgroundColor: '#8bd8ff',
                              color: '#031014',
                              boxShadow: '0 0 18px rgba(139,216,255,0.24)',
                            }
                          : {
                              borderColor: 'rgba(139,216,255,0.44)',
                              backgroundColor: 'rgba(4,16,24,0.72)',
                              color: '#91dcff',
                            };

                        return onSelectLayer ? (
                          <button
                            key={layer.id}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              onSelectLayer(layer.id);
                              onSelectRow?.(row.id);
                            }}
                            className="rounded-full border px-2.5 py-1 text-xs font-medium transition hover:border-[#8bd8ff]"
                            style={chipStyle}
                          >
                            {layer.name.zh}
                          </button>
                        ) : (
                          <span key={layer.id} className="rounded-full border px-2.5 py-1 text-xs font-medium" style={chipStyle}>
                            {layer.name.zh}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex max-w-full flex-wrap gap-2 xl:max-w-[30rem] xl:justify-end">
                    {row.featuredCompanies.map((company) => {
                      const selected = selectedCompanyId === company.id;
                      const companyChipStyle = selected
                        ? {
                            borderColor: '#8bd8ff',
                            backgroundColor: '#8bd8ff',
                            color: '#031014',
                            boxShadow: '0 0 22px rgba(139,216,255,0.26)',
                          }
                        : {
                            borderColor: 'rgba(248,244,230,0.42)',
                            backgroundColor: 'rgba(255,255,255,0.075)',
                            color: '#fbf7e8',
                          };

                      return onSelectCompany ? (
                        <button
                          key={company.id}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelectCompany(company.id);
                          }}
                          className="inline-flex h-9 max-w-full items-center gap-2 rounded-full border px-2.5 text-xs transition hover:border-[#8bd8ff]"
                          style={companyChipStyle}
                        >
                          <span className="font-mono text-[10px] text-[#d8b85a]">{company.logo}</span>
                          <span className="max-w-[8.5rem] truncate">{company.name.zh}</span>
                        </button>
                      ) : (
                        <span
                          key={company.id}
                          className="inline-flex h-9 max-w-full items-center gap-2 rounded-full border px-2.5 text-xs"
                          style={companyChipStyle}
                        >
                          <span className="font-mono text-[10px] text-[#d8b85a]">{company.logo}</span>
                          <span className="max-w-[8.5rem] truncate">{company.name.zh}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const RelationshipGraph = ({
  target,
  dense = false,
  mode = 'global',
  layerFilter = target?.type === 'layer' ? target.id : 'all',
  countryFilter = '',
  relationshipTypes = allRelationshipTypes,
  selectedLayerRowId,
  onSelectLayerRow,
  onSelectCompany,
  onSelectLayer,
  showDemandPanel = true,
  height,
  minHeight,
  expandedNodeIds,
  showAll = false,
  onToggleShowAll,
}: RelationshipGraphProps) => {
  const graph = useMemo(
    () =>
      buildRelationshipGraphModel({
        inputLayers: layers,
        inputCompanies: companies,
        inputRelationships: relationships,
        mode,
        layerFilter,
        countryFilter,
        relationshipTypes,
        selectedNodeId: target?.id ?? selectedLayerRowId,
        expandedNodeIds,
        showAll,
      }),
    [countryFilter, expandedNodeIds, layerFilter, mode, relationshipTypes, selectedLayerRowId, showAll, target?.id],
  );

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    const data = node.data as RelationshipNodeData;
    if (data.kind === 'company') {
      onSelectCompany?.(node.id);
      return;
    }

    onSelectLayer?.(node.id);
    if (data.rowId) onSelectLayerRow?.(data.rowId);
  };

  const hiddenCount = Math.max(graph.totalCompanyCount - graph.nodes.filter((node) => (node.data as RelationshipNodeData).kind === 'company').length, 0);
  const compactDefault = !showAll && layerFilter === 'all' && !countryFilter.trim() && !target && !selectedLayerRowId;

  const summary = useMemo(
    () => [
      { label: '显示节点', value: graph.nodes.length },
      { label: '显示关系', value: graph.edges.length },
      { label: '高亮', value: graph.highlightedNodeIds.length },
    ],
    [graph.edges.length, graph.highlightedNodeIds.length, graph.nodes.length],
  );

  return (
    <div
      data-testid="relationship-network-graph"
      className="overflow-hidden rounded-[24px] border border-[#d2d2d7]/85 bg-white/88 shadow-[0_18px_48px_rgba(29,29,31,0.06)]"
    >
      {showDemandPanel ? (
        <div className="grid grid-cols-3 divide-x divide-[#d2d2d7]/70 border-b border-[#d2d2d7]/80 bg-[#fbfbfd]/85">
          {summary.map((item) => (
            <div key={item.label} className="px-4 py-3">
              <p className="text-[11px] font-medium text-[#86868b]">{item.label}</p>
              <p className="mt-1 text-base font-semibold text-[#1d1d1f]">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}
      {onToggleShowAll || compactDefault || showAll ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d2d2d7]/70 bg-white/80 px-4 py-2.5">
          <p className="text-xs leading-5 text-[#6e6e73]">
            {compactDefault ? (
              <>默认显示每层连接最多的 {DEFAULT_TOP_COMPANIES_PER_LAYER} 家公司。点击节点查看其邻居，或展开全部。</>
            ) : showAll ? (
              <>已展开全部 {graph.totalCompanyCount} 家公司 / {graph.totalRelationshipCount} 条关系。</>
            ) : (
              <>已根据筛选/选择展开 {graph.nodes.length} 个节点{hiddenCount > 0 ? `，剩余 ${hiddenCount} 家未显示` : ''}。</>
            )}
          </p>
          {onToggleShowAll ? (
            <button
              type="button"
              onClick={() => onToggleShowAll(!showAll)}
              className="inline-flex items-center rounded-full border border-[#d2d2d7] bg-white px-3 py-1 text-xs font-medium text-[#0071e3] transition hover:border-[#8bbdff] hover:text-[#005ecb]"
            >
              {showAll ? '收起到精简视图' : '展开全部节点'}
            </button>
          ) : null}
        </div>
      ) : null}
      <div
        style={{
          height: height ?? (dense ? 'min(48rem,72vh)' : 'clamp(720px, calc(100vh - 5rem), 920px)'),
          minHeight: minHeight ?? (dense ? '34rem' : '44rem'),
        }}
      >
        <ReactFlowProvider>
          <RelationshipGraphCanvas nodes={graph.nodes} edges={graph.edges} onNodeClick={handleNodeClick} />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

type RelationshipGraphCanvasProps = {
  nodes: Node<RelationshipNodeData>[];
  edges: Edge<RelationshipEdgeData>[];
  onNodeClick: NodeMouseHandler;
};

const RelationshipGraphCanvas = ({ nodes, edges, onNodeClick }: RelationshipGraphCanvasProps) => {
  const { fitView } = useReactFlow();
  const nodeSignature = useMemo(
    () =>
      nodes
        .map((node) => node.id)
        .sort()
        .join('|'),
    [nodes],
  );

  useEffect(() => {
    if (nodes.length === 0) return;
    const handle = window.requestAnimationFrame(() => {
      fitView({ padding: 0.18, includeHiddenNodes: false, maxZoom: 1.1, duration: 320 });
    });
    return () => window.cancelAnimationFrame(handle);
  }, [fitView, nodeSignature, nodes.length]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      minZoom={0.18}
      maxZoom={1.65}
      nodesConnectable={false}
      zoomOnScroll={false}
      preventScrolling={false}
      onNodeClick={onNodeClick}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="rgba(110,110,115,.14)" gap={32} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};
