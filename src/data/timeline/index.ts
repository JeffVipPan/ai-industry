import { timelineEvents } from './events';

export { timelineEvents } from './events';

export const getSortedTimelineEvents = () =>
  [...timelineEvents].sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0) || b.importance - a.importance);
