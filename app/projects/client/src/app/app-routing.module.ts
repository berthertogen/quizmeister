import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoffComponent } from './logoff/logoff.component';
import { SearchComponent } from './search/search.component';
import { MyListComponent } from './my-list/my-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResolver } from '@domain/quiz/quiz.resolver';

const routes: Routes = [
  { path: 'quiz/:quizId', component: QuizComponent, resolve: { quiz: QuizResolver } },
  { path: 'my-list', component: MyListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logoff', component: LogoffComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
