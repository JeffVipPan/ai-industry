import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppRoutes } from './App';
import { AppShell } from './components/AppShell';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('AI 产业研究路由', () => {
  it('places the research console tab immediately after overview in the main navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </MemoryRouter>,
    );

    const navigation = within(screen.getByRole('banner')).getByRole('navigation');
    const navLabels = within(navigation)
      .getAllByRole('link')
      .map((link) => link.textContent?.trim());

    expect(navLabels.slice(0, 5)).toEqual(['概览', '控制台', '图谱', '价值流', '时间线']);
  });

  it('renders the AI investment research console as its own route', () => {
    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'AI 产业链投研控制台' })).toBeTruthy();
    expect(screen.getByText('宏观关系总图')).toBeTruthy();
    expect(screen.getByRole('button', { name: /能力供给主链/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /硬件制造主链/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /收入与资本回流/ })).toBeTruthy();
  });

  it('keeps floating reading shortcuts off the console workspace', () => {
    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </MemoryRouter>,
    );

    expect(screen.queryByText('探索深度')).toBeNull();
    expect(screen.queryByRole('button', { name: '打开图谱' })).toBeNull();
  });

  it('keeps the console canvas compact and exposes explicit drilldown actions', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('console-node-canvas').className).toContain('self-start');

    await user.click(screen.getByRole('button', { name: '下钻半导体设备' }));

    expect(screen.getByRole('complementary', { name: '节点洞察' }).textContent).toContain('半导体设备');
  });

  it('renders migrated source-terminal drilldown data in the console lower-left panel', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '下钻半导体材料' }));

    const lowerPanel = screen.getByTestId('console-lower-left-insight');
    expect(lowerPanel.textContent).toContain('半导体材料');
    expect(lowerPanel.textContent).toContain('材料纯度与稳定性直接影响先进制程、HBM 和先进封装良率。');
    expect(lowerPanel.textContent).toContain('国产材料导入加速');
    expect(lowerPanel.textContent).toContain('先进封装材料需求提升');
    expect(lowerPanel.textContent).toContain('材料与设备协同验证');
    expect(lowerPanel.textContent).toContain('高端光刻胶');
    expect(lowerPanel.textContent).toContain('大尺寸硅片');
    expect(lowerPanel.textContent).toContain('认证周期');
    expect(lowerPanel.textContent).toContain('长');
  });

  it('does not show assistant follow-up prompts in the console lower-left panel', () => {
    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const lowerPanel = screen.getByTestId('console-lower-left-insight');
    expect(lowerPanel.textContent).toContain('芯片设计');
    expect(lowerPanel.textContent).not.toContain('投研助手');
    expect(lowerPanel.textContent).not.toContain('可继续追问芯片设计环节的产能、公司、替代和风险细节。');
  });

  it('explains professional terms for selected console nodes', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/console']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '下钻EDA / IP' }));

    let lowerPanel = screen.getByTestId('console-lower-left-insight');
    expect(lowerPanel.textContent).toContain('术语解释');
    expect(lowerPanel.textContent).toContain('EDA');
    expect(lowerPanel.textContent).toContain('电子设计自动化');
    expect(lowerPanel.textContent).toContain('IP');
    expect(lowerPanel.textContent).toContain('可复用');

    await user.click(screen.getByRole('button', { name: '下钻晶圆制造' }));

    lowerPanel = screen.getByTestId('console-lower-left-insight');
    expect(lowerPanel.textContent).toContain('晶圆制造');
    expect(lowerPanel.textContent).toContain('把芯片设计变成真实电路');
    expect(lowerPanel.textContent).toContain('PDK');
    expect(lowerPanel.textContent).toContain('工艺设计套件');
    expect(lowerPanel.textContent).toContain('良率');
  });

  it('renders a simplified research entry with question-driven exploration', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '看清 AI 产业链。' })).toBeTruthy();
    expect(screen.getAllByText('英伟达的护城河主要来自哪里？').length).toBeGreaterThan(0);
    expect(screen.queryByText('AI 产业研究')).toBeNull();
    expect(screen.queryByText('研究文档')).toBeNull();
    expect(screen.queryByText('展开路径')).toBeNull();
    expect(screen.queryByText('研究文档结构')).toBeNull();
    expect(screen.queryByText('L2 产业层')).toBeNull();
    expect(screen.getAllByText('算力仍是最集中的利润池')).toHaveLength(1);

    expect(screen.getByRole('heading', { name: '完整 12 层产业链图谱' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /打开图谱/ }).getAttribute('href')).toBe('/map');

    expect(screen.getByRole('link', { name: /开始探索/ }).getAttribute('href')).toBe('/companies/nvidia');

    await user.click(screen.getByRole('button', { name: 'AI 利润池正在流向产业链哪一段？' }));
    expect(screen.getByRole('link', { name: /开始探索/ }).getAttribute('href')).toBe('/value-flow');

    await user.click(screen.getByRole('button', { name: '中国 AI 产业链的瓶颈在哪里？' }));
    expect(screen.getByRole('link', { name: /开始探索/ }).getAttribute('href')).toBe('/map');
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
    expect(screen.getAllByTitle(/CUDA 生态把开发工具/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: '相关节点' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: '上下游关系' })).toBeNull();
    expect(screen.queryByTestId('layer-cake-graph')).toBeNull();
  });

  it('keeps the map route available from the app router', () => {
    render(
      <MemoryRouter initialEntries={['/map']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '当前层级' })).toBeTruthy();
    expect(screen.getByText('点击层级或公司，右侧面板同步切换')).toBeTruthy();
    expect(screen.queryByText('这个节点不存在于已知的产业链中')).toBeNull();
  });

  it('renders imported AI business fields in Chinese', () => {
    render(
      <MemoryRouter initialEntries={['/companies/midjourney']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText('研究备忘')).toBeTruthy();
    expect(screen.getByText('约束栈')).toBeTruthy();
    expect(screen.getByText('运营视角')).toBeTruthy();
    expect(screen.getAllByText('中国对标').length).toBeGreaterThan(0);
    expect(screen.getByText('图像生成')).toBeTruthy();
    expect(screen.getByText('创意 AI')).toBeTruthy();
    expect(screen.getAllByText('审美质量').length).toBeGreaterThan(0);
    expect(screen.getAllByText('创作者社区').length).toBeGreaterThan(0);
    expect(screen.getAllByText('品牌认知').length).toBeGreaterThan(0);
    expect(screen.getAllByText('竞争加剧').length).toBeGreaterThan(0);
    expect(screen.getAllByText('版权风险').length).toBeGreaterThan(0);
    expect(screen.getAllByText('模型成本').length).toBeGreaterThan(0);
    const businessText = document.querySelector('#business')?.textContent ?? '';
    expect(businessText).toContain('输出风格和画面质感形成创作者偏好，是 Midjourney 最直接的留存来源。');
    expect(businessText).toContain('社区作品、提示词和风格传播降低学习成本，也持续带来新用户。');
    expect(businessText).toContain('品牌代表高质量生成式图像心智，帮助它在同类工具中保持溢价。');
    expect(businessText).toContain('Adobe、Google、OpenAI 等平台把图像生成嵌入既有工作流，分流创作者时间。');
    expect(businessText).toContain('训练数据、角色生成和商业授权争议会影响企业采用与品牌合作。');
    expect(businessText).toContain('图像与视频模型迭代需要持续推理和训练投入，订阅收入会被算力成本挤压。');
    expect(businessText.match(/审美质量/g)?.length).toBe(1);
    expect(businessText.match(/竞争加剧/g)?.length).toBe(1);
    expect(screen.queryByText('Operating View')).toBeNull();
    expect(screen.queryByText('Research Memo')).toBeNull();
    expect(screen.queryByText('Constraint Stack')).toBeNull();
    expect(screen.queryByText('China Benchmark')).toBeNull();
    expect(screen.queryByText('image generation')).toBeNull();
    expect(screen.queryByText('aesthetic quality')).toBeNull();
    expect(screen.queryByText('model cost')).toBeNull();
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

  it('renders source labels for non-flagship company metrics', () => {
    render(
      <MemoryRouter initialEntries={['/companies/sumco']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getAllByText('公开资料与公司披露整理（静态研究快照）').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FY2024/).length).toBeGreaterThan(0);
  });

  it('renders Constellation Energy as a flagship energy company', () => {
    render(
      <MemoryRouter initialEntries={['/companies/constellation']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '星座能源' })).toBeTruthy();
    expect(screen.getByText('旗舰公司 · L3 详情')).toBeTruthy();
    expect(screen.getByText('Constellation 位于能源层，核心资产是核电和低碳可调度电力。')).toBeTruthy();
    expect(screen.getByRole('link', { name: '能源' })).toBeTruthy();
    expect(screen.queryByText('为什么属于能源')).toBeNull();
    expect(screen.queryByText('为什么属于本产业层')).toBeNull();
  });

  it('describes layer technologies without placeholder copy', () => {
    render(
      <MemoryRouter initialEntries={['/layers/chip-design']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '芯片设计' })).toBeTruthy();
    expect(screen.getByText(/通过大规模并行计算/)).toBeTruthy();
    expect(
      screen.queryByText((content) => content.includes('该能力节点用于') && content.includes('本层技术组成')),
    ).toBeNull();
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

    await user.click(screen.getByRole('button', { name: '阅读说明' }));

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
    expect(screen.getByText('价值流看收入和利润怎么分配，时间线看技术与资本事件。')).toBeTruthy();
    expect(screen.queryByText('每个详情页都按同一套结构组织，方便横向比较产业层。')).toBeNull();
    expect(screen.queryByText('按“物理供给 → 芯片供应链 → 算力交付 → 智能变现”读这组卡片，能看清 AI 扩张的成本、瓶颈和价值分配。')).toBeNull();
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
