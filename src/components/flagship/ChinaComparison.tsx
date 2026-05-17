import { ArrowRight, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyById } from '../../data/companies';
import type { FlagshipChinaComparison } from '../../data/flagships';
import { Badge } from '../ui/Badge';

type ChinaComparisonProps = {
  comparison: FlagshipChinaComparison;
};

export const ChinaComparison = ({ comparison }: ChinaComparisonProps) => (
  <section className="company-section-panel company-china-panel p-5">
    <div className="company-section-header">
      <div>
        <p className="company-section-eyebrow">中国对标</p>
        <h2 className="text-2xl font-semibold text-white">{comparison.headline}</h2>
      </div>
      <Flag className="h-5 w-5 text-amber-500" aria-hidden="true" />
    </div>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">{comparison.thesis}</p>

    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="border-b border-slate-700/20 pb-3 pr-4 font-medium">公司</th>
            <th className="border-b border-slate-700/20 pb-3 pr-4 font-medium">主力产品</th>
            <th className="border-b border-slate-700/20 pb-3 pr-4 font-medium">制程</th>
            <th className="border-b border-slate-700/20 pb-3 pr-4 font-medium">软件生态</th>
            <th className="border-b border-slate-700/20 pb-3 font-medium">差距 / 突围点</th>
          </tr>
        </thead>
        <tbody>
          {comparison.peers.map((peer) => {
            const company = getCompanyById(peer.companyId);
            return (
              <tr key={peer.companyId} className="align-top text-slate-200">
                <td className="border-b border-slate-700/15 py-3 pr-4">
                  {company ? (
                    <Link to={`/companies/${company.id}`} className="inline-flex items-center gap-1 font-medium text-white hover:text-cyan-200">
                      {company.name.zh}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span className="text-slate-500">{peer.companyId}</span>
                  )}
                </td>
                <td className="border-b border-slate-700/15 py-3 pr-4 text-slate-200">{peer.product}</td>
                <td className="border-b border-slate-700/15 py-3 pr-4 font-mono text-slate-200">{peer.processNode}</td>
                <td className="border-b border-slate-700/15 py-3 pr-4 text-slate-200">{peer.ecosystem}</td>
                <td className="border-b border-slate-700/15 py-3 text-slate-400">{peer.gapNote}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="mt-5 rounded-lg border border-slate-700/20 bg-white/82 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">结构性差距</p>
      <p className="mt-2 text-sm leading-7 text-slate-300">{comparison.structuralGap}</p>
    </div>

    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
      <span className="font-medium">来源：</span>
      {comparison.sources.map((source, idx) => (
        <a
          key={idx}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-200"
        >
          {source.label}
          <span className="ml-1 font-mono">· {source.date}</span>
          {idx < comparison.sources.length - 1 ? <span className="ml-1">；</span> : null}
        </a>
      ))}
    </div>

    <div className="mt-4">
      <Badge>共{comparison.peers.length}家国产替代路径</Badge>
    </div>
  </section>
);
