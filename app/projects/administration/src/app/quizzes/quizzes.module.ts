import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { FormQuizComponent } from './form-quiz/form-quiz.component';
import { TableQuizComponent } from './list-quiz/table-quiz/table-quiz.component';
import { DeleteQuizModalComponent } from './delete-quiz/delete-quiz-modal.component';
import { CopyQuizModalComponent } from './copy-quiz/copy-quiz-modal.component';

@NgModule({
  declarations: [
    ListQuizComponent,
    AddQuizComponent,
    EditQuizComponent,
    FormQuizComponent,
    TableQuizComponent,
    DeleteQuizModalComponent,
    CopyQuizModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuizzesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    DragDropModule,
  ],
})
export class QuizzesModule {}
