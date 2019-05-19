import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { FieldModule } from '../field/field.module';

@NgModule({
  imports: [CommonModule, FieldModule],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: []
})
export class MainModule {}
