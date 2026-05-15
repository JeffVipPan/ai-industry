import type { DataSource, LocaleText } from './common';

export type Layer = {
  id: string;
  name: LocaleText;
  order: number;
  description: {
    short: LocaleText;
    long: LocaleText;
  };
  roleInAI: LocaleText;
  whyImportant: LocaleText;
  coreTechnologies: string[];
  technicalBarrier: 1 | 2 | 3 | 4 | 5;
  businessModel: string[];
  pricingPower: 'high' | 'medium' | 'low';
  globalLandscape: {
    leaders: string[];
    marketShare: { companyId: string; share: number }[];
    competitionIntensity: 1 | 2 | 3 | 4 | 5;
  };
  chinaLandscape: {
    representatives: string[];
    gapToGlobal: LocaleText;
    localizationRate: number;
    keyBottlenecks: string[];
    policySupport: 'strong' | 'medium' | 'weak';
  };
  upstreamLayerIds: string[];
  downstreamLayerIds: string[];
  risks: { type: string; description: string }[];
  futureTrends: LocaleText[];
  visualIdentity: {
    color: string;
    geometry: 'sphere' | 'cube' | 'icosahedron';
  };
  _meta: {
    dataSource: DataSource;
    lastUpdated: string;
  };
};
