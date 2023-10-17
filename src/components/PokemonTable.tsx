import { useState } from "react";
import { PokemonURL } from "../types";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { PokemonTableRow } from "./PokemonTableRow";
import { pokeapi } from "../services/GetPokemon";
import { TableColumnOptions } from "./TableColumnOptions";
import styles from './styles/PokemonTable.module.css';

type Props = {
    setCurrentPokemon: (pokemon: PokemonURL | null) => void;
    currentPokemon: PokemonURL | null;
    pokemoncount: number;
}

export const PokemonTable = (props: Props) => {
    const { data, error, isLoading } = pokeapi.endpoints.getPokemonList.useQuery(props.pokemoncount);

    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

    const handleNextPokemon = (pokemon: PokemonURL) => {
        if (data === undefined) return;
        if (data.results.indexOf(pokemon) === data.results.length - 1) {
            props.setCurrentPokemon(data.results[0]);
        } else {
            props.setCurrentPokemon(data.results[data.results.indexOf(pokemon) + 1]);
        }

    }

    const handlePreviousPokemon = (pokemon: PokemonURL) => {
        if (data === undefined) return;
        if (data.results.indexOf(pokemon) === 0) {
            props.setCurrentPokemon(data.results[data.results.length - 1]);
        } else {
            props.setCurrentPokemon(data.results[data.results.indexOf(pokemon) - 1]);
        }

    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (data === undefined) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (props.currentPokemon === null) {
                props.setCurrentPokemon(data.results[0]);
            } else {
                handleNextPokemon(props.currentPokemon);
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (props.currentPokemon === null) {
                props.setCurrentPokemon(data.results[data.results.length - 1]);
            } else {
                handlePreviousPokemon(props.currentPokemon);
            }
        }
    }


    return <Box className={styles.container}
    
        onKeyDown={(e) => handleKeyDown(e)}
    >
        <TableColumnOptions selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
        <TableContainer component={Paper}  className={styles.tablecontainer}>
            <Table>
                <TableHead>
                    <TableRow className={styles.tableheaderrow}>

                        {
                            selectedColumns.map((column: string) => (
                                <TableCell className={styles.headercell} key={column} align="center"><span>{column.charAt(0).toUpperCase() + column.slice(1)}</span></TableCell>
                            ))
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell align="center" colSpan={selectedColumns.length}>Loading...</TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell align="center" colSpan={selectedColumns.length}>Error...</TableCell>
                        </TableRow>
                    ) : data === undefined ? (
                        <TableRow>
                            <TableCell align="center" colSpan={selectedColumns.length}>Error...</TableCell>
                        </TableRow>
                    ) : data.results.map((row: PokemonURL) => (
                        <PokemonTableRow key={row.url} handleNextPokemon={handleNextPokemon} handlePreviousPokemon={handlePreviousPokemon} pokemon={row} selectedColumns={selectedColumns} setCurrentPokemon={props.setCurrentPokemon} currentPokemon={props.currentPokemon} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
};