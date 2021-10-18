import { DummyunitComponent } from './../dummyunit/dummyunit.component';
import { Coord } from './../coord';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('cardBoardUnit', {static: false}) cardBoardUnitChild:DummyunitComponent;
  oneSixtyNine: any[] = new Array(169).fill(0).map((_, i) => i);
  testObject = {};
  startingPosition;
  

  constructor() { }

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

  dragStart(event) {
    console.log(event);
  }

  // Check the first three positions if they are empty to insert into hand
  insertItemFromHand(card: any): Coord {
    if (this.testObject[149].length == 0) {
      this.testObject[149].push(card);
      return this.xy(149);

    } else if (this.testObject[148].length == 0) {
      this.testObject[148].push(card);
      return this.xy(148);
      
    } else if (this.testObject[150].length == 0) {
      this.testObject[150].push(card);
      return this.xy(150);

    } else {
      alert('Move one card from initial position to insert new from hand');
      return null
    }
  }

  // Evaluate the first positions from the gameboard to return the matching card
  returnItemToHand(card: any): Coord {
    if (this.testObject[148].length == 1) {
      if (card.id === this.testObject[148][0].id) {
        this.testObject[148].splice(0, 1);
        return this.xy(148);
      }
    } else if (this.testObject[149].length == 1) {
      if (card.id === this.testObject[149][0].id) {
        this.testObject[149].splice(0, 1);
        return this.xy(149);
      }
      
    } else if (this.testObject[150].length == 1) {
      if (card.id === this.testObject[150][0].id) {
        this.testObject[149].splice(0, 1);
        return this.xy(150);
      }

    } else {
      alert('Could not return from hand');
      return null;
    }
  }

  checkMovementDistance(oldCoords: any, newCoords: any, card: any): Promise<any>{
    return new Promise((resolve, reject) => {
      let maxDistance = Math.floor((card.speed / 25) + 1);
      console.log(oldCoords, newCoords);
      
      let condition = (oldCoords.x - newCoords.x) <= maxDistance && 
                      (oldCoords.y - newCoords.y) <= maxDistance;

      if(!condition) {
        reject(`You are only allowed to move ${maxDistance} squares`);
      } else {
        resolve(true);
      }

    });
  }

  async drop(event: CdkDragDrop<string[]>) {

    // Check if the dropped element is already inside the current element
    if (event.previousContainer === event.container) { 
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // validate if dropList container array contains less than 2
      if (event.container.data.length < 2) { 
        // get the index portion from the id of the prev container and new container 
        let idPrevContainer = event.container.id.split('-')[3];
        let idContainer = event.container.id.split('-')[3]; 
        let newCoord = this.xy(parseInt(idContainer));
        let prevCoord = this.xy(parseInt(idPrevContainer));
        // validate if the position is part of the border 
        if (!this.isBlack(newCoord)) {

          try {

            await this.checkMovementDistance(
              prevCoord,
              newCoord,
              event.container.data
              );

              // transfer the card from the previous container to the new container
              transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
              );
    
              // Update positions of items in container for gameBoard
              event.container.data.forEach(e => {
                e['x'] = newCoord.x;
                e['y'] = newCoord.y;
              });
            
          } catch (error) {
            console.error(error);
          }

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
