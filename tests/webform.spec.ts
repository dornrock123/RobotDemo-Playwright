import { test, expect } from '@playwright/test';
import path from 'path';

test('Web Form Automation', async ({ page }) => {

    await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

    // 1. Text input
    await page.locator('input[name="my-text"]').fill('Entro QA');
    await expect(page.locator('input[name="my-text"]')).toHaveValue('Entro QA');

    // 2. Password
    await page.locator('input[name="my-password"]').fill('P@ssw0rd!');
    await expect(page.locator('input[name="my-password"]')).toHaveValue('P@ssw0rd!');


    // 3. Textarea
    await page.locator('textarea[name="my-textarea"]').fill('This is a test textarea input.');

    // 4. Disabled input
    await expect(page.locator('input[name="my-disabled"]')).toBeDisabled();
    // 5. Readonly input
    await expect(page.locator('input[name="my-readonly"]'))
    .toHaveAttribute('readonly', '');

    // 6. Dropdown (select)
    await page.selectOption('select[name="my-select"]', {
        label: 'One'
    });

    await expect(page.locator('select[name="my-select"]'))
        .toHaveValue('1');

    // 7. Dropdown (datalist)
    await page.locator('input[name="my-datalist"]').fill('Chicago');

    await expect(page.locator('input[name="my-datalist"]'))
        .toHaveValue('Chicago');

    // 8. File upload
    const filePath = path.join(__dirname, '../test-data/sample.png');

    await page.locator('input[name="my-file"]').setInputFiles(filePath);

    // 9. Checkbox
    await expect(page.locator('#my-check-1')).not.toBeChecked();

    await expect(page.locator('#my-check-2')).toBeChecked();

    // 10. Default radio
    await expect(page.locator('#my-radio-2')).toBeChecked();

    // 11. Color picker
    await page.locator('input[name="my-colors"]').fill('#ff0000');

    await expect(page.locator('input[name="my-colors"]'))
        .toHaveValue('#ff0000');

    // 12. Date picker
    await page.locator('input[name="my-date"]').fill('2026-02-14');

    await expect(page.locator('input[name="my-date"]'))
        .toHaveValue('2026-02-14');

    // 13. Range slider
    await page.locator('input[name="my-range"]').fill('10');

    await expect(page.locator('input[name="my-range"]'))
        .toHaveValue('10');

    // 14. Capture ก่อน Submit
    await page.screenshot({
        path: 'screenshots/before-submit.png',
        fullPage: true
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    // 15. Validate Form Submitted
    await expect(page).toHaveURL(/submitted/);

    await expect(page.locator('h1')).toHaveText('Form submitted');

    await page.screenshot({
        path: 'screenshots/form-submitted.png',
        fullPage: true
    });

});