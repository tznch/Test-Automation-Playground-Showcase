import { test, expect, type Page } from '@playwright/test';

test.describe('Dynamic Table', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/dynamic-table/');
  });

  test('should find Spider-Man in the dynamic table', async({ page }: { page: Page }) => {
    console.log('🔍 Looking for Spider-Man in the dynamic table...');

    let spiderManFound = false;
    let realName = '';

    for (let i = 0; i < 10; i++) {
      try {
        const spiderManCell = page.locator('text=Spider-Man').first();
        await spiderManCell.waitFor({ state: 'visible', timeout: 1000 });

        if (await spiderManCell.isVisible()) {
          console.log('✅ Found Spider-Man!');

          const row = spiderManCell.locator('xpath=ancestor::tr');
          const cells = await row.locator('td').allTextContents();

          console.log('📋 Row data found:', cells);

          if (cells.length >= 3) {
            realName = cells[2].trim(); // Real name is in the 3rd cell
            console.log(`🦸 Spider-Man's real name: ${realName}`);
          } else if (cells.length >= 2) {
            realName = cells[1].trim();
            console.log(`🦸 Spider-Man's status: ${realName}`);
          }

          spiderManFound = true;
          break;
        }
      } catch (e) {
        // Continue to next iteration if Spider-Man not found yet
        if (i === 0) {
          // Wait for page to be ready on first attempt
          await page.waitForLoadState('networkidle');
        }
      }
    }

    expect(spiderManFound).toBe(true);
    console.log(`🎯 Test result: Found Spider-Man=${spiderManFound}, Real name="${realName}"`);
    if (realName) {
      expect(realName.length).toBeGreaterThan(0);
    }
  });

  test('should wait for table to load before searching', async({ page }: { page: Page }) => {
    await page.waitForSelector('table', { timeout: 5000 });

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const rows = await table.locator('tr').count();
    expect(rows).toBeGreaterThan(0);
  });

  test('should take screenshot when Spider-Man is found', async({ page }: { page: Page }) => {
    await page.waitForSelector('table');

    const spiderManCell = page.locator('text=Spider-Man').first();
    await expect(spiderManCell).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: 'test-results/dynamic-table-spiderman.png',
      fullPage: true
    });
  });
});
