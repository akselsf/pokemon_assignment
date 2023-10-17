import '@testing-library/jest-dom';

import { PokemonTableRow } from '../components/PokemonTableRow';
import { PokemonURL } from '../types';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../ReduxStore';

const pokemon: PokemonURL = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
}

const allColumns: string[] = ["picture", "id", "name", "type", "weight", "height"];
const selectedColumns: string[] = ["picture", "id", "name", "type"];

type Props = {
    children: React.ReactNode;
}
const RenderContainer = (props: Props) => {
    return <Provider store={store}>
        <table>
            <thead></thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    </Provider>

}

test('PokemonTableRow renders without crashing', () => {
    const { container } = render(
        <RenderContainer>
            <PokemonTableRow pokemon={pokemon} selectedColumns={selectedColumns} setCurrentPokemon={() => { }} currentPokemon={null} handleNextPokemon={() => { }} handlePreviousPokemon={() => { }} />
        </RenderContainer>);

    expect(container).toBeInTheDocument();
});

test('PokemonTableRow shows the correct columns', () => {
    const { container } = render(
        <RenderContainer>
            <PokemonTableRow pokemon={pokemon} selectedColumns={selectedColumns} setCurrentPokemon={() => { }} currentPokemon={null} handleNextPokemon={() => { }} handlePreviousPokemon={() => { }} />
        </RenderContainer>);

    for (let column of allColumns) {
        if (column in selectedColumns) {
            expect(container).toHaveTextContent(column);
        } else {
            expect(container).not.toHaveTextContent(column);
        }
    }
});

test('PokemonTableRow fetches values and displays them', () => {
    const { container } = render(
        <RenderContainer>
            <PokemonTableRow pokemon={pokemon} selectedColumns={selectedColumns} setCurrentPokemon={() => { }} currentPokemon={null} handleNextPokemon={() => { }} handlePreviousPokemon={() => { }} />
        </RenderContainer>);

    waitFor(() => expect(container).toHaveTextContent("bulbasaur")).then(() => {
        const values = ["", "1", "bulbasaur", "grass, poison", "69", "7"]
        for (let i = 0; i < allColumns.length; i++) {
            if (selectedColumns.includes(allColumns[i])) {
                expect(container).toHaveTextContent(values[i]);
            } 
        }
        
    });


});
