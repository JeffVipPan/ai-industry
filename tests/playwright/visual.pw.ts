import { expect, test } from '@playwright/test';

const nonDarkRatio = async (page: import('@playwright/test').Page) => {
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
      let nonDark = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] + data[i + 1] + data[i + 2] > 58) nonDark += 1;
      }
      return nonDark / (data.length / 4);
    },
    `data:image/png;base64,${buffer.toString('base64')}`,
  );
};

test('desktop home renders the cinematic universe and keeps the first viewport sparse', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/');
  await page.waitForSelector('canvas');
  await expect(page.getByRole('heading', { name: 'AI 全产业链智能研究终端' })).toBeVisible();
  await page.waitForTimeout(800);

  const canvasBox = await page.locator('canvas').first().boundingBox();
  expect(canvasBox?.width).toBeGreaterThan(1000);
  expect(canvasBox?.height).toBeGreaterThan(700);
  expect(await nonDarkRatio(page)).toBeGreaterThan(0.015);
});

test('mobile home has no accidental horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('全产业链智能研究终端')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  expect(await nonDarkRatio(page)).toBeGreaterThan(0.01);
});
