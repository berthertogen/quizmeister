import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'questions',
    data: { displayName: 'Vragen' },
    loadChildren: () => import('./questions/questions.module').then((m) => m.QuestionsModule),
  },
  {
    path: 'rounds',
    data: { displayName: 'Rondes' },
    loadChildren: () => import('./rounds/rounds.module').then((m) => m.RoundsModule),
  },
  {
    path: 'quizzes',
    data: { displayName: 'Quizzen' },
    loadChildren: () => import('./quizzes/quizzes.module').then((m) => m.QuizzesModule),
  },
  {
    path: 'dashboard',
    data: { displayName: 'Dashboard' },
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
