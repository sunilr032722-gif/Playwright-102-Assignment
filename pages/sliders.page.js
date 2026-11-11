const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class SlidersPage extends BasePage {
  constructor(page) {
    super(page);
    this.slider = page.locator('input[type="range"]').first();
  }

  async open() {
    await super.open('drag-drop-range-sliders-demo/');
    await expect(this.slider).toBeVisible();
  }

  async setValue(value) {
    await this.slider.evaluate((element, newValue) => {
      element.value = String(newValue);
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }

  async expectValue(value) {
    await expect(this.slider).toHaveValue(String(value));
  }
}
module.exports = { SlidersPage };
