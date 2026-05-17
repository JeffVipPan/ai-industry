import type { FlagshipData, FlagshipSource } from './types';

const annual: FlagshipSource = {
  label: 'ASE Technology 2025 Annual Report / 20-F',
  url: 'https://ir.aseglobal.com/en/financials/annual-reports',
  date: '2026-04',
};

const q4Release: FlagshipSource = {
  label: 'ASE 2024 Q4 Investor Presentation',
  url: 'https://ir.aseglobal.com/en/financials/quarterly-results',
  date: '2025-02-13',
};

const marketNote: FlagshipSource = {
  label: '公开市场行情整理（ASX ADR，估算口径）',
  date: '2026-05',
};

export const aseFlagship: FlagshipData = {
  companyId: 'ase',
  tagline: {
    zh: '后段封测的"产能补位者"',
    en: 'The capacity reliever of advanced packaging',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      '日月光是全球最大的独立 IC 封装与测试服务商（OSAT），2025 年合并营收约 $20.5B，净利润约 $1.3B；其中封装、测试业务受 AI/HPC 芯片拉动，先进封装和高端测试占比继续提升。在 AI 浪潮里，它扮演的是台积电 CoWoS 主线之外的"产能补位者"——当先进封装产能被 NVIDIA 一家"包圆"，订单溢出，ASE 是首要承接方。',
      '它的杠杆有三层：(1) 与 Amkor、JCET 共同瓜分非台积电产能，AMD MI300、Broadcom 定制 ASIC、Marvell DSP 后段封装都跑在 ASE 产线；(2) FOCoS（Fan-Out Chip-on-Substrate）等自有先进封装方案是 CoWoS 之外的可量产替代；(3) ABF 载板、TCB 键合等关键能力靠日月光自身爬坡，对 Ibiden、Unimicron 等上游材料厂依赖度也在上升。AI 主线把 OSAT 的毛利率结构从 ~15% 拉向 ~18-20%，是周期 + 结构性双轮拉动。',
      '风险方面：(a) AI 之外的消费电子周期仍占封测业务半壁——智能手机、IoT 出货不振会拉低产能利用率；(b) 台积电 InFO / CoWoS 体系若进一步内化所有先进封装订单，ASE 长期被压制在中低端封装；(c) 中国大陆封测厂（长电 / 通富 / 华天）在中低端持续渗透；(d) ABF 载板紧缺会传导到 ASE 出货节奏。读 ASE，是读"后段封装能否分到 AI 利润"的窗口。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: annual,
    profit: annual,
    grossMargin: annual,
    aiRevenueShare: {
      label: 'ATM 高性能计算相关营收占比（2024 年报披露口径）',
      url: 'https://ir.aseglobal.com/en/financials/annual-reports',
      date: '2025-04',
    },
  },
  keyDependencies: [
    {
      id: 'advanced-packaging-tech',
      pillar: '先进封装技术',
      pillarEn: 'Advanced Packaging Tech',
      partnerCompanyIds: ['tsmc', 'amkor'],
      headline: 'FOCoS / 2.5D / 3D 封装与台积电 CoWoS 体系互补',
      thesis:
        '现代 AI 芯片是多 die 通过先进封装集成的复合体。台积电 CoWoS 主导顶级版本，但产能不足让 ASE 的 FOCoS 与改进版 fan-out 方案承接溢出订单。Amkor 是直接竞争对手，三家共同瓜分 NVIDIA / AMD / Broadcom 的后段订单。',
      evidence: [
        {
          text: 'ASE 2024 年报：先进封装业务收入同比增长超 60%，占 ATM 比重持续提升。',
          source: annual,
        },
        {
          text: '2024 年 AMD MI300、Broadcom 定制 ASIC、Marvell DSP 等关键 AI 芯片后段封装均有 ASE 份额。',
          source: {
            label: '公开新闻 + 客户披露整理',
            date: '2025-03',
          },
        },
      ],
      whatBreaksIt:
        '台积电进一步内化先进封装、客户转向 Amkor 自有 SLT 方案、或国产封测厂在中端订单上加速渗透。',
    },
    {
      id: 'abf-substrate-supply',
      pillar: 'ABF 载板供应',
      pillarEn: 'ABF Substrate Supply',
      partnerCompanyIds: ['ibiden'],
      headline: 'Ibiden / Unimicron 等高端载板是上游瓶颈',
      thesis:
        'AI 加速器使用大尺寸高层数 ABF 载板，主要供应商为日本 Ibiden、台湾 Unimicron、欣兴电子。2023-2024 年 ABF 一度极度紧张，是 NVIDIA 出货受限的次级原因。ASE 后段封装良率与产能上限高度依赖载板供给。',
      evidence: [
        {
          text: 'Ibiden 2024 财报：IC 载板业务面向 AI 应用同比增长，资本开支持续扩张。',
          source: {
            label: 'Ibiden FY2024 Earnings Release',
            url: 'https://www.ibiden.co.jp/en/ir/',
            date: '2024-11',
          },
        },
      ],
      whatBreaksIt:
        'ABF 扩产不及预期、Ibiden / Unimicron 价格转嫁导致 ASE 利润压缩、或客户转向 RDL 中介层方案绕过传统载板。',
    },
    {
      id: 'osat-customer-mix',
      pillar: 'AI 客户组合',
      pillarEn: 'AI Customer Mix',
      partnerCompanyIds: ['nvidia', 'amd', 'broadcom', 'marvell'],
      headline: 'NVIDIA / AMD / Broadcom / Marvell 共同支撑高端封测增长',
      thesis:
        'ASE 的高性能计算（HPC）客户组合相对分散——并不像 NVIDIA / TSMC 那样高度集中于一两家，反而通过多客户分摊周期。AI 加速器 + 数据中心 DSP + 网络芯片合计支撑 HPC 业务占比持续上行。',
      evidence: [
        {
          text: 'ASE 2024 Q4 业绩说明：HPC 相关收入占 ATM 业务约 38%，2025 年指引继续上行。',
          source: q4Release,
        },
      ],
      whatBreaksIt:
        '消费电子复苏不及预期拉低基础产能利用率、AI 客户自带封装产能（如 Marvell 自建后端能力）、或华为/中国 OSAT 转化中端订单。',
    },
  ],
  chinaComparison: {
    headline: '中国封测替代路径',
    thesis:
      '中国大陆封测三巨头（长电 / 通富 / 华天）合计在全球 OSAT 市场占比超 25%。在 AI 时代，主线是先进封装与 Chiplet 突围——长电的 XDFOI、通富的 Chiplet 集成是国产 AI 加速器 (华为昇腾 / AMD 部分订单) 的核心后段路径。但与 TSMC + ASE 体系仍有代际差距。',
    peers: [
      {
        companyId: 'jcet',
        product: 'XDFOI 系列、SiP 集成、Chiplet 异构封装',
        processNode: '12nm 及成熟节点 + 中端先进封装',
        ecosystem: 'AMD 后段封测最大合作方之一、华为昇腾合作',
        gapNote: '先进封装产能扩张快，但 CoWoS 等效方案良率仍落后 ASE 约 1-2 代。',
      },
      {
        companyId: 'tongfu',
        product: 'Chiplet 封装、HBM 集成测试',
        processNode: '成熟节点 + 先进封装研发',
        ecosystem: 'AMD MI300 后段合作、国产 AI 加速器封测潜在主力',
        gapNote: '依靠 AMD 订单保持先进封装能力，但客户绑定深，独立扩展弱。',
      },
    ],
    structuralGap:
      '中国 OSAT 的两个结构性差距：(1) ABF 载板与高端 TCB 设备国产化率低，仍需进口；(2) 先进封装良率与设计协同（DTCO / 设计-封装协同优化）依赖头部 EDA + 代工厂，国产替代尚未闭环。',
    sources: [
      {
        label: '长电科技 2024 年报',
        url: 'http://www.jcetglobal.com/en/list-130-1.html',
        date: '2025-04',
      },
      {
        label: '通富微电 2024 年报',
        url: 'http://www.tfme.com/',
        date: '2025-04',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 18.4, profit: 2.0, grossMargin: 0.198, rnd: 0.5, dataCenterRevenue: 3.7 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 22.7, profit: 2.0, grossMargin: 0.18, rnd: 0.6, dataCenterRevenue: 5.0 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 19.0, profit: 1.0, grossMargin: 0.155, rnd: 0.6, dataCenterRevenue: 5.7 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 19.4, profit: 1.0, grossMargin: 0.16, rnd: 0.7, dataCenterRevenue: 7.4 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 20.5, profit: 1.3, grossMargin: 0.18, rnd: 0.8, dataCenterRevenue: 8.2 },
    ],
    source: annual,
  },
};
