import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

describe('AI Industry Intelligence Terminal routes', () => {
  it('renders the cinematic home entry without exposing company density in L1 copy', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'AI 全产业链智能研究终端' })).toBeTruthy();
    expect(screen.getByText('AI Industry Intelligence Terminal')).toBeTruthy();
  });

  it('renders a dense company detail page from configured data', () => {
    render(
      <MemoryRouter initialEntries={['/companies/nvidia']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'NVIDIA' })).toBeTruthy();
    expect(screen.getAllByText(/Illustrative demo data/i).length).toBeGreaterThan(0);
    expect(screen.getByText('CUDA 生态')).toBeTruthy();
    expect(screen.getByText('市值')).toBeTruthy();
    expect(screen.getByText('AI 收入占比')).toBeTruthy();
    expect(screen.getByText('返回关系图')).toBeTruthy();
  });
});
