import { Dashboard } from '../pages/administrator/dashboard';
import { Login } from '../pages/client/login';
import { Search } from '../pages/client/search';
import { Seeder } from '../pages/seeder';

jest.setTimeout(40 * 1000);

describe('Quiz run', () => {
  const seeder = new Seeder();
  const dashboard = new Dashboard(page);
  let search2: Search;
  let search1: Search;
  let login: Login;

  beforeAll(async () => {
    await seeder.seed();
    const client1Page = await context.newPage();
    const client2Page = await context.newPage();
    search2 = new Search(client2Page);
    search1 = new Search(client1Page);
    login = new Login(client1Page);
  });

  afterAll(async () => {
    await seeder.deseed();
  });

  it('quiz-run should be able to find quiz', async () => {
    await Promise.all([openQuiz(dashboard), aanmelden(login)]);

    await Promise.all([subscribeToQuiz(search1), subscribeToQuiz(search2, Seeder.subscriberEmail2, Seeder.subscriberTeam2)]);

    await dashboard.reload();

    await Promise.all([
      dashboard.findSubscription(Seeder.subscriberEmail, Seeder.subscriberTeam),
      dashboard.findSubscription(Seeder.subscriberEmail2, Seeder.subscriberTeam2),
    ]);

    await dashboard.sluitQuiz();

    await Promise.all([
      dashboard.findSubscription(Seeder.subscriberEmail, Seeder.subscriberTeam),
      dashboard.findSubscription(Seeder.subscriberEmail2, Seeder.subscriberTeam2),
    ]);

    await dashboard.aanmeldingQuiz();

    await Promise.all([
      dashboard.findSubscriptionNogNietAangemeld(Seeder.subscriberEmail, Seeder.subscriberTeam),
      dashboard.findSubscriptionNogNietAangemeld(Seeder.subscriberEmail2, Seeder.subscriberTeam2),
    ]);

    await page.waitForTimeout(10000);
  });
});

const subscribeToQuiz = async (search: Search, subscriberEmail?: string, subscriberTeam?: string) => {
  await search.navigate();
  await search.subscribeToQuiz(Seeder.quizTitle, subscriberEmail, subscriberTeam);
};

const aanmelden = async (login: Login) => {
  await login.navigate();
  await login.login(Seeder.subscriberEmail, Seeder.subscriberTeam);
};

const openQuiz = async (dashboard: Dashboard) => {
  await dashboard.navigate();
  await dashboard.assertNavigation();
  await dashboard.findQuiz(Seeder.quizTitle);
  await dashboard.openQuiz();
};
