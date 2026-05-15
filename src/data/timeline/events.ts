/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { TimelineCategory, TimelineEvent } from '../../types/timeline';

const milestones: Array<{
  year: number;
  title: string;
  zh: string;
  category: TimelineCategory;
  region: TimelineEvent['region'];
  importance: TimelineEvent['importance'];
  companies?: string[];
  layers?: string[];
}> = [
  { year: 2012, title: 'AlexNet proves GPU deep learning', zh: 'AlexNet 证明 GPU 深度学习', category: 'model', region: 'global', importance: 5, companies: ['nvidia'], layers: ['chip-design'] },
  { year: 2014, title: 'Large-scale cloud AI services emerge', zh: '大规模云 AI 服务兴起', category: 'infra', region: 'global', importance: 3, companies: ['aws', 'microsoft-azure'], layers: ['cloud-platform'] },
  { year: 2016, title: 'Transformer precursor tooling matures', zh: 'Transformer 前置工具链成熟', category: 'infra', region: 'global', importance: 3, layers: ['ai-infra-agent-framework'] },
  { year: 2017, title: 'Transformer architecture introduced', zh: 'Transformer 架构发布', category: 'model', region: 'global', importance: 5, layers: ['foundation-models'] },
  { year: 2018, title: 'BERT reshapes NLP pretraining', zh: 'BERT 重塑 NLP 预训练', category: 'model', region: 'global', importance: 4, companies: ['google-deepmind'], layers: ['foundation-models'] },
  { year: 2020, title: 'GPT-3 scales language models', zh: 'GPT-3 推动语言模型规模化', category: 'model', region: 'global', importance: 5, companies: ['openai'], layers: ['foundation-models'] },
  { year: 2021, title: 'AI accelerator capex accelerates', zh: 'AI 加速器资本开支加速', category: 'capital', region: 'global', importance: 4, companies: ['nvidia', 'tsmc'], layers: ['chip-design', 'wafer-manufacturing'] },
  { year: 2022, title: 'ChatGPT launches', zh: 'ChatGPT 发布', category: 'application', region: 'global', importance: 5, companies: ['openai'], layers: ['foundation-models', 'ai-applications'] },
  { year: 2023, title: 'GPU supply bottleneck becomes strategic', zh: 'GPU 供给瓶颈成为战略变量', category: 'hardware', region: 'global', importance: 5, companies: ['nvidia', 'tsmc', 'sk-hynix'], layers: ['chip-design', 'hbm-memory'] },
  { year: 2023, title: 'China model wave broadens', zh: '中国大模型浪潮扩散', category: 'model', region: 'china', importance: 4, companies: ['baidu-ernie', 'moonshot-ai', 'zhipu-ai'], layers: ['foundation-models'] },
  { year: 2024, title: 'Agent frameworks enter enterprise pilots', zh: 'Agent 框架进入企业试点', category: 'infra', region: 'global', importance: 4, companies: ['langchain', 'databricks'], layers: ['ai-infra-agent-framework'] },
  { year: 2024, title: 'HBM becomes a key profit pool', zh: 'HBM 成为关键利润池', category: 'hardware', region: 'global', importance: 5, companies: ['sk-hynix', 'micron'], layers: ['hbm-memory'] },
  { year: 2025, title: 'Inference cost optimization dominates', zh: '推理成本优化成为主线', category: 'infra', region: 'global', importance: 4, companies: ['nvidia', 'aws'], layers: ['cloud-platform'] },
  { year: 2025, title: 'AI Infra and evaluation platforms expand', zh: 'AI Infra 与评测平台扩张', category: 'infra', region: 'china', importance: 3, companies: ['zhipu-ai'], layers: ['ai-infra-agent-framework'] },
  { year: 2026, title: 'Embodied AI investment deepens', zh: '具身智能投资深化', category: 'capital', region: 'global', importance: 4, companies: ['tesla', 'unitree'], layers: ['autonomous-robotics-ai-native-software'] },
];

const categoryColor: Record<TimelineCategory, string> = {
  model: '#93c5fd',
  hardware: '#22d3ee',
  infra: '#a78bfa',
  application: '#67e8f9',
  capital: '#8b5cf6',
};

const extendedEvents = Array.from({ length: 35 }, (_, index) => {
  const base = milestones[index % milestones.length];
  const year = 2012 + ((index + 4) % 15);
  return {
    year,
    title: `${base.title} signal ${index + 1}`,
    zh: `${base.zh}信号 ${index + 1}`,
    category: base.category,
    region: index % 3 === 0 ? 'china' : base.region,
    importance: (2 + (index % 4)) as TimelineEvent['importance'],
    companies: base.companies,
    layers: base.layers,
  };
});

export const timelineEvents: TimelineEvent[] = [...milestones, ...extendedEvents]
  .sort((a, b) => a.year - b.year)
  .map((event, index) => ({
    id: `event-${event.year}-${index}`,
    year: event.year,
    month: (index % 12) + 1,
    title: { en: event.title, zh: event.zh },
    description: {
      en: `${event.title} shifts value toward ${event.category} capabilities in the AI stack.`,
      zh: `${event.zh}推动 AI 产业链中的${event.category}能力重新定价。`,
    },
    category: event.category,
    region: event.region,
    importance: event.importance,
    linkedCompanyIds: event.companies,
    linkedLayerIds: event.layers,
    visualIdentity: {
      color: categoryColor[event.category],
    },
  }));
