export type AllPokemonResponse = {
    results: PokemonURL[];
}

export type PokemonURL = {
    name: string;
    url: string;
}

export type SinglePokemonResponse = {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: PokemonType[];
    sprites: {
        front_default: string;
    };
    stats: Stat[];
    
}

export type PokemonType = {
    type: {
        name: string;
    }
}
export type Stat = {
    base_stat: number;
    stat: {
        name: string;
    }
}
