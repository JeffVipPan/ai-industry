# Company Metrics Refresh — 2026-01 Snapshot Design

## Goal

Refresh the static company metrics catalog so that every company in `src/data/companies/index.ts` reflects the latest disclosed financial statements as of 2026-01, with explicit per-record source attribution. Replace the current generic "静态估算" UI label with a dated snapshot label so readers can judge currency.

## Scope

In scope:

- All ~80 companies in `seeds[]` plus the imported `sourceTerminalCompanySeeds`.
- Numeric fields: `marketCap`, `pe`, `revenue`, `profit`, `grossMargin`, `valuation`, `fundingAmount`, `aiRevenueShare`.
- AI business descriptions: `coreProducts`, `moats`, `risks` — refreshed only where 2026-01 business reality has materially diverged from the current text.
- Per-record source attribution (`sourceAsOf`, `sourceNote`).
- UI label update on the company detail card and the global demo-data notice.

Out of scope:

- No live market or financial API integration. Snapshot remains static.
- No movement of `staticMetricsByCompanyId` to JSON/CSV — keep TS in place.
- No changes to value-flow Sankey amounts (already excluded by 2026-05-15 spec).
- No changes to `strategicPosition` long-form narrative or per-layer `positioning` blocks. Those are subjective and orthogonal to numeric accuracy.
- No changes to financial history chart generation logic — only the latest-point alignment that already exists.

## Anchoring Convention

- **Financial period** for each record is the latest filed annual or quarterly report available by 2026-01.
  - NVIDIA: FY2026 Q3 (period ending 2025-10).
  - TSMC: 2025 full-year results.
  - A-share companies: 2024 annual report (FY2025 has not yet filed by 2026-01).
  - H-share / US-listed Chinese companies: latest 2025 interim or Q3.
  - Private companies (OpenAI, Anthropic, etc.): most recent publicly disclosed funding round and ARR / revenue figures through 2025-12.
- **Market cap** is anchored to **2026-01-15 close** as a single shared reference date so cross-company comparisons are consistent. For non-listed and state-owned entities, `marketCap` remains `'N/A'` and `valuation` is used.
- Each record states its anchor in `sourceAsOf` so the page can render it verbatim.

## Data Contract Changes

Extend `StaticMetricEstimate` in `src/data/companies/index.ts`:

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
  sourceAsOf: string;        // e.g. 'FY2025', '2025Q3', 'Funding Round 2025-12'
  sourceNote?: string;       // short attribution string, ASCII or zh, no URLs required
};
```

`sourceAsOf` is required for every entry. `sourceNote` is optional but expected for any record whose value differs materially from a casual mental anchor (e.g. state-owned scale estimates).

A new `Company` field surfaces this to UI:

```ts
interface Company {
  // ...
  _meta: {
    dataSource: 'static-estimate';
    lastUpdated: string;
    sourceAsOf?: string;
    sourceNote?: string;
  };
}
```

`buildCompany` copies `staticMetrics.sourceAsOf` / `sourceNote` into `_meta` when present.

## UI Changes

- `src/pages/CompanyPage.tsx`: the small "静态估算" tag next to the market cap card becomes a `{sourceAsOf}` chip pulled from `company._meta.sourceAsOf` (fallback to "静态估算" if missing).
- `src/components/DemoDataNotice.tsx`: copy changes to `数据为 2026-01 公开财报快照，非实时行情，仅供学习参考。`
- The `lastUpdated` constant at the top of `src/data/companies/index.ts` moves to `2026-05-16`.

## Refresh Plan

The refresh is done in three passes over `staticMetricsByCompanyId`:

1. **Numeric refresh**: For every entry, verify the five core numeric fields against the latest filed report. Replace values that have drifted by more than ~10% from the latest disclosed figure. Add `sourceAsOf` and (where useful) `sourceNote`.
2. **Selective business-description refresh**: For companies whose product / moat / risk story has materially changed (frontier-model labs, autonomous-driving players, foundries impacted by export controls), update `coreProducts`, `moats`, `risks` in the `seeds[]` entry or the per-company `*Details` block. Companies with stable narratives are left alone.
3. **Unverifiable entries**: For subsidiaries without standalone disclosure (e.g. `microsoft-azure` revenue), state-owned non-listed (e.g. `state-grid`), and stealth-mode startups, set `sourceNote` to `'分部估算，未独立披露'` or `'非上市估算'` and keep values within a defensible range. Do not invent precision.

## Testing

- Update `src/data/__tests__/catalog.test.ts` representative-value assertions to match the refreshed numbers for NVIDIA, TSMC, OpenAI, Alibaba Cloud, and State Grid. The test transitioning from old values to new values is the visible signal that the refresh landed.
- Add a new test that asserts every entry in `staticMetricsByCompanyId` has a non-empty `sourceAsOf` field. This is the consistency guard that prevents future drift.
- Existing financial-history endpoint tests stay green automatically because `buildCompany` already pulls the latest-point from `publicMetrics`.
- No snapshot tests added.

## Risks and Mitigations

- **Risk**: Numbers drift again three months from now and the snapshot date becomes a lie. **Mitigation**: `sourceAsOf` is rendered directly in the UI, so the reader always sees the anchor — staleness is honest, not hidden.
- **Risk**: My knowledge cutoff is 2026-01; some 2025 full-year reports filed between 2026-02 and 2026-04 are missed. **Mitigation**: That is the explicit anchor — the snapshot is 2026-01, not 2026-05. The notice copy says so.
- **Risk**: Diff size makes review hard. **Mitigation**: PR is structured into two commits — (1) data-contract + UI changes + tests, (2) the numeric refresh table. Reviewers can read the table independently.

## Acceptance Criteria

- `npm test -- --run` green.
- `npm run build` green.
- Every `staticMetricsByCompanyId` entry has a `sourceAsOf` string.
- NVIDIA detail page market cap chip reads `财报快照 · FY2026 Q3` (or the equivalent of whatever `sourceAsOf` is set to for nvidia).
- Demo data notice copy updated.
