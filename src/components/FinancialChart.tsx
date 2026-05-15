import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { financialHistory } from '../data/financial';
import { demoLabel } from '../lib/utils';

export const FinancialChart = ({ companyId }: { companyId: string }) => {
  const data = financialHistory[companyId] ?? [];

  return (
    <div className="glass-panel rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">财务趋势（示意）</p>
          <h3 className="text-lg font-semibold text-white">营收 / AI 收入</h3>
        </div>
        <p className="hidden max-w-xs text-right text-xs text-slate-500 sm:block">{demoLabel}</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aiRevenue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,.12)" />
            <XAxis dataKey="year" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                background: 'rgba(2,6,23,.92)',
                border: '1px solid rgba(34,211,238,.22)',
                borderRadius: 8,
              }}
            />
            <Area dataKey="revenue" stroke="#22d3ee" fill="url(#revenue)" name="营收（示意）" />
            <Area dataKey="aiRevenue" stroke="#8b5cf6" fill="url(#aiRevenue)" name="AI 收入（示意）" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
