import { Page } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class Search extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4201/search');
    await this.page.waitForSelector('[data-placeholder="Zoeken"]');
  }

  async subscribeToQuiz(quiz: string, subscriberEmail?: string, subscriberTeam?: string): Promise<void> {
    await Promise.all([]);
    await this.page.fill('[data-placeholder="Zoeken"]', quiz);
    await this.page.waitForResponse(`${this.apiUrl}/quiz/open/0/20/${encodeURI(quiz)}`);
    await this.page.click(`text=Ik schrijf ons team in!`);
    if (subscriberEmail) {
      await this.page.fill('[data-placeholder="email"]', subscriberEmail);
    }
    if (subscriberTeam) {
      await this.page.fill('[data-placeholder="team"]', subscriberTeam);
    }
    await this.page.fill('[data-placeholder="remark"]', 'e2e opmerking');
    await this.page.click(`text=Bevestigen`);
  }
}
