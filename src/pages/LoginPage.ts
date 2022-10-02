import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import ICredentials from '../ICredentials';

export default class LoginPage extends BasePage {

    private readonly inputEmailField = this.page.locator('[data-test="username"]');
    private readonly inputPasswordField = this.page.locator('[data-test="password"]');
    private readonly logInButton = this.page.locator('[data-test="login-button"]');

    constructor(page: Page) {
        super(page, 'LogIn Page');
    }

    private async enterEmail(userName: string): Promise<void> {
        await this.inputEmailField.fill(userName);
    }

    private async enterPassword(userPassword: string): Promise<void> {
        await this.inputPasswordField.fill(userPassword);
    }

    private async clickOnLogInButton(): Promise<void> {
        await this.logInButton.click();
    }

    public async logInWithCredentials(credentials: ICredentials): Promise<void> {
        const { userName, password } = credentials;
        await this.enterEmail(userName);
        await this.enterPassword(password);
        await this.clickOnLogInButton();
    }
}