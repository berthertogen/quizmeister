import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

import { QuizSelectorComponent } from './quiz-selector/quiz-selector.component';
import { QuizStepperComponent } from './quiz-stepper/quiz-stepper.component';
import { StepNewComponent } from './quiz-stepper/step-new/step-new.component';
import { StepOpenComponent } from './quiz-stepper/step-open/step-open.component';
import { StepStartingComponent } from './quiz-stepper/step-starting/step-starting.component';
import { StepStartedComponent } from './quiz-stepper/step-started/step-started.component';
import { QuestionSliderComponent } from './quiz-stepper/step-started/question-slider/question-slider.component';
import { SubscriptionStatusPipe } from '@domain/subscriptions/subscription-status.pipe';
import { QuestionCorrectAnswerPipe } from '@domain/question/question-correct-answer.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    QuizSelectorComponent,
    QuizStepperComponent,
    StepNewComponent,
    StepOpenComponent,
    SubscriptionStatusPipe,
    QuestionCorrectAnswerPipe,
    StepStartingComponent,
    StepStartedComponent,
    QuestionSliderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatRadioModule,
    MatDividerModule,
  ],
})
export class DashboardModule {}
