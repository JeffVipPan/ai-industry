import { Quote } from 'lucide-react';
import type { FlagshipResearchNote } from '../../data/flagships';
import { Badge } from '../ui/Badge';

type CompanyResearchNoteProps = {
  note: FlagshipResearchNote;
  tagline?: string;
};

export const CompanyResearchNote = ({ note, tagline }: CompanyResearchNoteProps) => (
  <section className="company-section-panel company-research-note document-prose p-6">
    <div className="flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-300/25 bg-white/75">
        <Quote className="h-5 w-5 text-cyan-200" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <p className="company-section-eyebrow">研究备忘</p>
          <Badge>{note.asOf}</Badge>
        </div>
        {tagline ? <p className="mt-3 text-xl font-semibold leading-8 text-white">{tagline}</p> : null}
        <div className="mt-5 space-y-5 text-[15px] leading-8 text-slate-300">
          {note.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  </section>
);
