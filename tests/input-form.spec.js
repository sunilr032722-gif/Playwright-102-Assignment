const { test, expect } = require('@playwright/test');
const { InputFormPage } = require('../pages/input-form.page');
const { validFormData } = require('../test-data/input-form.data');

test.describe('Input Form Submit', () => {
  test('should show required-field validation for an empty form', async ({ page }) => {
    const form = new InputFormPage(page);

    await form.open();
    const validationMessage = await form.submitEmptyForm();

    expect(validationMessage).not.toBe('');
  });

  test('should submit the form when all required details are provided', async ({ page }) => {
    const form = new InputFormPage(page);

    await form.open();
    await form.fillForm(validFormData);
    await form.submitForm();
    await form.expectSuccessfulSubmission();
  });
});
