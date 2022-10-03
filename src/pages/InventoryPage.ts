import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import Header from '../components/Header';

export default class InventoryPage extends BasePage {
    public header: Header = new Header(this.page);

    constructor(page: Page) {
        super(page, 'Inventory Page', 'inventory.html');
    }
}