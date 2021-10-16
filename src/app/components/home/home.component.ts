import { SuperheroService } from './../../services/superhero.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroes = [];

  constructor(private router: Router, private userService: UserService, private heroService: SuperheroService) { }

  ngOnInit(): void {
    this.userService.getCurrent()
      .subscribe(
        data => {
          if(!('email' in data))
            this.router.navigate(['/front-door']);
        },
        error => this.router.navigate(['/front-door'])
      );
  }

  getHero() {
    this.heroService.getSuperHero()
      .subscribe(data => {
          this.heroes.push(data);
        },
        error => console.error(error)
      );
  }

}
