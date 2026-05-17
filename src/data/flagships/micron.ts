import type { FlagshipData, FlagshipSource } from './types';

const fy2025: FlagshipSource = {
  label: 'Micron FY2025 Results',
  url: 'https://investors.micron.com/node/49371/pdf',
  date: '2025-09-23',
};

const sec: FlagshipSource = {
  label: 'Micron FY2025 Form 10-K',
  url: 'https://investors.micron.com/financial-information/sec-filings',
  date: '2025-10',
};

const marketNote: FlagshipSource = {
  label: '公开市场行情整理（MU，估算口径）',
  date: '2026-05',
};

export const micronFlagship: FlagshipData = {
  companyId: 'micron',
  tagline: {
    zh: '美国本土 HBM 与 DRAM 弹性供给',
    en: 'The U.S. HBM and DRAM swing supplier',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      '美光是 AI 内存链里最重要的"第三供给源"。FY2025 营收 $37.4B、净利润 $8.5B、毛利率 39.8%，从 FY2023 的深度亏损中快速反转；管理层明确把恢复归因于 AI 数据中心需求、DRAM 价格修复和 HBM 放量。它的战略价值不是规模最大，而是在 SK 海力士主供、三星追赶之间，为 NVIDIA、AMD 和云厂商提供美国本土、可政治叙事的 HBM/DRAM 替代供应。',
      '护城河来自三层：(1) DRAM/NAND 全栈制造能力，能把 HBM 与服务器 DDR5、企业 SSD 组合销售；(2) HBM3E 认证窗口，美光在 Blackwell 周期拿到二供位置，12-Hi HBM3E 与 HBM4 是未来两年的核心订单；(3) 美国制造和 CHIPS Act 叙事，让它在地缘政治、政府采购和本土供应链冗余中有额外溢价。美光不是 AI 算力链利润最高的公司，但它是客户降低单一韩国供应风险时最自然的选择。',
      '风险也同样清楚：内存是典型周期品，资本开支和价格修复会快速引来供给扩张；SK 海力士在 HBM 良率和 NVIDIA 协同上仍领先，美光要证明 HBM4 不是短期窗口；中国市场曾因网络安全审查受限，区域需求存在政策折价；如果云厂商训练资本开支放缓，HBM 溢价会先于普通 DRAM 回落。读美光，核心是读"AI 高端内存能否把周期股重估成结构成长股"。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: fy2025,
    profit: fy2025,
    grossMargin: fy2025,
    aiRevenueShare: {
      label: 'AI data center / HBM 收入占比估算',
      url: 'https://investors.micron.com/node/49371/pdf',
      date: '2025-09-23',
    },
  },
  keyDependencies: [
    {
      id: 'micron-hbm-qualification',
      pillar: 'HBM 客户认证',
      pillarEn: 'HBM Qualification',
      partnerCompanyIds: ['nvidia', 'amd'],
      headline: 'Blackwell 二供身份决定 HBM 溢价能否兑现',
      thesis:
        'HBM 不是普通 DRAM，客户认证、热设计、堆叠良率和供货稳定性一起决定份额。美光 FY2025 数据中心业务创高，关键在于 HBM3E 被头部 GPU 平台采用；若 HBM4 继续拿到认证，它才会从周期恢复转向结构性成长。',
      evidence: [
        {
          text: 'FY2025 发布稿披露：全年营收创纪录，数据中心业务创历史新高，AI 数据中心增长是主要驱动。',
          source: fy2025,
        },
        {
          text: 'FY2025 GAAP 毛利率升至 39.8%，说明 HBM 与高端服务器 DRAM 正在显著改善产品组合。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        '若 HBM4 认证落后、NVIDIA 多源采购把价格压回普通 DRAM 逻辑，或 Blackwell/Rubin 出货节奏低于预期，美光的盈利弹性会迅速回落。',
    },
    {
      id: 'micron-wafer-equipment',
      pillar: '先进存储制造设备',
      pillarEn: 'Memory Equipment',
      partnerCompanyIds: ['applied-materials', 'lam-research', 'tokyo-electron'],
      headline: '1-gamma DRAM 与 HBM 扩产依赖刻蚀、沉积和量测设备',
      thesis:
        '先进 DRAM/HBM 的成本曲线由制程节点、堆叠层数和良率共同决定。美光需要在美国、日本和台湾扩产，同时维持资本纪律；应用材料、泛林、东京电子等设备供应商的交付节奏决定产能坡度。',
      evidence: [
        {
          text: 'FY2025 资本支出达 $13.8B，主要投向先进 DRAM、HBM 与制造扩张。',
          source: fy2025,
        },
      ],
      whatBreaksIt:
        '设备交付延迟、良率爬坡失败、或高资本开支在价格周期顶部落地，都会把盈利反转变成下一轮供给过剩。',
    },
    {
      id: 'micron-memory-cycle',
      pillar: '内存价格周期',
      pillarEn: 'Memory Cycle',
      partnerCompanyIds: ['sk-hynix', 'samsung-memory'],
      headline: 'HBM 高景气仍无法完全脱离 DRAM/NAND 周期',
      thesis:
        '美光的 HBM 毛利高，但普通 DRAM、NAND 仍决定收入底盘。2023 年亏损证明库存和价格周期可以吞掉技术进步；2025 年反弹也说明周期修复会放大利润。',
      evidence: [
        {
          text: 'FY2023 美光收入降至 $15.5B 且大幅亏损，FY2025 收入恢复至 $37.4B，周期弹性极大。',
          source: sec,
        },
      ],
      whatBreaksIt:
        '三星或 SK 海力士加速扩产、普通 DRAM 价格回落、NAND 再度供过于求，都会稀释 HBM 带来的估值重估。',
    },
  ],
  chinaComparison: {
    headline: '中国存储替代路径',
    thesis:
      '中国对标美光的主线是长鑫存储补 DRAM/HBM，长江存储补 NAND。与美光相比，中国公司在中低端 DDR4/DDR5 和消费 NAND 上进展更快，但 HBM3E/HBM4 的堆叠、良率、客户认证和先进封装协同仍有明显差距。',
    peers: [
      {
        companyId: 'cxmt',
        product: 'DDR4 / DDR5 / LPDDR5 / HBM2 / HBM3 试产',
        processNode: '17/16nm 等效 DRAM 工艺',
        ecosystem: '国产 AI 加速器与服务器内存供应链',
        gapNote: 'HBM 仍落后美光约 1-2 代，核心差距在 TSV、堆叠良率和客户认证。',
      },
      {
        companyId: 'ymtc',
        product: 'Xtacking 3D NAND、企业级 SSD',
        processNode: '128/232 层 3D NAND',
        ecosystem: '国产服务器 SSD 与消费存储',
        gapNote: 'NAND 产品具备替代能力，但不直接解决 HBM 带宽瓶颈。',
      },
    ],
    structuralGap:
      '结构性差距在三处：先进 DRAM 设备与材料受出口管制影响；HBM 所需 TSV、键合、测试和先进封装协同尚未闭环；头部 GPU 客户认证周期长，国产供应链短期更多服务国内 AI 加速器，而非全球 GPU 平台。',
    sources: [
      {
        label: '长鑫存储官网',
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
      { fiscalYear: 'FY2021', calendarYear: 2021, revenue: 27.7, profit: 5.9, grossMargin: 0.378, rnd: 2.7, dataCenterRevenue: 6.0 },
      { fiscalYear: 'FY2022', calendarYear: 2022, revenue: 30.8, profit: 8.7, grossMargin: 0.454, rnd: 3.1, dataCenterRevenue: 8.0 },
      { fiscalYear: 'FY2023', calendarYear: 2023, revenue: 15.5, profit: -5.8, grossMargin: -0.091, rnd: 3.1, dataCenterRevenue: 4.5 },
      { fiscalYear: 'FY2024', calendarYear: 2024, revenue: 25.1, profit: 0.8, grossMargin: 0.224, rnd: 3.4, dataCenterRevenue: 11.0 },
      { fiscalYear: 'FY2025', calendarYear: 2025, revenue: 37.4, profit: 8.5, grossMargin: 0.398, rnd: 3.7, dataCenterRevenue: 20.0 },
    ],
    source: fy2025,
  },
};
