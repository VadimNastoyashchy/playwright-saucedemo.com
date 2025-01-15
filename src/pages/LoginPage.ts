import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import ICredentials from '../ICredentials';
import { step } from '../setup/step';

export default class LoginPage extends BasePage {

    public readonly inputEmailField = this.page.locator('[data-test="username"]');
    public readonly inputPasswordField = this.page.locator('[data-test="password"]');
    private readonly logInButton = this.page.locator('[data-test="login-button"]');
    private readonly errorText = this.page.locator('.error-message-container');

    constructor(page: Page) {
        super(page, 'LogIn Page');
    }

    @step()
    private async enterEmail(userName: string): Promise<void> {
        await this.inputEmailField.fill(userName);
    }

    @step()
    private async enterPassword(userPassword: string): Promise<void> {
        await this.inputPasswordField.fill(userPassword);
    }

    @step()
    private async clickOnLogInButton(): Promise<void> {
        await this.logInButton.click();
    }

    @step()
    public async logInWithCredentials(credentials: ICredentials): Promise<void> {
        const { userName, password } = credentials;
        await this.enterEmail(userName);
        await this.enterPassword(password);
        await this.clickOnLogInButton();
    }

    @step()
    public async getErrorMessage(): Promise<string> {
        return await this.errorText.innerText();
    }
}