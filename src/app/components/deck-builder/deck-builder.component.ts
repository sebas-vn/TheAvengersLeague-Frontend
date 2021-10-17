import { UserInventory } from './../../models/user-inventory';
import { Component, OnInit, Input } from '@angular/core';
import { SuperheroService } from './../../services/superhero.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit {

  cards = [];
  hero: boolean;
  user: User;
  inventory: UserInventory;

  constructor(private heroService: SuperheroService) { }

  ngOnInit(): void {}

  private loadInv(hero: boolean, user:User, inventory: UserInventory): void {
    this.hero = hero;
    this.user = user;
    this.inventory = inventory;
    
    for(let card of inventory.cards) {
      if( card.id > 0 && (card.affiliation == 'Neutral' || (card.affiliation == 'Hero' && this.hero) || (card.affiliation == 'Villain' && !this.hero))) {
        this.heroService.getSuperHeroById(card.id)
          .subscribe(data => {
              this.cards.push(data);
            },
            error => console.error(error)
          );
      }
    }
  }

  getHero(): void {
    this.heroService.getSuperHero()
      .subscribe(data => {
          this.cards.push(data);
        },
        error => console.error(error)
      );
  }

}
