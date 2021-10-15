import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingame-card-hero',
  templateUrl: './ingame-card-hero.component.html',
  styleUrls: ['./ingame-card-hero.component.css']
})
export class IngameCardHeroComponent implements OnInit {

  @Input() heroes = [];
  statView: boolean = true;
  currentViewStats: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
