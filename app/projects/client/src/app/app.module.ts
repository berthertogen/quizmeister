import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoffComponent } from './logoff/logoff.component';
import { SearchComponent } from './search/search.component';
import { SubscribeComponent } from './search/subscribe/subscribe.component';
import { MyListComponent } from './my-list/my-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { ButtonsComponent } from './dashboard/buttons/buttons.component';
import { StartingComponent } from './quiz/starting/starting.component';
import { StartedComponent } from './quiz/started/started.component';
import '@angular/common/locales/global/nl-BE';
import { SignalRService } from '@domain/infrastructure/signal-r.service';
import { SubscriptionStatusPipe } from '@domain/subscriptions/subscription-status.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    DashboardComponent,
    LogoffComponent,
    SearchComponent,
    SubscribeComponent,
    MyListComponent,
    QuizComponent,
    ButtonsComponent,
    StartingComponent,
    StartedComponent,
    SubscriptionStatusPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule,
    MatProgressBarModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
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
