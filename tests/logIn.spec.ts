import { expect, test } from '@playwright/test';
import { AccountType } from '../src/AccountType';
import ApiService from '../src/ApiService';
import Credentials from '../src/Credentials';
import InventoryPage from '../src/pages/InventoryPage';
import LoginPage from '../src/pages/LoginPage';

test.describe('Login and Logout test', () => {
    test('Login with \'standard\' user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Standard));
        await expect(await page.url()).toContain(await inventoryPage.getPageUrl());
    });

    test('Login with \'problem\' user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Problem));
        await expect(await page.url()).toContain(await inventoryPage.getPageUrl());
    });

    test('Login with \'locked\' user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.LocKed));
        await expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Login with \'standard\' user and log out of the account to check that the fields are empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Standard));
        await inventoryPage.header.clickOnSlideMenu();
        await inventoryPage.header.clickOnLogOutInSlideMenu();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await expect(await loginPage.inputEmailField).toHaveValue('');
        await expect(await loginPage.inputPasswordField).toHaveValue('');
    });

    test('Login with \'standard\' user with set cookies', async ({ page }) => {
        const apiService = new ApiService(page);
        const inventoryPage = new InventoryPage(page);

        await apiService.logIn(Credentials.getUserCredentials(AccountType.Standard));
        await inventoryPage.open();
        await expect(await page.url()).toContain(await inventoryPage.getPageUrl());
    });
});