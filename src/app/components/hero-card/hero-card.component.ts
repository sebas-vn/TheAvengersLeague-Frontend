import { Component, Input, OnInit } from '@angular/core';
import { DeckBuilderComponent } from '../deck-builder/deck-builder.component';
import { Card } from 'src/app/models/user-inventory';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Card = new Card();
  @Input() isHero: boolean;
  @Input() parent: DeckBuilderComponent;

  getBackground(): string {
    if(this.isHero)
      return '#2e2ebb';
    else
      return '#bb2e2e';
  }

  getForeground(): string {
    if(this.isHero)
      return '#DDDDFF';
    else
      return '#FFDDDD'
  }

  constructor() { }

  ngOnInit(): void {}

  updateUrl(event) {
    event.target.attributes.src.value = "../../../assets/generic-hero.jpg"
  }

  addCard(id: number): void {
    this.parent.addCard(id);
  }

}
