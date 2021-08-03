import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuestionComponent } from './add-question/add-question.component';
import { ListQuestionComponent } from './list-question/list-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { QuestionResolver } from '@domain/question/question.resolver';

const routes: Routes = [
  { path: 'list', component: ListQuestionComponent },
  { path: 'add', component: AddQuestionComponent },
  { path: 'edit/:questionId', component: EditQuestionComponent, resolve: { question: QuestionResolver } },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuestionResolver],
})
export class QuestionsRoutingModule {}
