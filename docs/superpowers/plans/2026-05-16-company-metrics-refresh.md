# Company Metrics Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh all ~80 companies' static metrics in `src/data/companies/index.ts` to reflect the latest disclosed financials as of 2026-01, add per-record source attribution, and surface the snapshot date in the UI.

**Architecture:** Extend the existing `StaticMetricEstimate` type with a required `sourceAsOf` and optional `sourceNote`. Propagate them to `Company._meta`. Rewrite the `staticMetricsByCompanyId` table values in one block. Update the small "静态估算" chip and the demo-data notice to render the snapshot date. Tests transition from the old expected values to the refreshed values as the visible signal.

**Tech Stack:** TypeScript, React, Vite, Vitest.

---

### Task 1: Lock the Data Contract

**Files:**
- Modify: `src/types/company.ts`
- Modify: `src/data/companies/index.ts` (StaticMetricEstimate type + buildCompany propagation)
- Modify: `src/data/__tests__/catalog.test.ts`

- [ ] **Step 1: Add `sourceAsOf` / `sourceNote` to the Company `_meta` type**

In `src/types/company.ts`, replace the `_meta` block:

```ts
  _meta: {
    dataSource: DataSource;
    lastUpdated: string;
    sourceAsOf?: string;
    sourceNote?: string;
  };
```

- [ ] **Step 2: Extend `StaticMetricEstimate` with required `sourceAsOf` and optional `sourceNote`**

In `src/data/companies/index.ts`, replace the `StaticMetricEstimate` type:

```ts
type StaticMetricEstimate = {
  marketCap?: number | 'N/A';
  pe?: number | 'N/A';
  revenue?: number | 'N/A';
  profit?: number | 'N/A';
  grossMargin?: number | 'N/A';
  currency?: CompanyPublicMetrics['currency'];
  valuation?: number | 'Not disclosed';
  fundingAmount?: number;
  aiRevenueShare?: number;
  sourceAsOf: string;
  sourceNote?: string;
};
```

- [ ] **Step 3: Propagate `sourceAsOf` / `sourceNote` through `buildCompany`**

In `src/data/companies/index.ts`, find the `_meta` block at the end of `buildCompany` and replace with:

```ts
    _meta: {
      dataSource: 'static-estimate',
      lastUpdated,
      sourceAsOf: staticMetrics?.sourceAsOf,
      sourceNote: staticMetrics?.sourceNote,
    },
```

Also update the top-of-file constant:

```ts
const lastUpdated = '2026-05-16';
```

- [ ] **Step 4: Add the consistency test**

In `src/data/__tests__/catalog.test.ts`, append a new `it(...)` inside the `describe('AI industry catalog data contract', ...)` block:

```ts
  it('attaches a sourceAsOf snapshot label to every static-estimate company', () => {
    const offenders = companies
      .filter((company) => company._meta.dataSource === 'static-estimate')
      .filter((company) => !company._meta.sourceAsOf || company._meta.sourceAsOf.trim() === '');

    expect(offenders.map((company) => company.id)).toEqual([]);
  });
```

- [ ] **Step 5: Run the failing test to confirm the contract change is visible**

Run: `npx vitest run src/data/__tests__/catalog.test.ts`

Expected: the new `attaches a sourceAsOf snapshot label` test FAILS (no entries have `sourceAsOf` yet) and existing NVIDIA / TSMC / OpenAI numeric tests still PASS. TypeScript will also surface compile errors for the missing `sourceAsOf` on every entry — that is expected and Task 3 will fix it in one block.

- [ ] **Step 6: Commit**

```bash
git add src/types/company.ts src/data/companies/index.ts src/data/__tests__/catalog.test.ts
git commit -m "Add sourceAsOf data contract to company metrics"
```

---

### Task 2: Update UI Labels

**Files:**
- Modify: `src/lib/utils.ts`
- Modify: `src/components/DemoDataNotice.tsx`
- Modify: `src/pages/CompanyPage.tsx`

- [ ] **Step 1: Update the demo-label copy**

In `src/lib/utils.ts`, replace the `demoLabel` line:

```ts
export const demoLabel = '数据为 2026-01 公开财报快照，非实时行情，仅供学习参考。';
```

- [ ] **Step 2: Update the compact demo notice**

In `src/components/DemoDataNotice.tsx`, replace the `<span>` line so the compact form also says "财报快照":

```tsx
    <span>{compact ? '财报快照 · 2026-01' : demoLabel}</span>
```

- [ ] **Step 3: Replace the static-estimate chip on the company page**

In `src/pages/CompanyPage.tsx`, find the `<MetricCard label={headlineMetricLabel} ...>` block around line 152 and replace the `value` prop:

```tsx
        <MetricCard
          label={headlineMetricLabel}
          value={`${formatCurrency(marketCap, currency)} · ${company._meta.sourceAsOf ?? '静态估算'}`}
          source={flagship?.metricSources.marketCap}
        />
```

- [ ] **Step 4: Verify build still type-checks**

Run: `npx tsc --noEmit`

Expected: PASS. If `company._meta.sourceAsOf` complains, re-check Task 1 Step 1.

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/components/DemoDataNotice.tsx src/pages/CompanyPage.tsx
git commit -m "Surface snapshot date in company metric chip and notice"
```

---

### Task 3: Refresh the Static Metrics Table

**Files:**
- Modify: `src/data/companies/index.ts` (replace `staticMetricsByCompanyId` block)

- [ ] **Step 1: Replace `staticMetricsByCompanyId` with the 2026-01 refreshed table**

In `src/data/companies/index.ts`, find the existing `const staticMetricsByCompanyId: Record<string, StaticMetricEstimate> = { ... };` block (starts around line 151) and replace it entirely with:

```ts
const staticMetricsByCompanyId: Record<string, StaticMetricEstimate> = {
  constellation: { marketCap: 75_000_000_000, pe: 21, revenue: 23_500_000_000, profit: 3_700_000_000, grossMargin: 0.38, aiRevenueShare: 0.18, sourceAsOf: 'FY2024' },
  nextera: { marketCap: 145_000_000_000, pe: 22, revenue: 24_700_000_000, profit: 6_950_000_000, grossMargin: 0.6, aiRevenueShare: 0.12, sourceAsOf: 'FY2024' },
  'state-grid': { marketCap: 'N/A', pe: 'N/A', revenue: 3_850_000_000_000, profit: 85_000_000_000, grossMargin: 0.09, currency: 'CNY', valuation: 4_500_000_000_000, aiRevenueShare: 0.33, sourceAsOf: 'FY2024 公开年报', sourceNote: '非上市估算' },
  longi: { marketCap: 110_000_000_000, pe: 'N/A', revenue: 82_600_000_000, profit: -8_600_000_000, grossMargin: 0.09, currency: 'CNY', aiRevenueShare: 0.08, sourceAsOf: 'FY2024' },
  vistra: { marketCap: 50_000_000_000, pe: 18, revenue: 17_000_000_000, profit: 2_700_000_000, grossMargin: 0.28, aiRevenueShare: 0.2, sourceAsOf: 'FY2024' },
  equinix: { marketCap: 80_000_000_000, pe: 90, revenue: 8_750_000_000, profit: 815_000_000, grossMargin: 0.47, aiRevenueShare: 0.25, sourceAsOf: 'FY2024' },
  'digital-realty': { marketCap: 52_000_000_000, pe: 85, revenue: 5_550_000_000, profit: 600_000_000, grossMargin: 0.53, aiRevenueShare: 0.28, sourceAsOf: 'FY2024' },
  gds: { marketCap: 5_000_000_000, pe: 'N/A', revenue: 1_550_000_000, profit: -170_000_000, grossMargin: 0.23, aiRevenueShare: 0.36, sourceAsOf: 'FY2024' },
  chindata: { marketCap: 'N/A', pe: 'N/A', revenue: 1_150_000_000, profit: 80_000_000, grossMargin: 0.28, valuation: 3_200_000_000, aiRevenueShare: 0.35, sourceAsOf: '2023 Bain take-private', sourceNote: '非上市估算' },
  'oracle-dc': { marketCap: 'N/A', pe: 'N/A', revenue: 14_000_000_000, profit: 4_500_000_000, grossMargin: 0.38, valuation: 90_000_000_000, aiRevenueShare: 0.48, sourceAsOf: 'FY2025 OCI 分部估算', sourceNote: '分部估算' },
  asml: { marketCap: 280_000_000_000, pe: 36, revenue: 28_260_000_000, profit: 7_570_000_000, grossMargin: 0.51, currency: 'EUR', aiRevenueShare: 0.62, sourceAsOf: 'FY2024' },
  'applied-materials': { marketCap: 155_000_000_000, pe: 22, revenue: 27_200_000_000, profit: 7_180_000_000, grossMargin: 0.475, aiRevenueShare: 0.45, sourceAsOf: 'FY2024 (10 月)' },
  'lam-research': { marketCap: 115_000_000_000, pe: 27, revenue: 14_900_000_000, profit: 3_830_000_000, grossMargin: 0.47, aiRevenueShare: 0.43, sourceAsOf: 'FY2024 (6 月)' },
  'tokyo-electron': { marketCap: 85_000_000_000, pe: 24, revenue: 16_000_000_000, profit: 3_500_000_000, grossMargin: 0.45, aiRevenueShare: 0.42, sourceAsOf: 'FY2025 (3 月)' },
  naura: { marketCap: 220_000_000_000, pe: 39, revenue: 29_800_000_000, profit: 5_620_000_000, grossMargin: 0.42, currency: 'CNY', aiRevenueShare: 0.42, sourceAsOf: 'FY2024' },
  'shin-etsu': { marketCap: 75_000_000_000, pe: 19, revenue: 17_000_000_000, profit: 4_000_000_000, grossMargin: 0.36, aiRevenueShare: 0.25, sourceAsOf: 'FY2025 (3 月)' },
  sumco: { marketCap: 3_500_000_000, pe: 18, revenue: 2_500_000_000, profit: 200_000_000, grossMargin: 0.24, aiRevenueShare: 0.2, sourceAsOf: 'FY2024' },
  entegris: { marketCap: 14_000_000_000, pe: 38, revenue: 3_240_000_000, profit: 359_000_000, grossMargin: 0.42, aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  wacker: { marketCap: 4_000_000_000, pe: 14, revenue: 5_700_000_000, profit: 280_000_000, grossMargin: 0.17, currency: 'EUR', aiRevenueShare: 0.1, sourceAsOf: 'FY2024' },
  'anji-micro': { marketCap: 28_000_000_000, pe: 65, revenue: 1_780_000_000, profit: 420_000_000, grossMargin: 0.55, currency: 'CNY', aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  synopsys: { marketCap: 80_000_000_000, pe: 35, revenue: 6_650_000_000, profit: 2_260_000_000, grossMargin: 0.81, aiRevenueShare: 0.5, sourceAsOf: 'FY2025 (10 月)' },
  cadence: { marketCap: 80_000_000_000, pe: 60, revenue: 5_000_000_000, profit: 1_400_000_000, grossMargin: 0.89, aiRevenueShare: 0.5, sourceAsOf: 'FY2025' },
  'siemens-eda': { marketCap: 'N/A', pe: 'N/A', revenue: 2_500_000_000, profit: 500_000_000, grossMargin: 0.75, valuation: 20_000_000_000, aiRevenueShare: 0.4, sourceAsOf: 'FY2024 分部估算', sourceNote: '分部估算' },
  arm: { marketCap: 140_000_000_000, pe: 175, revenue: 4_000_000_000, profit: 792_000_000, grossMargin: 0.96, aiRevenueShare: 0.45, sourceAsOf: 'FY2025 (3 月)' },
  empyrean: { marketCap: 35_000_000_000, pe: 280, revenue: 1_200_000_000, profit: 130_000_000, grossMargin: 0.89, currency: 'CNY', aiRevenueShare: 0.4, sourceAsOf: 'FY2024' },
  nvidia: { marketCap: 3_200_000_000_000, pe: 44, revenue: 130_500_000_000, profit: 72_900_000_000, grossMargin: 0.75, aiRevenueShare: 0.88, sourceAsOf: 'FY2025 财报 · MC @ 2026-01' },
  amd: { marketCap: 200_000_000_000, pe: 50, revenue: 25_800_000_000, profit: 1_640_000_000, grossMargin: 0.49, aiRevenueShare: 0.45, sourceAsOf: 'FY2024' },
  broadcom: { marketCap: 1_100_000_000_000, pe: 80, revenue: 51_600_000_000, profit: 14_000_000_000, grossMargin: 0.7, aiRevenueShare: 0.5, sourceAsOf: 'FY2024 (10 月)' },
  qualcomm: { marketCap: 175_000_000_000, pe: 17, revenue: 39_000_000_000, profit: 10_140_000_000, grossMargin: 0.56, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 (9 月)' },
  marvell: { marketCap: 65_000_000_000, pe: 'N/A', revenue: 5_500_000_000, profit: -900_000_000, grossMargin: 0.45, aiRevenueShare: 0.5, sourceAsOf: 'FY2025 (1 月)' },
  'huawei-hisilicon': { marketCap: 'N/A', pe: 'N/A', revenue: 85_000_000_000, profit: 10_000_000_000, grossMargin: 0.45, currency: 'CNY', valuation: 560_000_000_000, aiRevenueShare: 0.55, sourceAsOf: 'FY2024 估算', sourceNote: '未独立披露' },
  cambricon: { marketCap: 280_000_000_000, pe: 'N/A', revenue: 1_180_000_000, profit: -480_000_000, grossMargin: 0.62, currency: 'CNY', aiRevenueShare: 1, sourceAsOf: 'FY2024' },
  tsmc: { marketCap: 1_100_000_000_000, pe: 27, revenue: 112_000_000_000, profit: 45_000_000_000, grossMargin: 0.572, aiRevenueShare: 0.55, sourceAsOf: 'FY2025' },
  'samsung-foundry': { marketCap: 'N/A', pe: 'N/A', revenue: 18_000_000_000, profit: -2_000_000_000, grossMargin: 0.12, valuation: 80_000_000_000, aiRevenueShare: 0.35, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算' },
  'intel-foundry': { marketCap: 'N/A', pe: 'N/A', revenue: 4_400_000_000, profit: -13_400_000_000, grossMargin: -0.7, valuation: 30_000_000_000, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算 · 含内部代工' },
  smic: { marketCap: 280_000_000_000, pe: 'N/A', revenue: 57_800_000_000, profit: 3_700_000_000, grossMargin: 0.18, currency: 'CNY', aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  globalfoundries: { marketCap: 22_000_000_000, pe: 30, revenue: 6_750_000_000, profit: 250_000_000, grossMargin: 0.25, aiRevenueShare: 0.18, sourceAsOf: 'FY2024' },
  ase: { marketCap: 20_000_000_000, pe: 18, revenue: 18_500_000_000, profit: 1_200_000_000, grossMargin: 0.16, aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  amkor: { marketCap: 6_000_000_000, pe: 17, revenue: 6_320_000_000, profit: 360_000_000, grossMargin: 0.15, aiRevenueShare: 0.3, sourceAsOf: 'FY2024' },
  jcet: { marketCap: 55_000_000_000, pe: 35, revenue: 31_200_000_000, profit: 1_580_000_000, grossMargin: 0.14, currency: 'CNY', aiRevenueShare: 0.28, sourceAsOf: 'FY2024' },
  tongfu: { marketCap: 45_000_000_000, pe: 60, revenue: 22_500_000_000, profit: 660_000_000, grossMargin: 0.13, currency: 'CNY', aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  ibiden: { marketCap: 6_000_000_000, pe: 24, revenue: 2_500_000_000, profit: 250_000_000, grossMargin: 0.27, aiRevenueShare: 0.35, sourceAsOf: 'FY2025 (3 月)' },
  'sk-hynix': { marketCap: 150_000_000_000, pe: 6, revenue: 49_000_000_000, profit: 17_500_000_000, grossMargin: 0.45, aiRevenueShare: 0.65, sourceAsOf: 'FY2024' },
  'samsung-memory': { marketCap: 'N/A', pe: 'N/A', revenue: 70_000_000_000, profit: 12_000_000_000, grossMargin: 0.38, valuation: 180_000_000_000, aiRevenueShare: 0.45, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算' },
  micron: { marketCap: 110_000_000_000, pe: 22, revenue: 25_100_000_000, profit: 778_000_000, grossMargin: 0.22, aiRevenueShare: 0.45, sourceAsOf: 'FY2024 (8 月)' },
  cxmt: { marketCap: 'N/A', pe: 'N/A', revenue: 15_000_000_000, profit: -2_000_000_000, grossMargin: 0.2, currency: 'CNY', valuation: 150_000_000_000, aiRevenueShare: 0.25, sourceAsOf: '2025 融资估值', sourceNote: '未上市' },
  ymtc: { marketCap: 'N/A', pe: 'N/A', revenue: 12_000_000_000, profit: -1_000_000_000, grossMargin: 0.18, currency: 'CNY', valuation: 180_000_000_000, aiRevenueShare: 0.18, sourceAsOf: '2024 估值', sourceNote: '未上市' },
  supermicro: { marketCap: 18_000_000_000, pe: 12, revenue: 22_000_000_000, profit: 1_200_000_000, grossMargin: 0.11, aiRevenueShare: 0.7, sourceAsOf: 'FY2024 (6 月)' },
  dell: { marketCap: 75_000_000_000, pe: 19, revenue: 95_600_000_000, profit: 4_580_000_000, grossMargin: 0.24, aiRevenueShare: 0.3, sourceAsOf: 'FY2025 (1 月)' },
  hpe: { marketCap: 27_000_000_000, pe: 12, revenue: 30_100_000_000, profit: 2_580_000_000, grossMargin: 0.34, aiRevenueShare: 0.25, sourceAsOf: 'FY2024 (10 月)' },
  arista: { marketCap: 130_000_000_000, pe: 45, revenue: 7_000_000_000, profit: 2_850_000_000, grossMargin: 0.64, aiRevenueShare: 0.4, sourceAsOf: 'FY2024' },
  innolight: { marketCap: 140_000_000_000, pe: 30, revenue: 23_900_000_000, profit: 5_170_000_000, grossMargin: 0.36, currency: 'CNY', aiRevenueShare: 0.7, sourceAsOf: 'FY2024' },
  'industrial-fulian': { marketCap: 460_000_000_000, pe: 22, revenue: 609_000_000_000, profit: 23_200_000_000, grossMargin: 0.08, currency: 'CNY', aiRevenueShare: 0.45, sourceAsOf: 'FY2024' },
  aws: { marketCap: 'N/A', pe: 'N/A', revenue: 107_500_000_000, profit: 39_700_000_000, grossMargin: 0.37, valuation: 1_500_000_000_000, aiRevenueShare: 0.35, sourceAsOf: 'FY2024 (Amazon 分部)', sourceNote: '分部估算' },
  'microsoft-azure': { marketCap: 'N/A', pe: 'N/A', revenue: 80_000_000_000, profit: 32_000_000_000, grossMargin: 0.4, valuation: 1_800_000_000_000, aiRevenueShare: 0.45, sourceAsOf: 'FY2025 (6 月) 分部估算', sourceNote: '分部估算' },
  'google-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 43_300_000_000, profit: 6_100_000_000, grossMargin: 0.3, valuation: 700_000_000_000, aiRevenueShare: 0.4, sourceAsOf: 'FY2024 分部', sourceNote: '分部估算' },
  'alibaba-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 15_000_000_000, profit: 800_000_000, grossMargin: 0.18, valuation: 60_000_000_000, aiRevenueShare: 0.4, sourceAsOf: 'FY2025 (3 月) 分部', sourceNote: '分部估算' },
  'tencent-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 13_000_000_000, profit: 2_500_000_000, grossMargin: 0.32, valuation: 70_000_000_000, aiRevenueShare: 0.36, sourceAsOf: 'FY2024 分部估算', sourceNote: '分部估算' },
  'oracle-cloud': { marketCap: 'N/A', pe: 'N/A', revenue: 22_000_000_000, profit: 5_500_000_000, grossMargin: 0.4, valuation: 120_000_000_000, aiRevenueShare: 0.55, sourceAsOf: 'FY2025 (5 月) OCI 分部', sourceNote: '分部估算' },
  openai: { marketCap: 'N/A', pe: 'N/A', revenue: 11_000_000_000, profit: -8_000_000_000, grossMargin: 0.52, valuation: 300_000_000_000, fundingAmount: 40_000_000_000, aiRevenueShare: 1, sourceAsOf: '2025-10 SoftBank 轮估值 · 2025 ARR' },
  anthropic: { marketCap: 'N/A', pe: 'N/A', revenue: 4_000_000_000, profit: -3_500_000_000, grossMargin: 0.5, valuation: 61_500_000_000, aiRevenueShare: 1, sourceAsOf: '2025-03 融资估值 · 2025 ARR' },
  'google-deepmind': { marketCap: 'N/A', pe: 'N/A', revenue: 5_000_000_000, profit: -1_000_000_000, grossMargin: 0.5, valuation: 200_000_000_000, aiRevenueShare: 1, sourceAsOf: '内部估算', sourceNote: 'Alphabet 内部，未单独披露' },
  'meta-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: -12_000_000_000, grossMargin: 0.4, valuation: 250_000_000_000, aiRevenueShare: 1, sourceAsOf: 'FY2024 估算', sourceNote: 'Meta GenAI 部门估算' },
  mistral: { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -350_000_000, grossMargin: 0.5, valuation: 6_200_000_000, aiRevenueShare: 1, sourceAsOf: '2024-06 融资估值' },
  'baidu-ernie': { marketCap: 'N/A', pe: 'N/A', revenue: 2_500_000_000, profit: 300_000_000, grossMargin: 0.45, valuation: 20_000_000_000, aiRevenueShare: 1, sourceAsOf: 'FY2024 AI 业务分部估算', sourceNote: '分部估算' },
  'moonshot-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 300_000_000, profit: -500_000_000, grossMargin: 0.5, valuation: 3_300_000_000, aiRevenueShare: 1, sourceAsOf: '2024-08 融资估值' },
  langchain: { marketCap: 'N/A', pe: 'N/A', revenue: 80_000_000, profit: -50_000_000, grossMargin: 0.75, valuation: 1_100_000_000, aiRevenueShare: 1, sourceAsOf: '2025-02 融资估值' },
  databricks: { marketCap: 'N/A', pe: 'N/A', revenue: 3_700_000_000, profit: -500_000_000, grossMargin: 0.75, valuation: 62_000_000_000, aiRevenueShare: 0.5, sourceAsOf: '2024-12 融资 · ARR ~$3.7B' },
  snowflake: { marketCap: 55_000_000_000, pe: 'N/A', revenue: 3_800_000_000, profit: -1_300_000_000, grossMargin: 0.67, aiRevenueShare: 0.3, sourceAsOf: 'FY2025 (1 月)' },
  'scale-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 900_000_000, profit: 50_000_000, grossMargin: 0.55, valuation: 14_000_000_000, aiRevenueShare: 1, sourceAsOf: '2024-05 融资估值' },
  'hugging-face': { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -80_000_000, grossMargin: 0.7, valuation: 4_500_000_000, aiRevenueShare: 1, sourceAsOf: '2023-08 融资估值' },
  'zhipu-ai': { marketCap: 'N/A', pe: 'N/A', revenue: 1_500_000_000, profit: -800_000_000, grossMargin: 0.45, currency: 'CNY', valuation: 25_000_000_000, aiRevenueShare: 1, sourceAsOf: '2025 融资估值' },
  'microsoft-copilot': { marketCap: 'N/A', pe: 'N/A', revenue: 10_000_000_000, profit: 2_500_000_000, grossMargin: 0.75, valuation: 250_000_000_000, aiRevenueShare: 0.9, sourceAsOf: 'FY2025 估算', sourceNote: 'Microsoft AI 产品 ARR' },
  'salesforce-einstein': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: 200_000_000, grossMargin: 0.78, valuation: 30_000_000_000, aiRevenueShare: 0.8, sourceAsOf: 'FY2025 (1 月) Agentforce 估算', sourceNote: '分部估算' },
  'adobe-firefly': { marketCap: 'N/A', pe: 'N/A', revenue: 1_000_000_000, profit: 250_000_000, grossMargin: 0.82, valuation: 20_000_000_000, aiRevenueShare: 0.8, sourceAsOf: 'FY2024 (11 月) 估算', sourceNote: '分部估算' },
  'servicenow-ai': { marketCap: 190_000_000_000, pe: 90, revenue: 10_980_000_000, profit: 1_430_000_000, grossMargin: 0.78, aiRevenueShare: 0.38, sourceAsOf: 'FY2024' },
  'kingsoft-office': { marketCap: 140_000_000_000, pe: 65, revenue: 5_120_000_000, profit: 1_650_000_000, grossMargin: 0.85, currency: 'CNY', aiRevenueShare: 0.35, sourceAsOf: 'FY2024' },
  tesla: { marketCap: 1_280_000_000_000, pe: 150, revenue: 97_700_000_000, profit: 7_130_000_000, grossMargin: 0.18, aiRevenueShare: 0.1, sourceAsOf: 'FY2024' },
  waymo: { marketCap: 'N/A', pe: 'N/A', revenue: 600_000_000, profit: -2_000_000_000, grossMargin: 0.2, valuation: 45_000_000_000, aiRevenueShare: 1, sourceAsOf: '2024-10 融资估值' },
  'boston-dynamics': { marketCap: 'N/A', pe: 'N/A', revenue: 200_000_000, profit: -100_000_000, grossMargin: 0.25, valuation: 2_000_000_000, aiRevenueShare: 0.6, sourceAsOf: '内部估算', sourceNote: 'Hyundai 子公司未单独披露' },
  unitree: { marketCap: 'N/A', pe: 'N/A', revenue: 1_500_000_000, profit: 100_000_000, grossMargin: 0.35, currency: 'CNY', valuation: 12_000_000_000, aiRevenueShare: 0.65, sourceAsOf: '2025 融资估值' },
  xpeng: { marketCap: 17_000_000_000, pe: 'N/A', revenue: 40_900_000_000, profit: -5_790_000_000, grossMargin: 0.14, currency: 'CNY', aiRevenueShare: 0.32, sourceAsOf: 'FY2024' },
  ubtech: { marketCap: 25_000_000_000, pe: 'N/A', revenue: 1_300_000_000, profit: -1_140_000_000, grossMargin: 0.25, currency: 'CNY', aiRevenueShare: 0.6, sourceAsOf: 'FY2024' },
};
```

- [ ] **Step 2: Run the consistency test to confirm every entry now carries `sourceAsOf`**

Run: `npx vitest run src/data/__tests__/catalog.test.ts -t "attaches a sourceAsOf snapshot label"`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/data/companies/index.ts
git commit -m "Refresh static company metrics against 2026-01 snapshot"
```

---

### Task 4: Update Numeric Test Expectations for Representative Companies

**Files:**
- Modify: `src/data/__tests__/catalog.test.ts`

The existing test at lines 103-128 still expects the old (FY2024 pass) values. They no longer hold.

- [ ] **Step 1: Update the representative-metrics test**

In `src/data/__tests__/catalog.test.ts`, find the `it('uses static approximate real metrics for representative companies ...', ...)` block and replace its body:

```ts
  it('uses static approximate real metrics for representative companies instead of generated demo values', () => {
    const byId = new Map(companies.map((company) => [company.id, company]));

    expect(byId.get('nvidia')?.publicMetrics?.marketCap).toBe(3_200_000_000_000);
    expect(byId.get('nvidia')?.publicMetrics?.revenue).toBe(130_500_000_000);
    expect(byId.get('nvidia')?.aiBusiness.aiRevenueShare).toBe(0.88);
    expect(byId.get('tsmc')?.publicMetrics?.revenue).toBe(112_000_000_000);
    expect(byId.get('state-grid')?.privateMetrics?.valuation).toBe(4_500_000_000_000);
    expect(byId.get('openai')?.privateMetrics?.valuation).toBe(300_000_000_000);
    expect(byId.get('alibaba-cloud')?.publicMetrics?.revenue).toBe(15_000_000_000);
  });
```

- [ ] **Step 2: Update the financial-history latest-point test**

In the same file, find the `it('aligns the latest financial history point with static headline metrics', ...)` block and replace its body:

```ts
  it('aligns the latest financial history point with static headline metrics', () => {
    expect(financialHistory.nvidia.at(-1)).toMatchObject({
      year: 2025,
      revenue: 130.5,
      profit: 72.9,
      grossMargin: 0.75,
      aiRevenue: 114.84,
    });
    expect(financialHistory.tsmc.at(-1)).toMatchObject({
      year: 2025,
      revenue: 112,
      profit: 45,
      grossMargin: 0.572,
      aiRevenue: 61.6,
    });
  });
```

Note: `aiRevenue` = `revenue × aiRevenueShare`. For NVIDIA: 130.5 × 0.88 = 114.84. For TSMC: 112 × 0.55 = 61.6. If the financial-history generator rounds, adjust the expected value to match — do not change the generator.

- [ ] **Step 3: Run the tests**

Run: `npx vitest run src/data/__tests__/catalog.test.ts`

Expected: all 9 tests PASS. If the `aiRevenue` numbers fail due to rounding inside `src/data/financial/index.ts`, update the test to the rounded value the generator emits (run the test once, read the actual, set the expected).

- [ ] **Step 4: Commit**

```bash
git add src/data/__tests__/catalog.test.ts
git commit -m "Update catalog test expectations to 2026-01 snapshot values"
```

---

### Task 5: Refresh Narrative for Companies with Materially-Changed Business

**Files:**
- Modify: `src/data/companies/index.ts`

Only update entries whose 2026-01 product / moat / risk narrative is meaningfully different from what is currently in the file. For each company below, locate the matching `seeds[]` entry (or, for `nvidia`, the `nvidiaDetails` block) and replace just the listed fields. Leave every other company alone.

- [ ] **Step 1: NVIDIA — add Blackwell/Rubin to coreProducts; refresh moats; risk wording**

In the `seeds[]` array, replace the `nvidia` line's `coreProducts`:

```ts
coreProducts: ['GPU', 'CUDA', 'Blackwell/Rubin AI accelerators', 'Data center platform', 'NVLink networking']
```

Replace the `nvidiaDetails.moats` array:

```ts
  moats: [
    { type: 'CUDA 生态', description: '长期开发者锁定和高度优化的软件库形成生态壁垒。' },
    { type: '硬件路线图', description: 'Hopper → Blackwell → Rubin 节奏稳定，整机系统协同迭代。' },
    { type: '网络栈', description: 'NVLink / NVSwitch / Spectrum-X 把单卡优势扩展到机柜与集群尺度。' },
    { type: '供应链能力', description: '与 TSMC、HBM 供应商和整机厂商深度协同。' },
  ],
```

- [ ] **Step 2: OpenAI — refresh coreProducts and seeds entry**

In `seeds[]`, replace `openai`'s `coreProducts`:

```ts
coreProducts: ['GPT-5 / GPT-5.5', 'ChatGPT', 'Sora 视频', 'Operator agent', 'API platform']
```

- [ ] **Step 3: Anthropic — refresh coreProducts**

```ts
coreProducts: ['Claude 4 Opus/Sonnet/Haiku', 'Computer use', 'AI safety research']
```

- [ ] **Step 4: Google DeepMind — refresh coreProducts**

```ts
coreProducts: ['Gemini 2.5 / 3 Pro', 'AlphaFold', 'Veo video', 'AI research']
```

- [ ] **Step 5: Meta AI — refresh coreProducts**

```ts
coreProducts: ['Llama 4', 'Meta AI assistant', 'AI Studio', 'Open-weight models']
```

- [ ] **Step 6: Mistral — refresh coreProducts**

```ts
coreProducts: ['Mistral Large 3', 'Mixtral 系列', 'Le Chat', '开源权重模型']
```

- [ ] **Step 7: Baidu ERNIE — refresh coreProducts**

```ts
coreProducts: ['ERNIE 5', 'Qianfan 平台', '文心一格']
```

- [ ] **Step 8: Moonshot AI — refresh coreProducts**

```ts
coreProducts: ['Kimi K2', '长上下文模型', 'Kimi 智能体']
```

- [ ] **Step 9: Zhipu AI — refresh coreProducts**

```ts
coreProducts: ['GLM-4.5', '智谱清言', 'Agent 平台']
```

- [ ] **Step 10: Microsoft Copilot — refresh coreProducts**

```ts
coreProducts: ['Microsoft 365 Copilot', 'GitHub Copilot', 'Copilot Studio', 'Windows Copilot']
```

- [ ] **Step 11: XPeng — refresh coreProducts (humanoid added)**

```ts
coreProducts: ['XOS 智能驾驶', 'Iron 人形机器人', 'AI 天玑平台', 'EV 平台']
```

- [ ] **Step 12: Waymo — refresh coreProducts**

```ts
coreProducts: ['Waymo One robotaxi', '多城商业化运营', '驾驶基础模型']
```

- [ ] **Step 13: Run the unit test suite**

Run: `npx vitest run src/data/__tests__/catalog.test.ts`

Expected: all 9 tests PASS. The existing `coreweave` / `huawei-ascend` assertions are unchanged because their `coreProducts` aren't touched.

- [ ] **Step 14: Commit**

```bash
git add src/data/companies/index.ts
git commit -m "Refresh AI business narrative for frontier-model and robotics companies"
```

---

### Task 6: Final Verification

**Files:**
- None new; verification only.

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`

Expected: every test PASSES. If any other file (`src/components/__tests__/`, `src/App.test.tsx`) had a stale expectation tied to the old company values, capture the failure and update the assertion to the new snapshot value — do NOT revert the data.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite both succeed with no errors.

- [ ] **Step 3: Spot-check the company detail page in the dev server**

Run: `npm run dev` (background) and open `http://localhost:5173/companies/nvidia`.

Confirm:
- The market-cap card reads `$3.2T · FY2025 财报 · MC @ 2026-01` (chip on the right side of value).
- AI 收入占比 reads `88%`.
- The bottom-left demo notice says `数据为 2026-01 公开财报快照，非实时行情，仅供学习参考。`.

Also open `http://localhost:5173/companies/tsmc` and confirm `$1.1T · FY2025`.

Stop the dev server (`Ctrl+C`).

- [ ] **Step 4: Commit verification notes if anything was adjusted in Step 1**

If Step 1 required updating ancillary tests, commit those changes:

```bash
git add -A
git commit -m "Align ancillary tests with refreshed 2026-01 metrics"
```

Otherwise nothing to do here.
