import { GameboardComponent } from './../components/gameboard/gameboard.component';
import { Coord } from './../components/coord';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  dummyPosition$ = new BehaviorSubject<Coord>({ x:2, y:5 });
  currentPosition: Coord;

  constructor() {
    this.dummyPosition$.subscribe(kp => {
      this.currentPosition = kp;
    })
  }

  moveDummy(to: Coord) {
    this.dummyPosition$.next(to);
  }

  canMove(to: Coord) {
    const { x, y } = this.currentPosition;
    const dx = to.x - x;
    const dy = to.y - y;

    if (to.x == 0 && y != 6 || to.x == 12 && y != 6) {
      return false;
    } else if (to.x == 1 && to.y <=4 || to.x == 1 && to.y >= 8 || to.x == 11 && to.y <=4 || to.x == 11 && to.y >= 8) {
      return false;
    } else if (to.x == 2 && to.y <=3 || to.x == 2 && to.y >= 9 || to.x == 10 && to.y <=3 || to.x == 10 && to.y >= 9) {
      return false;
    } else if (to.x == 3 && to.y <=2 || to.x == 3 && to.y >= 10 || to.x == 9 && to.y <=2 || to.x == 9 && to.y >= 10) {
      return false;
    } else if (to.x == 4 && to.y <=1 || to.x == 4 && to.y >= 11 || to.x == 8 && to.y <=1 || to.x == 8 && to.y >= 11) {
      return false;
    } else if (to.x == 5 && to.y <=0 || to.x == 5 && to.y >= 12 || to.x == 7 && to.y <=0 || to.x == 7 && to.y >= 12) {
      return false;
    }
    return (Math.abs(dx) + Math.abs(dy) === 1) || (Math.abs(dx) + Math.abs(dy) === 2);
  }
  
}
