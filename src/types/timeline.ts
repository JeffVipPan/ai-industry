import type { LocaleText, Region } from './common';

export type TimelineCategory = 'model' | 'hardware' | 'infra' | 'application' | 'capital' | 'policy';

export type TimelineSource = {
  label: string;
  url: string;
};

export type TimelineEvent = {
  id: string;
  year: number;
  month?: number;
  title: LocaleText;
  description: LocaleText;
  category: TimelineCategory;
  region: Region;
  importance: 1 | 2 | 3 | 4 | 5;
  linkedCompanyIds?: string[];
  linkedLayerIds?: string[];
  sources: TimelineSource[];
  visualIdentity: {
    color: string;
    icon?: string;
  };
};
