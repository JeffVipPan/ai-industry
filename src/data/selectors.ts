import type { EntityRef } from '../types/common';
import type { Company } from '../types/company';
import type { Layer } from '../types/layer';
import type { Relationship, RelationshipType } from '../types/relationship';
import { companies } from './companies';
import { layers } from './layers';
import { relationships, relationshipTypes } from './relationships';
import { companyTypeLabel, displayTerm, relationshipTypeLabel } from '../lib/labels';

export type SearchResult =
  | { type: 'company'; id: string; label: string; meta: string }
  | { type: 'layer'; id: string; label: string; meta: string }
  | { type: 'technology'; id: string; label: string; meta: string }
  | { type: 'relationship-type'; id: RelationshipType; label: string; meta: string };

const refMatches = (ref: EntityRef, type: EntityRef['type'], id: string) => ref.type === type && ref.id === id;

const otherRef = (relationship: Relationship, type: EntityRef['type'], id: string) => {
  if (refMatches(relationship.from, type, id)) return relationship.to;
  if (refMatches(relationship.to, type, id)) return relationship.from;
  return null;
};

export const findConnectedNodeIds = (type: EntityRef['type'], id: string, sourceRelationships = relationships) => {
  const edges = sourceRelationships.filter((relationship) => otherRef(relationship, type, id));
  const byType = relationshipTypes.reduce(
    (acc, relationshipType) => ({ ...acc, [relationshipType]: [] as string[] }),
    {} as Record<RelationshipType, string[]>,
  );

  edges.forEach((edge) => {
    const other = otherRef(edge, type, id);
    if (!other) return;
    byType[edge.type].push(other.id);
  });

  return {
    directIds: Array.from(new Set(edges.map((edge) => otherRef(edge, type, id)?.id).filter(Boolean))) as string[],
    byType,
    edges,
  };
};

export const getCompanyLayers = (company: Company) => company.aiBusiness.layerIds.map((id) => layers.find((layer) => layer.id === id)).filter(Boolean) as Layer[];

export const searchCatalog = (rawQuery: string): SearchResult[] => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const layerResults: SearchResult[] = layers
    .filter((layer) => {
      const searchable = [
        layer.id,
        layer.name.en,
        layer.name.zh,
        layer.description.short.en,
        layer.description.short.zh,
        ...layer.coreTechnologies,
        ...layer.coreTechnologies.map(displayTerm),
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    })
    .map((layer) => ({ type: 'layer', id: layer.id, label: layer.name.zh, meta: '产业层' }));

  const companyResults: SearchResult[] = companies
    .filter((company) => {
      const searchable = [
        company.id,
        company.name.en,
        company.name.zh,
        company.basicInfo.ticker,
        ...company.aiBusiness.coreProducts,
        ...company.aiBusiness.coreProducts.map(displayTerm),
        ...company.aiBusiness.moats.map((moat) => moat.type),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    })
    .map((company) => ({ type: 'company', id: company.id, label: company.name.zh, meta: companyTypeLabel[company.basicInfo.type] }));

  const technologyResults: SearchResult[] = layers
    .flatMap((layer) => layer.coreTechnologies.map((tech) => ({ layer, tech })))
    .filter(({ tech }) => `${tech} ${displayTerm(tech)}`.toLowerCase().includes(query))
    .map(({ layer, tech }) => ({ type: 'technology', id: `${layer.id}-${tech}`, label: displayTerm(tech), meta: layer.name.zh }));

  const relationshipResults: SearchResult[] = relationshipTypes
    .filter((type) => `${type} ${relationshipTypeLabel[type]}`.toLowerCase().includes(query))
    .map((type) => ({ type: 'relationship-type', id: type, label: relationshipTypeLabel[type], meta: '关系筛选' }));

  return [...companyResults, ...layerResults, ...technologyResults, ...relationshipResults].slice(0, 12);
};

export const modeCompanies = (mode: 'global' | 'china', input = companies) =>
  mode === 'china' ? input.filter((company) => company.basicInfo.region === 'china') : input;
