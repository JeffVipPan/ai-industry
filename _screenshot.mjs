import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
const page = await context.newPage();

await page.goto('http://localhost:5173/map', { waitUntil: 'networkidle' });
const graph = page.locator('[data-testid="relationship-network-graph"]');
await graph.waitFor();
await page.waitForTimeout(2500);
await graph.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await graph.screenshot({ path: '/tmp/map-default-hd.png' });
console.log('Default HD captured');

// Click on NVIDIA company in graph
const companyNode = page.locator('.react-flow__node').filter({ hasText: '英伟达' }).first();
if (await companyNode.count() > 0) {
  await companyNode.click();
  await page.waitForTimeout(1500);
  await graph.screenshot({ path: '/tmp/map-nvidia-clicked.png' });
  console.log('NVIDIA-clicked captured');
}

await browser.close();
