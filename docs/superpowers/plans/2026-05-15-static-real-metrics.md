# Static Real Metrics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace formula-generated AI industry company metrics with static approximate real-world data.

**Architecture:** Keep the existing `src/data` catalog structure. Add a static metrics table in the company data module, consume it from `buildCompany`, and align financial-history chart endpoints with the same static data.

**Tech Stack:** React, TypeScript, Vitest, Vite.

---

### Task 1: Lock the Data Contract

**Files:**
- Modify: `src/data/__tests__/catalog.test.ts`

- [ ] **Step 1: Write the failing test**

Add a test that imports `companies` and checks representative static metrics:

```ts
it('uses static approximate real metrics for representative companies instead of generated demo values', () => {
  const byId = new Map(companies.map((company) => [company.id, company]));

  expect(byId.get('nvidia')?.publicMetrics?.marketCap).toBe(3_100_000_000_000);
  expect(byId.get('nvidia')?.publicMetrics?.revenue).toBe(130_500_000_000);
  expect(byId.get('tsmc')?.publicMetrics?.revenue).toBe(122_400_000_000);
  expect(byId.get('state-grid')?.privateMetrics?.valuation).toBe(700_000_000_000);
  expect(byId.get('openai')?.privateMetrics?.valuation).toBe(300_000_000_000);
  expect(byId.get('alibaba-cloud')?.publicMetrics?.revenue).toBe(17_000_000_000);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/__tests__/catalog.test.ts`

Expected: FAIL because generated values do not match the static real-data contract.

### Task 2: Add Static Company Metrics

**Files:**
- Modify: `src/data/companies/index.ts`
- Modify: `src/pages/CompanyPage.tsx`
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Implement a `staticMetricsByCompanyId` table**

Add a typed table keyed by company id. Public-like entities use `publicMetrics`; private, subsidiary, and state-owned entities may use `privateMetrics.valuation` when no public market cap exists.

- [ ] **Step 2: Update `buildCompany`**

Use static values first. Retain generated fallback values only for companies missing static coverage.

- [ ] **Step 3: Update the metric card label**

Show `市值` when a listed public market cap exists, `估值/规模` when using a valuation or scale estimate, and `市值` as the final fallback.

- [ ] **Step 4: Update disclaimer wording**

Change demo wording to `静态估算数据，非实时财务数据。`

- [ ] **Step 5: Run the focused test**

Run: `npm test -- src/data/__tests__/catalog.test.ts`

Expected: PASS.

### Task 3: Align Financial History

**Files:**
- Modify: `src/data/financial/index.ts`
- Modify: `src/data/__tests__/catalog.test.ts`

- [ ] **Step 1: Add chart endpoint expectations**

Test that the latest NVIDIA and TSMC financial-history points match static headline metrics in billions.

- [ ] **Step 2: Update financial-history generation**

Derive the last chart point from `publicMetrics.revenue`, `publicMetrics.profit`, `publicMetrics.grossMargin`, and `aiBusiness.aiRevenueShare`.

- [ ] **Step 3: Run focused test**

Run: `npm test -- src/data/__tests__/catalog.test.ts`

Expected: PASS.

### Task 4: Verify Build

**Files:**
- No new files.

- [ ] **Step 1: Run unit tests**

Run: `npm test -- --run`

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: TypeScript and Vite build succeed.
