import { UserInventory, Card } from './../../models/user-inventory';
import { Component, OnInit, Input } from '@angular/core';
import { SuperheroService } from './../../services/superhero.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit {

  cards: Card[] = [];
  @Input() hero: boolean;
  user: User;
  inventory: UserInventory;

  constructor(private heroService: SuperheroService) { }

  ngOnInit(): void {}

  public loadInv(hero: boolean, user:User, inventory: UserInventory): void {
    this.hero = hero;
    this.user = user;
    this.inventory = inventory;
    
    console.log(inventory);

    for(let card of inventory.cards) {
      if(  card.affiliation == 'Neutral' || (card.affiliation == 'Hero' && this.hero) || (card.affiliation == 'Villain' && !this.hero)) {
        if(this.shouldGetCard(card)) {
          this.heroService.getSuperHeroById(card.id)
            .subscribe(data => {
                //TODO: assign data from get to the card
                console.log(data)
              },
              error => console.error(error)
            );
        }
        this.cards.push(card);
      }
    }
  }

  private shouldGetCard(card: Card): boolean {
    //return card.id > 0 && card.image == null;
    return false; //since the api isn't working, let's avoiding spamming the console
  }

}
