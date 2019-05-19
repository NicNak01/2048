import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FieldComponent } from './field.component';
import { MoveDirective } from './move.directive';

@NgModule({
  imports: [CommonModule],
  exports: [FieldComponent],
  declarations: [FieldComponent, MoveDirective],
  providers: []
})
export class FieldModule {}
