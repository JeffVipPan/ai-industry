import type { LocaleText } from './common';

export type ValueFlowNode = {
  id: string;
  label: LocaleText;
  category: 'revenue-source' | 'intermediate' | 'final-beneficiary';
  linkedCompanyId?: string;
};

export type ValueFlowLink = {
  source: string;
  target: string;
  value: number;
  type: 'revenue' | 'capex' | 'profit';
};

export type ValueFlowScenario = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  nodes: ValueFlowNode[];
  links: ValueFlowLink[];
  bottlenecks: string[];
  keyBeneficiaries: string[];
};

export type ValueFlow = {
  id: string;
  source: string;
  target: string;
  label: string;
  value?: number;
  unit?: string;
  description: string;
  flowType: 'revenue' | 'cost' | 'capex' | 'profit' | 'compute';
};

export type NormalizedValueFlowNode = {
  id: string;
  label: LocaleText;
  role: 'source' | 'intermediate' | 'terminal';
};

export type ValueFlowEvidence = 'public-disclosure' | 'source-informed-estimate' | 'analyst-assumption';
export type ValueFlowConfidence = 'high' | 'medium' | 'low';

export type NormalizedValueFlowLink = {
  id: string;
  source: string;
  target: string;
  value: number;
  flowType: 'revenue' | 'cost' | 'capex' | 'profit' | 'compute';
  label: string;
  description: string;
  evidence: ValueFlowEvidence;
  confidence: ValueFlowConfidence;
};

export type NormalizedValueFlowScenario = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  basis: string;
  basisValue: 100;
  unit: '标准化价值单位';
  rootNodeId: string;
  nodes: NormalizedValueFlowNode[];
  links: NormalizedValueFlowLink[];
  notes: string[];
};

export type ValueFlowPathLink = {
  id: string;
  source: string;
  target: string;
  sourceLabel: string;
  targetLabel: string;
  value: number;
  unit: '路径强度指数';
  flowType: 'revenue' | 'cost' | 'capex' | 'profit' | 'compute';
  relationshipType: string;
  label: string;
  description: string;
  evidence: ValueFlowEvidence;
  confidence: ValueFlowConfidence;
};

export type ValueFlowPathView = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  unit: '路径强度指数';
  caveat: string;
  links: ValueFlowPathLink[];
};
