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
    occupation: string;

    constructor(id=0, powerCost=0, affiliation='Neutral', ability='none', abilityDesc='none',
                combat = 0, durability = 0, intelligence = 0, power = 0, speed = 0, strength = 0,
                name = 'none', image='none', occupation='none') {
        this.id = id;
        this.powerCost = powerCost;
        this.affiliation = affiliation;
        this.ability = ability;
        this.abilityDesc = abilityDesc
        this.combat = combat;
        this.durability = durability;
        this.intelligence = intelligence;
        this.power = power;
        this.speed = speed;
        this.strength = strength;
        this.name = name;
        this.image = image;
        this.occupation = occupation;
    }

}