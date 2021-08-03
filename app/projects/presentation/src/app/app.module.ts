import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FindQuizComponent } from './find-quiz/find-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { SignalRService } from '../../../domain/src/lib/infrastructure/signal-r.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, FindQuizComponent, QuizComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-BE' },
    {
      provide: APP_INITIALIZER,
      useFactory: (signalRService: SignalRService) => () => signalRService.connect(),
      multi: true,
      deps: [SignalRService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
