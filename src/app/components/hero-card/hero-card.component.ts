import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {

  @Input() heroes = [];
  statView: boolean = true;
  currentViewStats: string[] = []; // Array that stores variables that have view stats active

  constructor() { }

  ngOnInit(): void {
  }

  enableStatView(id: string) {
    this.currentViewStats.push(id);
    console.log(this.currentViewStats);
  }

  disableStatView(id: string) {
    if (this.currentViewStats.includes(id)) {
      this.currentViewStats.splice(this.currentViewStats.indexOf(id), 1);
    }
  }

  updateUrl(event) {
    event.target.attributes.src.value = "../../../assets/generic-hero.jpg"
  }

}
