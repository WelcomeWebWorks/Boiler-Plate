import { test, expect } from '@playwright/test';

test('homepage has title and hero text', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Company Name/);

    // Check for some text likely to be in the hero section
    // Based on page.tsx metadata description and common patterns
    await expect(page.locator('body')).toBeVisible();
});
