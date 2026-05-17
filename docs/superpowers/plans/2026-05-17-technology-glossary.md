# Technology Glossary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable glossary for layer core technologies and wire it into layer/company pages without changing the visual system.

**Architecture:** Keep labels and definitions separate. `src/lib/labels.ts` continues to own display labels, while `src/data/glossary/index.ts` owns one-sentence Chinese definitions and lookup helpers. Pages consume the lookup helper for explanatory text and native `title` attributes.

**Tech Stack:** TypeScript, React 19, Vite, Vitest, React Testing Library.

---

## File Structure

- Create `src/data/glossary/index.ts`: glossary entries and lookup helpers.
- Create `src/data/__tests__/glossary.test.ts`: coverage and lookup tests.
- Modify `src/pages/LayerPage.tsx`: read glossary definitions for technology cards.
- Modify `src/pages/CompanyPage.tsx`: add glossary `title` to core product badges when available.
- Modify `src/App.test.tsx`: assert LayerPage uses glossary copy and NVIDIA exposes a CUDA glossary title.

### Task 1: Add Failing Glossary Data Tests

**Files:**
- Create: `src/data/__tests__/glossary.test.ts`

- [ ] **Step 1: Write the failing glossary tests**

Create `src/data/__tests__/glossary.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getGlossaryDefinition, getGlossaryEntry, technologyGlossary } from '../glossary';
import { layers } from '../layers';

describe('technology glossary', () => {
  it('defines every layer core technology', () => {
    const coreTechnologies = [...new Set(layers.flatMap((layer) => layer.coreTechnologies))];
    const missingDefinitions = coreTechnologies.filter((technology) => !getGlossaryDefinition(technology));

    expect(coreTechnologies).toHaveLength(74);
    expect(missingDefinitions).toEqual([]);
  });

  it('returns stable display labels and Chinese definitions', () => {
    expect(getGlossaryEntry('GPU architecture')).toMatchObject({
      term: 'GPU architecture',
      label: 'GPU 架构',
    });
    expect(getGlossaryDefinition('GPU architecture')).toContain('并行计算');
    expect(getGlossaryDefinition('cuda ecosystem')).toContain('软件生态');
    expect(Object.keys(technologyGlossary)).toContain('CUDA ecosystem');
  });
});
```

- [ ] **Step 2: Run glossary tests and verify RED**

Run:

```bash
npx vitest run src/data/__tests__/glossary.test.ts
```

Expected: FAIL because `../glossary` does not exist yet.

### Task 2: Add The Technology Glossary Module

**Files:**
- Create: `src/data/glossary/index.ts`

- [ ] **Step 1: Implement glossary data and lookup helpers**

Create `src/data/glossary/index.ts` with:

```ts
import { displayTerm } from '../../lib/labels';

export type GlossaryEntry = {
  term: string;
  label: string;
  definition: string;
};

const definitions: Record<string, string> = {
  'Power purchase agreements': '电力采购协议把数据中心未来用电需求锁定为长期合同，是 AI 算力扩张获得稳定电力的基础。',
  'Grid interconnect': '电网互联决定数据中心能否获得足够并网容量，直接影响 AI 集群上线速度。',
  'Cooling power design': '供电与冷却设计把电力、散热和机柜密度协同起来，决定高负载 AI 机房能否稳定运行。',
  'Liquid cooling': '液冷通过液体带走芯片和服务器热量，是高功率 AI 服务器提升密度的重要手段。',
  'Power density design': '功率密度设计决定单机柜可承载的算力规模，影响数据中心空间、电力和冷却效率。',
  'Interconnect fabric': '互联网络把服务器、存储和加速器连接成集群，决定训练与推理任务的数据传输效率。',
  'EUV lithography': 'EUV 光刻用于制造先进制程关键图形，是高端 AI 芯片制程能力的核心瓶颈。',
  Deposition: '薄膜沉积在晶圆表面形成关键材料层，影响先进芯片结构、良率和性能。',
  Etch: '刻蚀把设计图形转移到晶圆材料中，是先进制程线宽、结构和良率控制的关键步骤。',
  Metrology: '量测用于检测晶圆结构和缺陷，帮助先进制程快速定位良率问题。',
  'Silicon wafers': '硅片是芯片制造的基础衬底，其纯度、尺寸和缺陷率影响整条制造链良率。',
  Photoresist: '光刻胶在曝光中形成图形掩膜，是先进光刻精度和材料稳定性的关键材料。',
  'Specialty gases': '特种气体参与刻蚀、沉积和清洗等工艺，影响半导体制造的一致性和良率。',
  'CMP slurry': 'CMP 抛光液用于晶圆平坦化，决定多层互连和先进制程表面质量。',
  'Logic synthesis': '逻辑综合把芯片功能描述转成门级电路，是 AI 芯片设计从算法到硬件实现的关键步骤。',
  Verification: '验证工具在流片前检查设计正确性，降低高成本 AI 芯片重做风险。',
  'IP cores': 'IP 核提供可复用电路模块，让芯片设计团队更快集成 CPU、互联和接口能力。',
  'Physical design': '物理设计把逻辑电路映射到版图，决定芯片面积、频率、功耗和可制造性。',
  'GPU architecture': 'GPU 架构通过大规模并行计算、存储层级和互联设计决定 AI 训练与推理性能。',
  CUDA: 'CUDA 生态把开发工具、算子库和优化经验绑定到 NVIDIA 平台，是 AI 加速器的软件生态壁垒。',
  'CUDA ecosystem': 'CUDA 生态把开发工具、算子库和优化经验绑定到 NVIDIA 平台，是 AI 加速器的软件生态壁垒。',
  'HBM interfaces': 'HBM 接口连接 GPU 与高带宽存储，决定模型训练和推理时的数据供给速度。',
  'Inference ASICs': '推理 ASIC 针对部署阶段优化能效和成本，用于降低大规模 AI 服务的单位推理成本。',
  'Advanced nodes': '先进制程通过更小晶体管提升性能和能效，是高端 AI 芯片保持领先的重要基础。',
  'Yield learning': '良率爬坡通过持续分析缺陷和工艺参数，让先进制程从可制造走向可量产。',
  'CoWoS integration': 'CoWoS 集成把 GPU、HBM 和中介层封装在一起，是高端 AI 加速器扩大带宽的关键方式。',
  'Process control': '工艺控制通过稳定设备、材料和参数窗口，确保晶圆制造结果可重复。',
  CoWoS: 'CoWoS 是 2.5D 先进封装方案，用中介层连接逻辑芯片和 HBM，提升 AI 加速器带宽。',
  Chiplets: 'Chiplet 把复杂芯片拆成多个小芯粒组合，提升设计弹性并改善制造良率。',
  Interposers: '中介层负责在芯片和 HBM 之间提供高密度连接，是先进封装带宽能力的基础。',
  Substrates: '基板承载封装后的芯片并连接主板，影响高功率 AI 芯片的信号和散热可靠性。',
  HBM3E: 'HBM3E 是高带宽存储规格，决定最新 AI 加速器可获得的内存带宽和容量。',
  'DRAM stacking': 'DRAM 堆叠把多层存储芯片垂直集成，提高单位面积带宽和容量。',
  NAND: 'NAND 提供大容量非易失存储，支撑 AI 数据集、模型权重和推理服务的数据保存。',
  'Memory controllers': '存储控制器调度芯片与存储之间的数据访问，影响 AI 任务的吞吐和延迟。',
  'GPU servers': 'GPU 服务器把加速卡、CPU、内存、网络和电源整合成可部署的 AI 计算节点。',
  NVLink: 'NVLink 提供 GPU 之间的高速互联，让多卡训练和推理能以更低延迟交换数据。',
  'Ethernet fabrics': '以太网组网把大量服务器连接成训练或推理集群，是云厂商扩展 AI 网络的主流路径之一。',
  'Optical modules': '光模块把电信号转换成高速光信号，支撑数据中心长距离、高带宽互联。',
  'GPU cloud': 'GPU 云把加速器集群包装成按需计算服务，让模型公司和企业无需自建全部基础设施。',
  Kubernetes: 'Kubernetes 负责容器编排和资源调度，是 AI 平台管理训练、推理和服务部署的重要底座。',
  'Storage fabric': '存储网络连接数据、模型权重和计算集群，影响训练数据供给和推理服务稳定性。',
  'AI platform services': 'AI 平台服务把模型训练、部署、监控和权限管理产品化，降低企业使用 AI 的工程门槛。',
  'Transformer architectures': 'Transformer 架构用注意力机制处理序列和多模态数据，是大模型能力跃迁的基础结构。',
  RLHF: 'RLHF 用人类反馈校准模型输出，使模型更符合指令、安全和偏好要求。',
  'Multimodal training': '多模态训练把文本、图像、音频和视频共同建模，扩展基础模型的感知和生成能力。',
  'Inference scaling': '推理扩展通过并行服务、缓存和模型优化，让大模型能力以可接受成本服务更多用户。',
  'Vector retrieval': '向量检索把文本、图片或业务对象转成可相似搜索的向量，是 RAG 和企业知识问答的基础。',
  'Agent orchestration': '智能体编排负责工具调用、任务拆解和多步骤执行，让模型从回答问题走向完成工作流。',
  'Fine-tuning': '微调用领域数据调整模型行为，使通用模型更贴近特定业务、语气或任务。',
  Observability: '可观测性跟踪模型调用、质量、成本和错误，帮助团队持续优化 AI 应用表现。',
  'Copilot UX': 'Copilot 体验把 AI 嵌入现有软件界面，让用户在原工作流中获得建议、生成和自动化能力。',
  'Workflow integration': '工作流集成把模型能力接入审批、销售、客服和研发流程，决定 AI 应用是否真正产生效率。',
  'Domain datasets': '领域数据集提供行业语境和业务事实，是垂直 AI 应用形成差异化的关键输入。',
  'Evaluation loops': '评测闭环持续收集结果、人工反馈和失败案例，帮助 AI 产品迭代可靠性。',
  'Embodied models': '具身模型把语言、视觉和动作决策结合起来，让机器人或车辆能理解并作用于现实环境。',
  'Sensor fusion': '传感器融合整合摄像头、雷达、激光雷达和其他信号，是自动驾驶和机器人感知的基础。',
  Planning: '规划算法把目标拆成可执行动作序列，决定机器人、车辆或智能体如何安全完成任务。',
  'Real-time inference': '实时推理要求模型在低延迟约束下输出结果，是自动驾驶、机器人和交互式系统的关键能力。',
};

export const technologyGlossary = Object.fromEntries(
  Object.entries(definitions).map(([term, definition]) => [
    term,
    {
      term,
      label: displayTerm(term),
      definition,
    },
  ]),
) as Record<string, GlossaryEntry>;

const normalizedGlossary = new Map(
  Object.values(technologyGlossary).map((entry) => [entry.term.toLowerCase(), entry]),
);

export const getGlossaryEntry = (term: string): GlossaryEntry | undefined =>
  technologyGlossary[term] ?? normalizedGlossary.get(term.toLowerCase());

export const getGlossaryDefinition = (term: string): string | undefined => getGlossaryEntry(term)?.definition;
```

- [ ] **Step 2: Run glossary tests and verify GREEN**

Run:

```bash
npx vitest run src/data/__tests__/glossary.test.ts
```

Expected: PASS.

### Task 3: Wire Glossary Into Pages

**Files:**
- Modify: `src/pages/LayerPage.tsx`
- Modify: `src/pages/CompanyPage.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Add failing route-level assertions**

In `src/App.test.tsx`, replace the previous LayerPage template-copy assertion with the glossary definition assertion:

```tsx
expect(screen.getByText(/通过大规模并行计算/)).toBeTruthy();
```

Add to the NVIDIA company detail test:

```tsx
expect(screen.getAllByTitle(/CUDA 生态把开发工具/).length).toBeGreaterThan(0);
```

- [ ] **Step 2: Run App route tests and verify RED**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: FAIL because pages are not reading `getGlossaryDefinition` yet.

- [ ] **Step 3: Update `LayerPage`**

Import the glossary helper:

```tsx
import { getGlossaryDefinition } from '../data/glossary';
```

Change `describeLayerTechnology`:

```tsx
const describeLayerTechnology = (technology: string, layerName: string) =>
  getGlossaryDefinition(technology) ??
  `${displayTerm(technology)}在${layerName}环节中承担关键能力模块，决定该层的性能边界、成本结构和上下游协同效率。`;
```

- [ ] **Step 4: Update `CompanyPage` core product badges**

Import the glossary helper:

```tsx
import { getGlossaryDefinition } from '../data/glossary';
```

Replace the summary core product Badge mapping:

```tsx
{company.aiBusiness.coreProducts.slice(0, 4).map((item) => (
  <Badge key={item} title={getGlossaryDefinition(item)}>
    {displayTerm(item)}
  </Badge>
))}
```

Replace the business core product Badge mapping:

```tsx
{company.aiBusiness.coreProducts.map((item) => (
  <Badge key={item} title={getGlossaryDefinition(item)}>
    {displayTerm(item)}
  </Badge>
))}
```

- [ ] **Step 5: Run App route tests and verify GREEN**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: PASS.

### Task 4: Final Verification

**Files:**
- No additional source files.

- [ ] **Step 1: Scan for remaining demo placeholder wording**

Run:

```bash
rg -n "演示" src
```

Expected: no matches.

- [ ] **Step 2: Run all tests**

Run:

```bash
npm test -- --run
```

Expected: PASS.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: PASS. The existing Vite large chunk warning may still appear and is tracked by Phase 4.

- [ ] **Step 4: Review final diff**

Run:

```bash
git diff -- src/data/glossary src/data/__tests__/glossary.test.ts src/pages/LayerPage.tsx src/pages/CompanyPage.tsx src/App.test.tsx docs/superpowers/plans/2026-05-17-technology-glossary.md
```

Expected: diff is limited to glossary data/tests, page integrations, route assertions, and this plan.
