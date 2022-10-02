import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class InventoryPage extends BasePage {

    constructor(page: Page) {
        super(page, 'Inventory Page', 'inventory.html');
    }
}