# AI 产业图谱实施 Roadmap

> 形成日期：2026-05-16
> 当前分支：`codex/homepage-reading-guidance`
> 性质：路线图（roadmap）。具体单 feature 的可执行 plan 仍放在 `docs/superpowers/plans/`。

## 总览

| 阶段 | 工时 | 累计 | 关键里程碑 |
|---|---|---|---|
| Phase 0 · 当前分支收尾 | 0.5 天 | 0.5 天 | 分支可 merge |
| Phase 1 · 文案与信任修复 | 4 天 | 4.5 天 | **可对外发布的"真实研究站"** |
| Phase 2 · 信息架构整理 | 4 天 | 8.5 天 | 首页清爽、URL 可分享 |
| Phase 3 · 数据层与 Adapter 接通 | 5 天 | 13.5 天 | 数据层可换后端 |
| Phase 4 · 性能与 SEO | 4 天 | 17.5 天 | **可被搜索引擎索引、可在社交平台展开预览** |
| Phase 5 · 旗舰公司页面 | 5 天 | 22.5 天 | NVIDIA 页成为整站信任锚 |
| Phase 6 · 测试与持续维护 | 穿插 | — | 回归保护 |

≈ 4–5 周一个人独立推进。如果只能投 1 周，做 **Phase 0 + Phase 1**——这一段 ROI 最高，做完即可把站点从"demo 感"推到"可读"。

---

## 现状评估

### 架构骨架（基本合理）

- `types/` → `data/` → `pages/` + `components/` + `lib/` 分层清晰
- `mockAdapter` + `apiAdapter`（fallback 模式）为切真后端预留通道
- 视觉系统统一在 Apple Research 风（白底、淡阴影、`research-*-surface` 语义色）
- 双语字段 `{ zh, en }` 为 i18n 预留口子

### 主要"半成品"

| 问题 | 现状 | 后果 |
|---|---|---|
| Adapter 形同虚设 | `mockAdapter`/`apiAdapter` 已写好，但页面全部直接 `import { companies } from '../data/...'` | 切真后端需要改 20+ 处页面，预留扩展性等于没做 |
| 数据文件巨大 | `source-terminal/catalog.ts` 8912 行、`timeline/events.ts` 1384 行、`companies/index.ts` 488 行 | 每次进任意页面 eagerly 加载全部数据 |
| 双语字段不完整 | 每处都直接 `.zh`，没有语言切换 | `en` 字段是死代码 |
| `mode: 'global' \| 'china'` 失效 | header 有切换按钮，但只有 `MapPage` 真的读它 | 用户切了没反应 → 信任崩塌 |
| `MapPage` 被 git 标为 `D` | App.tsx 仍然 `import { MapPage }` 并路由到 `/map` | 当前能跑只是因为工作树里文件还在；commit 一把就 404 |

---

## Phase 0 · 当前分支收尾（0.5 天）

> **目标**：把 `codex/homepage-reading-guidance` 变成可 merge 的状态。基础不干净，后面的事都做不利索。

- [ ] 解决 `MapPage.tsx` 的 git "deleted" 状态——确认要保留 `/map` 还是真删除（看 `App.tsx:6,16` 和 `AppShell.tsx:22,73,82` 的引用）
- [ ] 跑 `npm run build && npm test && npx playwright test`，更新 baseline 截图
- [ ] 把 `docs/superpowers/plans/2026-05-15-static-real-metrics.md` 和 `homepage-reading-guidance` 两条线对齐成一次 commit
- [ ] **完成标志**：`git status` 干净，CI 全绿

---

## Phase 1 · 文案与信任修复（3–5 天，最高 ROI）

> **目标**：消除所有"半成品感"的占位文案。研究型产品的核心资产是每行字都经得起读——这是用最低成本拿回最大读者信任的阶段。

### P1.1 写死字符串修复（0.5 天）

- `src/pages/CompanyPage.tsx:51-54` `positioningItems` 三行硬编码 `"为什么属于能源"` → 改成 layer-aware 模板，从 `company.aiBusiness.layerIds[0]` 取真实 `layer.name.zh`
- `src/pages/LayerPage.tsx:105` `"该能力节点用于演示本层技术组成。"` → 每个 `coreTechnology` 写真正 1 句定义（依赖 P1.2 数据层支持）

### P1.2 技术能力字典（2 天）

- 新建 `src/data/glossary/index.ts`，给所有 `coreTechnologies` 配一句中文释义
- `LayerPage` 和 `CompanyPage` 的 `Badge` 工具提示读这份字典
- **完成标志**：在 `src/` 下 `grep '演示'` 0 命中

### P1.3 每条指标加来源（1–2 天）

- `MetricCard` 接受可选 `source?: { label: string; date: string }`，渲染成下方 `[Q3 FY26 10-Q · 2026-02-21]` 风格小字
- `Company` 类型加 `metricSources` 字段；先给 Top 10 公司填真实来源
- `ValueFlow` 那边已有 `evidence`/`confidence` 字段——把这两个在 Sankey 的 hover 卡上完整展示

### P1.4 Relationship 工具提示（1 天）

- `RelationshipGraph` edge hover 时显示一句话叙述（`"TSMC 制造 NVIDIA H100，是 AI 算力供给的关键依赖"`）
- `Relationship` 类型加可选 `rationale: { zh: string }` 字段；填 Top 20 关键关系

**阶段验收**：随机点 10 个公司/产业层详情页，每页都"读得下去"，没有占位感。

---

## Phase 2 · 信息架构整理（3–4 天）

> **目标**：去掉首页的重复，让 `mode` 切换真的有用，让 URL 能被分享。

### P2.1 首页瘦身（1–2 天）

- 删掉 `chapters[]` 段（`HomePage.tsx:34-56`，与 L2 网格指向重叠）
- 决定 `MinimalExplorer` 的去留：作为首屏主入口（替代圆形 pill），或删除
- 末尾"价值流 + 时间线"两栏 → 改成 1 个有叙事的横条（如"本周 AI 产业链关键动态" feed）

### P2.2 让 `mode: global / china` 真生效（1 天）

- HomePage 的 L2 卡片根据 mode 切换显示 `localizationRate` 还是 `gapToGlobal`
- LayerPage 的"中国 vs 全球"段落根据 mode 重排
- AppShell 的 toggle 加 `aria-pressed` 反馈

### P2.3 URL 状态化（1 天）

- `mode` 同步到 `?view=china`（Zustand 中间件 + `useSearchParams`）
- `MapPage` 的 `layerFilter`/`countryFilter` 同步到 URL
- 浏览器后退/分享链接都能还原视图

**阶段验收**：首页一屏一目的；切换"中国"按钮时全站视图响应；复制任意页面 URL 给同事，对方打开看到一样的东西。

---

## Phase 3 · 数据层与 Adapter 接通（4–5 天）

> **目标**：让 adapter 从"装饰"变成"管道"。这是为切真后端 / CMS / SQL 铺路的工程基础。

### P3.1 引入 `useData()` hook 层（2 天）

- 新建 `src/data/hooks/useLayers.ts`、`useCompany.ts`、`useRelationships.ts` 等
- 内部走 `dataAdapter`（默认 `mockAdapter`，可 env 切 `apiAdapter`）
- 用 React 19 的 `use()` + Suspense，或 `useSyncExternalStore`

### P3.2 把所有页面切过去（2 天）

- `HomePage.tsx:4-7`、`LayerPage.tsx:4-6`、`CompanyPage.tsx:4-7`、`MapPage.tsx:3-7`、`ValueFlowPage.tsx` 等所有页面的直接 `import` 改成 hook
- `data/selectors.ts` 里的查询函数迁到 adapter 层
- **完成标志**：`grep "from '../data/companies'" src/pages` 在 pages 下 0 命中

### P3.3 大数据文件拆分（1 天，可与 P3.2 并行）

- `source-terminal/catalog.ts`（8912 行）按 layer 拆成 `catalog/{layer-id}.ts`，用 `import.meta.glob` 聚合
- `timeline/events.ts`（1384 行）按年份拆
- 审计依赖：`three`、`@react-three/*`、`framer-motion` 是否还在用，删未用的

---

## Phase 4 · 性能与 SEO（3–4 天）

> **目标**：让站点能被搜到、被分享。这一步是"内容站"和"工具站"的分水岭。

### P4.1 路由级代码分割（0.5 天）

- `App.tsx` 用 `React.lazy` + `Suspense` 包 `MapPage`/`ValueFlowPage`/`TimelinePage`
- Sankey、xyflow、recharts 进各自的 chunk
- **完成标志**：`npm run build` 后首屏 chunk < 200KB gzipped

### P4.2 每路由元数据（1 天）

- 装 `react-helmet-async`（或更轻量方案）
- 每个路由配 `<title>` / `<meta name="description">` / `og:title` / `og:image` / `twitter:card`
- 公司页 og:image 自定义（可用 `@vercel/og` 风格，也可先用静态分类卡）

### P4.3 预渲染 / SSG（2 天）

- 引入 `vite-plugin-ssg` 或 `vike`
- 所有公司 / 产业层路由生成静态 HTML
- `sitemap.xml` + `robots.txt` 落到 `dist/`
- **完成标志**：`curl https://yoursite/companies/nvidia` 直接返回带内容的 HTML，不是空 `<div id="root">`

---

## Phase 5 · 旗舰公司页面（1 周）

> **目标**：把英伟达页面打磨到无可挑剔，建立模板，其它公司逐步对齐。这一页就是整站的"信任锚"。

- [ ] 选 NVIDIA 作为旗舰
- [ ] 补完整 5 年财务数据 + Recharts 趋势图（已有 `FinancialChart` 骨架）
- [ ] 上下游关系图突出关键依赖（TSMC / HBM / Hyperscaler 三条主线）
- [ ] 关键事件时间线（接入 `timelineEvents` 过滤 `relatedCompanyId`）
- [ ] 加"中国对标"小节（华为海思 / 寒武纪 / 摩尔线程对比卡）
- [ ] 每个数字配来源链接
- [ ] 写一段 300 字的"研究纪要"放在 hero 下面

完成后用同样的模板复刻到 TSMC / OpenAI / 微软 / 字节 / 谷歌 / Meta 等。

---

## Phase 6 · 测试与持续维护（穿插进行）

> **目标**：让上面所有改动都有回归保护。

- 给 `buildRelationshipGraphModel`（`RelationshipGraph.tsx:150`）写单元测试——这是最复杂的纯函数
- 给 `apiAdapter` 的 fallback 行为写测试（mock fetch 失败 → 验证返回 mockAdapter 结果）
- Playwright 增加端到端流程：首页 → 选问题 → 进公司 → 进关系图
- 加 GitHub Actions：每次 PR 跑 `tsc` + `vitest` + `playwright`

---

## 优先级判断说明

- **Phase 0-1 必须做**：当前分支不干净 + 占位文案暴露半成品感，是上线前的最低门槛
- **Phase 2-3 强烈建议**：信息架构整理直接提升阅读体验；adapter 接通为后面切真数据 / CMS 铺路
- **Phase 4 决定能否被找到**：内容站没 SSG 等于把流量门关一半
- **Phase 5 决定能不能被记住**：单页足够好，可以背书全站
- **Phase 6 决定能不能持续推进**：没有测试，每次改动都在拆盲盒

## 后续单 feature 落地建议

每个阶段中的具体 task 在开始执行前，建议参照现有 `docs/superpowers/plans/2026-05-15-*.md` 格式，先写一份带 checkbox 的可执行 plan，然后用 `superpowers:executing-plans` 或 `subagent-driven-development` 推进。
