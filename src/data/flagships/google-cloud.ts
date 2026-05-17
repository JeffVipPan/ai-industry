import type { FlagshipData, FlagshipSource } from './types';

const tenK: FlagshipSource = {
  label: 'Alphabet FY2025 Form 10-K',
  url: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm',
  date: '2026-02-05',
};

const q4Release: FlagshipSource = {
  label: 'Alphabet Q4/FY2025 Earnings Release',
  url: 'https://s206.q4cdn.com/479360582/files/doc_news/2026/Feb/04/attachments/2025q4-alphabet-earnings-release.pdf',
  date: '2026-02-04',
};

const marketNote: FlagshipSource = {
  label: 'Google Cloud 分部估值整理（未单独上市）',
  date: '2026-05',
};

export const googleCloudFlagship: FlagshipData = {
  companyId: 'google-cloud',
  tagline: {
    zh: 'TPU 与 Gemini 驱动的 AI 云反击者',
    en: 'The TPU-and-Gemini challenger in AI cloud',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'Google Cloud 是增长最快的头部 AI 云之一。2025 年 Alphabet 披露 Google Cloud 收入同比增加 $15.5B、增速 36%，全年收入约 $58.7B；经营利润同比增加 $7.8B，约 $13.9B。它从长期亏损分部转成利润贡献者，转折点来自 GCP、Workspace、Vertex AI、Gemini 与 TPU 基础设施的组合。',
      '护城河来自三层：(1) TPU 自研芯片，Google 是少数能在训练和推理上用自有加速器替代一部分 NVIDIA GPU 的云；(2) 模型和数据资产，Gemini、DeepMind、YouTube/Search 数据经验和 Vertex AI 让开发者能直接调用模型、搜索、多模态和 MLOps；(3) 企业云后发优势，很多客户把 Google Cloud 当成 AI/数据平台而非传统 ERP 迁移云，采购理由更贴近新工作负载。',
      '风险在于规模和客户心智仍落后 AWS/Azure。TPU 性能强，但生态迁移成本高，客户仍要 NVIDIA GPU；Gemini 若在前沿模型竞争中落后，云增量会被 Azure/OpenAI 和 AWS/Anthropic 抢走；重资产数据中心投资会压低自由现金流。读 Google Cloud，是读"自研芯片 + 自研模型 + 云平台"能否形成第三条 AI 基础设施路线。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: tenK,
    profit: tenK,
    grossMargin: {
      label: 'Google Cloud operating margin proxy',
      url: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm',
      date: '2026-02-05',
    },
    aiRevenueShare: {
      label: 'GCP AI infrastructure / Vertex AI revenue share estimate',
      date: '2026-05',
    },
  },
  keyDependencies: [
    {
      id: 'google-cloud-tpu',
      pillar: 'TPU 自研算力',
      pillarEn: 'TPU Compute',
      partnerCompanyIds: ['tsmc', 'broadcom'],
      headline: 'TPU 是 Google Cloud 与 AWS/Azure 差异化的核心',
      thesis:
        'Google Cloud 不只出租 NVIDIA GPU，还把 TPU 用于 Gemini 训练、推理和客户工作负载。TPU 的成本/性能决定 Google 是否能在大模型推理阶段获得结构性毛利优势。',
      evidence: [
        {
          text: 'Alphabet FY2025 10-K 披露 Google Cloud 收入增加 $15.5B，主要来自 GCP 增长和 AI 需求。',
          source: tenK,
        },
      ],
      whatBreaksIt:
        '如果开发者继续优先 CUDA/NVIDIA，或 TPU 软件栈无法降低迁移成本，自研芯片优势会被限制在 Google 内部工作负载。',
    },
    {
      id: 'google-cloud-gemini',
      pillar: 'Gemini / Vertex AI',
      pillarEn: 'Gemini / Vertex AI',
      partnerCompanyIds: ['google-deepmind', 'openai'],
      headline: '模型能力直接决定云平台增量',
      thesis:
        'Google Cloud 的 AI 云故事与 Gemini、DeepMind 和 Vertex AI 绑定。企业客户购买的不只是 GPU，而是模型、搜索、多模态、数据治理和 MLOps 的一体化平台。',
      evidence: [
        {
          text: 'Google Cloud 经营利润 2025 年同比增加 $7.8B，收入增长消化了技术基础设施和人员成本扩张。',
          source: tenK,
        },
      ],
      whatBreaksIt:
        'Gemini 模型口碑或企业落地速度落后，或 OpenAI/Anthropic 把多云合作变成议价工具，都会削弱 Google Cloud 的增长质量。',
    },
    {
      id: 'google-cloud-gpu-demand',
      pillar: 'NVIDIA GPU 兼容需求',
      pillarEn: 'NVIDIA Compatibility',
      partnerCompanyIds: ['nvidia', 'oracle-cloud', 'aws'],
      headline: '即使有 TPU，客户仍需要 NVIDIA GPU 池',
      thesis:
        '大量开源模型、企业训练和迁移工作负载仍围绕 CUDA/NVIDIA 优化。Google Cloud 必须同时扩 TPU 和 NVIDIA GPU，才能承接不愿重写栈的客户。',
      evidence: [
        {
          text: 'Alphabet 披露 Google Cloud 增长由 GCP across core products、AI infrastructure 和 generative AI solutions 拉动。',
          source: q4Release,
        },
      ],
      whatBreaksIt:
        'GPU 供给不足会限制短期收入，TPU 迁移不足则限制长期差异化；两者都需要高资本开支。',
    },
  ],
  chinaComparison: {
    headline: '中国 AI 云对标路径',
    thesis:
      '中国最接近 Google Cloud 路线的是"云 + 自研模型 + 自研芯片/数据平台"组合。阿里云、百度智能云和华为云分别对应 Google Cloud 的云服务、模型平台和自研算力侧，但没有 Google Search/YouTube/DeepMind 这种全球数据和研究闭环。',
    peers: [
      {
        companyId: 'alibaba-cloud',
        product: '通义千问 / 百炼 / PAI',
        processNode: 'GPU + 平头哥芯片',
        ecosystem: '电商、钉钉、企业数据平台',
        gapNote: '模型平台和云产品完整，但全球数据资产和海外企业客户弱。',
      },
      {
        companyId: 'baidu-ernie',
        product: '文心大模型 / 千帆平台',
        processNode: '昆仑芯 + GPU',
        ecosystem: '搜索、自动驾驶、企业 AI 平台',
        gapNote: '搜索与模型结合最像 Google，但云规模和全球开发者生态差距明显。',
      },
      {
        companyId: 'huawei-cloud',
        product: '盘古 / ModelArts / 昇腾云',
        processNode: 'Ascend 910B/910C',
        ecosystem: '政企私有化和国产算力',
        gapNote: '国产芯片闭环强，但开放模型生态和全球服务覆盖不足。',
      },
    ],
    structuralGap:
      '结构性差距来自全球化和底层生态：Google Cloud 同时拥有全球云区域、TPU、DeepMind、Vertex AI 与 Workspace；中国云更多在本土合规和国产算力中形成优势，海外和开源开发者心智仍不足。',
    sources: [
      {
        label: '阿里云百炼',
        url: 'https://www.aliyun.com/product/bailian',
        date: '2026-05',
      },
      {
        label: '百度智能云千帆',
        url: 'https://cloud.baidu.com/product/wenxinworkshop',
        date: '2026-05',
      },
      {
        label: '华为云盘古',
        url: 'https://www.huaweicloud.com/product/pangu.html',
        date: '2026-05',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 19.2, profit: -3.1, grossMargin: -0.161, rnd: 4.0, dataCenterRevenue: 3.0 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 26.3, profit: -1.9, grossMargin: -0.073, rnd: 5.0, dataCenterRevenue: 5.0 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 33.1, profit: 1.7, grossMargin: 0.052, rnd: 6.0, dataCenterRevenue: 10.0 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 43.2, profit: 6.1, grossMargin: 0.141, rnd: 8.0, dataCenterRevenue: 17.0 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 58.7, profit: 13.9, grossMargin: 0.237, rnd: 10.0, dataCenterRevenue: 25.8 },
    ],
    source: tenK,
  },
};
