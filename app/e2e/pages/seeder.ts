const fetch = require('node-fetch');

export class Seeder {
  static quizTitle = 'De Hertogens';
  static subscriberEmail = 'e2e@hertogen.net';
  static subscriberTeam = 'e2e team';
  static subscriberEmail2 = 'e2e-2@hertogen.net';
  static subscriberTeam2 = 'e2e team 2';

  async seed(): Promise<void> {
    await fetch('http://localhost:5003/seed', { method: 'POST' });
  }

  async deseed(): Promise<void> {
    await fetch('http://localhost:5003/seed', { method: 'DELETE' });
  }
}
