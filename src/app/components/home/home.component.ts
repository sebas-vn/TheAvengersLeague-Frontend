import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ModifyUser } from 'src/app/models/modify-user';
import { UserInventory } from './../../models/user-inventory';
import { UserDecks } from 'src/app/models/user-decks';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  userDecks: UserDecks;
  inventory: UserInventory;
  
  modifyUser: ModifyUser = new ModifyUser();
  modifyStatus: string = '';

  @ViewChild('heroDeck', {static: false}) heroDeck;
  @ViewChild('villainDeck', {static: false}) villainDeck;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrent()
      .subscribe(
        data => {
          if('email' in data.body) {
            this.user = data.body;
            this.userService.getInventory(this.user.id)
              .subscribe(data => {
                this.inventory = data.body;
                this.userService.getDecks(this.user.id).subscribe(
                  data => {
                    this.userDecks = data.body;
                    this.heroDeck.loadInv(true, this.user, this.inventory, this.userDecks.heroDeck);
                    this.villainDeck.loadInv(false, this.user, this.inventory, this.userDecks.villianDeck);
                  }
                )
              });
          } else {
            this.router.navigate(['/front-door']);
          }
        },
        error => this.router.navigate(['/front-door'])
      );
  }

  startGame(): void {
    this.router.navigate(['/game-queue']);
  }

  logout(): void {
    this.userService.logOut()
      .subscribe(
        data => {
          this.user = new User();
          this.router.navigate(['/front-door']);
        }
      );
  }

  modifyAccount(): void {
    if(this.modifyUser.isReady()) {
      this.userService.modifyAccount(this.modifyUser)
      .subscribe(
        data => this.user = data.body,
        error => this.modifyStatus = error
      );
    }
  }
}
