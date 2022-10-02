import { expect, test } from '@playwright/test';
import { AccountType } from '../src/AccountType';
import Credentials from '../src/Credentials';
import InventoryPage from '../src/pages/InventoryPage';
import LoginPage from '../src/pages/LoginPage';

test.describe('Login and Logout test', () => {
    test('Login with \'standard\' user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Standard));
        await expect(await page.url()).toContain(await inventoryPage.getPageUrl());
    });
});