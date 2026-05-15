/**
 * ILLUSTRATIVE DEMO DATA
 * This data is for demonstration purposes only.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-15
 */
import type { FinancialPoint } from '../../types/financial';
import { companies } from '../companies';

export const financialHistory: Record<string, FinancialPoint[]> = Object.fromEntries(
  companies.map((company, companyIndex) => {
    const baseRevenue =
      typeof company.publicMetrics?.revenue === 'number' ? company.publicMetrics.revenue / 1_000_000_000 : 2 + companyIndex * 0.35;
    const points: FinancialPoint[] = Array.from({ length: 5 }, (_, index) => {
      const year = 2021 + index;
      const growth = 0.72 + index * 0.14;
      const revenue = Number((baseRevenue * growth).toFixed(1));
      return {
        year,
        revenue,
        profit: Number((revenue * (0.12 + (companyIndex % 8) * 0.018)).toFixed(1)),
        grossMargin: Number((0.32 + (companyIndex % 10) * 0.035).toFixed(2)),
        rnd: Number((revenue * 0.14).toFixed(1)),
        aiRevenue: Number((revenue * company.aiBusiness.aiRevenueShare).toFixed(1)),
        dataCenterRevenue: company.aiBusiness.layerIds.includes('cloud-platform') || company.id === 'nvidia' ? Number((revenue * 0.58).toFixed(1)) : undefined,
      };
    });
    return [company.id, points];
  }),
);
