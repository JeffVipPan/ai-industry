import { ChevronUp, Map, Route, Sparkles, Volume2, VolumeX } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';
import { layers } from '../data/layers';
import { useAppStore } from '../store/useAppStore';
import { Button } from './ui/Button';
import { SearchCommand } from './SearchCommand';

const navItems = [
  { href: '/', label: '探索', icon: Sparkles },
  { href: '/map', label: '关系图', icon: Map },
  { href: '/value-flow', label: '价值流', icon: Route },
  { href: '/timeline', label: '时间线', icon: ChevronUp },
];

export const AppShell = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode, setMode, soundEnabled, toggleSound, exploredIds } = useAppStore();
  const depth = pathname.startsWith('/companies') || pathname.startsWith('/layers') ? 'L3' : pathname === '/' ? 'L1 → L2' : 'L2';

  return (
    <div className="relative min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700/20 bg-slate-950/45 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <button onClick={() => navigate('/')} className="flex min-w-fit items-center gap-2 text-left">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-glow" />
            <span className="hidden text-sm font-semibold text-slate-100 sm:inline">AI 产业</span>
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `inline-flex min-h-10 items-center gap-2 rounded-md px-3 text-sm transition ${
                      isActive ? 'bg-cyan-300/10 text-cyan-100' : 'text-slate-400 hover:bg-cyan-300/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="ml-auto hidden flex-1 justify-end lg:flex">
            <SearchCommand />
          </div>
          <div className="hidden items-center rounded-md border border-slate-700/35 bg-slate-950/40 p-1 text-xs sm:flex">
            {(['global', 'china'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded px-2.5 py-1.5 transition ${
                  mode === item ? 'bg-cyan-300/12 text-cyan-100' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {item === 'global' ? '全球' : '中国'}
              </button>
            ))}
          </div>
          <Button aria-label="切换音效" onClick={toggleSound} className="min-h-10 px-2">
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </header>
      <main>{children}</main>
      <aside className="fixed bottom-4 left-4 z-40 hidden max-w-xs rounded-lg border border-cyan-300/15 bg-slate-950/50 px-3 py-2 text-xs text-slate-400 backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-200">{depth}</span>
          <span>探索深度</span>
          <span className="ml-auto font-mono">{exploredIds.length}/{layers.length + companies.length}</span>
        </div>
      </aside>
      <button
        onClick={() => navigate('/map')}
        className="fixed bottom-4 right-4 z-40 hidden rounded-full border border-cyan-300/25 bg-slate-950/70 px-4 py-3 text-sm text-cyan-100 shadow-glow backdrop-blur transition hover:bg-cyan-300/10 md:block"
      >
        鸟瞰模式
      </button>
    </div>
  );
};
