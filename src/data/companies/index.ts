/**
 * STATIC ESTIMATE DATA
 * Approximate, source-informed company metrics.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-16
 */
import type { Company, CompanyMetricSource, CompanyMetricSources, CompanyType } from '../../types/company';
import type { Region } from '../../types/common';
import { getLayerById } from '../layers';
import { displayTerm, displayTerms } from '../../lib/labels';
import { sourceTerminalCompanySeeds } from '../source-terminal/catalog';

const lastUpdated = '2026-05-16';

type CompanySeed = {
  id: string;
  en: string;
  zh: string;
  layerIds: string[];
  country: string;
  region: Region;
  type: CompanyType;
  ticker?: string;
  exchange?: string;
  founded: Company['basicInfo']['founded'];
  headquarters: string;
  ceo?: string;
  parentCompanyId?: string;
  coreProducts: string[];
  aiRevenueShare?: number;
  strategicPosition?: Company['aiBusiness']['strategicPosition'];
  moats?: Company['aiBusiness']['moats'];
  risks?: Company['aiBusiness']['risks'];
  futureOpportunities?: string[];
};

type CompanyPublicMetrics = NonNullable<Company['publicMetrics']>;

type StaticMetricEstimate = {
  marketCap?: number | 'N/A';
  pe?: number | 'N/A';
  revenue?: number | 'N/A';
  profit?: number | 'N/A';
  grossMargin?: number | 'N/A';
  currency?: CompanyPublicMetrics['currency'];
  valuation?: number | 'Not disclosed';
  fundingAmount?: number;
  aiRevenueShare?: number;
  sourceAsOf: string;
  sourceNote?: string;
};

const seeds: CompanySeed[] = [
  { id: 'constellation', en: 'Constellation Energy', zh: '星座能源', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'CEG', exchange: 'NASDAQ', founded: 1999, headquarters: 'Baltimore, US', coreProducts: ['Nuclear power', 'Power purchase agreements', 'Clean firm power'] },
  { id: 'nextera', en: 'NextEra Energy', zh: '新纪元能源', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'NEE', exchange: 'NYSE', founded: 1984, headquarters: 'Juno Beach, US', coreProducts: ['Renewable power', 'Grid storage'] },
  { id: 'state-grid', en: 'State Grid', zh: '国家电网', layerIds: ['energy'], country: 'CN', region: 'china', type: 'state-owned', founded: 2002, headquarters: 'Beijing, China', coreProducts: ['Grid infrastructure', 'UHV transmission'] },
  { id: 'longi', en: 'LONGi Green Energy', zh: '隆基绿能', layerIds: ['energy'], country: 'CN', region: 'china', type: 'public', ticker: '601012', exchange: 'SSE', founded: 2000, headquarters: 'Xi’an, China', coreProducts: ['Solar modules', 'Renewable power equipment'] },
  { id: 'vistra', en: 'Vistra', zh: '维斯特拉', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'VST', exchange: 'NYSE', founded: 2016, headquarters: 'Irving, US', coreProducts: ['Power generation', 'Retail energy'] },

  { id: 'equinix', en: 'Equinix', zh: '易昆尼克斯', layerIds: ['data-center'], country: 'US', region: 'us', type: 'public', ticker: 'EQIX', exchange: 'NASDAQ', founded: 1998, headquarters: 'Redwood City, US', coreProducts: ['Colocation', 'Interconnection'] },
  { id: 'digital-realty', en: 'Digital Realty', zh: '数字地产', layerIds: ['data-center'], country: 'US', region: 'us', type: 'public', ticker: 'DLR', exchange: 'NYSE', founded: 2004, headquarters: 'Austin, US', coreProducts: ['Hyperscale data centers', 'Colocation'] },
  { id: 'gds', en: 'GDS Holdings', zh: '万国数据', layerIds: ['data-center'], country: 'CN', region: 'china', type: 'public', ticker: 'GDS', exchange: 'NASDAQ', founded: 2001, headquarters: 'Shanghai, China', coreProducts: ['China data centers', 'Managed hosting'] },
  { id: 'chindata', en: 'Chindata Group', zh: '秦淮数据', layerIds: ['data-center'], country: 'CN', region: 'china', type: 'private', founded: 2015, headquarters: 'Beijing, China', coreProducts: ['Hyperscale data centers', 'Renewable energy campuses'] },
  { id: 'oracle-dc', en: 'Oracle Cloud Infrastructure DC', zh: 'Oracle 云数据中心', layerIds: ['data-center'], country: 'US', region: 'us', type: 'subsidiary', founded: 2016, headquarters: 'Austin, US', parentCompanyId: 'oracle-cloud', coreProducts: ['Cloud regions', 'AI compute campuses'] },

  { id: 'asml', en: 'ASML', zh: '阿斯麦', layerIds: ['semiconductor-equipment'], country: 'NL', region: 'eu', type: 'public', ticker: 'ASML', exchange: 'NASDAQ', founded: 1984, headquarters: 'Veldhoven, Netherlands', coreProducts: ['EUV lithography', 'DUV lithography'] },
  { id: 'applied-materials', en: 'Applied Materials', zh: '应用材料', layerIds: ['semiconductor-equipment'], country: 'US', region: 'us', type: 'public', ticker: 'AMAT', exchange: 'NASDAQ', founded: 1967, headquarters: 'Santa Clara, US', coreProducts: ['Deposition', 'Materials engineering'] },
  { id: 'lam-research', en: 'Lam Research', zh: '泛林集团', layerIds: ['semiconductor-equipment'], country: 'US', region: 'us', type: 'public', ticker: 'LRCX', exchange: 'NASDAQ', founded: 1980, headquarters: 'Fremont, US', coreProducts: ['Etch', 'Deposition'] },
  { id: 'tokyo-electron', en: 'Tokyo Electron', zh: '东京电子', layerIds: ['semiconductor-equipment'], country: 'JP', region: 'asia', type: 'public', ticker: '8035', exchange: 'TSE', founded: 1963, headquarters: 'Tokyo, Japan', coreProducts: ['Coater developer', 'Etch systems'] },
  { id: 'naura', en: 'NAURA Technology', zh: '北方华创', layerIds: ['semiconductor-equipment'], country: 'CN', region: 'china', type: 'public', ticker: '002371', exchange: 'SZSE', founded: 2001, headquarters: 'Beijing, China', coreProducts: ['Etch equipment', 'Deposition tools'] },

  { id: 'shin-etsu', en: 'Shin-Etsu Chemical', zh: '信越化学', layerIds: ['semiconductor-materials'], country: 'JP', region: 'asia', type: 'public', ticker: '4063', exchange: 'TSE', founded: 1926, headquarters: 'Tokyo, Japan', coreProducts: ['Silicon wafers', 'Specialty chemicals'] },
  { id: 'sumco', en: 'SUMCO', zh: 'SUMCO', layerIds: ['semiconductor-materials'], country: 'JP', region: 'asia', type: 'public', ticker: '3436', exchange: 'TSE', founded: 1999, headquarters: 'Tokyo, Japan', coreProducts: ['Silicon wafers', 'Epitaxial wafers'] },
  { id: 'entegris', en: 'Entegris', zh: 'Entegris', layerIds: ['semiconductor-materials'], country: 'US', region: 'us', type: 'public', ticker: 'ENTG', exchange: 'NASDAQ', founded: 1966, headquarters: 'Billerica, US', coreProducts: ['Filtration', 'Specialty materials'] },
  { id: 'wacker', en: 'Wacker Chemie', zh: '瓦克化学', layerIds: ['semiconductor-materials'], country: 'DE', region: 'eu', type: 'public', ticker: 'WCH', exchange: 'FWB', founded: 1914, headquarters: 'Munich, Germany', coreProducts: ['Polysilicon', 'Silicones'] },
  { id: 'anji-micro', en: 'Anji Microelectronics', zh: '安集科技', layerIds: ['semiconductor-materials'], country: 'CN', region: 'china', type: 'public', ticker: '688019', exchange: 'SSE STAR', founded: 2004, headquarters: 'Shanghai, China', coreProducts: ['CMP slurry', 'Wet chemicals'] },

  { id: 'synopsys', en: 'Synopsys', zh: '新思科技', layerIds: ['eda-ip'], country: 'US', region: 'us', type: 'public', ticker: 'SNPS', exchange: 'NASDAQ', founded: 1986, headquarters: 'Sunnyvale, US', coreProducts: ['EDA software', 'IP'] },
  { id: 'cadence', en: 'Cadence', zh: '铿腾电子', layerIds: ['eda-ip'], country: 'US', region: 'us', type: 'public', ticker: 'CDNS', exchange: 'NASDAQ', founded: 1988, headquarters: 'San Jose, US', coreProducts: ['EDA software', 'Verification'] },
  { id: 'siemens-eda', en: 'Siemens EDA', zh: '西门子 EDA', layerIds: ['eda-ip'], country: 'DE', region: 'eu', type: 'subsidiary', founded: 1981, headquarters: 'Plano, US', coreProducts: ['EDA', 'Electronic systems design'] },
  { id: 'arm', en: 'Arm', zh: 'Arm', layerIds: ['eda-ip'], country: 'GB', region: 'eu', type: 'public', ticker: 'ARM', exchange: 'NASDAQ', founded: 1990, headquarters: 'Cambridge, UK', coreProducts: ['CPU IP', 'Neoverse'] },
  { id: 'empyrean', en: 'Empyrean Technology', zh: '华大九天', layerIds: ['eda-ip'], country: 'CN', region: 'china', type: 'public', ticker: '301269', exchange: 'SZSE', founded: 2009, headquarters: 'Beijing, China', coreProducts: ['EDA tools', 'Analog design'] },

  { id: 'nvidia', en: 'NVIDIA', zh: '英伟达', layerIds: ['chip-design'], country: 'US', region: 'us', type: 'public', ticker: 'NVDA', exchange: 'NASDAQ', founded: 1993, headquarters: 'Santa Clara, US', ceo: 'Jensen Huang', coreProducts: ['GPU', 'CUDA', 'Blackwell/Rubin AI accelerators', 'Data center platform', 'NVLink networking'] },
  { id: 'amd', en: 'AMD', zh: '超威半导体', layerIds: ['chip-design'], country: 'US', region: 'us', type: 'public', ticker: 'AMD', exchange: 'NASDAQ', founded: 1969, headquarters: 'Santa Clara, US', coreProducts: ['GPU', 'CPU', 'AI accelerator'] },
  { id: 'broadcom', en: 'Broadcom', zh: '博通', layerIds: ['chip-design', 'servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'AVGO', exchange: 'NASDAQ', founded: 1961, headquarters: 'Palo Alto, US', coreProducts: ['Networking ASIC', 'Custom AI ASIC'] },
  { id: 'qualcomm', en: 'Qualcomm', zh: '高通', layerIds: ['chip-design'], country: 'US', region: 'us', type: 'public', ticker: 'QCOM', exchange: 'NASDAQ', founded: 1985, headquarters: 'San Diego, US', coreProducts: ['Mobile AI SoC', 'Edge AI'] },
  { id: 'marvell', en: 'Marvell', zh: '美满电子', layerIds: ['chip-design', 'servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'MRVL', exchange: 'NASDAQ', founded: 1995, headquarters: 'Santa Clara, US', coreProducts: ['Data center silicon', 'DSP'] },
  { id: 'huawei-hisilicon', en: 'Huawei HiSilicon', zh: '华为海思', layerIds: ['chip-design'], country: 'CN', region: 'china', type: 'subsidiary', founded: 2004, headquarters: 'Shenzhen, China', parentCompanyId: 'huawei', coreProducts: ['AI accelerator', 'SoC'] },
  { id: 'cambricon', en: 'Cambricon', zh: '寒武纪', layerIds: ['chip-design'], country: 'CN', region: 'china', type: 'public', ticker: '688256', exchange: 'SSE STAR', founded: 2016, headquarters: 'Beijing, China', coreProducts: ['AI accelerator', 'Inference chip'] },
  { id: 'moore-threads', en: 'Moore Threads', zh: '摩尔线程', layerIds: ['chip-design'], country: 'CN', region: 'china', type: 'private', founded: 2020, headquarters: 'Beijing, China', coreProducts: ['GPU', 'KUAE cluster', 'MUSA software'] },

  { id: 'tsmc', en: 'TSMC', zh: '台积电', layerIds: ['wafer-manufacturing', 'advanced-packaging'], country: 'TW', region: 'asia', type: 'public', ticker: 'TSM', exchange: 'NYSE', founded: 1987, headquarters: 'Hsinchu, Taiwan', coreProducts: ['Foundry', 'Advanced nodes', 'CoWoS'] },
  { id: 'samsung-foundry', en: 'Samsung Foundry', zh: '三星晶圆代工', layerIds: ['wafer-manufacturing'], country: 'KR', region: 'asia', type: 'subsidiary', founded: 2005, headquarters: 'Hwaseong, Korea', coreProducts: ['Foundry', 'GAA process'] },
  { id: 'intel-foundry', en: 'Intel Foundry', zh: '英特尔代工', layerIds: ['wafer-manufacturing'], country: 'US', region: 'us', type: 'subsidiary', founded: 2021, headquarters: 'Santa Clara, US', coreProducts: ['Foundry', 'Advanced packaging'] },
  { id: 'smic', en: 'SMIC', zh: '中芯国际', layerIds: ['wafer-manufacturing'], country: 'CN', region: 'china', type: 'public', ticker: '0981', exchange: 'HKEX', founded: 2000, headquarters: 'Shanghai, China', coreProducts: ['Foundry', 'Mature nodes'] },
  { id: 'globalfoundries', en: 'GlobalFoundries', zh: '格芯', layerIds: ['wafer-manufacturing'], country: 'US', region: 'us', type: 'public', ticker: 'GFS', exchange: 'NASDAQ', founded: 2009, headquarters: 'Malta, US', coreProducts: ['Specialty foundry', 'RF process'] },

  { id: 'ase', en: 'ASE Technology', zh: '日月光', layerIds: ['advanced-packaging'], country: 'TW', region: 'asia', type: 'public', ticker: 'ASX', exchange: 'NYSE', founded: 1984, headquarters: 'Kaohsiung, Taiwan', coreProducts: ['Packaging', 'Testing'] },
  { id: 'amkor', en: 'Amkor', zh: '安靠', layerIds: ['advanced-packaging'], country: 'US', region: 'us', type: 'public', ticker: 'AMKR', exchange: 'NASDAQ', founded: 1968, headquarters: 'Tempe, US', coreProducts: ['Advanced packaging', 'Test services'] },
  { id: 'jcet', en: 'JCET', zh: '长电科技', layerIds: ['advanced-packaging'], country: 'CN', region: 'china', type: 'public', ticker: '600584', exchange: 'SSE', founded: 1972, headquarters: 'Jiangyin, China', coreProducts: ['Advanced packaging', 'Testing'] },
  { id: 'tongfu', en: 'Tongfu Microelectronics', zh: '通富微电', layerIds: ['advanced-packaging'], country: 'CN', region: 'china', type: 'public', ticker: '002156', exchange: 'SZSE', founded: 1997, headquarters: 'Nantong, China', coreProducts: ['Packaging', 'Chiplet assembly'] },
  { id: 'ibiden', en: 'Ibiden', zh: '揖斐电', layerIds: ['advanced-packaging'], country: 'JP', region: 'asia', type: 'public', ticker: '4062', exchange: 'TSE', founded: 1912, headquarters: 'Ogaki, Japan', coreProducts: ['IC substrates', 'Packaging materials'] },

  { id: 'sk-hynix', en: 'SK Hynix', zh: 'SK 海力士', layerIds: ['hbm-memory'], country: 'KR', region: 'asia', type: 'public', ticker: '000660', exchange: 'KRX', founded: 1983, headquarters: 'Icheon, Korea', coreProducts: ['HBM', 'DRAM', 'NAND'] },
  { id: 'samsung-memory', en: 'Samsung Memory', zh: '三星存储', layerIds: ['hbm-memory'], country: 'KR', region: 'asia', type: 'subsidiary', founded: 1974, headquarters: 'Suwon, Korea', coreProducts: ['DRAM', 'HBM', 'NAND'] },
  { id: 'micron', en: 'Micron', zh: '美光', layerIds: ['hbm-memory'], country: 'US', region: 'us', type: 'public', ticker: 'MU', exchange: 'NASDAQ', founded: 1978, headquarters: 'Boise, US', coreProducts: ['DRAM', 'HBM', 'NAND'] },
  { id: 'cxmt', en: 'CXMT', zh: '长鑫存储', layerIds: ['hbm-memory'], country: 'CN', region: 'china', type: 'private', founded: 2016, headquarters: 'Hefei, China', coreProducts: ['DRAM', 'Memory manufacturing'] },
  { id: 'ymtc', en: 'YMTC', zh: '长江存储', layerIds: ['hbm-memory'], country: 'CN', region: 'china', type: 'private', founded: 2016, headquarters: 'Wuhan, China', coreProducts: ['NAND', 'Storage'] },

  { id: 'supermicro', en: 'Supermicro', zh: 'Supermicro', layerIds: ['servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'SMCI', exchange: 'NASDAQ', founded: 1993, headquarters: 'San Jose, US', coreProducts: ['AI servers', 'Rack systems'] },
  { id: 'dell', en: 'Dell Technologies', zh: '戴尔科技', layerIds: ['servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'DELL', exchange: 'NYSE', founded: 1984, headquarters: 'Round Rock, US', coreProducts: ['AI servers', 'Enterprise infrastructure'] },
  { id: 'hpe', en: 'HPE', zh: '慧与', layerIds: ['servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'HPE', exchange: 'NYSE', founded: 2015, headquarters: 'Spring, US', coreProducts: ['HPC', 'AI systems'] },
  { id: 'arista', en: 'Arista Networks', zh: 'Arista Networks', layerIds: ['servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'ANET', exchange: 'NYSE', founded: 2004, headquarters: 'Santa Clara, US', coreProducts: ['Ethernet switches', 'Cloud networking'] },
  { id: 'innolight', en: 'Innolight', zh: '中际旭创', layerIds: ['servers-networking'], country: 'CN', region: 'china', type: 'public', ticker: '300308', exchange: 'SZSE', founded: 2008, headquarters: 'Suzhou, China', coreProducts: ['Optical modules', 'Data center interconnect'] },
  { id: 'industrial-fulian', en: 'Fii', zh: '工业富联', layerIds: ['servers-networking'], country: 'CN', region: 'china', type: 'public', ticker: '601138', exchange: 'SSE', founded: 2015, headquarters: 'Shenzhen, China', coreProducts: ['AI server assembly', 'Cloud infrastructure manufacturing'] },

  { id: 'aws', en: 'AWS', zh: '亚马逊云科技', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'subsidiary', founded: 2006, headquarters: 'Seattle, US', parentCompanyId: 'amazon', coreProducts: ['GPU cloud', 'Bedrock', 'SageMaker'] },
  { id: 'microsoft-azure', en: 'Microsoft Azure', zh: 'Microsoft Azure', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'MSFT', exchange: 'NASDAQ', founded: 2010, headquarters: 'Redmond, US', parentCompanyId: 'microsoft', coreProducts: ['Azure AI', 'GPU cloud', 'OpenAI infrastructure'] },
  { id: 'google-cloud', en: 'Google Cloud', zh: 'Google Cloud', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'GOOGL', exchange: 'NASDAQ', founded: 2008, headquarters: 'Mountain View, US', parentCompanyId: 'alphabet', coreProducts: ['TPU cloud', 'Vertex AI'] },
  { id: 'alibaba-cloud', en: 'Alibaba Cloud', zh: '阿里云', layerIds: ['cloud-platform'], country: 'CN', region: 'china', type: 'subsidiary', ticker: 'BABA', exchange: 'NYSE', founded: 2009, headquarters: 'Hangzhou, China', parentCompanyId: 'alibaba', coreProducts: ['GPU cloud', 'Tongyi platform'] },
  { id: 'tencent-cloud', en: 'Tencent Cloud', zh: '腾讯云', layerIds: ['cloud-platform'], country: 'CN', region: 'china', type: 'subsidiary', ticker: '0700', exchange: 'HKEX', founded: 2013, headquarters: 'Shenzhen, China', parentCompanyId: 'tencent', coreProducts: ['Cloud AI', 'Model serving'] },
  { id: 'oracle-cloud', en: 'Oracle Cloud', zh: 'Oracle Cloud', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'public', ticker: 'ORCL', exchange: 'NYSE', founded: 1977, headquarters: 'Austin, US', coreProducts: ['OCI', 'AI clusters'] },

  { id: 'openai', en: 'OpenAI', zh: 'OpenAI', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'private', founded: 2015, headquarters: 'San Francisco, US', coreProducts: ['GPT-5 / GPT-5.5', 'ChatGPT', 'Sora 视频', 'Operator agent', 'API platform'] },
  { id: 'anthropic', en: 'Anthropic', zh: 'Anthropic', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'private', founded: 2021, headquarters: 'San Francisco, US', coreProducts: ['Claude 4 Opus/Sonnet/Haiku', 'Computer use', 'AI safety research'] },
  { id: 'google-deepmind', en: 'Google DeepMind', zh: 'Google DeepMind', layerIds: ['foundation-models'], country: 'GB', region: 'eu', type: 'subsidiary', founded: 2010, headquarters: 'London, UK', parentCompanyId: 'alphabet', coreProducts: ['Gemini 2.5 / 3 Pro', 'AlphaFold', 'Veo video', 'AI research'] },
  { id: 'meta-ai', en: 'Meta AI', zh: 'Meta AI', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'META', exchange: 'NASDAQ', founded: 2013, headquarters: 'Menlo Park, US', parentCompanyId: 'meta', coreProducts: ['Llama 4', 'Meta AI assistant', 'AI Studio', 'Open-weight models'] },
  { id: 'mistral', en: 'Mistral AI', zh: 'Mistral AI', layerIds: ['foundation-models'], country: 'FR', region: 'eu', type: 'private', founded: 2023, headquarters: 'Paris, France', coreProducts: ['Mistral Large 3', 'Mixtral 系列', 'Le Chat', '开源权重模型'] },
  { id: 'baidu-ernie', en: 'Baidu ERNIE', zh: '百度文心', layerIds: ['foundation-models'], country: 'CN', region: 'china', type: 'subsidiary', ticker: 'BIDU', exchange: 'NASDAQ', founded: 2019, headquarters: 'Beijing, China', parentCompanyId: 'baidu', coreProducts: ['ERNIE 5', 'Qianfan 平台', '文心一格'] },
  { id: 'moonshot-ai', en: 'Moonshot AI', zh: '月之暗面', layerIds: ['foundation-models'], country: 'CN', region: 'china', type: 'private', founded: 2023, headquarters: 'Beijing, China', coreProducts: ['Kimi K2', '长上下文模型', 'Kimi 智能体'] },

  { id: 'langchain', en: 'LangChain', zh: 'LangChain', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2022, headquarters: 'San Francisco, US', coreProducts: ['Agent framework', 'LangSmith'] },
  { id: 'databricks', en: 'Databricks', zh: 'Databricks', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2013, headquarters: 'San Francisco, US', coreProducts: ['Lakehouse', 'Mosaic AI'] },
  { id: 'snowflake', en: 'Snowflake', zh: 'Snowflake', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'public', ticker: 'SNOW', exchange: 'NYSE', founded: 2012, headquarters: 'Bozeman, US', coreProducts: ['Data cloud', 'Cortex AI'] },
  { id: 'scale-ai', en: 'Scale AI', zh: 'Scale AI', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2016, headquarters: 'San Francisco, US', coreProducts: ['Data labeling', 'RLHF data'] },
  { id: 'hugging-face', en: 'Hugging Face', zh: 'Hugging Face', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2016, headquarters: 'New York, US', coreProducts: ['Model hub', 'Inference endpoints'] },
  { id: 'zhipu-ai', en: 'Zhipu AI', zh: '智谱 AI', layerIds: ['ai-infra-agent-framework', 'foundation-models'], country: 'CN', region: 'china', type: 'private', founded: 2019, headquarters: 'Beijing, China', coreProducts: ['GLM-4.5', '智谱清言', 'Agent 平台'] },

  { id: 'microsoft-copilot', en: 'Microsoft Copilot', zh: 'Microsoft Copilot', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'MSFT', exchange: 'NASDAQ', founded: 2023, headquarters: 'Redmond, US', parentCompanyId: 'microsoft', coreProducts: ['Microsoft 365 Copilot', 'GitHub Copilot', 'Copilot Studio', 'Windows Copilot'] },
  { id: 'salesforce-einstein', en: 'Salesforce Einstein', zh: 'Salesforce Einstein', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'CRM', exchange: 'NYSE', founded: 2016, headquarters: 'San Francisco, US', parentCompanyId: 'salesforce', coreProducts: ['CRM AI', 'Agentforce'] },
  { id: 'adobe-firefly', en: 'Adobe Firefly', zh: 'Adobe Firefly', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'ADBE', exchange: 'NASDAQ', founded: 2023, headquarters: 'San Jose, US', parentCompanyId: 'adobe', coreProducts: ['Generative media', 'Creative AI'] },
  { id: 'servicenow-ai', en: 'ServiceNow AI', zh: 'ServiceNow AI', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'public', ticker: 'NOW', exchange: 'NYSE', founded: 2004, headquarters: 'Santa Clara, US', coreProducts: ['Workflow AI', 'Enterprise agents'] },
  { id: 'kingsoft-office', en: 'Kingsoft Office', zh: '金山办公', layerIds: ['ai-applications'], country: 'CN', region: 'china', type: 'public', ticker: '688111', exchange: 'SSE STAR', founded: 1988, headquarters: 'Beijing, China', coreProducts: ['WPS AI', 'Office productivity'] },

  { id: 'tesla', en: 'Tesla', zh: '特斯拉', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'public', ticker: 'TSLA', exchange: 'NASDAQ', founded: 2003, headquarters: 'Austin, US', coreProducts: ['FSD', 'Dojo', 'Humanoid robotics'] },
  { id: 'waymo', en: 'Waymo', zh: 'Waymo', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'subsidiary', founded: 2009, headquarters: 'Mountain View, US', parentCompanyId: 'alphabet', coreProducts: ['Waymo One robotaxi', '多城商业化运营', '驾驶基础模型'] },
  { id: 'boston-dynamics', en: 'Boston Dynamics', zh: '波士顿动力', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'subsidiary', founded: 1992, headquarters: 'Waltham, US', parentCompanyId: 'hyundai', coreProducts: ['Robotics', 'Humanoid systems'] },
  { id: 'unitree', en: 'Unitree Robotics', zh: '宇树科技', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'private', founded: 2016, headquarters: 'Hangzhou, China', coreProducts: ['Quadruped robots', 'Humanoid robots'] },
  { id: 'xpeng', en: 'XPeng', zh: '小鹏汽车', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'public', ticker: 'XPEV', exchange: 'NYSE', founded: 2014, headquarters: 'Guangzhou, China', coreProducts: ['XOS 智能驾驶', 'Iron 人形机器人', 'AI 天玑平台', 'EV 平台'] },
  { id: 'ubtech', en: 'UBTECH Robotics', zh: '优必选', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'public', ticker: '9880', exchange: 'HKEX', founded: 2012, headquarters: 'Shenzhen, China', coreProducts: ['Humanoid robots', 'Service robots'] },
];

const staticMetricsByCompanyId: Record<string, StaticMetricEstimate> = {
  constellation: { marketCap: 75_000_000_000, pe: 21, revenue: 23_500_000_000, profit: 3_700_000_000, grossMargin: 0.38, aiRevenueShare: 0.18, sourceAsOf: 'FY2024' },
  nextera: { marketCap: 145_000_000_000, pe: 22, revenue: 24_700_000_000, profit: 6_950_000_000, grossMargin: 0.6, aiRevenueShare: 0.12, sourceAsOf: 'FY2024' },
  'state-grid': { marketCap: 'N/A', pe: 'N/A', revenue: 3_850_000_000_000, profit: 85_000_000_000, grossMargin: 0.09, currency: 'CNY', valuation: 4_500_000_000_000, aiRevenueShare: 0.33, sourceAsOf: 'FY2024 公开年报', sourceNote: '非上市估算' },
  longi: { marketCap: 110_000_000_000, pe: 'N/A', revenue: 82_600_000_000, profit: -8_600_000_000, grossMargin: 0.09, currency: 'CNY', aiRevenueShare: 0.08, sourceAsOf: 'FY2024' },
  vistra: { marketCap: 50_000_000_000, pe: 18, revenue: 17_000_000_000, profit: 2_700_000_000, grossMargin: 0.28, aiRevenueShare: 0.2, sourceAsOf: 'FY2024' },
  equinix: { marketCap: 80_000_000_000, pe: 90, revenue: 8_750_000_000, profit: 815_000_000, grossMargin: 0.47, aiRevenueShare: 0.25, sourceAsOf: 'FY2024' },
  'digital-realty': { marketCap: 52_000_000_000, pe: 85, revenue: 5_550_000_000, profit: 600_000_000, grossMargin: 0.53, aiRevenueShare: 0.28, sourceAsOf: 'FY2024' },
  gds: { marketCap: 5_000_000_000, pe: 'N/A', revenue: 1_550_000_000, profit: -170_000_000, grossMargin: 0.23, aiRevenueShare: 0.36, sourceAsOf: 'FY2024' },
  chindata: { marketCap: 'N/A', pe: 'N/A', revenue: 1_150_000_000, profit: 80_000_000, grossMargin: 0.28, valuation: 3_200_000_000, aiRevenueShare: 0.35, sourceAsOf: '2023 Bain take-private', sourceNote: '非上市估算' },
  'oracle-dc': { marketCap: 'N/A', pe: 'N/A', revenue: 14_000_000_000, profit: 4_500_000_000, grossMargin: 0.38, valuation: 90_000_000_000, aiRevenueShare: 0.48, sourceAsOf: 'FY2025 OCI 分部估算', sourceNote: '分部估算' },
  asml: { marketCap: 280_000_000_000, pe: 36, revenue: 28_260_000_000, profit: 7_570_000_000, grossMargin: 0.51, currency: 'EUR', aiRevenueShare: 0.62, sourceAsOf: 'FY2024' },
  'applied-materials': { marketCap: 155_000_000_000, pe: 22, revenue: 27_200_000_000, profit: 7_180_000_000, grossMargin: 0.475, aiRevenueShare: 0.45, sourceAsOf: 'FY2024 (10 月)' },
  'lam-research': { marketCap: 115_000_000_000, pe: 27, revenue: 14_900_000_000, profit: 3_830_000_000, grossMargin: 0.47, aiRevenueShare: 0.43, sourceAsOf: 'FY2024 (6 月)' },
  'tokyo-electron': { marketCap: 85_000_000_000, pe: 24, revenue: 16_000_000_000, profit: 3_500_000_000, grossMargin: 0.45, aiRevenueShare: 0.42, sourceAsOf: 'FY2025 (3 月)' },
  naura: { marketCap: 220_000_000_000, pe: 39, revenue: 29_800_000_000, profit: 5_620_000_000, grossMargin: 0.42, currency: 'CNY', aiRevenueShare: 0.42, sourceAsOf: 'FY2024' },
  'shin-etsu': { marketCap: 75_000_000_000, pe: 19, revenue: 17_000_000_000, profit: 4_000_000_000, grossMargin: 0.36, aiRevenueShare: 0.25, sourceAsOf: 'FY2025 (3 月)' },
  sumco: { marketCap: 3_500_000_000, pe: 18, revenue: 2_500_000_000, profit: 200_000_000, grossMargin: 0.24, aiRevenueShare: 0.2, sourceAsOf: 'FY2024' },
  entegris: { marketCap: 14_000_000_000, pe: 38, revenue: 3_240_000_000, profit: 359_000_000, grossMargin: 0.42, aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  wacker: { marketCap: 4_000_000_000, pe: 14, revenue: 5_700_000_000, profit: 280_000_000, grossMargin: 0.17, currency: 'EUR', aiRevenueShare: 0.1, sourceAsOf: 'FY2024' },
  'anji-micro': { marketCap: 28_000_000_000, pe: 65, revenue: 1_780_000_000, profit: 420_000_000, grossMargin: 0.55, currency: 'CNY', aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  synopsys: { marketCap: 80_000_000_000, pe: 35, revenue: 6_650_000_000, profit: 2_260_000_000, grossMargin: 0.81, aiRevenueShare: 0.5, sourceAsOf: 'FY2025 (10 月)' },
  cadence: { marketCap: 80_000_000_000, pe: 60, revenue: 5_000_000_000, profit: 1_400_000_000, grossMargin: 0.89, aiRevenueShare: 0.5, sourceAsOf: 'FY2025' },
  'siemens-eda': { marketCap: 'N/A', pe: 'N/A', revenue: 2_500_000_000, profit: 500_000_000, grossMargin: 0.75, valuation: 20_000_000_000, aiRevenueShare: 0.4, sourceAsOf: 'FY2024 分部估算', sourceNote: '分部估算' },
  arm: { marketCap: 140_000_000_000, pe: 175, revenue: 4_000_000_000, profit: 792_000_000, grossMargin: 0.96, aiRevenueShare: 0.45, sourceAsOf: 'FY2025 (3 月)' },
  empyrean: { marketCap: 35_000_000_000, pe: 280, revenue: 1_200_000_000, profit: 130_000_000, grossMargin: 0.89, currency: 'CNY', aiRevenueShare: 0.4, sourceAsOf: 'FY2024' },
  nvidia: { marketCap: 3_200_000_000_000, pe: 44, revenue: 130_500_000_000, profit: 72_900_000_000, grossMargin: 0.75, aiRevenueShare: 0.88, sourceAsOf: 'FY2025 财报 · MC @ 2026-01' },
  amd: { marketCap: 200_000_000_000, pe: 50, revenue: 25_800_000_000, profit: 1_640_000_000, grossMargin: 0.49, aiRevenueShare: 0.45, sourceAsOf: 'FY2024' },
  broadcom: { marketCap: 1_100_000_000_000, pe: 80, revenue: 51_600_000_000, profit: 14_000_000_000, grossMargin: 0.7, aiRevenueShare: 0.5, sourceAsOf: 'FY2024 (10 月)' },
  qualcomm: { marketCap: 175_000_000_000, pe: 17, revenue: 39_000_000_000, profit: 10_140_000_000, grossMargin: 0.56, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 (9 月)' },
  marvell: { marketCap: 65_000_000_000, pe: 'N/A', revenue: 5_500_000_000, profit: -900_000_000, grossMargin: 0.45, aiRevenueShare: 0.5, sourceAsOf: 'FY2025 (1 月)' },
  'huawei-hisilicon': { marketCap: 'N/A', pe: 'N/A', revenue: 85_000_000_000, profit: 10_000_000_000, grossMargin: 0.45, currency: 'CNY', valuation: 560_000_000_000, aiRevenueShare: 0.55, sourceAsOf: 'FY2024 估算', sourceNote: '未独立披露' },
  cambricon: { marketCap: 280_000_000_000, pe: 'N/A', revenue: 1_180_000_000, profit: -480_000_000, grossMargin: 0.62, currency: 'CNY', aiRevenueShare: 1, sourceAsOf: 'FY2024' },
  'moore-threads': { marketCap: 'N/A', pe: 'N/A', revenue: 500_000_000, profit: -800_000_000, grossMargin: 0.3, currency: 'CNY', valuation: 25_000_000_000, aiRevenueShare: 0.7, sourceAsOf: '2025 估值', sourceNote: '未上市估算' },
  tsmc: { marketCap: 1_100_000_000_000, pe: 26, revenue: 122_400_000_000, profit: 55_200_000_000, grossMargin: 0.599, aiRevenueShare: 0.52, sourceAsOf: 'FY2025' },
  'samsung-foundry': { marketCap: 'N/A', pe: 'N/A', revenue: 18_000_000_000, profit: -2_000_000_000, grossMargin: 0.12, valuation: 80_000_000_000, aiRevenueShare: 0.35, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算' },
  'intel-foundry': { marketCap: 'N/A', pe: 'N/A', revenue: 4_400_000_000, profit: -13_400_000_000, grossMargin: -0.7, valuation: 30_000_000_000, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算 · 含内部代工' },
  smic: { marketCap: 280_000_000_000, pe: 'N/A', revenue: 57_800_000_000, profit: 3_700_000_000, grossMargin: 0.18, currency: 'CNY', aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  globalfoundries: { marketCap: 22_000_000_000, pe: 30, revenue: 6_750_000_000, profit: 250_000_000, grossMargin: 0.25, aiRevenueShare: 0.18, sourceAsOf: 'FY2024' },
  ase: { marketCap: 20_000_000_000, pe: 18, revenue: 20_500_000_000, profit: 1_300_000_000, grossMargin: 0.18, aiRevenueShare: 0.3, sourceAsOf: 'FY2025' },
  amkor: { marketCap: 6_000_000_000, pe: 17, revenue: 6_320_000_000, profit: 360_000_000, grossMargin: 0.15, aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  jcet: { marketCap: 55_000_000_000, pe: 35, revenue: 31_200_000_000, profit: 1_580_000_000, grossMargin: 0.14, currency: 'CNY', aiRevenueShare: 0.28, sourceAsOf: 'FY2024' },
  tongfu: { marketCap: 45_000_000_000, pe: 60, revenue: 22_500_000_000, profit: 660_000_000, grossMargin: 0.13, currency: 'CNY', aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  ibiden: { marketCap: 6_000_000_000, pe: 24, revenue: 2_500_000_000, profit: 250_000_000, grossMargin: 0.27, aiRevenueShare: 0.35, sourceAsOf: 'FY2025 (3 月)' },
  'sk-hynix': { marketCap: 150_000_000_000, pe: 13, revenue: 70_400_000_000, profit: 31_100_000_000, grossMargin: 0.58, aiRevenueShare: 0.68, sourceAsOf: 'FY2025' },
  'samsung-memory': { marketCap: 'N/A', pe: 'N/A', revenue: 75_000_000_000, profit: 17_900_000_000, grossMargin: 0.394, valuation: 180_000_000_000, aiRevenueShare: 0.52, sourceAsOf: 'FY2025 Memory / DS proxy', sourceNote: 'Samsung Memory 未单独披露净利润，利润采用 DS 分部经营利润代理' },
  micron: { marketCap: 130_000_000_000, pe: 22, revenue: 37_378_000_000, profit: 8_539_000_000, grossMargin: 0.398, aiRevenueShare: 0.54, sourceAsOf: 'FY2025' },
  cxmt: { marketCap: 'N/A', pe: 'N/A', revenue: 15_000_000_000, profit: -2_000_000_000, grossMargin: 0.2, currency: 'CNY', valuation: 150_000_000_000, aiRevenueShare: 0.25, sourceAsOf: '2025 融资估值', sourceNote: '未上市' },
  ymtc: { marketCap: 'N/A', pe: 'N/A', revenue: 12_000_000_000, profit: -1_000_000_000, grossMargin: 0.18, currency: 'CNY', valuation: 180_000_000_000, aiRevenueShare: 0.18, sourceAsOf: '2024 估值', sourceNote: '未上市' },
  supermicro: { marketCap: 18_000_000_000, pe: 12, revenue: 22_000_000_000, profit: 1_200_000_000, grossMargin: 0.11, aiRevenueShare: 0.7, sourceAsOf: 'FY2024 (6 月)' },
  dell: { marketCap: 75_000_000_000, pe: 19, revenue: 95_600_000_000, profit: 4_580_000_000, grossMargin: 0.24, aiRevenueShare: 0.3, sourceAsOf: 'FY2025 (1 月)' },
  hpe: { marketCap: 27_000_000_000, pe: 12, revenue: 30_100_000_000, profit: 2_580_000_000, grossMargin: 0.34, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 (10 月)' },
  arista: { marketCap: 130_000_000_000, pe: 45, revenue: 7_000_000_000, profit: 2_850_000_000, grossMargin: 0.64, aiRevenueShare: 0.4, sourceAsOf: 'FY2024' },
  innolight: { marketCap: 140_000_000_000, pe: 30, revenue: 23_900_000_000, profit: 5_170_000_000, grossMargin: 0.36, currency: 'CNY', aiRevenueShare: 0.7, sourceAsOf: 'FY2024' },
  'industrial-fulian': { marketCap: 460_000_000_000, pe: 22, revenue: 609_000_000_000, profit: 23_200_000_000, grossMargin: 0.08, currency: 'CNY', aiRevenueShare: 0.45, sourceAsOf: 'FY2024' },
  aws: { marketCap: 'N/A', pe: 'N/A', revenue: 128_725_000_000, profit: 45_606_000_000, grossMargin: 0.354, valuation: 1_600_000_000_000, aiRevenueShare: 0.35, sourceAsOf: 'FY2025 AWS segment', sourceNote: '利润为分部经营利润' },
  'microsoft-azure': { marketCap: 'N/A', pe: 'N/A', revenue: 75_000_000_000, profit: 30_000_000_000, grossMargin: 0.69, valuation: 1_700_000_000_000, aiRevenueShare: 0.48, sourceAsOf: 'FY2025 Azure estimate', sourceNote: 'Azure 未披露独立利润；毛利率采用 Microsoft Cloud 口径' },
  'google-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 58_700_000_000, profit: 13_900_000_000, grossMargin: 0.237, valuation: 900_000_000_000, aiRevenueShare: 0.44, sourceAsOf: 'FY2025 Google Cloud segment', sourceNote: '毛利率字段采用分部经营利润率代理' },
  'alibaba-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 15_000_000_000, profit: 800_000_000, grossMargin: 0.18, valuation: 60_000_000_000, aiRevenueShare: 0.4, sourceAsOf: 'FY2025 (3 月) 分部', sourceNote: '分部估算' },
  'tencent-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 13_000_000_000, profit: 2_500_000_000, grossMargin: 0.32, valuation: 70_000_000_000, aiRevenueShare: 0.36, sourceAsOf: 'FY2024 分部估算', sourceNote: '分部估算' },
  'oracle-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 44_029_000_000, profit: 14_000_000_000, grossMargin: 0.318, valuation: 120_000_000_000, aiRevenueShare: 0.56, sourceAsOf: 'FY2025 cloud services proxy', sourceNote: 'OCI 未完整披露五年利润，采用 cloud services and license support 代理' },
  openai: { marketCap: 'N/A', pe: 'N/A', revenue: 13_000_000_000, profit: -8_500_000_000, grossMargin: 0.52, valuation: 300_000_000_000, fundingAmount: 40_000_000_000, aiRevenueShare: 1, sourceAsOf: '2025 ARR / revenue estimate', sourceNote: '私营公司，收入与亏损为公开报道估算' },
  anthropic: { marketCap: 'N/A', pe: 'N/A', revenue: 4_000_000_000, profit: -3_500_000_000, grossMargin: 0.5, valuation: 61_500_000_000, aiRevenueShare: 1, sourceAsOf: '2025-03 融资估值 · 2025 ARR' },
  'google-deepmind': { marketCap: 'N/A', pe: 'N/A', revenue: 5_000_000_000, profit: -1_000_000_000, grossMargin: 0.5, valuation: 200_000_000_000, aiRevenueShare: 1, sourceAsOf: '内部估算', sourceNote: 'Alphabet 内部，未单独披露' },
  'meta-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: -12_000_000_000, grossMargin: 0.4, valuation: 250_000_000_000, aiRevenueShare: 1, sourceAsOf: 'FY2024 估算', sourceNote: 'Meta GenAI 部门估算' },
  mistral: { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -350_000_000, grossMargin: 0.5, valuation: 6_200_000_000, aiRevenueShare: 1, sourceAsOf: '2024-06 融资估值' },
  'baidu-ernie': { marketCap: 'N/A', pe: 'N/A', revenue: 2_500_000_000, profit: 300_000_000, grossMargin: 0.45, valuation: 20_000_000_000, aiRevenueShare: 1, sourceAsOf: 'FY2024 AI 业务分部估算', sourceNote: '分部估算' },
  'moonshot-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 300_000_000, profit: -500_000_000, grossMargin: 0.5, valuation: 3_300_000_000, aiRevenueShare: 1, sourceAsOf: '2024-08 融资估值' },
  langchain: { marketCap: 'N/A', pe: 'N/A', revenue: 80_000_000, profit: -50_000_000, grossMargin: 0.75, valuation: 1_100_000_000, aiRevenueShare: 1, sourceAsOf: '2025-02 融资估值' },
  databricks: { marketCap: 'N/A', pe: 'N/A', revenue: 3_700_000_000, profit: -500_000_000, grossMargin: 0.75, valuation: 62_000_000_000, aiRevenueShare: 0.5, sourceAsOf: '2024-12 融资 · ARR ~$3.7B' },
  snowflake: { marketCap: 55_000_000_000, pe: 'N/A', revenue: 3_800_000_000, profit: -1_300_000_000, grossMargin: 0.67, aiRevenueShare: 0.3, sourceAsOf: 'FY2025 (1 月)' },
  'scale-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 900_000_000, profit: 50_000_000, grossMargin: 0.55, valuation: 14_000_000_000, aiRevenueShare: 1, sourceAsOf: '2024-05 融资估值' },
  'hugging-face': { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -80_000_000, grossMargin: 0.7, valuation: 4_500_000_000, aiRevenueShare: 1, sourceAsOf: '2023-08 融资估值' },
  'zhipu-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 1_500_000_000, profit: -800_000_000, grossMargin: 0.45, currency: 'CNY', valuation: 25_000_000_000, aiRevenueShare: 1, sourceAsOf: '2025 融资估值' },
  'microsoft-copilot': { marketCap: 'N/A', pe: 'N/A', revenue: 10_000_000_000, profit: 2_500_000_000, grossMargin: 0.75, valuation: 250_000_000_000, aiRevenueShare: 0.9, sourceAsOf: 'FY2025 估算', sourceNote: 'Microsoft AI 产品 ARR' },
  'salesforce-einstein': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: 200_000_000, grossMargin: 0.78, valuation: 30_000_000_000, aiRevenueShare: 0.8, sourceAsOf: 'FY2025 (1 月) Agentforce 估算', sourceNote: '分部估算' },
  'adobe-firefly': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: 250_000_000, grossMargin: 0.82, valuation: 20_000_000_000, aiRevenueShare: 0.8, sourceAsOf: 'FY2024 (11 月) 估算', sourceNote: '分部估算' },
  'servicenow-ai': { marketCap: 190_000_000_000, pe: 90, revenue: 10_980_000_000, profit: 1_430_000_000, grossMargin: 0.78, aiRevenueShare: 0.38, sourceAsOf: 'FY2024' },
  'kingsoft-office': { marketCap: 140_000_000_000, pe: 65, revenue: 5_120_000_000, profit: 1_650_000_000, grossMargin: 0.85, currency: 'CNY', aiRevenueShare: 0.35, sourceAsOf: 'FY2024' },
  tesla: { marketCap: 1_280_000_000_000, pe: 150, revenue: 97_700_000_000, profit: 7_130_000_000, grossMargin: 0.18, aiRevenueShare: 0.1, sourceAsOf: 'FY2024' },
  waymo: { marketCap: 'N/A', pe: 'N/A', revenue: 600_000_000, profit: -2_000_000_000, grossMargin: 0.2, valuation: 45_000_000_000, aiRevenueShare: 1, sourceAsOf: '2024-10 融资估值' },
  'boston-dynamics': { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -100_000_000, grossMargin: 0.25, valuation: 2_000_000_000, aiRevenueShare: 0.6, sourceAsOf: '内部估算', sourceNote: 'Hyundai 子公司未单独披露' },
  unitree: { marketCap: 'N/A', pe: 'N/A', revenue: 1_500_000_000, profit: 100_000_000, grossMargin: 0.35, currency: 'CNY', valuation: 12_000_000_000, aiRevenueShare: 0.65, sourceAsOf: '2025 融资估值' },
  xpeng: { marketCap: 17_000_000_000, pe: 'N/A', revenue: 40_900_000_000, profit: -5_790_000_000, grossMargin: 0.14, currency: 'CNY', aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  ubtech: { marketCap: 25_000_000_000, pe: 'N/A', revenue: 1_300_000_000, profit: -1_140_000_000, grossMargin: 0.25, currency: 'CNY', aiRevenueShare: 0.6, sourceAsOf: 'FY2024' },
};

const metricSource = (label: string, date: string, url?: string): CompanyMetricSource => ({
  label,
  date,
  ...(url ? { url } : {}),
});

const allMetricSources = (source: CompanyMetricSource): CompanyMetricSources => ({
  marketCap: source,
  valuation: source,
  pe: source,
  revenue: source,
  profit: source,
  grossMargin: source,
  aiRevenueShare: source,
});

const explicitMetricSourcesByCompanyId: Record<string, CompanyMetricSources> = {
  nvidia: {
    ...allMetricSources(
      metricSource(
        'NVIDIA Q4 FY2025 Earnings Release',
        '2025-02-26',
        'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025',
      ),
    ),
    marketCap: metricSource('公开市场行情整理（NVDA，估算口径）', '2026-05'),
    pe: metricSource('公开市场行情整理（NVDA，估算口径）', '2026-05'),
    aiRevenueShare: metricSource(
      '数据中心收入占总营收比例（FY2025 $115.2B / $130.5B）',
      '2025-02-26',
      'https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025',
    ),
  },
  tsmc: {
    ...allMetricSources(
      metricSource('TSMC 2025 Annual Report', '2026-04', 'https://investor.tsmc.com/static/annualReports/2025/english/index.html'),
    ),
    marketCap: metricSource('公开市场行情整理（TSM ADR，估算口径）', '2026-05'),
    pe: metricSource('公开市场行情整理（TSM ADR，估算口径）', '2026-05'),
  },
  openai: {
    ...allMetricSources(
      metricSource(
        'OpenAI revenue / ARR public reporting synthesis',
        '2026-01',
        'https://techcrunch.com/2025/06/09/openai-claims-to-have-hit-10b-in-annual-revenue/',
      ),
    ),
    valuation: metricSource('OpenAI March 2025 Funding Update', '2025-03-31', 'https://openai.com/index/march-funding-updates/'),
    marketCap: metricSource('OpenAI March 2025 Funding Update', '2025-03-31', 'https://openai.com/index/march-funding-updates/'),
  },
  aws: {
    ...allMetricSources(
      metricSource(
        'Amazon Q4/FY2025 Earnings Release',
        '2026-02-05',
        'https://s2.q4cdn.com/299287126/files/doc_earnings/2025/q4/earnings-result/AMZN-Q4-2025-Earnings-Release.pdf',
      ),
    ),
    valuation: metricSource('AWS 分部估值整理（未单独上市）', '2026-05'),
    marketCap: metricSource('AWS 分部估值整理（未单独上市）', '2026-05'),
  },
  'microsoft-azure': allMetricSources(
    metricSource('Azure estimate anchored to Microsoft FY2025 disclosure', '2025-07', 'https://www.microsoft.com/investor/reports/ar25/index.html'),
  ),
  'google-cloud': allMetricSources(
    metricSource(
      'Alphabet FY2025 Form 10-K / Google Cloud segment',
      '2026-02-05',
      'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm',
    ),
  ),
  'oracle-cloud': allMetricSources(
    metricSource(
      'Oracle FY2025 results / cloud services proxy',
      '2025-06',
      'https://investor.oracle.com/investor-news/news-details/2025/Oracle-Announces-Fiscal-2025-Fourth-Quarter-and-Fiscal-Full-Year-Financial-Results/default.aspx',
    ),
  ),
  asml: allMetricSources(metricSource('ASML annual reports', '2026-02', 'https://www.asml.com/en/investors/annual-report')),
  'sk-hynix': {
    ...allMetricSources(metricSource('SK Hynix FY2025 Financial Results', '2026-01-28', 'https://news.skhynix.com/sk-hynix-announces-fy25-financial-results/')),
    aiRevenueShare: metricSource('HBM + 高密度服务器 DRAM 占总营收估算', '2025-03', 'https://www.skhynix.com/eng/ir/financial-statement.do'),
  },
  micron: allMetricSources(metricSource('Micron FY2025 Results', '2025-09-23', 'https://investors.micron.com/node/49371/pdf')),
};

const buildMetricSources = (seed: CompanySeed, staticMetrics?: StaticMetricEstimate): CompanyMetricSources => {
  const snapshotSource = metricSource(
    staticMetrics?.sourceNote ?? '公开资料与公司披露整理（静态研究快照）',
    staticMetrics?.sourceAsOf ?? '2026-01 静态估算',
  );

  return {
    ...allMetricSources(snapshotSource),
    ...explicitMetricSourcesByCompanyId[seed.id],
  };
};

const nvidiaDetails = {
  strategicPosition: {
    en: 'NVIDIA sits at the profit-dense center of AI compute, combining accelerator hardware, CUDA, networking and a developer ecosystem.',
    zh: '英伟达位于 AI 算力利润池中心,把加速硬件、CUDA、网络与开发者生态绑定在一起。',
  },
  moats: [
    { type: 'CUDA 生态', description: '长期开发者锁定和高度优化的软件库形成生态壁垒。' },
    { type: '硬件路线图', description: 'Hopper → Blackwell → Rubin 节奏稳定，整机系统协同迭代。' },
    { type: '网络栈', description: 'NVLink / NVSwitch / Spectrum-X 把单卡优势扩展到机柜与集群尺度。' },
    { type: '供应链能力', description: '与 TSMC、HBM 供应商和整机厂商深度协同。' },
  ],
  risks: [
    { type: '竞争', description: '云厂商自研 ASIC 和 AMD 加速器可能压制定价。' },
    { type: '供给', description: 'HBM 与先进封装短缺可能限制出货增长。' },
    { type: '监管', description: '出口管制会重塑产品组合和区域需求。' },
    { type: '估值', description: '高预期使其对资本开支周期更敏感。' },
  ],
  futureOpportunities: ['Inference systems', 'Robotics platforms', 'Enterprise AI factories'],
};

const constellationDetails = {
  strategicPosition: {
    en: 'Constellation Energy belongs in the Energy layer because its core asset is electricity generation, especially nuclear power, and long-term power contracts that AI data centers need before compute can scale.',
    zh: '星座能源属于能源层：它的核心资产不是模型或芯片，而是以核电为主的稳定发电能力，以及把电力供给锁定给客户的长期电力采购协议。AI 数据中心扩张前，首先要获得可持续、可调度、可签约的电力供给，因此它位于 AI 产业链最上游的能源环节。',
  },
  positioning: {
    whyThisLayer: {
      en: 'The company produces and sells electricity, so its value comes from power capacity, grid reliability and power purchase agreements rather than AI software or silicon.',
      zh: '它生产并销售电力，价值来源是发电容量、电网可靠性和电力采购协议，而不是 AI 软件或芯片。因此在这张图里，它被归入为算力提供底层输入的能源层。',
    },
    roleInLayer: {
      en: 'It acts as a clean firm power supplier for hyperscale data centers and cloud customers, turning nuclear generation into long-duration contracted energy.',
      zh: '它在能源环节承担“稳定低碳电力供应商”的角色：把核电等发电资产转化为长期合约电力，帮助云厂商和数据中心获得高负载运行所需的基荷电力。',
    },
    industryPosition: {
      en: 'Constellation is one of the leading U.S. clean power and nuclear operators, with scarce nuclear assets and strong relevance as AI raises demand for dependable low-carbon electricity.',
      zh: '星座能源是美国清洁电力和核电运营龙头之一，拥有稀缺的核电资产和大规模发电运营能力。随着 AI 数据中心推高稳定低碳电力需求，它在能源供给侧的战略价值正在上升。',
    },
    industryContext: {
      en: 'The AI energy layer is about converting power into available compute. As data centers become larger and denser, clean firm power, grid interconnection, cooling electricity and long-term procurement all become constraints before GPUs can be fully used.',
      zh: 'AI 的能源环节解决的是“算力能不能持续运行”的前置问题。数据中心越大、功率密度越高，稳定电源、并网容量、制冷用电和长期采购合约就越容易成为瓶颈；所以能源公司虽然不直接训练模型，却决定算力扩张的成本、速度和可靠性。',
    },
  },
  moats: [
    { type: '核电资产', description: '核电可以提供接近全天候的低碳基荷电力，适合高负载数据中心的长期用电需求。' },
    { type: '长期合约能力', description: '通过电力采购协议把发电能力与云厂商、数据中心客户的能源需求绑定。' },
    { type: '运营与监管经验', description: '核电运营涉及安全、检修、许可和容量管理，资产替代周期长、进入门槛高。' },
  ],
  risks: [
    { type: '监管与安全', description: '核电资产受许可证、监管审查和安全运行要求影响。' },
    { type: '项目周期', description: '电站重启、扩容或并网改造周期较长，兑现节奏可能慢于 AI 用电需求。' },
    { type: '电价与合约', description: '长期电力采购协议提升可见度，但也会受电价、利率和客户信用变化影响。' },
  ],
  futureOpportunities: ['Clean firm power', 'AI data center PPAs', 'Nuclear fleet life extension'],
};

type ImportedCompanySeed = Omit<Partial<CompanySeed>, 'layerIds' | 'coreProducts' | 'moats' | 'risks' | 'futureOpportunities'> & {
  id: string;
  en: string;
  zh: string;
  layerIds: readonly string[];
  country: string;
  region: Region;
  type: CompanyType;
  founded: number;
  headquarters: string;
  coreProducts: readonly string[];
  moats?: readonly { type: string; description: string }[];
  risks?: readonly { type: string; description: string }[];
  futureOpportunities?: readonly string[];
};

const businessSignalDescriptionByKey: Record<string, string> = {
  'midjourney:aesthetic quality': '输出风格和画面质感形成创作者偏好，是 Midjourney 最直接的留存来源。',
  'midjourney:community': '社区作品、提示词和风格传播降低学习成本，也持续带来新用户。',
  'midjourney:brand': '品牌代表高质量生成式图像心智，帮助它在同类工具中保持溢价。',
  'midjourney:competition': 'Adobe、Google、OpenAI 等平台把图像生成嵌入既有工作流，分流创作者时间。',
  'midjourney:copyright': '训练数据、角色生成和商业授权争议会影响企业采用与品牌合作。',
  'midjourney:model cost': '图像与视频模型迭代需要持续推理和训练投入，订阅收入会被算力成本挤压。',
  brand: '品牌认知影响企业采购和个人用户的默认选择。',
  community: '用户社区带来案例、教程和口碑传播，降低新用户学习成本。',
  competition: '同层玩家和平台公司会挤压定价权、分发入口和用户时间。',
  copyright: '版权、数据授权和生成内容合规会影响商业采用。',
  'model cost': '训练和推理成本会挤压毛利，并限制低价扩张空间。',
};

const normalizeBusinessSignal = (companyId: string, signal: { type: string; description: string }) => {
  const type = signal.type.trim();
  const description = signal.description.trim();
  const normalizedType = type.toLowerCase();
  const replacement = businessSignalDescriptionByKey[`${companyId}:${normalizedType}`] ?? businessSignalDescriptionByKey[normalizedType];
  const repeatsType = !description || displayTerm(description) === displayTerm(type);

  return {
    type,
    description: repeatsType ? (replacement ?? `${displayTerm(type)}是需要持续跟踪的关键变量，会影响公司在本环节的防守能力。`) : description,
  };
};

const importedCompanySeeds: CompanySeed[] = (sourceTerminalCompanySeeds as readonly ImportedCompanySeed[]).map((seed) => ({
  id: seed.id,
  en: seed.en,
  zh: seed.zh,
  layerIds:
    seed.id === 'nvidia'
      ? ['chip-design']
      : seed.id === 'microsoft-azure'
        ? ['cloud-platform']
        : [...seed.layerIds],
  country: seed.country,
  region: seed.region,
  type: seed.type,
  ticker: seed.ticker,
  exchange: seed.exchange,
  founded: seed.founded === 2024 ? '未披露' : seed.founded,
  headquarters: seed.headquarters,
  ceo: seed.ceo,
  parentCompanyId: seed.parentCompanyId,
  coreProducts: [...seed.coreProducts],
  aiRevenueShare: seed.aiRevenueShare,
  strategicPosition: seed.strategicPosition,
  moats: seed.moats?.map((moat) => normalizeBusinessSignal(seed.id, moat)),
  risks: seed.risks?.map((risk) => normalizeBusinessSignal(seed.id, risk)),
  futureOpportunities: seed.futureOpportunities ? [...seed.futureOpportunities] : undefined,
}));

const mergeCompanySeeds = (baseSeeds: CompanySeed[], importedSeeds: CompanySeed[]) => {
  const byId = new Map(baseSeeds.map((seed) => [seed.id, seed]));

  importedSeeds.forEach((seed) => {
    const existing = byId.get(seed.id);
    if (!existing) {
      byId.set(seed.id, seed);
      return;
    }

    byId.set(seed.id, {
      ...existing,
      layerIds: Array.from(new Set([...existing.layerIds, ...seed.layerIds])),
      coreProducts: Array.from(new Set([...existing.coreProducts, ...seed.coreProducts])),
      aiRevenueShare: seed.aiRevenueShare ?? existing.aiRevenueShare,
      strategicPosition: seed.strategicPosition ?? existing.strategicPosition,
      moats: seed.moats?.length ? seed.moats : existing.moats,
      risks: seed.risks?.length ? seed.risks : existing.risks,
      futureOpportunities: seed.futureOpportunities?.length ? seed.futureOpportunities : existing.futureOpportunities,
    });
  });

  return Array.from(byId.values());
};

const buildCompany = (seed: CompanySeed, index: number): Company => {
  const primaryLayer = getLayerById(seed.layerIds[0]);
  const isPublicLike = seed.type === 'public' || seed.ticker;
  const generatedMarketCap = 18_000_000_000 + index * 9_500_000_000;
  const privateValuation = seed.type === 'private' ? 1_200_000_000 + index * 700_000_000 : undefined;
  const isNvidia = seed.id === 'nvidia';
  const isConstellation = seed.id === 'constellation';
  const staticMetrics = staticMetricsByCompanyId[seed.id];
  const defaultCurrency: CompanyPublicMetrics['currency'] = seed.country === 'CN' ? 'CNY' : 'USD';
  const generatedPublicMetrics: CompanyPublicMetrics | undefined = isPublicLike
    ? {
        marketCap: isNvidia ? 3_100_000_000_000 : generatedMarketCap,
        pe: isNvidia ? 52 : 18 + (index % 28),
        revenue: isNvidia ? 126_000_000_000 : 4_000_000_000 + index * 850_000_000,
        profit: isNvidia ? 72_000_000_000 : 400_000_000 + index * 120_000_000,
        grossMargin: isNvidia ? 0.74 : 0.28 + (index % 30) / 100,
        currency: defaultCurrency,
      }
    : undefined;
  const hasStaticPublicMetrics =
    staticMetrics !== undefined &&
    ['marketCap', 'pe', 'revenue', 'profit', 'grossMargin'].some((key) => key in staticMetrics);
  const publicMetrics: CompanyPublicMetrics | undefined =
    hasStaticPublicMetrics || generatedPublicMetrics
      ? {
          marketCap: staticMetrics?.marketCap ?? generatedPublicMetrics?.marketCap ?? 'N/A',
          pe: staticMetrics?.pe ?? generatedPublicMetrics?.pe ?? 'N/A',
          revenue: staticMetrics?.revenue ?? generatedPublicMetrics?.revenue ?? 'N/A',
          profit: staticMetrics?.profit ?? generatedPublicMetrics?.profit ?? 'N/A',
          grossMargin: staticMetrics?.grossMargin ?? generatedPublicMetrics?.grossMargin ?? 'N/A',
          currency: staticMetrics?.currency ?? generatedPublicMetrics?.currency ?? defaultCurrency,
        }
      : undefined;
  const shouldHavePrivateMetrics = seed.type === 'private' || staticMetrics?.valuation !== undefined;
  const privateMetrics = shouldHavePrivateMetrics
    ? {
        valuation: staticMetrics?.valuation ?? privateValuation ?? 'Not disclosed',
        fundingRounds: [
          { round: 'Growth', amount: staticMetrics?.fundingAmount ?? 300_000_000 + index * 10_000_000, date: '2025-10' },
        ],
        keyInvestors: seed.region === 'china' ? ['Strategic funds', 'Industrial capital'] : ['Strategic investors', 'Venture funds'],
      }
    : undefined;
  const scaleMetric =
    typeof publicMetrics?.marketCap === 'number'
      ? publicMetrics.marketCap
      : typeof privateMetrics?.valuation === 'number'
        ? privateMetrics.valuation
        : typeof publicMetrics?.revenue === 'number'
          ? publicMetrics.revenue
          : generatedMarketCap;
  const scaleSize = Math.min(1.65, Math.max(0.72, 0.72 + Math.log10(Math.max(scaleMetric, 1_000_000_000) / 1_000_000_000) * 0.2));
  const defaultStrategicPosition = {
    en: `${seed.en} contributes to ${primaryLayer?.name.en ?? 'the AI stack'} through ${seed.coreProducts.join(', ')}.`,
    zh: `${seed.zh}的核心能力包括${displayTerms(seed.coreProducts, '、')}，参与 ${primaryLayer?.name.zh ?? 'AI 产业链'}。`,
  };
  const localizedSeedStrategicPosition = seed.strategicPosition
    ? {
        en: seed.strategicPosition.en,
        zh: /[\u3400-\u9fff]/.test(seed.strategicPosition.zh) ? seed.strategicPosition.zh : defaultStrategicPosition.zh,
      }
    : defaultStrategicPosition;

  return {
    id: seed.id,
    name: { en: seed.en, zh: seed.zh },
    logo: seed.en
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 3)
      .toUpperCase(),
    basicInfo: {
      country: seed.country,
      region: seed.region,
      type: seed.type,
      ticker: seed.ticker,
      exchange: seed.exchange,
      founded: seed.founded,
      headquarters: seed.headquarters,
      ceo: seed.ceo,
      parentCompanyId: seed.parentCompanyId,
    },
    publicMetrics,
    privateMetrics,
    aiBusiness: {
      coreProducts: seed.coreProducts,
      layerIds: seed.layerIds,
      aiRevenueShare: staticMetrics?.aiRevenueShare ?? seed.aiRevenueShare ?? (isNvidia ? 0.86 : Math.min(0.15 + (index % 8) * 0.09, 0.82)),
      strategicPosition:
        isNvidia
          ? nvidiaDetails.strategicPosition
          : isConstellation
            ? constellationDetails.strategicPosition
          : localizedSeedStrategicPosition,
      positioning: isConstellation ? constellationDetails.positioning : undefined,
      moats: isNvidia
        ? nvidiaDetails.moats
        : isConstellation
          ? constellationDetails.moats
        : seed.moats?.length
          ? seed.moats
        : [
            { type: '领域深度', description: `围绕 ${displayTerm(seed.coreProducts[0])} 形成专门能力。` },
            { type: '客户入口', description: '已嵌入关键 AI 客户的工作流和采购路径。' },
          ],
      risks: isNvidia
        ? nvidiaDetails.risks
        : isConstellation
          ? constellationDetails.risks
        : seed.risks?.length
          ? seed.risks
        : [
            { type: '周期', description: 'AI 资本开支周期可能改变订单节奏。' },
            { type: '竞争', description: '相邻环节玩家可能向本层纵向整合。' },
          ],
      futureOpportunities: isNvidia
        ? nvidiaDetails.futureOpportunities
        : isConstellation
          ? constellationDetails.futureOpportunities
          : seed.futureOpportunities?.length
            ? seed.futureOpportunities
          : ['Inference optimization', 'China/global demand split', 'Vertical integration'],
    },
    visualIdentity: {
      size: isNvidia ? 1.8 : scaleSize,
      glowIntensity: isNvidia ? 1.0 : Math.min(0.9, 0.32 + scaleSize * 0.28),
      color: isNvidia ? '#76b900' : primaryLayer?.visualIdentity.color,
    },
    metricSources: buildMetricSources(seed, staticMetrics),
    _meta: {
      dataSource: 'static-estimate',
      lastUpdated,
      sourceAsOf: staticMetrics?.sourceAsOf ?? '2026-01 静态估算',
      sourceNote: staticMetrics?.sourceNote,
    },
  };
};

export const companies: Company[] = mergeCompanySeeds(seeds, importedCompanySeeds).map(buildCompany);
export const getCompanyById = (id: string) => companies.find((company) => company.id === id);
export const companiesByLayer = (layerId: string) => companies.filter((company) => company.aiBusiness.layerIds.includes(layerId));
