import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchCatalog } from '../data/selectors';

const resultHref = (type: string, id: string) => {
  if (type === 'company') return `/companies/${id}`;
  if (type === 'layer') return `/layers/${id}`;
  if (type === 'relationship-type') return `/map?relationship=${id}`;
  return `/map?query=${encodeURIComponent(id)}`;
};

export const SearchCommand = () => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchCatalog(query), [query]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索 NVIDIA、TSMC、芯片设计..."
        className="h-10 w-full rounded-full border border-slate-600/30 bg-white/75 pl-9 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-slate-400 focus:bg-white"
      />
      {query ? (
        <div className="glass-panel absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-lg">
          {results.length ? (
            results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                to={resultHref(result.type, result.id)}
                onClick={() => setQuery('')}
                className="flex items-center justify-between border-b border-slate-700/35 px-3 py-2.5 text-sm transition last:border-b-0 hover:bg-slate-950/35"
              >
                <span className="text-slate-100">{result.label}</span>
                <span className="font-mono text-xs text-slate-500">{result.meta}</span>
              </Link>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-dashed border-cyan-200/30 bg-cyan-200/5 shadow-glow" />
              <p className="text-sm text-slate-300">未找到与 “{query}” 相关的节点</p>
              <p className="mt-1 text-xs text-slate-500">试试 NVIDIA、TSMC、芯片设计、云平台</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
