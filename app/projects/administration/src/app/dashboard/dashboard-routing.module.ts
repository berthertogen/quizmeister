import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizResolver } from '@domain/quiz/quiz.resolver';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'list', component: DashboardComponent },
  { path: 'list/:quizId', component: DashboardComponent, resolve: { quiz: QuizResolver } },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuizResolver],
})
export class DashboardRoutingModule {}
