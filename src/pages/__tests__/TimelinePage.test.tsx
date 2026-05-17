import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { ImportanceIndicator } from '../../components/timeline/ImportanceIndicator';
import { TimelinePage } from '../TimelinePage';

afterEach(() => {
  cleanup();
});

const renderTimeline = () =>
  render(
    <MemoryRouter initialEntries={['/timeline']}>
      <TimelinePage />
    </MemoryRouter>,
  );

describe('TimelinePage trust cards', () => {
  it('renders timeline events as trust cards with interpretation and internal links', () => {
    renderTimeline();

    const cards = screen.getAllByTestId('timeline-event');
    const firstCard = within(cards[0]);

    expect(cards.length).toBeGreaterThan(0);
    expect(firstCard.getByText('1 个来源')).toBeTruthy();
    expect(
      firstCard.getByText('让 GPU 训练深度网络成为视觉路线的默认选择，奠定后续算力竞赛的基础。'),
    ).toBeTruthy();
    expect(firstCard.getByRole('link', { name: /英伟达/ }).getAttribute('href')).toBe('/companies/nvidia');
    expect(firstCard.getByRole('link', { name: /芯片设计/ }).getAttribute('href')).toBe('/layers/chip-design');
  });

  it('shows an empty state when filters have no matching events', async () => {
    const user = userEvent.setup();

    renderTimeline();

    await user.click(screen.getByRole('button', { name: '硬件' }));
    await user.click(screen.getByRole('button', { name: '欧洲' }));

    expect(screen.getByText('当前过滤组合没有事件，试着放宽主题或地区。')).toBeTruthy();
  });
});

describe('ImportanceIndicator', () => {
  it('renders five filled stars for maximum importance', () => {
    render(<ImportanceIndicator importance={5} />);

    expect(screen.getByLabelText('重要性：5 / 5').textContent).toBe('★★★★★');
  });

  it('renders filled and empty stars for lower importance', () => {
    render(<ImportanceIndicator importance={2} />);

    expect(screen.getByLabelText('重要性：2 / 5').textContent).toBe('★★☆☆☆');
  });
});
