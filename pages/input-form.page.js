const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class InputFormPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = page.locator('#seleniumform');
    this.name = this.form.locator('#name');
    this.email = this.form.locator('#inputEmail4');
    this.password = this.form.locator('#inputPassword4');
    this.company = this.form.locator('#company');
    this.website = this.form.locator('#websitename');
    this.country = this.form.locator('select[name="country"]');
    this.city = this.form.locator('#inputCity');
    this.address = this.form.locator('#inputAddress1');
    this.address2 = this.form.locator('#inputAddress2');
    this.state = this.form.locator('#inputState');
    this.zip = this.form.locator('#inputZip');
    this.submitButton = this.form.getByRole('button', { name: /^submit$/i });
    this.successMessage = page.locator('.loginform .success-msg');
  }

  async open() {
    await super.open('input-form-demo/');
    await expect(this.form).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async submitEmptyForm() {
    await this.submitButton.click();
    const validation = await this.name.evaluate(element => ({
      valid: element.checkValidity(),
      message: element.validationMessage
    }));

    expect(validation.valid).toBe(false);
    return validation.message;
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
    await expect.poll(() => this.form.evaluate(form => form.checkValidity())).toBe(true);
    await this.submitButton.click();
  }

  async expectSuccessfulSubmission() {
    await expect(this.successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.', {
      timeout: 15000
    });
    await expect(this.form).toBeHidden();
  }
}
module.exports = { InputFormPage };
