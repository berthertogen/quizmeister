import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { QuestionsRoutingModule } from './questions-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { MatSortModule } from '@angular/material/sort';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { TableQuestionComponent } from './list-question/table-question/table-question.component';
import { AnswerComponent } from './form-question/answer/answer.component';

@NgModule({
  declarations: [
    AddQuestionComponent,
    ListQuestionComponent,
    EditQuestionComponent,
    FormQuestionComponent,
    TableQuestionComponent,
    AnswerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatExpansionModule,
    DragDropModule,
  ],
})
export class QuestionsModule {}
