import { DummyunitComponent } from './../dummyunit/dummyunit.component';
import { Coord } from './../coord';
import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Gameboard } from 'src/app/interfaces/gameboard';
import { Card } from 'src/app/models/user-inventory';
import { GameObject, GameObjectMoves } from 'src/app/models/gameboard';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  @Input() isHero: boolean;
  @Input() gameBoard: Gameboard;
  @Output() moveObject = new EventEmitter<GameObjectMoves>();

  status: string = '';
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};
  startingPosition;

  constructor() { }

  ngOnInit(): void {
    this.updateBoard();
  }

  updateBoard(): void {
    this.oneSixtyNine.forEach((e) => {
      this.testObject[e] = [];
    });
    this.setItemInTable(this.gameBoard.gameBoard);
  }

  xy(i): Coord {
    return {
      x: i % 13,
      y: Math.floor(i / 13)
    };
  }

  toCell(x: number, y: number): number {
    return (x) + ((y+1) * 13)
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
    gameBoard.forEach(el => {
      let pos = this.toCell(el.x, el.y)
      this.testObject[pos].push(el);
    });
  }

  dragStart(event) {
    //start dragging
  }

  // Check the first three positions if they are empty to insert into hand
  insertItemFromHand(card: Card): Coord {
    let search: number[] = [];
    if(!this.isHero)
      search = [149,148,150];
    else
      search = [19,18,20];

    for(let i of search) {
      if(this.testObject[i].length == 0) {
        let coord: Coord = this.xy(i);
        if(this.isHero)
          this.testObject[i].push( new GameObject(coord.x, coord.y, card.durability, null, 'hero', 'GameCard', card));
        else
          this.testObject[i].push( new GameObject(coord.x, coord.y, card.durability, null, 'villain', 'GameCard', card));
        return coord;
      }
    }
    return null;
  }

  // Evaluate the first positions from the gameboard to return the matching card
  returnItemToHand(card: Card): Coord {
    let search: number[] = [];
    if(!this.isHero)
      search = [149,148,150];
    else
      search = [19,18,20];

    for(let i of search) {
      for(let j = 0; j < this.testObject[i].length; j++) {
        if (card.id == this.testObject[i][j].card.id) {
          this.testObject[i].splice(j, 1);
          return this.xy(i);
        }
      }
    }
    return null;
  }

  checkMovementDistance(oldCoords: Coord, newCoords: Coord, card: Card): boolean {
    let maxDistance = Math.floor(card.speed / 25) + 1; 
    let distance = Math.abs(oldCoords.x - newCoords.x) + Math.abs(oldCoords.y - newCoords.y);

    if(distance < maxDistance) {
      return true;
    } else {
      return false;
    }
  }

  async drop(event: CdkDragDrop<GameObject[]>) {

    let object = null;
    if(event.container.data.length == 1)
      object = event.container.data[0]
    if(event.container.data.length == 2)
      object = event.container.data[1]

    if(this.isHero && event.previousContainer.data.length > 0) {
      if(event.previousContainer.data[0].affiliation == 'hero') {
        object = event.previousContainer.data[0];
        event.previousIndex = 0;
      } else if(event.previousContainer.data.length > 1) {
        object = event.previousContainer.data[1];
        event.previousIndex = 1;
      }
    }

    // Check if the dropped element is already inside the current element
    if(object == null) {
      if(this.isHero)
        this.status = "You can only move hero cards";
      else 
        this.status = "You can only move villain cards";
    } else if (event.previousContainer === event.container) { 
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(this.isHero && event.container.data.length > 0 && event.container.data[0].affiliation == 'hero') {
      this.status = "Only 1 hero card per cell.";
    } else if(!this.isHero && event.container.data.length > 0 && event.container.data[0].affiliation == 'villain') {
      this.status = "Only 1 villain card per cell.";
    } else if(event.container.data.length > 1) {
      this.status = "Only be 2 cards per cell";
    } else if(object.uuid == null || object.uuid.length < 16) {
      this.status = "Cannot move newly deployed cards.";
    } else {
      // get the index portion from the id of the prev container and new container 
      let idContainer = event.container.id.split('-')[3];
      let newCoord = this.xy(parseInt(idContainer));
      
      // validate if the position is part of the border 
      if (!this.isBlack(newCoord)) {

        let objectReference = null;
        for(let obj of this.gameBoard.gameBoard) {
          if(obj.uuid == object.uuid) {
            objectReference = obj;
            break;
          }
        }
        if(objectReference == null) {
          this.status = "oh no, we couldn't find the origonal object";
        } else if(!this.checkMovementDistance( {x: objectReference.x, y: objectReference.y+1}, newCoord, object.card)) {
          this.status = 'Not in movement range.';
        } else {
          try {
            // transfer the card from the previous container to the new container
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex
            );
            this.moveObject.emit( new GameObjectMoves(object.uuid, 0, newCoord.x, newCoord.y));
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        this.status = "Cannot move outside of the game board";
      }
    }
  }

  falsePredicate() {
    return false;
  }

}
