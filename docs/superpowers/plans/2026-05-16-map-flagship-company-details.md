# Map Flagship Company Details Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 37 companies visible in the `/map` screenshot render the full flagship company-detail experience used by `/companies/nvidia`.

**Architecture:** Keep the existing `CompanyPage` rendering logic unchanged. Add a data-only flagship generator for the screenshot companies that do not already have handcrafted flagship files, then register the generated records beside the existing handcrafted records.

**Tech Stack:** TypeScript, React, Vite, Vitest.

---

### Task 1: Lock the Screenshot Flagship Contract

**Files:**
- Modify: `src/data/__tests__/catalog.test.ts`

- [ ] **Step 1: Write the failing test**

Add a test inside `describe('AI industry catalog data contract', ...)`:

```ts
  it('registers every screenshot map company as a complete flagship research page', () => {
    const screenshotCompanyIds = [
      'microsoft-copilot',
      'salesforce',
      'servicenow',
      'adobe',
      'palantir',
      'cursor',
      'perplexity',
      'midjourney',
      'openai',
      'anthropic',
      'google-deepmind',
      'meta-ai',
      'mistral',
      'deepseek',
      'xai',
      'alibaba-qwen',
      'microsoft-azure',
      'aws',
      'google-cloud',
      'oracle-cloud',
      'coreweave',
      'equinix',
      'digital-realty',
      'supermicro',
      'nvidia',
      'amd',
      'broadcom',
      'tsmc',
      'sk-hynix',
      'asml',
      'applied-materials',
      'lam-research',
      'constellation',
      'nextera',
      'state-grid',
      'longi',
      'vistra',
    ];

    expect(flagshipCompanyIds).toEqual(expect.arrayContaining(screenshotCompanyIds));

    screenshotCompanyIds.forEach((companyId) => {
      const flagship = getFlagshipData(companyId);

      expect(flagship?.researchNote.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(flagship?.keyDependencies).toHaveLength(3);
      expect(flagship?.chinaComparison.peers.length).toBeGreaterThanOrEqual(2);
      expect(flagship?.financialHistory.points).toHaveLength(5);
    });
  });
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npx vitest run src/data/__tests__/catalog.test.ts`

Expected: FAIL because `salesforce`, `servicenow`, `adobe`, `palantir`, `cursor`, and other screenshot companies are not registered in `flagshipCompanyIds`.

### Task 2: Add Generated Flagship Data For Missing Screenshot Companies

**Files:**
- Create: `src/data/flagships/map-featured.ts`
- Modify: `src/data/flagships/index.ts`

- [ ] **Step 1: Create a reusable data builder**

Create `src/data/flagships/map-featured.ts` with:

```ts
import type { FlagshipData, FlagshipKeyDependency, FlagshipSource } from './types';

type FeaturedFlagshipBrief = {
  companyId: string;
  tagline: string;
  paragraphs: [string, string, string];
  dependencyTheme: [string, string, string];
  peerCompanyIds: [string, string, ...string[]];
  financialBase: {
    revenue: number;
    profit: number;
    grossMargin: number;
    rnd: number;
    aiRevenue: number;
  };
  source: FlagshipSource;
};

const snapshotSource: FlagshipSource = {
  label: '公开资料与公司披露整理（静态研究快照）',
  date: '2026-05',
};
```

Then add helper functions that turn each brief into a full `FlagshipData` with three dependencies, peer comparison, and five annual financial points.

- [ ] **Step 2: Add all missing screenshot company briefs**

Add briefs for these 29 IDs:

```ts
[
  'microsoft-copilot',
  'salesforce',
  'servicenow',
  'adobe',
  'palantir',
  'cursor',
  'perplexity',
  'midjourney',
  'anthropic',
  'google-deepmind',
  'meta-ai',
  'mistral',
  'deepseek',
  'xai',
  'alibaba-qwen',
  'coreweave',
  'equinix',
  'digital-realty',
  'supermicro',
  'amd',
  'broadcom',
  'asml',
  'applied-materials',
  'lam-research',
  'constellation',
  'nextera',
  'state-grid',
  'longi',
  'vistra',
]
```

Each brief must have three company-specific Chinese paragraphs and three named dependency themes. Use conservative wording for private or segment-level financials.

- [ ] **Step 3: Export generated flagship records**

At the end of `src/data/flagships/map-featured.ts`:

```ts
export const mapFeaturedFlagships = Object.fromEntries(
  featuredFlagshipBriefs.map((brief) => [brief.companyId, createFeaturedFlagship(brief)]),
) as Record<string, FlagshipData>;
```

- [ ] **Step 4: Register generated records**

In `src/data/flagships/index.ts`, import `mapFeaturedFlagships` and merge it before handcrafted records:

```ts
import { mapFeaturedFlagships } from './map-featured';

const flagshipById: Record<string, FlagshipData> = {
  ...mapFeaturedFlagships,
  [aseFlagship.companyId]: aseFlagship,
  ...
};
```

Existing handcrafted records should override generated records if an ID appears in both.

### Task 3: Verify And Build

**Files:**
- No source files beyond Task 1 and Task 2.

- [ ] **Step 1: Run the targeted catalog test**

Run: `npx vitest run src/data/__tests__/catalog.test.ts`

Expected: PASS with the screenshot flagship test green.

- [ ] **Step 2: Run the full build**

Run: `npm run build`

Expected: PASS with TypeScript and Vite build completing successfully.

- [ ] **Step 3: Browser spot-check**

Open `http://localhost:5174/companies/cursor` and `http://localhost:5174/companies/state-grid`.

Expected: both pages show `Research Memo`, `三条关键依赖`, `China Benchmark`, and `财务趋势`.
