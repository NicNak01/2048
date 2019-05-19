import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldService } from './field.service';
import { Subscription } from 'rxjs';

export type fieldName = number[][];
@Component({
  selector: 'app-field',
  template: `
    <div appMove [ngSwitch]="keyPressed">
      <button class="btn" (click)="refresh()">Refresh</button>
      <span *ngSwitchCase="'ArrowUp'">&uarr;</span>
      <span *ngSwitchCase="'ArrowDown'">&darr;</span>
      <span *ngSwitchCase="'ArrowLeft'">&larr;</span>
      <span *ngSwitchCase="'ArrowRight'">&rarr;</span>
    </div>
    <div class="row" *ngFor="let row of gameField">
      <div class="tile" *ngFor="let tile of row">{{ tile }}</div>
    </div>
  `,
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {
  keyPressed: string;
  sub: Subscription;
  gameField: fieldName;
  constructor(private fieldService: FieldService) {}
  refresh(): void {
    this.fieldService.fillRandomEmptyCell();
  }

  ngOnInit() {
    this.sub = this.fieldService.stateChanged$.subscribe(field => {
      this.gameField = field;
    });
    this.sub = this.fieldService.keyPressedChanged$.subscribe(key => {
      this.keyPressed = key;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
