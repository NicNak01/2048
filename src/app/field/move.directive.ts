import { Directive, HostListener } from '@angular/core';
import { FieldService } from './field.service';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective {
  constructor(private fieldService: FieldService) {}
  @HostListener('document:keydown', ['$event']) keyPressed(
    event: KeyboardEvent
  ) {
    if (event.key === 'ArrowUp') {
      this.fieldService.moveUp(event.key);
    }
    if (event.key === 'ArrowDown') {
      this.fieldService.moveDown(event.key);
    }
    if (event.key === 'ArrowLeft') {
      this.fieldService.moveLeft(event.key);
    }
    if (event.key === 'ArrowRight') {
      this.fieldService.moveRight(event.key);
    }
  }
}

// §rarr §larr  §uarr §darr
