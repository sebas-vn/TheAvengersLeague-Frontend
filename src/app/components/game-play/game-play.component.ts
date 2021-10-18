import { GameboardComponent } from './../gameboard/gameboard.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameBoard, GameObjectMoves, GameUpdate } from 'src/app/models/gameboard';
import { GameService } from 'src/app/services/game.service';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Coord } from '../coord';
import { StaticSymbol } from '@angular/compiler';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {

  inQueue: boolean;
  submittedTurn: boolean;
  gameBoard: GameBoard;
  response: GameUpdate;
  user: User;

  @ViewChild('gameboard', {static: false}) gameBoardChild: GameboardComponent;

  private subscription: Subscription;

  constructor(private userService: UserService, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.submittedTurn = false;
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.update());

    this.user = new User();
    this.user.id = -1;
    this.userService.getCurrent().subscribe(
      data => this.user = data.body
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private update(): void {
    let response = null;
    /*
    if(this.gameBoard == null)
      response = this.gameService.getGameForce();
    else
      response = this.gameService.getGame();
      */
    response = this.gameService.getGameForce();

    response.subscribe( data => {
        if(data.body.status)
          this.handleStatus(data.body.status);
        else if(data.body.error)
            this.handleStatus(data.body.error);

        if(data.body.gameBoard && (this.gameBoard == null || data.body.turn > this.gameBoard.turn) ) {
          this.gameBoard = data.body;
          this.response = new GameUpdate(this.gameBoard);
          this.inQueue = false;
          this.submittedTurn = false;

          this.gameBoardChild.gameBoard = data.body;
          this.gameBoardChild.updateBoard();

          if(data.body.state != 0) {
            console.log("game over")
            this.subscription.unsubscribe();
          }
        }
      },
      error => this.handleStatus(error)
    );
  }

  submitTurn(): void {
    this.gameService.updateGame(this.response).subscribe(
      data => {
        console.log(data);
        this.handleStatus(data.body);
      },
      error => { 
        console.log(error);
        this.handleStatus(error); 
      }
    );
  }

  getAffiliation(): boolean {
    if(this.gameBoard.affiliation == 'hero')
      return true;
    else
      return false;
  }

  playCard(index: number): void {
    if(this.gameBoard.hand[index].powerCost <= this.gameBoard.power + 100) {
      const coord: Coord = this.gameBoardChild.insertItemFromHand(this.gameBoard.hand[index]);
      if(coord != null) {
        this.response.hand[index] = 0;
        this.response.power -= this.gameBoard.hand[index].powerCost;
        this.response.moves.push(new GameObjectMoves(null, this.gameBoard.hand[index].id, coord.x, coord.y-1) );
      }
    }
  }

  unplayCard(index: number): void {
    const coord: Coord = this.gameBoardChild.returnItemToHand(this.gameBoard.hand[index]);
    if(coord != null) {
      this.response.hand[index] = this.gameBoard.hand[index].id;
      this.response.power += this.gameBoard.hand[index].powerCost;
      for(let i = 0; i < this.response.moves.length; i++) {
        if(this.response.moves[i].x == coord.x && this.response.moves[i].y+1 == coord.y) {
          this.response.moves.splice(i,1);
        }
      }
    }
  }

  moveCard(data: GameObjectMoves): void {
    data.y -= 1;
    for(let i = 0; i < this.response.moves.length; i++) {
      if(this.response.moves[i].uuid == data.uuid) {
        this.response.moves[i].x = data.x;
        this.response.moves[i].y = data.y;
        return;
      }
    }
    this.response.moves.push(data);
  }

  leaveGame(): void {
    this.gameService.leaveGame().subscribe(
      data => this.handleStatus(data.body),
      error => { this.handleStatus(error); this.submittedTurn = false; }
    );
    this.router.navigate(['/home']);
  }

  private handleStatus(message): void {

    let status: string = message;
    if(message.status)
      status = message.status;
    if(message.error)
      status = message.error;

    if(status.startsWith('in queue')) {
      if(this.gameBoard == null)
        this.inQueue = true;
      else
        this.subscription.unsubscribe();
    } else if(status.startsWith('not logged in'))
      this.router.navigate(['/front-door']);
    else if(status.startsWith('already confirmed the next turn'))
      this.submittedTurn = true;
    else if(status.startsWith('set users next move'))
      this.submittedTurn = true;
  }

}
