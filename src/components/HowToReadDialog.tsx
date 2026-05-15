import { BookOpen, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

const readingSteps = [
  {
    title: '先选一个问题',
    copy: '从 NVIDIA 护城河、利润池流向、中国 AI 瓶颈这类问题进入。',
  },
  {
    title: '再看产业链章节',
    copy: '先理解算力、云平台、模型应用这些大段落。',
  },
  {
    title: '最后进入详情页',
    copy: '查看核心结论、指标、上下游关系和相关公司。',
  },
];

export const HowToReadDialog = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const dialog = (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6" role="presentation">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-slate-950/30 backdrop-blur-sm"
        aria-label="关闭弹窗背景"
        onClick={() => setOpen(false)}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-700/20 bg-white p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-6"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="关闭如何阅读"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-slate-700/20 bg-white text-slate-400 transition hover:border-slate-400 hover:text-slate-200"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-xs font-semibold text-[#0071e3]">阅读路径</p>
        <h2 id={titleId} className="mt-2 pr-10 text-2xl font-semibold leading-tight text-white">
          不知道从哪开始？按这 3 步读。
        </h2>

        <div className="mt-5 space-y-3">
          {readingSteps.map((step, index) => (
            <div key={step.title} className="flex gap-3 rounded-xl border border-slate-700/20 bg-slate-950/35 p-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e8f2ff] text-xs font-semibold text-[#005ecb]">
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{step.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-400">{step.copy}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 rounded-xl border border-[#b8d8ff] bg-[#eef6ff] p-3 text-sm leading-6 text-[#005ecb]">
          图谱看关系，价值流看钱，时间线看关键事件。
        </p>
      </section>
    </div>
  );

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn('bg-white/80 text-[#005ecb] hover:text-[#005ecb]', className)}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        如何阅读
      </Button>

      {open ? createPortal(dialog, document.body) : null}
    </>
  );
};
