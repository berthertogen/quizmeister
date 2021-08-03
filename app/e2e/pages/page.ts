import { Page } from 'playwright-core/types/types';

export class PageBase {
  page: Page;
  apiUrl = 'http://localhost:5003';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateThroughMenu(option: string): Promise<void> {
    await this.page.click('data-test-id=button-show-menu');
    await this.page.click(`data-test-id=link-menu-item-${option}`);
    await this.page.waitForSelector(`data-test-id=component-${option}`);
  }
}
