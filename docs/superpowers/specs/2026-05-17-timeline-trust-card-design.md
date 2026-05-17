# Timeline Trust Card Design

日期：2026-05-17
状态：已确认，等待进入实现计划
范围：`/timeline` 页面（`src/pages/TimelinePage.tsx`）与 `src/data/timeline/`

## 背景

`/timeline` 当前以平直的垂直列表展示 54 条按 (类别, 地区) 过滤的 AI 行业事件。`TimelineEvent` 类型已经收录了 `importance(1-5)` 与 `linkedCompanyIds` 字段，但页面没有任何位置展示它们；事件之间也缺乏跨页跳转和"为什么这件事重要"的解读，难以承担 roadmap Phase 1 所要求的"真实研究站"信任感。

同分支已有 `CompanyEventsTimeline.tsx` 做了"公司 → 相关事件"的反向查询。本设计补上"事件 → 公司"的正向跳转后，timeline 与 company 页之间形成对称连接。

## 目标

把每条 timeline 事件升级为一个"信任单元"，让读者在不离开页面的前提下完成三件事：

- 一眼判断这条事件的分量（importance）和被多少来源支持。
- 读到一句作者解读："这件事改变了什么 / 为后续哪些事件铺路"。
- 直接跳到关联的 Company 页或 Layer 页继续追踪。

本设计是一次性 ship 的完整版本，不分期，包含 54 条 `whyItMatters` 文案的内容工作。

## 选择的方案

在三种候选卡片结构（低侵入加强 / 分区信任卡 / 里程碑上浮）中选择**分区信任卡**：明确把卡片分为 header band、body、footer 三段，并把 `whyItMatters` 作为独立的引号块呈现，以"研究感"对齐 Phase 1 的信任修复主线。

放弃"里程碑上浮"是因为它会主动隐藏 importance 较低事件的细节，与"54 条均经过来源核验"的承诺冲突。放弃"低侵入加强"是因为现有卡片没有清晰层级，无法承载 importance / source 数 / whyItMatters 三类新信息而不显拥挤。

显式不纳入本轮的工作：

- swimlane（按类别分轨）/ 年份×类别热力图 / 故事模式 — 留作下一个 spec。
- importance 过滤按钮 — 当前已有两组过滤控件（类别 + 地区），不再加第三组，等真实使用反馈后再说。
- 英文 `whyItMatters` — 跟随全站 i18n 工作统一推进；本轮 `LocaleText.en` 暂留空字符串。
- 任何针对其它页面的改动；本轮只动 `/timeline` 自身的代码与 timeline 数据文件。

## 数据层改动

### `TimelineEvent` 类型

`src/types/timeline.ts` 新增字段：

```ts
whyItMatters: LocaleText;
```

字段为**必填**——本轮一次性给所有 54 条事件填上中文文案，避免引入"可选导致部分卡片缺块"的视觉不一致。

### `whyItMatters` 文案规范

每条事件用一句中文（约 25–60 字）回答 *这件事改变了什么 / 为后续哪些事件铺路*，例如：

- Transformer 论文：换掉了 RNN/CNN 的主导地位，为后续所有大模型提供架构原型。
- AlexNet：让 GPU 训练深度网络成为视觉路线的默认选择，奠定后续算力竞赛的基础。

要求：

- 是作者解读，不是 description 的复述。
- 必要时可指向后续具体事件（"为 GPT-3 / Gemini 等模型铺路"），但不强制。
- 不编造未在 sources 中可核验的事实。
- 文案完全由仓库维护者手写，不由工具生成。

### 排序

`src/data/timeline/events.ts` 当前**未按年份排序**（2012 → 2017 → 2013 → 2014 …），页面展示也依赖源数组顺序，存在扫读问题。

修复方式：新增 `getSortedTimelineEvents()` 导出于 `src/data/timeline/index.ts`，按 `(year asc, month asc, importance desc)` 排序。页面调用该 selector，不直接 `import { timelineEvents }`。源数据文件本身可保持原顺序（手工维护友好），由 selector 负责呈现顺序。

### 校验测试

`src/data/__tests__/catalog.test.ts` 已有 `linkedCompanyIds` 完整性测试，新增：

- 每条事件的 `whyItMatters.zh` 必须为非空字符串。
- `getSortedTimelineEvents()` 第 i+1 条事件的 (year, month) 不早于第 i 条。

## UI 改动

### 组件拆分

`TimelinePage.tsx` 文件已经较长，借本次重构把单卡片渲染抽成 `src/components/timeline/EventCard.tsx`，并把 importance 视觉抽成 `src/components/timeline/ImportanceIndicator.tsx`。这两个子组件单文件单职责，便于测试和后续替换 importance 表现形式。

`TimelinePage.tsx` 退化为容器：过滤状态、selector 调用、卡片列表渲染。

### 卡片结构

```
┌─ 2017.06  · global · model       ★★★★★    3 个来源 ─┐
│  Transformer 架构被提出                                  │
│  《Attention Is All You Need》论文提出 Transformer…      │
│                                                            │
│   ┃ 换掉了 RNN/CNN 的主导地位，                           │
│   ┃ 为后续所有大模型提供架构原型。                        │
│                                                            │
│  [Foundation Models →] [Google DeepMind →]                │
│  [arXiv ↗]                                                 │
└────────────────────────────────────────────────┘
```

三个区段：

**Header band（卡片头）**

- 左：日期（沿用现有 `formatEventDate`）· 地区 · 类别。
- 右：`ImportanceIndicator`（5 颗 ★/☆，实心数 = importance 值）+ 来源数量徽标（"N 个来源"，弱色）。
- 视觉上是一条窄带，与 body 之间用细分隔线区分。

**Body（主体）**

- 标题（`title.zh`）。
- 事实描述（`description.zh`）。
- `whyItMatters.zh` 引号块：左侧 2px border-l + 起始引号视觉，整段用与 description 不同的字色（更接近正文标题色）以区分"事实"和"解读"。

**Footer（页脚）**

- 第一行：layer badges + company badges，每个都是可跳转的 link badge。
- 第二行：现有 sources 链接列表，保持原样。

### `ImportanceIndicator` 视觉细节

- 渲染 5 个字符位：前 `importance` 个为 ★（实心），其余为 ☆（空心）。
- 颜色用低饱和的灰金色（具体色值实现时与现有设计 token 对齐），不进入彩色系，避免抢占类别色。
- 提供 `aria-label="重要性：N / 5"` 供屏幕阅读器。
- 实现上保留接口便于未来一键切换成 "● ● ● ○ ○" 圆点风格——只需替换字符与边框样式。

### 来源数量徽标

- 文案模板：`{sources.length} 个来源`。
- 当 `sources.length === 1` 时仍显示（保持一致性），不做特殊文案。
- 视觉权重低于 importance 星标，避免与卡片头其它元数据互相竞争。

### 跨页跳转 badge

现有 `Badge` 组件是 `<span>`，不可直接作为路由 link。本设计采用最小改动方案：

- 新增 helper `<LinkBadge to={...} children={...} />` 于 `src/components/ui/Badge.tsx` 同文件导出，内部用 `react-router-dom` 的 `<Link>` 包裹现有 `Badge` 样式（或抽出共享 className）。
- `EventCard` 中：
  - `linkedLayerIds` 用 `LinkBadge` 跳 `/layers/:layerId`，显示文案为 `getLayerById(id)?.name.zh ?? id`，附加右箭头视觉（`→`）。
  - `linkedCompanyIds` 用 `LinkBadge` 跳 `/companies/:companyId`，显示文案为 `getCompanyById(id)?.name.zh ?? id`（selector 已存在于 `src/data/companies/index.ts`，无需新增）。
  - 若某个 id 在数据中找不到对应对象（数据缺漏兜底），仍渲染原始 id 作为 link 文案；测试 catalog 完整性时会暴露这类缺漏。
- 现有 source 外链 anchor 保持不变，不改成 LinkBadge（语义不同：外链 vs 内部跳转）。

### 过滤控件

当前的两组过滤按钮（类别、地区）保持原样、原位置。本轮不引入第三组（如 importance）。但需要在过滤后命中 0 条事件时给出克制的空状态文案，告诉读者当前过滤组合没有事件，建议放宽过滤条件——避免空白页让读者以为页面坏了。

## 测试

在 `src/pages/__tests__/TimelinePage.test.tsx`（若不存在则新建）覆盖：

- 默认渲染至少 1 张卡片。
- `ImportanceIndicator` 对 importance=5 渲染 5 个 ★、对 importance=2 渲染 2 ★ + 3 ☆。
- 来源数量徽标显示正确数量。
- `whyItMatters.zh` 文本可在卡片中查询到。
- linked company badge 是一个 `<a>` / `<Link>`，`href` 形如 `/companies/{id}`。
- linked layer badge 是 link，`href` 形如 `/layers/{id}`。
- 当过滤组合命中 0 条事件时显示空状态文案。

在 `src/data/__tests__/catalog.test.ts` 新增：

- 每条 timeline 事件 `whyItMatters.zh` 非空。
- `getSortedTimelineEvents()` 严格非降序（按 year，再按 month）。

## 验证命令

实现阶段至少运行：

- `npm test -- src/pages/__tests__/TimelinePage.test.tsx --run`
- `npm test -- src/data/__tests__/catalog.test.ts --run`
- `npm run build`
- `npx playwright test tests/playwright/visual.pw.ts`（更新 timeline 页 baseline 截图）

任何因为本轮改动失败的测试都需修复或在 commit 中显式记录；不相关的、已有的 staged 改动导致的失败由对应的其它 spec 负责。

## 风险与回滚

- **文案工作量**：54 条 × ~5 分钟 ≈ 4 小时单人工作。这是本设计的主要时间投入，且不能 AI 生成（违反"不编造未核验事实"原则）。计划阶段建议把文案任务拆成独立子任务，可分批 commit。
- **importance 视觉风险**：5 颗星可能被读者解读为"游戏化评级"。`ImportanceIndicator` 已封装，若评审反馈不喜欢可一处替换为圆点 / 横条 / 颜色深浅，不动 EventCard。
- **回滚策略**：所有改动集中在 `src/components/timeline/`、`src/pages/TimelinePage.tsx`、`src/types/timeline.ts`、`src/data/timeline/`。如果上线后想退回旧视觉，revert 这批文件即可，数据层新增字段 `whyItMatters` 保留无害（旧版本代码不会读它）。

## 未涉及但已识别的后续工作

以下条目不在本 spec 范围内，记录以便后续单独立项：

- Timeline swimlane 视图 / 年份×类别热力图 / 故事模式（"从 AlexNet 到 GPT-4 的算力故事"主题串联）。
- 全站 i18n 启用后，为 54 条事件补 `whyItMatters.en`。
- 与 glossary（见 `2026-05-17-technology-glossary-design.md`）联动：在 description 中识别技术术语并提供 tooltip 释义。
