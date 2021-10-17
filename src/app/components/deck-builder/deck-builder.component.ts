import { ModifyDecks } from './../../models/modify-user';
import { UserService } from 'src/app/services/user.service';
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
  deck: number[] = [];
  saveStatus: string = '';
  saveStatusColor: string = 'green';

  @Input() hero: boolean;
  user: User;
  inventory: UserInventory;

  constructor(private heroService: SuperheroService, private userService: UserService) { }

  ngOnInit(): void {}

  public loadInv(hero: boolean, user:User, inventory: UserInventory, deck: Card[]): void {

    this.hero = hero;
    this.user = user;
    this.inventory = inventory;

    this.deck = [];
    for(let card of deck) {
      this.deck.push(card.id);
    }

    for(let card of inventory.cards) {
      if(  card.affiliation == 'Neutral' || (card.affiliation == 'Hero' && this.hero) || (card.affiliation == 'Villain' && !this.hero)) {
        if(this.shouldGetCard(card)) {

          card.combat = 0;
          card.durability = 0;
          card.intelligence = 0;
          card.power = 0;
          card.speed = 0;
          card.strength = 0;
          card.name = 'none';
          card.image = '';
          card.occupation = 'none';
          
          //TODO: assign data from get api to the card
          /*
          this.heroService.getSuperHeroById(card.id)
            .subscribe(data => {
                console.log(data)
              },
              error => console.error(error)
            );
          */
        }
        this.cards.push(card);
      }
    }
  }

  private shouldGetCard(card: Card): boolean {
    return card.id > 0 && card.image == null;
  }

  getCard(id: number): Card {
    for(let  i = 0; i < this.cards.length; i++) {
      if(this.cards[i].id == id)
        return this.cards[i];
    }
    return new Card();
  }

  saveDeck():void {
    if(this.deck.length >= 5 && this.deck.length <= 20) {
      const modifyDeck: ModifyDecks = new ModifyDecks();
      if(this.hero)
        modifyDeck.heroDeck = this.deck;
      else
        modifyDeck.villianDeck = this.deck;

      this.userService.modifyDecks(modifyDeck)
        .subscribe(data => {
          if('email' in data.body) {
            this.saveStatus = 'Successfully saved deck';
            this.saveStatusColor = 'black';
          } else {
            this.saveStatus = 'Failed to save deck'
            this.saveStatusColor = 'red';
          }
        });
    } else {
      this.saveStatus = 'Deck must have at least 5 cards';
      this.saveStatusColor = 'red';
    }
  }

  removeCard(id: number) {
    const index:number = this.deck.indexOf(id);
    this.deck.splice(index,1);
  }

  addCard(id: number): void {
    if(this.deck.length > 20)
      return;
    if(id > 0) {
      for(let card of this.deck) {
        if(card == id)
          return;
      }
    }
    this.deck.push(id);
  }

}
