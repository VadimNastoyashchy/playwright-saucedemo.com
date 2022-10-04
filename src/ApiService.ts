import { Page } from '@playwright/test';
import ICredentials from './ICredentials';

export default class ApiService {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async logIn(credentials: ICredentials): Promise<void> {
        const { userName } = credentials;
        const cookiesData = {
            name: 'session-username',
            value: userName,
            domain: 'www.saucedemo.com',
            path: '/',
        };
        await this.page.context().addCookies([cookiesData]);
    }
}