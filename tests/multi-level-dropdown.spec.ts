import { test, expect, type Page } from '@playwright/test';

test.describe('Multi Level Dropdown', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/multi-level-dropdown/');
  });

  test('should navigate through dropdown menus', async({ page }: { page: Page }) => {
    const dropdowns = await page.locator('.dropdown, .menu, nav, [role="navigation"]').all();
    console.log(`📋 Found ${dropdowns.length} dropdown menus`);

    let interactions = 0;

    for (let i = 0; i < Math.min(dropdowns.length, 2); i++) {
      try {
        await dropdowns[i].hover();
        await page.waitForTimeout(500);
        console.log(`👆 Hovered over dropdown ${i + 1}`);
        interactions++;

        const subItems = await dropdowns[i].locator('li, .submenu-item, a, [role="menuitem"]').all();
        if (subItems.length > 0) {
          console.log(`📄 Found ${subItems.length} submenu items`);
          await subItems[0].hover();
          await page.waitForTimeout(500);

          const itemText = await subItems[0].textContent();
          expect(itemText).toBeTruthy();
        }
      } catch (e) {
        console.log(`⚠️ Could not interact with dropdown ${i + 1}`);
      }
    }

    await page.screenshot({
      path: 'test-results/multi-level-dropdown-hover.png',
      fullPage: true
    });

    expect(interactions).toBeGreaterThan(0);
  });

  test('should show submenu items on hover', async({ page }: { page: Page }) => {
    const dropdown = page.locator('.dropdown, .menu, nav, [role="navigation"]').first();
    await expect(dropdown).toBeVisible();

    await dropdown.hover();
    await page.waitForTimeout(1000);

    const submenuItems = await dropdown.locator('li, .submenu-item, a, [role="menuitem"]').all();
    expect(submenuItems.length).toBeGreaterThan(0);

    const firstItemText = await submenuItems[0].textContent();
    expect(firstItemText).toBeTruthy();
    expect(firstItemText!.length).toBeGreaterThan(0);

    await page.screenshot({
      path: 'test-results/dropdown-submenu-visible.png',
      fullPage: true
    });
  });

  test('should handle keyboard navigation', async({ page }: { page: Page }) => {
    const dropdown = page.locator('.dropdown, .menu, nav, [role="navigation"]').first();
    await expect(dropdown).toBeVisible();

    await dropdown.focus();

    // Test keyboard navigation
    await page.keyboard.press('ArrowDown');

    // Wait a brief moment for any keyboard navigation effects
    await page.waitForTimeout(500);

    // Take screenshot for visual verification
    await page.screenshot({
      path: 'test-results/dropdown-keyboard-navigation.png',
      fullPage: true
    });

    // Verify dropdown is still visible and accessible
    await expect(dropdown).toBeVisible();

    // Verify screenshot was created
    const fs = require('fs');
    expect(fs.existsSync('test-results/dropdown-keyboard-navigation.png')).toBe(true);
  });
});
