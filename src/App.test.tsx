import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

afterEach(() => {
  cleanup();
});

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
});
