# Static Real Metrics Design

## Goal

Replace formula-generated illustrative company metrics with static, approximate real-world ranges for the AI industry catalog. The data does not need to be real-time, but it should feel materially grounded for common indicators such as market cap, valuation, revenue, profit, gross margin, and AI revenue exposure.

## Scope

- Cover company detail page key metrics and graph sizing inputs.
- Preserve the existing local data architecture under `src/data`.
- Keep non-real-time disclaimers visible, but change wording from pure demo data to static estimated data.
- Do not introduce a live financial API or real-time market dependency.
- Do not rework the value-flow Sankey amounts in this pass.

## Architecture

Add a static metrics table keyed by `company.id` near the company seed data. `buildCompany` will prefer the static table over generated fallback values. Subsidiaries, private companies, and state-owned companies can use valuation or scale estimates when a public market cap is not available, while listed companies use market-cap and fiscal metrics in their reporting currency.

Financial history remains derived for non-critical historical points, but the latest point should align with the static revenue, profit, gross margin, and AI revenue share. This keeps the chart coherent with the headline cards without requiring complete five-year histories for every company.

## Data Policy

Values are static approximate ranges or midpoint estimates. They are suitable for product exploration and industry learning, not investment decisions. Source basis includes public annual reports, investor relations releases, rating summaries, and widely reported private funding or valuation disclosures available around May 2026.

## Testing

Add catalog tests that verify representative companies use known static values instead of index-generated metrics. The tests should cover:

- NVIDIA as a public AI compute leader.
- TSMC as public manufacturing infrastructure.
- State Grid as a state-owned non-listed infrastructure company.
- OpenAI as a private foundation-model company.
- A cloud subsidiary such as Alibaba Cloud or Azure.
