import type { CompanyType } from '../types/company';
import type { Region } from '../types/common';
import type { Layer } from '../types/layer';
import type { RelationshipType } from '../types/relationship';
import type { TimelineCategory } from '../types/timeline';

export const pricingPowerLabel: Record<Layer['pricingPower'], string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export const policySupportLabel: Record<Layer['chinaLandscape']['policySupport'], string> = {
  strong: '强',
  medium: '中',
  weak: '弱',
};

export const companyTypeLabel: Record<CompanyType, string> = {
  public: '上市公司',
  private: '未上市公司',
  subsidiary: '子公司',
  'state-owned': '国有企业',
  undisclosed: '未披露',
};

export const regionLabel: Record<Region | 'all', string> = {
  all: '全部地区',
  global: '全球',
  china: '中国',
  us: '美国',
  eu: '欧洲',
  asia: '亚洲',
};

export const timelineCategoryLabel: Record<TimelineCategory | 'all', string> = {
  all: '全部主题',
  model: '模型',
  hardware: '硬件',
  infra: '基础设施',
  application: '应用',
  capital: '资本',
};

export const relationshipTypeLabel: Record<RelationshipType, string> = {
  supplier: '供应商',
  customer: '客户',
  competitor: '竞争对手',
  'cloud-partner': '云合作',
  manufacturing: '制造',
  'model-provider': '模型提供方',
  infrastructure: '基础设施',
  investor: '投资方',
  ecosystem: '生态',
};
