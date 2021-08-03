import { Component, OnDestroy } from '@angular/core';
import { ApplicationInsightsService } from '@domain/infrastructure/application-insight.service';
import { SignalRService } from '@domain/infrastructure/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {
  title = 'insights';

  constructor(ai: ApplicationInsightsService, private signalRService: SignalRService) {
    ai.init();
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }
}
