/**
 * NORMALIZED ESTIMATE MODEL
 * Standardized 100-unit allocation scenarios for analysis.
 * Not audited financial data. Not real-time market data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import { getCompanyById } from '../companies';
import { getLayerById } from '../layers';
import { relationships } from '../relationships';
import { relationshipTypeLabel } from '../../lib/labels';
import type { Relationship } from '../../types/relationship';
import type {
  NormalizedValueFlowScenario,
  ValueFlowConfidence,
  ValueFlowEvidence,
  ValueFlowPathLink,
  ValueFlowPathView,
} from '../../types/valueFlow';

export const valueFlowScenarios: NormalizedValueFlowScenario[] = [
  {
    id: 'application-revenue-100',
    title: { en: 'AI application revenue allocation', zh: '应用收入 100 单位分配' },
    description: {
      en: 'A normalized view of how 100 units of AI application revenue may be absorbed by model APIs, cloud inference, operating cost and retained application margin.',
      zh: '用 100 单位 AI 应用收入做基准，观察模型 API、云推理、运营投入和应用层留存利润如何分配。',
    },
    basis: '以 100 单位 AI 应用收入为基准。所有数值为结构化分析假设，用于比较口径，不代表真实美元金额。',
    basisValue: 100,
    unit: '标准化价值单位',
    rootNodeId: 'application-revenue',
    nodes: [
      { id: 'application-revenue', label: { en: 'AI application revenue', zh: 'AI 应用收入' }, role: 'source' },
      { id: 'model-api-cost', label: { en: 'Model API cost', zh: '模型 API 成本' }, role: 'intermediate' },
      { id: 'cloud-inference-cost', label: { en: 'Cloud inference cost', zh: '云推理成本' }, role: 'intermediate' },
      { id: 'sales-implementation', label: { en: 'Sales and implementation', zh: '销售与交付' }, role: 'terminal' },
      { id: 'product-rd', label: { en: 'Product and R&D', zh: '产品与研发' }, role: 'terminal' },
      { id: 'application-profit', label: { en: 'Application retained margin', zh: '应用层留存利润' }, role: 'terminal' },
      { id: 'model-lab-margin', label: { en: 'Model lab margin', zh: '模型公司留存' }, role: 'terminal' },
      { id: 'model-compute-pass-through', label: { en: 'Model compute pass-through', zh: '模型侧算力支出' }, role: 'terminal' },
      { id: 'model-research', label: { en: 'Model research', zh: '模型研发投入' }, role: 'terminal' },
      { id: 'gpu-cloud', label: { en: 'GPU cloud', zh: 'GPU 云' }, role: 'terminal' },
      { id: 'data-center-energy', label: { en: 'Data center and energy', zh: '数据中心与能源' }, role: 'terminal' },
    ],
    links: [
      { id: 'app-to-model-api', source: 'application-revenue', target: 'model-api-cost', value: 35, flowType: 'cost', label: '模型 API 采购', description: '应用收入中用于调用基础模型和多模态 API 的部分。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'app-to-cloud-inference', source: 'application-revenue', target: 'cloud-inference-cost', value: 25, flowType: 'compute', label: '云推理与托管', description: '应用自有推理、向量检索、存储和托管成本。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'app-to-sales', source: 'application-revenue', target: 'sales-implementation', value: 15, flowType: 'cost', label: '销售与实施', description: '企业获客、客户成功、集成和部署成本。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'app-to-rd', source: 'application-revenue', target: 'product-rd', value: 10, flowType: 'cost', label: '产品研发', description: '应用层产品、数据闭环、安全和评测投入。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'app-to-profit', source: 'application-revenue', target: 'application-profit', value: 15, flowType: 'profit', label: '应用层留存利润', description: '扣除主要传导成本后留在应用层的标准化利润池。', evidence: 'analyst-assumption', confidence: 'low' },
      { id: 'model-api-to-margin', source: 'model-api-cost', target: 'model-lab-margin', value: 12, flowType: 'profit', label: '模型公司留存', description: '模型 API 收入中可被模型公司留存的部分。', evidence: 'analyst-assumption', confidence: 'low' },
      { id: 'model-api-to-compute', source: 'model-api-cost', target: 'model-compute-pass-through', value: 15, flowType: 'compute', label: '模型侧算力支出', description: '模型服务继续传导到训练和推理基础设施。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'model-api-to-research', source: 'model-api-cost', target: 'model-research', value: 8, flowType: 'cost', label: '模型研发投入', description: '模型迭代、数据、评测和安全研究投入。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'cloud-inference-to-gpu-cloud', source: 'cloud-inference-cost', target: 'gpu-cloud', value: 18, flowType: 'compute', label: 'GPU 云资源', description: '推理请求消耗的 GPU、网络和存储资源。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'cloud-inference-to-dc-energy', source: 'cloud-inference-cost', target: 'data-center-energy', value: 7, flowType: 'cost', label: '数据中心与能源', description: '机房、电力、冷却和运维成本。', evidence: 'analyst-assumption', confidence: 'medium' },
    ],
    notes: ['这是标准化收入分配模型，不是任何单一公司的真实利润表。', '中间节点保持流入流出相等，避免重复计算。'],
  },
  {
    id: 'cloud-capex-100',
    title: { en: 'AI cloud capex allocation', zh: '云资本开支 100 单位分配' },
    description: {
      en: 'A normalized view of how 100 units of AI cloud capex can flow into accelerators, networking, data centers, power and operations.',
      zh: '用 100 单位 AI 云资本开支做基准，观察加速器、网络、数据中心、电力和运维平台如何分配。',
    },
    basis: '以 100 单位 AI 云资本开支为基准。该模型表达资本开支结构，不与收入或利润池相加。',
    basisValue: 100,
    unit: '标准化价值单位',
    rootNodeId: 'cloud-capex',
    nodes: [
      { id: 'cloud-capex', label: { en: 'AI cloud capex', zh: 'AI 云资本开支' }, role: 'source' },
      { id: 'gpu-systems', label: { en: 'GPU systems', zh: 'GPU 系统' }, role: 'intermediate' },
      { id: 'networking', label: { en: 'Networking', zh: '网络互联' }, role: 'terminal' },
      { id: 'data-center-build', label: { en: 'Data-center build', zh: '数据中心建设' }, role: 'intermediate' },
      { id: 'power-cooling', label: { en: 'Power and cooling', zh: '供电与冷却' }, role: 'terminal' },
      { id: 'software-ops', label: { en: 'Software operations', zh: '软件与运维' }, role: 'terminal' },
      { id: 'accelerator-vendor', label: { en: 'Accelerator vendor', zh: '加速器供应商' }, role: 'terminal' },
      { id: 'hbm-suppliers', label: { en: 'HBM suppliers', zh: 'HBM 供应商' }, role: 'terminal' },
      { id: 'foundry-packaging', label: { en: 'Foundry and packaging', zh: '晶圆制造与封装' }, role: 'terminal' },
      { id: 'facility-shell', label: { en: 'Facility shell', zh: '机房土建与租赁' }, role: 'terminal' },
      { id: 'energy-contracts', label: { en: 'Energy contracts', zh: '电力合约' }, role: 'terminal' },
    ],
    links: [
      { id: 'capex-to-gpu-systems', source: 'cloud-capex', target: 'gpu-systems', value: 55, flowType: 'capex', label: 'GPU 系统采购', description: 'AI 云资本开支中最大的一项通常流向加速器整机和机柜。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'capex-to-networking', source: 'cloud-capex', target: 'networking', value: 12, flowType: 'capex', label: '网络互联', description: '高速交换、光模块和集群互联。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'capex-to-data-center', source: 'cloud-capex', target: 'data-center-build', value: 18, flowType: 'capex', label: '数据中心建设', description: '机房、土地、租赁、机电和交付周期相关投入。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'capex-to-power-cooling', source: 'cloud-capex', target: 'power-cooling', value: 10, flowType: 'capex', label: '供电与冷却', description: '液冷、电力接入、变配电和散热系统。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'capex-to-software-ops', source: 'cloud-capex', target: 'software-ops', value: 5, flowType: 'capex', label: '软件与运维', description: '调度、监控、集群管理和平台工程。', evidence: 'analyst-assumption', confidence: 'low' },
      { id: 'gpu-to-accelerator-vendor', source: 'gpu-systems', target: 'accelerator-vendor', value: 35, flowType: 'capex', label: '加速器供应商', description: 'GPU、ASIC 或加速卡供应商捕获的硬件价值。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'gpu-to-hbm', source: 'gpu-systems', target: 'hbm-suppliers', value: 10, flowType: 'capex', label: 'HBM 供应链', description: '高带宽内存和相关封装材料。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'gpu-to-foundry', source: 'gpu-systems', target: 'foundry-packaging', value: 10, flowType: 'capex', label: '晶圆制造与封装', description: '领先制程代工、先进封装和测试。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'dc-to-facility', source: 'data-center-build', target: 'facility-shell', value: 10, flowType: 'capex', label: '机房土建与租赁', description: '数据中心空间、机电和交付。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'dc-to-energy', source: 'data-center-build', target: 'energy-contracts', value: 8, flowType: 'capex', label: '电力合约', description: '并网、PPA 和稳定电力供给。', evidence: 'analyst-assumption', confidence: 'medium' },
    ],
    notes: ['该模型只描述资本开支结构，不与应用收入场景相加。', 'GPU 系统节点继续拆分，是为了解释价值向芯片、HBM 和制造环节传导。'],
  },
  {
    id: 'china-substitution-100',
    title: { en: 'China AI substitution allocation', zh: '中国替代投入 100 单位分配' },
    description: {
      en: 'A normalized view of how 100 units of China AI substitution investment may be allocated across domestic cloud, accelerators, foundry, equipment and model ecosystems.',
      zh: '用 100 单位中国 AI 国产替代投入做基准，观察云、加速器、制造封装、设备材料与模型应用生态如何分配。',
    },
    basis: '以 100 单位国产替代投入为基准。该模型表达投入方向，不代表任何公司收入。',
    basisValue: 100,
    unit: '标准化价值单位',
    rootNodeId: 'china-substitution-spend',
    nodes: [
      { id: 'china-substitution-spend', label: { en: 'China AI substitution spend', zh: '中国 AI 替代投入' }, role: 'source' },
      { id: 'domestic-cloud', label: { en: 'Domestic cloud', zh: '国产云平台' }, role: 'intermediate' },
      { id: 'domestic-accelerators', label: { en: 'Domestic accelerators', zh: '国产 AI 芯片' }, role: 'intermediate' },
      { id: 'foundry-packaging-cn', label: { en: 'Foundry and packaging', zh: '晶圆制造与封装' }, role: 'intermediate' },
      { id: 'equipment-materials-cn', label: { en: 'Equipment and materials', zh: '设备与材料' }, role: 'terminal' },
      { id: 'model-application-cn', label: { en: 'Model and application ecosystem', zh: '模型与应用生态' }, role: 'terminal' },
      { id: 'ali-huawei-tencent-cloud', label: { en: 'Alibaba/Huawei/Tencent Cloud', zh: '阿里云 / 华为云 / 腾讯云' }, role: 'terminal' },
      { id: 'cloud-ops-margin-cn', label: { en: 'Cloud operations margin', zh: '云运维与留存' }, role: 'terminal' },
      { id: 'huawei-ascend', label: { en: 'Huawei Ascend', zh: '华为昇腾' }, role: 'terminal' },
      { id: 'cambricon-and-others', label: { en: 'Cambricon and others', zh: '寒武纪等芯片厂' }, role: 'terminal' },
      { id: 'hbm-cuda-gap', label: { en: 'HBM/CUDA gap', zh: 'HBM 与软件生态差距' }, role: 'terminal' },
      { id: 'smic', label: { en: 'SMIC', zh: '中芯国际' }, role: 'terminal' },
      { id: 'advanced-packaging-cn', label: { en: 'Advanced packaging', zh: '先进封装' }, role: 'terminal' },
      { id: 'yield-gap-cn', label: { en: 'Yield/process gap', zh: '良率与制程差距' }, role: 'terminal' },
    ],
    links: [
      { id: 'china-to-cloud', source: 'china-substitution-spend', target: 'domestic-cloud', value: 25, flowType: 'capex', label: '国产云平台', description: '面向模型训练、推理和政企部署的本地云资源。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'china-to-accelerators', source: 'china-substitution-spend', target: 'domestic-accelerators', value: 28, flowType: 'capex', label: '国产 AI 芯片', description: '昇腾、寒武纪等训练和推理加速器投入。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'china-to-foundry', source: 'china-substitution-spend', target: 'foundry-packaging-cn', value: 18, flowType: 'capex', label: '制造与封装', description: '晶圆制造、封装测试和产能爬坡。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'china-to-equipment', source: 'china-substitution-spend', target: 'equipment-materials-cn', value: 14, flowType: 'capex', label: '设备与材料', description: '刻蚀、沉积、量测、硅片、化学品和零部件国产化。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'china-to-model-app', source: 'china-substitution-spend', target: 'model-application-cn', value: 15, flowType: 'revenue', label: '模型与应用生态', description: '国产基础模型、Agent 平台和行业应用。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'cloud-to-ali-huawei-tencent', source: 'domestic-cloud', target: 'ali-huawei-tencent-cloud', value: 20, flowType: 'capex', label: '云厂商集群', description: '阿里云、华为云、腾讯云等承担主要交付。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'cloud-to-ops-margin', source: 'domestic-cloud', target: 'cloud-ops-margin-cn', value: 5, flowType: 'profit', label: '云运维与留存', description: '云平台规模化交付后的运维能力和利润留存。', evidence: 'analyst-assumption', confidence: 'low' },
      { id: 'accelerators-to-ascend', source: 'domestic-accelerators', target: 'huawei-ascend', value: 16, flowType: 'capex', label: '华为昇腾', description: '国产训练和推理集群的关键加速器生态。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'accelerators-to-cambricon', source: 'domestic-accelerators', target: 'cambricon-and-others', value: 5, flowType: 'capex', label: '寒武纪等芯片厂', description: '其他国产 AI 芯片设计公司。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'accelerators-to-gap', source: 'domestic-accelerators', target: 'hbm-cuda-gap', value: 7, flowType: 'cost', label: 'HBM 与软件生态差距', description: '高端 HBM、软件生态和开发者迁移仍是替代成本。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'foundry-to-smic', source: 'foundry-packaging-cn', target: 'smic', value: 10, flowType: 'capex', label: '中芯国际', description: '国内晶圆制造与成熟/先进节点产能。', evidence: 'source-informed-estimate', confidence: 'medium' },
      { id: 'foundry-to-packaging', source: 'foundry-packaging-cn', target: 'advanced-packaging-cn', value: 5, flowType: 'capex', label: '先进封装', description: 'Chiplet、封装测试和模组能力。', evidence: 'analyst-assumption', confidence: 'medium' },
      { id: 'foundry-to-gap', source: 'foundry-packaging-cn', target: 'yield-gap-cn', value: 3, flowType: 'cost', label: '良率与制程差距', description: '爬坡、良率和设备限制形成的替代摩擦。', evidence: 'analyst-assumption', confidence: 'medium' },
    ],
    notes: ['该场景表达国产替代投入方向，不等同于实际营收。', '差距节点不是收入受益者，而是替代路径中的摩擦成本。'],
  },
];

const topologyUnit = '路径强度指数' as const;

const nodeLabel = (id: string) => getCompanyById(id)?.name.zh ?? getLayerById(id)?.name.zh ?? id;

const layerTier: Record<string, number> = {
  'ai-applications': 0,
  'autonomous-robotics-ai-native-software': 0,
  'ai-infra-agent-framework': 1,
  'foundation-models': 2,
  'cloud-platform': 3,
  'data-center': 4,
  'servers-networking': 4,
  'chip-design': 5,
  'eda-ip': 6,
  'hbm-memory': 6,
  'wafer-manufacturing': 6,
  'advanced-packaging': 7,
  'semiconductor-equipment': 7,
  energy: 8,
  'semiconductor-materials': 8,
};

const tierForNode = (id: string) => {
  const layer = getLayerById(id);
  if (layer) return layerTier[layer.id] ?? 4;

  const company = getCompanyById(id);
  const primaryLayerId = company?.aiBusiness.layerIds.find((layerId) => layerTier[layerId] !== undefined);
  return primaryLayerId ? layerTier[primaryLayerId] : 4;
};

const economicDirection = (relationship: Relationship) => {
  if (['supplier', 'infrastructure', 'cloud-partner', 'model-provider'].includes(relationship.type)) {
    return {
      source: relationship.to.id,
      target: relationship.from.id,
    };
  }

  return {
    source: relationship.from.id,
    target: relationship.to.id,
  };
};

const flowTypeForRelationship = (relationship: Relationship): ValueFlowPathLink['flowType'] => {
  if (relationship.valueFlow?.valueType === 'capex') return 'capex';
  if (relationship.valueFlow?.valueType === 'profit') return 'profit';
  if (relationship.type === 'infrastructure' || relationship.type === 'cloud-partner') return 'compute';
  if (relationship.type === 'supplier' || relationship.type === 'manufacturing') return 'cost';
  return 'revenue';
};

const evidenceForRelationship = (relationship: Relationship): ValueFlowEvidence =>
  relationship._meta.dataSource === 'source-terminal-demo' ? 'source-informed-estimate' : 'analyst-assumption';

const confidenceForRelationship = (relationship: Relationship): ValueFlowConfidence =>
  relationship.strength >= 4 ? 'medium' : 'low';

const hasAnyNode = (link: ValueFlowPathLink, ids: Set<string>) => ids.has(link.source) || ids.has(link.target);

const allTopologyLinks: ValueFlowPathLink[] = relationships
  .filter((relationship) => (relationship.valueFlow?.estimatedValue ?? 0) > 0)
  .map((relationship) => {
    const direction = economicDirection(relationship);
    return {
      id: `path-${relationship.id}`,
      source: direction.source,
      target: direction.target,
      sourceLabel: nodeLabel(direction.source),
      targetLabel: nodeLabel(direction.target),
      value: relationship.valueFlow?.estimatedValue ?? relationship.strength * 10,
      unit: topologyUnit,
      flowType: flowTypeForRelationship(relationship),
      relationshipType: relationship.type,
      label: relationshipTypeLabel[relationship.type],
      description: relationship.description?.zh ?? relationship.description?.en ?? '用于展示 AI 产业链价值传导路径的关系强度。',
      evidence: evidenceForRelationship(relationship),
      confidence: confidenceForRelationship(relationship),
    };
  })
  .filter((link) => link.source !== link.target)
  .filter((link) => tierForNode(link.source) < tierForNode(link.target))
  .sort((left, right) => right.value - left.value);

const byIds = (ids: string[]) => {
  const idSet = new Set(ids);
  return allTopologyLinks.filter((link) => hasAnyNode(link, idSet)).slice(0, 46);
};

const topLinks = (links: ValueFlowPathLink[], limit: number) => links.slice(0, limit);

export const valueFlowPathViews: ValueFlowPathView[] = [
  {
    id: 'economic-map',
    title: { en: 'Full value-chain topology', zh: '全链路价值路径' },
    description: {
      en: 'A broad topology view that restores the previous dense map, using relationship strength as an index rather than audited financial dollars.',
      zh: '恢复上一版大图的信息密度，用关系中的价值流强度表示路径重要性，不把它当作真实财务金额。',
    },
    unit: topologyUnit,
    caveat: '数值来自关系强度与资料推算，只用于比较路径粗细，不代表美元金额，也不能跨视角相加。',
    links: topLinks(allTopologyLinks, 72),
  },
  {
    id: 'application-stack',
    title: { en: 'Application to infrastructure path', zh: '应用到基础设施路径' },
    description: {
      en: 'Tracks how downstream application demand routes back into agent infrastructure, models, cloud platforms and compute supply.',
      zh: '观察应用需求如何回流到智能体框架、基础模型、云平台和算力供给。',
    },
    unit: topologyUnit,
    caveat: '这是需求传导路径，不等同于收入分配表。',
    links: byIds(['ai-applications', 'ai-infra-agent-framework', 'foundation-models', 'cloud-platform', 'servers-networking', 'chip-design']),
  },
  {
    id: 'semiconductor-bottleneck',
    title: { en: 'Semiconductor bottleneck path', zh: '半导体瓶颈路径' },
    description: {
      en: 'Shows how AI compute demand reaches accelerators, HBM, foundry, packaging, EDA, equipment and materials.',
      zh: '展示 AI 算力需求如何传导到加速器、HBM、代工、封装、EDA、设备和材料。',
    },
    unit: topologyUnit,
    caveat: '强度高说明路径重要，不代表该环节实际收入规模。',
    links: byIds([
      'chip-design',
      'hbm-memory',
      'wafer-manufacturing',
      'advanced-packaging',
      'eda-ip',
      'semiconductor-equipment',
      'semiconductor-materials',
      'nvidia',
      'tsmc',
      'asml',
      'sk-hynix',
    ]),
  },
  {
    id: 'china-substitution-network',
    title: { en: 'China substitution topology', zh: '中国替代路径拓扑' },
    description: {
      en: 'Highlights domestic cloud, accelerators, foundry, equipment, materials and application paths in the China view.',
      zh: '突出中国视角下云、AI 芯片、制造封装、设备材料和应用生态的替代路径。',
    },
    unit: topologyUnit,
    caveat: '该视角强调替代路径和瓶颈，不代表国产厂商真实收入。',
    links: byIds([
      'alibaba-cloud',
      'tencent-cloud',
      'huawei-cloud',
      'huawei-hisilicon',
      'huawei-ascend',
      'smic',
      'naura',
      'cambricon',
      'kingsoft-office',
      'baidu-ernie',
      'deepseek',
      'gds',
      'chindata',
      'jcet',
      'tongfu',
    ]),
  },
];

export const valueFlows = valueFlowScenarios.flatMap((scenario) =>
  scenario.links.map((link) => ({
    id: `${scenario.id}-${link.id}`,
    source: link.source,
    target: link.target,
    label: link.label,
    value: link.value,
    unit: scenario.unit,
    description: link.description,
    flowType: link.flowType,
  })),
);
