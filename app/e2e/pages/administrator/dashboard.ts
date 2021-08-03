import { Page } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class Dashboard extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4200/dashboard');
    await this.page.waitForSelector('data-test-id=component-dashboard');
  }

  async reload(): Promise<void> {
    await this.page.reload();
    await this.page.waitForSelector('data-test-id=component-dashboard');
  }

  async assertNavigation(): Promise<void> {
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/dashboard\/list/);
    await expect(this.page).toHaveText('data-test-id=component-breadcrumb', 'Dashboard');
  }

  async findQuiz(quiz: string): Promise<void> {
    await Promise.all([
      this.page.fill('[data-placeholder="Zoeken een quiz"]', quiz),
      this.page.waitForResponse(`${this.apiUrl}/quiz/search/0/20/${encodeURI(quiz)}`),
    ]);
    await this.page.click(`text=${quiz}`);
    await expect(this.page).toHaveText('app-quiz-stepper > h1', quiz);
    await expect(this.page).toHaveText('app-quiz-stepper', 'Rondes: Mijn ouders, Mijn zussen');
  }

  async openQuiz() {
    await this.page.click(`text=Open deze quiz voor inschrijvingen`);
  }

  async findSubscription(subscriberEmail: string, subscriberTeam: string) {
    await expect(this.page).toHaveText('app-step-open', subscriberEmail);
    await expect(this.page).toHaveText('app-step-open', subscriberTeam);
  }

  async sluitQuiz() {
    await this.page.click(`text=Sluit de inschrijvingen af`);
  }

  async aanmeldingQuiz() {
    await this.page.click(`text=Open voor aanmelding`);
  }

  async findSubscriptionNogNietAangemeld(subscriberEmail: string, subscriberTeam: string) {
    await expect(this.page).toHaveText('[aria-label="Nog niet aangemelde teams"]', subscriberEmail);
    await expect(this.page).toHaveText('[aria-label="Nog niet aangemelde teams"]', subscriberTeam);
  }
}
