import type { FlagshipData, FlagshipSource } from './types';

const q4Results: FlagshipSource = {
  label: 'Samsung Electronics Q4/FY2025 Results',
  url: 'https://news.samsung.com/global/samsung-electronics-announces-fourth-quarter-and-fy-2025-results',
  date: '2026-01-29',
};

const q4Deck: FlagshipSource = {
  label: 'Samsung Electronics 4Q 2025 Earnings Presentation',
  url: 'https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_4Q_conference_eng.pdf',
  date: '2026-01-29',
};

const marketNote: FlagshipSource = {
  label: 'Samsung Memory 分部估值整理（未单独上市）',
  date: '2026-05',
};

export const samsungMemoryFlagship: FlagshipData = {
  companyId: 'samsung-memory',
  tagline: {
    zh: '从失速 HBM 到 HBM4 反攻的存储巨头',
    en: 'The memory giant trying to regain HBM leadership',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      '三星存储仍是全球最大规模的 DRAM/NAND 制造体系之一。2025 年 Samsung Memory 收入约 KRW 104.1T（约 $75B），Device Solutions 分部经营利润约 KRW 24.9T（约 $18B）；Q4 Memory 创下季度收入和利润新高，靠 HBM、服务器 DDR5、企业 SSD 与整体涨价修复盈利。它的体量没有消失，问题是 HBM3E 周期被 SK 海力士抢先。',
      '护城河来自三层：(1) DRAM、NAND、控制器、封装、设备采购全链条规模，任何新一代存储价格上行时都能最快放大产能；(2) EUV DRAM 与 HBM4 base-die 协同，三星同时拥有存储、代工和先进封装能力，理论上能把 HBM4 做成系统级供应；(3) 手机、服务器、企业 SSD 客户基础极广，AI 之外仍有现金流底盘。三星的问题不是没有技术，而是过去两年在 HBM 客户认证和高端良率上落后。',
      '风险是反攻时间窗很窄：NVIDIA 与 SK 海力士的协同已深入到 HBM4 路线图，三星若 HBM4 量产再慢，份额会被固定；Foundry 亏损和 2nm 投入会吞掉集团现金；普通 DRAM/NAND 若扩产过快，2027 年可能再次进入供过于求。读三星存储，是读"规模巨头能否用 HBM4 翻盘"。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: q4Deck,
    profit: q4Deck,
    grossMargin: q4Deck,
    aiRevenueShare: {
      label: 'HBM / server DRAM / enterprise SSD 收入占比估算',
      url: 'https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_4Q_conference_eng.pdf',
      date: '2026-01-29',
    },
  },
  keyDependencies: [
    {
      id: 'samsung-hbm4-customer-win',
      pillar: 'HBM4 客户认证',
      pillarEn: 'HBM4 Customer Win',
      partnerCompanyIds: ['nvidia', 'amd'],
      headline: '能否进入 NVIDIA HBM4 主供应链是估值重估关键',
      thesis:
        '三星在 HBM3E 认证上落后，但 HBM4 重新打开窗口。若能凭 11.7Gbps HBM4、4nm HBM base-die 和集团先进封装能力拿回主供份额，Memory 利润率会重新接近 SK 海力士。',
      evidence: [
        {
          text: '三星披露 Memory Q4 2025 创季度收入和经营利润新高，并计划在 2026 年交付 HBM4 量产品。',
          source: q4Results,
        },
        {
          text: '4Q25 简报披露 Memory 2025 年收入 KRW 104.1T，同比 +23%。',
          source: q4Deck,
        },
      ],
      whatBreaksIt:
        '若 HBM4 继续认证延迟、良率不稳定，或客户为了供应稳定继续把主份额锁给 SK 海力士，三星只能用价格换份额。',
    },
    {
      id: 'samsung-euv-dram',
      pillar: 'EUV DRAM 制程',
      pillarEn: 'EUV DRAM Process',
      partnerCompanyIds: ['asml', 'tokyo-electron', 'applied-materials'],
      headline: '先进 DRAM 节点和 EUV 设备决定 HBM 成本曲线',
      thesis:
        'HBM4 不只是堆叠封装，底层 DRAM die 的密度、功耗和良率也决定竞争力。三星需要持续投入 EUV DRAM 产线，设备供给、工艺稳定性和成本摊销会影响 HBM 报价。',
      evidence: [
        {
          text: '2025 年三星集团 R&D 投入 KRW 37.7T，创年度新高，AI 存储和先进半导体是核心方向。',
          source: q4Deck,
        },
      ],
      whatBreaksIt:
        'EUV DRAM 良率不及预期、设备交付受限，或高资本开支遇到内存价格下行，会放大利润波动。',
    },
    {
      id: 'samsung-memory-cycle',
      pillar: 'DRAM/NAND 周期',
      pillarEn: 'Memory Cycle',
      partnerCompanyIds: ['sk-hynix', 'micron'],
      headline: '高端 HBM 抬利润，普通 DRAM/NAND 决定底盘',
      thesis:
        '三星规模最大，也最受普通存储周期影响。AI 服务器拉高 HBM、DDR5 和企业 SSD 需求，但手机、PC 与消费 NAND 一旦走弱，Memory 产能利用率和价格会同步受压。',
      evidence: [
        {
          text: '2025 年 Memory 创新高的同时，三星仍强调要优先销售高附加值产品以维护盈利能力。',
          source: q4Results,
        },
      ],
      whatBreaksIt:
        '行业集体扩产导致 2027 年价格回落，或中国 DRAM/NAND 在中低端加速替代，都会拖累三星 Memory 估值。',
    },
  ],
  chinaComparison: {
    headline: '中国存储替代路径',
    thesis:
      '中国对标三星存储的难度比对标美光更高，因为三星同时覆盖 DRAM、NAND、控制器、代工协同和终端客户。长鑫存储和长江存储分别切 DRAM/HBM 与 NAND，两家公司合在一起才接近三星 Memory 的产品宽度。',
    peers: [
      {
        companyId: 'cxmt',
        product: 'DDR4 / DDR5 / LPDDR5 / HBM 试产',
        processNode: '17/16nm 等效 DRAM 工艺',
        ecosystem: '国产服务器、手机和 AI 加速器供应链',
        gapNote: '与三星 HBM4、EUV DRAM 仍有 1-2 代差距，但在中端 DRAM 替代上进展最快。',
      },
      {
        companyId: 'ymtc',
        product: 'Xtacking 3D NAND、企业 SSD',
        processNode: '128/232 层 3D NAND',
        ecosystem: '国产 SSD、手机和服务器存储',
        gapNote: 'NAND 架构有差异化，但企业级可靠性、控制器生态和全球客户认证仍需追赶。',
      },
    ],
    structuralGap:
      '核心差距不只是制程，还包括设备、材料、EDA、封测和客户认证的系统闭环。三星可以把存储、代工和先进封装放在一个集团内协同，中国供应链仍需要跨公司补齐这些接口。',
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
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 68.0, profit: 22.0, grossMargin: 0.42, rnd: 15.0, dataCenterRevenue: 14.0 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 74.0, profit: 17.0, grossMargin: 0.39, rnd: 16.0, dataCenterRevenue: 16.0 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 51.0, profit: -11.5, grossMargin: 0.24, rnd: 17.0, dataCenterRevenue: 12.0 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 61.0, profit: 10.9, grossMargin: 0.38, rnd: 18.0, dataCenterRevenue: 26.0 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 75.0, profit: 17.9, grossMargin: 0.394, rnd: 20.0, dataCenterRevenue: 39.0 },
    ],
    source: q4Deck,
  },
};
