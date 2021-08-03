import { Page, Response } from 'playwright-core/types/types';
import { PageBase } from '../page';

export class QuestionForm extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  async clickSave(questionId?: number): Promise<{ shortId: string; questionId: number }> {
    const [_, response] = await Promise.all([
      this.page.click(`data-test-id=button-opslaan`),
      this.page.waitForResponse((r: Response) =>
        r.ok() && questionId ? r.url().endsWith(`/question/${questionId}`) : r.url().endsWith(`/question`),
      ),
      this.page.waitForNavigation(),
    ]);
    const question = (await response.json()) as any;
    console.log('Response:', question);
    expect(response.ok()).toBeTruthy();
    expect(this.page.url()).toMatch(/https:\/\/localhost:4200\/questions\/list/);
    return question;
  }

  async fillForm(input: {
    title: string;
    vraagType: 'open' | 'meerkeuze';
    remark: string;
    scoringType: 'correct' | 'tijd' | 'kennis';
    weightCorrectAnswer: number;
    weightNoAnswer?: number;
    timeLimitSeconds?: number;
    timeScoringInterval?: number;
    answers: {
      text: string;
      correct: boolean;
    }[];
  }): Promise<void> {
    // Question
    await this.page.fill('[formcontrolname="title"]', input.title);
    await this.page.click(`data-test-id=input-radio-vraag-type-${input.vraagType}`);
    await this.page.fill('[formcontrolname="remark"]', input.remark);

    // Scoring
    await this.page.click(`data-test-id=input-radio-scoring-type-${input.scoringType}`);
    await this.page.fill('[formcontrolname="weightCorrectAnswer"]', input.weightCorrectAnswer.toString());
    if (input.weightNoAnswer) {
      await this.page.fill('[formcontrolname="weightNoAnswer"]', input.weightNoAnswer.toString());
    }
    if (input.timeLimitSeconds) {
      await this.page.fill('[formcontrolname="timeLimitSeconds"]', input.timeLimitSeconds.toString());
    }
    if (input.timeScoringInterval) {
      await this.page.fill('[formcontrolname="timeScoringInterval"]', input.timeScoringInterval.toString());
    }

    // Delete existing answers
    const deleteButtons = await this.page.$$('data-test-id=button-delete-answer');
    for (const deleteButton of deleteButtons.filter((_, i) => i > 0)) {
      await deleteButton.click();
    }

    // Add empty answers
    for (let index = 0; index < input.answers.length - 1; index++) {
      await this.page.click(`data-test-id=button-add-answer`);
    }

    for (let index = 0; index < input.answers.length; index++) {
      const answerPanelSelector = input.answers.length > 1 ? `app-answer >> data-test-id=input-answer-${index}` : `app-answer`;
      const answer = input.answers[index];

      await this.page.fill(`${answerPanelSelector} >> [formcontrolname="text"]`, answer.text);

      // Eerste vraag is altijd correct aangevinkt, dus als we false binnen krijgen deze uit klikken.
      // Voor alle volgende vragne is correct niet aangevinkt dus als we true binnen krijgen klikken.
      if ((index === 0 && !answer.correct) || (index > 0 && answer.correct)) {
        await this.page.click(`${answerPanelSelector} >> [formcontrolname="correct"]`);
      }
    }
  }
}
