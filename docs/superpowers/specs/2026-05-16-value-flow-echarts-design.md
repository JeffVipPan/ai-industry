# Value Flow Sankey — ECharts 改造设计

日期: 2026-05-16
范围: `src/components/ValueFlowSankey.tsx` 单组件改造，同时收尾未完成的 UI 简化。

## 背景

参考项目 `/Users/jeffpan/Documents/github/ai-industry-intelligence-terminal` 在 `/value-flow` 上用 `echarts-for-react` + ECharts Sankey 渲染同主题图表，视觉效果显著优于当前项目（手写 SVG + `d3-sankey`）。差距集中在：

1. 当前 SVG 在浅底 + 低饱和度渐变 + 非 hover 全局降不透明度到 0.16，默认状态像草稿。
2. 节点过窄、缺乏 adjacency 高亮，hover 是"减法"。
3. `tspan` 标签自截断到 12–16 字符，长公司名仍会被裁切；viewBox 右侧也被裁。

当前项目同时有一组未完成的 UI 简化（`src/App.test.tsx` 已先行更新断言）：删除"标准化估算模型"badge → 简化为单一 badge `标准化估算模型/路径强度视图`，删 `基准值` 卡片，去掉 `demo $B` 字样，把 `路径拓扑` 按钮重命名。

本次改造一并交付：换引擎 + 收尾 UI 简化。

## 决策

| 维度 | 决策 |
|---|---|
| 渲染引擎 | `echarts-for-react ^3` + `echarts ^5.6`（与参考项目一致） |
| 主题 | 保持全站亮主题；面板沿用 `glass-panel`，不切深色 |
| 配色 | 沿用现 Apple-system 调色板（#0071e3 / #af52de / #ff9f0a / #34c759 / #ff2d55） |
| Tab / 模式 | 保留 4 个路径视图 tab × 2 个分析视图（`标准化分配` / `路径强度`）。`路径强度` 取代旧 `路径拓扑` 按钮 |
| 右栏 | 删除"基准值"卡和 `basisValue/basis` 显示；保留场景描述、活动流详情、备注、`指标口径` |
| Hover | ECharts 原生 `tooltip` + `emphasis.focus: 'adjacency'`，无自定义 hover 逻辑 |
| Click | click 一条 link → 钉住右栏活动流详情；再 click 同条 → 取消 |
| compact 模式 | 同样走 ECharts，强制 allocation 视图、不渲染 tab 条、不渲染右栏；nodeWidth/nodeGap/labelFontSize 收紧 |
| 单位字样 | 全部使用 `标准化价值单位` / `路径强度指数`；`demo $B` 已不再出现 |

## 组件结构

```
src/components/ValueFlowSankey.tsx
  ├─ buildSankeyOption(input)                  纯函数：(nodes, links, ctx) → ECharts option
  └─ ValueFlowSankey                           外壳：header / tab 条 / sankey 区 / 右栏
```

`buildSankeyOption` 输入：
```ts
type BuildInput = {
  nodes: Array<{ id: string; name: string; role: 'source' | 'intermediate' | 'terminal' | 'path' }>;
  links: Array<{
    id: string;
    source: string;
    target: string;
    value: number;
    flowType: 'revenue' | 'cost' | 'capex' | 'profit' | 'compute';
    label: string;
    description: string;
    sourceLabel?: string;
    targetLabel?: string;
  }>;
  compact: boolean;
  pinnedFlowId: string | null;
  unit: string;
};
```

输出 ECharts option，关键字段：
- `series[0].type = 'sankey'`
- `series[0].data`: `nodes.map(node => ({ name: node.name, itemStyle: { color: nodeColors[node.role] } }))`
- `series[0].links`: 每条 link `{ source: srcName, target: tgtName, value, lineStyle: { color: flowColors[flowType], opacity }, ...customData }`
  - opacity 计算: `pinnedFlowId == null ? 0.32 : (pinnedFlowId === link.id ? 0.78 : 0.10)`
- `series[0].nodeWidth`: `compact ? 12 : 16`
- `series[0].nodeGap`: `compact ? 8 : 14`
- `series[0].lineStyle.curveness`: `0.55`
- `series[0].emphasis.focus`: `'adjacency'`
- `series[0].label.color`: `'#1d1d1f'`，`fontSize`: `compact ? 10 : 12`
- `tooltip.trigger`: `'item'`
- `tooltip.formatter`: edge → 富文本（源 → 目标 / label · value 单位 / description）；node → 节点名
- `backgroundColor`: `'transparent'`

## 数据流

```
scenarioId / pathViewId
      ↓
  selectScenario / selectPathView
      ↓
  allocation 视图  → scenario.nodes + scenario.links
  topology 视图    → topologyNodes(pathView.links) + pathView.links
      ↓
  buildSankeyOption(nodes, links, { compact, pinnedFlowId, unit })
      ↓
  <ReactECharts option={...} onEvents={{ click: handleClick }} style={{ height }} />
```

## 交互

| 动作 | 行为 |
|---|---|
| Hover link / node | ECharts 原生 tooltip + adjacency 高亮 |
| Click link | `setPinnedFlowId(link.id)`；该 link opacity 0.78，其余 0.10；右栏活动卡显示该 link |
| Click 同一条 link | 取消钉住，回退默认 |
| Click 节点 / 空白 | 不响应 |
| 切换 tab / 切换分析视图 | 重置 `pinnedFlowId = null`（沿用现 useEffect 模式） |
| `mode` (global/china) 变化 | 重置 scenarioId/pathViewId，重置 pinnedFlowId |
| compact | click 回调不挂载，右栏整体不渲染 |

`pinnedFlowId` 为空时，右栏回退到当前默认（`rootAllocation[0]` 或 `pathView.links[0]`），与今天行为一致。

## 右栏

allocation 视图：
- 场景标题 + 描述
- ~~基准值卡~~（删除）
- 大额分配 grid（保留）
- 活动流详情卡（保留：flowTypeLabel / label / description / 源→目标 · 值 / evidence · confidence）
- notes（保留）

topology 视图：
- 路径视图标题 + 描述
- `指标口径: 路径强度指数` + caveat
- 路径强度视图 label
- 大额路径 grid（保留）
- 活动流详情卡（保留）

## Out of scope

- 不改全站亮主题
- 不改 `valueFlowScenarios` / `valueFlowPathViews` 数据结构
- 不改 `SankeyDiagram.tsx`（独立组件，继续用 d3-sankey）
- 不动 `d3-sankey` 依赖（SankeyDiagram 还在用）
- 不改 `ValueFlowPage` hero 与 insight cards
- 不改 `AppShell`

## 测试

- 新增 `src/components/__tests__/buildSankeyOption.test.ts`：单元测试纯函数映射（节点去重、颜色、opacity in pinned/unpinned）。
- 现有 `src/App.test.tsx` 中 `/value-flow` 测试一处 `valueFlowButtons.slice(0, 2)` 断言需要修正——目前是全局 `getAllByRole('button')` slice，但 `AppShell` 实际渲染了若干按钮（logo / global-china toggle / mobile search），所以原 slice 必然失败。改为 scoped 到 ValueFlow section 后取前两个。其余断言（缺 `路径拓扑` / `多路径拓扑模型` / `基准值` / `demo $B`；有 `路径强度视图` / `指标口径` / `路径强度指数`）保持。
- echarts-for-react 在 jsdom 下挂不上时，加 `vi.mock('echarts-for-react', () => ({ default: (props) => <div data-testid="echarts-mock" data-option={JSON.stringify(props.option)} /> }))`。

## 验收

1. `npm test` 全绿
2. 本地 `npm run dev` 后 `/value-flow` 与 `/`（首页 compact）可正常渲染、可 hover、可 click 钉住
3. 不再有 `路径拓扑` 按钮、`基准值` 卡、`demo $B` 字样
