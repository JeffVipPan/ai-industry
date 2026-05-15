import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCompanyById } from '../data/companies';
import { getLayerById } from '../data/layers';
import { relationships } from '../data/relationships';
import { findConnectedNodeIds } from '../data/selectors';
import { formatCurrency } from '../lib/utils';
import { companyTypeLabel } from '../lib/labels';
import { useAppStore } from '../store/useAppStore';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { FinancialChart } from '../components/FinancialChart';
import { MetricCard } from '../components/MetricCard';
import { RelationshipGraph } from '../components/RelationshipGraph';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import type { Company } from '../types/company';
import type { Layer } from '../types/layer';

export const CompanyPage = () => {
  const { companyId = '' } = useParams();
  const company = getCompanyById(companyId);
  const markExplored = useAppStore((state) => state.markExplored);

  useEffect(() => {
    if (company) markExplored(company.id);
  }, [company, markExplored]);

  if (!company) {
    return (
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 h-20 w-20 rounded-full border border-dashed border-cyan-200/30 bg-cyan-200/5 shadow-glow" />
        <h1 className="text-3xl font-light text-white">这个节点不存在于已知的产业链中</h1>
        <Link to="/map" className="mt-6">
          <Button variant="primary">返回主网络</Button>
        </Link>
      </div>
    );
  }

  const connected = findConnectedNodeIds('company', company.id, relationships);
  const relatedCompanies = connected.directIds.map(getCompanyById).filter((item): item is Company => Boolean(item));
  const layers = company.aiBusiness.layerIds.map(getLayerById).filter((item): item is Layer => Boolean(item));
  const marketCap = company.publicMetrics?.marketCap ?? company.privateMetrics?.valuation ?? 'N/A';
  const currency = company.publicMetrics?.currency ?? 'USD';

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
      <Link to="/map" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" />
        返回关系图
      </Link>
      <section className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)_260px]">
        <nav className="hidden border-r border-slate-700/20 pr-5 text-sm leading-8 text-slate-400 lg:block">
          <p className="mb-3 text-xs font-medium text-slate-500">研究文档</p>
          <a href="#summary" className="block font-semibold text-cyan-200">核心结论</a>
          <a href="#metrics" className="block">关键指标</a>
          <a href="#business" className="block">AI 业务</a>
          <a href="#relationships" className="block">上下游关系</a>
          <a href="#financials" className="block">财务趋势</a>
        </nav>
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>L3 公司详情</Badge>
            {layers.map((layer) => (
              <Link key={layer.id} to={`/layers/${layer.id}`} className="text-xs text-cyan-100 hover:text-white">
                {layer.name.zh}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-2xl border border-slate-700/20 bg-white font-mono text-lg text-cyan-100 shadow-glow">
              {company.logo}
            </div>
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">{company.name.en}</h1>
              <p className="mt-2 text-slate-400">{company.name.zh} · {company.basicInfo.country} · {companyTypeLabel[company.basicInfo.type]}</p>
            </div>
          </div>
          <section id="summary" className="document-prose research-blue-surface mt-8 rounded-2xl border border-slate-700/20 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.045)]">
            <p className="text-sm font-semibold text-cyan-200">核心结论</p>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{company.aiBusiness.strategicPosition.zh}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {company.aiBusiness.coreProducts.slice(0, 4).map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </section>
        </article>
        <aside className="glass-panel h-fit rounded-2xl p-5">
          <p className="text-sm font-semibold text-white">On this page</p>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <a href="#summary" className="block text-cyan-200">摘要</a>
            <a href="#metrics" className="block">指标</a>
            <a href="#business" className="block">AI 业务</a>
            <a href="#relationships" className="block">关系图</a>
            <a href="#financials" className="block">财务趋势</a>
          </div>
          <div className="mt-5 border-t border-slate-700/20 pt-4">
            <DemoDataNotice />
          </div>
        </aside>
      </section>

      <section id="metrics" className="mt-8 grid gap-4 lg:ml-[212px] lg:grid-cols-4">
        <MetricCard label={company.basicInfo.type === 'private' ? '估值' : '市值'} value={`${formatCurrency(marketCap, currency)} demo`} />
        <MetricCard label="AI 收入占比" value={`${Math.round(company.aiBusiness.aiRevenueShare * 100)}%`} />
        <MetricCard label="市盈率" value={String(company.publicMetrics?.pe ?? 'N/A')} />
        <MetricCard label="毛利率" value={typeof company.publicMetrics?.grossMargin === 'number' ? `${Math.round(company.publicMetrics.grossMargin * 100)}%` : 'N/A'} />
      </section>

      <div className="mt-6 hidden lg:ml-[212px] lg:block">
        <div className="glass-panel rounded-2xl p-5">
          <DemoDataNotice />
        </div>
      </div>

      <section id="business" className="mt-10 grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-white">AI 业务分析</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <p className="mb-2 text-sm text-slate-500">核心产品</p>
              <div className="flex flex-wrap gap-2">
                {company.aiBusiness.coreProducts.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-500">护城河</p>
              <div className="space-y-2">
                {company.aiBusiness.moats.map((moat) => (
                  <div key={moat.type} className="rounded-lg bg-slate-950/35 p-3 text-sm text-slate-300">
                    <strong className="text-cyan-100">{moat.type}</strong>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{moat.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-500">风险</p>
              <div className="space-y-2">
                {company.aiBusiness.risks.map((risk) => (
                  <div key={risk.type} className="rounded-lg bg-slate-950/35 p-3 text-sm text-slate-300">
                    <strong className="text-violet-200">{risk.type}</strong>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-white">基础信息</h2>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            {[
              ['股票代码', company.basicInfo.ticker ?? 'N/A'],
              ['交易所', company.basicInfo.exchange ?? 'N/A'],
              ['成立时间', company.basicInfo.founded],
              ['CEO', company.basicInfo.ceo ?? '未披露'],
              ['总部', company.basicInfo.headquarters],
              ['母公司', company.basicInfo.parentCompanyId ?? 'N/A'],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-lg bg-slate-950/35 p-3">
                <dt className="text-xs text-slate-500">{label}</dt>
                <dd className="mt-1 text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="relationships" className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">上下游关系</h2>
              <p className="mt-1 text-sm text-slate-400">NVIDIA 页面会自动高亮 TSMC、SK Hynix、AWS、OpenAI、Tesla 等关系节点。</p>
            </div>
            <Badge>{connected.edges.length} 条关系</Badge>
          </div>
          <RelationshipGraph target={{ type: 'company', id: company.id }} dense />
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-white">相关节点</h2>
          <div className="mt-5 space-y-3">
            {relatedCompanies.slice(0, 12).map((related) => (
              <Link key={related.id} to={`/companies/${related.id}`} className="flex items-center gap-3 rounded-lg border border-slate-700/35 bg-white p-3 transition hover:border-slate-400">
                <span className="grid h-9 w-9 place-items-center rounded bg-cyan-300/8 font-mono text-[10px] text-cyan-100">{related.logo}</span>
                <span>
                  <span className="block text-sm text-slate-100">{related.name.en}</span>
                  <span className="block text-xs text-slate-500">{related.basicInfo.country} · {companyTypeLabel[related.basicInfo.type]}</span>
                </span>
                <ExternalLink className="ml-auto h-4 w-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="financials" className="mt-10">
        <FinancialChart companyId={company.id} />
      </section>
    </div>
  );
};
