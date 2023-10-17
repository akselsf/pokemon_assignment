import { useState } from 'react';
import { PokemonTable } from './PokemonTable';
import { PokemonCard } from './PokemonCard';
import { PokemonURL } from '../types';
import styles from './styles/PokemonApp.module.css';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors'



export const PokemonApp = () => {
    
    const [currentPokemon, setCurrentPokemon] = useState<PokemonURL | null>(null);
    const POKEMON_COUNT = 30;
    

    
    return <div className={styles.appContainer}>
        <h1 className={styles.header} style={{color: blue["700"]}} >Pokemon</h1>
        <p className={styles.subtext} style={{color: blue["700"]}}>Select a pokemon from the list to show detailed information.</p>
        <Box className={styles.contentcontainer}>
       
            <PokemonTable setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon} pokemoncount={POKEMON_COUNT}/>
        {
        
            currentPokemon == null ? <div></div> : <PokemonCard pokemon={currentPokemon}/>
        }
        </Box>
    </div>
}