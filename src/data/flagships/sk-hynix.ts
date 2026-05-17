import type { FlagshipData, FlagshipSource } from './types';

const annual: FlagshipSource = {
  label: 'SK Hynix FY2025 Financial Results',
  url: 'https://news.skhynix.com/sk-hynix-announces-fy25-financial-results/',
  date: '2026-01-28',
};

const q4Release: FlagshipSource = {
  label: 'SK Hynix Q4 2024 Earnings Release',
  url: 'https://www.skhynix.com/eng/pr/pressReleaseView.do?seq=4378',
  date: '2025-01-23',
};

const marketNote: FlagshipSource = {
  label: '公开市场行情整理（000660.KS，估算口径）',
  date: '2026-05',
};

export const skHynixFlagship: FlagshipData = {
  companyId: 'sk-hynix',
  tagline: {
    zh: 'AI 训练芯片的"显存独家供应商"',
    en: 'The HBM monopolist of AI training',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      'SK 海力士是 AI 时代真正的"卖铲人"。2025 年营收 KRW 97.1T（约 $70B）、净利润 KRW 42.9T（约 $31B），经营利润率接近 49%，创历史新高。这一跃迁几乎全部由 HBM 和服务器 DRAM 驱动——它是 NVIDIA H100/H200/B200 的 HBM3/HBM3e 主供，HBM 产能被长单锁到下一代平台。如果说 NVIDIA 是 AI 算力的中心，SK 海力士就是这颗中心的"专供显存厂"。',
      '护城河来自三层：(1) HBM TSV 工艺与 MR-MUF 封装领先三星与美光约 6-12 个月，HBM3e 12-Hi 抢先量产；(2) NVIDIA 长单锁定——B200 / Rubin 时代继续延续，HBM4 也已与英伟达深度协同设计；(3) DRAM 老本——HBM 营收虽然带来高利润，但传统 DRAM 仍是基础盘，让公司在内存周期低谷期不至于现金流断裂。HBM 单价是普通 DRAM 的 5-7 倍，毛利率结构上是"算力 ASIC 化"。',
      '风险集中在四点：(a) HBM4 切换节点——三星、美光在 HBM4 时代试图同步登场，技术代际优势可能收窄；(b) NVIDIA 议价权——单一客户主导，订单与价格谈判节奏被英伟达节制；(c) 内存周期——传统 DRAM / NAND 仍占公司一半营收，宏观换机不振会拉低毛利；(d) 中国替代——长鑫存储 HBM2/HBM3 量产爬坡，2026-2027 可能进入低端 HBM 市场。读 SK 海力士，是读"AI 算力增量 vs 内存周期波动"的赛跑。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: annual,
    profit: annual,
    grossMargin: annual,
    aiRevenueShare: {
      label: 'HBM + 高密度服务器 DRAM 占总营收估算',
      url: 'https://www.skhynix.com/eng/ir/financial-statement.do',
      date: '2025-03',
    },
  },
  keyDependencies: [
    {
      id: 'nvidia-hbm-exclusivity',
      pillar: 'NVIDIA HBM 主供身份',
      pillarEn: 'NVIDIA HBM Exclusivity',
      partnerCompanyIds: ['nvidia'],
      headline: 'H100/H200/B200 HBM3e 主供，HBM4 协同设计',
      thesis:
        'SK 海力士是首家通过 NVIDIA HBM3e 12-Hi 认证的供应商。Blackwell B200 单卡 8 颗 HBM3e、Rubin 时代单卡 HBM 容量进一步上升，订单深度绑定到 2026-2027。这种"事实独家"地位是 HBM 业务高利润的根本来源。',
      evidence: [
        {
          text: 'SK 海力士 2024 Q4 法说：HBM 占 DRAM 营收比重已超 40%，全部 HBM3e 已售罄至 2025 年底。',
          source: q4Release,
        },
        {
          text: '2024 年 HBM 业务相关营收同比增长超过 4 倍，是公司业绩复苏主驱动。',
          source: annual,
        },
      ],
      whatBreaksIt:
        '三星 / 美光 HBM3e 通过 NVIDIA 认证并量产、HBM4 时代英伟达多源采购落地、或 GPU 出货放缓导致 HBM 需求拐点。',
    },
    {
      id: 'tsv-mr-muf-tech-lead',
      pillar: 'TSV / MR-MUF 工艺领先',
      pillarEn: 'TSV / Packaging Lead',
      partnerCompanyIds: ['micron', 'samsung-memory'],
      headline: '高堆叠层数 HBM 良率优势是技术代差',
      thesis:
        'HBM 良率核心在 TSV（硅穿孔）与 MR-MUF（封装填充）。SK 海力士在 12-Hi 堆叠 HBM3e 上良率明显优于三星，是其抢得 NVIDIA 主供位置的工程基础。HBM4 时代切到混合键合（Hybrid Bonding），技术代差有可能被三星缩小。',
      evidence: [
        {
          text: '业内拆解报告：SK 海力士 HBM3e 12-Hi 良率约为三星早期版本的 1.5-2 倍。',
          source: {
            label: '公开半导体行业拆解报告整理',
            date: '2024-09',
          },
        },
        {
          text: '2025 年资本开支预算重点投向 HBM4 与混合键合产能。',
          source: q4Release,
        },
      ],
      whatBreaksIt:
        'HBM4 在混合键合上若由三星抢先、或美光在 HBM3e 12-Hi 上完成量产追赶。',
    },
    {
      id: 'dram-cycle-base',
      pillar: '传统 DRAM 周期',
      pillarEn: 'Commodity DRAM Cycle',
      partnerCompanyIds: ['samsung-memory', 'micron'],
      headline: 'DRAM/NAND 仍占营收近半，周期决定底盘',
      thesis:
        'HBM 高利润主导毛利率改善，但传统 DDR5、LPDDR、NAND 仍是公司一半营收来源。这部分受智能手机、PC、服务器需求周期主导，2024 年因 AI 服务器内存补库存而强劲，2025-2026 周期若拐头，整体毛利率将被拖累。',
      evidence: [
        {
          text: '2024 年 DDR5 服务器内存定价同比 +40%，与 HBM 共同拉动毛利改善。',
          source: q4Release,
        },
        {
          text: 'NAND 业务 2024 年仍处亏损边缘，2025 年指引温和。',
          source: annual,
        },
      ],
      whatBreaksIt:
        '消费电子需求二次探底、AI 服务器从主存增长拐点回落、或长鑫存储 / 长江存储中低端替代加速。',
    },
  ],
  chinaComparison: {
    headline: '中国存储替代路径',
    thesis:
      '长鑫存储（DRAM）与长江存储（NAND）是中国存储自给的两个主体。2024-2025 长鑫 DDR5 已规模化出货，HBM2 进入量产，HBM3 处于试产；与 SK 海力士最先进 HBM3e 12-Hi 仍有约 2 代技术代差。短期内不直接威胁 NVIDIA 用 HBM 市场，但中低端服务器与国产 AI 加速器 (昇腾、寒武纪) 已开始转向国产 HBM。',
    peers: [
      {
        companyId: 'cxmt',
        product: 'DDR4 / DDR5 / LPDDR5 / HBM2 / HBM3 (试产)',
        processNode: '17/16nm 等效 DRAM 工艺',
        ecosystem: '国产 AI 加速器 (昇腾、寒武纪) HBM 主要候选供应商',
        gapNote: '与 SK 海力士 HBM3e 12-Hi 存在 ~2 代技术代差；HBM4 时代有窗口期。',
      },
      {
        companyId: 'ymtc',
        product: 'Xtacking 3D NAND（128/232 层）',
        processNode: '3D NAND 自主架构',
        ecosystem: '国产服务器 SSD、消费类存储',
        gapNote: '不直接对标 HBM，但 NAND 自给度对中国存储产业链整体抗风险至关重要。',
      },
    ],
    structuralGap:
      '中国存储的两个结构性差距：(1) HBM 关键设备（TSV 蚀刻、键合机、MUF 设备）国产化率低，仍依赖应用材料 / 泛林 / 东京电子；(2) HBM 颗粒搭配的封装与系统级集成能力不足，与台积电 CoWoS / 日月光 FOCoS 体系协同弱。',
    sources: [
      {
        label: '长鑫存储官网与公开报道',
        url: 'https://www.cxmt.com/',
        date: '2025-04',
      },
      {
        label: '长江存储官网',
        url: 'https://www.ymtc.com/',
        date: '2025-03',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 37.6, profit: 8.4, grossMargin: 0.38, rnd: 3.2, dataCenterRevenue: 11.5 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 34.5, profit: 1.7, grossMargin: 0.24, rnd: 3.6, dataCenterRevenue: 12.0 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 25.0, profit: -7.0, grossMargin: -0.15, rnd: 3.4, dataCenterRevenue: 8.5 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 49.0, profit: 14.5, grossMargin: 0.46, rnd: 3.7, dataCenterRevenue: 28.0 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 70.4, profit: 31.1, grossMargin: 0.58, rnd: 4.6, dataCenterRevenue: 48.0 },
    ],
    source: annual,
  },
};
