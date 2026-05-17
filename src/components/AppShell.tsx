import { BookOpen, ChevronUp, Gauge, Map, Route, Search, Sparkles, X } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';
import { layers } from '../data/layers';
import { useAppStore } from '../store/useAppStore';
import { Button } from './ui/Button';
import { SearchCommand } from './SearchCommand';

const navItems = [
  { href: '/', label: '概览', icon: Sparkles },
  { href: '/console', label: '控制台', icon: Gauge },
  { href: '/map', label: '图谱', icon: Map },
  { href: '/value-flow', label: '价值流', icon: Route },
  { href: '/timeline', label: '时间线', icon: ChevronUp },
];

export const AppShell = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mode, setMode, exploredIds } = useAppStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const depth = pathname.startsWith('/companies') || pathname.startsWith('/layers') ? 'L3' : pathname === '/' ? 'L1 → L2' : 'L2';
  const isWorkspacePage = pathname === '/map' || pathname === '/console';
  const showFloatingShortcuts = !isWorkspacePage && pathname !== '/';

  useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSearchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileSearchOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileSearchOpen]);

  return (
    <div className="relative min-h-screen">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700/20 bg-white/78 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:gap-4">
          <button onClick={() => navigate('/')} className="flex min-w-fit items-center gap-2 text-left">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0071e3] text-[11px] font-semibold text-white">AI</span>
            <span className="hidden text-sm font-semibold text-slate-100 sm:inline">AI 产业图谱</span>
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
                      isActive ? 'bg-[#e8f2ff] text-[#005ecb]' : 'text-slate-400 hover:bg-[#eef6ff] hover:text-[#005ecb]'
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
          <div className="hidden items-center rounded-full border border-slate-700/35 bg-slate-950/40 p-1 text-xs sm:flex">
            {(['global', 'china'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-full px-3 py-1.5 transition ${
                  mode === item ? 'bg-[#e8f2ff] text-[#005ecb] shadow-sm' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {item === 'global' ? '全球' : '中国'}
              </button>
            ))}
          </div>
          <Button aria-label="打开搜索" onClick={() => setMobileSearchOpen(true)} className="min-h-10 px-2 lg:hidden">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>
      {mobileSearchOpen ? (
        <div className="fixed inset-0 z-[70] bg-white/94 px-4 pt-[calc(1rem+env(safe-area-inset-top))] backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true" aria-label="移动端搜索">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <SearchCommand autoFocus className="max-w-none" onResultSelect={() => setMobileSearchOpen(false)} />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="关闭搜索"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-700/20 bg-white text-slate-400 transition hover:border-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
      <main className="pb-20 md:pb-0">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700/20 bg-white/92 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_36px_rgba(29,29,31,0.08)] backdrop-blur-xl md:hidden" aria-label="移动端主导航">
        <div className="mx-auto flex max-w-xl items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium transition ${
                    isActive ? 'bg-[#e8f2ff] text-[#005ecb]' : 'text-slate-500 hover:bg-[#f5f8fc] hover:text-[#005ecb]'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="max-w-full truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
      {showFloatingShortcuts ? (
        <aside className="fixed bottom-4 left-4 z-40 hidden max-w-xs rounded-full border border-cyan-300/15 bg-white/80 px-3 py-2 text-xs text-slate-400 shadow-glow backdrop-blur md:block">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-200">{depth}</span>
            <span>探索深度</span>
            <span className="ml-auto font-mono">{exploredIds.length}/{layers.length + companies.length}</span>
          </div>
        </aside>
      ) : null}
      {showFloatingShortcuts ? (
        <button
          onClick={() => navigate('/map')}
          className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded-full border border-cyan-300/25 bg-white/85 px-4 py-3 text-sm text-cyan-100 shadow-glow backdrop-blur transition hover:bg-white md:flex"
        >
          <BookOpen className="h-4 w-4" />
          打开图谱
        </button>
      ) : null}
    </div>
  );
};
