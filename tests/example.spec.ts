import { test, expect, Page } from '@playwright/test';
import { generateRandomQuestions, questions } from './mock-api-response';
import { QUESTIONS_URL } from '../src/constants';

const beforeEach = async (page: Page): Promise<void> => {
  await page.route(QUESTIONS_URL, async route => {
    const response = await generateRandomQuestions();
    await route.fulfill({ json: { ...response } });
  });

  await page.goto('http://localhost:3000/');
}

test.describe('Should test the quiz app', () => {
  let answeredQuestions: string[] = [];

  test.beforeEach(async ({ page }) => {
    answeredQuestions = [];
  })

  test('should render main page with question card and default score/chances values', async ({ page }) => {
    await beforeEach(page);

    await expect(page).toHaveTitle(/Quiz Game/);

    await page.locator('data-test-id=qz-nav-bar').waitFor();
    await page.locator('data-test-id=qz-theme-toggler').waitFor();
    await page.locator('data-test-id=qz-quiz-card').waitFor();
    await page.locator('data-test-id=qz-form').waitFor();

    await page.locator('data-test-id=qz-score-bar').waitFor();
    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 3').waitFor();
  });

  test('should toggle the theme from dark to light and back', async ({ page }) => {
    await beforeEach(page);

    await page.locator('data-test-id=qz-nav-bar').waitFor();
    const themeToggler = page.locator('data-test-id=qz-theme-toggler');
    await expect(themeToggler).toContainText('Dark');
    await themeToggler.click();
    await expect(themeToggler).toContainText('Light');
    await themeToggler.click();
    await expect(themeToggler).toContainText('Dark');
  });

  test('should navigate to result page if three bad answers were provided', async ({ page }) => {
    await beforeEach(page);

    await page.locator('data-test-id=qz-nav-bar').waitFor();

    const submitButton = page.locator('text=Submit');
    const formInput = page.locator('data-test-id=qz-form-input');

    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 3').waitFor();

    await formInput.fill('test-answer');
    await submitButton.click();
    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 2').waitFor();

    await formInput.fill('test-answer');
    await submitButton.click();
    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 1').waitFor();

    await formInput.fill('test-answer');
    await submitButton.click();
    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 0').waitFor();

    await page.locator('text=Your final result:').waitFor();
    await page.locator('text=Gathered points: 0').waitFor();
  });

  test('should submit valid answers and no duplicates should be encountered', async ({ page }) => {
    await beforeEach(page);

    await page.locator('data-test-id=qz-nav-bar').waitFor();
    const submitButton = page.locator('text=Submit');
    const formInput = page.locator('data-test-id=qz-form-input');

    await page.locator('text=Score: 0').waitFor();
    await page.locator('text=Chances: 3').waitFor();

    const submitAnswer = async () => {
      const questionElement = page.locator('data-test-id=qz-quiz-question');
      const question = await questionElement.textContent();

      const { answerPlainText, question: mock } = questions.find(q => q.question === question)!;

      // answerSha1 - not reliable, there could be same answers/sha1 for different questions but it's not a duplicate
      if (answeredQuestions.includes(mock)) {
        throw new Error('Duplicate question found');
      }

      answeredQuestions.push(mock);
      await formInput.fill(answerPlainText);
      await submitButton.click();
    }

    for (let i = 0; i < 100; ++i) {
      await submitAnswer();
    }

    await page.locator('text=Score: 100').waitFor();
    await page.locator('text=Chances: 3').waitFor();
  });
});

