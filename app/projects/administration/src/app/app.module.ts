import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';

import { SignalRService } from '@domain/infrastructure/signal-r.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './header/breadcrumb/breadcrumb.component';

import '@angular/common/locales/global/nl-BE';

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSnackBarModule,
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
