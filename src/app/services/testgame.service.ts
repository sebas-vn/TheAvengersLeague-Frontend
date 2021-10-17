import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestgameService {

  constructor() { }

  response = {
    "turn": 0,
    "state": 0,
    "gameBoard": [
      {
        "x": 6,
        "y": 10,
        "uuid": "1357a76e-b7f1-440d-9e49-5716e6406b64",
        "affiliation": "villain",
        "type": "CommanderGameCard",
        "card": {
          "id": 423,
          "powerCost": 7,
          "affiliation": "Villain",
          "ability": "Leader",
          "abilityDesc": "+1 power each round when on the field."
        },
        "health": 84
      },
      {
        "x": 6,
        "y": 0,
        "uuid": "671d4e57-b081-4d5e-8615-86dae7bb77b6",
        "affiliation": "hero",
        "type": "CommanderGameCard",
        "card": {
          "id": 149,
          "powerCost": 5,
          "affiliation": "Hero",
          "ability": "Leader",
          "abilityDesc": "+1 power each round when on the field."
        },
        "health": 55
      }
    ],
    "events": [],
    "power": 3,
    "hand": [
      {
        "id": -1,
        "powerCost": 1,
        "affiliation": "Hero",
        "ability": "Support",
        "abilityDesc": "+5% Combat bonus to adjacent Super Heros.",
        "combat": 18,
        "durability": 18,
        "intelligence": 18,
        "power": 18,
        "speed": 18,
        "strength": 18,
        "name": "Police Officer",
        "image": "https://www.pngfind.com/pngs/m/66-665071_police-officer-police-officer-png-transparent-png.png"
      },
      {
        "id": 346,
        "powerCost": 8,
        "affiliation": "Hero",
        "ability": "Ranged 1",
        "abilityDesc": "Can attack enemies 1 space away."
      }
    ]
  }


  public getGamePlay(): Observable<any> {
    let r = new Observable<any>(subscriber => {
      subscriber.next(this.response);
    });
    
    return r;
  }
}
