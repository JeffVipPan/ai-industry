import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Cpu,
  ExternalLink,
  Factory,
  Globe2,
  Landmark,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { FinancialChart } from '../components/FinancialChart';
import { MetricCard } from '../components/MetricCard';
import {
  ChinaComparison,
  CompanyEventsTimeline,
  CompanyResearchNote,
  KeyDependencies,
} from '../components/flagship';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getCompanyById } from '../data/companies';
import { getFlagshipData } from '../data/flagships';
import { getGlossaryDefinition } from '../data/glossary';
import { getLayerById } from '../data/layers';
import { relationships } from '../data/relationships';
import { findConnectedNodeIds } from '../data/selectors';
import { companyTypeLabel, displayCountry, displayTerm } from '../lib/labels';
import { formatCurrency } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';
import type { Company } from '../types/company';
import type { Layer } from '../types/layer';

type PageNavItem = {
  href: string;
  label: string;
  eyebrow: string;
  available: boolean;
};

const buildMarketLabel = (company: Company) => {
  const ticker = company.basicInfo.ticker ?? 'N/A';
  const exchange = company.basicInfo.exchange ?? '未披露';
  return ticker === 'N/A' && exchange === '未披露' ? '未披露' : `${ticker} / ${exchange}`;
};

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
  const primaryLayerName = layers[0]?.name.zh ?? '本产业层';
  const publicMarketCap = company.publicMetrics?.marketCap;
  const marketCap =
    typeof publicMarketCap === 'number' ? publicMarketCap : company.privateMetrics?.valuation ?? publicMarketCap ?? 'N/A';
  const currency = company.publicMetrics?.currency ?? 'USD';
  const headlineMetricLabel = typeof publicMarketCap === 'number' ? '市值' : company.privateMetrics?.valuation ? '估值/规模' : '市值';
  const positioning = company.aiBusiness.positioning;
  const positioningItems = positioning
    ? [
        [`为什么属于${primaryLayerName}`, positioning.whyThisLayer.zh],
        [`在${primaryLayerName}环节承担什么角色`, positioning.roleInLayer.zh],
        ['行业地位', positioning.industryPosition.zh],
      ]
    : [];
  const flagship = getFlagshipData(company.id);
  const grossMarginValue = company.publicMetrics?.grossMargin;
  const sourceAsOf = company._meta.sourceAsOf ?? flagship?.researchNote.asOf ?? '静态估算';
  const headlineMetricSource =
    typeof publicMarketCap === 'number'
      ? company.metricSources.marketCap
      : company.privateMetrics?.valuation
        ? company.metricSources.valuation ?? company.metricSources.marketCap
        : company.metricSources.marketCap;
  const heroThesis = flagship
    ? `${flagship.researchNote.paragraphs[0].split('。')[0]}。`
    : undefined;
  const heroDescriptors = company.aiBusiness.coreProducts.slice(0, 2).map(displayTerm).join(' · ');
  const heroTagline = flagship?.tagline.zh ?? [primaryLayerName, heroDescriptors].filter(Boolean).join(' / ');
  const navItems: PageNavItem[] = [
    { href: '#summary', label: '核心结论', eyebrow: '01', available: true },
    { href: '#metrics', label: '关键指标', eyebrow: '02', available: true },
    { href: '#dependencies', label: '关键依赖', eyebrow: '03', available: Boolean(flagship) },
    { href: '#business', label: 'AI 业务', eyebrow: '04', available: true },
    { href: '#events', label: '关键事件', eyebrow: '05', available: Boolean(flagship) },
    { href: '#china', label: '中国对标', eyebrow: '06', available: Boolean(flagship) },
    { href: '#related', label: '相关节点', eyebrow: '07', available: true },
    { href: '#financials', label: '财务趋势', eyebrow: '08', available: true },
  ].filter((item) => item.available);
  const quickFacts = [
    { label: '资本市场', value: buildMarketLabel(company), icon: Landmark },
    { label: '总部', value: company.basicInfo.headquarters, icon: MapPinned },
    { label: '成立', value: String(company.basicInfo.founded), icon: CalendarDays },
    { label: '类型', value: companyTypeLabel[company.basicInfo.type], icon: Building2 },
  ];

  return (
    <div className="company-page relative z-10 pb-24 pt-16">
      <div className="company-page-shell">
        <Link to="/map" className="company-back-link">
          <ArrowLeft className="h-4 w-4" />
          返回关系图
        </Link>

        <section className="company-hero" aria-labelledby="company-title">
          <div className="company-hero-copy">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{flagship ? '旗舰公司 · L3 详情' : 'L3 公司详情'}</Badge>
              <span className="company-hero-kicker">{flagship ? '旗舰研究' : '公司档案'}</span>
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="company-logo-mark" aria-hidden="true">
                <span>{company.logo}</span>
              </div>
              <div className="min-w-0">
                <p className="company-sector-line">
                  {displayCountry(company.basicInfo.country)} / {companyTypeLabel[company.basicInfo.type]}
                </p>
                <h1 id="company-title" className="company-hero-title">
                  {company.name.zh}
                </h1>
                <p className="mt-2 text-lg leading-7 text-slate-400">
                  {heroTagline}
                </p>
              </div>
            </div>

            {heroThesis ? (
              <p className="mt-5 max-w-4xl text-[17px] leading-8 text-slate-300">
                {heroThesis}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {layers.map((layer) => (
                <Link key={layer.id} to={`/layers/${layer.id}`} className="company-layer-pill">
                  <Factory className="h-3.5 w-3.5" aria-hidden="true" />
                  {layer.name.zh}
                </Link>
              ))}
            </div>
          </div>

          <aside className="company-brief-panel" aria-label="公司速览">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="company-section-eyebrow">信号面板</p>
                <h2 className="mt-1 text-xl font-semibold text-white">公司速览</h2>
              </div>
              <Sparkles className="h-5 w-5 text-cyan-200" aria-hidden="true" />
            </div>
            <dl className="mt-5 grid gap-3">
              {quickFacts.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="company-brief-row">
                    <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                );
              })}
            </dl>
            <div className="mt-5 rounded-lg border border-slate-700/20 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">先读这里</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                先看指标和关键依赖，再回到业务、事件和中国对标，能更快判断它在 AI 产业链里的约束力。
              </p>
            </div>
          </aside>
        </section>

        <div className="company-layout">
          <aside className="company-toc" aria-label="公司详情目录">
            <p className="company-section-eyebrow">本页导航</p>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="company-toc-link">
                  <span>{item.eyebrow}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-7 border-t border-slate-700/20 pt-5">
              <DemoDataNotice />
            </div>
          </aside>

          <main className="company-main">
            <section id="metrics" className="company-metric-strip" aria-label="关键指标">
              <MetricCard
                label={headlineMetricLabel}
                value={formatCurrency(marketCap, currency)}
                source={headlineMetricSource ?? flagship?.metricSources.marketCap}
              >
                <span className="font-mono text-xs text-slate-500">{sourceAsOf}</span>
              </MetricCard>
              <MetricCard
                label="AI 收入占比"
                value={`${Math.round(company.aiBusiness.aiRevenueShare * 100)}%`}
                source={company.metricSources.aiRevenueShare ?? flagship?.metricSources.aiRevenueShare}
              />
              <MetricCard
                label="市盈率"
                value={String(company.publicMetrics?.pe ?? 'N/A')}
                source={company.metricSources.pe ?? flagship?.metricSources.pe}
              />
              <MetricCard
                label="毛利率"
                value={typeof grossMarginValue === 'number' ? `${Math.round(grossMarginValue * 100)}%` : 'N/A'}
                source={company.metricSources.grossMargin ?? flagship?.metricSources.grossMargin}
              />
            </section>

            <section id="summary" className="company-section">
              {flagship ? (
                <CompanyResearchNote note={flagship.researchNote} tagline={flagship.tagline.zh} />
              ) : (
                <section className="company-section-panel document-prose p-6">
                  <div className="company-section-header">
                    <div>
                      <p className="company-section-eyebrow">核心判断</p>
                      <h2 className="text-2xl font-semibold text-white">核心结论</h2>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  </div>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{company.aiBusiness.strategicPosition.zh}</p>
                  {positioning ? (
                    <>
                      <div className="mt-7 grid gap-4 md:grid-cols-3">
                        {positioningItems.map(([title, copy]) => (
                          <article key={title} className="company-signal-card">
                            <p className="text-sm font-semibold text-cyan-200">{title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                          </article>
                        ))}
                      </div>
                      <p className="mt-6 border-t border-slate-700/20 pt-5 text-sm leading-7 text-slate-400">
                        {positioning.industryContext.zh}
                      </p>
                    </>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {company.aiBusiness.coreProducts.slice(0, 4).map((item) => (
                      <Badge key={item} title={getGlossaryDefinition(item)}>
                        {displayTerm(item)}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </section>

            {flagship ? (
              <section id="dependencies" className="company-section">
                <KeyDependencies dependencies={flagship.keyDependencies} />
              </section>
            ) : null}

            <section id="business" className="company-section">
              <div className="company-section-header">
                <div>
                  <p className="company-section-eyebrow">运营视角</p>
                  <h2 className="text-2xl font-semibold text-white">AI 业务分析</h2>
                </div>
                <Cpu className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
                <div className="company-section-panel p-5">
                  <div className="grid gap-4 md:grid-cols-3">
                    <article className="company-business-block">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Zap className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                        核心产品
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {company.aiBusiness.coreProducts.map((item) => (
                          <Badge key={item} title={getGlossaryDefinition(item)}>
                            {displayTerm(item)}
                          </Badge>
                        ))}
                      </div>
                    </article>

                    <article className="company-business-block">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <ShieldCheck className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                        护城河
                      </div>
                      <div className="mt-4 space-y-3">
                        {company.aiBusiness.moats.map((moat) => (
                          <div key={moat.type} className="company-mini-card">
                            <strong className="text-cyan-200">{displayTerm(moat.type)}</strong>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{displayTerm(moat.description)}</p>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="company-business-block">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Route className="h-4 w-4 text-amber-500" aria-hidden="true" />
                        风险
                      </div>
                      <div className="mt-4 space-y-3">
                        {company.aiBusiness.risks.map((risk) => (
                          <div key={risk.type} className="company-mini-card company-mini-card--risk">
                            <strong>{displayTerm(risk.type)}</strong>
                            <p className="mt-1 text-xs leading-5 text-slate-500">{displayTerm(risk.description)}</p>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>

                <div className="company-section-panel p-5">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-white">基础信息</h3>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm">
                    {[
                      ['股票代码', company.basicInfo.ticker ?? 'N/A'],
                      ['交易所', company.basicInfo.exchange ?? 'N/A'],
                      ['成立时间', company.basicInfo.founded],
                      ['CEO', company.basicInfo.ceo ?? '未披露'],
                      ['总部', company.basicInfo.headquarters],
                      ['母公司', company.basicInfo.parentCompanyId ?? 'N/A'],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="company-fact-row">
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>

            {flagship ? (
              <section id="events" className="company-section">
                <CompanyEventsTimeline companyId={company.id} />
              </section>
            ) : null}

            {flagship ? (
              <section id="china" className="company-section">
                <ChinaComparison comparison={flagship.chinaComparison} />
              </section>
            ) : null}

            <section id="related" className="company-section">
              <div className="company-section-panel p-5">
                <div className="company-section-header">
                  <div>
                    <p className="company-section-eyebrow">关系网络</p>
                    <h2 className="text-2xl font-semibold text-white">相关节点</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      完整上下游结构放在全产业链关系图中，这里只保留可继续阅读的相邻公司。
                    </p>
                  </div>
                  <Badge>{connected.edges.length} 条关系</Badge>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {relatedCompanies.slice(0, 12).map((related) => (
                    <Link key={related.id} to={`/companies/${related.id}`} className="company-related-card">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-700/20 bg-white font-mono text-[10px] text-cyan-200">
                        {related.logo}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-100">{related.name.zh}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {displayCountry(related.basicInfo.country)} · {companyTypeLabel[related.basicInfo.type]}
                        </span>
                      </span>
                      <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section id="financials" className="company-section">
              <FinancialChart companyId={company.id} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
