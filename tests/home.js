import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Water Jug Riddle');
});

test('simulation runs', async ({ page }) => {
	await page.goto('/');
	await page.fill('text=First Bucket Size:', '5');
	await page.fill('text=Second Bucket Size:', '3');
	await page.fill('text=Target Amount:', '4');
	await page.click('button#simulate');
	await page.evaluate(() => {
		return new Promise((resolve) => setTimeout(resolve, 10000));
	  });
	expect(await page.textContent('h3')).toBe('Size: 5 gal., Amount: 4');
});
