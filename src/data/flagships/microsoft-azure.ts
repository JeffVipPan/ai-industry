import type { FlagshipData, FlagshipSource } from './types';

const annual: FlagshipSource = {
  label: 'Microsoft FY2025 Annual Report',
  url: 'https://www.microsoft.com/investor/reports/ar25/index.html',
  date: '2025-07',
};

const marketNote: FlagshipSource = {
  label: 'Azure 分部估值整理（未单独上市）',
  date: '2026-05',
};

export const microsoftAzureFlagship: FlagshipData = {
  companyId: 'microsoft-azure',
  tagline: {
    zh: 'OpenAI 与企业 AI 的默认云底座',
    en: 'The default cloud rail for OpenAI and enterprise AI',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'Microsoft Azure 是 AI 云平台里最强的"分发 + 算力"组合。微软 FY2025 披露 Azure and other cloud services 增长 34%，市场估算 Azure 年收入已超过 $75B；Intelligent Cloud 分部收入约 $124B、经营利润约 $53B，Microsoft Cloud 毛利率仍有 69%。Azure 的特别之处不是 GPU 租赁本身，而是 OpenAI、Copilot、GitHub、Microsoft 365、Entra 身份体系和企业合同一起把 AI 需求导回同一个云底座。',
      '护城河来自三层：(1) OpenAI 深度绑定，训练、推理、API 和企业落地都直接拉动 Azure 消耗；(2) 企业入口，Microsoft 365、Windows、SQL Server、Teams、GitHub 和安全产品让客户不必重新采购一套 AI 基础设施；(3) 混合云和合规能力，金融、政府、制造客户愿意把模型、数据和身份放在同一个供应商体系内。Azure 是最像"AI 操作系统后台"的云。',
      '风险是资本开支越来越重。AI 基础设施拉低云毛利率，NVIDIA GPU、网络、数据中心电力和折旧会先于收入确认；OpenAI 若多云化到 Oracle、AWS、Google，Azure 的独家溢价会下降；企业客户若在推理阶段追求成本，Maia、自研 ASIC 和小模型会削弱高价 GPU 集群需求。读 Azure，是读微软能否把 AI 资本开支变成企业软件 ARPU。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: {
      label: 'Azure revenue estimate anchored to Microsoft FY2025 disclosure',
      url: 'https://www.microsoft.com/investor/reports/ar25/index.html',
      date: '2025-07',
    },
    profit: {
      label: 'Azure profit estimate; Intelligent Cloud operating income proxy',
      url: 'https://www.microsoft.com/investor/reports/ar25/index.html',
      date: '2025-07',
    },
    grossMargin: {
      label: 'Microsoft Cloud gross margin percentage',
      url: 'https://www.microsoft.com/investor/reports/ar25/index.html',
      date: '2025-07',
    },
    aiRevenueShare: {
      label: 'AI / Azure consumption share estimate',
      date: '2026-05',
    },
  },
  keyDependencies: [
    {
      id: 'azure-openai-demand',
      pillar: 'OpenAI 工作负载',
      pillarEn: 'OpenAI Workloads',
      partnerCompanyIds: ['openai', 'microsoft-copilot'],
      headline: 'OpenAI + Copilot 把训练和推理需求导入 Azure',
      thesis:
        'OpenAI 是 Azure AI 叙事的最大锚点，Copilot 则把模型调用变成企业软件里的日常消耗。Azure 的增长不只来自云迁移，而来自每个 Office、GitHub、Dynamics 和安全场景里新增的 token 成本。',
      evidence: [
        {
          text: 'FY2025 年报披露 Azure and other cloud services 增长 34%，由云和 AI 服务需求驱动。',
          source: annual,
        },
      ],
      whatBreaksIt:
        'OpenAI 多云化、模型推理成本快速下降、或 Copilot 付费转化不及预期，都会让 Azure 的 AI 溢价下降。',
    },
    {
      id: 'azure-accelerator-supply',
      pillar: 'AI 加速器供给',
      pillarEn: 'Accelerator Supply',
      partnerCompanyIds: ['nvidia', 'amd', 'tsmc'],
      headline: 'GPU、InfiniBand/Ethernet 与自研 Maia 决定可售算力',
      thesis:
        'Azure 必须同时采购 NVIDIA GPU、AMD MI 系列、网络设备，并推进 Maia 自研芯片，才能在 OpenAI 和企业客户之间分配紧缺算力。供给节奏决定 Azure AI 服务的收入上限和毛利率。',
      evidence: [
        {
          text: 'Microsoft Cloud 毛利率在 FY2025 降至 69%，管理层明确提到 AI 基础设施扩张的影响。',
          source: annual,
        },
      ],
      whatBreaksIt:
        'GPU/HBM/电力任何一环短缺，或自研 Maia 无法承担推理工作量，都会让 Azure 在高需求期出现容量和毛利双重压力。',
    },
    {
      id: 'azure-enterprise-distribution',
      pillar: '企业分发入口',
      pillarEn: 'Enterprise Distribution',
      partnerCompanyIds: ['microsoft-copilot', 'databricks', 'snowflake'],
      headline: '身份、办公、开发和数据平台把 AI 采购锁进微软合同',
      thesis:
        'Azure 的护城河不只是数据中心，而是企业软件合同。客户已经在 Microsoft 365、GitHub、Entra、SQL Server 和 Power Platform 上运行工作流，AI 功能天然以 Azure 服务形态打包。',
      evidence: [
        {
          text: 'FY2025 年报显示 Microsoft Cloud revenue 达 $168.9B，商业云仍是微软收入增长核心。',
          source: annual,
        },
      ],
      whatBreaksIt:
        '若企业把模型服务抽象成云无关层，或数据平台/应用厂商把推理路由到更便宜云，Azure 的绑定力会下降。',
    },
  ],
  chinaComparison: {
    headline: '中国 AI 云对标路径',
    thesis:
      '中国对标 Azure 的不是单一家云，而是"云 + 大模型 + 办公/开发生态"的组合。阿里云有通义和电商/企业客户，华为云有昇腾和政企私有化，腾讯云有混元和社交/游戏流量，但缺少微软式全球企业软件合同网络。',
    peers: [
      {
        companyId: 'alibaba-cloud',
        product: 'PAI / 通义千问 / 百炼平台',
        processNode: 'GPU + 含光 / 平头哥自研芯片',
        ecosystem: '阿里电商、钉钉、企业云客户',
        gapNote: '模型和云一体化较强，但全球企业软件入口弱于 Microsoft 365 + Azure。',
      },
      {
        companyId: 'huawei-cloud',
        product: '昇腾云 / 盘古大模型 / ModelArts',
        processNode: 'Ascend 910B/910C',
        ecosystem: '政企私有化、运营商、制造业',
        gapNote: '国产算力闭环更强，但全球开发者生态和海外云区域受限制。',
      },
      {
        companyId: 'tencent-cloud',
        product: '腾讯混元 / TI 平台 / 云 GPU',
        processNode: 'GPU + 自研推理优化',
        ecosystem: '微信、游戏、音视频和企业协作',
        gapNote: '应用场景深，但企业基础软件和全球云规模弱于 Azure。',
      },
    ],
    structuralGap:
      '最大差距是全球企业分发、开发者生态和合规区域覆盖。中国云厂商可以在本土政企和互联网场景复制 AI 云需求，但很难复制 Microsoft 365、GitHub、OpenAI 与 Azure 叠加的全球入口。',
    sources: [
      {
        label: '阿里云通义官网',
        url: 'https://www.aliyun.com/product/bailian',
        date: '2026-05',
      },
      {
        label: '华为云盘古大模型',
        url: 'https://www.huaweicloud.com/product/pangu.html',
        date: '2026-05',
      },
      {
        label: '腾讯云智能官网',
        url: 'https://cloud.tencent.com/product/ti',
        date: '2026-05',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'FY2021', calendarYear: 2021, revenue: 60.1, profit: 26.1, grossMargin: 0.69, rnd: 5.4, dataCenterRevenue: 33.7 },
      { fiscalYear: 'FY2022', calendarYear: 2022, revenue: 75.3, profit: 32.7, grossMargin: 0.69, rnd: 6.5, dataCenterRevenue: 45.3 },
      { fiscalYear: 'FY2023', calendarYear: 2023, revenue: 87.9, profit: 37.9, grossMargin: 0.70, rnd: 7.8, dataCenterRevenue: 55.1 },
      { fiscalYear: 'FY2024', calendarYear: 2024, revenue: 105.4, profit: 46.0, grossMargin: 0.70, rnd: 9.4, dataCenterRevenue: 64.7 },
      { fiscalYear: 'FY2025', calendarYear: 2025, revenue: 124.2, profit: 52.8, grossMargin: 0.69, rnd: 11.0, dataCenterRevenue: 75.0 },
    ],
    source: annual,
  },
};
