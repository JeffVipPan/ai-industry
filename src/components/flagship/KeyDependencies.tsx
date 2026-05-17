import { AlertTriangle, ArrowRight, Boxes, Cpu, Microscope, Server, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyById } from '../../data/companies';
import type { FlagshipKeyDependency } from '../../data/flagships';
import { Badge } from '../ui/Badge';

const pillarIcon: Record<string, typeof Cpu> = {
  'tsmc-leading-node': Cpu,
  'hbm-memory': Boxes,
  'hyperscaler-demand': Server,
  'asml-euv': Microscope,
  'cowos-capacity': Boxes,
  'ai-customer-demand': UsersRound,
};

type KeyDependenciesProps = {
  dependencies: FlagshipKeyDependency[];
};

export const KeyDependencies = ({ dependencies }: KeyDependenciesProps) => (
  <section className="company-section-panel p-5">
    <div className="company-section-header">
      <div>
        <p className="company-section-eyebrow">约束栈</p>
        <h2 className="text-2xl font-semibold text-white">三条关键依赖</h2>
      </div>
      <Badge>读这家公司的 3 个支点</Badge>
    </div>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
      把这家公司拆解为三个可独立观察的支点：上游供给、核心客户和替代路径。任何一个环节松动，整张产业链图都会跟着改写。
    </p>
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      {dependencies.map((dep, index) => {
        const Icon = pillarIcon[dep.id] ?? Cpu;
        const partners = dep.partnerCompanyIds.map((id) => getCompanyById(id)).filter(Boolean);

        return (
          <article key={dep.id} className="dependency-card">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/25 bg-white">
                  <Icon className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">关键支点</p>
              </div>
              <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{dep.pillar}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{dep.headline}</p>

            <p className="mt-4 text-sm leading-7 text-slate-400">{dep.thesis}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {partners.map((partner) =>
                partner ? (
                  <Link
                    key={partner.id}
                    to={`/companies/${partner.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-700/20 bg-slate-950/35 px-2.5 py-1 text-xs text-slate-200 transition hover:border-cyan-200 hover:text-cyan-200"
                  >
                    {partner.name.zh}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ) : null,
              )}
            </div>

            <ul className="mt-5 space-y-3 border-t border-slate-700/20 pt-4 text-sm leading-6 text-slate-400">
              {dep.evidence.map((item, idx) => (
                <li key={idx}>
                  <p>{item.text}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {item.source.url ? (
                      <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200">
                        {item.source.label}
                      </a>
                    ) : (
                      item.source.label
                    )}
                    <span className="ml-1 font-mono">· {item.source.date}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-start gap-2 rounded-lg border border-amber-200/40 bg-amber-50/60 p-3 text-xs leading-5 text-slate-500">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <p>{dep.whatBreaksIt}</p>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);
