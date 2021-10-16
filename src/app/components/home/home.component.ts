import { SuperheroService } from './../../services/superhero.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ModifyUser } from 'src/app/models/modify-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroes = [];
  user: User = new User();
  modifyUser: ModifyUser = new ModifyUser();
  modifyStatus: string = '';

  constructor(private router: Router, private userService: UserService, private heroService: SuperheroService) { }

  ngOnInit(): void {
    this.userService.getCurrent()
      .subscribe(
        data => {
          if('email' in data)
            this.user = data;
          else
            this.router.navigate(['/front-door']);
        },
        error => this.router.navigate(['/front-door'])
      );
  }

  getHero(): void {
    this.heroService.getSuperHero()
      .subscribe(data => {
          this.heroes.push(data);
        },
        error => console.error(error)
      );
  }

  startGame(): void {
    this.router.navigate(['/game-queue']);
  }

  logout(): void {
    this.userService.logOut()
      .subscribe(
        data => {
          this.user = data;
          this.router.navigate(['/front-door']);
        },
        error => console.log(`Failed to log out: ${error}`)
      );
  }

  modifyAccount(): void {
    if(this.modifyUser.isReady()) {
      this.userService.modifyAccount(this.modifyUser)
      .subscribe(
        data => this.user = data,
        error => this.modifyStatus = error
      );
    }
  }
}
