# Technology Glossary Design

日期：2026-05-17
状态：已确认，等待进入实现计划

## 背景

Phase 1 的目标是修复文案和信任感。P1.1 已经移除了 `LayerPage` 中最明显的占位句，但当前技术说明仍由页面本地 helper 生成，表达偏模板化，无法沉淀为复用资产。

现有 `src/lib/labels.ts` 已经负责把英文术语转成中文显示名，例如 `GPU architecture` → `GPU 架构`。P1.2 不应把长解释塞进 `labels.ts`，而应新增独立 glossary 数据层，让“显示名”和“释义”分工清楚。

## 目标

建立一个小而完整的技术能力字典：

- 覆盖 `src/data/layers/index.ts` 中 15 个产业层的全部 `coreTechnologies`。
- 每个术语提供一句中文释义，说明它在 AI 产业链中的作用。
- `LayerPage` 的技术架构卡片读取 glossary，不再依赖本地模板句。
- `CompanyPage` 的核心产品 Badge 在 glossary 有释义时通过原生 `title` 暴露说明。
- 保持现有视觉结构，不引入新的 tooltip 组件或复杂交互。

## 选择的方案

采用 `src/data/glossary/index.ts` 作为独立数据模块。

建议导出：

```ts
export type GlossaryEntry = {
  term: string;
  label: string;
  definition: string;
};

export const technologyGlossary: Record<string, GlossaryEntry>;
export const getGlossaryEntry: (term: string) => GlossaryEntry | undefined;
export const getGlossaryDefinition: (term: string) => string | undefined;
```

`term` 使用数据中的英文 key；`label` 通过 `displayTerm(term)` 生成；`definition` 使用中文短句。查找时支持大小写不敏感回退，避免未来数据大小写漂移导致解释消失。

## 数据范围

本轮只要求覆盖 `layers.coreTechnologies` 的 58 个唯一术语。它们来自产业层数据，是 P1.2 roadmap 点名的范围。

暂不要求覆盖所有 `company.aiBusiness.coreProducts`。如果公司产品恰好命中 glossary，则 CompanyPage Badge 显示 title；如果没有命中，则保持原样，不显示空 title，不编造解释。

## 页面集成

### LayerPage

`LayerPage` 技术架构卡片使用：

- 标题：继续用 `displayTerm(tech)`。
- 说明：优先用 `getGlossaryDefinition(tech)`。
- 兜底：如果 glossary 暂无条目，使用当前本地生成句作为兜底。

这样可以保证本轮覆盖完整时每张卡都读到手写释义，同时未来新增术语不会让页面空白。

### CompanyPage

核心产品 Badge 使用：

- `title={getGlossaryDefinition(item)}`，仅在有释义时设置。
- 显示文本仍为 `displayTerm(item)`。

本轮覆盖 CompanyPage 中两处核心产品 Badge：核心结论区的前 4 个产品和 AI 业务分析里的完整核心产品列表。

## 测试与验收

新增/更新测试覆盖：

- glossary 覆盖所有 `layers.coreTechnologies`，没有遗漏。
- `getGlossaryDefinition('GPU architecture')` 返回明确中文解释。
- `LayerPage` 展示来自 glossary 的 GPU 架构释义。
- `CompanyPage` 中 NVIDIA 的 `CUDA 生态` Badge 带有 glossary title。
- `rg "演示" src/` 没有命中。
- `npm test -- --run` 和 `npm run build` 给出新鲜结果。

## 不在本次范围

- 自定义 tooltip 组件。
- 覆盖所有公司核心产品。
- 搜索结果页展示 glossary 释义。
- 把 glossary 接入 adapter/API。
- 英文释义或多语言切换。
- P1.3 指标来源体系。
- P1.4 Relationship 关系叙述。
