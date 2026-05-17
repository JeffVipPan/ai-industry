/**
 * STATIC ESTIMATE DATA
 * Derived from approximate, source-informed company metrics.
 * Flagship companies override the formula with curated real history.
 * Not real-time financial data. Not for investment decisions.
 * Last updated: 2026-05-16
 */
import type { FinancialPoint } from '../../types/financial';
import { companies } from '../companies';
import { getFlagshipData } from '../flagships';

const buildFormulaPoints = (
  latestRevenue: number,
  latestProfit: number,
  latestGrossMargin: number,
  aiRevenueShare: number,
  includeDataCenter: boolean,
): FinancialPoint[] => {
  const historicalFactors = [0.58, 0.68, 0.78, 0.9, 1];
  return Array.from({ length: 5 }, (_, index) => {
    const year = 2021 + index;
    const factor = historicalFactors[index];
    const revenue = Number((latestRevenue * factor).toFixed(1));
    return {
      year,
      revenue,
      profit: Number((latestProfit * factor).toFixed(1)),
      grossMargin: Number(Math.max(0, latestGrossMargin - (4 - index) * 0.015).toFixed(3)),
      rnd: Number((revenue * 0.14).toFixed(1)),
      aiRevenue: Number((revenue * aiRevenueShare).toFixed(1)),
      dataCenterRevenue: includeDataCenter ? Number((revenue * 0.58).toFixed(1)) : undefined,
    };
  });
};

export const financialHistory: Record<string, FinancialPoint[]> = Object.fromEntries(
  companies.map((company, companyIndex) => {
    const flagship = getFlagshipData(company.id);
    if (flagship) {
      const points: FinancialPoint[] = flagship.financialHistory.points.map((point) => ({
        year: point.calendarYear,
        revenue: point.revenue,
        profit: point.profit,
        grossMargin: point.grossMargin,
        rnd: point.rnd,
        aiRevenue: point.dataCenterRevenue,
        dataCenterRevenue: point.dataCenterRevenue,
      }));
      return [company.id, points];
    }

    const latestRevenue =
      typeof company.publicMetrics?.revenue === 'number' ? company.publicMetrics.revenue / 1_000_000_000 : 2 + companyIndex * 0.35;
    const latestProfit =
      typeof company.publicMetrics?.profit === 'number'
        ? company.publicMetrics.profit / 1_000_000_000
        : latestRevenue * (0.12 + (companyIndex % 8) * 0.018);
    const latestGrossMargin =
      typeof company.publicMetrics?.grossMargin === 'number' ? company.publicMetrics.grossMargin : 0.32 + (companyIndex % 10) * 0.035;
    const includeDataCenter = company.aiBusiness.layerIds.includes('cloud-platform');

    return [
      company.id,
      buildFormulaPoints(latestRevenue, latestProfit, latestGrossMargin, company.aiBusiness.aiRevenueShare, includeDataCenter),
    ];
  }),
);
