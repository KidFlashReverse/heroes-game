export interface HeroData {
    id: number,
    name: string,
    powerstats: {
        intelligence: string,
        strength: string,
        speed: string,
        durability: string,
        power: string,
        combat: string,
    }
    biography: {
        publisher: string,
        alignment: string,
    }
    appearance: {
        gender: string,
        race: string,
    }
    work: {
        base: string,
    }
    connections: {
        "group-affiliation": string,
    }
    image: {
        url: string,
    }
}