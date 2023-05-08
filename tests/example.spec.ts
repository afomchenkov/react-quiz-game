import { test, expect } from '@playwright/test';

test('should render main page with question card', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/Quiz Game/);

  await page.locator('data-test-id=qz-nav-bar').waitFor();
  await page.locator('data-test-id=qz-theme-toggler').waitFor();
  await page.locator('data-test-id=qz-quiz-card').waitFor();
  await page.locator('data-test-id=qz-form').waitFor();

  await page.locator('data-test-id=qz-score-bar').waitFor();
});