import type { Company } from '../../types/company';
import type { RelationshipType } from '../../types/relationship';
import { companies, getCompanyById } from '../companies';
import { financialHistory } from '../financial';
import { getLayerById, layers } from '../layers';
import { relationships } from '../relationships';
import { timelineEvents } from '../timeline';
import { valueFlowScenarios } from '../value-flows';

export type CompanyFilter = {
  layerId?: string;
  region?: Company['basicInfo']['region'];
  type?: Company['basicInfo']['type'];
  relationshipType?: RelationshipType;
};

export const mockAdapter = {
  async getLayers() {
    return layers;
  },
  async getLayerById(id: string) {
    return getLayerById(id);
  },
  async getCompanies(filter?: CompanyFilter) {
    return companies.filter((company) => {
      if (filter?.layerId && !company.aiBusiness.layerIds.includes(filter.layerId)) return false;
      if (filter?.region && company.basicInfo.region !== filter.region) return false;
      if (filter?.type && company.basicInfo.type !== filter.type) return false;
      if (filter?.relationshipType) {
        return relationships.some(
          (relationship) =>
            relationship.type === filter.relationshipType &&
            (relationship.from.id === company.id || relationship.to.id === company.id),
        );
      }
      return true;
    });
  },
  async getCompanyById(id: string) {
    return getCompanyById(id);
  },
  async getRelationshipsByCompanyId(companyId: string) {
    return relationships.filter((relationship) => relationship.from.id === companyId || relationship.to.id === companyId);
  },
  async getRelationshipsByLayerId(layerId: string) {
    return relationships.filter((relationship) => relationship.from.id === layerId || relationship.to.id === layerId);
  },
  async getRelationships() {
    return relationships;
  },
  async getValueFlowScenarios() {
    return valueFlowScenarios;
  },
  async getTimelineEvents() {
    return timelineEvents;
  },
  async getFinancialHistory(companyId: string) {
    return financialHistory[companyId] ?? [];
  },
};

export type DataAdapter = typeof mockAdapter;
