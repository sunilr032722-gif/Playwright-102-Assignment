const { test, expect } = require('@playwright/test');

test.describe('Playwright 102 - Selenium Playground', () => {
  test('Scenario 1: Simple Form Demo displays the entered message', async ({ page }) => {
    await page.goto('/simple-form-demo');

    const message = 'Playwright 102 assignment';
    const messageInput = page.locator('#user-message');

    await expect(messageInput).toBeVisible();
    await messageInput.fill(message);
    await page.getByRole('button', { name: /get checked value/i }).click();

    await expect(page.locator('#message')).toHaveText(message);
  });

  test('Scenario 2: Drag and Drop Slider reaches 95', async ({ page }) => {
    await page.goto('/drag-drop-range-sliders');

    const sliderLabel = page.getByText(/default value\s*15/i).first();
    await expect(sliderLabel).toBeVisible();

    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    await slider.evaluate((element) => {
      element.value = '95';
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await expect(slider).toHaveValue('95');
    await expect(page.getByText('95', { exact: true }).last()).toBeVisible();
  });

  test('Scenario 3: Input Form Submit validates required fields and submits valid data', async ({ page }) => {
    await page.goto('/input-form-submit');

    const name = page.locator('input[name="name"]');
    const email = page.locator('input[name="email"]');
    const password = page.locator('input[name="password"]');
    const company = page.locator('input[name="company"]');
    const website = page.locator('input[name="website"]');
    const country = page.locator('select[name="country"]');
    const city = page.locator('input[name="city"]');
    const address = page.locator('input[name="address"]');
    const address2 = page.locator('input[name="address2"]');
    const state = page.locator('input[name="state"]');
    const zip = page.locator('input[name="zip"]');

    await page.getByRole('button', { name: /^submit$/i }).click();
    await expect(name).toBeFocused();
    const isNameRequired = await name.evaluate((element) => element.required);
    expect(isNameRequired).toBeTruthy();

    await name.fill('Playwright Learner');
    await email.fill('playwright.learner@example.com');
    await password.fill('Playwright@123');
    await company.fill('Example QA');
    await website.fill('https://example.com');
    await country.selectOption({ label: 'United States' });
    await city.fill('Austin');
    await address.fill('100 Test Street');
    await address2.fill('Suite 200');
    await state.fill('Texas');
    await zip.fill('78701');

    await page.getByRole('button', { name: /^submit$/i }).click();

    await expect(page.getByText(/thank you for contacting us/i)).toBeVisible();
  });
});
