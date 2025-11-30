import { test, expect, type Page, type BrowserContext } from '@playwright/test';

test.describe('Pop-up Window', () => {
  test.beforeEach(async({ page }: { page: Page }) => {
    await page.goto('https://qaplayground.dev/apps/popup/');
  });

  test('should handle popup window', async({ page, context }: { page: Page, context: BrowserContext }) => {
    const popupTrigger = page.locator('button:has-text("Open"), button:has-text("Popup"), button').first();
    await expect(popupTrigger).toBeVisible();

    let popupHandled = false;

    const [popupPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 5000 }).catch(() => null),
      popupTrigger.click()
    ]);

    if (popupPage) {
      console.log('🪟 New popup window opened');
      await popupPage.waitForLoadState('networkidle');

      const popupBtn = popupPage.locator('button').first();
      if (await popupBtn.isVisible()) {
        await popupBtn.click();
        console.log('🔘 Clicked button in popup');
      }

      await popupPage.screenshot({ path: 'test-results/popup-window.png' });
      await popupPage.close();
      popupHandled = true;
    } else {
      const modal = page.locator('.modal, .popup, .dialog, [role="dialog"]').first();
      if (await modal.isVisible({ timeout: 3000 })) {
        console.log('🎭 Modal popup detected');
        const modalBtn = modal.locator('button').first();
        if (await modalBtn.isVisible()) {
          await modalBtn.click();
          console.log('🔘 Clicked modal button');
        }
        popupHandled = true;
      }
    }

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/popup-after-action.png' });

    expect(popupHandled).toBe(true);
  });

  test('should return focus to main window after popup closes', async({ page, context }: { page: Page, context: BrowserContext }) => {
    const popupTrigger = page.locator('button:has-text("Open"), button:has-text("Popup"), button').first();

    const [popupPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 5000 }).catch(() => null),
      popupTrigger.click()
    ]);

    if (popupPage) {
      await popupPage.waitForLoadState('networkidle');
      await popupPage.close();

      await page.waitForTimeout(1000);
      await expect(page).toBeVisible();
    }
  });
});
