import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizResolver } from '../../../domain/src/lib/quiz/quiz.resolver';
import { FindQuizComponent } from './find-quiz/find-quiz.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: 'find-quiz', component: FindQuizComponent },
  { path: ':shortId', component: QuizComponent, resolve: { quiz: QuizResolver } },
  { path: '', redirectTo: 'find-quiz', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
