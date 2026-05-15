# AI 全产业链智能研究终端 — 产品级前端生成 Prompt（完整版）

> **版本**：v2.0 Final
> **更新日期**：2026-05-15
> **使用说明**：本文档为完整的产品级前端生成 Prompt，包含主文档与 7 个附录。可一次性提交，也可按阶段分批使用（建议阶段划分见文末）。

---

## 目录

- [主 Prompt](#主-prompt)
  - [一、核心体验原则](#一核心体验原则)
  - [二、整体产品定位与视觉风格](#二整体产品定位与视觉风格)
  - [三、技术栈要求](#三技术栈要求)
  - [四、核心产业链结构](#四核心产业链结构)
  - [五、必须实现的页面路由](#五必须实现的页面路由)
  - [六、必须实现的交互能力](#六必须实现的交互能力)
  - [七、最终交付](#七最终交付)
- [附录 A：L1 首屏入场动画详细规范](#附录-al1-首屏入场动画详细规范)
- [附录 B：L1 → L2 → L3 转场统一规范](#附录-bl1--l2--l3-转场统一规范)
- [附录 C：3D 节点网络的跨页面延续性设计](#附录-c3d-节点网络的跨页面延续性设计)
- [附录 D：数据架构与 Mock Data 规范](#附录-d数据架构与-mock-data-规范)
- [附录 E：响应式与移动端适配规范](#附录-e响应式与移动端适配规范)
- [附录 F：空状态与边界场景规范](#附录-f空状态与边界场景规范)
- [附录 G:音效与微交互规范](#附录-g音效与微交互规范)
- [实施建议:分阶段执行](#实施建议分阶段执行)

---

# 主 Prompt

请你扮演一名资深前端架构师、产品设计师、投资研究员和 AI 产业分析师，帮我生成一个高端、电影化、探索驱动的「AI 全产业链智能研究终端」网站。

这个网站不是普通官网，也不是传统的金融后台系统，而是一个面向投资研究、行业分析、AI 技术学习、产业链研究、中美 / 中国 vs 全球竞争格局分析的**探索式分析平台**。

网站需要帮助用户理解:

- AI 产业链从能源、数据中心、半导体、云、基础模型到应用的完整结构
- 每一层在 AI 系统中的职责、技术壁垒、商业模式和竞争格局
- 公司之间的上下游依赖关系
- AI 资本开支、收入和利润如何在产业链中流动
- 全球产业格局与中国国产替代路径的差异
- AI 技术演进如何影响不同产业层的价值分配

---

## 一、核心体验原则

**(最重要,所有设计必须服从此原则)**

产品的核心体验是 **"Progressive Disclosure 渐进式探索"**:

用户首次进入时看到的是一个极简、电影化、近乎艺术品的入口;每一次 hover、click、scroll,都会像剥洋葱一样揭示下一层信息。最终的信息密度可以非常高,但密度必须由用户主动"挖掘"得到,而不是一次性砸到脸上。

### 信息密度的三层节奏

**L1 入口层(首屏 / Hero)**:极简。只呈现一个核心视觉 + 一句产品定位 + 一个引导用户开始探索的动作。不展示 15 层产业链,不展示公司卡片,不展示数据。让用户先"被吸引",再"想了解"。

**L2 概览层(向下滚动 / 进入主图)**:中等密度。以可视化为主,文字为辅。产业链以抽象化、粒子化或 3D 化的方式缓慢呈现,hover 时才显示层级名称,click 时才进入下一层。

**L3 深度层(产业层详情 / 公司详情)**:高密度。此时才允许出现 Bloomberg 式的信息墙——多列指标、密集图表、关系网络、财务数据。因为用户已经"主动选择"了深入,他们准备好了。

**关键原则:信息密度必须随用户行为单调递增,绝不允许在 L1 就出现 L3 的内容。**

### 硬性约束

- 首屏可见区域内的文字总量不得超过 50 个中文字
- Hero 区域禁止出现数据表格、公司列表、多卡片网格,只允许一个核心视觉 + 简短文字 + 一个引导动作
- 任何 L3 级别的密集信息必须通过用户主动 click 才能进入

---

## 二、整体产品定位与视觉风格

**产品名称**:AI Industry Intelligence Terminal
**中文名称**:AI 全产业链智能研究终端

### 视觉参考

- **Linear.app 官网**:暗黑、克制、渐变光晕、极致留白
- **Arc Browser 官网 / Vercel 官网**:科技感 + 产品感 + 呼吸感
- **Apple Vision Pro 产品页**:滚动驱动的电影化叙事
- **NVIDIA Omniverse 落地页**:3D 场景与信息层的融合
- **Stripe Sessions / Bloomberg 终端**:仅在"深层页面"才借鉴它们的信息密度
- **TensorFlow Playground**:仅在交互细节上参考

### 视觉氛围

- 背景以 **near-black / slate / zinc** 为底
- 关键节点用 **冷色霓虹(cyan / electric blue / violet)**,避免彩虹色
- 大面积使用 subtle gradient glow 和 noise texture
- 卡片使用 glassmorphism,但仅在 L2/L3 出现
- 字体:标题用大字号 + 极细字重的对比;数据用 monospace;正文克制
- 动效统一使用 Framer Motion,节制、有质感、不浮夸

### 入场动画与电影化氛围

- 首次进入时有 **2–3 秒的入场动画**:可以是粒子从四周汇聚成产业链网络、或一束光从底部流过点亮各个节点、或一个 3D 球体缓慢旋转展示产业链结构
- 使用 **react-three-fiber / Three.js** 或纯 WebGL Shader 实现背景层(流动的光线、噪声场、星云感)
- Hero 区域使用 **大面积负空间** + **一个核心运动元素**
- 鼠标交互:cursor 跟随的微光晕、磁吸效果、节点 hover 时的呼吸光
- 切换页面时使用 **shared element transition / view transitions API**,让用户感觉是在"穿越"而非"跳转"

---

## 三、技术栈要求

- React
- TypeScript(严格模式)
- Vite
- TailwindCSS
- shadcn/ui
- Framer Motion
- React Router
- **react-three-fiber / Three.js**(用于 Hero 入场动画与 3D 产业链可视化)
- React Flow(用于产业链关系图、公司关系图、上下游依赖图)
- Recharts(用于财务图表、市场份额图、趋势图)
- ECharts 或 d3-sankey(用于 AI 价值流动 Sankey Diagram)
- Zustand 或 React Context(用于全局交互状态管理)
- lucide-react(用于图标)
- 响应式布局,桌面优先,同时兼容平板和移动端

### 代码要求

- TypeScript 严格类型
- 组件化设计,数据结构可扩展
- 所有产业链层级、公司、关系、财务指标、时间线、价值流动都必须**配置化**
- 不允许在 JSX 中写死产业链结构或公司列表
- 所有数据放在 `/src/data` 目录
- 所有类型放在 `/src/types` 目录
- 页面只通过 id、配置和数据结构渲染
- 当前版本为高保真前端 Demo,不接入真实 API
- 所有财务、市值、估值、市场份额、国产替代率数据都必须标注为 **Illustrative demo data**
- 不允许伪装成实时真实数据
- 预留未来接入真实数据 API 的 adapter 结构

---

## 四、核心产业链结构

产业链主链:

```
能源 → 数据中心 → 半导体设备 → 半导体材料 → EDA / IP → 芯片设计
→ 晶圆制造 → 先进封装 → HBM / 存储 → 服务器 / 网络 → 云平台
→ 基础模型 → AI Infra / Agent Framework → AI 应用
→ 自动驾驶 / 机器人 / AI Native Software
```

每一层在 L3 详情页中展示:层级名称、简短描述、在 AI 中的职责、为什么重要、核心技术、技术壁垒、商业模式、核心公司、全球竞争格局、中国竞争格局、国产替代情况、上游依赖、下游客户、主要风险、未来趋势。

---

## 五、必须实现的页面路由

### 1. `/` 首页

按照 L1 → L2 → L3 的节奏分段呈现。详细动画时序与实现要点见 **附录 A**。

**L1(首屏)**:
- 3D / 粒子化的产业链抽象形态(不显示具体层级名称)
- 一句产品定位文案
- 一个"开始探索"的引导动作(不一定是按钮,可以是滚动提示、呼吸光点等)
- 不超过 50 个中文字

**L2(向下滚动后)**:
- 产业链以抽象形态平滑过渡到结构化形态
- 层级以节点 / 流线呈现,hover 才显示名称
- 提供「中国 / 全球」模式切换
- click 节点进入 L3

**L3(用户主动展开后)**:
- 展开后的层级卡片支持折叠 / 展开
- 折叠态:名称 + 简短描述 + 核心公司数量 + 技术壁垒指数 + 国产替代率
- 展开态:详细描述 + 关键技术 + 核心公司 + 全球格局 + 中国格局 + 上下游关系 + 跳转详情按钮
- 同时显示 AI 价值流向预览、AI 技术时间线预览(仅在用户滚动到对应区域才出现)

### 2. `/layers/:layerId` 产业层详情页

属于 L3 深度层,允许高信息密度。展示内容:

- 该层在 AI 中的作用、为什么重要、技术壁垒、成本结构、核心商业模式、谁拥有定价权
- 全球竞争格局、中国国产替代情况、产业链上下游依赖、资本开支流向、主要风险、未来 3-5 年趋势

可视化模块:

- **上下游关系图**:React Flow 展示该层与上下游层级、公司之间的连接
- **技术架构图**:卡片 / 节点方式展示该层的核心技术组成
- **市场格局图**:Recharts 展示示意性市场份额
- **中国 vs 全球对比图**:全球龙头、中国公司、技术差距、国产替代率
- **公司列表**:Logo / 名称 / 国家 / 类型 / 股票代码 / 市值或估值 / AI 核心产品 / 市场地位 / 护城河 / 风险点 / 所属产业层

### 3. `/companies/:companyId` 公司详情页

属于 L3 深度层。展示内容:

**基础信息**:Logo、名称、股票代码、交易所、国家、公司类型、市值/估值、PE、营收、利润、毛利率、成立时间、CEO、总部、所属产业层。
- 上市公司展示市值、PE、营收、利润等
- 非上市公司展示估值、融资轮次、主要投资方
- 子公司展示母公司和业务归属
- 缺失数据显示为 N/A 或 Not disclosed,不允许编造

**AI 业务分析**:AI 核心产品、AI 产业链位置、主要客户、主要供应商、核心竞争力、护城河、风险点、AI 收入占比(mock data)、当前 AI 战略地位、未来机会、行业趋势影响。

例如 NVIDIA 页面需要体现:GPU、CUDA、AI 加速卡、数据中心业务、与 TSMC / SK Hynix / AWS / OpenAI / Tesla 等的关系。护城河:硬件性能、CUDA 生态、开发者生态、供应链能力、客户锁定。风险:竞争、供应链、监管、客户自研芯片、估值压力。

**上下游关系**:React Flow 节点关系图 + Sankey Diagram + 供应链可视化。
点击 NVIDIA 时自动高亮 TSMC、SK Hynix、AWS、OpenAI、Microsoft Azure、Tesla 等,但这个逻辑**必须基于 relationships 数据自动生成,不能写死**。

**财务分析**:Recharts 展示营收、利润、毛利率、研发投入、AI 收入、数据中心收入等趋势。所有财务数据必须标注 *"Illustrative demo data. Not real-time financial data."*

**AI 战略分析**:当前 AI 地位、产业链定价权、关键护城河、主要依赖、行业趋势、未来 3-5 年机会、主要风险。

### 4. `/map` 全产业链关系网络图

属于 L2/L3 过渡页。初始呈现简洁的产业链全景,用户筛选 / 点击后才显示完整密度。

- 所有产业层、所有核心公司、公司之间的关系(上下游、供应商、客户、竞争者、合作伙伴)
- 使用 React Flow
- hover 节点高亮相关节点和边
- 点击公司 / 产业层时右侧显示摘要
- 支持按产业层、国家 / 地区、关系类型筛选
- 支持中国 / 全球模式切换
- 关系类型:supplier / customer / competitor / cloud-partner / manufacturing / model-provider / infrastructure / investor / ecosystem

### 5. `/value-flow` AI 价值流动页面

回答:"AI 产业链中,收入和利润最终流向哪里?"

使用 Sankey Diagram 展示示意性价值流动。示例:

```
OpenAI 收入 → Microsoft Azure → NVIDIA → TSMC → ASML → 半导体设备 / 材料
企业 AI 应用收入 → 云平台 → GPU 服务器 → HBM / 存储 → 晶圆制造 → 半导体设备
```

展示:收入流、成本流、资本开支流、利润池、关键受益者、价值链瓶颈。所有金额为 mock data,必须标注为示意数据。

### 6. `/timeline` AI 技术与资本时间线

时间线以电影化方式呈现(滚动驱动 / 横向滑动),不要做成静态列表。

关键事件:2012 AlexNet、2017 Transformer、2020 GPT-3、2022 ChatGPT、2023 GPU 供给瓶颈、2024 Agent 兴起、2025 AI Infra 与推理成本优化、未来 Humanoid Robot / Embodied AI / AI Native Enterprise。

支持筛选:global / china / model / hardware / infra / application / capital。

---

## 六、必须实现的交互能力

转场规范详见 **附录 B**;3D 节点系统延续性详见 **附录 C**。

### 1. Hover 高亮

hover 产业层 / 公司 / 技术 / 关系边时,自动高亮相关上下游关系。

例如:hover「芯片设计」时,高亮上游(EDA / IP、半导体材料、晶圆制造)、下游(晶圆制造、先进封装、HBM、服务器、云平台)、相关公司(NVIDIA、AMD、Broadcom、Qualcomm、华为海思、寒武纪等)。

### 2. 点击公司联动

点击公司节点时设置 `selectedCompanyId`,高亮所有上游供应商、下游客户、合作伙伴、竞争对手,右侧或底部展示公司摘要,提供进入公司详情页按钮。**高亮关系必须来自 relationships 数据,不允许写死。**

### 3. 中国 vs 全球切换

全局支持 `global` / `china` 两种模式。切换后影响产业层展示内容、核心公司列表、技术短板描述、国产替代率、市场格局图、关系网络图、价值流动图、时间线。

中国模式不是简单换公司,而是展示:中国代表公司、与全球龙头的差距、国产替代机会、技术卡点、供应链短板、政策与资本支持、未来突破方向。

### 4. 展开 / 折叠

首页产业链每一层支持展开 / 折叠,规则见"页面路由 - 首页 L3"部分。

### 5. 搜索与筛选

顶部搜索覆盖产业层、公司、技术、关系类型。
筛选项:产业层、国家 / 地区、公司类型、上市 / 非上市、全球 / 中国、关系类型、护城河类型、风险类型。

### 6. 探索路径与激励机制

- 顶部或侧边出现 **"探索深度指示器"**:以视觉化方式展示用户当前所在的产业链层级与公司路径(类似 breadcrumb 但更具科技感)
- 每个节点 hover 时显示 **"还有 X 个相关节点未探索"** 的微提示
- 进入新公司 / 新产业层时,有 **轻微的 reveal 解锁动效**(接近 Apple 的"reveal"美学,避免廉价的游戏化徽章感)
- 全局保留一个 **"鸟瞰模式"按钮**:随时可以 zoom out 回到产业链总览
- 切换页面时使用 shared element transition,让节点在不同页面间"延续"而非"跳转"

---

## 七、最终交付

- 完整可运行的 Vite / React / TypeScript 项目
- 所有路由、组件、数据、类型全部到位
- `npm install && npm run dev` 可直接启动
- 所有数据集中在 `/src/data`,标注 Illustrative demo data
- 预留真实数据 API 的 adapter 结构

---

# 附录 A:L1 首屏入场动画详细规范

## 一、核心理念

首屏的使命不是"展示产品功能",而是**让用户在 3 秒内感受到三件事**:

1. 这是一个关于 AI 产业的、严肃且高级的研究产品
2. 背后有一个庞大而有序的知识网络
3. 它在邀请我去探索,而不是在向我推销

参考的情绪基调:**Apple Vision Pro 发布页的开场** + **NVIDIA GTC Keynote 的片头** + **Dune 电影的极简海报美学**。

不要做成:科技公司年会的开场动画、Web3 项目的粒子爆炸、SaaS 产品的 Hero illustration。

---

## 二、动画时序(总时长 3.5 秒,可由用户滚动/点击中断)

### Phase 0:黑场(0.0s – 0.3s)

- 全黑屏,仅在屏幕正中央有一个极小的光点(直径 2px),带轻微呼吸
- 背景已经在加载 noise texture 和 gradient,但还未显现
- 这 0.3 秒是为了让用户的视觉"归零",准备接受接下来的内容

### Phase 1:光点扩散(0.3s – 1.2s)

- 中心光点开始向外辐射,形成一道**水平光带**(horizontal light sweep),从中心向左右两侧扫开
- 光带颜色:cyan → electric blue 的渐变,带轻微的 chromatic aberration(色散)
- 光带扫过的同时,背景的 noise texture 和 radial gradient 逐渐显现(opacity 0 → 0.6)
- 配合一声极轻的低频 whoosh 音效(可选,默认静音,提供音效开关)

### Phase 2:节点浮现(1.2s – 2.5s)

- 光带消散后,屏幕中开始浮现**约 60–100 个粒子节点**
- 节点从屏幕四周向中心区域缓慢汇聚,但**不形成具体的产业链结构**——保持抽象、星云般的形态
- 节点之间有极细的连线(stroke-width 0.5px),连线只在节点接近时才显现
- 节点和连线整体构成一个**缓慢旋转、轻微起伏**的 3D 网络(使用 react-three-fiber)
- 此阶段镜头有一次**极缓慢的 dolly-in**(推进),从远景拉到中景,营造"进入一个世界"的感觉

### Phase 3:文字浮现(2.5s – 3.5s)

- 在节点网络稳定之后,文字以 **极慢的 fade-in + 微小上移(translateY: 8px → 0)** 出现
- 文字分两层:
  - **主标题**(大字号、极细字重):`AI Industry Intelligence`
  - **副标题**(小字号、monospace、低对比度):`全产业链智能研究终端`
- 主副标题之间有 200ms 的错位(主标题先出,副标题后出)
- 文字下方留出大片负空间,**最底部**出现一个极小的引导动作(见下文)

### Phase 4:常驻状态(3.5s+)

- 节点网络持续缓慢呼吸 / 旋转(无限循环,但运动幅度极小,不喧宾夺主)
- 鼠标移动时,靠近 cursor 的节点会被"吸引"并发出微光(磁吸效果)
- 文字保持静止,但偶尔(每 8–12 秒)有极轻微的字符级故障效果(glitch),暗示这是一个"活的"系统

---

## 三、画面构成(首屏可见区域)

按从上到下的视觉层次:

```
┌─────────────────────────────────────────────────┐
│  [极简 Logo + 产品名]              [音效开关]    │  ← 顶部导航,opacity 0.4
│                                                 │
│                                                 │
│                                                 │
│         · · · · · · · · ·                       │
│       ·                     ·                   │
│      ·      [3D 节点网络]      ·                │  ← 主视觉区域
│       ·                     ·                   │
│         · · · · · · · · ·                       │
│                                                 │
│                                                 │
│         AI Industry Intelligence                │  ← 主标题
│         全产业链智能研究终端                      │  ← 副标题
│                                                 │
│                                                 │
│                  ↓                              │  ← 引导动作
│              Scroll to explore                  │
└─────────────────────────────────────────────────┘
```

**严格约束**:
- 首屏可见区域内文字总量 ≤ 50 个中文字(含英文换算)
- 不允许出现任何按钮、表单、卡片、数据、列表
- 不允许出现产业链具体层级名称(如"芯片设计""云平台"等)
- 不允许出现任何公司名称或 Logo
- Hero 区域不允许超过 3 种颜色(黑底 + cyan/blue 渐变 + 白色文字)

---

## 四、引导动作(Scroll Hint)的设计

底部的引导动作是整个 L1 → L2 转场的关键,必须做得克制但不可忽视:

- 一个极简的向下箭头(lucide-react 的 `ChevronDown`),尺寸 16px
- 下方一行小字 `Scroll to explore` 或 `向下探索`,字重 300,opacity 0.5
- 整体做 **2 秒一次的轻微上下浮动**(translateY: 0 → 4px → 0)
- 用户首次滚动时,引导动作以 fade-out 消失,不再回来

---

## 五、L1 → L2 转场(用户开始滚动时)

这是体验的第二个关键时刻:

1. 用户滚动的瞬间(即使只滚 10px),节点网络开始**自动重组**
2. 原本无序的星云状节点,在 1.5 秒内**有序地排列成产业链的纵向结构**——能源在最上,AI 应用在最下
3. 镜头同时从"中景"拉到"全景",能看到完整的产业链骨架
4. 节点在排列完成的瞬间,**层级名称才以打字机效果逐个浮现**(间隔 80ms)
5. 此时用户已经从 L1 进入 L2,看到的是"抽象的产业链结构",但还没有任何公司或数据

这个转场必须是**滚动驱动**(scroll-linked,使用 Framer Motion 的 `useScroll` + `useTransform`),而不是一次性触发的动画。用户向上滚回去时,节点会回到星云状态。这种可逆性会让用户感觉自己在操控一个"活的系统",而不是被动接受动画。

---

## 六、技术实现要点

- **3D 节点网络**:react-three-fiber + drei,使用 `Points` 或 `InstancedMesh` 渲染节点,连线用 `LineSegments`
- **节点位置**:初始位置用 simplex noise 在球形空间内分布,L1→L2 转场时用 `lerp` 插值到产业链结构的目标坐标
- **背景**:CSS radial-gradient + SVG noise filter(或 GLSL shader)实现氛围层
- **文字动画**:Framer Motion 的 `motion.h1` + `initial` / `animate` / `transition`
- **滚动驱动转场**:`useScroll({ target: heroRef })` + `useTransform` 将滚动进度映射到节点位置插值参数
- **性能**:节点数量上限 100,移动端降至 40;启用 `frameloop="demand"` 避免无意义重渲染;为低性能设备提供降级版本(静态 SVG 节点 + CSS 动画)
- **可访问性**:尊重 `prefers-reduced-motion`,开启时跳过入场动画,直接显示 Phase 4 的常驻状态

---

## 七、不要做的事(反例清单)

- ❌ 粒子爆炸 / 烟花效果(Web3 美学)
- ❌ 全屏视频背景(性能差且廉价)
- ❌ 数字雨 / Matrix 风格代码流(陈词滥调)
- ❌ 地球旋转 / 全球网络连线(咨询公司 PPT 美学)
- ❌ 在 Hero 区域放产品截图或 dashboard 预览
- ❌ 自动播放音效(音效必须默认静音 + 用户主动开启)
- ❌ 强制用户等待动画播完才能交互(任何时候用户滚动 / 点击都应立即响应)
- ❌ 多个动效同时进行导致画面繁忙(同一时刻只允许一个主要动效)

---

# 附录 B:L1 → L2 → L3 转场统一规范

## 一、核心理念

转场不是页面之间的"切换",而是**镜头在同一个 3D 世界中的移动**。

用户从首页进入产业层详情页、再进入公司详情页,应该感觉像是**摄影机从太空俯瞰地球,逐渐推进到一个国家、一座城市、一栋建筑**——而不是像翻书一样换页。

参考的情绪基调:**Google Earth 的 zoom-in** + **《星际穿越》的尺度切换** + **macOS Mission Control 的空间感**。

不要做成:传统 SPA 的 fade transition、PPT 的翻页动画、移动端 App 的 push/pop。

---

## 二、转场层级与命名

整个产品共有 **3 个深度层级**和 **5 种转场类型**:

| 层级 | 内容 | 信息密度 | 镜头比喻 |
|------|------|---------|---------|
| **L1** | 首屏 Hero | 极低 | 太空俯瞰 |
| **L2** | 产业链全景 / Map / Value Flow / Timeline | 中等 | 平流层巡航 |
| **L3** | 产业层详情 / 公司详情 | 高 | 地面特写 |

5 种转场类型:

1. **Descend(下潜)**:L1 → L2、L2 → L3,镜头推进
2. **Ascend(上浮)**:L3 → L2、L2 → L1,镜头拉远
3. **Lateral(平移)**:L2 ↔ L2(如 Map ↔ Value Flow),同层级横向移动
4. **Pivot(旋转)**:L3 ↔ L3(如公司详情 ↔ 另一公司详情),镜头围绕中心旋转切换
5. **Teleport(跳跃)**:通过搜索 / 直接输入 URL 进入,无前置上下文时使用

---

## 三、各转场的详细规范

### 1. Descend(下潜)— L1 → L2

**触发方式**:用户首次滚动(已在附录 A 中详述)

**时长**:1.5 秒

**关键动作**:
- 节点从星云状态重组为产业链纵向结构
- 镜头从中景拉到全景
- 层级名称以打字机效果浮现
- 背景 noise texture 的 opacity 从 0.6 提升到 0.8(更"实体化")

**可逆性**:用户向上滚回时,完全可逆,节点回到星云状态

---

### 2. Descend(下潜)— L2 → L3

**触发方式**:用户点击产业链节点 / Map 中的节点 / 公司列表项

**时长**:1.2 秒

**关键动作**:

```
Phase 1 (0.0s – 0.4s) — 选中与放大
- 被点击的节点放大到 1.4 倍
- 其余节点 opacity 降至 0.15
- 周围连线高亮(cyan glow 增强)
- 节点开始向屏幕中心移动

Phase 2 (0.4s – 0.9s) — 镜头推进
- 镜头快速 dolly-in,被选中节点占据屏幕中心 60% 区域
- 背景的其他节点在视觉上"飞过"屏幕边缘(motion blur)
- 此时 URL 已变更,但页面内容尚未显现

Phase 3 (0.9s – 1.2s) — 内容浮现
- 被选中节点"绽放",从一个点扩展为详情页的 Hero 区域
- 详情页的标题、关键数据以错位 fade-in 出现(每个元素间隔 60ms)
- 节点本身**保留在详情页 Hero 区域**,作为视觉锚点(见附录 C)
```

**关键原则**:用户点击的那个节点**必须在详情页中持续可见**,不能消失。这是"延续性"的核心。

---

### 3. Ascend(上浮)— L3 → L2

**触发方式**:用户点击返回按钮 / 浏览器后退 / 点击"鸟瞰模式"按钮

**时长**:1.0 秒(比下潜稍快,符合"返回应该轻盈"的体感)

**关键动作**:

```
Phase 1 (0.0s – 0.3s) — 内容退场
- 详情页的所有 L3 内容(图表、表格、文字)以快速 fade-out 消失
- 但 Hero 区域的核心节点保留

Phase 2 (0.3s – 0.8s) — 镜头拉远
- 镜头快速 dolly-out,核心节点缩小回到 L2 中的原位置
- 周围节点 opacity 从 0.15 恢复到 1.0
- 背景从"实体化"状态恢复到 L2 的氛围

Phase 3 (0.8s – 1.0s) — 状态稳定
- 被访问过的节点带有一个**微小的"已探索"标记**(节点边缘多一圈极细的 cyan ring)
- 这个标记永久保留,作为用户探索历史的视觉记忆
```

---

### 4. Lateral(平移)— L2 ↔ L2

**触发方式**:用户通过顶部导航在 `/`、`/map`、`/value-flow`、`/timeline` 之间切换

**时长**:0.8 秒

**关键动作**:

```
- 镜头不变焦距,但进行"横向位移"
- 节点网络整体"滑出"屏幕一侧,新页面的节点从另一侧"滑入"
- 但产业链的核心节点(约 15 个层级节点)作为"共享元素"保留在屏幕中
- 它们从旧位置平滑过渡到新页面的位置(如从首页的纵向排列 → Map 中的网络分布 → Value Flow 中的 Sankey 节点 → Timeline 中的时间轴节点)
- 这给用户的体感是:「同一组节点,换了一种观察方式」
```

**实现方式**:使用 View Transitions API + 共享 `view-transition-name`,配合 Framer Motion 的 `layoutId` 实现节点级的 morph 动画。

---

### 5. Pivot(旋转)— L3 ↔ L3

**触发方式**:在公司详情页中点击另一家相关公司(如在 NVIDIA 页面点击 TSMC)

**时长**:1.0 秒

**关键动作**:

```
Phase 1 (0.0s – 0.4s) — 旋转准备
- 当前公司节点缩小至屏幕中心的 60% 大小
- 目标公司节点从屏幕边缘飞入
- 两个节点同时出现,连线高亮(表示它们的关系,如 supplier)

Phase 2 (0.4s – 0.7s) — 旋转切换
- 镜头围绕两个节点的中点旋转 180°
- 视觉上像是"翻面":从看 NVIDIA 的视角,旋转到看 TSMC 的视角
- 旋转过程中,所有 L3 内容快速 fade-out / fade-in

Phase 3 (0.7s – 1.0s) — 新内容浮现
- 目标公司节点占据 Hero 区域
- 新页面的 L3 内容以错位 fade-in 出现
```

**关键原则**:Pivot 用于强调"两家公司之间存在关系"。如果用户是通过搜索跳转到另一家公司,应该使用 Teleport 而非 Pivot。

---

### 6. Teleport(跳跃)— 无前置上下文

**触发方式**:直接输入 URL / 通过搜索结果跳转 / 外部链接进入

**时长**:1.5 秒(需要重新构建上下文)

**关键动作**:

```
Phase 1 (0.0s – 0.5s) — 黑场 + 微光
- 屏幕快速变黑(类似 L1 的 Phase 0)
- 中心出现一个光点

Phase 2 (0.5s – 1.0s) — 上下文重建
- 光点扩散,背景节点网络快速生成(但不做完整的 L1 入场,省略星云阶段)
- 镜头直接定位到目标节点的位置

Phase 3 (1.0s – 1.5s) — 内容浮现
- 目标页面内容以正常的 fade-in 出现
- 顶部出现一个**面包屑式的"路径提示"**,告诉用户当前所处的位置
- 提示文案:「你正在查看 NVIDIA · 属于 芯片设计 · 全球模式」
```

---

## 四、转场全局规则

1. **任何时候用户的操作(点击 / 滚动 / 键盘)都应立即响应**,不允许"等动画播完"
2. **被中断的动画必须优雅终止**,不能出现卡顿或闪烁
3. **所有转场都尊重 `prefers-reduced-motion`**,开启时使用 0.2s 的简单 fade
4. **转场期间禁用所有交互**(除中断动作),避免用户在中间状态触发错误
5. **URL 在 Phase 2 中变更**,而非 Phase 1 或 Phase 3,确保浏览器历史与视觉状态一致
6. **不允许超过 1.5 秒的转场**,超过此阈值用户会感到拖沓

---

# 附录 C:3D 节点网络的跨页面延续性设计

## 一、核心理念

3D 节点网络不是"首页的装饰",而是**贯穿整个产品的视觉主角**。

它在不同页面中以不同形态存在,但**节点本身是同一组对象**——就像同一群演员在不同场景中出演,而不是每个场景都换一批演员。

这种设计的目的是让用户产生"我在探索一个**统一的世界**,而不是在浏览几十个独立页面"的感受。

---

## 二、节点的全局身份系统

每个节点拥有一个**全局唯一的视觉身份**(visual identity),由以下属性组成:

```typescript
type NodeVisualIdentity = {
  id: string;                    // 全局唯一 ID
  type: 'layer' | 'company';     // 节点类型
  category: string;              // 产业层归属
  geometry: 'sphere' | 'cube' | 'icosahedron'; // 几何形态
  baseColor: string;             // 基础颜色(按产业层分配)
  glowIntensity: number;         // 发光强度(按重要性分配)
  size: number;                  // 节点大小(按市值/估值映射)
  exploredState: boolean;        // 是否已被用户探索过
};
```

**关键规则**:
- 节点的视觉身份在**所有页面中保持一致**
- 用户在首页看到的 NVIDIA 节点,和在 Map、Value Flow、公司详情页中看到的,必须是**同一个视觉对象**(同样的几何、颜色、大小、发光特征)
- 节点的位置可以变化(不同页面有不同的布局),但身份不变

---

## 三、节点在不同页面的形态

| 页面 | 节点形态 | 布局方式 |
|------|---------|---------|
| **L1 首页(Hero)** | 抽象星云,无明确身份 | 球形空间内随机分布 |
| **L1 首页(产业链)** | 显形节点,按产业层着色 | 纵向产业链结构 |
| **L2 Map** | 显形节点,按关系连接 | 力导向布局(force-directed) |
| **L2 Value Flow** | 节点变形为 Sankey 端点 | Sankey 图的纵向通道 |
| **L2 Timeline** | 节点排列在时间轴上 | 横向时间线,按年份分布 |
| **L3 产业层详情** | 该层节点放大,其他节点退至背景 | 中心舞台 + 背景星云 |
| **L3 公司详情** | 该公司节点占据 Hero,关系节点环绕 | 中心 + 卫星布局 |

---

## 四、节点在页面间的 morph 动画

当用户从一个页面切换到另一个页面时,节点不是"消失再出现",而是**平滑变形到新位置**。

### 示例 1:首页 → Map

- 首页的纵向产业链节点保留位置
- 公司节点从"折叠态"展开,飞到 Map 中的目标位置
- 节点之间的连线动态生成
- 整个过程 0.8 秒

### 示例 2:首页 → Value Flow

- 产业链节点**沿水平方向"压扁"**,变成 Sankey 图的纵向通道端点
- 节点的颜色保留,但形态从球形变成扁平的"流量节点"
- 节点之间的连线"加粗",变成 Sankey 图的流量带
- 整个过程 1.0 秒

### 示例 3:首页 → Timeline

- 节点按其"诞生时间"或"关键事件年份"重新排列在横向时间轴上
- 早期节点(如 GPU、AlexNet 相关)在左侧,近期节点(如 Agent、Embodied AI)在右侧
- 节点的大小不变,但发光强度根据"该年份的重要性"重新映射

### 示例 4:公司详情页 → 另一公司详情页(Pivot)

- 当前公司节点保留在屏幕中心
- 目标公司节点从屏幕边缘飞入
- 两个节点旋转 180°,目标节点占据中心
- 周围的"卫星节点"(关系节点)同步更新

---

## 五、节点的"记忆"系统

节点会**记住用户的探索历史**:

1. **未探索状态**:默认外观,opacity 0.8
2. **被 hover 过**:opacity 提升到 1.0,但无永久标记
3. **被点击 / 访问过**:永久带有一个极细的 cyan ring(边缘光环)
4. **当前选中**:边缘 ring 加粗,并伴随轻微的呼吸光

这些状态**持久化在 localStorage 中**,用户下次访问时,已探索过的节点依然带有标记。

这种设计让用户产生"我在这个世界里留下了足迹"的感受,鼓励持续探索。

---

## 六、节点之间的连线系统

连线也是延续性设计的一部分:

- **基础连线**:极细(0.5px),低 opacity(0.2),仅作为结构暗示
- **关系连线**:当涉及具体关系(supplier / customer / competitor)时,使用不同颜色编码
- **流量连线**:在 Value Flow 中加粗为流量带,宽度映射价值流量
- **时间连线**:在 Timeline 中变成事件之间的"因果箭头"

**关键原则**:同一对节点之间的连线,在不同页面中**应该是同一条连线的不同表现形态**,而不是独立绘制的多条线。

---

## 七、技术实现要点

### 1. 全局节点状态管理

使用 Zustand 创建一个 `useNodeRegistry` store:

```typescript
type NodeRegistry = {
  nodes: Map<string, NodeVisualIdentity>;
  positions: Map<string, { page: string; x: number; y: number; z: number }>;
  exploredIds: Set<string>;
  selectedId: string | null;
  hoveredId: string | null;

  registerNode: (node: NodeVisualIdentity) => void;
  updatePosition: (id: string, page: string, position: Vec3) => void;
  markExplored: (id: string) => void;
};
```

### 2. 跨页面的节点持久化

- 节点的 3D 场景**不随路由销毁**,而是作为顶层组件常驻
- 页面组件只负责更新节点的"目标位置",由 3D 场景统一执行 morph 动画
- 实现方式:在 App 根组件中渲染 `<NodeUniverse />`,路由组件只负责声明"我需要哪些节点显示在哪些位置"

### 3. View Transitions API + Framer Motion `layoutId`

- 对于需要跨页面共享的 DOM 元素(如节点的 SVG 表示),使用 `layoutId` 实现 morph
- 对于 3D 场景中的节点,使用 r3f 的 `useFrame` + `lerp` 在每帧插值位置

### 4. 性能优化

- 节点总数控制在 200 以内(移动端 80 以内)
- 不可见节点使用 frustum culling 跳过渲染
- 连线使用 `InstancedBufferGeometry` 批量渲染
- 复杂动画使用 GPU 加速(CSS transform / Three.js shader)

### 5. 降级方案

- 低性能设备检测:fps < 30 时自动降级
- 降级版本:禁用 3D 场景,使用 SVG 节点 + CSS 动画
- 进一步降级:仅显示静态布局,无任何动画

---

## 八、不要做的事(反例清单)

- ❌ 每个页面独立绘制节点网络(破坏延续性)
- ❌ 转场时节点完全消失再重新出现(用户会失去空间感)
- ❌ 节点在不同页面颜色或形态完全不同(破坏视觉身份)
- ❌ 节点的 morph 动画超过 1.5 秒(拖沓)
- ❌ 节点数量超过 200(性能崩溃 + 视觉混乱)
- ❌ 探索历史不持久化(用户每次访问都"从零开始",失去归属感)
- ❌ 强行把所有数据都做成节点(有些信息更适合表格 / 图表,不要为了"延续性"而牺牲信息表达效率)

---

# 附录 D:数据架构与 Mock Data 规范

## 一、核心理念

数据是这个产品的灵魂。所有页面、所有交互、所有可视化都由数据驱动。**没有写死的产业链结构、没有写死的公司关系、没有写死的财务数字。**

数据架构必须满足三个目标:

1. **可扩展**:未来增加新公司、新产业层、新关系类型时,无需修改任何组件代码
2. **可联动**:节点的高亮、关系图的绘制、Sankey 的流向,全部由 relationships 数据自动推导
3. **可替换**:未来接入真实 API 时,只需替换 data adapter 层,组件代码无需改动

---

## 二、目录结构

```
/src/data/
├── layers/
│   ├── index.ts                  # 导出所有产业层
│   ├── energy.ts                 # 能源层
│   ├── data-center.ts            # 数据中心
│   ├── semiconductor-equipment.ts
│   ├── ... (共 15 个)
│   └── ai-application.ts
├── companies/
│   ├── index.ts                  # 导出所有公司
│   ├── nvidia.ts
│   ├── tsmc.ts
│   ├── ... (每家公司一个文件)
│   └── openai.ts
├── relationships/
│   ├── index.ts                  # 导出所有关系
│   ├── supply-chain.ts           # 上下游关系
│   ├── customer-supplier.ts      # 客户-供应商
│   ├── competition.ts            # 竞争关系
│   └── partnership.ts            # 合作关系
├── value-flows/
│   ├── index.ts
│   ├── revenue-flow.ts           # 收入流
│   ├── capex-flow.ts             # 资本开支流
│   └── profit-pool.ts            # 利润池
├── timeline/
│   ├── index.ts
│   └── events.ts                 # 时间线事件
├── financial/
│   ├── index.ts
│   └── [companyId].ts            # 每家公司的财务数据
└── adapters/
    ├── index.ts                  # 统一导出
    ├── mockAdapter.ts            # 当前 Demo 使用
    └── apiAdapter.ts             # 未来真实 API 接入(预留)

/src/types/
├── layer.ts
├── company.ts
├── relationship.ts
├── valueFlow.ts
├── timeline.ts
└── financial.ts
```

---

## 三、核心 Schema 定义

### 1. Layer(产业层)

```typescript
type Layer = {
  id: string;                          // 唯一标识,如 'chip-design'
  name: { en: string; zh: string };    // 中英文名称
  order: number;                       // 在产业链中的顺序(1-15)

  description: {
    short: { en: string; zh: string }; // ≤ 50 字
    long: { en: string; zh: string };  // 详细描述
  };

  roleInAI: { en: string; zh: string };           // 在 AI 中的职责
  whyImportant: { en: string; zh: string };       // 为什么重要

  coreTechnologies: string[];                      // 核心技术列表
  technicalBarrier: 1 | 2 | 3 | 4 | 5;            // 技术壁垒指数
  businessModel: string[];                         // 商业模式标签
  pricingPower: 'high' | 'medium' | 'low';        // 定价权

  globalLandscape: {
    leaders: string[];                             // 全球龙头公司 ID
    marketShare: { companyId: string; share: number }[]; // 市场份额(mock)
    competitionIntensity: 1 | 2 | 3 | 4 | 5;
  };

  chinaLandscape: {
    representatives: string[];                     // 中国代表公司 ID
    gapToGlobal: { en: string; zh: string };       // 与全球差距
    localizationRate: number;                      // 国产替代率 0-1
    keyBottlenecks: string[];                      // 技术卡点
    policySupport: 'strong' | 'medium' | 'weak';
  };

  upstreamLayerIds: string[];                      // 上游产业层 ID
  downstreamLayerIds: string[];                    // 下游产业层 ID

  risks: { type: string; description: string }[]; // 主要风险
  futureTrends: { en: string; zh: string }[];     // 未来 3-5 年趋势

  visualIdentity: {
    color: string;                                 // 主色(用于节点着色)
    geometry: 'sphere' | 'cube' | 'icosahedron';
  };

  _meta: {
    dataSource: 'illustrative-demo';               // 强制标注
    lastUpdated: string;
  };
};
```

### 2. Company(公司)

```typescript
type Company = {
  id: string;                          // 'nvidia', 'tsmc' 等
  name: { en: string; zh: string };
  logo: string;                        // 路径或占位符

  basicInfo: {
    country: string;                   // ISO 国家代码
    region: 'global' | 'china' | 'us' | 'eu' | 'asia';
    type: 'public' | 'private' | 'subsidiary' | 'state-owned' | 'undisclosed';
    ticker?: string;                   // 股票代码(如适用)
    exchange?: string;                 // 交易所
    founded: number;                   // 成立年份
    headquarters: string;
    ceo?: string;
    parentCompanyId?: string;          // 母公司(如适用)
  };

  // 上市公司字段
  publicMetrics?: {
    marketCap: number | 'N/A';         // 市值(mock)
    pe: number | 'N/A';
    revenue: number | 'N/A';
    profit: number | 'N/A';
    grossMargin: number | 'N/A';
    currency: 'USD' | 'CNY' | 'EUR';
  };

  // 非上市公司字段
  privateMetrics?: {
    valuation: number | 'Not disclosed';
    fundingRounds: { round: string; amount: number; date: string }[];
    keyInvestors: string[];
  };

  aiBusiness: {
    coreProducts: string[];
    layerIds: string[];                // 所属产业层
    aiRevenueShare: number;            // AI 收入占比 0-1(mock)
    strategicPosition: { en: string; zh: string };
    moats: { type: string; description: string }[];
    risks: { type: string; description: string }[];
    futureOpportunities: string[];
  };

  visualIdentity: {
    size: number;                      // 节点大小(基于市值映射)
    glowIntensity: number;             // 发光强度(基于重要性)
    color?: string;                    // 可覆盖产业层默认色
  };

  _meta: {
    dataSource: 'illustrative-demo';
    lastUpdated: string;
  };
};
```

### 3. Relationship(关系)

```typescript
type Relationship = {
  id: string;

  from: {
    type: 'company' | 'layer';
    id: string;
  };
  to: {
    type: 'company' | 'layer';
    id: string;
  };

  type:
    | 'supplier'          // from 是 to 的供应商
    | 'customer'          // from 是 to 的客户
    | 'competitor'        // 互为竞争者
    | 'cloud-partner'
    | 'manufacturing'
    | 'model-provider'
    | 'infrastructure'
    | 'investor'
    | 'ecosystem';

  strength: 1 | 2 | 3 | 4 | 5;        // 关系强度
  bidirectional: boolean;              // 是否双向(如竞争关系)

  description?: { en: string; zh: string };

  // 用于价值流可视化
  valueFlow?: {
    direction: 'from-to' | 'to-from';
    estimatedValue: number;            // mock 金额
    valueType: 'revenue' | 'capex' | 'profit';
  };

  _meta: {
    dataSource: 'illustrative-demo';
  };
};
```

### 4. ValueFlow(价值流)

```typescript
type ValueFlowNode = {
  id: string;
  label: { en: string; zh: string };
  category: 'revenue-source' | 'intermediate' | 'final-beneficiary';
  linkedCompanyId?: string;
};

type ValueFlowLink = {
  source: string;                      // ValueFlowNode id
  target: string;
  value: number;                       // mock 金额
  type: 'revenue' | 'capex' | 'profit';
};

type ValueFlowScenario = {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  nodes: ValueFlowNode[];
  links: ValueFlowLink[];
  bottlenecks: string[];               // 瓶颈节点 ID
  keyBeneficiaries: string[];          // 关键受益者节点 ID
};
```

### 5. TimelineEvent(时间线事件)

```typescript
type TimelineEvent = {
  id: string;
  year: number;
  month?: number;

  title: { en: string; zh: string };
  description: { en: string; zh: string };

  category: 'model' | 'hardware' | 'infra' | 'application' | 'capital';
  region: 'global' | 'china';
  importance: 1 | 2 | 3 | 4 | 5;

  linkedCompanyIds?: string[];
  linkedLayerIds?: string[];

  visualIdentity: {
    color: string;
    icon?: string;
  };
};
```

---

## 四、Adapter 层设计

### Mock Adapter(当前 Demo 使用)

```typescript
// src/data/adapters/mockAdapter.ts
import { layers } from '../layers';
import { companies } from '../companies';
import { relationships } from '../relationships';

export const mockAdapter: DataAdapter = {
  async getLayers() { return layers; },
  async getLayerById(id) { return layers.find(l => l.id === id); },
  async getCompanies(filter?) { /* ... */ },
  async getCompanyById(id) { /* ... */ },
  async getRelationshipsByCompanyId(companyId) {
    return relationships.filter(r =>
      r.from.id === companyId || r.to.id === companyId
    );
  },
  // ...
};
```

### API Adapter(预留)

```typescript
// src/data/adapters/apiAdapter.ts
export const apiAdapter: DataAdapter = {
  async getLayers() {
    const res = await fetch('/api/layers');
    return res.json();
  },
  // ...
};
```

### 统一接口

```typescript
// src/data/adapters/index.ts
import { mockAdapter } from './mockAdapter';
import { apiAdapter } from './apiAdapter';

export const dataAdapter =
  import.meta.env.VITE_USE_REAL_API === 'true'
    ? apiAdapter
    : mockAdapter;
```

---

## 五、数据规模目标

- **产业层**:15 个(覆盖完整产业链)
- **公司**:约 80 家(每层 4–6 家代表公司)
- **关系**:约 200–300 条(每家公司平均 3–5 条关系)
- **价值流场景**:5–8 个典型场景
- **时间线事件**:约 50 个关键事件(2012–2026)
- **财务数据**:每家上市公司 5 年 mock 历史数据

---

## 六、Mock Data 标注规则

**所有数据文件顶部必须包含**:

```typescript
/**
 * ⚠️ ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
```

**UI 层面**:

- 所有数字旁必须有 `(demo)` 或 `(示意)` 标记
- 财务图表底部必须有 banner:*"Illustrative demo data. Not real-time financial data."*
- 公司详情页顶部有一个 dismissible 的提示横幅
- 不允许在任何地方暗示这是"实时数据"或"真实交易数据"

---

# 附录 E:响应式与移动端适配规范

## 一、核心理念

这个产品**桌面优先**,但移动端不能是"残缺版"——它应该是**为移动端重新设计过的版本**。

移动端用户在地铁、咖啡厅、午休时打开这个产品,他们的需求是**快速浏览 + 重点探索**,而不是深度研究。所以移动端的体验逻辑是:

- **L1 保持电影化**(移动端用户对入场动画的耐心反而更高)
- **L2 简化为列表 + 摘要卡片**(不强求关系图)
- **L3 保留完整信息,但分段呈现**(折叠式 / Tab 式)

---

## 二、断点定义

```typescript
const breakpoints = {
  mobile: '0–639px',      // 手机
  tablet: '640–1023px',   // 平板
  desktop: '1024–1535px', // 桌面
  wide: '1536px+',        // 宽屏
};
```

---

## 三、各页面的移动端策略

### 1. L1 首屏(移动端)

- 入场动画保留,但节点数量从 100 降至 40
- 3D 场景使用更简单的 shader(关闭 chromatic aberration、关闭 motion blur)
- 文字布局:主标题字号缩小至原 60%,副标题保留
- 引导动作改为「向下滑动」+ 一个明显的滑动指示

### 2. L2 产业链全景(移动端)

- 不再使用纵向 3D 产业链,改为**纵向滚动的卡片流**
- 每个产业层一张大卡片,全宽显示
- 卡片中保留节点 hover/tap 效果,但简化为 2D
- 滑动卡片时,背景的节点星云保留作为氛围层

### 3. L2 Map(移动端)

- 关系图不强求完整呈现
- 改为「以选中节点为中心的局部图」(最多显示 2 层连接)
- 提供「按公司搜索」和「按产业层筛选」作为主要入口
- 缩放和拖动使用原生触摸手势

### 4. L2 Value Flow(移动端)

- Sankey 图横向显示(要求用户横屏)
- 或者改为**纵向的流量条图**,每条代表一个流向
- 提供「场景切换」的水平滑动 tabs

### 5. L2 Timeline(移动端)

- 横向时间轴改为**纵向时间线**(从上到下,新到旧)
- 每个事件一张卡片,附带年份大字体
- 支持按 category 筛选

### 6. L3 产业层详情(移动端)

- 顶部 Hero 区域简化:保留节点视觉 + 标题 + 关键指标
- 内容分为多个 Tab:概览 / 公司 / 关系 / 风险 / 趋势
- 公司列表使用纵向卡片,每张卡片显示核心信息
- 上下游关系图改为「上游 / 下游」两个折叠面板

### 7. L3 公司详情(移动端)

- Hero 区域:节点视觉 + 公司名 + 1–2 个核心指标
- 下方使用 sticky tabs:基础信息 / AI 业务 / 关系 / 财务 / 战略
- 财务图表保留,但宽度自适应 + 横向滚动
- 关系图改为「相关公司列表」,每条显示关系类型

---

## 四、触摸交互规范

### 替代 hover 的方式

桌面端的 hover 在移动端没有等价物,需要重新设计:

| 桌面交互 | 移动端替代 |
|---------|----------|
| Hover 节点高亮关系 | Tap 节点选中并显示关系(再 tap 一次进入详情) |
| Hover 显示 tooltip | Long press 显示 tooltip |
| Hover 跟随光晕 | 取消,改为 tap 时的涟漪效果 |
| 鼠标滚轮缩放 | Pinch to zoom |
| 拖拽平移 | Touch drag |

### 手势规范

- **Tap**:选中 / 进入
- **Double tap**:放大到该节点
- **Long press**:显示详情 tooltip
- **Swipe left/right**:在同层级页面间切换
- **Swipe up/down**:滚动页面内容
- **Pinch**:缩放关系图 / 时间轴
- **Two-finger rotate**:在 3D 场景中旋转视角(仅在 /map 和首页 L1 启用)

### 触摸目标尺寸

- 最小可点击区域:**44 × 44 px**
- 节点的视觉大小可以小于此,但实际点击热区扩大到 44px
- 按钮间距至少 8px,避免误触

---

## 五、移动端性能优化

### 3D 场景降级策略

```typescript
const getMobileQuality = () => {
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 2;

  if (cores >= 6 && memory >= 4) return 'high';
  if (cores >= 4 && memory >= 2) return 'medium';
  return 'low';
};

const qualityPresets = {
  high: { nodes: 80, shadows: true, postFX: true },
  medium: { nodes: 40, shadows: false, postFX: false },
  low: { nodes: 20, shadows: false, postFX: false },
};
```

### 进一步降级

- 检测 fps < 24 持续 3 秒 → 降到下一级
- 降到 low 后仍卡顿 → 完全禁用 3D,使用 SVG 备用方案

### 资源加载

- 字体使用 `font-display: swap`
- 图片使用 lazy loading + WebP 格式
- 路由组件使用 React.lazy + Suspense

---

## 六、移动端的"信息节奏"调整

桌面端的 L1 → L2 → L3 三层节奏在移动端依然适用,但**每层的内容密度都要进一步降低**:

- L1:保持极简
- L2:从「沉浸式可视化」改为「卡片流 + 氛围层」
- L3:从「一屏密集信息」改为「分 Tab 渐进披露」

**移动端用户每个屏幕能消化的信息量约为桌面端的 40%。**

---

# 附录 F:空状态与边界场景规范

## 一、核心理念

很多产品看起来很酷,但只要触发一个边界场景(搜索无结果、网络错误、数据缺失)就立刻露馅。

边界场景的设计哲学:**它们不是错误,而是产品的一部分**。每个空状态都应该有自己的视觉语言,与产品整体风格一致。

---

## 二、空状态清单

### 1. 搜索无结果

**场景**:用户搜索一个不存在的公司 / 产业层 / 技术

**视觉设计**:
- 屏幕中心出现一个「未连接的节点」视觉——一个孤立的发光球体,周围没有任何连线
- 文案:「未找到与 "XXX" 相关的节点」
- 副文案:「试试搜索 NVIDIA、TSMC、芯片设计、云平台」
- 提供 3 个推荐的搜索建议(基于 fuzzy match)

**关键原则**:用产品自身的"节点宇宙"语言来表达"找不到",而不是用通用的 404 插图。

### 2. 数据加载中

**场景**:未来接入真实 API 时的加载状态

**视觉设计**:
- 不使用传统的 spinner
- 在节点应该出现的位置显示**轮廓状的占位节点**(dashed circle,opacity 0.3)
- 占位节点缓慢呼吸(透明度 0.3 ↔ 0.5)
- 顶部出现一行极小的状态文字:「Loading nodes...」

### 3. 网络错误

**场景**:API 请求失败

**视觉设计**:
- 节点网络呈现「失联」状态:所有节点变成灰色,连线断裂为虚线
- 屏幕中央出现提示:「连接中断 · Connection Lost」
- 副文案:「无法访问数据节点,请检查网络后重试」
- 提供「重试」按钮(点击后节点重新"连接",恢复颜色)

### 4. 节点数据缺失

**场景**:某个公司的部分字段未填写(如非上市公司无市值)

**视觉设计**:
- 字段值显示为 `N/A` 或 `Not disclosed`,使用低对比度的灰色
- 旁边有一个极小的 info icon,hover/tap 时显示说明:「该公司未公开披露此数据」
- 绝不允许显示 `0`、`null`、`undefined` 或编造的数字

### 5. 关系数据不完整

**场景**:用户进入一个公司详情页,但该公司的关系数据较少

**视觉设计**:
- 关系图依然渲染,但显示「仅显示 X 条已知关系」
- 提供一个 placeholder:「更多关系数据建设中」
- 不允许虚构关系来"填满"图表

### 6. 移动端不支持的功能

**场景**:某些功能在移动端无法良好呈现(如复杂的 Sankey 图)

**视觉设计**:
- 显示一个友好的提示卡片:「此视图在大屏幕上体验更佳」
- 提供「查看简化版」和「保留桌面版」两个选项
- 不要直接禁用,给用户选择权

### 7. 用户首次访问

**场景**:第一次进入产品,没有任何探索历史

**视觉设计**:
- 在第一次完成 L1 入场动画后,显示一个**极简的引导提示**
- 提示文案:「点击任意节点开始探索」
- 引导仅出现一次,dismiss 后不再出现(localStorage 记录)

### 8. 用户已探索完所有节点

**场景**:用户已访问过产品中所有的产业层和公司

**视觉设计**:
- 在用户回到首页时,所有节点都带有「已探索」标记(cyan ring)
- 显示一个隐藏式的成就提示:「你已探索完整个 AI 产业链」
- 提供「重置探索历史」选项

### 9. 浏览器不支持 WebGL

**场景**:极少数旧浏览器或限制环境

**视觉设计**:
- 自动降级为完全 2D 版本
- 在页面顶部显示一行小提示:「你的浏览器不支持 3D 渲染,已切换至简化视图」
- 不阻止用户使用,保留所有核心功能

### 10. URL 错误 / 不存在的路由

**场景**:用户访问 `/companies/nonexistent`

**视觉设计**:
- 显示一个「迷失在节点宇宙」的视觉:一个孤立节点漂浮在虚空中
- 文案:「这个节点不存在于已知的产业链中」
- 提供「返回主网络」按钮(跳转到首页)

---

## 三、错误处理的全局原则

1. **永不显示技术错误**:用户看不到 `404`、`500`、`undefined is not a function` 等
2. **始终提供下一步动作**:每个错误状态都有「重试」「返回」「查看其他」中至少一个选项
3. **保持视觉一致**:错误状态使用与产品相同的视觉语言(节点、连线、霓虹色),不切换到通用的错误页风格
4. **降级而非阻止**:能用简化版的,绝不阻止用户访问
5. **数据缺失透明化**:宁可显示 N/A,不编造数据

---

# 附录 G:音效与微交互规范

## 一、核心理念

音效在这个产品中是**可选的氛围增强**,不是核心体验。

但当用户主动开启音效时,它应该让产品瞬间获得**电影感和系统感**——参考 Linear、Arc Browser、Apple 的 Vision Pro。

绝不做:游戏化音效、网页点击声、SaaS 提示音。

---

## 二、音效开关

- 默认状态:**静音**
- 开关位置:顶部导航栏右侧,一个极小的音量图标
- 开启后状态持久化在 localStorage
- 开启时有一次「测试音效」(一个轻柔的低频 pulse),让用户确认音量

---

## 三、音效清单

### 环境音(Ambient)

**1. Hero 背景音**
- 极低频的 drone(持续低音),类似太空舱内的环境音
- 音量:用户开启音量的 30%
- 仅在 L1 首页播放,进入 L2/L3 后淡出

**2. 节点呼吸音**
- 极轻微的高频脉冲,每 4–6 秒一次
- 仅在节点 hover 时增强

### 交互音(Interaction)

**3. Hover 节点**
- 一个极短(80ms)的高频 click,类似机械键盘的微弱反馈
- 音量:用户音量的 50%
- 同一节点连续 hover 不重复触发(debounce 200ms)

**4. Click 节点**
- 一个 200ms 的低频 thump + 高频 sparkle 叠加
- 模拟「选中并激活」的感觉

**5. 转场(Descend)**
- 一个 1 秒的下行音阶(从中频滑到低频)
- 配合镜头推进,营造「下潜」感

**6. 转场(Ascend)**
- 一个 0.8 秒的上行音阶(从低频滑到中频)
- 比 Descend 更轻盈

**7. 转场(Pivot)**
- 一个短促的 whoosh,类似镜头转动
- 仅 400ms

### 反馈音(Feedback)

**8. 搜索结果出现**
- 一个轻柔的 chime(类似 macOS 通知音的极简版)

**9. 错误提示**
- 一个极低频的 pulse(不刺耳,不像传统错误音)
- 仅 150ms

**10. 已探索完成**
- 当用户完成对所有节点的探索时,播放一个隐秘的「完成音」
- 类似一段极短的旋律(3 个音符)

---

## 四、微交互设计(视觉 + 触觉)

### 触觉反馈(移动端)

```typescript
const haptic = {
  light: () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(20),
  success: () => navigator.vibrate?.([10, 50, 10]),
};
```

**使用场景**:
- Tap 节点 → light
- 完成转场 → medium
- 搜索找到结果 → success
- 错误 → 不触发触觉(避免引起焦虑)

### 微动效清单

**1. 鼠标 cursor 跟随光晕**(仅桌面)
- 一个 12px 的柔和光斑,跟随鼠标
- 移动到节点上时,光斑变成节点的「选中环」
- 实现:CSS + JS pointer tracking

**2. 按钮 hover**
- 背景从 `transparent` → `rgba(cyan, 0.05)`
- 边框 glow 从 0 → 4px blur
- 文字字距从 0 → 0.5px
- 总过渡时间 200ms

**3. 节点呼吸**
- 所有节点都有极轻微的 scale 呼吸(1.0 → 1.02)
- 周期:4–6 秒(每个节点周期略有不同,避免同步)
- 选中节点的呼吸更明显(1.0 → 1.08)

**4. 文字 reveal**
- 标题和数据出现时,使用「字符级 stagger」
- 每个字符延迟 30ms 浮现
- 使用 `clip-path` 实现底部 reveal,而不是简单 opacity

**5. 数字滚动**
- 所有重要数字(市值、营收、利润)使用 count-up 动画
- 从 0 滚动到目标值,duration 800ms
- 使用 ease-out-quart 曲线

**6. 连线绘制**
- 关系连线使用 `stroke-dasharray` + `stroke-dashoffset` 实现「绘制」动画
- 从起点流向终点,duration 600ms
- 流量带(Sankey)使用 path 的渐进显现

**7. 已探索标记**
- 当用户首次进入一个节点时,节点边缘的 cyan ring 从 0 旋转 360° 绘制完成
- 类似 Apple Watch 的圆环完成动画

**8. 数据 banner(demo 标注)**
- 始终存在但不突兀
- 顶部有一行极细的横条,左侧文字「Illustrative demo data」
- opacity 0.4,hover 时升至 0.8

---

## 五、性能与可访问性

### 性能

- 所有音效文件使用 `.webm` 或 `.ogg` 格式,单文件 < 50KB
- 音效预加载在用户开启音量时一次性完成
- 同时播放的音效不超过 3 个(使用音效池管理)

### 可访问性

- 尊重 `prefers-reduced-motion`:开启时禁用呼吸、跟随光晕、count-up
- 尊重 `prefers-reduced-data`:开启时不加载音效文件
- 所有音效都不是信息传达的唯一方式(视觉同时反馈)
- 提供「全静音」「全静态」两个偏好设置

---

# 实施建议:分阶段执行

本 Prompt 完整实现的工作量接近一个真正的产品级项目。如果目标是让 AI 一次性生成可运行的 Demo,建议分阶段提交:

### 阶段 1:骨架与第一印象(MVP)

提交内容:**主 Prompt + 附录 A + 附录 D**

交付目标:
- 完整的项目骨架(Vite + React + TS + Tailwind)
- 完整的 mock 数据(15 个产业层、80 家公司、200+ 关系)
- 6 个路由全部可访问
- L1 首屏入场动画完整实现
- 基本的页面布局与数据展示

### 阶段 2:转场与延续性

提交内容:**附录 B + 附录 C**

交付目标:
- 5 种转场类型全部实现
- 3D 节点网络的全局延续
- 节点的"记忆"系统
- View Transitions + layoutId 的页面间 morph

### 阶段 3:边界完备与感官细节

提交内容:**附录 E + 附录 F + 附录 G**

交付目标:
- 移动端适配完成
- 10 种空状态全部处理
- 音效系统与微交互全部到位
- 性能降级策略生效

---

## 文档版本

- **版本**:v2.0 Final
- **更新日期**:2026-05-15
- **状态**:可直接使用

---

> 本 Prompt 由 Claude 协助整理。如需进一步定制(如调整产业链结构、替换技术栈、修改视觉风格),请基于此版本进行 fork 修改。
