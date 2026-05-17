import type { FlagshipData, FlagshipSource } from './types';

const annual: FlagshipSource = {
  label: 'TSMC 2025 Annual Report',
  url: 'https://investor.tsmc.com/static/annualReports/2025/english/index.html',
  date: '2026-04',
};

const q4Release: FlagshipSource = {
  label: 'TSMC Q4 2024 Investor Presentation',
  url: 'https://investor.tsmc.com/english/quarterly-results/2024/q4',
  date: '2025-01-16',
};

const marketNote: FlagshipSource = {
  label: '公开市场行情整理（TSM ADR，估算口径）',
  date: '2026-05',
};

export const tsmcFlagship: FlagshipData = {
  companyId: 'tsmc',
  tagline: {
    zh: 'AI 时代的"硅基产能定价者"',
    en: 'The silicon capacity setter of the AI era',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      '台积电是 AI 算力链的"产能定价者"。2025 年营收 $122.4B、净利润 $55.2B、毛利率 59.9%，收入连续两年被 AI/HPC 需求拉高；HPC 平台已经成为最大收入池，NVIDIA、AMD、Broadcom 与云厂商自研 ASIC 都要先排到它的先进节点和先进封装产能。这家公司不只是"代工厂"，它直接决定整个 AI 行业一年能造出多少块顶级 GPU。',
      '护城河来自三层叠加：(1) 先进制程独占——5nm 以下全球仅台积电、三星、英特尔三家具备能力，且良率与设计 PDK 成熟度差距巨大，NVIDIA / AMD / Apple / Broadcom 没有备选；(2) CoWoS 先进封装——2024 年月产能从 ~1.5 万片向 5 万片爬坡，仍跟不上 Blackwell 订单；(3) 客户黏性极高——3nm 流片成本超 $5 亿，跨厂迁移意味着重做设计，三年内不可能切换。这构成了 AI 时代独特的"上游瓶颈租"。',
      '风险是非对称的：(a) 地缘——台海风险、美国 CHIPS Act 强制美国扩产改变全球产能分布；(b) 客户集中——前 10 大客户贡献营收 ~70%，NVIDIA 一家近 ~11%，需求拐点会快速放大；(c) 高 NA EUV 推进节奏——A14 / A16 节点资本开支强度持续上升，资本回报承压；(d) 三星 2nm GAA 与英特尔 18A 若任一突破，定价权会被稀释。读台积电，是读 AI 资本开支能否真正落地的"先行指标"。',
    ],
  },
  metricSources: {
    marketCap: marketNote,
    pe: marketNote,
    revenue: annual,
    profit: annual,
    grossMargin: annual,
    aiRevenueShare: {
      label: 'TSMC HPC 平台占总营收比例（2025 年报）',
      url: 'https://investor.tsmc.com/static/annualReports/2025/english/index.html',
      date: '2026-04',
    },
  },
  keyDependencies: [
    {
      id: 'asml-euv',
      pillar: 'EUV 光刻机',
      pillarEn: 'EUV Lithography',
      partnerCompanyIds: ['asml'],
      headline: 'ASML 是 EUV / 高 NA EUV 唯一供应商',
      thesis:
        '7nm 以下所有节点都依赖 EUV，3nm/2nm 高密度层需要多次 EUV 曝光，A14/A16 将切入 0.55 NA 高 NA EUV。ASML 是全球唯一供应商，其年出货量直接决定台积电先进节点扩产速度。',
      evidence: [
        {
          text: 'ASML 2024 年 EUV 系统出货 44 台，2025 指引仍受需求约束；高 NA EUV (EXE:5000) 已交付台积电。',
          source: {
            label: 'ASML 2024 Annual Report',
            url: 'https://www.asml.com/en/investors/annual-report',
            date: '2025-02',
          },
        },
        {
          text: '台积电 2024 资本开支约 $30B，其中过半投入先进制程与封装产能。',
          source: q4Release,
        },
      ],
      whatBreaksIt:
        'ASML 出口管制收紧（已不能向中国大陆出售 EUV）、高 NA EUV 良率延迟、或 ASML 自身供应链中断（光源 Cymer / 反射镜 Zeiss）。',
    },
    {
      id: 'cowos-capacity',
      pillar: 'CoWoS 先进封装',
      pillarEn: 'CoWoS Capacity',
      partnerCompanyIds: ['ase', 'amkor'],
      headline: 'CoWoS-S/L 是英伟达 B200/GB200 的封装瓶颈',
      thesis:
        '现代 AI 加速器是"小芯片 + HBM"通过 CoWoS 集成的复合体，CoWoS 产能是 Blackwell / Rubin 出货的硬约束。台积电主导 CoWoS，2024 年月产能爬坡至约 4 万片，2025 目标 5–7 万片；部分订单已外溢给 ASE、Amkor 承接非顶级版本。',
      evidence: [
        {
          text: 'CoWoS 月产能 2023 ~1.5 万 → 2024 ~4 万 → 2025 目标 7 万；仍被英伟达需求"包圆"。',
          source: q4Release,
        },
        {
          text: '台积电 2024 财报披露：先进封装相关营收 2024 年同比近翻倍。',
          source: annual,
        },
      ],
      whatBreaksIt:
        'CoWoS 良率事故、HBM 供给吃紧反向限制封装节奏、或 NVIDIA 转向更多使用 ASE/Amkor 非 CoWoS 方案稀释 TSMC 议价权。',
    },
    {
      id: 'ai-customer-demand',
      pillar: 'AI 客户集中',
      pillarEn: 'AI Customer Concentration',
      partnerCompanyIds: ['nvidia', 'amd', 'broadcom'],
      headline: '前 5 大 AI 客户贡献先进节点营收近 70%',
      thesis:
        'NVIDIA、AMD、Broadcom、Apple、Qualcomm 共同支撑 3nm/4nm 产能。其中 AI 加速器（NVIDIA + AMD + Broadcom 定制 ASIC）已超过手机 SoC，成为先进制程最大需求池。客户基础高度集中——任一头部减速，台积电季度产能利用率立刻下移。',
      evidence: [
        {
          text: 'TSMC FY2024 10-K：单一最大客户营收占比约 ~11%（NVIDIA）；前 10 大客户合计约 69%。',
          source: annual,
        },
        {
          text: 'HPC 平台 2024 年收入占比 51%，首次超过智能手机平台。',
          source: q4Release,
        },
      ],
      whatBreaksIt:
        'Hyperscaler 资本开支拐点、客户自研 ASIC 转向三星/英特尔流片、或 AI 训练投入回报率不及预期导致整个先进节点订单去库存。',
    },
  ],
  chinaComparison: {
    headline: '中国先进制造替代路径',
    thesis:
      '中国先进制程的替代主线是 SMIC，配合长江存储 / 长鑫存储构建存储自给。受 EUV 出口管制限制，国内最先进量产节点目前停留在 SMIC N+2（约等于 7nm），通过多重 DUV 曝光实现，良率与成本压力大；A14/A16 短期内不在替代视野内。',
    peers: [
      {
        companyId: 'smic',
        product: '14nm / N+1 / N+2 (≈7nm) 代工',
        processNode: '7nm 等效（DUV 多重曝光）',
        ecosystem: '与华为海思昇腾、Qualcomm 部分订单深度绑定',
        gapNote: '与台积电先进节点差距 2-3 代；EUV 缺位前难以追平 5nm 以下。',
      },
      {
        companyId: 'jcet',
        product: 'XDFOI 系列先进封装、Chiplet 集成',
        processNode: '12nm 及成熟节点为主',
        ecosystem: '承接中国 AI 芯片封装订单，CoWoS 类方案在研',
        gapNote: 'CoWoS 等效产能与台积电存在 3-5 年代际差距。',
      },
      {
        companyId: 'tongfu',
        product: 'Chiplet 封装、HBM 集成测试',
        processNode: '成熟节点',
        ecosystem: 'AMD 后段封测主力合作方，国产 AI 加速器封测潜在承接者',
        gapNote: 'Chiplet 路线提供突围窗口，但良率与 IO 密度仍落后台积电主线。',
      },
    ],
    structuralGap:
      '三个共同瓶颈：(1) EUV 受出口管制完全切断，5nm 以下国产化路径不明；(2) CoWoS / 先进封装设备与材料（ABF 载板、TCB 键合）国产化率低；(3) 高端 IP / EDA 受美国出口管制（Synopsys / Cadence / Siemens EDA）影响，影响先进节点设计闭环。',
    sources: [
      {
        label: '中芯国际 2024 年报',
        url: 'https://www.smics.com/en/site/company_financialReports',
        date: '2025-03',
      },
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
      { fiscalYear: 'CY2021', calendarYear: 2021, revenue: 57.0, profit: 21.4, grossMargin: 0.516, rnd: 4.5, dataCenterRevenue: 21.7 },
      { fiscalYear: 'CY2022', calendarYear: 2022, revenue: 75.9, profit: 34.1, grossMargin: 0.596, rnd: 5.5, dataCenterRevenue: 32.6 },
      { fiscalYear: 'CY2023', calendarYear: 2023, revenue: 69.3, profit: 26.9, grossMargin: 0.544, rnd: 5.9, dataCenterRevenue: 29.1 },
      { fiscalYear: 'CY2024', calendarYear: 2024, revenue: 90.0, profit: 36.3, grossMargin: 0.561, rnd: 6.4, dataCenterRevenue: 45.9 },
      { fiscalYear: 'CY2025', calendarYear: 2025, revenue: 122.4, profit: 55.2, grossMargin: 0.599, rnd: 8.0, dataCenterRevenue: 63.6 },
    ],
    source: annual,
  },
};
