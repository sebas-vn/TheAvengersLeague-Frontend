import { Card } from "./user-inventory";

export class UserDecks {

    id: number;
    heroDeck: Card[];
    villianDeck: Card[];

    constructor(id: number, heroDeck: Card[], villianDeck: Card[]) {}

}
