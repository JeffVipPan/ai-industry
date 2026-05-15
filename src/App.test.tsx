import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

describe('AI Industry research routes', () => {
  it('renders a clean research entry with question-driven exploration', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '看清 AI 产业链。' })).toBeTruthy();
    expect(screen.getAllByText('NVIDIA 的护城河主要来自哪里？').length).toBeGreaterThan(0);
    expect(screen.getByText('研究文档')).toBeTruthy();
  });

  it('renders a document-like company detail page from configured data', () => {
    render(
      <MemoryRouter initialEntries={['/companies/nvidia']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'NVIDIA' })).toBeTruthy();
    expect(screen.getAllByText(/Illustrative demo data/i).length).toBeGreaterThan(0);
    expect(screen.getByText('CUDA 生态')).toBeTruthy();
    expect(screen.getAllByText('核心结论').length).toBeGreaterThan(0);
    expect(screen.getByText('On this page')).toBeTruthy();
    expect(screen.getByText('市值')).toBeTruthy();
    expect(screen.getByText('AI 收入占比')).toBeTruthy();
    expect(screen.getByText('返回关系图')).toBeTruthy();
  });
});
