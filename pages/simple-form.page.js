const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class SimpleFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.messageInput = page.getByPlaceholder('Please enter your Message');
    this.submitButton = page.getByRole('button', { name: 'Get Checked Value' });
    this.output = page.locator('p#message');
  }

  async open() {
    await super.open('simple-form-demo/');
    await expect(this.messageInput).toBeVisible();
  }

  async submitMessage(message) {
    await this.messageInput.fill(message);
    await expect(this.messageInput).toHaveValue(message);
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();

    try {
      await expect(this.output).toHaveText(message, { timeout: 3000 });
    } catch (firstAttemptError) {
      // The public demo binds its click handler client-side; retry once if hydration missed the first click.
      await this.submitButton.click();
      await expect(this.output).toHaveText(message, { timeout: 10000 });
    }
  }

  async expectMessage(message) {
    await expect(this.output).toHaveText(message, { timeout: 10000 });
  }
}
module.exports = { SimpleFormPage };
