import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AllPokemonResponse, PokemonURL, SinglePokemonResponse } from '../types';

export const pokeapi = createApi({
    reducerPath: 'pokeapi',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
      getPokemonList: builder.query<AllPokemonResponse, Number>({
        query: (limit: Number) => `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
      }),
      getSpecificPokemon: builder.query<SinglePokemonResponse, PokemonURL>({
        query: (pokemon: PokemonURL) => pokemon.url,
    }),
  })
})
  
  export const { useGetPokemonListQuery, useGetSpecificPokemonQuery } = pokeapi;