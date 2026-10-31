const { test } = require('@playwright/test');
const { SlidersPage } = require('../pages/sliders.page');

test.describe('Drag and Drop Range Slider', () => {
  test('should change the slider value from 15 to 95', async ({ page }) => {
    const sliders = new SlidersPage(page);

    await sliders.open();
    await sliders.setValue(95);
    await sliders.expectValue(95);
  });
});
