export class UserInventory {

    id: number;
    cards: Card[];

    constructor(id: number, cards: Card[]) {}

}

export class Card {

    id: number;
    powerCost: number;
    affiliation: string;
    ability: string;
    abilityDesc: string;

    combat: number;
    durability: number;
    intelligence: number;
    power: number;
    speed: number;
    strength: number;
    name:string;
    image: string;

    constructor() {
        
    }

}