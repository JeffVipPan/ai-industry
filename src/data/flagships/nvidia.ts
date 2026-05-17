import type { FlagshipData, FlagshipSource } from './types';

const ir: FlagshipSource = {
  label: 'NVIDIA Q4 FY2025 Earnings Release',
  url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025',
  date: '2025-02-26',
};

const tenK: FlagshipSource = {
  label: 'NVIDIA FY2025 Form 10-K',
  url: 'https://investor.nvidia.com/financial-info/sec-filings',
  date: '2025-02-26',
};

const marketDataNote: FlagshipSource = {
  label: '公开市场行情整理（5 月 NVDA 收盘均值，估算口径）',
  date: '2026-05',
};

export const nvidiaFlagship: FlagshipData = {
  companyId: 'nvidia',
  tagline: {
    zh: 'AI 算力利润池的中心节点',
    en: 'The profit-dense center of AI compute',
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: [
      '英伟达把"加速计算"做成了 AI 时代的基础工业品。FY2025 营收 $130.5B、净利润 $72.9B、毛利率 75%，其中数据中心业务贡献 $115.2B——五年时间从 GPU 厂商变成 AI 数据中心的"主供应商"。市值站上 $3T 量级，本质是市场把它定价成了 AI 资本开支周期里被首选的那家公司。',
      '它的护城河不在于单颗 GPU 多强，而在三个互相加固的系统：(1) CUDA 加上 cuDNN、TensorRT、NCCL、Triton 等十几年沉淀的软件栈，是开发者迁移成本最高的部分；(2) 从 Hopper、Blackwell 到 Vera Rubin 的硬件路线图节奏稳定，让客户可以按代际签长单；(3) 与 TSMC 的先进节点、SK 海力士/美光的 HBM、ASE 的 CoWoS 封装绑定深度协同，关键供给一旦扩产受限，竞品也吃不到额外份额。这三层叠加，让它在 AI 训练集群预算里始终是默认选项。',
      '风险也很集中：美国对华出口管制不断收紧，中国市场份额已经从早期的 ~25% 压缩到目前可见的个位数；下游云厂商（Google TPU、AWS Trainium、Microsoft Maia）都在自研 ASIC 蚕食推理工作量；HBM3e / HBM4 的供给节奏决定 Blackwell 与 Rubin 的实际出货量；而 P/E 52 的估值对资本开支节奏极敏感——任何一家头部 Hyperscaler 减速，都会传到股价。读这家公司，不是读 GPU 性能，是读"AI 资本开支拐点"这条主线。',
    ],
  },
  metricSources: {
    marketCap: marketDataNote,
    pe: marketDataNote,
    revenue: ir,
    profit: ir,
    grossMargin: ir,
    aiRevenueShare: {
      label: '数据中心收入占总营收比例（FY2025 $115.2B / $130.5B）',
      url: 'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025',
      date: '2025-02-26',
    },
  },
  keyDependencies: [
    {
      id: 'tsmc-leading-node',
      pillar: '先进制造',
      pillarEn: 'Leading-edge Foundry',
      partnerCompanyIds: ['tsmc', 'ase'],
      headline: '台积电 4N/3N 节点 + CoWoS 封装',
      thesis:
        'Hopper(H100/H200)、Blackwell(B200/GB200) 与下一代 Rubin 全部依赖台积电先进节点和 CoWoS-S/CoWoS-L 先进封装。CoWoS 产能在 2024-2025 多次成为出货瓶颈，台积电产能扩张节奏直接决定英伟达的季度营收。',
      evidence: [
        {
          text: 'TSMC 2024 年报披露 HPC 平台收入占比已超 51%，AI 加速器为单一最大终端市场。',
          source: {
            label: 'TSMC 2024 Annual Report',
            url: 'https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2025-04/4f5e8c5c2e6c9c2bb0e4e8b1c3a7d4f6b3e2f9a8/2024_Annual_Report_E.pdf',
            date: '2025-04',
          },
        },
        {
          text: 'CoWoS 月产能从 2023 年约 1.5 万片提升至 2025 年目标超 5 万片，仍跟不上英伟达需求。',
          source: {
            label: 'TSMC Q4 2024 法说会摘要',
            date: '2025-01',
          },
        },
      ],
      whatBreaksIt:
        '若台积电先进制程或 CoWoS 出现产能事故、地缘政治冲击、或被三星/英特尔代工真正追平，英伟达的代际优势会被迅速摊薄。',
    },
    {
      id: 'hbm-memory',
      pillar: '高带宽内存',
      pillarEn: 'HBM Memory',
      partnerCompanyIds: ['sk-hynix', 'micron', 'samsung-memory'],
      headline: 'SK 海力士 HBM3e + 美光 / 三星备份供给',
      thesis:
        'AI 训练芯片的真实瓶颈不是算力而是显存带宽——H100 用 80GB HBM3，B200 用 192GB HBM3e，Rubin 规划用 HBM4。SK 海力士目前是 HBM3e 主供，美光 2024 年下半年获得量产资格，三星仍在通过认证。HBM 占整颗 GPU 物料成本约 30-50%。',
      evidence: [
        {
          text: 'SK 海力士 2024 年披露 HBM 营收同比增长超过 4 倍，HBM3e 已 100% 售罄至 2025 年。',
          source: {
            label: 'SK Hynix 2024 Annual Report',
            url: 'https://www.skhynix.com/eng/sustain/sustainabilityReport.do',
            date: '2025-03',
          },
        },
        {
          text: '美光 2024 财年 HBM 营收破 10 亿美元，已成为 NVIDIA Blackwell 的二供。',
          source: {
            label: 'Micron Q4 FY2024 Earnings',
            url: 'https://investors.micron.com/news-releases',
            date: '2024-09',
          },
        },
      ],
      whatBreaksIt:
        'HBM 是上游集中度极高的环节，仅三家供应商。任何一家良率/扩产事故都会让英伟达整代产品出货节奏受阻；HBM4 切换节点也是窗口期。',
    },
    {
      id: 'hyperscaler-demand',
      pillar: '云端需求',
      pillarEn: 'Hyperscaler Demand',
      partnerCompanyIds: ['microsoft-azure', 'aws', 'google-cloud', 'oracle-cloud', 'openai'],
      headline: '四家 Hyperscaler + OpenAI 贡献 ~50% 收入',
      thesis:
        '英伟达数据中心收入高度集中——Microsoft、Meta、Amazon、Google 与 Oracle 合计采购占数据中心营收近一半，再加上 OpenAI、xAI、Anthropic 等模型公司。需求侧只要这几家中的两家削减资本开支，整条链条都会收缩。',
      evidence: [
        {
          text: 'NVIDIA FY2025 10-K 披露：单一最大客户贡献营收约 13%，前两大客户合计约 26%。',
          source: tenK,
        },
        {
          text: '2024 年 Microsoft / Meta / Alphabet / Amazon 合计资本开支约 $230B，预计 2025 年突破 $320B，绝大部分流向 AI 加速器。',
          source: {
            label: '四大 Hyperscaler 2024 年报 + 2025 Q1 指引整理',
            date: '2025-05',
          },
        },
      ],
      whatBreaksIt:
        '客户自研 ASIC 替代部分推理工作量、模型训练投入回报率不及预期、或宏观资本开支拐点出现，都会直接传导到英伟达订单。',
    },
  ],
  chinaComparison: {
    headline: '中国 AI 加速器替代路径',
    thesis:
      '中国市场的替代逻辑是双层的：一层是性能追赶（华为昇腾对标 H100/H200），另一层是生态突围（摩尔线程 MUSA 试图复刻 CUDA）。受先进制程和 HBM 供给约束，2025-2026 国内主流方案在单卡 FP16 性能上约为 H100 的 60-80%，但集群规模和软件生态仍是结构性短板。',
    peers: [
      {
        companyId: 'huawei-hisilicon',
        product: 'Ascend 910C / 910B（昇腾系列）',
        processNode: 'SMIC N+2 等效 7nm（自给路径）',
        ecosystem: 'CANN + MindSpore（华为云内已规模化部署）',
        gapNote: '单卡 FP16 ≈ H100 的 ~60-70%；CloudMatrix 384 通过集群规模追赶 NVL72。',
      },
      {
        companyId: 'cambricon',
        product: '思元 590 / 思元 690',
        processNode: '7nm（具体代工方未披露）',
        ecosystem: 'Cambricon Neuware（PyTorch 适配，CUDA 兼容层未公开）',
        gapNote: '互联和系统级方案弱于昇腾；强项是 ASIC 形态推理性价比。',
      },
      {
        companyId: 'moore-threads',
        product: 'MTT S4000 / KUAE 智算集群',
        processNode: '12nm（消费 + AI 双路线）',
        ecosystem: 'MUSA（自建 CUDA 兼容层，迁移成本最低）',
        gapNote: '硬件性能差距明显，但 MUSA 是少数公开声称 CUDA 源码级兼容的方案，长期看是生态突围的最具进攻性选项。',
      },
    ],
    structuralGap:
      '三个共同瓶颈：(1) 先进制程，没有 EUV 之前 5nm 以下国产化路径不明；(2) HBM，国产 HBM2/HBM3 仍在追赶，长鑫存储 2026 量产为关键节点；(3) 软件生态，CUDA 的 15+ 年沉淀短期不可平替，MUSA / CANN 都还在追逐 PyTorch 主线。',
    sources: [
      {
        label: '华为昇腾产品页',
        url: 'https://www.hiascend.com',
        date: '2025-04',
      },
      {
        label: '寒武纪官网产品矩阵',
        url: 'https://www.cambricon.com/index.php?m=content&c=index&a=lists&catid=58',
        date: '2025-04',
      },
      {
        label: '摩尔线程 KUAE 智算集群发布',
        url: 'https://www.mthreads.com',
        date: '2025-03',
      },
    ],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: [
      { fiscalYear: 'FY2021', calendarYear: 2021, revenue: 16.7, profit: 4.3, grossMargin: 0.623, rnd: 3.9, dataCenterRevenue: 6.7 },
      { fiscalYear: 'FY2022', calendarYear: 2022, revenue: 26.9, profit: 9.8, grossMargin: 0.649, rnd: 5.3, dataCenterRevenue: 10.6 },
      { fiscalYear: 'FY2023', calendarYear: 2023, revenue: 27.0, profit: 4.4, grossMargin: 0.569, rnd: 7.3, dataCenterRevenue: 15.0 },
      { fiscalYear: 'FY2024', calendarYear: 2024, revenue: 60.9, profit: 29.8, grossMargin: 0.727, rnd: 8.7, dataCenterRevenue: 47.5 },
      { fiscalYear: 'FY2025', calendarYear: 2025, revenue: 130.5, profit: 72.9, grossMargin: 0.75, rnd: 12.9, dataCenterRevenue: 115.2 },
    ],
    source: tenK,
  },
};
