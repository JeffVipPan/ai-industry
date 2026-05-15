import { expect, test } from '@playwright/test';

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

test('desktop home renders the clean research entry and keeps the first viewport calm', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: '看清 AI 产业链。' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'NVIDIA 的护城河主要来自哪里？' })).toBeVisible();

  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await lightRatio(page)).toBeGreaterThan(0.7);
});

test('mobile home has no accidental horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: '看清 AI 产业链。' })).toBeVisible();
  await expect(page.getByRole('link', { name: '研究文档' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  expect(await lightRatio(page)).toBeGreaterThan(0.65);
});

test('timeline stacks events vertically without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/timeline');
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

  const alignment = await page.evaluate(() => {
    const heading = document.querySelector('h1');
    const firstDate = document.querySelector('[data-testid="timeline-event"] p');
    if (!heading || !firstDate || !firstDate.firstChild) return null;

    const dateRange = document.createRange();
    dateRange.selectNodeContents(firstDate.firstChild);

    return {
      dateTextX: dateRange.getBoundingClientRect().x,
      headingX: heading.getBoundingClientRect().x,
    };
  });

  expect(alignment).not.toBeNull();
  expect(Math.abs((alignment?.dateTextX ?? 0) - (alignment?.headingX ?? 0))).toBeLessThanOrEqual(4);
});
