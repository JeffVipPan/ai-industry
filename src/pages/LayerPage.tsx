import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { companiesByLayer } from '../data/companies';
import { getLayerById } from '../data/layers';
import { useAppStore } from '../store/useAppStore';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { MarketShareChart } from '../components/MarketShareChart';
import { MetricCard } from '../components/MetricCard';
import { RelationshipGraph } from '../components/RelationshipGraph';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { companyTypeLabel, policySupportLabel, pricingPowerLabel } from '../lib/labels';

export const LayerPage = () => {
  const { layerId = '' } = useParams();
  const layer = getLayerById(layerId);
  const markExplored = useAppStore((state) => state.markExplored);

  useEffect(() => {
    if (layer) markExplored(layer.id);
  }, [layer, markExplored]);

  if (!layer) {
    return (
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 h-20 w-20 rounded-full border border-dashed border-cyan-200/30 bg-cyan-200/5 shadow-glow" />
        <h1 className="text-3xl font-light text-white">这个节点不存在于已知的产业链中</h1>
        <Link to="/" className="mt-6">
          <Button variant="primary">返回主网络</Button>
        </Link>
      </div>
    );
  }

  const companies = companiesByLayer(layer.id);

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" />
        返回产业链
      </Link>
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <Badge>L3 产业层详情</Badge>
          <h1 className="mt-4 text-4xl font-light text-white sm:text-6xl">{layer.name.zh}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{layer.description.long.zh}</p>
        </div>
        <div className="glass-panel rounded-lg p-5">
          <DemoDataNotice />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard label="技术壁垒" value={`${layer.technicalBarrier}/5`} />
            <MetricCard label="国产替代率" value={`${Math.round(layer.chinaLandscape.localizationRate * 100)}%`} />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-4">
        <MetricCard label="定价权" value={pricingPowerLabel[layer.pricingPower]} />
        <MetricCard label="核心公司" value={`${companies.length}`} />
        <MetricCard label="全球龙头" value={`${layer.globalLandscape.leaders.length}`} />
        <MetricCard label="政策支持" value={policySupportLabel[layer.chinaLandscape.policySupport]} />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="glass-panel rounded-lg p-5">
          <h2 className="text-xl font-semibold text-white">上下游关系图</h2>
          <p className="mt-2 text-sm text-slate-400">关系由统一关系数据自动推导。</p>
          <div className="mt-4">
            <RelationshipGraph target={{ type: 'layer', id: layer.id }} dense />
          </div>
        </div>
        <MarketShareChart layer={layer} />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-lg p-5">
          <h2 className="text-xl font-semibold text-white">技术架构</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {layer.coreTechnologies.map((tech) => (
              <div key={tech} className="rounded-md border border-slate-700/35 bg-slate-950/35 p-3">
                <p className="text-sm text-slate-100">{tech}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">该能力节点用于演示本层技术组成。</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-lg p-5">
          <h2 className="text-xl font-semibold text-white">中国 vs 全球</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <p>{layer.chinaLandscape.gapToGlobal.zh}</p>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-300" style={{ width: `${layer.chinaLandscape.localizationRate * 100}%` }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.chinaLandscape.keyBottlenecks.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">核心公司</h2>
          <DemoDataNotice compact />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <Link key={company.id} to={`/companies/${company.id}`} className="glass-panel rounded-lg p-4 transition hover:border-cyan-300/35">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-cyan-300/10 font-mono text-xs text-cyan-100">{company.logo}</div>
                <div>
                  <p className="font-semibold text-white">{company.name.en}</p>
                  <p className="mt-1 text-sm text-slate-400">{company.basicInfo.country} · {companyTypeLabel[company.basicInfo.type]}</p>
                </div>
                <ExternalLink className="ml-auto h-4 w-4 text-slate-500" />
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">{company.aiBusiness.strategicPosition.zh}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
