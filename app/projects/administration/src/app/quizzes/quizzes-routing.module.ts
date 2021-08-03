import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizResolver } from '@domain/quiz/quiz.resolver';

const routes: Routes = [
  { path: 'list', component: ListQuizComponent },
  { path: 'add', component: AddQuizComponent },
  { path: 'edit/:quizId', component: EditQuizComponent, resolve: { quiz: QuizResolver } },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuizResolver],
})
export class QuizzesRoutingModule {}
