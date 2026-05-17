import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { financialHistory } from '../data/financial';

const financialDataLabel = '营收参考公开资料，AI 收入为静态估算，非实时/审计口径。';

export const FinancialChart = ({ companyId }: { companyId: string }) => {
  const data = financialHistory[companyId] ?? [];

  return (
    <div className="company-section-panel p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="company-section-eyebrow">财务趋势（公开资料 + AI 估算）</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">营收 / AI 收入</h3>
        </div>
        <p className="hidden max-w-xs text-right text-xs text-slate-500 sm:block">{financialDataLabel}</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#0071e3" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#0071e3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aiRevenue" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#34c759" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#34c759" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(210,210,215,.8)" />
            <XAxis dataKey="year" stroke="#86868b" />
            <YAxis stroke="#86868b" />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid rgba(210,210,215,.95)',
                borderRadius: 8,
                color: '#1d1d1f',
              }}
            />
            <Area dataKey="revenue" stroke="#0071e3" fill="url(#revenue)" name="营收（公开资料口径）" />
            <Area dataKey="aiRevenue" stroke="#34c759" fill="url(#aiRevenue)" name="AI 收入（静态估算）" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
