import { SquareComponent } from './../square.component';
import { Coord } from './../coord';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  dummyPosition$ = this.game.dummyPosition$;
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};
  startingPosition;
  

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.oneSixtyNine.forEach((e) => {
      this.testObject[e] = [1];
    })  
  }

  xy(i): Coord {
    return {
      x: i % 13,
      y: Math.floor(i / 13)
    };
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

  handleSquareClick(pos: Coord) {
    console.log(pos);
    if (this.game.canMove(pos)) {
      this.game.moveDummy(pos);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container, event.previousContainer);
    console.log(event.container.data, event.previousIndex, event.currentIndex);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length < 2) { // validate if dropList container array contains less than 2
        let idContainer = event.container.id.split('-')[3]; // get the index portion from the id of the container

        if (!this.isBlack(this.xy(parseInt(idContainer)))) { // validate if the position is part of the border 
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

        } else {
          alert("Cannot move outside of the border");
        }

      } else {
        alert("There should only be 2 items");
      }
    }
  }

}
