/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { Layer } from '../../types/layer';

const lastUpdated = '2026-05-15';

type LayerSeed = {
  id: string;
  en: string;
  zh: string;
  short: string;
  color: string;
  geometry: Layer['visualIdentity']['geometry'];
  coreTechnologies: string[];
  leaders: string[];
  china: string[];
  technicalBarrier: Layer['technicalBarrier'];
  localizationRate: number;
  pricingPower: Layer['pricingPower'];
};

const layerSeeds: LayerSeed[] = [
  {
    id: 'energy',
    en: 'Energy',
    zh: '能源',
    short: 'Power capacity and grid resilience for AI compute growth.',
    color: '#22d3ee',
    geometry: 'sphere',
    coreTechnologies: ['Power purchase agreements', 'Grid interconnect', 'Cooling power design'],
    leaders: ['nextera', 'constellation', 'vistra'],
    china: ['state-grid', 'longi'],
    technicalBarrier: 3,
    localizationRate: 0.82,
    pricingPower: 'medium',
  },
  {
    id: 'data-center',
    en: 'Data Center',
    zh: '数据中心',
    short: 'The physical shell for power-dense AI clusters.',
    color: '#38bdf8',
    geometry: 'cube',
    coreTechnologies: ['Liquid cooling', 'Power density design', 'Interconnect fabric'],
    leaders: ['equinix', 'digital-realty', 'oracle-dc'],
    china: ['gds', 'chindata'],
    technicalBarrier: 3,
    localizationRate: 0.64,
    pricingPower: 'medium',
  },
  {
    id: 'semiconductor-equipment',
    en: 'Semiconductor Equipment',
    zh: '半导体设备',
    short: 'Lithography, deposition, etch and metrology bottlenecks.',
    color: '#60a5fa',
    geometry: 'icosahedron',
    coreTechnologies: ['EUV lithography', 'Deposition', 'Etch', 'Metrology'],
    leaders: ['asml', 'applied-materials', 'lam-research'],
    china: ['naura'],
    technicalBarrier: 5,
    localizationRate: 0.28,
    pricingPower: 'high',
  },
  {
    id: 'semiconductor-materials',
    en: 'Semiconductor Materials',
    zh: '半导体材料',
    short: 'Wafers, chemicals and packaging materials that determine yield.',
    color: '#818cf8',
    geometry: 'sphere',
    coreTechnologies: ['Silicon wafers', 'Photoresist', 'Specialty gases', 'CMP slurry'],
    leaders: ['shin-etsu', 'sumco', 'entegris'],
    china: ['anji-micro'],
    technicalBarrier: 4,
    localizationRate: 0.36,
    pricingPower: 'medium',
  },
  {
    id: 'eda-ip',
    en: 'EDA / IP',
    zh: 'EDA / IP',
    short: 'Design software and reusable IP behind advanced AI chips.',
    color: '#a78bfa',
    geometry: 'cube',
    coreTechnologies: ['Logic synthesis', 'Verification', 'IP cores', 'Physical design'],
    leaders: ['synopsys', 'cadence', 'arm'],
    china: ['empyrean'],
    technicalBarrier: 5,
    localizationRate: 0.22,
    pricingPower: 'high',
  },
  {
    id: 'chip-design',
    en: 'Chip Design',
    zh: '芯片设计',
    short: 'GPU, ASIC and accelerator architectures for training and inference.',
    color: '#22d3ee',
    geometry: 'icosahedron',
    coreTechnologies: ['GPU architecture', 'CUDA ecosystem', 'HBM interfaces', 'Inference ASICs'],
    leaders: ['nvidia', 'amd', 'broadcom'],
    china: ['huawei-hisilicon', 'cambricon'],
    technicalBarrier: 5,
    localizationRate: 0.31,
    pricingPower: 'high',
  },
  {
    id: 'wafer-manufacturing',
    en: 'Wafer Manufacturing',
    zh: '晶圆制造',
    short: 'Advanced process nodes converting designs into silicon.',
    color: '#06b6d4',
    geometry: 'sphere',
    coreTechnologies: ['Advanced nodes', 'Yield learning', 'CoWoS integration', 'Process control'],
    leaders: ['tsmc', 'samsung-foundry', 'intel-foundry'],
    china: ['smic'],
    technicalBarrier: 5,
    localizationRate: 0.27,
    pricingPower: 'high',
  },
  {
    id: 'advanced-packaging',
    en: 'Advanced Packaging',
    zh: '先进封装',
    short: 'Chiplets, substrates and 2.5D integration for AI accelerators.',
    color: '#0ea5e9',
    geometry: 'cube',
    coreTechnologies: ['CoWoS', 'Chiplets', 'Interposers', 'Substrates'],
    leaders: ['ase', 'amkor', 'ibiden'],
    china: ['jcet', 'tongfu'],
    technicalBarrier: 4,
    localizationRate: 0.46,
    pricingPower: 'medium',
  },
  {
    id: 'hbm-memory',
    en: 'HBM / Memory',
    zh: 'HBM / 存储',
    short: 'Bandwidth and memory capacity that set AI accelerator ceilings.',
    color: '#3b82f6',
    geometry: 'icosahedron',
    coreTechnologies: ['HBM3E', 'DRAM stacking', 'NAND', 'Memory controllers'],
    leaders: ['sk-hynix', 'samsung-memory', 'micron'],
    china: ['cxmt', 'ymtc'],
    technicalBarrier: 5,
    localizationRate: 0.24,
    pricingPower: 'high',
  },
  {
    id: 'servers-networking',
    en: 'Servers / Networking',
    zh: '服务器 / 网络',
    short: 'AI servers, switches and optical links that assemble clusters.',
    color: '#2563eb',
    geometry: 'sphere',
    coreTechnologies: ['GPU servers', 'NVLink', 'Ethernet fabrics', 'Optical modules'],
    leaders: ['supermicro', 'dell', 'arista'],
    china: ['innolight', 'industrial-fulian'],
    technicalBarrier: 4,
    localizationRate: 0.58,
    pricingPower: 'medium',
  },
  {
    id: 'cloud-platform',
    en: 'Cloud Platform',
    zh: '云平台',
    short: 'Compute platforms that turn GPU clusters into AI services.',
    color: '#7dd3fc',
    geometry: 'cube',
    coreTechnologies: ['GPU cloud', 'Kubernetes', 'Storage fabric', 'AI platform services'],
    leaders: ['aws', 'microsoft-azure', 'google-cloud'],
    china: ['alibaba-cloud', 'tencent-cloud'],
    technicalBarrier: 4,
    localizationRate: 0.62,
    pricingPower: 'high',
  },
  {
    id: 'foundation-models',
    en: 'Foundation Models',
    zh: '基础模型',
    short: 'Large multimodal models that convert compute into intelligence.',
    color: '#93c5fd',
    geometry: 'icosahedron',
    coreTechnologies: ['Transformer architectures', 'RLHF', 'Multimodal training', 'Inference scaling'],
    leaders: ['openai', 'anthropic', 'google-deepmind'],
    china: ['baidu-ernie', 'moonshot-ai'],
    technicalBarrier: 5,
    localizationRate: 0.52,
    pricingPower: 'high',
  },
  {
    id: 'ai-infra-agent-framework',
    en: 'AI Infra / Agent Framework',
    zh: 'AI Infra / Agent Framework',
    short: 'Tooling, orchestration and data layers for AI-native workflows.',
    color: '#c4b5fd',
    geometry: 'sphere',
    coreTechnologies: ['Vector retrieval', 'Agent orchestration', 'Fine-tuning', 'Observability'],
    leaders: ['langchain', 'databricks', 'hugging-face'],
    china: ['zhipu-ai'],
    technicalBarrier: 3,
    localizationRate: 0.68,
    pricingPower: 'medium',
  },
  {
    id: 'ai-applications',
    en: 'AI Applications',
    zh: 'AI 应用',
    short: 'Copilots and workflow products turning models into business value.',
    color: '#67e8f9',
    geometry: 'cube',
    coreTechnologies: ['Copilot UX', 'Workflow integration', 'Domain datasets', 'Evaluation loops'],
    leaders: ['microsoft-copilot', 'salesforce-einstein', 'adobe-firefly'],
    china: ['kingsoft-office'],
    technicalBarrier: 3,
    localizationRate: 0.71,
    pricingPower: 'medium',
  },
  {
    id: 'autonomous-robotics-ai-native-software',
    en: 'Autonomous / Robotics / AI Native Software',
    zh: '自动驾驶 / 机器人 / AI Native Software',
    short: 'Embodied AI and autonomous systems extending intelligence into the world.',
    color: '#8b5cf6',
    geometry: 'icosahedron',
    coreTechnologies: ['Embodied models', 'Sensor fusion', 'Planning', 'Real-time inference'],
    leaders: ['tesla', 'waymo', 'boston-dynamics'],
    china: ['unitree', 'xpeng', 'ubtech'],
    technicalBarrier: 4,
    localizationRate: 0.55,
    pricingPower: 'medium',
  },
];

export const layers: Layer[] = layerSeeds.map((seed, index, all) => {
  const upstreamLayerIds = index > 0 ? [all[index - 1].id] : [];
  const downstreamLayerIds = index < all.length - 1 ? [all[index + 1].id] : [];

  return {
    id: seed.id,
    name: { en: seed.en, zh: seed.zh },
    order: index + 1,
    description: {
      short: { en: seed.short, zh: `${seed.zh}环节决定 AI 扩张中的供给、成本和价值分配。` },
      long: {
        en: `${seed.en} is a strategic layer in the AI value chain. It converts upstream constraints into downstream capability, shaping cost, availability and pricing power across the stack.`,
        zh: `${seed.zh}是 AI 价值链中的关键环节,决定上游资源如何转化为下游能力,并影响成本、供给弹性与定价权。`,
      },
    },
    roleInAI: {
      en: `Provides the ${seed.en.toLowerCase()} capability required for scalable AI systems.`,
      zh: `为 AI 系统规模化提供${seed.zh}能力。`,
    },
    whyImportant: {
      en: `${seed.en} can become a bottleneck when AI demand expands faster than physical, software or ecosystem capacity.`,
      zh: `当 AI 需求快于供给扩张时,${seed.zh}会成为决定价值分配的瓶颈。`,
    },
    coreTechnologies: seed.coreTechnologies,
    technicalBarrier: seed.technicalBarrier,
    businessModel: ['capacity sale', 'platform service', 'ecosystem lock-in'],
    pricingPower: seed.pricingPower,
    globalLandscape: {
      leaders: seed.leaders,
      marketShare: seed.leaders.map((companyId, leaderIndex) => ({
        companyId,
        share: [38, 24, 14, 9][leaderIndex] ?? 6,
      })),
      competitionIntensity: seed.technicalBarrier > 4 ? 4 : 3,
    },
    chinaLandscape: {
      representatives: seed.china,
      gapToGlobal: {
        en: `China has visible momentum in ${seed.en.toLowerCase()}, but still faces gaps in process depth, ecosystem maturity or export-controlled inputs.`,
        zh: `中国在${seed.zh}环节具备进展,但在工艺深度、生态成熟度或受限关键输入上仍存在差距。`,
      },
      localizationRate: seed.localizationRate,
      keyBottlenecks: ['Top-tier talent density', 'Advanced tooling access', 'Long-cycle validation'],
      policySupport: seed.localizationRate < 0.35 ? 'strong' : 'medium',
    },
    upstreamLayerIds,
    downstreamLayerIds,
    risks: [
      { type: 'supply', description: 'Capacity expansion may lag demand cycles.' },
      { type: 'regulation', description: 'Export controls and procurement rules can reshape winners.' },
    ],
    futureTrends: [
      { en: 'Vertical integration will increase as AI capex concentrates.', zh: 'AI 资本开支集中会推动纵向整合。' },
      { en: 'Efficiency improvements will shift margin pools across the stack.', zh: '效率提升会改变各环节利润池。' },
    ],
    visualIdentity: {
      color: seed.color,
      geometry: seed.geometry,
    },
    _meta: {
      dataSource: 'illustrative-demo',
      lastUpdated,
    },
  };
});

export const layerIds = layers.map((layer) => layer.id);
export const getLayerById = (id: string) => layers.find((layer) => layer.id === id);
