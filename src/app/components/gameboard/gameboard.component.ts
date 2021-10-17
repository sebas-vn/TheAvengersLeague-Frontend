import { TestgameService } from './../../services/testgame.service';
import { Coord } from './../coord';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Gameboard } from 'src/app/interfaces/gameboard';
import { Card } from 'src/app/models/user-inventory';

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
  insertItemFromHand(card: Card): Coord {
    let search: number[] = [];
    if(this.isHero)
      search = [149,148,150];
    else
      search = [17,16,18];

    for(let i of search) {
      if(this.testObject[i].length == 0) {
        this.testObject[i].push(card);
        return this.xy(i);
      }
    }
    return null;
  }

  // Evaluate the first positions from the gameboard to return the matching card
  returnItemToHand(card: Card): Coord {
    let search: number[] = [];
    if(this.isHero)
      search = [149,148,150];
    else
      search = [17,16,18];

    for(let i of search) {
      for(let j = 0; j < this.testObject[i].length; j++) {
        if (card.id === this.testObject[i][j].id) {
          this.testObject[i].splice(j, 1);
          return this.xy(i);
        }
      }
    }
    return null;
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
