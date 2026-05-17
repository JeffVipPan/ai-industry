# Favicon Design

## Goal

Add a clear favicon for AI Industry Intelligence Terminal that matches the product's industry-map identity and remains legible in browser tabs.

## Selected Direction

Use an abstract industry-network mark instead of an `AI` lettermark. This avoids making the product feel like a generic AI tool while still matching the app's blue research-terminal palette.

The favicon will use:

- A rounded square canvas so it fills favicon space better than a circle.
- A blue gradient background based on the existing `--research-blue` and `--research-sky` palette.
- A simple node-and-link value-chain symbol centered on the icon.
- Subtle grid lines to suggest an industry intelligence terminal without reducing small-size readability.

## Files

- `public/favicon.svg`: primary SVG favicon.
- `index.html`: link the SVG favicon with `rel="icon"`.

## Constraints

- Keep the favicon asset self-contained and dependency-free.
- Prefer SVG for crisp rendering at common browser favicon sizes.
- Do not change unrelated page styling or navigation branding.

## Verification

- Build the Vite app successfully.
- Check that `index.html` references `/favicon.svg`.
- Inspect the generated SVG dimensions and confirm the node graph is visible at small size without any lettermark.
