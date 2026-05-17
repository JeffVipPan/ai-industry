import type { TimelineEvent } from '../../types/timeline';

type ImportanceIndicatorProps = {
  importance: TimelineEvent['importance'];
};

export const ImportanceIndicator = ({ importance }: ImportanceIndicatorProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => (index < importance ? '★' : '☆')).join('');

  return (
    <span
      role="img"
      aria-label={`重要性：${importance} / 5`}
      className="font-mono text-[0.76rem] font-semibold leading-none tracking-normal text-[#9a7c33]"
    >
      {stars}
    </span>
  );
};
