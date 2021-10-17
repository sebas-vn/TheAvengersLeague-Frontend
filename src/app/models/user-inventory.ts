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

    combat: number = 0;
    durability: number = 0;
    intelligence: number = 0;
    power: number = 0;
    speed: number = 0;
    strength: number = 0;
    name:string = 'none';
    image: string = null;
    occupation: string = 'none';

    constructor() {}

}