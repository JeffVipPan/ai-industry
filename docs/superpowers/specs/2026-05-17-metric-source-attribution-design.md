# Metric Source Attribution Design

## Goal

Complete Phase 1 P1.3 by making key numeric surfaces explain their source basis. This pass does not refresh company numbers or introduce live financial APIs. It makes the existing static snapshot honest at the point of reading.

## Scope

In scope:

- Add a reusable metric-source contract to `Company`.
- Populate source labels and dates for metrics rendered by `CompanyPage`.
- Give the strategic top companies explicit source entries where the catalog already has a concrete public source.
- Keep `MetricCard` as the rendering surface, with source label and date below the metric.
- Show `evidence` and `confidence` in value-flow Sankey tooltips and side details.

Out of scope:

- No real-time market data.
- No numeric refresh.
- No new charting library or custom tooltip system.
- No broad rewrite of existing flagship research files.

## Data Contract

`Company` receives a `metricSources` field keyed by the rendered metrics:

- `marketCap`
- `valuation`
- `pe`
- `revenue`
- `profit`
- `grossMargin`
- `aiRevenueShare`

Each source has:

- `label`
- `date`
- optional `url`

For companies without a bespoke source, `buildCompany` derives a static snapshot source from `staticMetricsByCompanyId.sourceAsOf` and `sourceNote`. This keeps every rendered metric attributable without pretending all sources are equally precise.

## UI Behavior

`CompanyPage` resolves metric sources in this order:

1. company-level `metricSources`
2. flagship `metricSources`
3. no source if neither exists

The headline metric chooses `marketCap` for public market-cap cards and `valuation` for private / scale cards.

`ValueFlowSankey` carries evidence and confidence from data into:

- ECharts edge tooltip
- right-side active allocation card
- right-side active path-strength card

## Testing

Add tests that fail until:

- every company has sources for the metrics shown on `CompanyPage`
- strategic top companies expose dated source entries
- a non-flagship company detail page renders source text
- Sankey option payload and tooltip formatter include evidence and confidence
- value-flow path views carry evidence and confidence
