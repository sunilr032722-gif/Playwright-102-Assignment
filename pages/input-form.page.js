const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class InputFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = page.locator('form').filter({ has: page.locator('input[name="name"]') });
    this.name = this.form.locator('input[name="name"]');
    this.email = this.form.locator('input[name="email"]');
    this.password = this.form.locator('input[name="password"]');
    this.company = this.form.locator('input[name="company"]');
    this.website = this.form.locator('input[name="website"]');
    this.country = this.form.locator('select[name="country"]');
    this.city = this.form.locator('input[name="city"]');
    this.address = this.form.locator('input[name="address_line1"]');
    this.address2 = this.form.locator('input[name="address_line2"]');
    this.state = this.form.locator('#inputState');
    this.zip = this.form.locator('input[name="zip"]');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.successMessage = page.getByText(/thanks for contacting us/i);
  }

  async open() {
    await super.open('input-form-demo/');
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
