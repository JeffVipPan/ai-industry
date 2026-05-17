import type { DataAdapter } from './mockAdapter';
import { mockAdapter } from './mockAdapter';

export const apiAdapter: DataAdapter = {
  async getLayers() {
    const res = await fetch('/api/layers');
    if (!res.ok) return mockAdapter.getLayers();
    return res.json();
  },
  async getLayerById(id) {
    const res = await fetch(`/api/layers/${id}`);
    if (!res.ok) return mockAdapter.getLayerById(id);
    return res.json();
  },
  async getCompanies(filter) {
    const params = new URLSearchParams(filter as Record<string, string>);
    const res = await fetch(`/api/companies?${params.toString()}`);
    if (!res.ok) return mockAdapter.getCompanies(filter);
    return res.json();
  },
  async getCompanyById(id) {
    const res = await fetch(`/api/companies/${id}`);
    if (!res.ok) return mockAdapter.getCompanyById(id);
    return res.json();
  },
  async getRelationshipsByCompanyId(companyId) {
    const res = await fetch(`/api/relationships?companyId=${companyId}`);
    if (!res.ok) return mockAdapter.getRelationshipsByCompanyId(companyId);
    return res.json();
  },
  async getRelationshipsByLayerId(layerId) {
    const res = await fetch(`/api/relationships?layerId=${layerId}`);
    if (!res.ok) return mockAdapter.getRelationshipsByLayerId(layerId);
    return res.json();
  },
  async getRelationships() {
    const res = await fetch('/api/relationships');
    if (!res.ok) return mockAdapter.getRelationships();
    return res.json();
  },
  async getValueFlows() {
    const res = await fetch('/api/value-flows');
    if (!res.ok) return mockAdapter.getValueFlows();
    return res.json();
  },
  async getTimelineEvents() {
    const res = await fetch('/api/timeline');
    if (!res.ok) return mockAdapter.getTimelineEvents();
    return res.json();
  },
  async getFinancialHistory(companyId) {
    const res = await fetch(`/api/financial/${companyId}`);
    if (!res.ok) return mockAdapter.getFinancialHistory(companyId);
    return res.json();
  },
};
