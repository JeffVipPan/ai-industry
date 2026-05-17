import { expect, test } from '@playwright/test';

const appUrl = 'http://127.0.0.1:5173';

const lightRatio = async (page: import('@playwright/test').Page) => {
  const buffer = await page.screenshot({ fullPage: false });
  return page.evaluate(
    async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return 0;
      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let light = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] + data[i + 1] + data[i + 2] > 660) light += 1;
      }
      return light / (data.length / 4);
    },
    `data:image/png;base64,${buffer.toString('base64')}`,
  );
};

const contrastRatio = (foreground: string, background: string) => {
  const parseRgb = (value: string) => {
    const [r = 0, g = 0, b = 0] = value.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
    return [r, g, b].map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
  };

  const luminance = (color: string) => {
    const [r, g, b] = parseRgb(color);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

const chooseLayerFilter = async (page: import('@playwright/test').Page, optionName: string) => {
  await page.getByRole('combobox', { name: '选择产业层' }).click();
  await page.getByRole('option', { name: optionName }).click();
};

test('desktop home renders the clean research entry and keeps the first viewport calm', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${appUrl}/`);
  await expect(page.getByRole('heading', { name: '看清 AI 产业链。' })).toBeVisible();
  await expect(page.getByRole('button', { name: '英伟达的护城河主要来自哪里？' })).toBeVisible();

  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await lightRatio(page)).toBeGreaterThan(0.7);
});

test('mobile home has no accidental horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${appUrl}/`);
  await expect(page.getByRole('heading', { name: '看清 AI 产业链。' })).toBeVisible();
  await expect(page.getByRole('link', { name: '研究文档' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  expect(await lightRatio(page)).toBeGreaterThan(0.65);
});

test('timeline stacks events vertically without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${appUrl}/timeline`);
  await expect(page.getByRole('heading', { name: 'AI 技术与资本时间线' })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);

  const cardPositions = await page.locator('[data-testid="timeline-event"]').evaluateAll((elements) =>
    elements.slice(0, 3).map((element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y };
    }),
  );

  expect(cardPositions.length).toBeGreaterThanOrEqual(3);
  expect(cardPositions[1].y).toBeGreaterThan(cardPositions[0].y + 40);
  expect(cardPositions[2].y).toBeGreaterThan(cardPositions[1].y + 40);

  const firstCard = page.locator('[data-testid="timeline-event"]').first();
  await expect(firstCard.getByText('2012', { exact: true })).toBeVisible();
  await expect(firstCard.getByText('1 个来源')).toBeVisible();
  await expect(firstCard.getByText('让 GPU 训练深度网络成为视觉路线的默认选择，奠定后续算力竞赛的基础。')).toBeVisible();
  await expect(firstCard.getByRole('link', { name: /英伟达/ })).toHaveAttribute('href', '/companies/nvidia');
});

test('map renders the migrated relationship network and keeps filters usable', async ({ page }) => {
  await page.setViewportSize({ width: 1296, height: 338 });
  await page.goto(`${appUrl}/map`);
  await expect(page.getByRole('heading', { name: '能源 -> 芯片 -> 基础设施 -> 模型 -> 应用' })).toBeVisible();
  await expect(page.locator('[data-testid="relationship-network-graph"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="layer-cake-graph"]')).toBeVisible();

  await chooseLayerFilter(page, '能源');
  await expect(page.getByRole('combobox', { name: '选择产业层' })).toContainText('能源');
  await expect(page.getByText(/能源 · \d+ 家公司/)).toBeVisible();

  const graphState = await page.evaluate(() => ({
    rowCount: document.querySelectorAll('[data-testid^="layer-cake-row-"]').length,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
  }));

  expect(graphState.rowCount).toBeGreaterThan(0);
  expect(graphState.overflow).toBeLessThanOrEqual(2);

  const layerCakeReadability = await page.evaluate(() => {
    const graph = document.querySelector('[data-testid="layer-cake-graph"]');
    if (!graph) return { checked: 0, readable: 0 };
    const targets = Array.from(graph.querySelectorAll('h2, h3, p, span')).filter((element) =>
      ['能源 -> 芯片 -> 基础设施 -> 模型 -> 应用', 'AI 应用', 'Microsoft Azure', '把模型能力转成可付费的工作流、自动化和用户体验。'].includes(
        element.textContent?.trim() ?? '',
      ),
    );
    const luminance = (element: Element) => {
      const match = window.getComputedStyle(element).color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
      const [r = 0, g = 0, b = 0] = match;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    return {
      checked: targets.length,
      readable: targets.filter((element) => luminance(element) > 120).length,
    };
  });

  expect(layerCakeReadability.checked).toBeGreaterThanOrEqual(4);
  expect(layerCakeReadability.readable).toBe(layerCakeReadability.checked);
});

test('map company detail CTA keeps readable text on its dark surface', async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 1220 });
  await page.goto(`${appUrl}/map`);
  await chooseLayerFilter(page, '基础模型');
  await page.locator('.map-page-side-panel').getByRole('button', { name: /OpenAI/ }).click();

  const detailLink = page.getByRole('link', { name: /进入公司详情/ });
  await expect(detailLink).toBeVisible();

  const colors = await detailLink.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      background: style.backgroundColor,
      foreground: style.color,
    };
  });

  expect(contrastRatio(colors.foreground, colors.background)).toBeGreaterThanOrEqual(4.5);
});
