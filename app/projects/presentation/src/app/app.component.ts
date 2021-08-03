import { Component } from '@angular/core';
import { ApplicationInsightsService } from '../../../domain/src/lib/infrastructure/application-insight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(ai: ApplicationInsightsService) {
    ai.init();
  }
}
