import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getCompanyById } from '../data/companies';
import type { Layer } from '../types/layer';

export const MarketShareChart = ({ layer }: { layer: Layer }) => {
  const data = layer.globalLandscape.marketShare.map((item) => ({
    name: getCompanyById(item.companyId)?.name.zh ?? item.companyId,
    share: item.share,
  }));

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs text-slate-500">市场份额（示意）</p>
      <h3 className="mb-4 text-lg font-semibold text-white">全球格局</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid stroke="rgba(210,210,215,.8)" />
            <XAxis type="number" stroke="#86868b" />
            <YAxis dataKey="name" type="category" width={120} stroke="#6e6e73" />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid rgba(210,210,215,.95)',
                borderRadius: 8,
                color: '#1d1d1f',
              }}
            />
            <Bar dataKey="share" fill="#0071e3" radius={[0, 4, 4, 0]} name="份额（示意 %）" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
