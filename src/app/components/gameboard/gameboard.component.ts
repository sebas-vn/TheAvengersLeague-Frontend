import { TestgameService } from './../../services/testgame.service';
import { Coord } from './../coord';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Gameboard } from 'src/app/interfaces/gameboard';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  @Input() isHero: boolean;
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};
  startingPosition;
  gameBoard: Gameboard;
  

  constructor(private tgameService: TestgameService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.oneSixtyNine.forEach((e) => {
      this.testObject[e] = [];
    });

    // getting the current state of the game
    this.tgameService.getGamePlay()
    .subscribe(data => {
      this.gameBoard = data;
      this.setItemInTable(this.gameBoard.gameBoard); // comparing positions in each table
    });
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

  setItemInTable(gameBoard) {

    this.oneSixtyNine.forEach((e) => {
      let coords = this.xy(e);
      gameBoard.forEach(el => {
        if (el.x === coords.x && el.y === coords.y) {
          this.testObject[e].push(el);
        }
      });
    })

  }

  // Check the first three positions if they are empty to insert into hand
  insertItemFromHand(card: any) {
    if (this.testObject[148].length == 0) {
      this.testObject[148].push(card);

    } else if (this.testObject[149].length == 1) {
      this.testObject[148].push(card);
      
    } else if (this.testObject[150].length == 1) {
      this.testObject[148].push(card);

    } else {
      alert('Move one card from initial position to insert new from hand')
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data);
    console.log(event.container.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length < 2) { // validate if dropList container array contains less than 2
        let idContainer = event.container.id.split('-')[3]; // get the index portion from the id of the container
        let newCoord = this.xy(parseInt(idContainer));
        if (!this.isBlack(newCoord)) { // validate if the position is part of the border 

          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

          // Update positions of items in container
          event.container.data.forEach(e => {
            e['x'] = newCoord.x;
            e['y'] = newCoord.y;
          });

        } else {
          alert("Cannot move outside of the border");
        }

      } else {
        alert("There should only be 2 items");
      }
    }
  }

  falsePredicate() {
    return false;
  }

}
