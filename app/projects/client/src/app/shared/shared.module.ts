import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [MatProgressSpinnerModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent, MatProgressSpinnerModule],
})
export class SharedModule {}
