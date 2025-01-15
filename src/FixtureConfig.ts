import { test as base } from '@playwright/test';
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import ApiService from './ApiService';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  apiService: ApiService;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.routeFromHAR('./../cache/cache.har', { notFound: 'fallback', update: false });
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  apiService: async ({ page }, use) => {
    const apiService = new ApiService(page);
    await use(apiService);
  },
});
export { expect } from '@playwright/test';
