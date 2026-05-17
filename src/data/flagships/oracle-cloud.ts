import type { FlagshipData, FlagshipSource } from './types';

const fy2025: FlagshipSource = {
  label: 'Oracle FY2025 Results',
  url: 'https://investor.oracle.com/investor-news/news-details/2025/Oracle-Announces-Fiscal-2025-Fourth-Quarter-and-Fiscal-Full-Year-Financial-Results/default.aspx',
  date: '2025-06-11',
};

const marketNote: FlagshipSource = {
  label: 'OCI 分部估值整理（Oracle 未单独披露 OCI 利润）',
  date: '2026-05',
};

export const oracleCloudFlagship: FlagshipData = {
  companyId: 'oracle-cloud',
  tagline: {
    zh: 'AI 超级集群时代的黑马云',
    en: 'The dark-horse cloud for AI superclusters',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'Oracle Cloud 的 AI 叙事来自一个很清晰的转向：从数据库云，变成大模型训练集群供应商。FY2025 Oracle cloud services and license support 收入 $44.0B，其中 infrastructure cloud services and license support 约 $24.6B；Q4 Cloud Revenue (IaaS + SaaS) 达 $6.7B，OCI 增速显著快于传统软件。OCI 的定位不是服务数量比 AWS 多，而是用裸金属、RDMA 网络和大规模 NVIDIA 集群承接极端训练需求。',
      '护城河来自三层：(1) 数据库客户底盘，Oracle Database、Fusion、NetSuite 的企业客户让 OCI 有稳定迁移入口；(2) AI 集群交付能力，OCI 为 OpenAI、xAI、Cohere 等模型公司提供大规模 GPU 容量，价格和网络拓扑更激进；(3) 与 NVIDIA、AMD、Supermicro、电力和数据中心合作方的长单绑定。Oracle 在传统云战争里不是第一，但在 AI 超级集群里拿到了新的入口。',
      '风险也很重资产：OpenAI/Stargate 级订单会提前锁定 GPU、土地、电力和债务融资；OCI 收入增长快，但资本开支、折旧和客户集中会放大财务波动；如果客户训练需求推迟、模型效率提升或多云议价，Oracle 可能背上过高的容量承诺。读 Oracle Cloud，是读"AI 云能否用少数巨额客户重写云市场份额"。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: fy2025,
    profit: {
      label: 'OCI / cloud services operating profit estimate',
      url: 'https://investor.oracle.com/investor-news/news-details/2025/Oracle-Announces-Fiscal-2025-Fourth-Quarter-and-Fiscal-Full-Year-Financial-Results/default.aspx',
      date: '2025-06-11',
    },
    grossMargin: {
      label: 'Cloud operating margin proxy',
      date: '2026-05',
    },
    aiRevenueShare: {
      label: 'OCI AI infrastructure share estimate',
      date: '2026-05',
    },
  },
  keyDependencies: [
    {
      id: 'oci-openai-stargate',
      pillar: 'OpenAI / Stargate 需求',
      pillarEn: 'OpenAI / Stargate Demand',
      partnerCompanyIds: ['openai'],
      headline: '少数超大模型客户决定 OCI AI 集群利用率',
      thesis:
        'OCI 的 AI 云增长高度依赖 OpenAI、xAI、Cohere 等模型公司对大规模训练集群的长期承诺。Stargate 让 Oracle 获得了非传统云客户入口，也让客户集中度和融资压力同步上升。',
      evidence: [
        {
          text: 'Oracle FY2025 Q4 RPO 达 $138B，云和 AI 基础设施订单推动 backlog 上行。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        'OpenAI 多云化、训练需求推迟、或客户无法按合同消耗容量，都会让 OCI 的激进扩张变成折旧压力。',
    },
    {
      id: 'oci-gpu-network',
      pillar: 'GPU 与网络集群',
      pillarEn: 'GPU Networking',
      partnerCompanyIds: ['nvidia', 'supermicro', 'tsmc'],
      headline: 'NVIDIA GPU + RDMA 网络是 OCI 性能卖点',
      thesis:
        'OCI 用高带宽网络、裸金属和大规模集群吸引模型公司。GPU 供给、服务器交付、网络拓扑和故障隔离能力共同决定训练客户是否愿意把核心工作负载迁入 OCI。',
      evidence: [
        {
          text: 'FY2025 发布稿披露 Q4 Cloud Infrastructure (IaaS) revenue 增长 52% 至 $3.0B。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        'GPU/HBM 短缺、网络稳定性事故，或 AWS/Azure 降价抢回超大模型客户，会压低 OCI 的差异化。',
    },
    {
      id: 'oci-database-base',
      pillar: 'Oracle 数据库底盘',
      pillarEn: 'Database Base',
      partnerCompanyIds: ['microsoft-azure', 'google-cloud'],
      headline: '数据库客户迁移为 OCI 提供基础盘',
      thesis:
        '除 AI 集群外，OCI 仍依赖 Oracle Database、Exadata、Fusion 和 NetSuite 客户迁移。与 Azure、Google Cloud 的数据库互联合作可以扩大入口，但也意味着 OCI 不完全独占客户云预算。',
      evidence: [
        {
          text: 'FY2025 cloud services and license support 收入 $44.0B，占 Oracle 总收入 77%。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        '传统数据库客户迁移慢、竞争云原生数据库替代，或多云合作让客户把增量 AI 预算放在其他云。',
    },
  ],
  chinaComparison: {
    headline: '中国 AI 云对标路径',
    thesis:
      '中国对标 OCI 的不是最大公有云，而是"大规模算力集群 + 数据库/政企客户"的组合。华为云最接近 OCI 的政企和自研算力路径，阿里云有更完整公有云服务，腾讯云则在音视频和互联网应用场景有需求池。',
    peers: [
      {
        companyId: 'huawei-cloud',
        product: '昇腾云 / GaussDB / 盘古',
        processNode: 'Ascend 910B/910C',
        ecosystem: '政企、运营商、数据库国产化',
        gapNote: '最像 OCI 的政企数据库 + AI 集群路线，但海外和高端 GPU 供给受限。',
      },
      {
        companyId: 'alibaba-cloud',
        product: 'ECS GPU / PolarDB / 百炼',
        processNode: 'GPU + 平头哥芯片',
        ecosystem: '电商、钉钉、企业数据平台',
        gapNote: '云服务广度强，但超大模型训练集群客户集中度和海外需求弱于 OCI。',
      },
      {
        companyId: 'tencent-cloud',
        product: '云 GPU / 混元 / TDSQL',
        processNode: 'GPU + 国产适配',
        ecosystem: '游戏、音视频、金融云',
        gapNote: '应用侧场景深，但缺少 Oracle 数据库这种全球企业基础盘。',
      },
    ],
    structuralGap:
      '差距在于融资能力、海外数据中心、NVIDIA GPU 规模和全球企业数据库客户。中国云能在本土国产化场景替代 OCI，但很难承接全球模型公司的超大训练集群。',
    sources: [
      {
        label: '华为云官网',
        url: 'https://www.huaweicloud.com/',
        date: '2026-05',
      },
      {
        label: '阿里云官网',
        url: 'https://www.aliyun.com/',
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
      { fiscalYear: 'FY2021', calendarYear: 2021, revenue: 28.7, profit: 8.5, grossMargin: 0.296, rnd: 3.2, dataCenterRevenue: 8.5 },
      { fiscalYear: 'FY2022', calendarYear: 2022, revenue: 30.2, profit: 9.0, grossMargin: 0.298, rnd: 3.5, dataCenterRevenue: 10.5 },
      { fiscalYear: 'FY2023', calendarYear: 2023, revenue: 35.3, profit: 10.5, grossMargin: 0.298, rnd: 4.2, dataCenterRevenue: 15.2 },
      { fiscalYear: 'FY2024', calendarYear: 2024, revenue: 39.4, profit: 12.5, grossMargin: 0.317, rnd: 4.8, dataCenterRevenue: 21.2 },
      { fiscalYear: 'FY2025', calendarYear: 2025, revenue: 44.0, profit: 14.0, grossMargin: 0.318, rnd: 5.3, dataCenterRevenue: 24.6 },
    ],
    source: fy2025,
  },
};
