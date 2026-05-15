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
