import { SquareComponent } from './../square.component';
import { Coord } from './../coord';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};

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

  dummyPosition$ = this.game.dummyPosition$

/*   drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex);
    console.log(event.currentIndex);
  }
 */
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor(private game: GameService) { }

  ngOnInit(): void {
    console.log(this.oneSixtyNine);  
    this.oneSixtyNine.forEach((e) => {
      this.testObject[e] = ["ele", "ala"];
    })  
  }

}
