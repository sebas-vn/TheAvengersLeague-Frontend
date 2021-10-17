import { GameboardComponent } from './../gameboard/gameboard.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameBoard, GameUpdate } from 'src/app/models/gameboard';
import { GameService } from 'src/app/services/game.service';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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

  @ViewChild('gameboard', {static: false}) gameboard: GameboardComponent;

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
    if(this.gameBoard == null)
      response = this.gameService.getGameForce();
    else
      response = this.gameService.getGame();

    response.subscribe( data => {
        if(data.body.status)
          this.handleStatus(data.body.status);
        else if(data.body.error)
            this.handleStatus(data.body.error);

        if(data.body.gameBoard) {
          this.gameBoard = data.body;
          this.response = new GameUpdate(this.gameBoard);
          this.inQueue = false;
        }
      },
      error => this.handleStatus(error)
    );
  }

  getAffiliation(): boolean {
    if(this.gameBoard == null && this.gameBoard.hand[0].affiliation.toLowerCase() == 'villain')
      return false;
    else
      return true;
  }

  playCard(index: number): void {
    if(this.gameBoard.hand[index].powerCost <= this.gameBoard.power) {
      this.response.hand[index] = 0;
      this.response.power -= this.gameBoard.hand[index].powerCost;
    }
  }

  unplayCard(index: number): void {
    this.response.hand[index] = this.gameBoard.hand[index].id;
    this.response.power += this.gameBoard.hand[index].powerCost;
  }

  submitTurn(): void {
    this.submittedTurn = true;
    this.gameService.updateGame(this.response).subscribe(
      data => this.handleStatus(data.body),
      error => { this.handleStatus(error); this.submittedTurn = false; }
    );
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

    if(status.startsWith('in queue'))
      this.inQueue = true;
    else if(status.startsWith('not logged in'))
      this.router.navigate(['/front-door']);
  }

}
