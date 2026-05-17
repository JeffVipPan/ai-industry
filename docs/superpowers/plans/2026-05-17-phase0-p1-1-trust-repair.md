# Phase 0 And P1.1 Trust Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the first roadmap slice by keeping `/map` intact and replacing the remaining obvious hard-coded placeholder copy in company and layer detail views.

**Architecture:** Keep the change local to route tests and the two detail pages. `CompanyPage` already derives the positioning heading from the primary layer in the current worktree, so this plan adds regression coverage for that behavior and only changes `LayerPage` production code to derive real contextual technology descriptions.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, React Testing Library.

---

## File Structure

- Modify `src/App.test.tsx`: add route-level regression tests for `/map`, update the Constellation company page expectation to its current flagship template, and add layer technology copy coverage.
- Modify `src/pages/LayerPage.tsx`: add a small local helper that converts a layer/technology pair into a contextual Chinese sentence and use it in the technology architecture cards.
- Verify existing `src/App.tsx`, `src/components/AppShell.tsx`, and `src/pages/MapPage.tsx`: keep `/map` route and navigation intact.

### Task 1: Lock Phase 0 And P1.1 Regression Coverage

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Add route and layer-copy tests, and update the stale Constellation expectation**

Add this route test inside `describe('AI 产业研究路由', () => { ... })`, near the existing route tests:

```tsx
  it('keeps the map route available from the app router', () => {
    render(
      <MemoryRouter initialEntries={['/map']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '当前层级' })).toBeTruthy();
    expect(screen.getByText('点击层级或公司，右侧面板同步切换')).toBeTruthy();
    expect(screen.queryByText('这个节点不存在于已知的产业链中')).toBeNull();
  });

  it('describes layer technologies without placeholder copy', () => {
    render(
      <MemoryRouter initialEntries={['/layers/chip-design']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '芯片设计' })).toBeTruthy();
    expect(screen.getByText(/GPU 架构在芯片设计环节中/)).toBeTruthy();
    expect(screen.queryByText('该能力节点用于演示本层技术组成。')).toBeNull();
  });
```

Replace the stale existing Constellation test:

```tsx
  it('renders Constellation Energy as a flagship energy company', () => {
    render(
      <MemoryRouter initialEntries={['/companies/constellation']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '星座能源' })).toBeTruthy();
    expect(screen.getByText('旗舰公司 · L3 详情')).toBeTruthy();
    expect(screen.getByText('Constellation 位于能源层，核心资产是核电和低碳可调度电力。')).toBeTruthy();
    expect(screen.getByRole('link', { name: '能源' })).toBeTruthy();
    expect(screen.queryByText('为什么属于能源')).toBeNull();
    expect(screen.queryByText('为什么属于本产业层')).toBeNull();
  });
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: FAIL only because `/layers/chip-design` still renders `该能力节点用于演示本层技术组成。` and does not render the contextual `GPU 架构在芯片设计环节中...` copy yet. The updated Constellation test should pass because the current worktree intentionally renders it through the flagship template.

### Task 2: Replace The Layer Technology Placeholder

**Files:**
- Modify: `src/pages/LayerPage.tsx`

- [ ] **Step 1: Add a local technology description helper**

In `src/pages/LayerPage.tsx`, after the imports and before `export const LayerPage`, add:

```tsx
const describeLayerTechnology = (technology: string, layerName: string) =>
  `${displayTerm(technology)}在${layerName}环节中承担关键能力模块，决定该层的性能边界、成本结构和上下游协同效率。`;
```

- [ ] **Step 2: Use the helper in technology cards**

Replace:

```tsx
<p className="mt-2 text-xs leading-5 text-slate-500">该能力节点用于演示本层技术组成。</p>
```

with:

```tsx
<p className="mt-2 text-xs leading-5 text-slate-500">
  {describeLayerTechnology(tech, layer.name.zh)}
</p>
```

- [ ] **Step 3: Run the focused test and verify GREEN**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: PASS for `src/App.test.tsx`.

### Task 3: Verify Phase 0 Scope And Build

**Files:**
- No additional source files.

- [ ] **Step 1: Scan for the targeted placeholder strings**

Run:

```bash
rg -n "为什么属于能源|该能力节点用于演示本层技术组成|演示" src/pages src/components src/data
```

Expected: no matches for `该能力节点用于演示本层技术组成。`. A match for `为什么属于能源` is acceptable only in tests or as rendered data for the real energy company; it must not appear as a literal in `src/pages/CompanyPage.tsx`.

- [ ] **Step 2: Run the data contract test**

Run:

```bash
npx vitest run src/data/__tests__/catalog.test.ts
```

Expected: PASS.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Review changed files**

Run:

```bash
git diff -- src/App.test.tsx src/pages/LayerPage.tsx
```

Expected: diff contains only the regression tests and the layer technology description helper/rendering change.
