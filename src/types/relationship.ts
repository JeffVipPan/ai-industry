import type { DataSource, EntityRef, LocaleText } from './common';

export type RelationshipType =
  | 'supplier'
  | 'customer'
  | 'competitor'
  | 'cloud-partner'
  | 'manufacturing'
  | 'model-provider'
  | 'infrastructure'
  | 'investor'
  | 'ecosystem';

export type Relationship = {
  id: string;
  from: EntityRef;
  to: EntityRef;
  type: RelationshipType;
  strength: 1 | 2 | 3 | 4 | 5;
  bidirectional: boolean;
  description?: LocaleText;
  valueFlow?: {
    direction: 'from-to' | 'to-from';
    estimatedValue: number;
    valueType: 'revenue' | 'capex' | 'profit';
  };
  _meta: {
    dataSource: DataSource;
  };
};
