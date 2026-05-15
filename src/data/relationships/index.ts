/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { EntityRef } from '../../types/common';
import type { Relationship, RelationshipType } from '../../types/relationship';
import { companies, companiesByLayer } from '../companies';
import { layers } from '../layers';

let sequence = 0;

const rel = (
  from: EntityRef,
  to: EntityRef,
  type: RelationshipType,
  strength: Relationship['strength'] = 3,
  bidirectional = false,
  description?: Relationship['description'],
  valueFlow?: Relationship['valueFlow'],
): Relationship => ({
  id: `rel-${String(sequence++).padStart(4, '0')}-${from.id}-${to.id}-${type}`,
  from,
  to,
  type,
  strength,
  bidirectional,
  description,
  valueFlow,
  _meta: { dataSource: 'illustrative-demo' },
});

const company = (id: string): EntityRef => ({ type: 'company', id });
const layer = (id: string): EntityRef => ({ type: 'layer', id });

const strategicRelationships: Relationship[] = [
  rel(company('tsmc'), company('nvidia'), 'supplier', 5, false, {
    en: 'TSMC manufactures leading-edge AI accelerators for NVIDIA.',
    zh: 'TSMC 为 NVIDIA 制造先进 AI 加速器。',
  }),
  rel(company('sk-hynix'), company('nvidia'), 'supplier', 5, false, {
    en: 'SK Hynix supplies high bandwidth memory used in AI accelerators.',
    zh: 'SK 海力士供应 AI 加速器所需 HBM。',
  }),
  rel(company('ase'), company('nvidia'), 'supplier', 3, false, {
    en: 'Advanced packaging capacity supports AI accelerator assembly.',
    zh: '先进封装能力支撑 AI 加速器组装。',
  }),
  rel(company('aws'), company('nvidia'), 'customer', 5, false, {
    en: 'AWS buys GPU systems and offers them as cloud AI capacity.',
    zh: 'AWS 采购 GPU 系统并转化为云端 AI 算力。',
  }),
  rel(company('openai'), company('nvidia'), 'customer', 5, false, {
    en: 'OpenAI consumes large-scale accelerator capacity for training and inference.',
    zh: 'OpenAI 消耗大规模加速器算力用于训练和推理。',
  }),
  rel(company('tesla'), company('nvidia'), 'customer', 4, false, {
    en: 'Tesla uses accelerator capacity across autonomy and simulation workloads.',
    zh: 'Tesla 在自动驾驶和仿真负载中使用加速器能力。',
  }),
  rel(company('microsoft-azure'), company('openai'), 'cloud-partner', 5, true, {
    en: 'Azure hosts strategic OpenAI workloads and product integrations.',
    zh: 'Azure 承载 OpenAI 的战略工作负载和产品集成。',
  }),
  rel(company('microsoft-azure'), company('nvidia'), 'customer', 5, false, {
    en: 'Azure converts GPU capex into managed AI platform revenue.',
    zh: 'Azure 将 GPU 资本开支转化为托管 AI 平台收入。',
  }),
  rel(company('nvidia'), company('amd'), 'competitor', 5, true, {
    en: 'Both compete in AI accelerators and software ecosystems.',
    zh: '双方在 AI 加速器与软件生态上竞争。',
  }),
  rel(company('huawei-hisilicon'), company('nvidia'), 'competitor', 4, true, {
    en: 'China AI accelerator substitution paths benchmark NVIDIA.',
    zh: '中国 AI 加速器替代路径以 NVIDIA 为参照。',
  }),
  rel(company('tsmc'), company('amd'), 'supplier', 5, false),
  rel(company('tsmc'), company('broadcom'), 'supplier', 5, false),
  rel(company('asml'), company('tsmc'), 'supplier', 5, false),
  rel(company('asml'), company('samsung-foundry'), 'supplier', 5, false),
  rel(company('synopsys'), company('nvidia'), 'ecosystem', 4, false),
  rel(company('cadence'), company('nvidia'), 'ecosystem', 4, false),
  rel(company('openai'), company('microsoft-copilot'), 'model-provider', 5, false),
  rel(company('anthropic'), company('aws'), 'cloud-partner', 4, true),
  rel(company('google-deepmind'), company('google-cloud'), 'model-provider', 5, false),
  rel(company('baidu-ernie'), company('alibaba-cloud'), 'model-provider', 3, false),
  rel(company('zhipu-ai'), company('kingsoft-office'), 'model-provider', 3, false),
];

const layerChain = layers.slice(0, -1).map((current, index) =>
  rel(layer(current.id), layer(layers[index + 1].id), 'supplier', 4, false, {
    en: `${current.name.en} feeds the next AI value-chain layer.`,
    zh: `${current.name.zh}为下游 AI 价值链环节提供输入。`,
  }),
);

const layerCompanyLinks = companies.flatMap((item) =>
  item.aiBusiness.layerIds.map((layerId) =>
    rel(company(item.id), layer(layerId), 'ecosystem', 2, false, {
      en: `${item.name.en} participates in ${layerId}.`,
      zh: `${item.name.zh}属于${layerId}相关生态。`,
    }),
  ),
);

const competitorLinks = layers.flatMap((item) => {
  const peers = companiesByLayer(item.id).slice(0, 6);
  const links: Relationship[] = [];
  for (let i = 0; i < peers.length; i += 1) {
    for (let j = i + 1; j < peers.length; j += 1) {
      links.push(rel(company(peers[i].id), company(peers[j].id), 'competitor', 3, true));
    }
  }
  return links;
});

const adjacentSupplyLinks = layers.slice(0, -1).flatMap((item, index) => {
  const upstream = companiesByLayer(item.id).slice(0, 4);
  const downstream = companiesByLayer(layers[index + 1].id).slice(0, 4);
  const links: Relationship[] = [];
  upstream.forEach((supplier, supplierIndex) => {
    downstream.forEach((buyer, buyerIndex) => {
      if ((supplierIndex + buyerIndex) % 2 === 0) {
        links.push(
          rel(company(supplier.id), company(buyer.id), 'supplier', 2 + ((supplierIndex + buyerIndex) % 3) as Relationship['strength']),
        );
      }
    });
  });
  return links;
});

export const relationships: Relationship[] = [
  ...strategicRelationships,
  ...layerChain,
  ...layerCompanyLinks,
  ...competitorLinks,
  ...adjacentSupplyLinks,
];

export const relationshipTypes: RelationshipType[] = [
  'supplier',
  'customer',
  'competitor',
  'cloud-partner',
  'manufacturing',
  'model-provider',
  'infrastructure',
  'investor',
  'ecosystem',
];
