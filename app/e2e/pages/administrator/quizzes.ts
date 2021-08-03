import { Page } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class Quizzes extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4200/quizzes');
    await this.page.waitForSelector('data-test-id=component-quizzes');
  }

  async assertNavigation(): Promise<void> {
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/quizzes\/list/);
    await expect(this.page).toHaveText('data-test-id=component-breadcrumb', 'Quizzen');
  }
}
