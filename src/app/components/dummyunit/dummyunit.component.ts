import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserInventory } from 'src/app/models/user-inventory';

@Component({
  selector: 'app-dummyunit',
  templateUrl: './dummyunit.component.html',
  styleUrls: ['./dummyunit.component.css']
})
export class DummyunitComponent {

  user: User = new User();
  inventory: UserInventory;

  @Input('card') card;
  @Input('squareArray') squareArr;
  @Input() index;
  imageUrl: string;
  showC = {show: false, id: null};
  
  constructor() { }


  ngOnInit(): void {

    this.card.card.image = this.card.card.image ? this.card.card.image : '../../../assets/generic-hero.jpg';
    this.imageUrl = `url(${this.card.card.image})`;

    console.log(this.card, this.squareArr, this.index);
  }

  showCard(event, bool) {
    this.showC.show = bool;
    this.showC.id = event.card.id;
    console.log(event);
  }

  

}
