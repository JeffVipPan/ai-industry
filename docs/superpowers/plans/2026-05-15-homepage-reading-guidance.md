# Homepage Reading Guidance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an on-demand "如何阅读" hero dialog and quiet section-level reading hints to reduce homepage understanding load.

**Architecture:** Keep the feature local to the homepage. Add `HowToReadDialog` for the trigger and modal state, add `ReadingHint` for reusable one-line section notes, and wire both into `HomePage` without touching global Zustand state or route/data models.

**Tech Stack:** React 19, TypeScript, Vite, TailwindCSS, lucide-react, Vitest, React Testing Library.

---

## Browser Check Finding

During browser verification, the dialog had to render through `createPortal(dialog, document.body)`. `HomePage` is wrapped in a `relative z-10` stacking context, while the fixed header uses `z-50`; rendering the modal inside the page can leave the overlay below the header. The final implementation portals the dialog to `document.body` and names the overlay button `关闭弹窗背景` so the visible close button keeps the exact accessible name `关闭如何阅读`.

## File Structure

- Create `src/components/HowToReadDialog.tsx`: local-state dialog trigger and accessible modal content.
- Create `src/components/ReadingHint.tsx`: compact icon-plus-text section hint.
- Modify `src/pages/HomePage.tsx`: import and place the new components in the hero and four homepage sections.
- Modify `src/App.test.tsx`: add behavior coverage for opening/closing the dialog and rendering section hints.

### Task 1: Add Failing Homepage Guidance Test

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Write the failing test**

Add `userEvent` and `afterEach` imports:

```tsx
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
```

Add cleanup after imports:

```tsx
afterEach(() => {
  cleanup();
});
```

Add this test inside `describe('AI Industry research routes', () => { ... })`:

```tsx
it('opens and closes on-demand homepage reading guidance', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  await user.click(screen.getByRole('button', { name: '如何阅读' }));

  expect(screen.getByRole('dialog', { name: '不知道从哪开始？按这 3 步读。' })).toBeTruthy();
  expect(screen.getByText('先选一个问题')).toBeTruthy();
  expect(screen.getByText('再看产业链章节')).toBeTruthy();
  expect(screen.getByText('最后进入详情页')).toBeTruthy();
  expect(screen.getByText('图谱看关系，价值流看钱，时间线看关键事件。')).toBeTruthy();

  await user.click(screen.getByRole('button', { name: '关闭如何阅读' }));

  expect(screen.queryByRole('dialog', { name: '不知道从哪开始？按这 3 步读。' })).toBeNull();
});
```

Add this second test:

```tsx
it('renders section reading hints on the homepage', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  expect(screen.getByText('先读 3 个章节，建立 AI 产业链的主线判断。')).toBeTruthy();
  expect(screen.getByText('每个详情页都按同一套结构组织，方便横向比较产业层。')).toBeTruthy();
  expect(screen.getByText('这里是完整产业链目录，适合直接跳到某一层深入。')).toBeTruthy();
  expect(screen.getByText('价值流看收入和利润怎么分配，时间线看技术与资本事件。')).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: FAIL because `@testing-library/user-event` may need to be installed or, if available, because the "如何阅读" button and hint text do not exist yet.

### Task 2: Create Guidance Components

**Files:**
- Create: `src/components/HowToReadDialog.tsx`
- Create: `src/components/ReadingHint.tsx`

- [ ] **Step 1: Install the test interaction helper if the red test fails due to missing dependency**

Run only if Vitest reports that `@testing-library/user-event` cannot be resolved:

```bash
npm install -D @testing-library/user-event
```

Expected: `package.json` and `package-lock.json` include `@testing-library/user-event`.

- [ ] **Step 2: Implement `ReadingHint`**

Create `src/components/ReadingHint.tsx`:

```tsx
import { Info } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

type ReadingHintProps = PropsWithChildren<{
  className?: string;
}>;

export const ReadingHint = ({ children, className }: ReadingHintProps) => (
  <p
    className={cn(
      'inline-flex max-w-2xl items-start gap-2 rounded-full border border-[#b8d8ff] bg-[#eef6ff] px-3 py-2 text-xs leading-5 text-[#005ecb]',
      className,
    )}
  >
    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    <span>{children}</span>
  </p>
);
```

- [ ] **Step 3: Implement `HowToReadDialog`**

Create `src/components/HowToReadDialog.tsx`:

```tsx
import { BookOpen, Map, Route, Timer, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
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

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn('min-h-11 bg-white/80 text-[#005ecb] hover:text-[#005ecb]', className)}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        如何阅读
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6" role="presentation">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-slate-950/30 backdrop-blur-sm"
            aria-label="关闭如何阅读"
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
            <div className="mt-5 grid gap-2 rounded-xl border border-[#b8d8ff] bg-[#eef6ff] p-3 text-xs leading-5 text-[#005ecb] sm:grid-cols-3">
              <span className="inline-flex items-center gap-1.5">
                <Map className="h-3.5 w-3.5" aria-hidden="true" />
                图谱看关系
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Route className="h-3.5 w-3.5" aria-hidden="true" />
                价值流看钱
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                时间线看关键事件。
              </span>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};
```

- [ ] **Step 4: Run test to verify components are still not wired**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: FAIL because `HomePage` does not import or render the new components yet.

### Task 3: Wire Components Into Homepage

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Import components**

Add:

```tsx
import { HowToReadDialog } from '../components/HowToReadDialog';
import { ReadingHint } from '../components/ReadingHint';
```

- [ ] **Step 2: Add hero dialog trigger**

In the hero action row containing "开始探索" and "研究文档", add:

```tsx
<HowToReadDialog />
```

Place it after the "研究文档" link so the primary "开始探索" button remains first.

- [ ] **Step 3: Add section hints**

Add `ReadingHint` below the section header blocks:

```tsx
<ReadingHint className="mt-4">先读 3 个章节，建立 AI 产业链的主线判断。</ReadingHint>
```

```tsx
<ReadingHint className="mt-5">每个详情页都按同一套结构组织，方便横向比较产业层。</ReadingHint>
```

```tsx
<ReadingHint className="mt-4">这里是完整产业链目录，适合直接跳到某一层深入。</ReadingHint>
```

```tsx
<ReadingHint className="mt-4">价值流看收入和利润怎么分配，时间线看技术与资本事件。</ReadingHint>
```

For the value-flow/timeline section, place the shared hint above the two-column preview grid content, inside the same section.

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm test -- src/App.test.tsx --run
```

Expected: PASS.

### Task 4: Verify Build And Browser Behavior

**Files:**
- Verify only.

- [ ] **Step 1: Run full tests**

Run:

```bash
npm test -- --run
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 3: Browser check**

Run the Vite dev server:

```bash
npm run dev -- --host 127.0.0.1
```

Open the local URL in the in-app browser. Check:

- Desktop hero still has balanced primary and secondary actions.
- Clicking "如何阅读" opens the dialog.
- Close button, overlay click, and Escape key close the dialog.
- Mobile width does not overflow the dialog or hero actions.
- Four section hints appear in the intended sections.
