const { test } = require('@playwright/test');
const { SimpleFormPage } = require('../pages/simple-form.page');

test.describe('Simple Form Demo', () => {
  test('should display the message entered by the user', async ({ page }) => {
    const simpleForm = new SimpleFormPage(page);
    const message = 'Playwright 102 assignment';

    await simpleForm.open();
    await simpleForm.submitMessage(message);
    await simpleForm.expectMessage(message);
  });
});
