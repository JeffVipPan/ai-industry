import { companies } from '../../data/companies';
import { getGlossaryEntry, type GlossaryEntry } from '../../data/glossary';
import { getLayerById } from '../../data/layers';
import { pricingPowerUserLabel } from '../../lib/labels';
import type { Company } from '../../types/company';
import type { ViewMode } from '../../types/common';
import type { Layer } from '../../types/layer';

export type ConsoleTone = 'blue' | 'mint' | 'amber' | 'lavender' | 'rose';
export type ConsoleStatus = 'stable' | 'watch' | 'critical';
export type ConsoleIconKey =
  | 'budget'
  | 'chip'
  | 'cloud'
  | 'company'
  | 'energy'
  | 'factory'
  | 'model'
  | 'network'
  | 'server'
  | 'software';

export type ConsoleFlowNode = {
  id: string;
  title: string;
  subtitle: string;
  layerId?: string;
  tone: ConsoleTone;
  iconKey: ConsoleIconKey;
  status: ConsoleStatus;
};

export type ConsoleFlowLane = {
  id: string;
  label: string;
  badge: string;
  thesis: string;
  tone: ConsoleTone;
  nodes: ConsoleFlowNode[];
};

export type ConsoleNodeInsight = {
  node: ConsoleFlowNode;
  layer: Layer;
  conclusion: string;
  localizationRate: number;
  bottlenecks: string[];
  trends: string[];
  companies: Company[];
  metrics: { label: string; value: string; description: string }[];
  glossary: GlossaryEntry[];
};

export const consoleHeroMetrics = [
  {
    label: 'AI CAPEX FLOW',
    value: '$420B',
    description: '示意年化上游资金流',
    tone: 'blue' as const,
  },
  {
    label: 'BOTTLENECK INDEX',
    value: 'GPU / HBM / EUV',
    description: '控制力最高的节点',
    tone: 'amber' as const,
  },
  {
    label: 'CHINA VECTOR',
    value: '芯片 + 云 + 应用',
    description: '国产替代路径',
    tone: 'mint' as const,
  },
];

const consoleFlowLanes: ConsoleFlowLane[] = [
  {
    id: 'capability-supply',
    label: '能力供给主链',
    badge: '从电力到智能',
    thesis: '把电力、机房、芯片、云、模型和应用串成一条连续供给链，观察 AI 能力能否规模化放大。',
    tone: 'blue',
    nodes: [
      { id: 'energy', title: '能源 / 电力', subtitle: '低碳基荷、绿电、并网容量', layerId: 'energy', tone: 'blue', iconKey: 'energy', status: 'stable' },
      { id: 'data-center', title: '数据中心', subtitle: '土地、电力、液冷、机柜密度', layerId: 'data-center', tone: 'blue', iconKey: 'company', status: 'stable' },
      { id: 'servers-networking', title: '服务器 / 网络', subtitle: 'GPU 服务器、交换机、光互联', layerId: 'servers-networking', tone: 'blue', iconKey: 'server', status: 'watch' },
      { id: 'cloud-platform', title: '云平台', subtitle: 'GPU 云、推理服务、企业入口', layerId: 'cloud-platform', tone: 'blue', iconKey: 'cloud', status: 'watch' },
      { id: 'foundation-models', title: '基础模型', subtitle: '训练、推理、多模态与 API', layerId: 'foundation-models', tone: 'blue', iconKey: 'model', status: 'stable' },
      { id: 'ai-infra-agent-framework', title: 'AI Infra', subtitle: 'RAG、Agent、评测、MLOps', layerId: 'ai-infra-agent-framework', tone: 'blue', iconKey: 'network', status: 'stable' },
      { id: 'ai-applications', title: 'AI 应用', subtitle: 'SaaS、Copilot、搜索、创作', layerId: 'ai-applications', tone: 'blue', iconKey: 'software', status: 'stable' },
      { id: 'autonomous-robotics-ai-native-software', title: '具身智能', subtitle: '自动驾驶、机器人、物理世界', layerId: 'autonomous-robotics-ai-native-software', tone: 'blue', iconKey: 'software', status: 'stable' },
    ],
  },
  {
    id: 'hardware-manufacturing',
    label: '硬件制造主链',
    badge: '把需求变成算力',
    thesis: 'GPU 不是单点资产，设备、材料、EDA、晶圆、封装和 HBM 共同决定供给速度与利润分配。',
    tone: 'lavender',
    nodes: [
      { id: 'semiconductor-materials', title: '半导体材料', subtitle: '硅片、光刻胶、电子化学品', layerId: 'semiconductor-materials', tone: 'lavender', iconKey: 'factory', status: 'stable' },
      { id: 'semiconductor-equipment', title: '半导体设备', subtitle: 'EUV、刻蚀、薄膜、量测', layerId: 'semiconductor-equipment', tone: 'lavender', iconKey: 'factory', status: 'critical' },
      { id: 'eda-ip', title: 'EDA / IP', subtitle: '设计工具、验证、IP 生态', layerId: 'eda-ip', tone: 'lavender', iconKey: 'software', status: 'watch' },
      { id: 'wafer-manufacturing', title: '晶圆制造', subtitle: '先进制程、良率、PDK', layerId: 'wafer-manufacturing', tone: 'lavender', iconKey: 'factory', status: 'critical' },
      { id: 'advanced-packaging', title: '先进封装', subtitle: 'CoWoS、Chiplet、HBM 集成', layerId: 'advanced-packaging', tone: 'lavender', iconKey: 'network', status: 'critical' },
      { id: 'hbm-memory', title: 'HBM / 存储', subtitle: '内存带宽、容量、良率', layerId: 'hbm-memory', tone: 'lavender', iconKey: 'chip', status: 'critical' },
      { id: 'chip-design', title: '核心芯片', subtitle: 'GPU、ASIC、网络芯片、软件栈', layerId: 'chip-design', tone: 'lavender', iconKey: 'chip', status: 'critical' },
      { id: 'servers-networking-return', title: '服务器 / 网络', subtitle: '把芯片组装为可用集群', layerId: 'servers-networking', tone: 'lavender', iconKey: 'server', status: 'watch' },
    ],
  },
  {
    id: 'capital-return',
    label: '收入与资本回流',
    badge: '钱往瓶颈处流',
    thesis: '应用收入先穿过模型和云成本，云资本开支继续回流到 GPU、HBM、代工、设备和电力。',
    tone: 'amber',
    nodes: [
      { id: 'enterprise-budget', title: '企业 / 消费者预算', subtitle: '软件订阅、API、自动化 ROI', tone: 'amber', iconKey: 'budget', status: 'stable' },
      { id: 'applications-revenue', title: 'AI 应用', subtitle: '最靠近客户，但成本会穿透', layerId: 'ai-applications', tone: 'amber', iconKey: 'software', status: 'stable' },
      { id: 'models-agent-revenue', title: '基础模型 / Agent', subtitle: '模型 API、推理、编排服务', layerId: 'foundation-models', tone: 'amber', iconKey: 'model', status: 'watch' },
      { id: 'cloud-capex', title: '云平台', subtitle: '把需求转为 GPU 与机房 capex', layerId: 'cloud-platform', tone: 'amber', iconKey: 'cloud', status: 'watch' },
      { id: 'gpu-hbm-capture', title: 'GPU / HBM', subtitle: '训练与推理的核心瓶颈', layerId: 'chip-design', tone: 'amber', iconKey: 'chip', status: 'critical' },
      { id: 'tsmc-cowos', title: 'TSMC / CoWoS', subtitle: '先进制造与封装产能', layerId: 'wafer-manufacturing', tone: 'amber', iconKey: 'factory', status: 'critical' },
      { id: 'euv-equipment', title: 'EUV / 设备', subtitle: '最上游的制造门槛', layerId: 'semiconductor-equipment', tone: 'amber', iconKey: 'factory', status: 'critical' },
      { id: 'power-datacenter', title: '电力 / 数据中心', subtitle: '长期资产和能源成本沉淀', layerId: 'energy', tone: 'amber', iconKey: 'energy', status: 'stable' },
    ],
  },
];

export const getConsoleFlowLanes = () => consoleFlowLanes;

export const getDefaultConsoleNode = () =>
  consoleFlowLanes
    .flatMap((lane) => lane.nodes)
    .find((node) => node.layerId === 'chip-design') ?? consoleFlowLanes[0].nodes[0];

const consoleNodeGlossaryTerms: Record<string, string[]> = {
  energy: ['核电与清洁基荷', '可再生能源 PPA', '电网调度'],
  'data-center': ['液冷', '高压直流供电', '热管理'],
  'servers-networking': ['GPU 服务器', 'InfiniBand / Ethernet', '光互联'],
  'cloud-platform': ['GPU 云', 'AI PaaS', '推理服务'],
  'foundation-models': ['Transformer', 'RLHF/RLAIF', '推理模型'],
  'ai-infra-agent-framework': ['RAG', 'Agent', 'Vector DB', 'MLOps'],
  'ai-applications': ['Copilot', 'AI Search', '自动化工作流'],
  'autonomous-robotics-ai-native-software': ['机器人基础模型', '传感器融合', '边缘推理'],
  'semiconductor-materials': ['硅片', '光刻胶', '电子特气', 'CMP 抛光液'],
  'semiconductor-equipment': ['EUV 光刻', '刻蚀', '薄膜沉积', '过程控制与量测'],
  'eda-ip': ['EDA', 'IP', '验证仿真', '物理设计'],
  'wafer-manufacturing': ['晶圆制造', '先进制程', '良率', 'PDK'],
  'advanced-packaging': ['先进封装', 'CoWoS', 'Chiplet', 'HBM 集成'],
  'hbm-memory': ['HBM', 'DRAM', '内存堆叠', 'HBM3/HBM3E'],
  'chip-design': ['GPU', 'ASIC', 'CUDA / 软件栈', 'HBM 控制器'],
  'servers-networking-return': ['GPU 服务器', 'InfiniBand / Ethernet', '光互联'],
  'applications-revenue': ['Copilot', 'AI Search', '自动化工作流'],
  'models-agent-revenue': ['Transformer', 'Agent', '推理模型'],
  'cloud-capex': ['GPU 云', '集群调度', '数据治理'],
  'gpu-hbm-capture': ['GPU', 'HBM', 'ASIC', 'CUDA / 软件栈'],
  'tsmc-cowos': ['晶圆制造', 'CoWoS', '先进封装', '良率'],
  'euv-equipment': ['EUV 光刻', '刻蚀', '过程控制与量测'],
  'power-datacenter': ['核电与清洁基荷', '液冷', '数据中心微电网'],
};

const companiesForLayer = (layer: Layer, mode: ViewMode) => {
  const preferredIds = mode === 'china' ? layer.chinaLandscape.representatives : layer.globalLandscape.leaders;
  const preferred = preferredIds
    .map((companyId) => companies.find((company) => company.id === companyId))
    .filter(Boolean) as Company[];
  const fallback = companies.filter(
    (company) => company.aiBusiness.layerIds.includes(layer.id) && (mode === 'global' || company.basicInfo.region === 'china'),
  );

  return (preferred.length ? preferred : fallback).slice(0, 6);
};

const glossaryForNode = (node: ConsoleFlowNode, layer: Layer) => {
  const terms = consoleNodeGlossaryTerms[node.id] ?? [layer.name.zh, ...layer.coreTechnologies.slice(0, 3)];
  const entries = terms
    .map((term) => getGlossaryEntry(term))
    .filter((entry): entry is GlossaryEntry => Boolean(entry));

  return Array.from(new Map(entries.map((entry) => [entry.term, entry])).values());
};

const sourceTerminalDrilldownOverrides: Record<
  string,
  Partial<Pick<ConsoleNodeInsight, 'conclusion' | 'bottlenecks' | 'trends' | 'metrics'>> & {
    localizationRate?: Partial<Record<ViewMode, number>>;
  }
> = {
  'semiconductor-materials': {
    conclusion: '材料纯度与稳定性直接影响先进制程、HBM 和先进封装良率。',
    localizationRate: {
      global: 32,
      china: 34,
    },
    bottlenecks: ['高端光刻胶', '大尺寸硅片', '先进节点验证', '稳定性'],
    trends: ['国产材料导入加速', '先进封装材料需求提升', '材料与设备协同验证'],
    metrics: [
      { label: '认证周期', value: '长', description: '示意数据' },
      { label: '利润池', value: '68/100', description: '示意数据' },
      { label: '国产化', value: '32%', description: '示意数据' },
    ],
  },
};

export const getConsoleNodeInsight = (node: ConsoleFlowNode, mode: ViewMode): ConsoleNodeInsight | null => {
  if (!node.layerId) return null;

  const layer = getLayerById(node.layerId);
  if (!layer) return null;

  const override = sourceTerminalDrilldownOverrides[layer.id];
  const localizationRate = override?.localizationRate?.[mode] ?? Math.round(layer.chinaLandscape.localizationRate * 100);

  return {
    node,
    layer,
    conclusion: override?.conclusion ?? (mode === 'china' ? layer.chinaLandscape.gapToGlobal.zh : layer.roleInAI.zh),
    localizationRate,
    bottlenecks: override?.bottlenecks ?? layer.chinaLandscape.keyBottlenecks.slice(0, 6),
    trends: override?.trends ?? layer.futureTrends.slice(0, 3).map((trend) => trend.zh),
    companies: companiesForLayer(layer, mode),
    glossary: glossaryForNode(node, layer),
    metrics: override?.metrics ?? [
      {
        label: '技术壁垒',
        value: `${layer.technicalBarrier}/5`,
        description: '越高代表越依赖长周期研发、生态或先进制造能力。',
      },
      {
        label: '国产化率',
        value: `${localizationRate}%`,
        description: '示意数据，用于比较中国画像下的替代进展。',
      },
      {
        label: '定价权',
        value: pricingPowerUserLabel[layer.pricingPower].replace('价格话语权：', ''),
        description: '观察利润池更可能向哪个瓶颈环节集中。',
      },
    ],
  };
};
