const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class SimpleFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.messageInput = page.locator('#user-message');
    this.submitButton = page.getByRole('button', { name: /get checked value/i });
    this.output = page.locator('#message');
  }

  async open() {
    await super.open('/simple-form-demo');
    await expect(this.messageInput).toBeVisible();
  }

  async submitMessage(message) {
    await this.messageInput.fill(message);
    await this.submitButton.click();
  }

  async expectMessage(message) {
    await expect(this.output).toHaveText(message);
  }
}
module.exports = { SimpleFormPage };
