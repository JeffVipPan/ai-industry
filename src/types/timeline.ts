import type { LocaleText, Region } from './common';

export type TimelineCategory = 'model' | 'hardware' | 'infra' | 'application' | 'capital';

export type TimelineEvent = {
  id: string;
  year: number;
  month?: number;
  title: LocaleText;
  description: LocaleText;
  category: TimelineCategory;
  region: Extract<Region, 'global' | 'china'>;
  importance: 1 | 2 | 3 | 4 | 5;
  linkedCompanyIds?: string[];
  linkedLayerIds?: string[];
  visualIdentity: {
    color: string;
    icon?: string;
  };
};
