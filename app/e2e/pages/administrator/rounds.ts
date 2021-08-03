import { Page } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class Rounds extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4200/rounds');
    await this.page.waitForSelector('data-test-id=component-rounds');
  }

  async assertNavigation(): Promise<void> {
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/rounds\/list/);
    await expect(this.page).toHaveText('data-test-id=component-breadcrumb', 'Rondes');
  }
}
