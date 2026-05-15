import { apiAdapter } from './apiAdapter';
import { mockAdapter } from './mockAdapter';

export const dataAdapter = import.meta.env.VITE_USE_REAL_API === 'true' ? apiAdapter : mockAdapter;
