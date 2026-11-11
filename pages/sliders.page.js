const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class SlidersPage extends BasePage {
  constructor(page) {
    super(page);
    this.slider = page.locator('.sp__range-success input[type="range"]');
    this.output = page.locator('#rangeSuccess');
  }

  async open() {
    await super.open('drag-drop-range-sliders-demo/');
    await expect(this.slider).toBeVisible();
  }

  async setValue(value) {
    const min = Number(await this.slider.getAttribute('min'));
    const max = Number(await this.slider.getAttribute('max'));
    const step = Number(await this.slider.getAttribute('step')) || 1;

    if (value < min || value > max || (value - min) % step !== 0) {
      throw new RangeError(`Slider value must be between ${min} and ${max} in steps of ${step}`);
    }

    const stepsFromMin = (value - min) / step;
    const stepsFromMax = (max - value) / step;
    const useMax = stepsFromMax < stepsFromMin;
    const key = useMax ? 'ArrowLeft' : 'ArrowRight';

    await this.slider.focus();
    await this.slider.press(useMax ? 'End' : 'Home');

    for (let index = 0; index < (useMax ? stepsFromMax : stepsFromMin); index += 1) {
      await this.slider.press(key);
    }
  }

  async expectValue(value) {
    await expect(this.slider).toHaveValue(String(value));
    await expect(this.output).toHaveText(String(value));
  }
}
module.exports = { SlidersPage };
