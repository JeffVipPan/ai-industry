import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getCompanyById } from '../data/companies';
import type { Layer } from '../types/layer';

export const MarketShareChart = ({ layer }: { layer: Layer }) => {
  const data = layer.globalLandscape.marketShare.map((item) => ({
    name: getCompanyById(item.companyId)?.name.en ?? item.companyId,
    share: item.share,
  }));

  return (
    <div className="glass-panel rounded-lg p-4">
      <p className="text-xs text-slate-500">市场份额（示意）</p>
      <h3 className="mb-4 text-lg font-semibold text-white">全球格局</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid stroke="rgba(148,163,184,.12)" />
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="name" type="category" width={120} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: 'rgba(2,6,23,.92)',
                border: '1px solid rgba(34,211,238,.22)',
                borderRadius: 8,
              }}
            />
            <Bar dataKey="share" fill="#22d3ee" radius={[0, 4, 4, 0]} name="份额（示意 %）" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
