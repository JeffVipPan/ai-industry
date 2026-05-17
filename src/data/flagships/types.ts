import type { LocaleText } from '../../types/common';

export type FlagshipSource = {
  label: string;
  url?: string;
  date: string;
};

export type FlagshipResearchNote = {
  asOf: string;
  paragraphs: string[];
};

export type FlagshipMetricSources = {
  marketCap?: FlagshipSource;
  pe?: FlagshipSource;
  revenue?: FlagshipSource;
  profit?: FlagshipSource;
  grossMargin?: FlagshipSource;
  aiRevenueShare?: FlagshipSource;
};

export type FlagshipKeyDependency = {
  id: string;
  pillar: string;
  pillarEn: string;
  partnerCompanyIds: string[];
  headline: string;
  thesis: string;
  evidence: { text: string; source: FlagshipSource }[];
  whatBreaksIt: string;
};

export type FlagshipChinaPeer = {
  companyId: string;
  product: string;
  processNode: string;
  ecosystem: string;
  gapNote: string;
};

export type FlagshipChinaComparison = {
  headline: string;
  thesis: string;
  peers: FlagshipChinaPeer[];
  structuralGap: string;
  sources: FlagshipSource[];
};

export type FlagshipFinancialPoint = {
  fiscalYear: string;
  calendarYear: number;
  revenue: number;
  profit: number;
  grossMargin: number;
  rnd: number;
  dataCenterRevenue: number;
};

export type FlagshipFinancialHistory = {
  unit: 'USD-billion';
  points: FlagshipFinancialPoint[];
  source: FlagshipSource;
};

export type FlagshipData = {
  companyId: string;
  tagline: LocaleText;
  researchNote: FlagshipResearchNote;
  metricSources: FlagshipMetricSources;
  keyDependencies: FlagshipKeyDependency[];
  chinaComparison: FlagshipChinaComparison;
  financialHistory: FlagshipFinancialHistory;
};
