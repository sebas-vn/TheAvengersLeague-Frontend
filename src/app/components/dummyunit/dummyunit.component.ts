import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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
  
  constructor() { }


  ngOnInit(): void {

    console.log(this.card, this.squareArr, this.index);
  }

  

}
