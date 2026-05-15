/**
 * Source-backed timeline milestones.
 * Keep this list manually curated. Do not generate derivative timeline events.
 * Last reviewed: 2026-05-15.
 */
import type { TimelineCategory, TimelineEvent } from '../../types/timeline';

const categoryColor: Record<TimelineCategory, string> = {
  model: '#4f8cff',
  hardware: '#0ea5e9',
  infra: '#7c3aed',
  application: '#14b8a6',
  capital: '#f59e0b',
  policy: '#64748b',
};

const events: TimelineEvent[] = [
  {
    id: 'alexnet-2012',
    year: 2012,
    title: {
      en: 'AlexNet shows the impact of GPU-trained deep convolutional networks',
      zh: 'AlexNet 展示 GPU 训练深度卷积网络的突破性效果',
    },
    description: {
      en: 'Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton published the NeurIPS 2012 paper that made GPU-trained deep CNNs a turning point for computer vision.',
      zh: 'Alex Krizhevsky、Ilya Sutskever 和 Geoffrey Hinton 的 NeurIPS 2012 论文，让 GPU 训练的深度卷积网络成为计算机视觉路线的重要转折点。',
    },
    category: 'model',
    region: 'global',
    importance: 5,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['chip-design', 'foundation-models'],
    sources: [
      {
        label: 'NeurIPS Proceedings',
        url: 'https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'transformer-2017',
    year: 2017,
    month: 6,
    title: {
      en: 'Transformer architecture is introduced',
      zh: 'Transformer 架构被提出',
    },
    description: {
      en: 'The paper "Attention Is All You Need" introduced the Transformer, replacing recurrence and convolution with an attention-based architecture.',
      zh: '论文《Attention Is All You Need》提出 Transformer，用基于注意力机制的架构替代循环和卷积，成为后续大模型的核心基础。',
    },
    category: 'model',
    region: 'global',
    importance: 5,
    linkedCompanyIds: ['google-deepmind'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'arXiv:1706.03762',
        url: 'https://arxiv.org/abs/1706.03762',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'word2vec-2013',
    year: 2013,
    month: 1,
    title: {
      en: 'word2vec makes efficient neural word embeddings practical',
      zh: 'word2vec 让高效神经词向量成为主流工具',
    },
    description: {
      en: 'The word2vec paper proposed efficient architectures for learning continuous word representations from very large text corpora.',
      zh: 'word2vec 论文提出从大规模文本中高效学习连续词向量的模型架构，成为后续语义表示和搜索推荐系统的重要基础。',
    },
    category: 'model',
    region: 'us',
    importance: 3,
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'arXiv:1301.3781',
        url: 'https://arxiv.org/abs/1301.3781',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'gan-2014',
    year: 2014,
    title: {
      en: 'Generative adversarial networks are introduced',
      zh: '生成对抗网络 GAN 被提出',
    },
    description: {
      en: 'The NeurIPS 2014 GAN paper introduced adversarial training between a generator and discriminator, opening a major path for generative modeling.',
      zh: 'NeurIPS 2014 的 GAN 论文提出生成器与判别器对抗训练框架，为生成式建模打开了重要路线。',
    },
    category: 'model',
    region: 'global',
    importance: 4,
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'NeurIPS Proceedings',
        url: 'https://papers.nips.cc/paper_files/paper/2014/hash/f033ed80deb0234979a61f95710dbe25-Abstract.html',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'resnet-2015',
    year: 2015,
    month: 12,
    title: {
      en: 'ResNet establishes residual learning for very deep networks',
      zh: 'ResNet 确立深层网络的残差学习范式',
    },
    description: {
      en: 'ResNet introduced residual connections and became a foundation for training very deep visual recognition models.',
      zh: 'ResNet 通过残差连接降低深层网络训练难度，成为计算机视觉和后续模型结构中的基础范式之一。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'arXiv:1512.03385',
        url: 'https://arxiv.org/abs/1512.03385',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'alphago-2016',
    year: 2016,
    month: 1,
    title: {
      en: 'AlphaGo combines deep neural networks with tree search',
      zh: 'AlphaGo 将深度神经网络与树搜索结合',
    },
    description: {
      en: 'Nature published DeepMind’s AlphaGo work, combining policy networks, value networks, reinforcement learning, and Monte Carlo tree search for Go.',
      zh: 'Nature 发表 DeepMind 的 AlphaGo 论文，将策略网络、价值网络、强化学习与蒙特卡洛树搜索结合，用于围棋系统。',
    },
    category: 'application',
    region: 'eu',
    importance: 4,
    linkedCompanyIds: ['google-deepmind'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Nature',
        url: 'https://www.nature.com/articles/nature16961',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'google-tpu-2016',
    year: 2016,
    month: 5,
    title: {
      en: 'Google discloses Tensor Processing Units',
      zh: 'Google 披露 Tensor Processing Unit 专用芯片',
    },
    description: {
      en: 'Google announced TPU, a custom ASIC built specifically for machine learning and deployed in its data centers.',
      zh: 'Google 宣布 TPU，这是一种面向机器学习任务定制的 ASIC，并已部署在其数据中心内。',
    },
    category: 'hardware',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['google-cloud'],
    linkedLayerIds: ['chip-design', 'cloud-platform'],
    sources: [
      {
        label: 'Google Cloud',
        url: 'https://cloud.google.com/blog/products/ai-machine-learning/google-supercharges-machine-learning-tasks-with-custom-chip',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'china-ai-plan-2017',
    year: 2017,
    month: 7,
    title: {
      en: 'China issues the New Generation Artificial Intelligence Development Plan',
      zh: '国务院印发《新一代人工智能发展规划》',
    },
    description: {
      en: 'China’s State Council issued a national AI development plan, setting a policy framework for AI research, industry, and governance.',
      zh: '国务院发布国家级人工智能发展规划，为中国 AI 科研、产业和治理建立政策框架。',
    },
    category: 'policy',
    region: 'china',
    importance: 4,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: '中国政府网',
        url: 'https://app.www.gov.cn/govdata/gov/201707/20/408540/article.html',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'bert-2018',
    year: 2018,
    month: 10,
    title: {
      en: 'BERT advances bidirectional language pretraining',
      zh: 'BERT 推进双向语言预训练',
    },
    description: {
      en: 'BERT introduced deep bidirectional Transformer pretraining and achieved state-of-the-art results across multiple NLP benchmarks.',
      zh: 'BERT 引入深度双向 Transformer 预训练，并在多项自然语言处理任务上刷新基准表现。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['google-deepmind'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'arXiv:1810.04805',
        url: 'https://arxiv.org/abs/1810.04805',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'microsoft-openai-2019',
    year: 2019,
    month: 7,
    title: {
      en: 'Microsoft invests $1B in OpenAI and becomes its exclusive cloud provider',
      zh: 'Microsoft 投资 OpenAI 10 亿美元并成为其独家云提供方',
    },
    description: {
      en: 'OpenAI announced a $1 billion Microsoft investment and an Azure partnership to build large-scale AI supercomputing technologies.',
      zh: 'OpenAI 宣布 Microsoft 投资 10 亿美元，并围绕 Azure 建设大规模 AI 超算技术展开合作。',
    },
    category: 'capital',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['openai', 'microsoft-azure'],
    linkedLayerIds: ['cloud-platform', 'foundation-models'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/microsoft-invests-in-and-partners-with-openai/',
      },
    ],
    visualIdentity: { color: categoryColor.capital },
  },
  {
    id: 'gpt3-2020',
    year: 2020,
    month: 5,
    title: {
      en: 'GPT-3 demonstrates large-scale few-shot language modeling',
      zh: 'GPT-3 展示大规模少样本语言模型能力',
    },
    description: {
      en: 'OpenAI’s GPT-3 paper described a 175B-parameter autoregressive language model evaluated through text interaction without task-specific fine-tuning.',
      zh: 'OpenAI 的 GPT-3 论文描述了 1750 亿参数自回归语言模型，并展示了无需任务特定微调的少样本能力。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'arXiv:2005.14165',
        url: 'https://arxiv.org/abs/2005.14165',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'alphafold2-2020',
    year: 2020,
    month: 11,
    title: {
      en: 'AlphaFold2 is recognised as a protein-folding breakthrough',
      zh: 'AlphaFold2 被认可为蛋白质折叠突破',
    },
    description: {
      en: 'At CASP14, AlphaFold2 was recognised by organisers as a solution to the long-standing protein-folding problem after achieving atomic-level accuracy.',
      zh: '在 CASP14 中，AlphaFold2 以接近原子级精度预测蛋白质结构，被主办方认可为蛋白质折叠问题的重要突破。',
    },
    category: 'application',
    region: 'eu',
    importance: 5,
    linkedCompanyIds: ['google-deepmind'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Google DeepMind',
        url: 'https://deepmind.google/science/alphafold/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'clip-2021',
    year: 2021,
    month: 1,
    title: {
      en: 'CLIP connects text and images through contrastive pretraining',
      zh: 'CLIP 通过对比预训练连接文本与图像',
    },
    description: {
      en: 'OpenAI introduced CLIP, showing that natural language supervision could support transferable visual recognition capabilities.',
      zh: 'OpenAI 发布 CLIP，展示自然语言监督可以支撑具备迁移能力的视觉识别模型。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/clip/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'github-copilot-2021',
    year: 2021,
    month: 6,
    title: {
      en: 'GitHub Copilot launches as an AI pair-programmer preview',
      zh: 'GitHub Copilot 以 AI 结对编程预览版发布',
    },
    description: {
      en: 'GitHub launched Copilot as a technical preview powered by OpenAI Codex, bringing code completion into mainstream developer workflows.',
      zh: 'GitHub 发布由 OpenAI Codex 驱动的 Copilot 技术预览版，让代码生成进入主流开发者工作流。',
    },
    category: 'application',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['openai', 'microsoft-copilot'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'GitHub Blog',
        url: 'https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'h100-hopper-2022',
    year: 2022,
    month: 3,
    title: {
      en: 'NVIDIA announces Hopper architecture and H100 GPU',
      zh: 'NVIDIA 发布 Hopper 架构与 H100 GPU',
    },
    description: {
      en: 'NVIDIA announced Hopper and the H100 GPU, including a Transformer Engine for large AI language models and other accelerated workloads.',
      zh: 'NVIDIA 发布 Hopper 架构与 H100 GPU，并将 Transformer Engine 等能力纳入面向大模型的加速硬件路线。',
    },
    category: 'hardware',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['chip-design', 'hbm-memory'],
    sources: [
      {
        label: 'NVIDIA Newsroom',
        url: 'https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'stable-diffusion-2022',
    year: 2022,
    month: 8,
    title: {
      en: 'Stable Diffusion is publicly released',
      zh: 'Stable Diffusion 面向公众发布',
    },
    description: {
      en: 'Stability AI announced the public release of Stable Diffusion, accelerating accessible text-to-image generation and local model experimentation.',
      zh: 'Stability AI 宣布 Stable Diffusion 公开发布，推动文生图模型走向更开放的使用和本地实验。',
    },
    category: 'application',
    region: 'eu',
    importance: 4,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Stability AI',
        url: 'https://stability.ai/news/stable-diffusion-public-release',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'aws-trainium-trn1-2022',
    year: 2022,
    month: 10,
    title: {
      en: 'AWS makes Trainium-powered Trn1 instances generally available',
      zh: 'AWS Trainium 驱动的 Trn1 实例正式可用',
    },
    description: {
      en: 'AWS announced general availability of EC2 Trn1 instances powered by AWS-designed Trainium chips for cloud model training workloads.',
      zh: 'AWS 宣布由自研 Trainium 芯片驱动的 EC2 Trn1 实例正式可用，面向云端模型训练负载。',
    },
    category: 'hardware',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['aws'],
    linkedLayerIds: ['chip-design', 'cloud-platform'],
    sources: [
      {
        label: 'Amazon Press Center',
        url: 'https://press.aboutamazon.com/2022/10/aws-announces-general-availability-of-amazon-ec2-trn1-instances-powered-by-aws-designed-trainium-chips',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'chatgpt-2022',
    year: 2022,
    month: 11,
    title: {
      en: 'OpenAI introduces ChatGPT',
      zh: 'OpenAI 发布 ChatGPT',
    },
    description: {
      en: 'OpenAI introduced ChatGPT as a research release for conversational interaction, making generative AI a mainstream product experience.',
      zh: 'OpenAI 以研究发布形式推出 ChatGPT，让对话式生成 AI 成为大众可直接体验的产品入口。',
    },
    category: 'application',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/chatgpt/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'gpt4-2023',
    year: 2023,
    month: 3,
    title: {
      en: 'OpenAI announces GPT-4',
      zh: 'OpenAI 发布 GPT-4',
    },
    description: {
      en: 'OpenAI announced GPT-4 as a large multimodal model accepting image and text inputs and emitting text outputs.',
      zh: 'OpenAI 发布 GPT-4，并将其描述为可接受图像和文本输入、输出文本的大型多模态模型。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/gpt-4-research/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'ernie-bot-2023',
    year: 2023,
    month: 3,
    title: {
      en: 'Baidu introduces ERNIE Bot',
      zh: '百度发布文心一言 ERNIE Bot',
    },
    description: {
      en: 'Baidu introduced ERNIE Bot, a knowledge-enhanced large language model and generative AI product built on Baidu’s AI stack.',
      zh: '百度发布文心一言 ERNIE Bot，这是基于百度 AI 技术栈构建的知识增强大语言模型和生成式 AI 产品。',
    },
    category: 'model',
    region: 'china',
    importance: 4,
    linkedCompanyIds: ['baidu-ernie'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Baidu Research',
        url: 'https://research.baidu.com/Blog/index-view?id=183',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'google-vertex-genai-2023',
    year: 2023,
    month: 5,
    title: {
      en: 'Google Cloud opens Generative AI Studio and Model Garden in Vertex AI',
      zh: 'Google Cloud 在 Vertex AI 中开放生成式 AI Studio 与模型园',
    },
    description: {
      en: 'Google Cloud expanded Vertex AI with foundation models, Model Garden, and Generative AI Studio for enterprise model development.',
      zh: 'Google Cloud 扩展 Vertex AI，提供基础模型、Model Garden 与 Generative AI Studio，服务企业生成式 AI 开发。',
    },
    category: 'infra',
    region: 'us',
    importance: 3,
    linkedCompanyIds: ['google-cloud'],
    linkedLayerIds: ['cloud-platform', 'ai-infra-agent-framework'],
    sources: [
      {
        label: 'Google Cloud',
        url: 'https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-launches-new-ai-models-opens-generative-ai-studio',
      },
    ],
    visualIdentity: { color: categoryColor.infra },
  },
  {
    id: 'dgx-gh200-2023',
    year: 2023,
    month: 5,
    title: {
      en: 'NVIDIA announces DGX GH200 AI supercomputer',
      zh: 'NVIDIA 发布 DGX GH200 AI 超级计算机',
    },
    description: {
      en: 'NVIDIA announced DGX GH200, connecting 256 Grace Hopper Superchips into a large-memory AI supercomputer for giant generative AI models.',
      zh: 'NVIDIA 发布 DGX GH200，将 256 个 Grace Hopper Superchip 连接为大内存 AI 超级计算机，面向巨型生成式 AI 模型。',
    },
    category: 'hardware',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['chip-design', 'servers-networking'],
    sources: [
      {
        label: 'NVIDIA Investor Relations',
        url: 'https://investor.nvidia.com/news/press-release-details/2023/NVIDIA-Announces-DGX-GH200-AI-Supercomputer/default.aspx',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'databricks-mosaicml-2023',
    year: 2023,
    month: 6,
    title: {
      en: 'Databricks agrees to acquire MosaicML for $1.3B',
      zh: 'Databricks 以约 13 亿美元收购 MosaicML',
    },
    description: {
      en: 'Databricks signed an agreement to acquire MosaicML, reinforcing the market for enterprise-owned generative AI model building.',
      zh: 'Databricks 签署收购 MosaicML 的协议，强化企业自有数据训练和部署生成式 AI 模型的基础设施版图。',
    },
    category: 'capital',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['databricks'],
    linkedLayerIds: ['ai-infra-agent-framework', 'foundation-models'],
    sources: [
      {
        label: 'Databricks',
        url: 'https://www.databricks.com/company/newsroom/press-releases/databricks-signs-definitive-agreement-acquire-mosaicml-leading-generative-ai-platform',
      },
    ],
    visualIdentity: { color: categoryColor.capital },
  },
  {
    id: 'llama2-2023',
    year: 2023,
    month: 7,
    title: {
      en: 'Meta releases Llama 2 for research and commercial use',
      zh: 'Meta 发布 Llama 2 并开放研究与商业使用',
    },
    description: {
      en: 'Meta announced Llama 2 with model weights and starting code available free of charge for research and commercial use.',
      zh: 'Meta 发布 Llama 2，并宣布为研究和商业使用免费提供模型权重与起始代码。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['meta-ai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'Meta',
        url: 'https://about.fb.com/news/2023/07/llama-2/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'amazon-anthropic-2023',
    year: 2023,
    month: 9,
    title: {
      en: 'Amazon and Anthropic announce a strategic collaboration',
      zh: 'Amazon 与 Anthropic 宣布战略合作',
    },
    description: {
      en: 'Amazon announced a strategic collaboration with Anthropic, with Anthropic selecting AWS as its primary cloud provider and using Trainium and Inferentia chips.',
      zh: 'Amazon 宣布与 Anthropic 达成战略合作，Anthropic 选择 AWS 作为主要云提供方，并使用 Trainium 与 Inferentia 芯片。',
    },
    category: 'capital',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['aws', 'anthropic'],
    linkedLayerIds: ['cloud-platform', 'foundation-models', 'chip-design'],
    sources: [
      {
        label: 'Amazon Press Center',
        url: 'https://press.aboutamazon.com/2023/9/amazon-and-anthropic-announce-strategic-collaboration-to-advance-generative-ai',
      },
    ],
    visualIdentity: { color: categoryColor.capital },
  },
  {
    id: 'mistral-7b-2023',
    year: 2023,
    month: 9,
    title: {
      en: 'Mistral AI releases Mistral 7B under Apache 2.0',
      zh: 'Mistral AI 以 Apache 2.0 发布 Mistral 7B',
    },
    description: {
      en: 'Mistral AI released Mistral 7B, a 7.3B-parameter open model using grouped-query and sliding-window attention.',
      zh: 'Mistral AI 发布 73 亿参数的 Mistral 7B 开放模型，采用 grouped-query attention 和 sliding-window attention。',
    },
    category: 'model',
    region: 'eu',
    importance: 4,
    linkedCompanyIds: ['mistral'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'Mistral AI',
        url: 'https://mistral.ai/news/announcing-mistral-7b',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'amazon-bedrock-ga-2023',
    year: 2023,
    month: 9,
    title: {
      en: 'Amazon Bedrock becomes generally available',
      zh: 'Amazon Bedrock 正式可用',
    },
    description: {
      en: 'AWS made Bedrock generally available as a managed service for building generative AI applications with multiple foundation model providers.',
      zh: 'AWS 宣布 Bedrock 正式可用，作为托管服务接入多个基础模型提供方，用于构建生成式 AI 应用。',
    },
    category: 'infra',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['aws', 'anthropic', 'meta-ai'],
    linkedLayerIds: ['cloud-platform', 'ai-infra-agent-framework', 'foundation-models'],
    sources: [
      {
        label: 'AWS',
        url: 'https://aws.amazon.com/about-aws/whats-new/2023/09/amazon-bedrock-generally-available/',
      },
    ],
    visualIdentity: { color: categoryColor.infra },
  },
  {
    id: 'gemini-2023',
    year: 2023,
    month: 12,
    title: {
      en: 'Google introduces Gemini',
      zh: 'Google 发布 Gemini',
    },
    description: {
      en: 'Google introduced Gemini as its most capable AI model family and began bringing Gemini Pro to Google AI Studio and Vertex AI.',
      zh: 'Google 发布 Gemini 模型系列，并开始通过 Google AI Studio 与 Vertex AI 向开发者和企业客户开放 Gemini Pro。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['google-deepmind', 'google-cloud'],
    linkedLayerIds: ['foundation-models', 'cloud-platform'],
    sources: [
      {
        label: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'china-generative-ai-measures-2023',
    year: 2023,
    month: 8,
    title: {
      en: 'China’s interim measures for generative AI services take effect',
      zh: '《生成式人工智能服务管理暂行办法》施行',
    },
    description: {
      en: 'China’s CAC and six other regulators issued interim measures for public generative AI services, effective August 15, 2023.',
      zh: '国家网信办等七部门发布生成式人工智能服务管理暂行办法，并于 2023 年 8 月 15 日起施行。',
    },
    category: 'policy',
    region: 'china',
    importance: 4,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: '中国网信网',
        url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'claude3-2024',
    year: 2024,
    month: 3,
    title: {
      en: 'Anthropic launches the Claude 3 model family',
      zh: 'Anthropic 发布 Claude 3 模型家族',
    },
    description: {
      en: 'Anthropic announced Claude 3 Haiku, Sonnet, and Opus, including stronger long-context and vision capabilities for enterprise workloads.',
      zh: 'Anthropic 发布 Claude 3 Haiku、Sonnet 与 Opus，强化长上下文、视觉理解和企业工作负载能力。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['anthropic'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Anthropic',
        url: 'https://www.anthropic.com/news/claude-3-family',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'llama3-2024',
    year: 2024,
    month: 4,
    title: {
      en: 'Meta AI assistant is rebuilt with Llama 3',
      zh: 'Meta AI 助手基于 Llama 3 升级',
    },
    description: {
      en: 'Meta announced an updated Meta AI assistant built with Llama 3 and expanded access across its consumer apps and web experience.',
      zh: 'Meta 发布基于 Llama 3 的新版 Meta AI 助手，并扩展到旗下消费应用和网页体验。',
    },
    category: 'application',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['meta-ai'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Meta',
        url: 'https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'alphafold3-2024',
    year: 2024,
    month: 5,
    title: {
      en: 'AlphaFold 3 expands structure prediction to molecular interactions',
      zh: 'AlphaFold 3 将结构预测扩展到分子相互作用',
    },
    description: {
      en: 'Google DeepMind and Isomorphic Labs introduced AlphaFold 3 to predict the structure and interactions of life’s molecules.',
      zh: 'Google DeepMind 与 Isomorphic Labs 发布 AlphaFold 3，用于预测生命分子的结构及其相互作用。',
    },
    category: 'application',
    region: 'eu',
    importance: 4,
    linkedCompanyIds: ['google-deepmind'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Google DeepMind',
        url: 'https://deepmind.google/science/alphafold/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'gpt4o-2024',
    year: 2024,
    month: 5,
    title: {
      en: 'OpenAI introduces GPT-4o',
      zh: 'OpenAI 发布 GPT-4o',
    },
    description: {
      en: 'OpenAI introduced GPT-4o as a faster flagship model with GPT-4-level intelligence across text, voice, and vision.',
      zh: 'OpenAI 发布 GPT-4o，将其定位为更快的旗舰模型，并提升文本、语音和视觉能力。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/gpt-4o-and-more-tools-to-chatgpt-free/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'eu-ai-act-2024',
    year: 2024,
    month: 5,
    title: {
      en: 'EU Council gives final green light to the AI Act',
      zh: '欧盟理事会最终批准《人工智能法案》',
    },
    description: {
      en: 'The Council of the EU approved the AI Act, a risk-based law intended to harmonise AI rules across the EU single market.',
      zh: '欧盟理事会批准《人工智能法案》，以风险分级方式统一欧盟单一市场内的 AI 规则。',
    },
    category: 'policy',
    region: 'eu',
    importance: 5,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Council of the EU',
        url: 'https://www.consilium.europa.eu/en/press/press-releases/2024/05/21/artificial-intelligence-ai-act-council-gives-final-green-light-to-the-first-worldwide-rules-on-ai/',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'sora-2024',
    year: 2024,
    month: 2,
    title: {
      en: 'OpenAI previews Sora text-to-video research',
      zh: 'OpenAI 预览 Sora 文生视频研究',
    },
    description: {
      en: 'OpenAI described Sora as a diffusion transformer for video and image generation, capable of high-definition video up to a minute.',
      zh: 'OpenAI 将 Sora 描述为面向视频和图像生成的 diffusion transformer，可生成最长约一分钟的高清视频。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/video-generation-models-as-world-simulators/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'blackwell-2024',
    year: 2024,
    month: 3,
    title: {
      en: 'NVIDIA announces Blackwell platform',
      zh: 'NVIDIA 发布 Blackwell 平台',
    },
    description: {
      en: 'NVIDIA announced the Blackwell platform for trillion-parameter-scale AI training and real-time inference, succeeding Hopper.',
      zh: 'NVIDIA 发布 Blackwell 平台，面向万亿参数级 AI 训练和实时推理，并作为 Hopper 后续架构推进。',
    },
    category: 'hardware',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['chip-design', 'hbm-memory'],
    sources: [
      {
        label: 'NVIDIA Newsroom',
        url: 'https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'apple-intelligence-2024',
    year: 2024,
    month: 6,
    title: {
      en: 'Apple introduces Apple Intelligence',
      zh: 'Apple 发布 Apple Intelligence',
    },
    description: {
      en: 'Apple introduced Apple Intelligence as a personal intelligence system integrated into iOS 18, iPadOS 18, and macOS Sequoia.',
      zh: 'Apple 发布 Apple Intelligence，将其定位为整合进 iOS 18、iPadOS 18 与 macOS Sequoia 的个人智能系统。',
    },
    category: 'application',
    region: 'us',
    importance: 4,
    linkedLayerIds: ['ai-applications', 'foundation-models'],
    sources: [
      {
        label: 'Apple Newsroom',
        url: 'https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'claude35-sonnet-2024',
    year: 2024,
    month: 6,
    title: {
      en: 'Anthropic releases Claude 3.5 Sonnet',
      zh: 'Anthropic 发布 Claude 3.5 Sonnet',
    },
    description: {
      en: 'Claude 3.5 Sonnet launched as the first Claude 3.5 model, improving reasoning, coding, and vision while retaining mid-tier speed and cost.',
      zh: 'Claude 3.5 Sonnet 作为 Claude 3.5 家族首个模型发布，在推理、编码和视觉能力上提升，同时保持中档模型的速度与成本。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['anthropic'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Anthropic',
        url: 'https://www.anthropic.com/news/claude-3-5-sonnet',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'llama31-2024',
    year: 2024,
    month: 7,
    title: {
      en: 'Meta releases Llama 3.1 405B',
      zh: 'Meta 发布 Llama 3.1 405B',
    },
    description: {
      en: 'Meta released Llama 3.1 405B with a 128K context length, broad partner support, and open availability for the developer ecosystem.',
      zh: 'Meta 发布 Llama 3.1 405B，支持 128K 上下文，并通过广泛生态伙伴面向开发者开放。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['meta-ai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'Meta AI',
        url: 'https://ai.meta.com/blog/meta-llama-3-1/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'openai-o1-2024',
    year: 2024,
    month: 9,
    title: {
      en: 'OpenAI releases o1-preview for reasoning-heavy tasks',
      zh: 'OpenAI 发布面向复杂推理的 o1-preview',
    },
    description: {
      en: 'OpenAI released o1-preview, highlighting reinforcement learning and additional test-time compute for stronger reasoning performance.',
      zh: 'OpenAI 发布 o1-preview，强调通过强化学习和更多测试时计算提升复杂推理能力。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/learning-to-reason-with-llms/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'qwen25-2024',
    year: 2024,
    month: 9,
    title: {
      en: 'Qwen2.5 expands Alibaba’s open-weight model family',
      zh: 'Qwen2.5 扩展阿里开源权重模型家族',
    },
    description: {
      en: 'The Qwen team released Qwen2.5, including general, coding, and math model variants across multiple parameter sizes.',
      zh: 'Qwen 团队发布 Qwen2.5，覆盖通用、代码和数学模型，并提供多个参数规模的开放权重版本。',
    },
    category: 'model',
    region: 'china',
    importance: 4,
    linkedCompanyIds: ['alibaba-cloud'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Qwen',
        url: 'https://qwenlm.github.io/blog/qwen2.5/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'stargate-2025',
    year: 2025,
    month: 1,
    title: {
      en: 'OpenAI and SoftBank announce the Stargate Project',
      zh: 'OpenAI 与 SoftBank 宣布 Stargate 项目',
    },
    description: {
      en: 'OpenAI announced Stargate, a company intending to invest $500B over four years in AI infrastructure for OpenAI in the United States.',
      zh: 'OpenAI 宣布 Stargate 项目，计划在四年内投入 5000 亿美元，为 OpenAI 在美国建设 AI 基础设施。',
    },
    category: 'capital',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai', 'nvidia', 'microsoft-azure'],
    linkedLayerIds: ['data-center', 'cloud-platform', 'servers-networking'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/announcing-the-stargate-project/',
      },
    ],
    visualIdentity: { color: categoryColor.capital },
  },
  {
    id: 'deepseek-r1-2025',
    year: 2025,
    month: 1,
    title: {
      en: 'DeepSeek-R1 highlights reinforcement-learning-driven reasoning models',
      zh: 'DeepSeek-R1 推动强化学习推理模型进入全球视野',
    },
    description: {
      en: 'DeepSeek released DeepSeek-R1 and open-sourced model weights, drawing global attention to reinforcement-learning-based reasoning models.',
      zh: 'DeepSeek 发布 DeepSeek-R1 并开源模型权重，使基于强化学习的推理模型成为全球 AI 产业讨论焦点。',
    },
    category: 'model',
    region: 'china',
    importance: 5,
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'DeepSeek GitHub',
        url: 'https://github.com/deepseek-ai/DeepSeek-R1',
      },
      {
        label: 'arXiv:2501.12948',
        url: 'https://arxiv.org/abs/2501.12948',
      },
      {
        label: 'TechTarget',
        url: 'https://www.techtarget.com/searchenterpriseai/news/366618674/Microsoft-AWS-and-Cerebras-launch-DeepSeek-R1-model',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'eu-ai-gigafactories-2026',
    year: 2026,
    month: 1,
    title: {
      en: 'EU Council paves the way for AI gigafactories',
      zh: '欧盟理事会为 AI Gigafactories 铺路',
    },
    description: {
      en: 'The Council of the EU adopted a regulation to support AI gigafactories through EuroHPC, turning sovereign compute capacity into an explicit AI industrial policy instrument.',
      zh: '欧盟理事会通过相关法规，依托 EuroHPC 支持 AI Gigafactories 建设，标志着主权算力成为欧洲 AI 产业政策的明确抓手。',
    },
    category: 'policy',
    region: 'eu',
    importance: 4,
    linkedLayerIds: ['data-center', 'cloud-platform', 'servers-networking'],
    sources: [
      {
        label: 'Council of the EU',
        url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/01/16/artificial-intelligence-council-paves-the-way-for-the-creation-of-ai-gigafactories/',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'un-ai-scientific-panel-2026',
    year: 2026,
    month: 2,
    title: {
      en: 'UN General Assembly appoints an independent scientific panel on AI',
      zh: '联合国大会任命独立国际 AI 科学小组',
    },
    description: {
      en: 'The UN General Assembly appointed 40 members to an independent international scientific panel on AI, creating a recurring evidence base for global AI governance.',
      zh: '联合国大会任命 40 名成员组成独立国际 AI 科学小组，为全球 AI 治理建立持续性的科学评估机制。',
    },
    category: 'policy',
    region: 'global',
    importance: 4,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'UNRIC',
        url: 'https://unric.org/en/general-assembly-appoints-artificial-intelligence-panel/',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'gemini-31-pro-2026',
    year: 2026,
    month: 2,
    title: {
      en: 'Google releases Gemini 3.1 Pro',
      zh: 'Google 发布 Gemini 3.1 Pro',
    },
    description: {
      en: 'Google released Gemini 3.1 Pro across consumer, developer, and enterprise channels, positioning it as the upgraded core intelligence for complex reasoning tasks.',
      zh: 'Google 发布 Gemini 3.1 Pro，并面向消费端、开发者和企业渠道推出，将其定位为面向复杂推理任务的核心能力升级。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['google-deepmind', 'google-cloud'],
    linkedLayerIds: ['foundation-models', 'ai-applications', 'cloud-platform'],
    sources: [
      {
        label: 'Google Blog',
        url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/',
      },
      {
        label: 'Google DeepMind Model Card',
        url: 'https://deepmind.google/models/model-cards/gemini-3-1-pro/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'openai-amazon-2026',
    year: 2026,
    month: 2,
    title: {
      en: 'OpenAI and Amazon announce a strategic infrastructure partnership',
      zh: 'OpenAI 与 Amazon 宣布战略基础设施合作',
    },
    description: {
      en: 'OpenAI and Amazon announced a multi-year partnership, with AWS providing infrastructure for OpenAI workloads and Amazon making a major investment in OpenAI.',
      zh: 'OpenAI 与 Amazon 宣布多年战略合作，AWS 将为 OpenAI 核心工作负载提供基础设施，Amazon 同时对 OpenAI 进行大额投资。',
    },
    category: 'infra',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai', 'aws'],
    linkedLayerIds: ['cloud-platform', 'data-center', 'servers-networking'],
    sources: [
      {
        label: 'Amazon Press Center',
        url: 'https://press.aboutamazon.com/2026/2/openai-and-amazon-announce-strategic-partnership',
      },
      {
        label: 'AWS',
        url: 'https://www.aboutamazon.com/news/aws/aws-open-ai-workloads-compute-infrastructure',
      },
    ],
    visualIdentity: { color: categoryColor.infra },
  },
  {
    id: 'vera-rubin-2026',
    year: 2026,
    month: 3,
    title: {
      en: 'NVIDIA Vera Rubin platform enters full production',
      zh: 'NVIDIA Vera Rubin 平台进入 full production',
    },
    description: {
      en: 'NVIDIA announced the Vera Rubin rack-scale platform in full production, integrating compute, networking, storage, and inference acceleration for next-generation AI factories.',
      zh: 'NVIDIA 宣布 Vera Rubin 机架级平台进入 full production，将计算、网络、存储和推理加速整合为面向下一代 AI Factory 的系统。',
    },
    category: 'hardware',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['chip-design', 'servers-networking', 'data-center'],
    sources: [
      {
        label: 'NVIDIA Investor Relations',
        url: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Vera-Rubin-Opens-Agentic-AI-Frontier/default.aspx',
      },
    ],
    visualIdentity: { color: categoryColor.hardware },
  },
  {
    id: 'physical-ai-industrial-2026',
    year: 2026,
    month: 3,
    title: {
      en: 'Physical AI moves from demos toward industrial deployment',
      zh: 'Physical AI 从展示走向工业部署',
    },
    description: {
      en: 'NVIDIA expanded its robotics ecosystem with Cosmos, Isaac, and GR00T models, while Siemens and NVIDIA framed industrial AI as an operating layer for factories and supply chains.',
      zh: 'NVIDIA 扩展 Cosmos、Isaac 和 GR00T 等机器人生态，Siemens 与 NVIDIA 则把工业 AI 推向工厂和供应链的操作系统层。',
    },
    category: 'application',
    region: 'global',
    importance: 4,
    linkedCompanyIds: ['nvidia'],
    linkedLayerIds: ['autonomous-robotics-ai-native-software', 'ai-applications'],
    sources: [
      {
        label: 'NVIDIA Newsroom',
        url: 'https://nvidianews.nvidia.com/news/nvidia-and-global-robotics-leaders-take-physical-ai-to-the-real-world',
      },
      {
        label: 'Siemens',
        url: 'https://press.siemens.com/global/en/event/siemens-ces-2026-industrial-ai-takes-center-stage',
      },
    ],
    visualIdentity: { color: categoryColor.application },
  },
  {
    id: 'gpt55-2026',
    year: 2026,
    month: 4,
    title: {
      en: 'OpenAI releases GPT-5.5',
      zh: 'OpenAI 发布 GPT-5.5',
    },
    description: {
      en: 'OpenAI released GPT-5.5 for complex professional work, highlighting stronger coding, tool use, computer use, and long-horizon agentic workflows.',
      zh: 'OpenAI 发布 GPT-5.5，强调其在复杂专业工作、编码、工具使用、计算机操作和长任务智能体工作流上的能力提升。',
    },
    category: 'model',
    region: 'us',
    importance: 5,
    linkedCompanyIds: ['openai'],
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'OpenAI',
        url: 'https://openai.com/index/introducing-gpt-5-5/',
      },
      {
        label: 'OpenAI API',
        url: 'https://developers.openai.com/api/docs/models/gpt-5.5',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'claude-opus-47-2026',
    year: 2026,
    month: 4,
    title: {
      en: 'Anthropic releases Claude Opus 4.7',
      zh: 'Anthropic 发布 Claude Opus 4.7',
    },
    description: {
      en: 'Anthropic released Claude Opus 4.7 across Claude products, its API, Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry, emphasizing coding and long-running work.',
      zh: 'Anthropic 发布 Claude Opus 4.7，并覆盖 Claude 产品、API、Amazon Bedrock、Google Cloud Vertex AI 和 Microsoft Foundry，重点面向编码和长任务工作流。',
    },
    category: 'model',
    region: 'us',
    importance: 4,
    linkedCompanyIds: ['anthropic'],
    linkedLayerIds: ['foundation-models', 'ai-applications', 'cloud-platform'],
    sources: [
      {
        label: 'Anthropic',
        url: 'https://www.anthropic.com/news/claude-opus-4-7',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'deepseek-v4-2026',
    year: 2026,
    month: 4,
    title: {
      en: 'DeepSeek-V4 reaches the API and transparency center',
      zh: 'DeepSeek-V4 进入 API 与透明度中心',
    },
    description: {
      en: 'DeepSeek listed DeepSeek-V4 in its transparency center and added V4-Pro and V4-Flash support to the API, extending China’s open model competition into the 2026 cycle.',
      zh: 'DeepSeek 在透明度中心列出 DeepSeek-V4，并在 API 中支持 V4-Pro 与 V4-Flash，使中国开源与低成本模型竞争延续到 2026 周期。',
    },
    category: 'model',
    region: 'china',
    importance: 5,
    linkedLayerIds: ['foundation-models'],
    sources: [
      {
        label: 'DeepSeek Transparency',
        url: 'https://www.deepseek.com/en/transparency/',
      },
      {
        label: 'DeepSeek API Docs',
        url: 'https://api-docs.deepseek.com/updates/',
      },
    ],
    visualIdentity: { color: categoryColor.model },
  },
  {
    id: 'china-agent-governance-2026',
    year: 2026,
    month: 5,
    title: {
      en: 'China issues implementation guidance for AI agent development and governance',
      zh: '中国发布智能体规范应用与创新发展实施意见',
    },
    description: {
      en: 'China’s cyberspace regulator and partner agencies issued guidance for AI agents, covering standards, toolchains, identity, safety, risk controls, and application pilots.',
      zh: '国家网信办等部门发布智能体相关实施意见，覆盖标准体系、工具链、身份标识、安全防护、分级治理和应用试点。',
    },
    category: 'policy',
    region: 'china',
    importance: 4,
    linkedLayerIds: ['ai-infra-agent-framework', 'ai-applications'],
    sources: [
      {
        label: '中国网信网',
        url: 'https://www.cac.gov.cn/2026-05/08/c_1779979789523320.htm',
      },
    ],
    visualIdentity: { color: categoryColor.policy },
  },
  {
    id: 'isomorphic-series-b-2026',
    year: 2026,
    month: 5,
    title: {
      en: 'Isomorphic Labs raises $2.1B for AI drug discovery',
      zh: 'Isomorphic Labs 为 AI 药物发现融资 21 亿美元',
    },
    description: {
      en: 'Isomorphic Labs raised $2.1B in Series B funding to scale its AI drug design engine and advance its drug candidate pipeline toward clinical development.',
      zh: 'Isomorphic Labs 完成 21 亿美元 B 轮融资，用于扩展 AI 药物设计引擎，并推进候选药物管线向临床开发阶段前进。',
    },
    category: 'capital',
    region: 'eu',
    importance: 4,
    linkedLayerIds: ['foundation-models', 'ai-applications'],
    sources: [
      {
        label: 'Isomorphic Labs',
        url: 'https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-series-b-investment-round',
      },
    ],
    visualIdentity: { color: categoryColor.capital },
  },
];

export const timelineEvents: TimelineEvent[] = events.sort(
  (a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0) || b.importance - a.importance,
);
