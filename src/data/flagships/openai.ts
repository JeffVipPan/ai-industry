import type { FlagshipData, FlagshipSource } from './types';

const funding: FlagshipSource = {
  label: 'OpenAI March 2025 Funding Update',
  url: 'https://openai.com/index/march-funding-updates/',
  date: '2025-03-31',
};

const stargate: FlagshipSource = {
  label: 'OpenAI Stargate Expansion',
  url: 'https://openai.com/index/five-new-stargate-sites/',
  date: '2025-09-23',
};

const revenueNote: FlagshipSource = {
  label: 'OpenAI revenue / ARR public reporting synthesis',
  url: 'https://techcrunch.com/2025/06/09/openai-claims-to-have-hit-10b-in-annual-revenue/',
  date: '2026-01',
};

export const openaiFlagship: FlagshipData = {
  companyId: 'openai',
  tagline: {
    zh: '把大模型需求变成全球算力订单的入口',
    en: 'The demand engine turning models into global compute orders',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'OpenAI 是 AI 产业链的需求端发动机。它不是上市公司，没有审计财报；公开信息显示 2025 年完成 $40B 融资、投后估值 $300B，年化收入在 2025 年从约 $10B 继续向 $20B+ run rate 推进，实际年度收入可按约 $13B 量级估算。ChatGPT、API、企业版、Agent/Codex 类产品把模型能力转化成订阅、调用和工作流费用。',
      '护城河来自三层：(1) 模型和产品品牌，ChatGPT 是消费者和开发者最强入口之一；(2) 数据和强化学习闭环，高频交互让产品、工具调用、代码、语音、多模态持续迭代；(3) 算力融资能力，OpenAI 能同时撬动 Microsoft Azure、Oracle、CoreWeave、AWS、Google Cloud 和 Stargate 级数据中心承诺。它的真实影响力不只在收入表，而在它能把未来收入预期提前变成 GPU、HBM、电力和数据中心订单。',
      '风险是现金流和治理。前沿模型训练、推理补贴、人才、数据中心预付款会长期吞噬现金；多云扩张降低 Azure 依赖，也提高合同复杂度；开源模型、Anthropic、Google Gemini、Meta Llama 和中国 DeepSeek 会压低推理价格；监管和版权诉讼会影响数据来源。读 OpenAI，是读"模型产品能否覆盖算力账单"。',
    ],
  },
  metricSources: {
    marketCap: funding,
    pe: revenueNote,
    revenue: revenueNote,
    profit: revenueNote,
    grossMargin: revenueNote,
    aiRevenueShare: {
      label: 'OpenAI revenue is AI-native by definition; loss estimates are unaudited',
      url: 'https://techcrunch.com/2025/06/09/openai-claims-to-have-hit-10b-in-annual-revenue/',
      date: '2026-01',
    },
  },
  keyDependencies: [
    {
      id: 'openai-compute-clouds',
      pillar: '云算力合同',
      pillarEn: 'Cloud Compute Contracts',
      partnerCompanyIds: ['microsoft-azure', 'oracle-cloud', 'aws', 'google-cloud'],
      headline: '多云化把训练和推理容量提前锁定',
      thesis:
        'OpenAI 的增长上限取决于可用算力。Azure 仍是核心合作方，Oracle/Stargate、CoreWeave、AWS 和 Google Cloud 则提供增量与议价能力。多云化是降风险，也是为了在 GPU 稀缺期抢占容量。',
      evidence: [
        {
          text: 'OpenAI 宣布 Stargate 项目向 $500B、10GW AI 基础设施承诺推进，并新增多个数据中心站点。',
          source: stargate,
        },
        {
          text: 'OpenAI 2025 年融资 $40B，投后估值 $300B，用于扩大研究和计算基础设施。',
          source: funding,
        },
      ],
      whatBreaksIt:
        '如果收入增速低于云合同和折旧成本，或多云集群效率不如单一架构，OpenAI 的融资能力会被重新定价。',
    },
    {
      id: 'openai-accelerator-stack',
      pillar: 'GPU / HBM / 网络',
      pillarEn: 'GPU / HBM Stack',
      partnerCompanyIds: ['nvidia', 'sk-hynix', 'tsmc'],
      headline: '前沿模型仍受 NVIDIA GPU、HBM 和先进封装约束',
      thesis:
        '模型参数、上下文窗口、工具调用和多模态推理都在吞算力。OpenAI 可以抽象云供应商，但底层仍回到 NVIDIA GPU、TSMC 先进制程/CoWoS、SK 海力士/美光 HBM 与高速网络。',
      evidence: [
        {
          text: 'OpenAI 披露 Stargate 容量已经开始运行早期训练和推理工作负载，底层包括 NVIDIA GB200 racks。',
          source: {
            label: 'OpenAI Stargate Oracle partnership',
            url: 'https://openai.com/index/stargate-advances-with-partnership-with-oracle/',
            date: '2025-07-22',
          },
        },
      ],
      whatBreaksIt:
        'HBM 或 GPU 供给短缺、集群利用率低、或模型效率突破导致新增训练需求放缓，都会改变 OpenAI 对上游的拉动。',
    },
    {
      id: 'openai-product-monetization',
      pillar: '产品商业化',
      pillarEn: 'Product Monetization',
      partnerCompanyIds: ['microsoft-copilot', 'anthropic', 'google-deepmind'],
      headline: '订阅、API 和企业 Agent 决定算力账单能否被覆盖',
      thesis:
        'OpenAI 的收入来自 ChatGPT 订阅、API、企业版、工具和 Agent 工作流。模型能力若不能持续转化成高频付费，基础设施承诺会先变成现金流压力。',
      evidence: [
        {
          text: '公开报道显示 OpenAI 2025 年 ARR 快速突破 $10B，并继续向更高 run rate 推进。',
          source: revenueNote,
        },
      ],
      whatBreaksIt:
        '如果企业 Agent ROI 不清晰、消费者订阅增长放缓、或开源模型压价，OpenAI 的收入质量会低于资本市场预期。',
    },
  ],
  chinaComparison: {
    headline: '中国基础模型对标路径',
    thesis:
      '中国对标 OpenAI 的公司分成两类：DeepSeek 代表低成本高效率开源路线，智谱/月之暗面代表商业闭源和长上下文应用，百度文心则代表大厂云+模型一体化。它们都在用更低算力预算逼近前沿模型，但全球商业化和算力融资能力仍弱于 OpenAI。',
    peers: [
      {
        companyId: 'deepseek',
        product: 'DeepSeek-V / R 系列、开源推理模型',
        processNode: '国产/受限 GPU + 算法效率优化',
        ecosystem: '开源社区、开发者和企业私有化部署',
        gapNote: '性价比和开源传播强，但消费级产品、全球企业销售和算力融资弱于 OpenAI。',
      },
      {
        companyId: 'zhipu-ai',
        product: 'GLM / 智谱清言 / Agent 平台',
        processNode: '国产算力 + 云 GPU 混合',
        ecosystem: '政企、开发者 API、国产模型生态',
        gapNote: '本土政企落地强，但模型品牌和全球开发者心智弱。',
      },
      {
        companyId: 'moonshot-ai',
        product: 'Kimi / 长上下文模型',
        processNode: '云 GPU + 推理优化',
        ecosystem: 'C 端助手、长文档和办公场景',
        gapNote: '产品体验强，但收入规模、企业 API 和基础设施融资仍小。',
      },
    ],
    structuralGap:
      '结构性差距在算力、资本和全球分发。中国模型公司有算法效率和本土场景优势，但高端 GPU、海外企业销售、生态插件和美元融资规模仍限制其复制 OpenAI 路线。',
    sources: [
      {
        label: 'DeepSeek 官网',
        url: 'https://www.deepseek.com/',
        date: '2026-05',
      },
      {
        label: '智谱 AI 官网',
        url: 'https://www.zhipuai.cn/',
        date: '2026-05',
      },
      {
        label: 'Kimi 官网',
        url: 'https://kimi.moonshot.cn/',
        date: '2026-05',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 0.05, profit: -0.5, grossMargin: 0.45, rnd: 0.5, dataCenterRevenue: 0.05 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 0.2, profit: -0.6, grossMargin: 0.45, rnd: 0.9, dataCenterRevenue: 0.2 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 1.6, profit: -2.0, grossMargin: 0.5, rnd: 2.5, dataCenterRevenue: 1.6 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 3.7, profit: -5.0, grossMargin: 0.52, rnd: 6.0, dataCenterRevenue: 3.7 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 13.0, profit: -8.5, grossMargin: 0.52, rnd: 12.0, dataCenterRevenue: 13.0 },
    ],
    source: revenueNote,
  },
};
