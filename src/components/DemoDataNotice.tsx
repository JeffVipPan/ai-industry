import { Info } from 'lucide-react';
import { demoLabel } from '../lib/utils';

export const DemoDataNotice = ({ compact = false }: { compact?: boolean }) => (
  <div className="group flex items-center gap-2 rounded-full border border-slate-700/20 bg-white/75 px-3 py-2 text-xs text-slate-400 transition hover:text-slate-200">
    <Info className="h-3.5 w-3.5 text-cyan-200/70" />
    <span>{compact ? '财报快照 · 2026-01' : demoLabel}</span>
  </div>
);
