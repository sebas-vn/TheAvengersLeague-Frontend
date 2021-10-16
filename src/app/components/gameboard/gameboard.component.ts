import { Coord } from './../coord';
import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  three: any[] = new Array(3).fill(0).map((_, i) => i);

  testOnBoard = {};
  testInHand = {};

  xy(i): Coord {
    return {
      x: i % 13,
      y: Math.floor(i / 13)
    }
  }

  isBlack({ x, y }: Coord) {
    var boardsize: number = 10;
    var radius: number = 6;
    var half: number = boardsize/2 + 1;

    if (x > 0 && x < 12 && y > 0 && y < 12) {
      if(Math.abs(x-half) + Math.abs(y-half) <= radius)
        return false;
    }
    return true;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.isPointerOverContainer) {
      console.log(event.container)
      // console.log(event.container, event.previousContainer);
      // console.log(event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  falsePredicate() {
    return false;
  }

  constructor() { }

  ngOnInit(): void {
    this.oneSixtyNine.forEach((e) => {
      this.testOnBoard[e] = ["test"];
    })  

    this.three.forEach((e) => {
      this.testInHand[e] = ["card"];
    })
  }

}
