import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoundComponent } from './list-round/list-round.component';
import { AddRoundComponent } from './add-round/add-round.component';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { RoundResolver } from '@domain/round/round.resolver';

const routes: Routes = [
  { path: 'list', component: ListRoundComponent },
  { path: 'add', component: AddRoundComponent },
  { path: 'edit/:roundId', component: EditRoundComponent, resolve: { round: RoundResolver } },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoundResolver],
})
export class RoundsRoutingModule {}
