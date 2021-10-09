import { SuperheroService } from './../../services/superhero.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  heroes = [];

  constructor(private heroService: SuperheroService) { }

  ngOnInit(): void {
  }

  getHero() {
    this.heroService.getSuperHero()
      .subscribe(
        data => this.heroes.push(data),
        error => console.error(error)
      );
  }

}
