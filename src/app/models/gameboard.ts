import { Card } from "./user-inventory";

export class GameBoard {
    
    turn: number;
    state: number;
    power: number;
    status: string;
    events: string[];
    hand: Card[];
    gameObjects: GameObject[];

    constructor(turn: number = -1, state:number = 0, power:number = 0, status: string = '', events: string[] = [], hand: Card[] = [], gameObjects: GameObject[] = []) {
        this.turn = turn;
        this.state = state;
        this.power = power;
        this.status = status;
        this.events = events;
        this.hand = hand;
        this.gameObjects = gameObjects;
    }

}

export class GameObject {

    x: number;
    y: number;
    health: number;
    uuid: string;
    affiliation: string;
    type: string;
    card: Card;

    constructor(x: number = 0, y: number = 0, health: number = 0, uuid:string = '', affiliation: string = 'Neutral', type: string = '', card: Card = null) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.uuid = uuid;
        this.affiliation = affiliation
        this.type = type
        this.card = card
    }

}

export class GameUpdate {
    power: number;
    hand: number[];
    moves: GameObjectMoves[];

    constructor(power: number, hand: number[], moves: GameObjectMoves[]) {
        this.power = power;
        this.hand = hand;
        this.moves = moves;
    }
}

export class GameObjectMoves {

    uuid: string;
    id: number;
    x: number;
    y: number;

    constructor(uuid: string = null, id = 0, x: number, y: number) {

    }
}
