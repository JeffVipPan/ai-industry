export type LocaleText = {
  en: string;
  zh: string;
};

export type Region = 'global' | 'china' | 'us' | 'eu' | 'asia';
export type ViewMode = 'global' | 'china';
export type DataSource = 'illustrative-demo';

export type EntityRef = {
  type: 'company' | 'layer';
  id: string;
};
