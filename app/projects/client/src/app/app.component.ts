import { Component } from '@angular/core';
import { ApplicationInsightsService } from '@domain/infrastructure/application-insight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'quizmeister';

  constructor(ai: ApplicationInsightsService) {
    ai.init();
  }
}
