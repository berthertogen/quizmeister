import { Page } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class Login extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4201/login');
    await this.page.waitForSelector('[data-placeholder="email"]');
  }

  async login(subscriberEmail: string, subscriberTeam: string): Promise<void> {
    await this.page.fill('[data-placeholder="email"]', subscriberEmail);
    await this.page.fill('[data-placeholder="team"]', subscriberTeam);
    await this.page.click(`text=Doorgaan`);
  }
}
