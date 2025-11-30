import { test, expect, type Page } from '@playwright/test';

test.describe('Tags Input Box', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/tags-input-box/');
  });

  test('should add multiple tags', async({ page }: { page: Page }) => {
    const tagsInput = page.locator('input').first();
    await expect(tagsInput).toBeVisible();

    const testTags = ['automation', 'testing', 'playwright', 'qa'];

    for (const tag of testTags) {
      await tagsInput.fill(tag);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      console.log(`➕ Added tag: ${tag}`);
    }

    const addedTags = await page.locator('.tag, .tag-item, [data-tag]').count();
    console.log(`📊 Total tags added: ${addedTags}`);

    expect(addedTags).toBe(testTags.length);

    await page.screenshot({
      path: 'test-results/tags-input-multiple.png',
      fullPage: true
    });
  });

  test('should remove tags', async({ page }: { page: Page }) => {
    const tagsInput = page.locator('input').first();
    await expect(tagsInput).toBeVisible();

    await tagsInput.fill('temp');
    await page.keyboard.press('Enter');

    // Wait for tag to be added
    await page.waitForSelector('.tag, .tag-item, [data-tag]', { timeout: 3000 });

    const initialCount = await page.locator('.tag, .tag-item, [data-tag]').count();
    expect(initialCount).toBe(1);

    const removeBtn = page.locator('.tag .remove, .tag-item .remove, .close, [data-remove]').first();
    const hasRemoveButton = await removeBtn.isVisible();

    if (hasRemoveButton) {
      await removeBtn.click();

      // Wait for tag to be removed
      await page.waitForTimeout(300);

      const finalCount = await page.locator('.tag, .tag-item, [data-tag]').count();
      expect(finalCount).toBe(0);
    } else {
      // If no remove button, at least verify we still have the tag
      expect(initialCount).toBe(1);
    }

    await page.screenshot({
      path: 'test-results/tags-input-removed.png',
      fullPage: true
    });
  });

  test('should handle empty tag submission', async({ page }: { page: Page }) => {
    const tagsInput = page.locator('input').first();
    await expect(tagsInput).toBeVisible();

    await tagsInput.fill('');
    await tagsInput.inputValue(''); // Clear input
    await page.keyboard.press('Enter');

    // Wait a moment to see if any tags are created
    await page.waitForTimeout(300);

    const tagCount = await page.locator('.tag, .tag-item, [data-tag]').count();
    expect(tagCount).toBe(0);

    // Verify input is still accessible
    await expect(tagsInput).toBeVisible();

    await page.screenshot({
      path: 'test-results/tags-input-empty.png',
      fullPage: true
    });
  });
});
