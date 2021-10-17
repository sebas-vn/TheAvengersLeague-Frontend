import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameBoard, GameUpdate } from 'src/app/models/gameboard';
import { GameService } from 'src/app/services/game.service';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {

  inQueue: boolean;
  gameBoard: GameBoard;
  response: GameUpdate;

  private subscription: Subscription;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.update());
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
          this.handleStatus(data.body.status);
      else {
        this.gameBoard = data.body;
        this.response = new GameUpdate(this.gameBoard);
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
    this.response.hand[index] = 0;
  }

  unplayCard(index: number): void {
    this.response.hand[index] = this.gameBoard.hand[index].id;
  }

  private handleStatus(status: string): void {
    if(status.startsWith('in queue'))
      this.inQueue = true;
    else if(status.startsWith('not logged in'))
      this.router.navigate(['/front-door']);
  }

}
