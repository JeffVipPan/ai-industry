/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { Company, CompanyType } from '../../types/company';
import type { Region } from '../../types/common';
import { getLayerById } from '../layers';

const lastUpdated = '2026-05-15';

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
  founded: number;
  headquarters: string;
  ceo?: string;
  parentCompanyId?: string;
  coreProducts: string[];
};

const seeds: CompanySeed[] = [
  { id: 'constellation', en: 'Constellation Energy', zh: 'Constellation Energy', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'CEG', exchange: 'NASDAQ', founded: 1999, headquarters: 'Baltimore, US', coreProducts: ['Nuclear power', 'Power purchase agreements'] },
  { id: 'nextera', en: 'NextEra Energy', zh: 'NextEra Energy', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'NEE', exchange: 'NYSE', founded: 1984, headquarters: 'Juno Beach, US', coreProducts: ['Renewable power', 'Grid storage'] },
  { id: 'state-grid', en: 'State Grid', zh: '国家电网', layerIds: ['energy'], country: 'CN', region: 'china', type: 'state-owned', founded: 2002, headquarters: 'Beijing, China', coreProducts: ['Grid infrastructure', 'UHV transmission'] },
  { id: 'longi', en: 'LONGi Green Energy', zh: '隆基绿能', layerIds: ['energy'], country: 'CN', region: 'china', type: 'public', ticker: '601012', exchange: 'SSE', founded: 2000, headquarters: 'Xi’an, China', coreProducts: ['Solar modules', 'Renewable power equipment'] },
  { id: 'vistra', en: 'Vistra', zh: 'Vistra', layerIds: ['energy'], country: 'US', region: 'us', type: 'public', ticker: 'VST', exchange: 'NYSE', founded: 2016, headquarters: 'Irving, US', coreProducts: ['Power generation', 'Retail energy'] },

  { id: 'equinix', en: 'Equinix', zh: 'Equinix', layerIds: ['data-center'], country: 'US', region: 'us', type: 'public', ticker: 'EQIX', exchange: 'NASDAQ', founded: 1998, headquarters: 'Redwood City, US', coreProducts: ['Colocation', 'Interconnection'] },
  { id: 'digital-realty', en: 'Digital Realty', zh: 'Digital Realty', layerIds: ['data-center'], country: 'US', region: 'us', type: 'public', ticker: 'DLR', exchange: 'NYSE', founded: 2004, headquarters: 'Austin, US', coreProducts: ['Hyperscale data centers', 'Colocation'] },
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

  { id: 'nvidia', en: 'NVIDIA', zh: '英伟达', layerIds: ['chip-design', 'ai-infra-agent-framework'], country: 'US', region: 'us', type: 'public', ticker: 'NVDA', exchange: 'NASDAQ', founded: 1993, headquarters: 'Santa Clara, US', ceo: 'Jensen Huang', coreProducts: ['GPU', 'CUDA', 'AI accelerator', 'Data center platform'] },
  { id: 'amd', en: 'AMD', zh: 'AMD', layerIds: ['chip-design'], country: 'US', region: 'us', type: 'public', ticker: 'AMD', exchange: 'NASDAQ', founded: 1969, headquarters: 'Santa Clara, US', coreProducts: ['GPU', 'CPU', 'AI accelerator'] },
  { id: 'broadcom', en: 'Broadcom', zh: '博通', layerIds: ['chip-design', 'servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'AVGO', exchange: 'NASDAQ', founded: 1961, headquarters: 'Palo Alto, US', coreProducts: ['Networking ASIC', 'Custom AI ASIC'] },
  { id: 'qualcomm', en: 'Qualcomm', zh: '高通', layerIds: ['chip-design'], country: 'US', region: 'us', type: 'public', ticker: 'QCOM', exchange: 'NASDAQ', founded: 1985, headquarters: 'San Diego, US', coreProducts: ['Mobile AI SoC', 'Edge AI'] },
  { id: 'marvell', en: 'Marvell', zh: '美满电子', layerIds: ['chip-design', 'servers-networking'], country: 'US', region: 'us', type: 'public', ticker: 'MRVL', exchange: 'NASDAQ', founded: 1995, headquarters: 'Santa Clara, US', coreProducts: ['Data center silicon', 'DSP'] },
  { id: 'huawei-hisilicon', en: 'Huawei HiSilicon', zh: '华为海思', layerIds: ['chip-design'], country: 'CN', region: 'china', type: 'subsidiary', founded: 2004, headquarters: 'Shenzhen, China', parentCompanyId: 'huawei', coreProducts: ['AI accelerator', 'SoC'] },
  { id: 'cambricon', en: 'Cambricon', zh: '寒武纪', layerIds: ['chip-design'], country: 'CN', region: 'china', type: 'public', ticker: '688256', exchange: 'SSE STAR', founded: 2016, headquarters: 'Beijing, China', coreProducts: ['AI accelerator', 'Inference chip'] },

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
  { id: 'microsoft-azure', en: 'Microsoft Azure', zh: 'Microsoft Azure', layerIds: ['cloud-platform', 'ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'MSFT', exchange: 'NASDAQ', founded: 2010, headquarters: 'Redmond, US', parentCompanyId: 'microsoft', coreProducts: ['Azure AI', 'GPU cloud', 'OpenAI infrastructure'] },
  { id: 'google-cloud', en: 'Google Cloud', zh: 'Google Cloud', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'GOOGL', exchange: 'NASDAQ', founded: 2008, headquarters: 'Mountain View, US', parentCompanyId: 'alphabet', coreProducts: ['TPU cloud', 'Vertex AI'] },
  { id: 'alibaba-cloud', en: 'Alibaba Cloud', zh: '阿里云', layerIds: ['cloud-platform'], country: 'CN', region: 'china', type: 'subsidiary', ticker: 'BABA', exchange: 'NYSE', founded: 2009, headquarters: 'Hangzhou, China', parentCompanyId: 'alibaba', coreProducts: ['GPU cloud', 'Tongyi platform'] },
  { id: 'tencent-cloud', en: 'Tencent Cloud', zh: '腾讯云', layerIds: ['cloud-platform'], country: 'CN', region: 'china', type: 'subsidiary', ticker: '0700', exchange: 'HKEX', founded: 2013, headquarters: 'Shenzhen, China', parentCompanyId: 'tencent', coreProducts: ['Cloud AI', 'Model serving'] },
  { id: 'oracle-cloud', en: 'Oracle Cloud', zh: 'Oracle Cloud', layerIds: ['cloud-platform'], country: 'US', region: 'us', type: 'public', ticker: 'ORCL', exchange: 'NYSE', founded: 1977, headquarters: 'Austin, US', coreProducts: ['OCI', 'AI clusters'] },

  { id: 'openai', en: 'OpenAI', zh: 'OpenAI', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'private', founded: 2015, headquarters: 'San Francisco, US', coreProducts: ['GPT models', 'ChatGPT', 'API platform'] },
  { id: 'anthropic', en: 'Anthropic', zh: 'Anthropic', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'private', founded: 2021, headquarters: 'San Francisco, US', coreProducts: ['Claude models', 'AI safety research'] },
  { id: 'google-deepmind', en: 'Google DeepMind', zh: 'Google DeepMind', layerIds: ['foundation-models'], country: 'GB', region: 'eu', type: 'subsidiary', founded: 2010, headquarters: 'London, UK', parentCompanyId: 'alphabet', coreProducts: ['Gemini models', 'AI research'] },
  { id: 'meta-ai', en: 'Meta AI', zh: 'Meta AI', layerIds: ['foundation-models'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'META', exchange: 'NASDAQ', founded: 2013, headquarters: 'Menlo Park, US', parentCompanyId: 'meta', coreProducts: ['Llama models', 'AI research'] },
  { id: 'mistral', en: 'Mistral AI', zh: 'Mistral AI', layerIds: ['foundation-models'], country: 'FR', region: 'eu', type: 'private', founded: 2023, headquarters: 'Paris, France', coreProducts: ['Open-weight models', 'Enterprise LLM'] },
  { id: 'baidu-ernie', en: 'Baidu ERNIE', zh: '百度文心', layerIds: ['foundation-models'], country: 'CN', region: 'china', type: 'subsidiary', ticker: 'BIDU', exchange: 'NASDAQ', founded: 2019, headquarters: 'Beijing, China', parentCompanyId: 'baidu', coreProducts: ['ERNIE models', 'Qianfan platform'] },
  { id: 'moonshot-ai', en: 'Moonshot AI', zh: '月之暗面', layerIds: ['foundation-models'], country: 'CN', region: 'china', type: 'private', founded: 2023, headquarters: 'Beijing, China', coreProducts: ['Kimi', 'Long-context models'] },

  { id: 'langchain', en: 'LangChain', zh: 'LangChain', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2022, headquarters: 'San Francisco, US', coreProducts: ['Agent framework', 'LangSmith'] },
  { id: 'databricks', en: 'Databricks', zh: 'Databricks', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2013, headquarters: 'San Francisco, US', coreProducts: ['Lakehouse', 'Mosaic AI'] },
  { id: 'snowflake', en: 'Snowflake', zh: 'Snowflake', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'public', ticker: 'SNOW', exchange: 'NYSE', founded: 2012, headquarters: 'Bozeman, US', coreProducts: ['Data cloud', 'Cortex AI'] },
  { id: 'scale-ai', en: 'Scale AI', zh: 'Scale AI', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2016, headquarters: 'San Francisco, US', coreProducts: ['Data labeling', 'RLHF data'] },
  { id: 'hugging-face', en: 'Hugging Face', zh: 'Hugging Face', layerIds: ['ai-infra-agent-framework'], country: 'US', region: 'us', type: 'private', founded: 2016, headquarters: 'New York, US', coreProducts: ['Model hub', 'Inference endpoints'] },
  { id: 'zhipu-ai', en: 'Zhipu AI', zh: '智谱 AI', layerIds: ['ai-infra-agent-framework', 'foundation-models'], country: 'CN', region: 'china', type: 'private', founded: 2019, headquarters: 'Beijing, China', coreProducts: ['GLM models', 'Agent platform'] },

  { id: 'microsoft-copilot', en: 'Microsoft Copilot', zh: 'Microsoft Copilot', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'MSFT', exchange: 'NASDAQ', founded: 2023, headquarters: 'Redmond, US', parentCompanyId: 'microsoft', coreProducts: ['Office Copilot', 'Developer Copilot'] },
  { id: 'salesforce-einstein', en: 'Salesforce Einstein', zh: 'Salesforce Einstein', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'CRM', exchange: 'NYSE', founded: 2016, headquarters: 'San Francisco, US', parentCompanyId: 'salesforce', coreProducts: ['CRM AI', 'Agentforce'] },
  { id: 'adobe-firefly', en: 'Adobe Firefly', zh: 'Adobe Firefly', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'subsidiary', ticker: 'ADBE', exchange: 'NASDAQ', founded: 2023, headquarters: 'San Jose, US', parentCompanyId: 'adobe', coreProducts: ['Generative media', 'Creative AI'] },
  { id: 'servicenow-ai', en: 'ServiceNow AI', zh: 'ServiceNow AI', layerIds: ['ai-applications'], country: 'US', region: 'us', type: 'public', ticker: 'NOW', exchange: 'NYSE', founded: 2004, headquarters: 'Santa Clara, US', coreProducts: ['Workflow AI', 'Enterprise agents'] },
  { id: 'kingsoft-office', en: 'Kingsoft Office', zh: '金山办公', layerIds: ['ai-applications'], country: 'CN', region: 'china', type: 'public', ticker: '688111', exchange: 'SSE STAR', founded: 1988, headquarters: 'Beijing, China', coreProducts: ['WPS AI', 'Office productivity'] },

  { id: 'tesla', en: 'Tesla', zh: '特斯拉', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'public', ticker: 'TSLA', exchange: 'NASDAQ', founded: 2003, headquarters: 'Austin, US', coreProducts: ['FSD', 'Dojo', 'Humanoid robotics'] },
  { id: 'waymo', en: 'Waymo', zh: 'Waymo', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'subsidiary', founded: 2009, headquarters: 'Mountain View, US', parentCompanyId: 'alphabet', coreProducts: ['Autonomous driving', 'Robotaxi'] },
  { id: 'boston-dynamics', en: 'Boston Dynamics', zh: '波士顿动力', layerIds: ['autonomous-robotics-ai-native-software'], country: 'US', region: 'us', type: 'subsidiary', founded: 1992, headquarters: 'Waltham, US', parentCompanyId: 'hyundai', coreProducts: ['Robotics', 'Humanoid systems'] },
  { id: 'unitree', en: 'Unitree Robotics', zh: '宇树科技', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'private', founded: 2016, headquarters: 'Hangzhou, China', coreProducts: ['Quadruped robots', 'Humanoid robots'] },
  { id: 'xpeng', en: 'XPeng', zh: '小鹏汽车', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'public', ticker: 'XPEV', exchange: 'NYSE', founded: 2014, headquarters: 'Guangzhou, China', coreProducts: ['Autonomous driving', 'EV platform'] },
  { id: 'ubtech', en: 'UBTECH Robotics', zh: '优必选', layerIds: ['autonomous-robotics-ai-native-software'], country: 'CN', region: 'china', type: 'public', ticker: '9880', exchange: 'HKEX', founded: 2012, headquarters: 'Shenzhen, China', coreProducts: ['Humanoid robots', 'Service robots'] },
];

const nvidiaDetails = {
  strategicPosition: {
    en: 'NVIDIA sits at the profit-dense center of AI compute, combining accelerator hardware, CUDA, networking and a developer ecosystem.',
    zh: 'NVIDIA 位于 AI 算力利润池中心,把加速硬件、CUDA、网络与开发者生态绑定在一起。',
  },
  moats: [
    { type: 'CUDA 生态', description: '长期开发者锁定和高度优化的软件库形成生态壁垒。' },
    { type: '硬件路线图', description: 'GPU、网络和整机系统保持高节奏协同迭代。' },
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

const buildCompany = (seed: CompanySeed, index: number): Company => {
  const primaryLayer = getLayerById(seed.layerIds[0]);
  const isPublicLike = seed.type === 'public' || seed.ticker;
  const generatedMarketCap = 18_000_000_000 + index * 9_500_000_000;
  const privateValuation = seed.type === 'private' ? 1_200_000_000 + index * 700_000_000 : undefined;
  const isNvidia = seed.id === 'nvidia';

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
    publicMetrics: isPublicLike
      ? {
          marketCap: isNvidia ? 3_100_000_000_000 : generatedMarketCap,
          pe: isNvidia ? 52 : 18 + (index % 28),
          revenue: isNvidia ? 126_000_000_000 : 4_000_000_000 + index * 850_000_000,
          profit: isNvidia ? 72_000_000_000 : 400_000_000 + index * 120_000_000,
          grossMargin: isNvidia ? 0.74 : 0.28 + (index % 30) / 100,
          currency: seed.country === 'CN' ? 'CNY' : 'USD',
        }
      : undefined,
    privateMetrics:
      seed.type === 'private'
        ? {
            valuation: seed.id === 'openai' ? 150_000_000_000 : privateValuation ?? 'Not disclosed',
            fundingRounds: [{ round: 'Growth', amount: 300_000_000 + index * 10_000_000, date: '2025-10' }],
            keyInvestors: seed.region === 'china' ? ['Strategic funds', 'Industrial capital'] : ['Strategic investors', 'Venture funds'],
          }
        : undefined,
    aiBusiness: {
      coreProducts: seed.coreProducts,
      layerIds: seed.layerIds,
      aiRevenueShare: isNvidia ? 0.86 : Math.min(0.15 + (index % 8) * 0.09, 0.82),
      strategicPosition:
        isNvidia
          ? nvidiaDetails.strategicPosition
          : {
              en: `${seed.en} contributes to ${primaryLayer?.name.en ?? 'the AI stack'} through ${seed.coreProducts.join(', ')}.`,
              zh: `${seed.zh}通过${seed.coreProducts.join('、')}参与${primaryLayer?.name.zh ?? 'AI 产业链'}。`,
            },
      moats: isNvidia
        ? nvidiaDetails.moats
        : [
            { type: '领域深度', description: `围绕 ${seed.coreProducts[0]} 形成专门能力。` },
            { type: '客户入口', description: '已嵌入关键 AI 客户的工作流和采购路径。' },
          ],
      risks: isNvidia
        ? nvidiaDetails.risks
        : [
            { type: '周期', description: 'AI 资本开支周期可能改变订单节奏。' },
            { type: '竞争', description: '相邻环节玩家可能向本层纵向整合。' },
          ],
      futureOpportunities: isNvidia ? nvidiaDetails.futureOpportunities : ['Inference optimization', 'China/global demand split', 'Vertical integration'],
    },
    visualIdentity: {
      size: isNvidia ? 1.8 : 0.75 + (index % 7) * 0.08,
      glowIntensity: isNvidia ? 1.0 : 0.35 + (index % 6) * 0.08,
      color: isNvidia ? '#76b900' : primaryLayer?.visualIdentity.color,
    },
    _meta: {
      dataSource: 'illustrative-demo',
      lastUpdated,
    },
  };
};

export const companies: Company[] = seeds.map(buildCompany);
export const getCompanyById = (id: string) => companies.find((company) => company.id === id);
export const companiesByLayer = (layerId: string) => companies.filter((company) => company.aiBusiness.layerIds.includes(layerId));
