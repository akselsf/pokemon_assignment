import { PokemonURL, Stat } from "../types";
import { Box } from "@mui/system";
import { Paper, TableBody, Table, TableRow, TableCell } from "@mui/material";
import styles from './styles/PokemonCard.module.css';
import { pokeapi } from "../services/GetPokemon";


type Props = {
    pokemon: PokemonURL;
}

export const PokemonCard = (props: Props) => {
    const { data, error, isLoading } = pokeapi.endpoints.getSpecificPokemon.useQuery(props.pokemon);

    const getStat = (stat: string) => {
        if (data === undefined) return "";

        const filtered: Stat[] = data.stats.filter((s) => s.stat.name === stat);
        return filtered.length > 0 ? filtered[0].base_stat : 0;
    }



    return (<Box
        className={styles.container}
        component={Paper}


    >
        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error</div>
        ) : data !== undefined ? (

            <Box
                className={styles.container}

            >
                <h1 className={styles.nameheader}>{data.name.charAt(0).toUpperCase() + data.name.slice(1)+"#"+data.id}</h1>
                <img className={styles.pokemonsprite} src={data.sprites.front_default} alt="" />
                <Table className={styles.table}>
                    <TableBody>
                       
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{data.types.map((type) => type.type.name).join(", ")}</TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell>Base-HP</TableCell>
                            <TableCell>{getStat("hp")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Base-ATK</TableCell>
                            <TableCell>{getStat("attack")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Base-DEF</TableCell>
                            <TableCell>{getStat("defense")}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        )
            : <div>Error</div>
        }



    </Box>)

}