export interface Gameboard {
    "turn": number,
    "state": number,
    "gameBoard": [
        {
            "x": number,
            "y": number,
            "uuid": string,
            "affiliation": string,
            "type": string,
            "card": {
                "id": number,
                "powerCost": number,
                "affiliation": string,
                "ability": string,
                "abilityDesc": string
            },
            "health": number
        }
    ],
    "events": [],
    "power": number,
    "hand": [
        {
            "id": number,
            "powerCost": number,
            "affiliation": string,
            "ability": string,
            "abilityDesc": string,
            "combat": number,
            "durability": number,
            "intelligence": number,
            "power": number,
            "speed": number,
            "strength": number,
            "name": string,
            "image": string
        }
    ]
}
