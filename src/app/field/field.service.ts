import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// export type fieldName = number[][];
export type FieldSate = number[][];
export type Direction =
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'ArrowLeft'
  | '';
@Injectable({
  providedIn: 'root'
})
export class FieldService {
  keyPressed: string;
  scale = 4;
  constructor() {}
  private state$ = new BehaviorSubject<FieldSate>(
    new Array(this.scale).fill(null).map(() => new Array(this.scale).fill(null))
  );
  stateChanged$ = this.state$.asObservable();
  private keyPressed$ = new BehaviorSubject<Direction>('');
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
    field[index[0]][index[1]] = Math.floor(Math.random() * 10 + 1);
    this.state$.next(field);
  }

  moveRight(key: Direction): void {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    // scan from top to bottom
    for (let rowIndex = 0; rowIndex < this.scale; rowIndex++) {
      // scan from right to left
      for (let tileindex = this.scale - 1; tileindex >= 0; tileindex--) {
        // value and edge check
        if (field[rowIndex][tileindex]) {
          // scan from rigt to left
          for (
            let searchindex = tileindex;
            searchindex < this.scale;
            searchindex++
          ) {
            if (!this.numberBehavior(field, rowIndex, searchindex, key)) {
              break;
            }
          }
        }
      }
    }
    this.state$.next(field);
    this.fillRandomEmptyCell();
  }

  moveLeft(key: Direction): void {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    // scan from bottom to top
    for (let rowIndex = 0; rowIndex < this.scale; rowIndex++) {
      //scan frtom left to right
      for (let tileindex = 0; tileindex < this.scale; tileindex++) {
        // value and edge check
        if (field[rowIndex][tileindex]) {
          // scan from rigt to left
          for (let searchindex = tileindex; searchindex > 0; searchindex--) {
            if (!this.numberBehavior(field, rowIndex, searchindex, key)) {
              break;
            }
          }
        }
      }
    }
    this.state$.next(field);
    this.fillRandomEmptyCell();
  }
  moveDown(key: Direction): void {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    // scan from bottom to top
    for (let rowIndex = this.scale - 1; rowIndex >= 0; rowIndex--) {
      // scan from left to right
      for (let tileIndex = 0; tileIndex < this.scale; tileIndex++) {
        // value and edge check
        if (field[rowIndex][tileIndex]) {
          // scan from bottom to top
          for (
            let searchindex = rowIndex;
            searchindex < this.scale;
            searchindex++
          ) {
            if (!this.numberBehavior(field, searchindex, tileIndex, key)) {
              break;
            }
          }
        }
      }
    }
    this.state$.next(field);
    this.fillRandomEmptyCell();
  }
  moveUp(key: Direction): void {
    this.keyPressed$.next(key);
    let field = [...this.state$.value];
    // scan from top to bottom
    for (let rowIndex = 0; rowIndex < this.scale; rowIndex++) {
      // scan from left to right
      for (let tileIndex = 0; tileIndex < this.scale; tileIndex++) {
        // value and edge check
        if (field[rowIndex][tileIndex]) {
          // scan from top to bottom
          for (let searchindex = rowIndex; searchindex > 0; searchindex--) {
            if (!this.numberBehavior(field, searchindex, tileIndex, key)) {
              break;
            }
          }
        }
      }
    }
    this.state$.next(field);
    this.fillRandomEmptyCell();
  }
  private numberBehavior(
    field: FieldSate,
    rowIndex: number,
    tileIndex: number,
    direction: Direction
  ): boolean {
    const size = field.length;
    const tileValue = field[rowIndex][tileIndex];
    const destrow =
      direction === 'ArrowUp'
        ? rowIndex - 1
        : direction === 'ArrowDown'
        ? rowIndex + 1
        : rowIndex;
    const destile =
      direction === 'ArrowLeft'
        ? tileIndex - 1
        : direction === 'ArrowRight'
        ? tileIndex + 1
        : tileIndex;
    if (destrow >= 0 && destrow < size && destile >= 0 && destile < size) {
      if (!field[destrow][destile]) {
        field[destrow][destile] = tileValue;
        field[rowIndex][tileIndex] = null;
        return true;
      } else if (field[destrow][destile] === tileValue) {
        field[destrow][destile] *= 2;
        field[rowIndex][tileIndex] = null;
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
