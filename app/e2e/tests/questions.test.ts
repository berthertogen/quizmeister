import { Questions } from '../pages/administrator/questions';

jest.setTimeout(40 * 1000);

describe('Questions', () => {
  let question1: { shortId: string; questionId: number } | null = null;
  let question2: { shortId: string; questionId: number } | null = null;
  let question3: { shortId: string; questionId: number } | null = null;
  let question4: { shortId: string; questionId: number } | null = null;

  afterAll(async () => {
    await new Questions(page).deleteQuestions([question1, question2, question3, question4]);
  });

  it('should be able to add, update and copy questions', async () => {
    await Promise.all([runOne(new Questions(await context.newPage())), runTwo(new Questions(await context.newPage()))]);
  });

  const runOne = async (questions: Questions) => {
    await questions.navigate();
    const questionFormAdd = await questions.clickAdd();
    await questionFormAdd.fillForm({
      title: 'Test vraag 1',
      vraagType: 'open',
      remark: 'Opmerking bij test vraag 1',
      scoringType: 'correct',
      weightCorrectAnswer: 1,
      weightNoAnswer: 0,
      answers: [
        {
          text: 'Juiste antwoord op test vraag 1',
          correct: true,
        },
      ],
    });
    question1 = await questionFormAdd.clickSave();
    await questions.findQuestion(question1.shortId);
    await questions.clickMore();
    const questionFormEdit = await questions.clickEdit();
    await questionFormEdit.fillForm({
      title: 'Test vraag 1 edited',
      vraagType: 'open',
      remark: 'Opmerking bij test vraag 1 edited',
      scoringType: 'tijd',
      weightCorrectAnswer: 3,
      timeLimitSeconds: 60,
      timeScoringInterval: 10,
      answers: [
        {
          text: 'Juiste antwoord op test vraag 1 edited',
          correct: true,
        },
      ],
    });
    question1 = await questionFormEdit.clickSave(question1.questionId);
    await questions.findQuestion(question1.shortId);
    await questions.clickMore();
    question3 = await questions.clickCopy(question1.questionId);
    await questions.findQuestion(question3.shortId);
  };

  const runTwo = async (questions: Questions) => {
    await questions.navigate();
    const questionFormAdd = await questions.clickAdd();
    await questionFormAdd.fillForm({
      title: 'Test vraag 2',
      vraagType: 'meerkeuze',
      remark: 'Opmerking bij test vraag 2',
      scoringType: 'correct',
      weightCorrectAnswer: 1,
      weightNoAnswer: 0,
      answers: [
        {
          text: 'Foute antwoord op test vraag 2',
          correct: false,
        },
        {
          text: 'Juiste antwoord op test vraag 2',
          correct: true,
        },
      ],
    });
    question2 = await questionFormAdd.clickSave();
    await questions.findQuestion(question2.shortId);
    await questions.clickMore();
    const questionFormEdit = await questions.clickEdit();
    await questionFormEdit.fillForm({
      title: 'Test vraag 2 edited',
      vraagType: 'meerkeuze',
      remark: 'Opmerking bij test vraag 2 edited',
      scoringType: 'kennis',
      weightCorrectAnswer: 3,
      answers: [
        {
          text: 'Foute antwoord op test vraag 2 edited',
          correct: false,
        },
        {
          text: 'Juiste antwoord op test vraag 2 edited',
          correct: true,
        },
        {
          text: 'Foute antwoord op test vraag 2 edited',
          correct: false,
        },
      ],
    });
    question2 = await questionFormEdit.clickSave(question2.questionId);
    await questions.findQuestion(question2.shortId);
    await questions.clickMore();
    question4 = await questions.clickCopy(question2.questionId);
    await questions.findQuestion(question4.shortId);
  };
});
