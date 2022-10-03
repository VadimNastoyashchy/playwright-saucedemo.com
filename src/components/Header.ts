import { Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Header extends BaseComponent {

    private readonly headerContainerLocator = '#header_container';
    private readonly burgerButton = this.page.locator(`${this.headerContainerLocator} [class="bm-burger-button"]`);
    private readonly burgerMenuItemList = this.page.locator(`${this.headerContainerLocator} [class="bm-item menu-item"]`);

    constructor(page: Page) {
        super(page);
    }

    public async clickOnSlideMenu(): Promise<void> {
        await this.burgerButton.click();
    }

    public async clickOnLogOutInSlideMenu(): Promise<void> {
        await this.burgerMenuItemList.filter({ hasText: 'Logout' }).click();
    }
}