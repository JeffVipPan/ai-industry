import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { companies } from '../data/companies';
import { layers } from '../data/layers';
import { relationshipTypes } from '../data/relationships';
import { findConnectedNodeIds, modeCompanies } from '../data/selectors';
import { useAppStore } from '../store/useAppStore';
import { RelationshipGraph } from '../components/RelationshipGraph';
import { DemoDataNotice } from '../components/DemoDataNotice';
import { Badge } from '../components/ui/Badge';
import { companyTypeLabel, relationshipTypeLabel } from '../lib/labels';

export const MapPage = () => {
  const [params] = useSearchParams();
  const { mode, selectedId, setSelectedId } = useAppStore();
  const [layerFilter, setLayerFilter] = useState('all');
  const [relationshipFilter, setRelationshipFilter] = useState(params.get('relationship') ?? 'all');
  const visibleCompanies = useMemo(
    () =>
      modeCompanies(mode).filter((company) => {
        if (layerFilter !== 'all' && !company.aiBusiness.layerIds.includes(layerFilter)) return false;
        return true;
      }),
    [layerFilter, mode],
  );
  const selectedCompany = companies.find((company) => company.id === selectedId) ?? visibleCompanies[0];
  const connected = selectedCompany ? findConnectedNodeIds('company', selectedCompany.id) : null;

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge>L2 / L3 关系网络</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">全产业链关系图</h1>
          <p className="mt-4 max-w-2xl text-slate-400">保留探索入口，但用更安静的节点和关系线呈现上下游结构。</p>
        </div>
        <DemoDataNotice compact />
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <select value={layerFilter} onChange={(event) => setLayerFilter(event.target.value)} className="min-h-11 rounded-full border border-slate-700/35 bg-white px-3 text-sm text-slate-200">
          <option value="all">全部产业层</option>
          {layers.map((layer) => (
            <option key={layer.id} value={layer.id}>
              {layer.name.zh}
            </option>
          ))}
        </select>
        <select value={relationshipFilter} onChange={(event) => setRelationshipFilter(event.target.value)} className="min-h-11 rounded-full border border-slate-700/35 bg-white px-3 text-sm text-slate-200">
          <option value="all">全部关系类型</option>
          {relationshipTypes.map((type) => (
            <option key={type} value={type}>
              {relationshipTypeLabel[type]}
            </option>
          ))}
        </select>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel rounded-2xl p-4">
          <RelationshipGraph target={selectedCompany ? { type: 'company', id: selectedCompany.id } : undefined} dense />
        </div>
        <aside className="glass-panel rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-white">摘要</h2>
          {selectedCompany ? (
            <div className="mt-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950/35 font-mono text-xs text-cyan-100">{selectedCompany.logo}</div>
                <div>
                  <p className="font-semibold text-white">{selectedCompany.name.en}</p>
                  <p className="text-xs text-slate-500">{selectedCompany.basicInfo.country} · {companyTypeLabel[selectedCompany.basicInfo.type]}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{selectedCompany.aiBusiness.strategicPosition.zh}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCompany.aiBusiness.layerIds.map((id) => (
                  <Badge key={id}>{id}</Badge>
                ))}
              </div>
              <Link to={`/companies/${selectedCompany.id}`} className="mt-5 inline-block text-sm font-medium text-cyan-100 hover:text-white">
                进入公司详情
              </Link>
              <p className="mt-5 text-xs text-slate-500">相关节点: {connected?.directIds.length ?? 0}</p>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {visibleCompanies.slice(0, 24).map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedId(company.id)}
            className={`rounded-lg border p-3 text-left transition ${
              selectedCompany?.id === company.id
                ? 'border-slate-950 bg-white text-white shadow-glow'
                : 'border-slate-700/30 bg-white/70 text-slate-300 hover:border-slate-400'
            }`}
          >
            <p className="text-sm font-semibold">{company.name.en}</p>
            <p className="mt-1 text-xs text-slate-500">{company.aiBusiness.coreProducts.slice(0, 2).join(' · ')}</p>
          </button>
        ))}
      </section>
    </div>
  );
};
