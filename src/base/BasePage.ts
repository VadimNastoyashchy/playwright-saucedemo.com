import { Page } from '@playwright/test';

export default abstract class BasePage {
    protected readonly BASE_PAGE = 'https://www.saucedemo.com/';
    protected readonly PAGE_NAME: string;
    protected readonly PAGE_URL: string;
    protected readonly page: Page;

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor(page: Page, pageName: string, pageUrl = '') {
        this.page = page;
        this.PAGE_NAME = pageName;
        this.PAGE_URL = pageUrl;
    }

    public async goto(): Promise<void> {
        await this.page.goto(`${this.BASE_PAGE}${this.PAGE_URL}`);
    }

    public async getPageUrl(): Promise<string> {
        return `${this.BASE_PAGE}${this.PAGE_URL}`;
    }
}