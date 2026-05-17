import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from './App';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('AI 产业研究路由', () => {
  it('renders a clean research entry with question-driven exploration', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '看清 AI 产业链。' })).toBeTruthy();
    expect(screen.getAllByText('英伟达的护城河主要来自哪里？').length).toBeGreaterThan(0);
    expect(screen.getByText('研究文档')).toBeTruthy();
  });

  it('renders a document-like company detail page from configured data', () => {
    render(
      <MemoryRouter initialEntries={['/companies/nvidia']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '英伟达' })).toBeTruthy();
    expect(screen.getAllByText(/营收参考公开资料/i).length).toBeGreaterThan(0);
    expect(screen.getByText('CUDA 生态')).toBeTruthy();
    expect(screen.getAllByText('核心结论').length).toBeGreaterThan(0);
    expect(screen.getByText('本页导航')).toBeTruthy();
    expect(screen.getByText('市值')).toBeTruthy();
    expect(screen.getByText('AI 收入占比')).toBeTruthy();
    expect(screen.getByText('返回关系图')).toBeTruthy();
    expect(screen.getByRole('heading', { name: '相关节点' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: '上下游关系' })).toBeNull();
    expect(screen.queryByTestId('layer-cake-graph')).toBeNull();
  });

  it('labels financial trends as public-source revenue plus estimated AI revenue', () => {
    render(
      <MemoryRouter initialEntries={['/companies/state-grid']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('财务趋势（公开资料 + AI 估算）')).toBeTruthy();
    expect(screen.getAllByText('营收参考公开资料，AI 收入为静态估算，非实时/审计口径。').length).toBeGreaterThan(0);
  });

  it('explains why Constellation Energy belongs to the energy layer', () => {
    render(
      <MemoryRouter initialEntries={['/companies/constellation']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '星座能源' })).toBeTruthy();
    expect(screen.getByText('为什么属于能源')).toBeTruthy();
    expect(screen.getByText('在能源环节承担什么角色')).toBeTruthy();
    expect(screen.getByText('行业地位')).toBeTruthy();
    expect(screen.getByText(/核心资产不是模型或芯片/)).toBeTruthy();
    expect(screen.getByText(/美国清洁电力和核电运营龙头之一/)).toBeTruthy();
  });

  it('scrolls to the top when navigating between company pages from research links', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/companies/tsmc']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    scrollTo.mockClear();
    await user.click(screen.getAllByRole('link', { name: /英伟达/ })[0]);

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
    });
    expect(screen.getByRole('heading', { name: '英伟达' })).toBeTruthy();
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
    expect(screen.getByText('按“物理供给 → 芯片供应链 → 算力交付 → 智能变现”读这组卡片，能看清 AI 扩张的成本、瓶颈和价值分配。')).toBeTruthy();
    expect(screen.getByText('价值流看收入和利润怎么分配，时间线看技术与资本事件。')).toBeTruthy();
  });

  it('explains pricing power in plain language on homepage layer cards', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getAllByText('价格话语权：中等').length).toBeGreaterThan(0);
    expect(screen.getAllByTitle('该环节对价格和利润有一定影响力，但仍受市场竞争、成本变化和客户议价影响。').length).toBeGreaterThan(0);
  });

  it('renders the migrated AI value-flow research view', () => {
    render(
      <MemoryRouter initialEntries={['/value-flow']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'AI 收入与利润流向哪里？' })).toBeTruthy();
    expect(screen.getByText('应用层收入 ≠ 应用层利润')).toBeTruthy();
    expect(screen.getByText('瓶颈环节拥有更强定价权')).toBeTruthy();
    expect(screen.getByText('中国替代路径分层推进')).toBeTruthy();
    const valueFlowButtons = screen.getAllByRole('button').map((button) => button.textContent);
    expect(valueFlowButtons).toContain('全链路价值路径');
    expect(valueFlowButtons).toContain('标准化分配');
    expect(valueFlowButtons).toContain('路径强度');
    expect(screen.queryByRole('button', { name: '路径拓扑' })).toBeNull();
    expect(screen.getByText('路径强度指数，不代表金额。')).toBeTruthy();
    expect(screen.getAllByText('标准化 100 单位模型，非真实 $B 财务数据。').length).toBeGreaterThan(0);
    expect(screen.getAllByText('全链路价值路径').length).toBeGreaterThan(0);
    expect(screen.getByText('指标口径')).toBeTruthy();
    expect(screen.getAllByText('路径强度指数').length).toBeGreaterThan(0);
    expect(screen.getByText('路径强度视图')).toBeTruthy();
    expect(screen.queryByText('多路径拓扑模型')).toBeNull();
    expect(screen.queryByText('基准值')).toBeNull();
    expect(screen.queryByText(/demo \$B/)).toBeNull();
  });
});
