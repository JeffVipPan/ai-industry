/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { ValueFlowScenario } from '../../types/valueFlow';

export const valueFlowScenarios: ValueFlowScenario[] = [
  {
    id: 'frontier-model-training',
    title: { en: 'Frontier model training', zh: '前沿模型训练' },
    description: {
      en: 'Enterprise and consumer AI revenue concentrates into cloud capacity, accelerators, HBM and advanced manufacturing.',
      zh: '企业与消费者 AI 收入向云算力、加速器、HBM 与先进制造集中。',
    },
    nodes: [
      { id: 'openai-revenue', label: { en: 'OpenAI revenue', zh: 'OpenAI 收入' }, category: 'revenue-source', linkedCompanyId: 'openai' },
      { id: 'azure', label: { en: 'Microsoft Azure', zh: 'Microsoft Azure' }, category: 'intermediate', linkedCompanyId: 'microsoft-azure' },
      { id: 'nvidia-gpu', label: { en: 'NVIDIA GPU', zh: 'NVIDIA GPU' }, category: 'intermediate', linkedCompanyId: 'nvidia' },
      { id: 'tsmc-cowos', label: { en: 'TSMC / CoWoS', zh: 'TSMC / CoWoS' }, category: 'intermediate', linkedCompanyId: 'tsmc' },
      { id: 'sk-hynix-hbm', label: { en: 'SK Hynix HBM', zh: 'SK 海力士 HBM' }, category: 'intermediate', linkedCompanyId: 'sk-hynix' },
      { id: 'asml-tools', label: { en: 'ASML tools', zh: 'ASML 设备' }, category: 'final-beneficiary', linkedCompanyId: 'asml' },
    ],
    links: [
      { source: 'openai-revenue', target: 'azure', value: 38, type: 'revenue' },
      { source: 'azure', target: 'nvidia-gpu', value: 24, type: 'capex' },
      { source: 'nvidia-gpu', target: 'tsmc-cowos', value: 9, type: 'capex' },
      { source: 'nvidia-gpu', target: 'sk-hynix-hbm', value: 7, type: 'capex' },
      { source: 'tsmc-cowos', target: 'asml-tools', value: 3, type: 'capex' },
    ],
    bottlenecks: ['nvidia-gpu', 'tsmc-cowos', 'sk-hynix-hbm'],
    keyBeneficiaries: ['nvidia-gpu', 'tsmc-cowos', 'asml-tools'],
  },
  {
    id: 'enterprise-copilot',
    title: { en: 'Enterprise copilot stack', zh: '企业 Copilot 堆栈' },
    description: { en: 'Application subscriptions flow into model APIs, cloud platforms and GPU infrastructure.', zh: '应用订阅收入流向模型 API、云平台与 GPU 基础设施。' },
    nodes: [
      { id: 'enterprise-seat', label: { en: 'Enterprise seat', zh: '企业席位' }, category: 'revenue-source' },
      { id: 'microsoft-copilot', label: { en: 'Microsoft Copilot', zh: 'Microsoft Copilot' }, category: 'intermediate', linkedCompanyId: 'microsoft-copilot' },
      { id: 'openai-api', label: { en: 'OpenAI API', zh: 'OpenAI API' }, category: 'intermediate', linkedCompanyId: 'openai' },
      { id: 'azure-gpu', label: { en: 'Azure GPU cloud', zh: 'Azure GPU 云' }, category: 'intermediate', linkedCompanyId: 'microsoft-azure' },
      { id: 'nvidia-system', label: { en: 'NVIDIA systems', zh: 'NVIDIA 系统' }, category: 'final-beneficiary', linkedCompanyId: 'nvidia' },
    ],
    links: [
      { source: 'enterprise-seat', target: 'microsoft-copilot', value: 26, type: 'revenue' },
      { source: 'microsoft-copilot', target: 'openai-api', value: 7, type: 'revenue' },
      { source: 'openai-api', target: 'azure-gpu', value: 5, type: 'capex' },
      { source: 'azure-gpu', target: 'nvidia-system', value: 4, type: 'capex' },
    ],
    bottlenecks: ['openai-api', 'azure-gpu'],
    keyBeneficiaries: ['microsoft-copilot', 'nvidia-system'],
  },
  {
    id: 'china-substitution',
    title: { en: 'China substitution path', zh: '中国国产替代路径' },
    description: { en: 'Domestic AI spend reallocates toward cloud, accelerators, foundry and EDA substitution layers.', zh: '国内 AI 支出向云、加速器、晶圆制造与 EDA 替代环节重分配。' },
    nodes: [
      { id: 'china-enterprise-ai', label: { en: 'China enterprise AI', zh: '中国企业 AI' }, category: 'revenue-source' },
      { id: 'alibaba-cloud-node', label: { en: 'Alibaba Cloud', zh: '阿里云' }, category: 'intermediate', linkedCompanyId: 'alibaba-cloud' },
      { id: 'huawei-chip', label: { en: 'Huawei AI chip', zh: '华为 AI 芯片' }, category: 'intermediate', linkedCompanyId: 'huawei-hisilicon' },
      { id: 'smic-node', label: { en: 'SMIC', zh: '中芯国际' }, category: 'intermediate', linkedCompanyId: 'smic' },
      { id: 'naura-node', label: { en: 'NAURA', zh: '北方华创' }, category: 'final-beneficiary', linkedCompanyId: 'naura' },
    ],
    links: [
      { source: 'china-enterprise-ai', target: 'alibaba-cloud-node', value: 18, type: 'revenue' },
      { source: 'alibaba-cloud-node', target: 'huawei-chip', value: 8, type: 'capex' },
      { source: 'huawei-chip', target: 'smic-node', value: 5, type: 'capex' },
      { source: 'smic-node', target: 'naura-node', value: 2, type: 'capex' },
    ],
    bottlenecks: ['huawei-chip', 'smic-node'],
    keyBeneficiaries: ['alibaba-cloud-node', 'naura-node'],
  },
  {
    id: 'robotics-inference',
    title: { en: 'Robotics inference loop', zh: '机器人推理闭环' },
    description: { en: 'Embodied AI monetization connects vehicles, edge compute, training clusters and simulation.', zh: '具身智能商业化连接车辆、边缘算力、训练集群与仿真系统。' },
    nodes: [
      { id: 'robotics-revenue', label: { en: 'Robot / vehicle revenue', zh: '机器人 / 车辆收入' }, category: 'revenue-source' },
      { id: 'tesla-node', label: { en: 'Tesla autonomy', zh: 'Tesla 自动驾驶' }, category: 'intermediate', linkedCompanyId: 'tesla' },
      { id: 'nvidia-sim', label: { en: 'NVIDIA simulation', zh: 'NVIDIA 仿真' }, category: 'intermediate', linkedCompanyId: 'nvidia' },
      { id: 'tsmc-robotics', label: { en: 'TSMC silicon', zh: 'TSMC 芯片制造' }, category: 'final-beneficiary', linkedCompanyId: 'tsmc' },
    ],
    links: [
      { source: 'robotics-revenue', target: 'tesla-node', value: 22, type: 'revenue' },
      { source: 'tesla-node', target: 'nvidia-sim', value: 5, type: 'capex' },
      { source: 'nvidia-sim', target: 'tsmc-robotics', value: 2, type: 'capex' },
    ],
    bottlenecks: ['nvidia-sim'],
    keyBeneficiaries: ['tesla-node', 'tsmc-robotics'],
  },
  {
    id: 'agent-infra',
    title: { en: 'Agent infrastructure', zh: 'Agent 基础设施' },
    description: { en: 'Agent workflow spend monetizes through orchestration, observability, data platforms and model calls.', zh: 'Agent 工作流支出通过编排、观测、数据平台与模型调用变现。' },
    nodes: [
      { id: 'agent-workflow', label: { en: 'Agent workflow', zh: 'Agent 工作流' }, category: 'revenue-source' },
      { id: 'langchain-node', label: { en: 'LangChain', zh: 'LangChain' }, category: 'intermediate', linkedCompanyId: 'langchain' },
      { id: 'databricks-node', label: { en: 'Databricks', zh: 'Databricks' }, category: 'intermediate', linkedCompanyId: 'databricks' },
      { id: 'openai-agent', label: { en: 'Model API', zh: '模型 API' }, category: 'intermediate', linkedCompanyId: 'openai' },
      { id: 'cloud-agent', label: { en: 'Cloud GPU', zh: '云 GPU' }, category: 'final-beneficiary', linkedCompanyId: 'aws' },
    ],
    links: [
      { source: 'agent-workflow', target: 'langchain-node', value: 8, type: 'revenue' },
      { source: 'agent-workflow', target: 'databricks-node', value: 11, type: 'revenue' },
      { source: 'langchain-node', target: 'openai-agent', value: 4, type: 'revenue' },
      { source: 'openai-agent', target: 'cloud-agent', value: 3, type: 'capex' },
    ],
    bottlenecks: ['openai-agent'],
    keyBeneficiaries: ['databricks-node', 'cloud-agent'],
  },
];
