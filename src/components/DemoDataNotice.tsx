import { Info } from 'lucide-react';
import { demoLabel } from '../lib/utils';

export const DemoDataNotice = ({ compact = false }: { compact?: boolean }) => (
  <div className="group flex items-center gap-2 border-l-2 border-cyan-300/35 bg-cyan-300/5 px-3 py-2 text-xs text-slate-400 transition hover:text-slate-200">
    <Info className="h-3.5 w-3.5 text-cyan-200/70" />
    <span>{compact ? '示意演示数据 · Illustrative demo data' : `示意演示数据 · ${demoLabel}`}</span>
  </div>
);
