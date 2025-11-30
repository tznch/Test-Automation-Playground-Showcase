import { test, expect, type Page, type BrowserContext } from '@playwright/test';

test.describe('New Tab', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/new-tab/');
  });

  test('should open new tab and verify content', async({ page, context }: { page: Page, context: BrowserContext }) => {
    const newTabBtn = page.locator('button:has-text("Open"), button:has-text("New Tab"), a[target="_blank"]').first();
    await expect(newTabBtn).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      newTabBtn.click()
    ]);

    console.log('🔗 New tab opened');
    await newPage.waitForLoadState('networkidle');

    const newTitle = await newPage.title();
    const pageText = await newPage.locator('body').textContent();

    console.log(`📄 New tab title: ${newTitle}`);
    console.log(`📝 Page content preview: ${pageText?.substring(0, 100)}...`);

    expect(newTitle).toBeTruthy();
    expect(pageText).toBeTruthy();

    await newPage.screenshot({ path: 'test-results/new-tab-content.png' });
    await page.screenshot({ path: 'test-results/new-tab-main.png' });

    await newPage.close();
  });

  test('should handle multiple new tabs', async({ page, context }: { page: Page, context: BrowserContext }) => {
    const newTabBtn = page.locator('button:has-text("Open"), button:has-text("New Tab"), a[target="_blank"]').first();

    const pages = [];
    for (let i = 0; i < 2; i++) {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        newTabBtn.click()
      ]);
      pages.push(newPage);
      await newPage.waitForLoadState('networkidle');
    }

    expect(pages.length).toBe(2);

    for (const newPage of pages) {
      await newPage.close();
    }

    await page.screenshot({
      path: 'test-results/multiple-new-tabs.png',
      fullPage: true
    });
  });
});
