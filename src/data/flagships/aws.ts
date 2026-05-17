import type { FlagshipData, FlagshipSource } from './types';

const fy2025: FlagshipSource = {
  label: 'Amazon Q4/FY2025 Earnings Release',
  url: 'https://s2.q4cdn.com/299287126/files/doc_earnings/2025/q4/earnings-result/AMZN-Q4-2025-Earnings-Release.pdf',
  date: '2026-02-05',
};

const marketNote: FlagshipSource = {
  label: 'AWS 分部估值整理（未单独上市）',
  date: '2026-05',
};

export const awsFlagship: FlagshipData = {
  companyId: 'aws',
  tagline: {
    zh: 'AI 云里现金流最厚的基础设施平台',
    en: 'The cash-rich infrastructure platform for AI cloud',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'AWS 是 AI 云平台里利润最厚的底座。2025 年 AWS 销售额 $128.7B、经营利润 $45.6B，经营利润率约 35.4%；Q4 增速重新加速到 24%。它不是只靠卖 GPU，真正的强项是把 EC2、S3、EBS、VPC、数据库、Bedrock、SageMaker、Trainium 和企业安全网络打成一套可扩展基础设施。',
      '护城河来自三层：(1) 规模和服务深度，AWS 的计算、存储、数据库和网络服务仍是全球云开发者默认选项之一；(2) 自研芯片路线，Trainium、Inferentia、Graviton 让 AWS 在推理和训练成本上拥有不完全依赖 NVIDIA 的选择权；(3) Bedrock 的多模型中立平台，把 Anthropic、OpenAI、Meta、Mistral、Qwen 等模型做成可切换服务，降低客户被单一模型商锁定的顾虑。',
      '风险来自"AI 投资比传统云重得多"：GPU、HBM、电力、数据中心和折旧会吞噬自由现金流；Trainium 若无法在开发者生态上追上 CUDA，成本优势难以转化成迁移；OpenAI、Anthropic、Meta 等模型客户可能多云议价；Google Cloud 和 Azure 在模型生态上增长更快。读 AWS，是读传统云巨头如何用现金流和自研芯片对冲 NVIDIA 稀缺。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: fy2025,
    profit: fy2025,
    grossMargin: {
      label: 'AWS operating margin (segment gross margin not disclosed)',
      url: 'https://s2.q4cdn.com/299287126/files/doc_earnings/2025/q4/earnings-result/AMZN-Q4-2025-Earnings-Release.pdf',
      date: '2026-02-05',
    },
    aiRevenueShare: {
      label: 'AI infrastructure / Bedrock / accelerator consumption estimate',
      date: '2026-05',
    },
  },
  keyDependencies: [
    {
      id: 'aws-accelerator-supply',
      pillar: 'GPU 与自研芯片',
      pillarEn: 'GPU / Trainium Supply',
      partnerCompanyIds: ['nvidia', 'anthropic', 'tsmc'],
      headline: 'NVIDIA GPU 保持通用需求，Trainium 承担成本对冲',
      thesis:
        'AWS 必须一边采购 NVIDIA GPU 满足客户兼容性，一边用 Trainium/Inferentia 降低自有模型和 Bedrock 推理成本。两条路线都依赖先进制程、HBM 和高速网络。',
      evidence: [
        {
          text: 'Amazon 披露 Trainium 与 Graviton 合计年化收入 run rate 超过 $10B，Trainium2 支撑 Anthropic Project Rainier。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        'Trainium 生态迁移不及预期、HBM 供给短缺，或客户坚持使用 NVIDIA CUDA，都会限制 AWS 的成本优势。',
    },
    {
      id: 'aws-bedrock-model-supply',
      pillar: '多模型供给',
      pillarEn: 'Model Supply',
      partnerCompanyIds: ['anthropic', 'openai', 'meta-ai'],
      headline: 'Bedrock 的价值在于把模型做成云服务组合',
      thesis:
        'AWS 在模型层不是单押一个前沿模型，而是把 Anthropic Claude、OpenAI、Meta Llama、Amazon Nova、Mistral、Qwen 等模型放到 Bedrock 中统一计费、权限和部署。',
      evidence: [
        {
          text: 'FY2025 发布稿披露 Bedrock 增加 20+ fully-managed models，覆盖 Amazon Nova、Anthropic、Google、OpenAI、NVIDIA、Qwen、Mistral 等。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        '如果模型供应商绕过云平台直接卖企业合同，或客户用开源模型自部署，Bedrock 的平台抽成会被压缩。',
    },
    {
      id: 'aws-capex-power',
      pillar: '数据中心资本开支',
      pillarEn: 'Data Center Capex',
      partnerCompanyIds: ['vistra', 'constellation', 'supermicro'],
      headline: 'AI 数据中心让 AWS 从软件毛利走向重资产周期',
      thesis:
        '2025 年 Amazon 自由现金流下降，主要因为 AI 相关资本开支大幅上升。电力、冷却、土地、机柜和服务器交付节奏会直接限制 AWS 可售 AI 算力。',
      evidence: [
        {
          text: 'Amazon 披露 2025 年资本设备购买 TTM 增至 $128.3B，增量主要反映 AI 投资。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        '电力并网延迟、服务器供应链瓶颈、或 AI 需求不足以覆盖折旧，会把 AWS 高经营利润率拉回传统重资产逻辑。',
    },
  ],
  chinaComparison: {
    headline: '中国 AI 云对标路径',
    thesis:
      '中国对标 AWS 的核心是云基础设施深度、开发者生态和自研芯片。阿里云最接近 AWS 的产品广度，华为云在国产算力与政企私有化上更强，腾讯云拥有应用场景和音视频流量，但三者在全球区域、企业开发者和云原生生态上仍弱于 AWS。',
    peers: [
      {
        companyId: 'alibaba-cloud',
        product: 'ECS / PAI / 百炼 / 通义千问',
        processNode: 'GPU + 平头哥芯片',
        ecosystem: '电商、钉钉、企业云原生客户',
        gapNote: '中国最接近 AWS 服务广度的云，但海外区域和全球企业客户弱。',
      },
      {
        companyId: 'huawei-cloud',
        product: '昇腾云 / ModelArts / 盘古',
        processNode: 'Ascend 910B/910C',
        ecosystem: '政企、运营商、国产化私有云',
        gapNote: '算力国产化强，但 CUDA 兼容和全球开发者生态受限。',
      },
      {
        companyId: 'tencent-cloud',
        product: 'TI 平台 / 混元 / 云 GPU',
        processNode: 'GPU + 自研推理优化',
        ecosystem: '微信、游戏、音视频、金融客户',
        gapNote: '应用入口强，但基础云广度和开发者工具链不如 AWS。',
      },
    ],
    structuralGap:
      '差距主要在全球区域覆盖、企业云原生生态、IaaS/PaaS 服务深度和高端 GPU 供给。中国云可以在本土合规和国产算力场景替代，但难以复制 AWS 的全球开发者默认心智。',
    sources: [
      {
        label: '阿里云官网',
        url: 'https://www.aliyun.com/',
        date: '2026-05',
      },
      {
        label: '华为云官网',
        url: 'https://www.huaweicloud.com/',
        date: '2026-05',
      },
      {
        label: '腾讯云官网',
        url: 'https://cloud.tencent.com/',
        date: '2026-05',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 62.2, profit: 18.5, grossMargin: 0.298, rnd: 7.5, dataCenterRevenue: 8.0 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 80.1, profit: 22.8, grossMargin: 0.285, rnd: 9.6, dataCenterRevenue: 12.0 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 90.8, profit: 24.6, grossMargin: 0.271, rnd: 11.0, dataCenterRevenue: 18.0 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 107.6, profit: 39.8, grossMargin: 0.37, rnd: 13.0, dataCenterRevenue: 29.0 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 128.7, profit: 45.6, grossMargin: 0.354, rnd: 16.0, dataCenterRevenue: 45.1 },
    ],
    source: fy2025,
  },
};
