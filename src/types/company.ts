import type { DataSource, LocaleText, Region } from './common';

export type CompanyType = 'public' | 'private' | 'subsidiary' | 'state-owned' | 'undisclosed';

export type Company = {
  id: string;
  name: LocaleText;
  logo: string;
  basicInfo: {
    country: string;
    region: Region;
    type: CompanyType;
    ticker?: string;
    exchange?: string;
    founded: number;
    headquarters: string;
    ceo?: string;
    parentCompanyId?: string;
  };
  publicMetrics?: {
    marketCap: number | 'N/A';
    pe: number | 'N/A';
    revenue: number | 'N/A';
    profit: number | 'N/A';
    grossMargin: number | 'N/A';
    currency: 'USD' | 'CNY' | 'EUR';
  };
  privateMetrics?: {
    valuation: number | 'Not disclosed';
    fundingRounds: { round: string; amount: number; date: string }[];
    keyInvestors: string[];
  };
  aiBusiness: {
    coreProducts: string[];
    layerIds: string[];
    aiRevenueShare: number;
    strategicPosition: LocaleText;
    moats: { type: string; description: string }[];
    risks: { type: string; description: string }[];
    futureOpportunities: string[];
  };
  visualIdentity: {
    size: number;
    glowIntensity: number;
    color?: string;
  };
  _meta: {
    dataSource: DataSource;
    lastUpdated: string;
  };
};
