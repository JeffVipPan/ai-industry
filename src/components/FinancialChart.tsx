import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { financialHistory } from '../data/financial';
import { demoLabel } from '../lib/utils';

export const FinancialChart = ({ companyId }: { companyId: string }) => {
  const data = financialHistory[companyId] ?? [];

  return (
    <div className="glass-panel rounded-2xl p-4">
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
            <Area dataKey="revenue" stroke="#0071e3" fill="url(#revenue)" name="营收（示意）" />
            <Area dataKey="aiRevenue" stroke="#34c759" fill="url(#aiRevenue)" name="AI 收入（示意）" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
