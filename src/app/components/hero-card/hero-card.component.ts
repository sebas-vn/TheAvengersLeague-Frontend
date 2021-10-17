import { Component, Input, OnInit } from '@angular/core';
import { DeckBuilderComponent } from '../deck-builder/deck-builder.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input() heroes = [];
  @Input() hero: boolean = true;
  @Input() parent: DeckBuilderComponent;

  getBackground(): string {
    if(this.hero)
      return '#2e2ebb';
    else
      return '#bb2e2e';
  }
  getForeground(): string {
    if(this.hero)
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
