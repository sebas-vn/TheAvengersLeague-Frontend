import { Component, OnInit } from '@angular/core';
import { Coord } from '../coord';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  
  oneSixtyNine = new Array(169).fill(0).map((_, i) => i);

  xy(i): Coord {
    return {
      x: i % 13,
      y: Math.floor(i / 13)
    }
  }

  isBlack({ x, y }: Coord) {
    if (x == 0 && y != 6 || x == 12 && y != 6) {
      return true;
    } else if (x == 1 && y <=4 || x == 1 && y >= 8 || x == 11 && y <=4 || x == 11 && y >= 8) {
      return true;
    } else if (x == 2 && y <=3 || x == 2 && y >= 9 || x == 10 && y <=3 || x == 10 && y >= 9) {
      return true;
    } else if (x == 3 && y <=2 || x == 3 && y >= 10 || x == 9 && y <=2 || x == 9 && y >= 10) {
      return true;
    } else if (x == 4 && y <=1 || x == 4 && y >= 11 || x == 8 && y <=1 || x == 8 && y >= 11) {
      return true;
    } else if (x == 5 && y <=0 || x == 5 && y >= 12 || x == 7 && y <=0 || x == 7 && y >= 12) {
      return true;
    }
  }

  dummyPosition$ = this.game.dummyPosition$

  handleSquareClick(pos: Coord) {
    if (this.game.canMove(pos)) {
      this.game.moveDummy(pos);
    }
  }

  constructor(private game: GameService) { }

  ngOnInit(): void {
  }

}
