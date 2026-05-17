# Map Flagship Company Details Design

## Goal

Bring every company visible on `http://localhost:5174/map` in the provided screenshot up to the same company-detail depth as `/companies/nvidia`. The page should no longer feel split between a few richly researched flagship pages and many shallow company dossiers.

## Approved Approach

Use the existing `src/data/flagships` mechanism. For each screenshot company, register a `FlagshipData` record so `CompanyPage` automatically renders:

- research note / core thesis
- metric source attribution
- three key dependencies
- AI business analysis using existing company data
- key events section
- China / peer comparison
- related nodes
- five-year financial trend

This keeps implementation concentrated in the data layer and avoids changing the company page layout.

## Screenshot Company Scope

The required 37 companies are:

- Applications: `microsoft-copilot`, `salesforce`, `servicenow`, `adobe`, `palantir`, `cursor`, `perplexity`, `midjourney`
- Models: `openai`, `anthropic`, `google-deepmind`, `meta-ai`, `mistral`, `deepseek`, `xai`, `alibaba-qwen`
- Infrastructure: `microsoft-azure`, `aws`, `google-cloud`, `oracle-cloud`, `coreweave`, `equinix`, `digital-realty`, `supermicro`
- Chips: `nvidia`, `amd`, `broadcom`, `tsmc`, `sk-hynix`, `asml`, `applied-materials`, `lam-research`
- Energy: `constellation`, `nextera`, `state-grid`, `longi`, `vistra`

Already registered before this work: `nvidia`, `tsmc`, `sk-hynix`, `microsoft-azure`, `aws`, `google-cloud`, `oracle-cloud`, and `openai`.

New flagship records needed: the remaining 29 companies.

## Data Shape

Each new flagship record must satisfy the existing `FlagshipData` contract:

- `companyId`
- `tagline`
- `researchNote` with at least three paragraphs
- `metricSources`
- exactly three `keyDependencies`
- `chinaComparison` with at least two peers
- `financialHistory` with five annual points

For private companies, subsidiaries, or product lines without standalone financial disclosure, sources and wording should explicitly mark the data as estimates, segment proxies, or public-reporting composites. No UI claim should imply live market data.

## Implementation Notes

- Prefer one or a small number of reusable data builders if they reduce duplication while preserving readable per-company content.
- Keep existing handcrafted flagship files intact unless registration or consistency requires touching them.
- Register all 37 screenshot company IDs in `src/data/flagships/index.ts`.
- Add a contract test in `src/data/__tests__/catalog.test.ts` that asserts all 37 screenshot IDs have complete flagship records.
- Do not change `/map` company selection or visual layout as part of this work.

## Acceptance Criteria

- All 37 screenshot companies are present in `flagshipCompanyIds`.
- Every required company returns `getFlagshipData(companyId)`.
- Every required flagship has at least three research paragraphs, exactly three key dependencies, at least two comparison peers, and five financial history points.
- `npm test -- --run src/data/__tests__/catalog.test.ts` passes.
- `npm run build` passes.
