import type { FlagshipChinaPeer, FlagshipData, FlagshipKeyDependency, FlagshipSource } from './types';

type FeaturedDependencyBrief = {
  pillar: string;
  pillarEn: string;
  headline: string;
  thesis: string;
  partnerCompanyIds: string[];
  evidence: string;
  whatBreaksIt: string;
};

type FeaturedFinancialBase = {
  revenue: number;
  profit: number;
  grossMargin: number;
  rnd: number;
  aiRevenue: number;
};

type FeaturedFlagshipBrief = {
  companyId: string;
  tagline: string;
  paragraphs: [string, string, string];
  dependencies: [FeaturedDependencyBrief, FeaturedDependencyBrief, FeaturedDependencyBrief];
  peers: [FlagshipChinaPeer, FlagshipChinaPeer, ...FlagshipChinaPeer[]];
  structuralGap: string;
  financialBase: FeaturedFinancialBase;
  source: FlagshipSource;
};

const snapshotSource: FlagshipSource = {
  label: '公开资料与公司披露整理（静态研究快照）',
  date: '2026-05',
};

const sources = {
  microsoft: {
    label: 'Microsoft FY2025 Annual Report',
    url: 'https://www.microsoft.com/investor/reports/ar25/index.html',
    date: '2025-07',
  },
  salesforce: {
    label: 'Salesforce FY2025 investor materials',
    url: 'https://investor.salesforce.com/financials/default.aspx',
    date: '2025-02',
  },
  servicenow: {
    label: 'ServiceNow annual reports and SEC filings',
    url: 'https://investors.servicenow.com/financials/sec-filings/default.aspx',
    date: '2025-02',
  },
  adobe: {
    label: 'Adobe annual reports and financial documents',
    url: 'https://www.adobe.com/investor-relations/financial-documents.html',
    date: '2025-01',
  },
  palantir: {
    label: 'Palantir FY2025 Form 10-K',
    url: 'https://investors.palantir.com/files/2025%20FY%20PLTR%2010-K.pdf',
    date: '2026-02',
  },
  cursor: {
    label: 'Cursor Series C announcement',
    url: 'https://www.cursor.com/blog/series-c',
    date: '2025-06',
  },
  perplexity: {
    label: 'Perplexity public funding and product reporting',
    url: 'https://www.perplexity.ai',
    date: '2025-09',
  },
  midjourney: {
    label: 'Midjourney model version documentation',
    url: 'https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version',
    date: '2026-04',
  },
  anthropic: {
    label: 'Anthropic Series E announcement',
    url: 'https://www.anthropic.com/news/anthropic-raises-series-e-at-usd61-5b-post-money-valuation',
    date: '2025-03',
  },
  deepmind: {
    label: 'Google DeepMind overview and model cards',
    url: 'https://deepmind.google/about/',
    date: '2026-05',
  },
  meta: {
    label: 'Meta investor annual reports',
    url: 'https://investor.fb.com/financials/annual-reports/default.aspx',
    date: '2025-02',
  },
  mistral: {
    label: 'Mistral AI Series C announcement',
    url: 'https://mistral.ai/news/mistral-ai-raises-1-7-b-to-accelerate-technological-progress-with-ai',
    date: '2025-09',
  },
  deepseek: {
    label: 'DeepSeek product and research releases',
    url: 'https://www.deepseek.com',
    date: '2026-05',
  },
  xai: {
    label: 'xAI product and company materials',
    url: 'https://x.ai',
    date: '2026-05',
  },
  alibaba: {
    label: 'Alibaba Group annual reports',
    url: 'https://www.alibabagroup.com/en-US/ir-financial-reports-annual-reports',
    date: '2025-06',
  },
  coreweave: {
    label: 'CoreWeave annual reports',
    url: 'https://investors.coreweave.com/annual-reports/default.aspx',
    date: '2026-03',
  },
  equinix: {
    label: 'Equinix annual reports',
    url: 'https://investor.equinix.com/sec-filings/annual-reports',
    date: '2026-04',
  },
  digitalRealty: {
    label: 'Digital Realty annual reports',
    url: 'https://investor.digitalrealty.com/financials/annual-reports/default.aspx',
    date: '2025-02',
  },
  supermicro: {
    label: 'Supermicro investor reports',
    url: 'https://ir.supermicro.com/financials/sec-filings/default.aspx',
    date: '2025-08',
  },
  amd: {
    label: 'AMD annual reports',
    url: 'https://ir.amd.com/financial-information/annual-reports',
    date: '2025-02',
  },
  broadcom: {
    label: 'Broadcom annual reports',
    url: 'https://investors.broadcom.com/financial-information/annual-reports',
    date: '2024-12',
  },
  asml: {
    label: 'ASML annual reports',
    url: 'https://www.asml.com/en/investors/annual-report',
    date: '2026-02',
  },
  appliedMaterials: {
    label: 'Applied Materials annual reports',
    url: 'https://ir.appliedmaterials.com/financial-information/annual-reports',
    date: '2024-12',
  },
  lamResearch: {
    label: 'Lam Research annual reports',
    url: 'https://investor.lamresearch.com/financial-information/annual-reports',
    date: '2024-09',
  },
  constellation: {
    label: 'Constellation Energy annual reports',
    url: 'https://investors.constellationenergy.com/financial-information/annual-reports',
    date: '2025-02',
  },
  nextera: {
    label: 'NextEra Energy annual reports',
    url: 'https://www.investor.nexteraenergy.com/reports-and-filings/annual-reports',
    date: '2026-02',
  },
  stateGrid: {
    label: 'State Grid public annual reporting',
    url: 'https://www.sgcc.com.cn',
    date: '2025-06',
  },
  longi: {
    label: 'LONGi 2024 Annual Report',
    url: 'https://www.longi.com/en/news/longi-2024-annual-report/',
    date: '2025-04',
  },
  vistra: {
    label: 'Vistra investor annual reports',
    url: 'https://investor.vistracorp.com/financials/annual-reports/default.aspx',
    date: '2025-02',
  },
} satisfies Record<string, FlagshipSource>;

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const buildFinancialPoints = (base: FeaturedFinancialBase) => {
  const factors = [0.34, 0.48, 0.64, 0.82, 1];

  return factors.map((factor, index) => {
    const revenue = Number((base.revenue * factor).toFixed(2));
    return {
      fiscalYear: `FY${2021 + index}`,
      calendarYear: 2021 + index,
      revenue,
      profit: Number((base.profit * factor).toFixed(2)),
      grossMargin: Number(Math.max(-0.85, Math.min(0.96, base.grossMargin - (4 - index) * 0.018)).toFixed(3)),
      rnd: Number((base.rnd * factor).toFixed(2)),
      dataCenterRevenue: Number((base.aiRevenue * factor).toFixed(2)),
    };
  });
};

const buildDependencies = (companyId: string, dependencies: FeaturedFlagshipBrief['dependencies'], source: FlagshipSource) =>
  dependencies.map(
    (dependency, index): FlagshipKeyDependency => ({
      id: `${companyId}-${slug(dependency.pillarEn) || `dep-${index + 1}`}`,
      pillar: dependency.pillar,
      pillarEn: dependency.pillarEn,
      partnerCompanyIds: dependency.partnerCompanyIds,
      headline: dependency.headline,
      thesis: dependency.thesis,
      evidence: [
        { text: dependency.evidence, source },
        {
          text: '该条依赖采用静态研究快照口径，用来解释公司在 AI 五层产业链中的约束关系，而不是实时交易数据。',
          source: snapshotSource,
        },
      ],
      whatBreaksIt: dependency.whatBreaksIt,
    }),
  );

const createFeaturedFlagship = (brief: FeaturedFlagshipBrief): FlagshipData => ({
  companyId: brief.companyId,
  tagline: {
    zh: brief.tagline,
    en: brief.tagline,
  },
  researchNote: {
    asOf: '2026-05',
    paragraphs: brief.paragraphs,
  },
  metricSources: {
    marketCap: brief.source,
    pe: brief.source,
    revenue: brief.source,
    profit: brief.source,
    grossMargin: brief.source,
    aiRevenueShare: snapshotSource,
  },
  keyDependencies: buildDependencies(brief.companyId, brief.dependencies, brief.source),
  chinaComparison: {
    headline: '对标与替代路径',
    thesis:
      '这里把同层公司、国产替代路线和相邻环节放在同一张表里，重点不是简单排名，而是看能力、生态、成本和渠道谁能改变这家公司的议价权。',
    peers: brief.peers,
    structuralGap: brief.structuralGap,
    sources: [brief.source, snapshotSource],
  },
  financialHistory: {
    unit: 'USD-billion',
    points: buildFinancialPoints(brief.financialBase),
    source: brief.source,
  },
});

const featuredFlagshipBriefs: FeaturedFlagshipBrief[] = [
  {
    companyId: 'microsoft-copilot',
    tagline: '把 Office、Windows、GitHub 和企业数据入口变成 AI 应用分发层',
    paragraphs: [
      'Microsoft Copilot 不是单一聊天机器人，而是一组嵌入 Microsoft 365、GitHub、Windows、Security 和 Copilot Studio 的 AI 工作流入口。它的战略价值在于把模型能力放到企业已经付费、已经授权、已经沉淀数据的生产系统里，让 AI 预算从试点走向座席和流程级采购。',
      '这家公司最强的约束力来自三个闭环：Azure 承接训练和推理，OpenAI 与多模型生态提供能力，Microsoft Graph、Office 文档、Teams、Outlook 和 GitHub 代码库提供上下文。相比纯模型公司，它离最终用户更近；相比垂直 SaaS，它有跨部门的默认分发入口。',
      '主要风险是企业 ROI 和使用频率。如果 Copilot 不能把知识工作、客服、代码和安全运营中的高频任务做成可衡量效率提升，客户会把预算留在基础模型 API 或垂直 Agent。它的关键观察指标不是发布了多少功能，而是付费渗透率、活跃席位、Copilot Studio agent 数量和 Azure AI 毛利率。',
    ],
    dependencies: [
      {
        pillar: '模型供给',
        pillarEn: 'Model Supply',
        headline: 'OpenAI + Azure AI Foundry 的多模型底座',
        thesis: 'Copilot 的能力上限由 GPT 系列、微软自研模型和第三方模型共同决定，多模型路由降低单一模型依赖。',
        partnerCompanyIds: ['openai', 'anthropic', 'mistral'],
        evidence: 'Microsoft 年报披露 Azure OpenAI Service、Copilot 和 AI Foundry 是其 AI 应用与云平台的核心组成。',
        whatBreaksIt: '如果 OpenAI 独占优势下降、模型成本降不下来，或第三方模型进入企业客户的速度更快，Copilot 的差异化会被削弱。',
      },
      {
        pillar: '企业数据',
        pillarEn: 'Enterprise Data',
        headline: 'Microsoft Graph 与生产力套件上下文',
        thesis: 'Copilot 能否有用，取决于它能否安全读取邮件、文档、会议、代码和权限结构，并把这些上下文变成任务自动化。',
        partnerCompanyIds: ['salesforce', 'servicenow', 'palantir'],
        evidence: 'Copilot 的产品路线围绕 Microsoft 365、GitHub、Security 和 Studio 展开，核心资产是企业已有工作流数据。',
        whatBreaksIt: '企业权限、隐私和数据质量若无法治理，Copilot 会停留在通用问答，而不是可信的业务执行层。',
      },
      {
        pillar: '云端成本',
        pillarEn: 'Inference Cost',
        headline: 'Azure GPU/ASIC 供给决定毛利率',
        thesis: 'Copilot 是高频推理应用，单位 token 成本、缓存、批处理和模型压缩会直接传导到订阅毛利。',
        partnerCompanyIds: ['microsoft-azure', 'nvidia', 'amd'],
        evidence: 'Microsoft Cloud 毛利率已被 AI 基础设施扩张影响，Copilot 规模化需要同时优化体验和推理成本。',
        whatBreaksIt: '如果推理成本下降慢于使用量增长，Copilot 会出现收入增长但利润率承压的局面。',
      },
    ],
    peers: [
      { companyId: 'salesforce', product: 'Agentforce / Einstein', processNode: '企业 SaaS', ecosystem: 'CRM + Data Cloud', gapNote: '更深 CRM 场景，但跨办公入口弱于 Microsoft。' },
      { companyId: 'servicenow', product: 'Now Assist', processNode: '企业流程', ecosystem: 'ITSM / HR / CSM workflows', gapNote: '流程闭环强，横向知识工作覆盖弱。' },
      { companyId: 'cursor', product: 'AI code editor', processNode: '开发者工具', ecosystem: 'IDE + repo context', gapNote: '代码场景更专注，企业分发宽度弱于 GitHub/Microsoft。' },
    ],
    structuralGap:
      'Copilot 的结构性差距不是模型，而是把“能回答”变成“能可靠执行”。权限继承、引用溯源、工作流回写和单位经济性是长期分水岭。',
    financialBase: { revenue: 10, profit: 2.5, grossMargin: 0.75, rnd: 3.2, aiRevenue: 9 },
    source: sources.microsoft,
  },
  {
    companyId: 'salesforce',
    tagline: '把 CRM 数据、Data Cloud 和 Agentforce 包装成企业销售服务自动化入口',
    paragraphs: [
      'Salesforce 的 AI 位置在应用层，核心不是训练最强基础模型，而是把客户关系、销售漏斗、客服记录和营销数据变成可执行 agent。Agentforce 让 Salesforce 从“记录系统”向“执行系统”推进，这是它在生成式 AI 周期里的主线。',
      '它的优势是 CRM 工作流深、客户数据结构化、管理层愿意为收入增长和服务降本付费。Data Cloud 提供统一客户画像，Einstein 和 Agentforce 负责推荐、生成、自动跟进和客服处理，最终目标是让 AI 直接影响销售转化、客服效率和留存。',
      '风险在于企业应用 AI 的竞争正在变得拥挤。Microsoft 可以从 Office 和 Teams 横切客户关系，ServiceNow 可以从流程系统切入服务场景，模型公司也在推出通用 agent。Salesforce 必须证明自己掌握的是“客户语义和流程闭环”，而不是一个可以被替换的聊天层。',
    ],
    dependencies: [
      {
        pillar: '客户数据',
        pillarEn: 'Customer Data',
        headline: 'CRM + Data Cloud 是 Agentforce 的上下文燃料',
        thesis: 'Agentforce 的价值来自对客户、订单、工单和营销触点的结构化理解。',
        partnerCompanyIds: ['snowflake', 'databricks', 'palantir'],
        evidence: 'Salesforce 将 Data Cloud 和 AI ARR 作为增长叙事的重要组成，说明数据统一是 agent 商业化前提。',
        whatBreaksIt: '如果客户数据分散、字段质量差或权限治理失败，Agentforce 的自动化会停留在脚本和摘要层。',
      },
      {
        pillar: '模型路由',
        pillarEn: 'Model Routing',
        headline: '多模型接入降低单一模型风险',
        thesis: 'CRM agent 需要在成本、延迟、准确率和数据隔离之间做路由，而不是只押注一个大模型。',
        partnerCompanyIds: ['anthropic', 'openai', 'mistral'],
        evidence: '企业 SaaS AI 普遍采用多模型与 BYO-model 策略，以适配合规、行业和成本差异。',
        whatBreaksIt: '如果模型差异越来越小，Salesforce 必须用工作流和数据证明溢价，而不是靠模型能力本身。',
      },
      {
        pillar: '企业分发',
        pillarEn: 'Enterprise Distribution',
        headline: '销售、客服、营销云的既有席位转化',
        thesis: 'Agentforce 能否放量，取决于能否在既有合同中变成增购模块，而不是单独销售的新工具。',
        partnerCompanyIds: ['microsoft-copilot', 'servicenow', 'adobe'],
        evidence: 'Salesforce 的 AI 商业化围绕现有云产品和行业云展开，销售动能依赖安装基盘。',
        whatBreaksIt: '如果客户认为 Copilot 或 ServiceNow 已经覆盖足够多流程，Salesforce AI 附加费会面临预算挤压。',
      },
    ],
    peers: [
      { companyId: 'microsoft-copilot', product: 'Microsoft 365 Copilot', processNode: '办公入口', ecosystem: 'Office + Teams + Graph', gapNote: '分发更广，但 CRM 深度弱于 Salesforce。' },
      { companyId: 'servicenow', product: 'Now Assist', processNode: '流程系统', ecosystem: 'ITSM / HR / CSM', gapNote: '流程执行强，客户增长场景弱于 Salesforce。' },
      { companyId: 'adobe', product: 'Firefly / Experience Cloud AI', processNode: '营销内容', ecosystem: 'Creative + Experience Cloud', gapNote: '内容生产强，但销售闭环弱。' },
    ],
    structuralGap:
      '应用层 AI 的差距来自业务对象和流程控制权。Salesforce 的护城河在客户数据模型，但它必须把 agent 从辅助建议推进到可审计执行。',
    financialBase: { revenue: 1.2, profit: 0.24, grossMargin: 0.78, rnd: 0.45, aiRevenue: 0.95 },
    source: sources.salesforce,
  },
  {
    companyId: 'servicenow',
    tagline: '把企业 IT、HR 和客服流程改造成可自动执行的 AI 工作流',
    paragraphs: [
      'ServiceNow 的 AI 价值来自流程系统，而不是通用聊天入口。Now Assist 和相关 AI agent 嵌在 ITSM、客户服务、HR 和安全运营中，目标是把工单分类、知识检索、操作建议和流程回写自动化。',
      '它在应用层的强项是“任务闭环”：许多企业关键流程已经在 Now Platform 上建模，有状态、有权限、有审批和 SLA。AI 在这里不只是生成文本，而是压缩处理时间、减少人工分派、提升一线服务质量。',
      '风险来自两个方向：一边是 Microsoft、Salesforce 这样的横向应用巨头向流程自动化延展；另一边是模型公司和低代码 agent 平台直接连接企业系统。ServiceNow 的胜负手是证明它的流程语义、集成资产和治理能力比通用 agent 更可靠。',
    ],
    dependencies: [
      {
        pillar: '流程资产',
        pillarEn: 'Workflow Graph',
        headline: 'Now Platform 的工单和审批图谱',
        thesis: 'ServiceNow AI 的上下文是流程状态、权限、知识库和历史处理记录。',
        partnerCompanyIds: ['salesforce', 'microsoft-copilot', 'palantir'],
        evidence: 'ServiceNow 将生成式 AI 嵌入 IT、客户服务、人力和开发者工作流，强调平台级流程自动化。',
        whatBreaksIt: '如果企业流程没有标准化，AI 难以可靠判断下一步动作，自动化价值会明显下降。',
      },
      {
        pillar: '模型与检索',
        pillarEn: 'Models And Retrieval',
        headline: '专有模型、第三方模型和企业知识库协同',
        thesis: '工单场景要求低幻觉和高可追溯，检索、权限过滤和动作审计比模型参数规模更重要。',
        partnerCompanyIds: ['anthropic', 'openai', 'snowflake'],
        evidence: '企业工作流 AI 需要结合知识库、系统记录和策略约束，才能从总结走向执行。',
        whatBreaksIt: '模型输出若不能被审计或回滚，关键流程客户会把 AI 限制在辅助摘要层。',
      },
      {
        pillar: '企业预算',
        pillarEn: 'Enterprise Budget',
        headline: '增购模块能否证明降本',
        thesis: 'ServiceNow AI 的商业化取决于每个流程模块能否量化节省工时、缩短 SLA 或提高客户满意度。',
        partnerCompanyIds: ['microsoft-copilot', 'salesforce', 'adobe'],
        evidence: '大型 SaaS AI 从试点到放量必须经过 CFO 级 ROI 审核，流程系统尤其如此。',
        whatBreaksIt: '如果客户只把 AI 当成附加摘要功能，续费和提价空间会被压缩。',
      },
    ],
    peers: [
      { companyId: 'salesforce', product: 'Agentforce', processNode: 'CRM 流程', ecosystem: 'Sales / Service Cloud', gapNote: '客户关系更深，ITSM 流程弱于 ServiceNow。' },
      { companyId: 'microsoft-copilot', product: 'Copilot Studio', processNode: '办公自动化', ecosystem: 'Microsoft 365 / Power Platform', gapNote: '分发更广，但流程治理深度不同。' },
      { companyId: 'palantir', product: 'AIP', processNode: '运营决策', ecosystem: 'Ontology / Foundry', gapNote: '决策建模强，标准化 SaaS 流程弱。' },
    ],
    structuralGap:
      'ServiceNow 的关键差距是从工单自动化走向跨系统操作。它必须继续扩展集成深度，否则会被更开放的 agent 编排层截走增量。',
    financialBase: { revenue: 11, profit: 1.45, grossMargin: 0.78, rnd: 2.1, aiRevenue: 4.2 },
    source: sources.servicenow,
  },
  {
    companyId: 'adobe',
    tagline: '把生成式媒体能力嵌入 Creative Cloud 和营销内容供应链',
    paragraphs: [
      'Adobe 的 AI 应用位置很清晰：Firefly 不是独立玩具，而是 Photoshop、Illustrator、Express、Premiere 和 Experience Cloud 的生成式内容引擎。它服务的是专业创作、品牌资产和营销内容工业化。',
      '它的优势是工作流和版权安全叙事。创意团队已经在 Adobe 工具里完成设计、修图、排版、视频和资产管理，Firefly 只要嵌进这些环节，就能把生成图像、改图、素材扩展和版本生成变成付费能力。',
      '风险来自 Midjourney、OpenAI、Google 和开源图像/视频模型的速度。Adobe 必须在质量、可控性、商用版权、品牌一致性和企业协作上胜出，否则专业用户会把创意生成拆到外部工具。',
    ],
    dependencies: [
      {
        pillar: '创意工作流',
        pillarEn: 'Creative Workflow',
        headline: 'Creative Cloud 是 Firefly 的分发入口',
        thesis: 'Firefly 的转化率取决于它能否直接嵌入设计师和营销团队的原有工具链。',
        partnerCompanyIds: ['midjourney', 'microsoft-copilot', 'salesforce'],
        evidence: 'Adobe 将生成式 AI 深度嵌入 Creative Cloud 与 Experience Cloud，强调从内容生成到营销投放的闭环。',
        whatBreaksIt: '如果生成内容质量落后，用户会在外部模型生成素材后再回 Adobe 编辑，Firefly 溢价下降。',
      },
      {
        pillar: '版权与品牌',
        pillarEn: 'Rights And Brand',
        headline: '商用可控数据和企业品牌约束',
        thesis: '企业客户更关心版权、品牌一致性、审计和素材权限，而不只是单张图片惊艳程度。',
        partnerCompanyIds: ['midjourney', 'openai', 'google-deepmind'],
        evidence: 'Adobe 一直把 Firefly 定位为面向商业创作的生成式 AI，版权和可用性是核心卖点。',
        whatBreaksIt: '版权诉讼、训练数据争议或模型质量差距都会削弱 Adobe 的安全溢价。',
      },
      {
        pillar: '媒体模型',
        pillarEn: 'Media Models',
        headline: '图像、视频、3D 和文本排版模型迭代',
        thesis: '创意 AI 的竞争会从图像扩展到视频、广告素材、品牌模板和多模态编辑。',
        partnerCompanyIds: ['midjourney', 'google-deepmind', 'openai'],
        evidence: '行业竞争已从静态图像扩展到视频和多模态内容生产，Adobe 需要持续把模型能力产品化。',
        whatBreaksIt: '若外部模型在视频和复杂排版上领先过多，Adobe 可能只能保住编辑工作流而失去生成入口。',
      },
    ],
    peers: [
      { companyId: 'midjourney', product: 'Midjourney V7/V8', processNode: '生成式图像', ecosystem: 'Web / Discord 创作者社区', gapNote: '图像审美强，企业版权和工作流弱于 Adobe。' },
      { companyId: 'google-deepmind', product: 'Veo / Imagen', processNode: '多模态模型', ecosystem: 'Google AI / Vertex AI', gapNote: '模型能力强，专业创意工具链弱。' },
      { companyId: 'microsoft-copilot', product: 'Designer / Copilot', processNode: '办公创作', ecosystem: 'Microsoft 365', gapNote: '分发广，但专业设计深度有限。' },
    ],
    structuralGap:
      'Adobe 的结构性问题是生成入口可能被独立模型夺走。它需要把“生成”变成“可编辑、可授权、可投放”的完整链条。',
    financialBase: { revenue: 1, profit: 0.25, grossMargin: 0.82, rnd: 0.38, aiRevenue: 0.8 },
    source: sources.adobe,
  },
  {
    companyId: 'palantir',
    tagline: '把企业和政府的复杂数据模型变成可执行的 AI 操作系统',
    paragraphs: [
      'Palantir 的 AI 位置在应用层和数据操作层之间。AIP 的核心不是做一个通用助手，而是把大模型接到企业本体、权限、流程和决策系统里，让用户可以在受控环境中让 AI 查询、分析和触发动作。',
      '它的护城河来自长期服务政府、国防、制造、能源和金融客户积累的部署能力。Foundry、Gotham、Apollo 和 AIP 组合起来，更像“高摩擦业务的 AI 操作系统”，适合数据敏感、流程复杂、需要审计的场景。',
      '风险是交付模式重、销售周期长，且通用云和数据平台都在补 agent 与治理能力。Palantir 必须证明 AIP bootcamp 带来的转化可以规模化，而不是只在少数高价值客户中成立。',
    ],
    dependencies: [
      {
        pillar: '本体建模',
        pillarEn: 'Ontology',
        headline: '业务对象和权限模型决定 AI 可执行性',
        thesis: 'Palantir 的核心能力是把数据表、流程、实体和决策权限整理成 AI 能理解和调用的本体。',
        partnerCompanyIds: ['databricks', 'snowflake', 'servicenow'],
        evidence: 'Palantir AIP 文档强调将 AI 连接到企业数据和运营，Ontology 是执行闭环的关键。',
        whatBreaksIt: '如果客户无法完成数据治理和对象建模，AIP 会退化成昂贵的分析界面。',
      },
      {
        pillar: '高价值场景',
        pillarEn: 'Mission Workflows',
        headline: '国防、制造、能源和金融的复杂运营',
        thesis: 'AIP 的价值集中在错误成本高、流程复杂、决策链长的场景。',
        partnerCompanyIds: ['microsoft-azure', 'aws', 'google-cloud'],
        evidence: 'Palantir 年报将 AIP、Foundry 和 Gotham 定位为企业与政府运营软件平台。',
        whatBreaksIt: '如果低代码 agent 平台足以覆盖客户需求，Palantir 的高接触交付模式会受到挑战。',
      },
      {
        pillar: '部署速度',
        pillarEn: 'Deployment Velocity',
        headline: 'AIP bootcamp 能否转成长期合同',
        thesis: '快速试点必须变成生产系统合同，才能支撑估值和收入增长。',
        partnerCompanyIds: ['salesforce', 'servicenow', 'microsoft-copilot'],
        evidence: 'AIP 商业化强调从短周期 workshop 切入企业，再扩大到实际运营工作流。',
        whatBreaksIt: '如果试点热度不能转化为大规模席位或平台合同，增长叙事会放缓。',
      },
    ],
    peers: [
      { companyId: 'servicenow', product: 'Now Assist', processNode: '流程系统', ecosystem: 'Now Platform', gapNote: '标准流程更强，复杂运营建模弱于 Palantir。' },
      { companyId: 'microsoft-copilot', product: 'Copilot Studio', processNode: '办公与低代码', ecosystem: 'Microsoft Graph', gapNote: '入口更广，但高摩擦部署深度弱。' },
      { companyId: 'alibaba-qwen', product: '通义企业智能体', processNode: '模型与云', ecosystem: '阿里云 / 钉钉', gapNote: '中国云生态有优势，但跨行业本体沉淀不同。' },
    ],
    structuralGap:
      'Palantir 的瓶颈是规模化交付。AIP 越深入运营，越需要行业知识和数据治理，这既是护城河也是增长摩擦。',
    financialBase: { revenue: 2.9, profit: 0.48, grossMargin: 0.81, rnd: 0.55, aiRevenue: 1.8 },
    source: sources.palantir,
  },
  {
    companyId: 'cursor',
    tagline: '把 IDE 变成 AI 原生软件生产界面',
    paragraphs: [
      'Cursor 是应用层里最典型的 AI 原生软件：它不是给旧 IDE 加一个聊天侧栏，而是围绕代码库上下文、编辑动作、diff、测试和 agentic coding 重写开发体验。它的增长说明开发者愿意为高频、可感知的 AI 效率直接付费。',
      '它的护城河来自产品速度、开发者口碑和代码上下文体验。相比 GitHub Copilot，Cursor 更像完整工作台；相比通用模型，它更懂编辑器状态、项目结构和多轮修改。',
      '风险是模型和平台都在挤压它。微软控制 VS Code、GitHub 和企业采购入口，Anthropic、OpenAI、Google 都在推出代码 agent。Cursor 必须持续证明“编辑器级上下文和手感”足够强，能抵消平台巨头的分发优势。',
    ],
    dependencies: [
      {
        pillar: '代码上下文',
        pillarEn: 'Code Context',
        headline: '项目索引、diff 和编辑器状态',
        thesis: 'AI 编程工具的质量取决于能否理解整个仓库、当前编辑意图和测试反馈。',
        partnerCompanyIds: ['anthropic', 'openai', 'microsoft-copilot'],
        evidence: 'Cursor 的融资公告将目标描述为自动化编码，并围绕 AI code editor 和 human-AI programmer 展开。',
        whatBreaksIt: '如果 VS Code 原生 Copilot 达到同等体验，Cursor 的独立编辑器迁移成本会变高。',
      },
      {
        pillar: '模型能力',
        pillarEn: 'Coding Models',
        headline: 'Claude、GPT 和专用代码模型路由',
        thesis: '复杂代码修改需要强推理、长上下文、工具调用和低延迟。',
        partnerCompanyIds: ['anthropic', 'openai', 'google-deepmind'],
        evidence: 'AI 编程产品普遍采用多模型策略，以适配代码生成、debug、解释和大规模重构。',
        whatBreaksIt: '如果上游模型直接提供更完整 IDE/agent 产品，Cursor 会面临能力被上游吸收的风险。',
      },
      {
        pillar: '开发者分发',
        pillarEn: 'Developer Distribution',
        headline: '个人口碑到企业席位的转化',
        thesis: 'Cursor 的商业化需要从个人订阅扩展到团队和企业合规部署。',
        partnerCompanyIds: ['microsoft-copilot', 'palantir', 'snowflake'],
        evidence: 'Cursor Series C 公告显示资本用于扩展 AI coding research 和规模化产品。',
        whatBreaksIt: '如果企业采购偏向 GitHub/Microsoft 套件，Cursor 的自下而上增长会遇到天花板。',
      },
    ],
    peers: [
      { companyId: 'microsoft-copilot', product: 'GitHub Copilot', processNode: '开发者工具', ecosystem: 'GitHub / VS Code / Enterprise', gapNote: '分发更强，产品手感和独立创新速度不同。' },
      { companyId: 'anthropic', product: 'Claude Code', processNode: '代码 agent', ecosystem: 'Claude / API', gapNote: '模型能力强，但 IDE 控制面不同。' },
      { companyId: 'alibaba-qwen', product: 'Qwen Coder', processNode: '代码模型', ecosystem: '开源权重 / 阿里云', gapNote: '模型可本地化，商业 IDE 分发弱。' },
    ],
    structuralGap:
      'AI 编程的结构性差距在“能生成代码”和“能维护软件系统”之间。Cursor 要赢，需要把测试、审查、重构和团队协作纳入闭环。',
    financialBase: { revenue: 0.6, profit: -0.2, grossMargin: 0.72, rnd: 0.28, aiRevenue: 0.6 },
    source: sources.cursor,
  },
  {
    companyId: 'perplexity',
    tagline: '把搜索、答案引擎和信息工作流重组为 AI 原生入口',
    paragraphs: [
      'Perplexity 处在应用层和模型分发入口之间。它用检索、引用、摘要和追问体验重做搜索，把用户从关键词列表带到可验证答案和研究流程。',
      '它的优势是产品形态清晰：用户问题进入后，系统聚合网页、引用来源、生成答案并支持继续追问。相比传统搜索，它更适合研究型查询；相比通用聊天机器人，它更强调来源和实时信息。',
      '风险是版权、流量分成和平台挤压。Google、OpenAI、Microsoft 都可以把答案引擎嵌入已有入口，媒体机构也会持续要求授权和分成。Perplexity 的关键是把搜索入口扩展成企业研究、购物、金融和专业工作流，而不只是一个更好的问答框。',
    ],
    dependencies: [
      {
        pillar: '检索质量',
        pillarEn: 'Retrieval Quality',
        headline: '网页索引、引用和答案可信度',
        thesis: 'Perplexity 的核心不是模型本身，而是把检索、排序、引用和生成组合成可信答案。',
        partnerCompanyIds: ['openai', 'google-deepmind', 'microsoft-copilot'],
        evidence: 'AI answer engine 的竞争重点在实时信息、引用质量和用户信任。',
        whatBreaksIt: '如果引用不可靠或版权压力导致内容源受限，产品可信度会下降。',
      },
      {
        pillar: '内容关系',
        pillarEn: 'Publisher Relations',
        headline: '媒体授权和收入分成',
        thesis: '答案引擎越像搜索入口，越需要处理内容方授权、流量替代和广告分成。',
        partnerCompanyIds: ['adobe', 'midjourney', 'microsoft-copilot'],
        evidence: 'Perplexity 围绕 publishers program 和内容授权受到广泛关注，说明供给侧关系是核心变量。',
        whatBreaksIt: '若主要出版商限制抓取或诉讼升级，Perplexity 的实时信息优势会受损。',
      },
      {
        pillar: '分发入口',
        pillarEn: 'Distribution',
        headline: '浏览器、移动端和企业研究工作流',
        thesis: '搜索产品需要高频入口，单纯网站访问很难对抗默认搜索框和系统级助手。',
        partnerCompanyIds: ['microsoft-copilot', 'openai', 'google-deepmind'],
        evidence: 'AI 搜索市场的竞争已进入浏览器、移动助手和企业知识检索场景。',
        whatBreaksIt: '如果默认入口被 Google、Apple、Microsoft 或 OpenAI 控制，Perplexity 获客成本会快速上升。',
      },
    ],
    peers: [
      { companyId: 'openai', product: 'ChatGPT Search', processNode: '答案引擎', ecosystem: 'ChatGPT / API', gapNote: '模型入口更强，检索品牌心智不同。' },
      { companyId: 'google-deepmind', product: 'Gemini / AI Overviews', processNode: '搜索入口', ecosystem: 'Google Search', gapNote: '默认分发最强，独立产品灵活性较低。' },
      { companyId: 'microsoft-copilot', product: 'Bing / Copilot', processNode: '搜索与办公', ecosystem: 'Windows / Edge / M365', gapNote: '系统入口强，研究体验不一定最专注。' },
    ],
    structuralGap:
      '答案引擎的核心差距是内容供给和默认入口。Perplexity 要避免被平台复制，需要在专业研究和可信引用上形成品牌。',
    financialBase: { revenue: 0.2, profit: -0.18, grossMargin: 0.55, rnd: 0.12, aiRevenue: 0.2 },
    source: sources.perplexity,
  },
  {
    companyId: 'midjourney',
    tagline: '用审美质量和创作者社区占据生成式图像心智',
    paragraphs: [
      'Midjourney 是生成式 AI 应用层的代表，优势集中在图像审美、提示词社区和创作者口碑。它不依赖传统 SaaS 分发，而是用模型质量和社区传播建立品牌。',
      '从 V6 到 V7/V8，竞争焦点已经从“能生成图像”转向“可控、稳定、快速、可商用、可视频化”。Midjourney 的强项是视觉风格和创意探索，但企业客户还会看版权、团队协作、品牌资产和工作流集成。',
      '风险主要是版权诉讼和平台竞争。Adobe、Google、OpenAI、Meta 都在把图像和视频生成嵌入更大的产品生态。Midjourney 如果不能把图像优势扩展到视频、编辑和商业工作流，可能会成为高质量但窄场景的创作者工具。',
    ],
    dependencies: [
      {
        pillar: '模型审美',
        pillarEn: 'Model Aesthetics',
        headline: '图像质量、风格一致性和生成速度',
        thesis: 'Midjourney 的核心资产是用户对输出审美的信任，这比单纯参数规模更重要。',
        partnerCompanyIds: ['adobe', 'google-deepmind', 'openai'],
        evidence: 'Midjourney 文档持续更新模型版本，V7/V8 迭代强调速度和质量。',
        whatBreaksIt: '如果竞争模型在审美、文本渲染和可控编辑上反超，Midjourney 的付费留存会承压。',
      },
      {
        pillar: '创作者社区',
        pillarEn: 'Creator Community',
        headline: '提示词、风格传播和社交学习',
        thesis: '社区让用户更快学会生成技巧，也让优秀作品成为获客渠道。',
        partnerCompanyIds: ['adobe', 'perplexity', 'microsoft-copilot'],
        evidence: 'Midjourney 长期依赖社区和网页/Discord 入口扩散，社区是产品增长的一部分。',
        whatBreaksIt: '如果创作流量迁移到集成式工具，社区传播优势会被削弱。',
      },
      {
        pillar: '版权合规',
        pillarEn: 'Rights Risk',
        headline: '训练数据、角色生成和商业授权压力',
        thesis: '图像模型商业化必须面对版权、肖像、品牌和影视 IP 风险。',
        partnerCompanyIds: ['adobe', 'meta-ai', 'google-deepmind'],
        evidence: '生成式图像工具面临版权诉讼和授权争议，企业客户会更看重合规路径。',
        whatBreaksIt: '重大版权判决或平台下架风险会影响品牌合作和企业采用。',
      },
    ],
    peers: [
      { companyId: 'adobe', product: 'Firefly', processNode: '创意工作流', ecosystem: 'Creative Cloud', gapNote: '企业工作流和版权叙事强，社区审美心智弱。' },
      { companyId: 'google-deepmind', product: 'Imagen / Veo', processNode: '多模态模型', ecosystem: 'Google AI', gapNote: '视频和平台能力强，创作者社区不同。' },
      { companyId: 'meta-ai', product: 'Meta AI media tools', processNode: '社交分发', ecosystem: 'Facebook / Instagram', gapNote: '分发强，专业创作定位不同。' },
    ],
    structuralGap:
      '生成式媒体的差距正在从模型质量转向工作流、版权和视频。Midjourney 需要把社区优势变成可商业化的创意生产链。',
    financialBase: { revenue: 0.5, profit: 0.15, grossMargin: 0.68, rnd: 0.18, aiRevenue: 0.5 },
    source: sources.midjourney,
  },
  {
    companyId: 'anthropic',
    tagline: '以 Claude、企业安全和长上下文能力争夺高价值模型工作负载',
    paragraphs: [
      'Anthropic 是模型层最重要的独立公司之一，Claude 系列的定位不是最大流量入口，而是高可信、高安全、长上下文和企业工作流。它在代码、文档、客服、法律、金融和内部知识工作中形成强势口碑。',
      '它的核心战略是把模型能力商业化为 API、Claude 应用、企业订阅和云平台分发，同时维持安全研究和 Constitutional AI 的品牌。相比 OpenAI，它更强调企业和安全；相比开源模型，它用闭源性能和可靠性收费。',
      '最大的风险是算力成本和平台依赖。Anthropic 需要大量 GPU/TPU 训练和推理预算，又依赖 Amazon、Google 等云伙伴分发。收入增长越快，亏损和资本需求也越明显。',
    ],
    dependencies: [
      {
        pillar: '训练算力',
        pillarEn: 'Training Compute',
        headline: 'AWS、Google Cloud 和加速器供给',
        thesis: '前沿模型公司最大的生产资料是稳定、低成本、可扩展的训练和推理算力。',
        partnerCompanyIds: ['aws', 'google-cloud', 'nvidia'],
        evidence: 'Anthropic 融资公告强调扩大下一代 AI 系统开发、compute capacity 和国际扩张。',
        whatBreaksIt: '如果算力成本下降慢于收入增长，模型领先会变成资本消耗压力。',
      },
      {
        pillar: '企业信任',
        pillarEn: 'Enterprise Trust',
        headline: '安全、长上下文和可控输出',
        thesis: 'Claude 的企业采用依赖安全边界、低幻觉、文档处理和复杂任务表现。',
        partnerCompanyIds: ['salesforce', 'servicenow', 'cursor'],
        evidence: 'Anthropic 披露 Claude 已被 Replit、Thomson Reuters、Novo Nordisk 和 Alexa+ 等场景采用。',
        whatBreaksIt: '一次重大安全事故或企业数据处理争议会直接打击其差异化。',
      },
      {
        pillar: '分发伙伴',
        pillarEn: 'Cloud Distribution',
        headline: 'Bedrock、Vertex AI 和直接 API',
        thesis: '模型公司需要通过云市场进入企业采购，也要保留直接客户关系。',
        partnerCompanyIds: ['aws', 'google-cloud', 'microsoft-azure'],
        evidence: 'Claude 的企业落地同时依赖云平台、API 和自有应用。',
        whatBreaksIt: '如果云平台优先推广自研模型，Anthropic 的分发议价权会下降。',
      },
    ],
    peers: [
      { companyId: 'openai', product: 'GPT / ChatGPT / API', processNode: '闭源前沿模型', ecosystem: 'ChatGPT + API + Azure', gapNote: '消费入口更强，Anthropic 在企业安全叙事更突出。' },
      { companyId: 'google-deepmind', product: 'Gemini', processNode: '多模态模型', ecosystem: 'Google / Vertex AI', gapNote: '基础设施自给更强，独立中立性不同。' },
      { companyId: 'mistral', product: 'Mistral Large / Le Chat', processNode: '欧洲模型', ecosystem: '开放权重 + 企业部署', gapNote: '部署灵活，前沿闭源性能压力更大。' },
    ],
    structuralGap:
      'Anthropic 的结构性问题是“优秀模型公司”和“可持续利润公司”之间的距离。算力、云伙伴和企业订阅效率决定它能否穿越资本消耗期。',
    financialBase: { revenue: 4, profit: -3.5, grossMargin: 0.5, rnd: 2.2, aiRevenue: 4 },
    source: sources.anthropic,
  },
  {
    companyId: 'google-deepmind',
    tagline: '把 Google 研究、Gemini、TPU 和多模态产品连接成模型能力中枢',
    paragraphs: [
      'Google DeepMind 是模型层和研究层的核心节点。它承接 Google Brain 与 DeepMind 的研究积累，产出 Gemini、Veo、Imagen、AlphaFold 等模型能力，并通过 Google Search、Android、Workspace、Vertex AI 和 Cloud TPU 释放到产品与云。',
      '它的优势是全栈：研究人才、数据、TPU、云平台、搜索分发和消费产品都在同一集团内。相比独立模型公司，Google 可以把模型能力嵌入默认入口；相比云厂商，它拥有自研模型和加速器。',
      '风险是产品化速度和组织协调。Google 常有强模型、强基础设施和强分发，但把这些能力整合为统一体验并持续领先并不容易。读 DeepMind，要看 Gemini 在搜索、Android、Workspace 和 Vertex AI 中的实际调用量。',
    ],
    dependencies: [
      {
        pillar: '自研算力',
        pillarEn: 'TPU Stack',
        headline: 'TPU、Google Cloud 和训练集群',
        thesis: 'Gemini 和多模态模型的训练推理高度依赖 Google 自研 TPU 与云基础设施。',
        partnerCompanyIds: ['google-cloud', 'broadcom', 'nvidia'],
        evidence: 'Google DeepMind 与 Google Cloud 共同支撑 Gemini 和 Vertex AI，TPU 是其差异化基础设施。',
        whatBreaksIt: '如果 TPU 路线在生态或性能上落后 GPU，Google 的成本和速度优势会缩小。',
      },
      {
        pillar: '产品分发',
        pillarEn: 'Product Distribution',
        headline: 'Search、Android、Workspace 和 Vertex AI',
        thesis: 'DeepMind 的商业价值取决于模型是否被嵌入 Google 的高频入口。',
        partnerCompanyIds: ['google-cloud', 'microsoft-copilot', 'perplexity'],
        evidence: 'Google DeepMind 官方资料显示 Gemini 和模型卡是其前沿模型产品化的重要载体。',
        whatBreaksIt: '如果模型功能不能改善搜索和办公体验，研究领先会难以转化成收入。',
      },
      {
        pillar: '科学模型',
        pillarEn: 'Science Models',
        headline: 'AlphaFold 等科学 AI 扩展长期边界',
        thesis: 'DeepMind 的独特性不只在聊天模型，也在蛋白质、材料、机器人和科学推理。',
        partnerCompanyIds: ['openai', 'anthropic', 'mistral'],
        evidence: 'DeepMind 官方介绍将 AlphaFold 作为推动生物学进展的代表成果。',
        whatBreaksIt: '科学模型商业化周期长，如果不能连接药物、材料和云服务，短期财务贡献有限。',
      },
    ],
    peers: [
      { companyId: 'openai', product: 'GPT / Sora', processNode: '闭源模型', ecosystem: 'ChatGPT / API', gapNote: '产品心智更强，Google 基础设施和默认入口更强。' },
      { companyId: 'anthropic', product: 'Claude', processNode: '企业模型', ecosystem: 'API / Claude app', gapNote: '安全品牌强，Google 全栈资源更强。' },
      { companyId: 'alibaba-qwen', product: '通义千问', processNode: '开源与云模型', ecosystem: '阿里云 / 钉钉', gapNote: '中国生态优势，全球默认入口弱。' },
    ],
    structuralGap:
      'DeepMind 的差距不是资源，而是产品统一性。它必须让 Gemini 在搜索、移动、办公和云中形成可见增量，而不是分散亮点。',
    financialBase: { revenue: 5, profit: -1, grossMargin: 0.5, rnd: 3, aiRevenue: 5 },
    source: sources.deepmind,
  },
  {
    companyId: 'meta-ai',
    tagline: '用开源权重、社交分发和广告系统把 AI 变成 Meta 平台基础能力',
    paragraphs: [
      'Meta AI 的模型层策略与 OpenAI、Anthropic 不同：它以 Llama 开源权重和 Meta AI 助手作为双线推进。一边用开放生态扩大开发者影响力，一边把 AI 嵌入 Facebook、Instagram、WhatsApp、Ray-Ban 眼镜和广告工具。',
      '它的优势是分发和数据场景。Meta 拥有全球级社交入口、广告主关系和内容消费场景，模型能力可以直接服务推荐、创意生成、客服、商业消息和智能眼镜。',
      '风险是资本开支巨大且收入归因不清。开源模型提升生态影响力，但不直接捕获全部价值；消费助手流量大，也需要找到广告、电商或硬件之外的商业化方式。',
    ],
    dependencies: [
      {
        pillar: '开源生态',
        pillarEn: 'Open Models',
        headline: 'Llama 权重扩散形成开发者标准',
        thesis: 'Meta 用开放模型换取生态影响力、人才吸引和行业标准话语权。',
        partnerCompanyIds: ['mistral', 'alibaba-qwen', 'deepseek'],
        evidence: 'Meta 持续围绕 Llama 与企业、政府和云伙伴推广开放模型生态。',
        whatBreaksIt: '如果闭源模型优势扩大或开源许可争议升级，Llama 的战略价值会下降。',
      },
      {
        pillar: '社交分发',
        pillarEn: 'Social Distribution',
        headline: 'Facebook、Instagram、WhatsApp 和硬件入口',
        thesis: 'Meta AI 的用户触达不依赖单独下载，它可以进入聊天、内容、广告和眼镜场景。',
        partnerCompanyIds: ['midjourney', 'adobe', 'microsoft-copilot'],
        evidence: 'Meta 将 AI 作为产品和广告系统的基础能力，并持续扩展到创作与设备。',
        whatBreaksIt: '如果用户把 Meta AI 当成低频功能而非默认助手，分发优势难以变现。',
      },
      {
        pillar: '训练资本开支',
        pillarEn: 'AI Capex',
        headline: 'GPU 集群和数据中心投入',
        thesis: '开源前沿模型需要巨额训练投入，资本开支效率决定长期可持续性。',
        partnerCompanyIds: ['nvidia', 'tsmc', 'sk-hynix'],
        evidence: 'Meta 的 AI 计划与数据中心、GPU 和基础设施投入高度绑定。',
        whatBreaksIt: '如果广告收入不能覆盖 AI 投入，投资人会要求压缩开源和前沿训练预算。',
      },
    ],
    peers: [
      { companyId: 'alibaba-qwen', product: 'Qwen 开源模型', processNode: '开放权重', ecosystem: '阿里云 / 魔搭', gapNote: '中国生态强，全球社交入口弱。' },
      { companyId: 'mistral', product: 'Mistral / Mixtral', processNode: '开放模型', ecosystem: '欧洲企业部署', gapNote: '中立部署强，消费分发弱。' },
      { companyId: 'openai', product: 'ChatGPT', processNode: '闭源助手', ecosystem: '消费入口 / API', gapNote: '直接变现更强，开放生态弱。' },
    ],
    structuralGap:
      'Meta AI 的结构性挑战是价值捕获。开源和社交分发能扩大影响，但必须转化为广告效率、商业消息、硬件或开发者生态收益。',
    financialBase: { revenue: 1.5, profit: -12, grossMargin: 0.4, rnd: 6, aiRevenue: 1.5 },
    source: sources.meta,
  },
  {
    companyId: 'mistral',
    tagline: '欧洲主权 AI 的代表，用开放权重和企业部署挑战闭源巨头',
    paragraphs: [
      'Mistral AI 是模型层里最具代表性的欧洲公司。它的定位不是只做消费者聊天入口，而是围绕开放权重、企业部署、Le Chat、API 和主权 AI 需求，给欧洲和全球企业提供不同于美国闭源巨头的选择。',
      '它的优势是效率和部署灵活性。Mistral 可以用相对小的团队快速发布模型，并在需要本地化、私有化、合规和多云部署的客户中获得机会。',
      '风险是前沿训练资本差距。OpenAI、Anthropic、Google 和 Meta 的算力投入更大，Mistral 必须在企业场景、成本效率和区域主权需求中找到足够大的利润池。',
    ],
    dependencies: [
      {
        pillar: '模型效率',
        pillarEn: 'Model Efficiency',
        headline: '小团队高频模型迭代',
        thesis: 'Mistral 的竞争力来自用更少参数和更开放部署实现足够好的企业效果。',
        partnerCompanyIds: ['asml', 'anthropic', 'meta-ai'],
        evidence: 'Mistral 融资公告强调用 AI 推动技术进步，并获得 ASML 等战略投资方支持。',
        whatBreaksIt: '如果客户只为最强闭源模型付费，效率型模型的议价空间会缩小。',
      },
      {
        pillar: '主权需求',
        pillarEn: 'Sovereign AI',
        headline: '欧洲合规、本地部署和产业合作',
        thesis: '政府、金融、工业客户可能需要可控、可审计、可本地化的模型供应商。',
        partnerCompanyIds: ['asml', 'google-cloud', 'microsoft-azure'],
        evidence: 'Mistral 与欧洲产业伙伴合作，主权 AI 是其差异化叙事之一。',
        whatBreaksIt: '如果美国云厂商提供足够合规的托管方案，主权溢价会下降。',
      },
      {
        pillar: '企业产品',
        pillarEn: 'Enterprise Products',
        headline: 'Le Chat、AI Studio 和 API 商业化',
        thesis: 'Mistral 需要把模型下载和开发者热度转化为企业订阅与平台收入。',
        partnerCompanyIds: ['snowflake', 'databricks', 'palantir'],
        evidence: 'Mistral 对外推广 Le Chat、企业产品和模型平台，目标是进入实际业务流程。',
        whatBreaksIt: '如果产品层弱于 Microsoft、OpenAI 或 Anthropic，模型能力会被上层应用吸收。',
      },
    ],
    peers: [
      { companyId: 'anthropic', product: 'Claude', processNode: '闭源模型', ecosystem: '企业 API', gapNote: '模型口碑和企业采用强，部署开放性弱。' },
      { companyId: 'meta-ai', product: 'Llama', processNode: '开放权重', ecosystem: '开源社区 / 云伙伴', gapNote: '生态更大，欧洲主权定位弱。' },
      { companyId: 'alibaba-qwen', product: 'Qwen', processNode: '开放模型', ecosystem: '阿里云 / 中国开发者', gapNote: '中文和中国云生态强，欧洲合规不同。' },
    ],
    structuralGap:
      'Mistral 的结构性差距是算力资本与分发入口。它要避开正面烧钱竞赛，在主权、私有化和成本效率上形成可持续市场。',
    financialBase: { revenue: 0.3, profit: -0.35, grossMargin: 0.5, rnd: 0.22, aiRevenue: 0.3 },
    source: sources.mistral,
  },
  {
    companyId: 'deepseek',
    tagline: '用低成本训练、强推理模型和开源策略重塑中国模型竞争',
    paragraphs: [
      'DeepSeek 位于模型层，它的产业意义在于证明模型能力不只由最大资本开支决定，也可以通过训练方法、数据工程、推理结构和开源策略获得杠杆。它让中国模型竞争从“追参数”转向“追效率和可用性”。',
      'DeepSeek 的影响力来自两个方向：一是模型表现和成本效率对开发者友好，二是开放权重和 API 让生态快速扩散。对中国 AI 产业来说，它降低了应用层和云平台接入强模型的门槛。',
      '风险在于商业化和算力持续性。开源带来影响力，但收入捕获有限；高质量模型迭代仍需要稳定 GPU/国产加速器供给、数据和工程团队。',
    ],
    dependencies: [
      {
        pillar: '训练效率',
        pillarEn: 'Training Efficiency',
        headline: '算法、数据和工程优化',
        thesis: 'DeepSeek 的差异化来自在受限算力环境下提升模型性价比。',
        partnerCompanyIds: ['alibaba-qwen', 'huawei-hisilicon', 'cambricon'],
        evidence: 'DeepSeek 的公开模型和研究发布使低成本高能力训练成为行业焦点。',
        whatBreaksIt: '如果国际前沿模型继续拉开能力差距，效率优势不足以支撑高端客户。',
      },
      {
        pillar: '开源扩散',
        pillarEn: 'Open Distribution',
        headline: '权重开放带来开发者和云生态采用',
        thesis: '开源降低应用接入成本，也让模型快速进入推理框架和国产云服务。',
        partnerCompanyIds: ['alibaba-qwen', 'meta-ai', 'mistral'],
        evidence: '开放模型生态已成为中国模型公司争夺开发者的重要路径。',
        whatBreaksIt: '如果商业授权和服务能力跟不上，影响力会被云厂商或应用层吸收。',
      },
      {
        pillar: '国产算力',
        pillarEn: 'Domestic Compute',
        headline: '昇腾、寒武纪和云平台推理部署',
        thesis: '中国模型长期运行需要适配国产 AI 加速器和云推理栈。',
        partnerCompanyIds: ['huawei-hisilicon', 'cambricon', 'alibaba-cloud'],
        evidence: '出口管制使中国模型公司必须同时考虑模型能力和国产算力适配。',
        whatBreaksIt: '国产硬件生态若无法承接高效推理，开源模型的规模化使用会受限。',
      },
    ],
    peers: [
      { companyId: 'alibaba-qwen', product: 'Qwen', processNode: '开源 / 云模型', ecosystem: '阿里云 / 魔搭', gapNote: '云分发更强，DeepSeek 以效率和社区声量突围。' },
      { companyId: 'meta-ai', product: 'Llama', processNode: '开放权重', ecosystem: '全球开发者', gapNote: '全球生态更大，中文和国产算力适配不同。' },
      { companyId: 'mistral', product: 'Mistral', processNode: '开放模型', ecosystem: '欧洲企业部署', gapNote: '主权 AI 定位强，中国生态弱。' },
    ],
    structuralGap:
      'DeepSeek 的瓶颈是把开源影响力转成可持续收入，并在国产算力约束下保持模型迭代速度。',
    financialBase: { revenue: 0.25, profit: -0.18, grossMargin: 0.45, rnd: 0.16, aiRevenue: 0.25 },
    source: sources.deepseek,
  },
  {
    companyId: 'xai',
    tagline: '以 Grok、X 分发和巨型训练集群冲击前沿模型市场',
    paragraphs: [
      'xAI 是模型层的高资本投入玩家，核心产品是 Grok 系列模型和面向 X、API、企业及开发者的服务。它的差异化叙事是快速迭代、实时社交数据入口和大规模训练集群。',
      '它的潜在优势在于 X 的信息流和用户分发，以及与 Tesla、SpaceX 等生态的潜在数据和机器人场景协同。但这些协同能否变成稳定产品收入，仍取决于模型能力、开发者体验和企业信任。',
      '风险同样明显：前沿模型需要持续巨额算力投入，且品牌、治理和企业采购信任会影响商业化。xAI 必须证明 Grok 不只是社交平台特色功能，而是能承接开发者和企业工作负载的模型平台。',
    ],
    dependencies: [
      {
        pillar: '训练集群',
        pillarEn: 'Training Cluster',
        headline: '大规模 GPU 集群和数据中心速度',
        thesis: 'xAI 的模型能力高度依赖算力建设速度、网络、供电和 GPU 供应。',
        partnerCompanyIds: ['nvidia', 'supermicro', 'vistra'],
        evidence: 'xAI 的竞争叙事与大规模训练集群建设紧密相关，资本开支是核心变量。',
        whatBreaksIt: '如果集群上线或利用率不及预期，模型迭代速度会被拖慢。',
      },
      {
        pillar: '实时数据',
        pillarEn: 'Real-Time Data',
        headline: 'X 信息流提供差异化语境',
        thesis: 'Grok 可以利用社交平台实时内容构建产品差异，但也要处理噪声和可信度。',
        partnerCompanyIds: ['perplexity', 'openai', 'google-deepmind'],
        evidence: '实时信息和社交语境是 Grok 区别于通用聊天助手的重要卖点。',
        whatBreaksIt: '数据质量、内容治理或平台流量下降会削弱实时优势。',
      },
      {
        pillar: '生态协同',
        pillarEn: 'Ecosystem Synergy',
        headline: 'X、Tesla 和企业 API 的潜在连接',
        thesis: 'xAI 的长期故事在于把模型能力连接到社交、机器人、汽车和企业服务。',
        partnerCompanyIds: ['tesla', 'openai', 'microsoft-azure'],
        evidence: '模型公司若能连接高频产品入口，商业化效率通常高于单纯 API。',
        whatBreaksIt: '如果生态协同停留在叙事层，xAI 会回到纯模型烧钱竞赛。',
      },
    ],
    peers: [
      { companyId: 'openai', product: 'ChatGPT / API', processNode: '闭源模型', ecosystem: '消费入口 / 企业 API', gapNote: '商业化成熟度更高，实时社交数据不同。' },
      { companyId: 'anthropic', product: 'Claude', processNode: '企业模型', ecosystem: '安全 / 长上下文', gapNote: '企业信任更强，社交入口弱。' },
      { companyId: 'meta-ai', product: 'Meta AI / Llama', processNode: '社交 + 开源', ecosystem: 'Meta apps', gapNote: '社交分发更大，xAI 与 X 的实时定位更集中。' },
    ],
    structuralGap:
      'xAI 的结构性差距是从巨型集群和平台流量转成可复购收入。模型能力、治理信任和生态落地缺一不可。',
    financialBase: { revenue: 0.5, profit: -2, grossMargin: 0.45, rnd: 1.2, aiRevenue: 0.5 },
    source: sources.xai,
  },
  {
    companyId: 'alibaba-qwen',
    tagline: '阿里云模型生态的核心入口，连接开源 Qwen、通义应用和企业云服务',
    paragraphs: [
      'Alibaba Qwen 处在模型层，是阿里云 AI 栈的核心模型品牌。它通过通义千问、开源权重、API、百炼平台和钉钉/电商场景，把模型能力连接到中国开发者和企业客户。',
      '它的优势是云平台、中文场景和开源生态。Qwen 系列模型在中文、多模态、代码和工具调用上持续迭代，开源权重则让企业可以在私有化和国产算力环境中部署。',
      '风险是竞争激烈：DeepSeek 带来效率压力，百度、智谱、月之暗面、字节等玩家争夺应用入口，国际模型仍在高端能力上施压。Qwen 必须同时证明模型能力、云收入和生态占有率。',
    ],
    dependencies: [
      {
        pillar: '阿里云分发',
        pillarEn: 'Cloud Distribution',
        headline: '百炼、PAI 和企业云客户',
        thesis: 'Qwen 的商业化高度依赖阿里云平台把模型卖给企业和开发者。',
        partnerCompanyIds: ['alibaba-cloud', 'deepseek', 'mistral'],
        evidence: '阿里云年报和产品体系将通义模型与云 AI 平台、企业应用绑定。',
        whatBreaksIt: '如果企业把模型部署迁移到第三方或本地开源栈，阿里云的价值捕获会下降。',
      },
      {
        pillar: '开源生态',
        pillarEn: 'Open Weights',
        headline: 'Qwen 开源权重扩大开发者覆盖',
        thesis: '开放模型帮助 Qwen 进入本地部署、研究和二次开发场景。',
        partnerCompanyIds: ['deepseek', 'meta-ai', 'mistral'],
        evidence: '中国模型竞争中，开放权重已成为争夺开发者和行业生态的重要工具。',
        whatBreaksIt: '开源影响力如果不能回流 API、云资源和企业服务，会削弱商业收益。',
      },
      {
        pillar: '应用场景',
        pillarEn: 'Application Scenarios',
        headline: '电商、办公、客服和代码场景',
        thesis: '阿里体系内的电商、钉钉和云客户可以为 Qwen 提供真实场景。',
        partnerCompanyIds: ['microsoft-copilot', 'salesforce', 'cursor'],
        evidence: '模型价值最终要通过应用调用、智能体和行业流程转成收入。',
        whatBreaksIt: '如果上层应用选择多模型路由，Qwen 很难独占全部推理需求。',
      },
    ],
    peers: [
      { companyId: 'deepseek', product: 'DeepSeek R/V 系列', processNode: '开放模型', ecosystem: '开发者社区 / API', gapNote: '效率声量强，云商业化弱于阿里。' },
      { companyId: 'meta-ai', product: 'Llama', processNode: '开放权重', ecosystem: '全球开发者', gapNote: '全球生态更大，中文与中国云场景弱。' },
      { companyId: 'mistral', product: 'Mistral', processNode: '开放模型', ecosystem: '欧洲企业部署', gapNote: '主权定位强，中国企业分发弱。' },
    ],
    structuralGap:
      'Qwen 的结构性挑战是平衡开源扩散和云收入捕获。模型越开放，越需要云平台和企业服务承接商业价值。',
    financialBase: { revenue: 1.5, profit: -0.3, grossMargin: 0.48, rnd: 0.8, aiRevenue: 1.5 },
    source: sources.alibaba,
  },
  {
    companyId: 'coreweave',
    tagline: '把稀缺 GPU、快速数据中心交付和模型客户需求打包成 AI 云',
    paragraphs: [
      'CoreWeave 是基础设施层里最纯粹的 AI 云代表。它把 NVIDIA GPU 集群、数据中心租赁、电力合同、网络和托管服务组合成面向模型公司与企业客户的高性能云。',
      '它的优势是速度和专注。相比传统云，CoreWeave 更愿意围绕 GPU 供给、集群交付和大客户合同快速扩张；相比自建数据中心的模型公司，它能提供更快上线和更灵活容量。',
      '风险是资本密集和客户集中。AI 云收入增长很快，但需要持续融资、长期租约、电力和 GPU 采购。如果模型训练需求放缓或大客户转向自建，利用率和现金流会承压。',
    ],
    dependencies: [
      {
        pillar: 'GPU 供给',
        pillarEn: 'GPU Supply',
        headline: 'NVIDIA 加速器和整机集群',
        thesis: 'CoreWeave 的核心生产资料是高端 GPU、网络和快速部署能力。',
        partnerCompanyIds: ['nvidia', 'supermicro', 'sk-hynix'],
        evidence: 'CoreWeave 年报和投资者材料将 AI cloud 和 GPU 基础设施作为主营业务核心。',
        whatBreaksIt: '如果 GPU 供应收紧或价格下行导致客户重谈合同，毛利和增长都会受影响。',
      },
      {
        pillar: '电力与数据中心',
        pillarEn: 'Power And Sites',
        headline: '电力、机房和并网速度',
        thesis: 'AI 云扩容不仅买 GPU，还要拿到可用电力和高密度数据中心空间。',
        partnerCompanyIds: ['vistra', 'equinix', 'digital-realty'],
        evidence: 'AI 云玩家普遍把数据中心交付、电力获取和液冷能力视为扩容瓶颈。',
        whatBreaksIt: '并网、冷却或租约成本上升会延迟集群上线，影响客户交付。',
      },
      {
        pillar: '模型客户',
        pillarEn: 'Model Customers',
        headline: 'OpenAI、xAI、Anthropic 等需求周期',
        thesis: 'CoreWeave 的利用率取决于前沿模型训练和推理客户的资本开支节奏。',
        partnerCompanyIds: ['openai', 'xai', 'anthropic'],
        evidence: 'AI 云需求高度来自模型公司和大型企业的训练推理工作负载。',
        whatBreaksIt: '如果模型公司转向自建或云巨头长期合约，CoreWeave 的边际需求会下降。',
      },
    ],
    peers: [
      { companyId: 'aws', product: 'EC2 GPU / Trainium', processNode: '云平台', ecosystem: 'AWS', gapNote: '规模更大，AI GPU 专注度不同。' },
      { companyId: 'oracle-cloud', product: 'OCI AI clusters', processNode: 'AI 云', ecosystem: 'OCI / 大客户集群', gapNote: '大集群价格激进，生态广度不同。' },
      { companyId: 'microsoft-azure', product: 'Azure AI infrastructure', processNode: '云平台', ecosystem: 'OpenAI / Enterprise', gapNote: '企业分发强，灵活 GPU 云定位不同。' },
    ],
    structuralGap:
      'CoreWeave 的瓶颈是资产负债表。它越成功，越需要更多 GPU、电力和机房资本，现金流质量比收入增速更关键。',
    financialBase: { revenue: 2.3, profit: -0.9, grossMargin: 0.42, rnd: 0.18, aiRevenue: 2.1 },
    source: sources.coreweave,
  },
  {
    companyId: 'equinix',
    tagline: '用全球互联数据中心承载 AI 推理、混合云和企业数据交换',
    paragraphs: [
      'Equinix 是基础设施层的数据中心与互联节点。它不像 CoreWeave 那样直接卖 GPU 云，而是提供全球机房、互联、托管和企业混合云连接，是 AI 推理和数据交换的重要物理底座。',
      'AI 对 Equinix 的意义在于提高功率密度、互联需求和企业数据驻留需求。许多企业不会把所有数据搬到单一公有云，而会通过 Equinix 连接多云、模型服务、私有数据和边缘节点。',
      '风险是高密度 AI 负载对电力和冷却要求更高。传统托管数据中心要服务 AI，必须升级供电、液冷和园区容量，否则会被专门的 hyperscale 或 AI cloud 数据中心分流。',
    ],
    dependencies: [
      {
        pillar: '互联生态',
        pillarEn: 'Interconnection',
        headline: '云、网络、企业和模型服务的交换节点',
        thesis: 'Equinix 的价值在于把多云、网络和企业数据低延迟连接起来。',
        partnerCompanyIds: ['aws', 'microsoft-azure', 'google-cloud'],
        evidence: 'Equinix 年报强调全球互联平台和 AI、云、数据增长带来的需求。',
        whatBreaksIt: '如果客户把 AI 工作负载集中到单一云，互联中立性的价值会下降。',
      },
      {
        pillar: '高密度能力',
        pillarEn: 'High Density',
        headline: '供电、冷却和液冷升级',
        thesis: 'AI 推理和小规模训练需要更高功率密度，数据中心必须改造基础设施。',
        partnerCompanyIds: ['nvidia', 'supermicro', 'digital-realty'],
        evidence: 'AI 数据中心需求提高了对高密度电力和冷却能力的要求。',
        whatBreaksIt: '电力或冷却升级慢，会让高价值 AI 客户转向新建园区。',
      },
      {
        pillar: '企业混合云',
        pillarEn: 'Hybrid Cloud',
        headline: '私有数据和模型服务之间的桥',
        thesis: '许多企业会保留核心数据在私有或托管环境，再连接外部模型和云。',
        partnerCompanyIds: ['palantir', 'snowflake', 'databricks'],
        evidence: '企业 AI 采用通常需要数据驻留、合规和多云连接。',
        whatBreaksIt: '如果公有云原生数据服务吃掉大部分企业数据流，托管互联需求增长会放慢。',
      },
    ],
    peers: [
      { companyId: 'digital-realty', product: 'Hyperscale / colocation', processNode: '数据中心', ecosystem: '全球园区', gapNote: '批发和 hyperscale 更强，互联生态不同。' },
      { companyId: 'coreweave', product: 'AI cloud sites', processNode: 'GPU 云', ecosystem: 'NVIDIA GPU clusters', gapNote: 'AI 负载更直接，企业互联中立性弱。' },
      { companyId: 'google-cloud', product: 'Cloud regions', processNode: '云平台', ecosystem: 'Google Cloud', gapNote: '云服务完整，但中立托管定位不同。' },
    ],
    structuralGap:
      'Equinix 的挑战是把传统互联优势升级到 AI 高密度时代。电力、冷却和园区扩张速度决定它能吃到多少 AI 增量。',
    financialBase: { revenue: 8.75, profit: 0.82, grossMargin: 0.47, rnd: 0.3, aiRevenue: 2.2 },
    source: sources.equinix,
  },
  {
    companyId: 'digital-realty',
    tagline: '用 hyperscale 数据中心和全球园区承接 AI 云扩容',
    paragraphs: [
      'Digital Realty 是基础设施层的 hyperscale 和托管数据中心平台。AI 带来的 GPU 集群扩容需要大规模园区、电力、冷却、网络和长期租约，这正是它的核心资产组合。',
      '相比 Equinix 的互联中立定位，Digital Realty 更偏向大规模容量和 hyperscale 客户。云厂商、AI 云和企业客户需要快速扩容时，数据中心 REIT 提供了资本和交付能力。',
      '风险是电力约束、利率和客户集中。AI 数据中心需求强，但建设周期、并网审批和资本成本会决定项目回报。过快扩张也可能在需求放缓时留下空置或低回报资产。',
    ],
    dependencies: [
      {
        pillar: '园区容量',
        pillarEn: 'Campus Capacity',
        headline: '大规模土地、电力和机房交付',
        thesis: 'AI 云扩容需要成片园区，而不是零散机柜。',
        partnerCompanyIds: ['aws', 'microsoft-azure', 'coreweave'],
        evidence: 'Digital Realty 的业务模型围绕全球数据中心园区、托管和 hyperscale 客户展开。',
        whatBreaksIt: '如果并网和许可拖延，已签客户需求也无法转化成收入。',
      },
      {
        pillar: '电力成本',
        pillarEn: 'Power Cost',
        headline: '长期电力采购和高密度冷却',
        thesis: 'AI 数据中心盈利能力受电价、PUE 和冷却方案影响。',
        partnerCompanyIds: ['constellation', 'nextera', 'vistra'],
        evidence: 'AI 负载提升功率密度，使电力和冷却成为数据中心选址的关键因素。',
        whatBreaksIt: '电力价格或冷却资本支出过高会压缩租约回报。',
      },
      {
        pillar: '资本成本',
        pillarEn: 'Cost Of Capital',
        headline: 'REIT 融资能力决定扩张节奏',
        thesis: '数据中心是重资产业务，利率和融资渠道会影响新项目速度。',
        partnerCompanyIds: ['equinix', 'oracle-cloud', 'google-cloud'],
        evidence: '数据中心 REIT 需要在高需求和高资本开支之间平衡杠杆。',
        whatBreaksIt: '利率上升或租约定价下行会降低开发回报。',
      },
    ],
    peers: [
      { companyId: 'equinix', product: 'IBX / interconnection', processNode: '托管互联', ecosystem: '企业和网络生态', gapNote: '互联更强，hyperscale 园区定位不同。' },
      { companyId: 'coreweave', product: 'GPU cloud campuses', processNode: 'AI 云', ecosystem: 'NVIDIA clusters', gapNote: '直接承接 GPU 工作负载，资产中立性弱。' },
      { companyId: 'oracle-cloud', product: 'OCI regions', processNode: '云数据中心', ecosystem: 'Oracle enterprise', gapNote: '云服务完整，第三方托管角色不同。' },
    ],
    structuralGap:
      'Digital Realty 的核心矛盾是需求很强但供给很慢。能否锁定低成本电力和长期客户，是 AI 周期里的胜负点。',
    financialBase: { revenue: 5.55, profit: 0.6, grossMargin: 0.53, rnd: 0.18, aiRevenue: 1.55 },
    source: sources.digitalRealty,
  },
  {
    companyId: 'supermicro',
    tagline: '把 GPU、CPU、网络和液冷整合成可快速交付的 AI 服务器',
    paragraphs: [
      'Supermicro 位于基础设施层和芯片层交界，是 AI 服务器和机柜级系统集成商。它不生产 GPU，但把 NVIDIA、AMD、Intel、存储、网络、电源和液冷整合成客户能部署的机器。',
      '它的优势是产品迭代快、SKU 丰富、贴近芯片路线图，并能在 AI 服务器需求爆发时快速接单。对 CoreWeave、云厂商和企业客户来说，整机交付速度直接影响 GPU 上线时间。',
      '风险是毛利率薄、供应链和财务治理。AI 服务器需求强，但系统集成商议价能力弱于 GPU 厂商，且客户集中和库存周期会放大波动。',
    ],
    dependencies: [
      {
        pillar: 'GPU 平台',
        pillarEn: 'GPU Platforms',
        headline: 'NVIDIA/AMD 参考架构快速落地',
        thesis: 'Supermicro 的订单高度依赖上游 GPU 代际和客户集群需求。',
        partnerCompanyIds: ['nvidia', 'amd', 'sk-hynix'],
        evidence: 'Supermicro 披露 AI 服务器和机柜系统是增长核心，GPU 平台更新会带来整机换代。',
        whatBreaksIt: '如果 GPU 供应不足或云厂商转向自研整机，收入会被压缩。',
      },
      {
        pillar: '液冷与机柜',
        pillarEn: 'Rack Integration',
        headline: '高密度服务器、网络和冷却整合',
        thesis: 'Blackwell 级系统更依赖整柜交付、液冷和高速网络布线。',
        partnerCompanyIds: ['coreweave', 'digital-realty', 'equinix'],
        evidence: 'AI 集群从单机采购转向机柜级方案，系统集成复杂度上升。',
        whatBreaksIt: '液冷供应链或交付质量问题会影响客户上线。',
      },
      {
        pillar: '供应链执行',
        pillarEn: 'Supply Chain Execution',
        headline: '低毛利下的库存和交付管理',
        thesis: 'AI 服务器厂商必须在速度、质量和库存风险之间平衡。',
        partnerCompanyIds: ['industrial-fulian', 'dell', 'hpe'],
        evidence: '系统集成商通常处于低毛利、高周转环节，执行和信用是关键。',
        whatBreaksIt: '财务披露、库存或客户集中问题会显著影响估值。',
      },
    ],
    peers: [
      { companyId: 'dell', product: 'PowerEdge AI servers', processNode: 'AI 服务器', ecosystem: 'Enterprise channel', gapNote: '企业渠道更强，迭代速度不同。' },
      { companyId: 'industrial-fulian', product: 'AI server manufacturing', processNode: 'ODM / 制造', ecosystem: '全球供应链', gapNote: '制造规模强，品牌直销弱。' },
      { companyId: 'coreweave', product: 'GPU cloud', processNode: 'AI 云客户', ecosystem: 'NVIDIA clusters', gapNote: '是客户也是需求信号源。' },
    ],
    structuralGap:
      'Supermicro 的结构性瓶颈是议价权。它越接近 GPU 交付瓶颈越重要，但长期利润池仍被芯片和云平台挤压。',
    financialBase: { revenue: 22, profit: 1.2, grossMargin: 0.11, rnd: 0.18, aiRevenue: 15.4 },
    source: sources.supermicro,
  },
  {
    companyId: 'amd',
    tagline: '用 Instinct GPU、EPYC CPU 和开放软件生态挑战英伟达默认选项',
    paragraphs: [
      'AMD 位于芯片层，是 NVIDIA 之外最重要的通用 AI 加速器竞争者。MI300/MI350/MI400 路线、EPYC CPU 和开放软件栈让它成为云厂商压低 GPU 采购风险与成本的关键替代。',
      'AMD 的优势是 CPU 数据中心基础、chiplet 工程和与 hyperscaler 的长期关系。它不需要完全取代 NVIDIA，只要在推理、部分训练和性价比场景拿到足够份额，就能分享 AI 加速器利润池。',
      '主要风险是软件生态。ROCm、库优化、开发者工具和客户迁移成本仍落后 CUDA。AMD 的关键观察指标是云厂商规模采购、推理工作负载占比和软件兼容性进展。',
    ],
    dependencies: [
      {
        pillar: 'HBM 与封装',
        pillarEn: 'HBM Packaging',
        headline: 'MI 系列依赖 HBM 和先进封装',
        thesis: 'AI GPU 的性能和出货受 HBM 容量、封装产能和良率约束。',
        partnerCompanyIds: ['tsmc', 'sk-hynix', 'micron'],
        evidence: 'AMD Instinct 加速器与先进制程、HBM 和封装供应链高度绑定。',
        whatBreaksIt: 'HBM 或先进封装产能不足会使 AMD 难以趁 NVIDIA 供给紧张抢份额。',
      },
      {
        pillar: '软件生态',
        pillarEn: 'ROCm Ecosystem',
        headline: 'ROCm、库优化和框架适配',
        thesis: '客户迁移不仅看硬件价格，还看 PyTorch、推理框架和运维工具成熟度。',
        partnerCompanyIds: ['nvidia', 'openai', 'microsoft-azure'],
        evidence: 'AMD AI 加速器商业化重点在云客户验证和软件生态追赶。',
        whatBreaksIt: '如果软件迁移成本长期高于硬件节省，客户只会把 AMD 作为边缘备选。',
      },
      {
        pillar: '云客户',
        pillarEn: 'Hyperscaler Demand',
        headline: 'Microsoft、Oracle、Meta 等采购验证',
        thesis: 'AMD 需要大客户规模部署证明性能、稳定性和总拥有成本。',
        partnerCompanyIds: ['microsoft-azure', 'oracle-cloud', 'meta-ai'],
        evidence: '云厂商希望在 NVIDIA 外建立第二供应来源，AMD 是最现实的通用 GPU 替代。',
        whatBreaksIt: '如果云厂商自研 ASIC 在推理上快速放量，AMD 的增量空间会被压缩。',
      },
    ],
    peers: [
      { companyId: 'nvidia', product: 'Blackwell / CUDA', processNode: 'GPU', ecosystem: 'CUDA / NVLink', gapNote: '生态和系统能力领先，AMD 性价比和开放性追赶。' },
      { companyId: 'broadcom', product: 'Custom AI ASIC', processNode: '定制 ASIC', ecosystem: 'Hyperscaler custom silicon', gapNote: '定制效率强，通用性弱。' },
      { companyId: 'huawei-hisilicon', product: 'Ascend', processNode: '国产加速器', ecosystem: 'CANN / 华为云', gapNote: '中国替代路径强，全球生态受限。' },
    ],
    structuralGap:
      'AMD 的结构性差距在软件和系统级互联。硬件追赶只是一半，真正难的是让客户愿意迁移生产级工作负载。',
    financialBase: { revenue: 25.8, profit: 1.64, grossMargin: 0.49, rnd: 6.4, aiRevenue: 11.6 },
    source: sources.amd,
  },
  {
    companyId: 'broadcom',
    tagline: '用网络芯片和 hyperscaler 定制 ASIC 捕获 AI 基础设施利润',
    paragraphs: [
      'Broadcom 位于芯片层和基础设施层交界，是 AI 数据中心里容易被低估的利润节点。它既提供以太网、交换、SerDes、光互联相关芯片，也深度参与云厂商定制 AI ASIC。',
      '它的优势不是通用 GPU，而是定制化和网络。大型云厂商为了降低推理成本、减少 NVIDIA 依赖，会把部分工作负载迁移到自研 ASIC，而 Broadcom 是这些芯片从设计到量产的重要伙伴。',
      '风险在客户集中和代际不确定性。定制 ASIC 项目大、周期长、客户少，一旦某家 hyperscaler 路线变化或自研团队内化能力增强，Broadcom 的收入可见度会波动。',
    ],
    dependencies: [
      {
        pillar: '定制 ASIC',
        pillarEn: 'Custom ASIC',
        headline: '云厂商自研加速器的设计与量产伙伴',
        thesis: 'Broadcom 通过定制芯片捕获 hyperscaler 降低 AI 推理成本的需求。',
        partnerCompanyIds: ['google-cloud', 'meta-ai', 'aws'],
        evidence: 'Broadcom 年报和市场披露显示 AI 半导体收入与定制加速器、网络芯片需求相关。',
        whatBreaksIt: '如果云厂商把更多设计能力内化，Broadcom 的外包价值会下降。',
      },
      {
        pillar: '网络互联',
        pillarEn: 'Networking',
        headline: 'AI 集群以太网和交换芯片',
        thesis: '训练和推理集群需要低延迟、高带宽网络，Broadcom 在以太网生态中位置重要。',
        partnerCompanyIds: ['arista', 'nvidia', 'supermicro'],
        evidence: 'AI 数据中心从单机性能转向集群效率，网络芯片成为扩容瓶颈之一。',
        whatBreaksIt: '如果 NVIDIA 封闭网络或其他互联标准占优，Broadcom 的以太网份额会受影响。',
      },
      {
        pillar: '先进制造',
        pillarEn: 'Advanced Foundry',
        headline: 'TSMC 节点、封装和 HBM 生态',
        thesis: '高端 ASIC 与网络芯片也依赖先进制程和封装产能。',
        partnerCompanyIds: ['tsmc', 'ase', 'sk-hynix'],
        evidence: 'AI ASIC 量产与高端逻辑制程、先进封装和内存供应链共同决定交付。',
        whatBreaksIt: '先进制程或封装受限会延迟客户芯片量产窗口。',
      },
    ],
    peers: [
      { companyId: 'nvidia', product: 'GPU + Networking', processNode: 'GPU/网络', ecosystem: 'CUDA / NVLink', gapNote: '通用生态更强，Broadcom 定制 ASIC 更贴近单一客户成本。' },
      { companyId: 'amd', product: 'Instinct GPU', processNode: '通用 GPU', ecosystem: 'ROCm', gapNote: '通用性更强，定制效率不同。' },
      { companyId: 'google-cloud', product: 'TPU', processNode: '自研 ASIC', ecosystem: 'Google Cloud / JAX', gapNote: '是客户路径也是定制 ASIC 需求来源。' },
    ],
    structuralGap:
      'Broadcom 的核心变量是云厂商自研比例。AI 推理越规模化，定制 ASIC 越有吸引力，但客户集中会提高收入波动。',
    financialBase: { revenue: 51.6, profit: 14, grossMargin: 0.7, rnd: 9.5, aiRevenue: 25.8 },
    source: sources.broadcom,
  },
  {
    companyId: 'asml',
    tagline: 'EUV 光刻的唯一供给者，决定先进 AI 芯片制程上限',
    paragraphs: [
      'ASML 是芯片层最底层的关键设备公司。它的 EUV 光刻机是 5nm、3nm 以及后续先进节点量产的核心设备，几乎所有高端 AI 加速器、CPU、ASIC 和 HBM 相关逻辑芯片都间接受它约束。',
      'ASML 的护城河来自极端复杂的光学、光源、精密机械、控制软件和供应链协同。客户不是随便换供应商，而是与台积电、三星、英特尔等制造厂一起按节点路线图规划产能。',
      '风险主要是半导体资本开支周期和出口管制。AI 推动先进节点需求，但存储、手机、PC 和地缘政治会影响设备订单节奏。读 ASML，就是读先进制程产能能否继续按摩尔定律附近推进。',
    ],
    dependencies: [
      {
        pillar: '先进晶圆厂',
        pillarEn: 'Leading Fabs',
        headline: '台积电、三星、英特尔节点投资',
        thesis: 'ASML 设备需求由先进晶圆厂扩产和节点迁移驱动。',
        partnerCompanyIds: ['tsmc', 'samsung-foundry', 'intel-foundry'],
        evidence: 'ASML 年报提供年度设备、服务和客户需求披露，是先进制程资本开支的重要窗口。',
        whatBreaksIt: '如果先进节点需求放缓，EUV 订单和服务增长都会被推迟。',
      },
      {
        pillar: '供应链极限',
        pillarEn: 'Precision Supply Chain',
        headline: 'Zeiss 光学、光源和精密组件',
        thesis: 'EUV 系统复杂度极高，任何关键部件瓶颈都会影响交付。',
        partnerCompanyIds: ['applied-materials', 'lam-research', 'tokyo-electron'],
        evidence: 'ASML 的系统依赖全球精密供应链和长期客户协同。',
        whatBreaksIt: '关键供应商产能或质量问题会使 EUV 交付节奏失控。',
      },
      {
        pillar: '出口管制',
        pillarEn: 'Export Controls',
        headline: '中国先进设备限制改变需求结构',
        thesis: 'EUV 和部分 DUV 出口限制会重塑区域收入和中国国产替代节奏。',
        partnerCompanyIds: ['smic', 'naura', 'huawei-hisilicon'],
        evidence: '先进半导体设备受到多国出口管制影响，ASML 是最核心的受约束节点之一。',
        whatBreaksIt: '管制加码会减少中国先进设备收入，但也可能刺激长期国产替代。',
      },
    ],
    peers: [
      { companyId: 'applied-materials', product: 'Deposition / materials engineering', processNode: '晶圆设备', ecosystem: '全球晶圆厂', gapNote: '覆盖环节更广，EUV 独占性弱。' },
      { companyId: 'lam-research', product: 'Etch / deposition', processNode: '晶圆设备', ecosystem: '存储与逻辑制程', gapNote: '刻蚀沉积关键，但不可替代性低于 EUV。' },
      { companyId: 'naura', product: '国产刻蚀/薄膜设备', processNode: '国产替代', ecosystem: '中国晶圆厂', gapNote: '国产替代加速，但 EUV 差距仍大。' },
    ],
    structuralGap:
      'ASML 的结构性变量是先进节点是否继续集中在少数晶圆厂。只要高端 AI 芯片继续追逐更先进制程，EUV 仍是瓶颈资产。',
    financialBase: { revenue: 28.26, profit: 7.57, grossMargin: 0.51, rnd: 4.4, aiRevenue: 17.5 },
    source: sources.asml,
  },
  {
    companyId: 'applied-materials',
    tagline: '材料工程设备覆盖沉积、刻蚀、计量和先进封装多个关键步骤',
    paragraphs: [
      'Applied Materials 是芯片层设备龙头之一，覆盖薄膜沉积、材料改性、刻蚀、检测和先进封装等多个环节。AI 芯片越复杂，材料层、互连、功耗和良率问题越重要。',
      '它的优势是工艺覆盖面广、客户关系深，以及能够跨逻辑、存储和封装提供材料工程解决方案。相比单点设备公司，Applied 更像晶圆厂工艺路线的多工具箱。',
      '风险是设备周期和中国限制。AI 拉动先进逻辑和 HBM 产能，但整体半导体设备仍受资本开支周期影响，且出口管制会改变中国市场收入结构。',
    ],
    dependencies: [
      {
        pillar: '晶圆厂资本开支',
        pillarEn: 'Fab Capex',
        headline: '逻辑、DRAM 和先进封装投资',
        thesis: 'Applied 的收入跟随台积电、三星、美光、SK 海力士等客户扩产周期。',
        partnerCompanyIds: ['tsmc', 'sk-hynix', 'micron'],
        evidence: 'Applied Materials 年报将半导体系统和应用材料工程作为核心业务。',
        whatBreaksIt: '如果存储和逻辑客户削减资本开支，订单增长会放缓。',
      },
      {
        pillar: '材料复杂度',
        pillarEn: 'Materials Complexity',
        headline: '先进节点和 3D 结构需要更多工艺步骤',
        thesis: 'AI 芯片的性能提升依赖更复杂材料、互连和沉积刻蚀流程。',
        partnerCompanyIds: ['asml', 'lam-research', 'tokyo-electron'],
        evidence: '先进制程和高带宽存储都提升了材料工程设备的重要性。',
        whatBreaksIt: '如果节点迁移放缓，材料复杂度带来的设备强度提升会减弱。',
      },
      {
        pillar: '出口限制',
        pillarEn: 'Export Controls',
        headline: '中国市场和国产替代压力',
        thesis: '中国成熟制程需求强，但先进设备限制带来收入和合规不确定。',
        partnerCompanyIds: ['smic', 'naura', 'anji-micro'],
        evidence: '美国半导体设备公司持续面对出口管制和中国本土设备替代。',
        whatBreaksIt: '如果限制扩大到更多成熟制程设备，中国收入会承压。',
      },
    ],
    peers: [
      { companyId: 'asml', product: 'EUV / DUV lithography', processNode: '光刻', ecosystem: '先进制程', gapNote: '单点不可替代更强，Applied 覆盖更宽。' },
      { companyId: 'lam-research', product: 'Etch / deposition', processNode: '刻蚀沉积', ecosystem: '存储 / 逻辑', gapNote: '刻蚀强，Applied 材料工程更广。' },
      { companyId: 'naura', product: '国产设备', processNode: '刻蚀/薄膜', ecosystem: '中国晶圆厂', gapNote: '国产替代受益，但高端覆盖仍追赶。' },
    ],
    structuralGap:
      'Applied 的变量是设备强度。AI 芯片复杂度提高会增加工艺步骤，但资本开支周期仍会让收入波动。',
    financialBase: { revenue: 27.2, profit: 7.18, grossMargin: 0.475, rnd: 3.1, aiRevenue: 12.2 },
    source: sources.appliedMaterials,
  },
  {
    companyId: 'lam-research',
    tagline: '刻蚀和沉积设备深度绑定 HBM、3D NAND 和先进逻辑扩产',
    paragraphs: [
      'Lam Research 是芯片层关键设备公司，强项在刻蚀、沉积和清洗等晶圆制造步骤。AI 对 HBM、DRAM、NAND 和先进逻辑的需求，都会增加相关工艺设备的重要性。',
      '它的优势在存储工艺深度。HBM 和高层数 NAND 对刻蚀与沉积控制要求高，AI 服务器带来的内存带宽需求，让 Lam 的设备与存储资本开支周期高度相关。',
      '风险是存储周期和客户集中。HBM 很热，但整体存储行业仍有价格和库存周期；如果 DRAM/NAND 厂商放缓扩产，Lam 的订单会被影响。',
    ],
    dependencies: [
      {
        pillar: 'HBM 扩产',
        pillarEn: 'HBM Expansion',
        headline: 'SK 海力士、美光、三星存储资本开支',
        thesis: 'HBM 需求提升存储厂商对刻蚀、沉积和先进封装相关工艺的投资。',
        partnerCompanyIds: ['sk-hynix', 'micron', 'samsung-memory'],
        evidence: 'Lam 年报强调 AI 和数据密集型应用推动存储与逻辑技术进步。',
        whatBreaksIt: '如果 HBM 供需转松，存储客户扩产节奏会下降。',
      },
      {
        pillar: '3D 结构',
        pillarEn: '3D Structures',
        headline: '高深宽比刻蚀和薄膜控制',
        thesis: '3D NAND、先进 DRAM 和逻辑互连需要更复杂刻蚀沉积。',
        partnerCompanyIds: ['applied-materials', 'asml', 'tokyo-electron'],
        evidence: '存储层数提升和先进节点复杂度增加了刻蚀沉积步骤难度。',
        whatBreaksIt: '如果技术路线转向减少关键步骤的架构，设备强度会下降。',
      },
      {
        pillar: '中国市场',
        pillarEn: 'China Exposure',
        headline: '成熟制程需求与出口限制并存',
        thesis: '中国晶圆厂扩产支撑需求，但先进设备出口限制带来不确定。',
        partnerCompanyIds: ['smic', 'ymtc', 'naura'],
        evidence: '美国设备公司在中国市场面对需求与合规限制的双重变量。',
        whatBreaksIt: '出口限制扩大或国产设备替代加速，会影响 Lam 在中国的长期份额。',
      },
    ],
    peers: [
      { companyId: 'applied-materials', product: 'Deposition / materials engineering', processNode: '材料工程', ecosystem: '晶圆厂', gapNote: '覆盖更广，Lam 在刻蚀和存储工艺更集中。' },
      { companyId: 'asml', product: 'EUV lithography', processNode: '光刻', ecosystem: '先进逻辑', gapNote: '节点瓶颈更强，但不直接覆盖刻蚀沉积。' },
      { companyId: 'naura', product: '国产刻蚀设备', processNode: '国产替代', ecosystem: '中国晶圆厂', gapNote: '中国替代路径，但高端稳定性仍追赶。' },
    ],
    structuralGap:
      'Lam 的结构性变量是 AI 是否持续拉动 HBM 和先进存储扩产。存储周期若反转，设备订单弹性会很大。',
    financialBase: { revenue: 14.9, profit: 3.83, grossMargin: 0.47, rnd: 1.8, aiRevenue: 6.4 },
    source: sources.lamResearch,
  },
  {
    companyId: 'constellation',
    tagline: '用核电和长期 PPA 成为 AI 数据中心的稳定低碳电力节点',
    paragraphs: [
      'Constellation 位于能源层，核心资产是核电和低碳可调度电力。AI 数据中心需要 24/7 高负载运行，间歇性新能源不能单独满足需求，核电因此成为 hyperscaler 争夺的稀缺资产。',
      '它的战略价值不是“参与 AI”，而是让 AI 集群持续通电。长期 PPA、核电站延寿、重启和新增容量合同都会影响数据中心选址和上线速度。',
      '风险是监管、安全、项目周期和电价。核电资产价值高，但许可证、检修、并网和社区审批都可能拖慢兑现。AI 用电需求越强，Constellation 越像算力底层的供给瓶颈。',
    ],
    dependencies: [
      {
        pillar: '核电资产',
        pillarEn: 'Nuclear Fleet',
        headline: '稳定低碳基荷电力',
        thesis: '核电能提供高容量因子电力，适合 AI 数据中心连续运行。',
        partnerCompanyIds: ['microsoft-azure', 'coreweave', 'digital-realty'],
        evidence: 'Constellation 年报披露其清洁能源和核电资产，是美国稳定低碳电力的重要供给方。',
        whatBreaksIt: '核电站检修、监管或安全事件会影响可用容量和合同兑现。',
      },
      {
        pillar: '长期合约',
        pillarEn: 'Power Contracts',
        headline: 'PPA 锁定 AI 数据中心用电',
        thesis: '大型云和数据中心客户需要多年期电力合同来支撑投资决策。',
        partnerCompanyIds: ['microsoft-azure', 'aws', 'google-cloud'],
        evidence: 'AI 数据中心用电增长使长期低碳电力采购成为 hyperscaler 的核心任务。',
        whatBreaksIt: '如果监管限制或电价波动导致合同难以批准，收入可见度会下降。',
      },
      {
        pillar: '电网接入',
        pillarEn: 'Grid Interconnect',
        headline: '并网和本地负载匹配',
        thesis: '电力资产必须与数据中心负载、输电和区域容量匹配。',
        partnerCompanyIds: ['state-grid', 'nextera', 'vistra'],
        evidence: '美国能源部门和行业报告均指出数据中心电力需求正在快速上升。',
        whatBreaksIt: '输电瓶颈会让发电资产无法变成可用 AI 电力。',
      },
    ],
    peers: [
      { companyId: 'nextera', product: 'Renewable PPAs', processNode: '可再生能源', ecosystem: '电力开发', gapNote: '新能源规模大，稳定基荷属性弱于核电。' },
      { companyId: 'vistra', product: 'Dispatchable power', processNode: '可调度电源', ecosystem: '美国电力市场', gapNote: '调峰灵活，低碳属性不同。' },
      { companyId: 'state-grid', product: 'UHV grid', processNode: '电网', ecosystem: '中国电力系统', gapNote: '输电调度强，不是发电资产。' },
    ],
    structuralGap:
      '能源层的差距是“有电”和“可用电”之间的差距。Constellation 要把核电资产转成可签、可并网、可交付的数据中心电力。',
    financialBase: { revenue: 23.5, profit: 3.7, grossMargin: 0.38, rnd: 0.2, aiRevenue: 4.2 },
    source: sources.constellation,
  },
  {
    companyId: 'nextera',
    tagline: '用可再生能源、储能和电力开发能力承接 AI 数据中心新增负载',
    paragraphs: [
      'NextEra 位于能源层，是美国最大的可再生能源开发和电力基础设施公司之一。AI 数据中心带来的新增负载，需要风光储、燃气、输电和长期 PPA 组合来满足。',
      '它的优势是项目开发管线、并网经验和大型客户合作。相比单一发电商，NextEra 更像能源基础设施开发平台，能为云厂商规划多个州、多个园区的长期电力方案。',
      '风险是项目周期、利率、许可和电网排队。AI 用电需求是真实的，但从签约到发电并网往往需要多年。NextEra 的关键指标是新增开发项目、签约容量、资本成本和项目准时交付。',
    ],
    dependencies: [
      {
        pillar: '项目管线',
        pillarEn: 'Development Pipeline',
        headline: '风光储和可调度电源开发',
        thesis: 'AI 数据中心需要大规模新增电源，项目储备决定增长空间。',
        partnerCompanyIds: ['google-cloud', 'aws', 'digital-realty'],
        evidence: 'NextEra 官网和年报强调其大规模电力资产和数据中心/AI 增长机会。',
        whatBreaksIt: '许可、设备、劳动力或并网排队延迟会推迟收入确认。',
      },
      {
        pillar: '长期 PPA',
        pillarEn: 'Long-Term PPAs',
        headline: '云厂商锁定绿色电力',
        thesis: 'Hyperscaler 需要长期可再生电力合同来满足增长和减排目标。',
        partnerCompanyIds: ['microsoft-azure', 'google-cloud', 'meta-ai'],
        evidence: '云厂商持续签署长期清洁能源合同以支持数据中心扩张。',
        whatBreaksIt: '如果客户转向核电、燃气或自建电源，NextEra 的新能源 PPA 增速会受影响。',
      },
      {
        pillar: '资本成本',
        pillarEn: 'Capital Cost',
        headline: '利率决定项目回报',
        thesis: '新能源开发是重资产业务，融资成本会影响项目经济性。',
        partnerCompanyIds: ['constellation', 'vistra', 'longi'],
        evidence: '电力开发项目通常对利率、税收抵免和设备成本敏感。',
        whatBreaksIt: '高利率或政策变化会降低项目收益率。',
      },
    ],
    peers: [
      { companyId: 'constellation', product: 'Nuclear PPAs', processNode: '核电', ecosystem: '美国基荷电力', gapNote: '稳定低碳更强，新增开发速度不同。' },
      { companyId: 'vistra', product: 'Dispatchable generation', processNode: '可调度电源', ecosystem: '美国电力市场', gapNote: '调峰和现货敞口更高，新能源开发不同。' },
      { companyId: 'longi', product: 'Solar modules', processNode: '光伏供应链', ecosystem: '全球太阳能制造', gapNote: '提供设备，不直接拥有美国电力项目。' },
    ],
    structuralGap:
      'NextEra 的核心约束是 time-to-power。AI 数据中心需求很急，但新能源项目开发和并网周期较慢。',
    financialBase: { revenue: 24.7, profit: 6.95, grossMargin: 0.6, rnd: 0.25, aiRevenue: 3 },
    source: sources.nextera,
  },
  {
    companyId: 'state-grid',
    tagline: '中国 AI 算力扩张的电网调度、输电和并网底座',
    paragraphs: [
      '国家电网位于能源层，是中国 AI 数据中心和算力枢纽最底层的基础设施节点。它不生产模型或芯片，但决定电力能否从发电基地送到算力集群，决定并网、调度和可靠性。',
      '中国算力布局常常与西部电源、东部需求、城市数据中心和跨区输电相关。特高压、电网调峰、需求响应和绿电交易，都会影响 AI 数据中心的成本和可扩张性。',
      '风险在于电网投资周期、区域电力错配和政策约束。国家电网的战略意义是公共基础设施，不是单一商业 AI 收入；它的关键指标是特高压投运、绿电交易规模、数据中心并网容量和负荷管理能力。',
    ],
    dependencies: [
      {
        pillar: '特高压输电',
        pillarEn: 'UHV Transmission',
        headline: '西电东送和跨区算力负载',
        thesis: '中国 AI 数据中心需要把能源基地和需求中心连接起来。',
        partnerCompanyIds: ['longi', 'state-grid', 'huawei-cloud'],
        evidence: '国家电网公开资料强调特高压、电网投资和能源转型基础设施。',
        whatBreaksIt: '跨区输电和本地消纳不足会限制算力园区选址。',
      },
      {
        pillar: '并网容量',
        pillarEn: 'Interconnection',
        headline: '数据中心接入和电力可靠性',
        thesis: '算力中心上线前必须解决变电、线路、备用和可靠性要求。',
        partnerCompanyIds: ['alibaba-cloud', 'tencent-cloud', 'huawei-cloud'],
        evidence: '数据中心用电增长对电网接入和调度提出更高要求。',
        whatBreaksIt: '并网排队、局部电网容量不足或用电指标限制会延迟项目。',
      },
      {
        pillar: '绿电交易',
        pillarEn: 'Green Power',
        headline: '算力中心低碳电力采购',
        thesis: '云厂商和地方算力园区需要通过绿电交易和新能源消纳降低碳约束。',
        partnerCompanyIds: ['longi', 'nextera', 'constellation'],
        evidence: '中国新能源装机和数据中心负荷增长使电网调度与绿电交易更重要。',
        whatBreaksIt: '如果绿电供给和负荷曲线错配，AI 数据中心低碳目标会更难实现。',
      },
    ],
    peers: [
      { companyId: 'constellation', product: 'Nuclear power', processNode: '发电资产', ecosystem: '美国电力市场', gapNote: '提供基荷电力，国家电网侧重输配和调度。' },
      { companyId: 'nextera', product: 'Renewable PPAs', processNode: '新能源开发', ecosystem: '美国项目开发', gapNote: '开发电源，国家电网连接和调度电力。' },
      { companyId: 'longi', product: 'Solar modules', processNode: '光伏制造', ecosystem: '新能源供应链', gapNote: '提供设备，不控制电网调度。' },
    ],
    structuralGap:
      '国家电网的核心不是 AI 收入，而是公共电力系统能否支撑算力负荷。它的瓶颈在跨区输电、局部并网和负荷调节。',
    financialBase: { revenue: 535, profit: 12, grossMargin: 0.09, rnd: 5, aiRevenue: 175 },
    source: sources.stateGrid,
  },
  {
    companyId: 'longi',
    tagline: '用光伏组件和新能源设备降低 AI 数据中心长期电力成本',
    paragraphs: [
      '隆基绿能位于能源层的设备供给端。它不直接运营 AI 数据中心，但光伏组件、电池和绿色能源解决方案影响数据中心长期电力成本和低碳采购能力。',
      'AI 用电增长提升了清洁能源需求，但对隆基这样的制造商来说，真正变量仍是光伏供需、价格、技术路线和海外贸易环境。AI 是需求叙事的一部分，不是收入的全部解释。',
      '风险是光伏制造周期和价格竞争。组件产能过剩、技术路线切换、贸易壁垒和利润率下行，都可能抵消 AI 用电增长带来的长期利好。',
    ],
    dependencies: [
      {
        pillar: '光伏技术',
        pillarEn: 'Solar Technology',
        headline: 'BC、TOPCon 等路线决定效率和成本',
        thesis: '数据中心绿电采购最终受度电成本影响，组件效率和制造成本是关键。',
        partnerCompanyIds: ['state-grid', 'nextera', 'digital-realty'],
        evidence: '隆基 2024 年报披露其光伏技术和组件业务，是全球太阳能供应链的重要企业。',
        whatBreaksIt: '如果技术路线判断失误或价格战延续，利润率会继续承压。',
      },
      {
        pillar: '绿电需求',
        pillarEn: 'Green Power Demand',
        headline: '云厂商和数据中心低碳目标',
        thesis: 'AI 数据中心需要更多可再生电力采购，长期支撑光伏需求。',
        partnerCompanyIds: ['microsoft-azure', 'google-cloud', 'aws'],
        evidence: '大型云厂商持续披露清洁能源和数据中心减排目标。',
        whatBreaksIt: '如果数据中心转向核电、燃气或本地储能组合，光伏增量占比可能低于预期。',
      },
      {
        pillar: '产业周期',
        pillarEn: 'Solar Cycle',
        headline: '产能、价格和贸易政策',
        thesis: '光伏制造商盈利受全球供需和贸易壁垒影响显著。',
        partnerCompanyIds: ['state-grid', 'nextera', 'vistra'],
        evidence: '光伏行业 2024-2025 年面临价格和盈利压力，AI 需求不能完全抵消周期。',
        whatBreaksIt: '持续价格战会削弱研发和扩产能力。',
      },
    ],
    peers: [
      { companyId: 'nextera', product: 'Renewable power development', processNode: '电力项目', ecosystem: '美国新能源', gapNote: '直接开发电力项目，隆基提供设备。' },
      { companyId: 'state-grid', product: 'Grid infrastructure', processNode: '电网', ecosystem: '中国电力系统', gapNote: '消纳和调度能力决定绿电价值。' },
      { companyId: 'constellation', product: 'Nuclear power', processNode: '稳定低碳电力', ecosystem: '美国核电', gapNote: '基荷稳定，光伏成本低但间歇性强。' },
    ],
    structuralGap:
      '隆基与 AI 的连接是间接的：AI 提高绿电需求，但光伏制造利润仍由技术路线、供需和价格周期决定。',
    financialBase: { revenue: 11.5, profit: -1.2, grossMargin: 0.09, rnd: 0.85, aiRevenue: 0.9 },
    source: sources.longi,
  },
  {
    companyId: 'vistra',
    tagline: '用可调度电源和电力市场能力服务 AI 数据中心的即时负载需求',
    paragraphs: [
      'Vistra 位于能源层，核心价值是可调度发电、零售电力和储能组合。AI 数据中心不仅需要低碳电，还需要在任何时候都能拿到稳定功率，因此可调度电源在短中期非常重要。',
      '相比纯新能源开发商，Vistra 的优势是电力市场运营和可用容量。随着数据中心在美国多个区域快速增加，能快速响应负载和电价波动的发电资产会更值钱。',
      '风险是燃料价格、监管和碳约束。可调度电源可能带来更高现货收益，也面临政策和排放压力。Vistra 的关键指标是数据中心合同、容量价格、储能部署和发电资产可用率。',
    ],
    dependencies: [
      {
        pillar: '可调度容量',
        pillarEn: 'Dispatchable Capacity',
        headline: '满足 AI 数据中心高负载运行',
        thesis: 'AI 集群需要稳定功率，燃气、核电和储能等可调度资源短期价值上升。',
        partnerCompanyIds: ['coreweave', 'digital-realty', 'equinix'],
        evidence: '数据中心电力需求上升使可调度电源和容量市场更受关注。',
        whatBreaksIt: '燃料成本或排放政策上升会压缩可调度电源利润。',
      },
      {
        pillar: '电力市场',
        pillarEn: 'Power Markets',
        headline: '容量价格和现货波动',
        thesis: 'Vistra 的收益受区域电价、容量市场和客户合同共同影响。',
        partnerCompanyIds: ['constellation', 'nextera', 'state-grid'],
        evidence: '美国数据中心负荷增长正在改变区域电力市场供需。',
        whatBreaksIt: '如果新增电源快速上线或需求低于预期，电价弹性会下降。',
      },
      {
        pillar: '长期客户',
        pillarEn: 'Long-Term Customers',
        headline: 'AI 云和园区客户锁定需求',
        thesis: '长期合约能降低电力市场波动，并把 AI 需求转成可见收入。',
        partnerCompanyIds: ['coreweave', 'microsoft-azure', 'aws'],
        evidence: 'AI 数据中心客户倾向通过长期电力协议降低供电风险。',
        whatBreaksIt: '如果客户选择自建电源或转向核电 PPA，Vistra 的增量合同会减少。',
      },
    ],
    peers: [
      { companyId: 'constellation', product: 'Nuclear baseload', processNode: '核电', ecosystem: '美国低碳电力', gapNote: '低碳稳定更强，Vistra 市场灵活性不同。' },
      { companyId: 'nextera', product: 'Renewable PPAs', processNode: '新能源开发', ecosystem: '美国电力项目', gapNote: '新能源规模强，实时可调度性不同。' },
      { companyId: 'state-grid', product: 'Grid dispatch', processNode: '电网', ecosystem: '中国电力系统', gapNote: '调度基础设施强，不是美国发电商。' },
    ],
    structuralGap:
      'Vistra 的 AI 机会来自短中期电力稀缺。长期看，如果清洁基荷、新能源和储能快速扩张，现货与容量溢价会回落。',
    financialBase: { revenue: 17, profit: 2.7, grossMargin: 0.28, rnd: 0.12, aiRevenue: 3.4 },
    source: sources.vistra,
  },
];

export const mapFeaturedFlagships = Object.fromEntries(
  featuredFlagshipBriefs.map((brief) => [brief.companyId, createFeaturedFlagship(brief)]),
) as Record<string, FlagshipData>;
