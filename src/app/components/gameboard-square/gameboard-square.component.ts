import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gameboard-square',
  templateUrl: './gameboard-square.component.html',
  styleUrls: ['./gameboard-square.component.css']
})
export class GameboardSquareComponent {

  @Input() black: boolean;

  constructor() { }

  getStyle() {
    return this.black
      ? { backgroundColor: 'black', color: 'white' }
      : { backgroundColor: 'white', color: 'black' };
  }

}
