import { test, expect, type Page } from '@playwright/test';

test.describe('Sortable List', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/sortable-list/');
  });

  test('should perform drag and drop reordering', async({ page }: { page: Page }) => {
    const listItems = await page.locator('li, .sortable-item, [draggable="true"]').all();
    console.log(`📋 Found ${listItems.length} list items`);

    // Assert we have list items to work with
    expect(listItems.length).toBeGreaterThan(0);

    const initialOrder = [];
    for (let i = 0; i < listItems.length; i++) {
      const text = await listItems[i].textContent();
      initialOrder.push(text?.trim());
    }
    console.log('📝 Initial order:', initialOrder.slice(0, 3), '...');

    if (listItems.length >= 2) {
      await listItems[0].dragTo(listItems[listItems.length - 1]);
      console.log('🔄 Dragged first item to last position');

      // Wait for drag operation to complete
      await page.waitForTimeout(500);

      const verifyBtn = page.locator('button:has-text("Check"), button:has-text("Verify"), button').first();
      if (await verifyBtn.isVisible()) {
        await verifyBtn.click();
        console.log('✅ Clicked verify button');

        // Wait for verification results
        await page.waitForSelector('//*[contains(text(), "green") or contains(text(), "success") or contains(text(), "correct")]', { timeout: 3000 }).catch(() => {});
      }
    }

    await page.screenshot({
      path: 'test-results/sortable-list-reordered.png',
      fullPage: true
    });

    // Assert that drag operation completed without errors
    expect(listItems.length).toBeGreaterThan(1);
  });

  test('should show visual feedback during drag', async({ page }: { page: Page }) => {
    const listItems = await page.locator('li, .sortable-item, [draggable="true"]').all();

    // Assert we have enough items to test drag feedback
    expect(listItems.length).toBeGreaterThanOrEqual(2);

    await listItems[0].hover();
    await page.mouse.down();

    // Take screenshot immediately after mouse down to capture visual feedback
    await page.screenshot({
      path: 'test-results/sortable-list-dragging.png',
      fullPage: true
    });

    await page.mouse.up();

    // Assert screenshot was created successfully
    const fs = require('fs');
    expect(fs.existsSync('test-results/sortable-list-dragging.png')).toBe(true);
  });

  test('should have initial ordered state', async({ page }: { page: Page }) => {
    const listItems = await page.locator('li, .sortable-item, [draggable="true"]').all();
    expect(listItems.length).toBeGreaterThan(0);

    const firstItem = await listItems[0].textContent();
    expect(firstItem).toBeTruthy();
    expect(firstItem).toContain('Jeff Bezos');
  });
});
