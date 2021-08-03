import { Dashboard } from '../pages/administrator/dashboard';
import { Questions } from '../pages/administrator/questions';
import { Quizzes } from '../pages/administrator/quizzes';
import { Rounds } from '../pages/administrator/rounds';

jest.setTimeout(35 * 1000);

describe('Side navigation', () => {
  it('should display Dashboard when navigating to dashboard page', async () => {
    const dashboard = new Dashboard(page);
    await dashboard.navigate();
    await dashboard.navigateThroughMenu('dashboard');
    await dashboard.assertNavigation();
  });

  it("should display Quiz list when navigating to quizzes page'", async () => {
    const quizzes = new Quizzes(page);
    await quizzes.navigate();
    await quizzes.navigateThroughMenu('quizzes');
    await quizzes.assertNavigation();
  });

  it("should display Round list when navigating to rounds page'", async () => {
    const rounds = new Rounds(page);
    await rounds.navigate();
    await rounds.navigateThroughMenu('rounds');
    await rounds.assertNavigation();
  });

  it('should display Question list when navigating to questions page', async () => {
    const questions = new Questions(page);
    await questions.navigate();
    await questions.navigateThroughMenu('questions');
    await questions.assertNavigation();
  });
});
