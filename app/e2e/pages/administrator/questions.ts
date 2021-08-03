import { Page, Response } from 'playwright-core/types/types';
import { PageBase } from '../page';
import { QuestionForm } from './question-form';

export class Questions extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://localhost:4200/questions');
    await this.page.waitForSelector('data-test-id=component-questions');
  }

  async assertNavigation(): Promise<void> {
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/questions\/list/);
    await expect(this.page).toHaveText('data-test-id=component-breadcrumb', 'Vragen');
  }

  async clickAdd(): Promise<QuestionForm> {
    await this.page.click(`data-test-id=button-add-question`);
    await this.page.waitForSelector(`data-test-id=component-add-question`);
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/questions\/add/);
    return new QuestionForm(this.page);
  }

  async findQuestion(shortId: string): Promise<void> {
    await Promise.all([
      this.page.fill('data-test-id=input-search', shortId),
      this.page.waitForResponse(`${this.apiUrl}/question/search/0/20/${encodeURI(shortId)}`),
    ]);
    await expect(this.page).toHaveText('.mat-table', shortId);
  }

  async clickMore() {
    await this.page.click(`data-test-id=button-more`);
  }

  async clickEdit(): Promise<QuestionForm> {
    await this.page.click(`data-test-id=button-edit`);
    return new QuestionForm(this.page);
  }

  async clickCopy(questionId: number): Promise<{ shortId: string; questionId: number }> {
    const [_, response] = await Promise.all([
      this.page.click(`data-test-id=button-copy`),
      this.page.waitForResponse((r: Response) => r.ok() && r.url().endsWith(`/question/${questionId}/copy`)),
    ]);
    return (await response.json()) as any;
  }

  async clickDelete(question: { shortId: string; questionId: number }) {
    await Promise.all([
      this.page.click(`data-test-id=button-delete`),
      this.page.waitForResponse((r: Response) => r.ok() && r.url().endsWith(`/question/${question.questionId}`)),
    ]);
    await expect(this.page).not.toHaveText('.mat-table', question.shortId);
  }

  async deleteQuestions(questions: Array<{ shortId: string; questionId: number } | null>) {
    await this.navigate();
    for (const question of questions) {
      if (question) {
        await this.findQuestion(question.shortId);
        await this.clickMore();
        await this.clickDelete(question);
      }
    }
  }
}
