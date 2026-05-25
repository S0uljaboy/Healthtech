import { test, expect } from '@playwright/test';

test('has title and login button', async ({ page }) => {
  await page.goto('/login');

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'Acesso à Plataforma' })).toBeVisible();

  // Click the login button.
  await page.getByRole('button', { name: 'Entrar no Sistema' }).click();

  // Expects page to have a heading with the name of dashboard
  await expect(page).toHaveURL('/');
});
