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
  @Input() gameBoard: Gameboard;
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};
  startingPosition;
  

  constructor(private tgameService: TestgameService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.oneSixtyNine.forEach((e) => {
      this.testObject[e] = [];
    });

    // Set intial items in gameboard
    this.setItemInTable(this.gameBoard.gameBoard);
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
  insertItemFromHand(card: any): boolean {
    if (this.testObject[148].length == 0) {
      this.testObject[148].push(card);
      return true;

    } else if (this.testObject[149].length == 0) {
      this.testObject[149].push(card);
      return true;
      
    } else if (this.testObject[150].length == 0) {
      this.testObject[150].push(card);
      return true;

    } else {
      alert('Move one card from initial position to insert new from hand');
      return false;
    }
  }

  returnItemToHand(card: any): boolean {
    if (this.testObject[148].length == 1) {
      if (card.id === this.testObject[148][0].id) {
        this.testObject[148].splice(0, 1);
        return true;
      }
    } else if (this.testObject[149].length == 1) {
      if (card.id === this.testObject[149][0].id) {
        this.testObject[149].splice(0, 1);
        return true;
      }
      
    } else if (this.testObject[150].length == 1) {
      if (card.id === this.testObject[150][0].id) {
        this.testObject[149].splice(0, 1);
        return true;
      }

    } else {
      alert('Could not return from hand');
      return false;
    }
  }

  checkMovementDistance() {
    
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
