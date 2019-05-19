import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type fieldName = number[][];
@Injectable({
  providedIn: 'root'
})
export class FieldService {
  keyPressed: string;
  scale = 4;
  constructor() {}
  private state$ = new BehaviorSubject<fieldName>(
    new Array(this.scale).fill(null).map(() => new Array(this.scale).fill(null))
  );
  stateChanged$ = this.state$.asObservable();
  private keyPressed$ = new BehaviorSubject<string>('');
  keyPressedChanged$ = this.keyPressed$.asObservable();
  fillRandomEmptyCell(): void {
    let field = [...this.state$.value];
    let empties = [];
    field.forEach((row, rowindex) => {
      row.forEach((tile, tileindex) => {
        if (tile === null) {
          empties.push([rowindex, tileindex]);
        }
      });
    });
    let index = empties[Math.floor(Math.random() * empties.length)];
    field[index[0]][index[1]] = Math.floor(Math.random() * 100 + 1);
    this.state$.next(field);
  }
  moveRight(key) {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    for (let rowindex = 0; rowindex < this.scale; rowindex++) {
      for (let tileindex = this.scale - 1; tileindex >= 0; tileindex--) {
        const tileValue = field[rowindex][tileindex];
        if (
          tileValue !== null &&
          tileindex < this.scale - 1 &&
          field[rowindex][tileindex + 1] === null
        ) {
          field[rowindex][tileindex + 1] = tileValue;
          field[rowindex][tileindex] = null;
        }
      }
    }
    this.state$.next(field);
  }
  moveLeft(key) {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    for (let rowindex = 0; rowindex < this.scale; rowindex++) {
      for (let tileindex = 0; tileindex < this.scale; tileindex++) {
        const tileValue = field[rowindex][tileindex];
        if (
          tileValue !== null &&
          tileindex > 0 &&
          field[rowindex][tileindex - 1] === null
        ) {
          field[rowindex][tileindex - 1] = tileValue;
          field[rowindex][tileindex] = null;
        }
      }
    }
    this.state$.next(field);
  }
  moveDown(key) {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    for (let rowindex = this.scale - 1; rowindex >= 0; rowindex--) {
      for (let tileindex = 0; tileindex < this.scale; tileindex++) {
        const tileValue = field[rowindex][tileindex];
        if (
          tileValue !== null &&
          rowindex < this.scale - 1 &&
          field[rowindex + 1][tileindex] === null
        ) {
          field[rowindex + 1][tileindex] = tileValue;
          field[rowindex][tileindex] = null;
        }
      }
    }
    this.state$.next(field);
  }
  moveUp(key) {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    for (let rowindex = 0; rowindex < this.scale; rowindex++) {
      for (let tileindex = 0; tileindex < this.scale; tileindex++) {
        const tileValue = field[rowindex][tileindex];
        if (
          tileValue !== null &&
          rowindex > 0 &&
          field[rowindex - 1][tileindex] === null
        ) {
          field[rowindex - 1][tileindex] = tileValue;
          field[rowindex][tileindex] = null;
        }
      }
    }
    this.state$.next(field);
  }
}
