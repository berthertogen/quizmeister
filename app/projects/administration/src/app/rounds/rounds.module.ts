import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundsRoutingModule } from './rounds-routing.module';
import { ListRoundComponent } from './list-round/list-round.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddRoundComponent } from './add-round/add-round.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRoundComponent } from './form-round/form-round.component';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { CopyRoundModalComponent } from './copy-round/copy-round-modal.component';
import { DeleteRoundModalComponent } from './delete-round/delete-round-modal.component';
import { TableRoundComponent } from './list-round/table-round/table-round.component';

@NgModule({
  declarations: [
    ListRoundComponent,
    AddRoundComponent,
    FormRoundComponent,
    EditRoundComponent,
    CopyRoundModalComponent,
    DeleteRoundModalComponent,
    TableRoundComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoundsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    DragDropModule,
    MatAutocompleteModule,
  ],
})
export class RoundsModule {}
