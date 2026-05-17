import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCurrency = (value: number | 'N/A' | 'Not disclosed' | undefined, currency = 'USD') => {
  if (value === undefined || value === 'N/A') return '暂无';
  if (value === 'Not disclosed') return '未披露';
  const unit = currency === 'CNY' ? '¥' : currency === 'EUR' ? '€' : '$';
  if (Math.abs(value) >= 1_000_000_000_000) return `${unit}${(value / 1_000_000_000_000).toFixed(1)}T`;
  if (Math.abs(value) >= 1_000_000_000) return `${unit}${(value / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(value) >= 1_000_000) return `${unit}${(value / 1_000_000).toFixed(1)}M`;
  return `${unit}${value.toLocaleString()}`;
};

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const demoLabel = '数据为 2026-01 公开财报快照，非实时行情，仅供学习参考。';
