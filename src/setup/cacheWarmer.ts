import { chromium } from '@playwright/test';
import fs from 'fs';
import LoginPage from '../pages/LoginPage';

const dir = 'cache';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function globalSetup() {
  console.log('[Checking a cache folder...]');

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log('[Creating a cache folder...]');
    }
  } catch (err) {
    console.error(err);
  }

  console.log('[CACHE WARMER] Warming up static files cache...');
  console.time('[CACHE WARMER] Done warming up static files cache.');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordHar: {
      path: `${dir}/cache.har`,
      urlFilter: /^.*\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
    },
  });

  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const pagePath = await loginPage.getPageUrl();

  // TODO: Remove hardcoded URL
  await page.goto(pagePath, {
    waitUntil: 'networkidle',
  });
  await page.close();
  await context.close();
  await browser.close();
  console.timeEnd('[CACHE WARMER] Done warming up static files cache.');
}
