const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class InputFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = page.locator('form').first();
    this.name = page.locator('input[name="name"]');
    this.email = page.locator('input[name="email"]');
    this.password = page.locator('input[name="password"]');
    this.company = page.locator('input[name="company"]');
    this.website = page.locator('input[name="website"]');
    this.country = page.locator('select[name="country"]');
    this.city = page.locator('input[name="city"]');
    this.address = page.locator('input[name="address"]');
    this.address2 = page.locator('input[name="address2"]');
    this.state = page.locator('input[name="state"]');
    this.zip = page.locator('input[name="zip"]');
    this.submitButton = page.getByRole('button', { name: /^submit$/i });
    this.successMessage = page.getByText(/thank you for contacting us/i);
  }

  async open() {
    await super.open('/input-form-submit');
    await expect(this.submitButton).toBeVisible();
  }

  async submitEmptyForm() {
    await this.submitButton.click();
    return this.name.evaluate(element => element.validationMessage);
  }

  async fillForm(data) {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.company.fill(data.company);
    await this.website.fill(data.website);
    await this.country.selectOption({ label: data.country });
    await this.city.fill(data.city);
    await this.address.fill(data.address);
    await this.address2.fill(data.address2);
    await this.state.fill(data.state);
    await this.zip.fill(data.zip);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectSuccessfulSubmission() {
    await expect(this.successMessage).toBeVisible();
  }
}
module.exports = { InputFormPage };
