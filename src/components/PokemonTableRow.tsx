import { PokemonURL } from "../types";
import { TableRow, TableCell } from "@mui/material";
import { pokeapi } from "../services/GetPokemon";
import { blue } from '@mui/material/colors';


type Props = {
    pokemon: PokemonURL;
    selectedColumns: string[];
    setCurrentPokemon: (pokemon: PokemonURL | null) => void;
    currentPokemon: PokemonURL | null;
    handleNextPokemon: (pokemon: PokemonURL) => void;
    handlePreviousPokemon: (pokemon: PokemonURL) => void;
}

export const PokemonTableRow = (props: Props) => {
  
    const getValue = (key: string) => {
        switch (key) {
            case "picture":
                return <img src={data?.sprites.front_default} alt="Sprite missing"/>;
            case "id":
                return data?.id;
            case "name":
                return data?.name;
            case "type":
                return data?.types.map((type: any) => type.type.name).join(", ");
            case "weight":
                return data?.weight;
            case "height":
                return data?.height;
            default:
                return "";
        }

    }

   

    const { data, error, isLoading } = pokeapi.endpoints.getSpecificPokemon.useQuery(props.pokemon);

    return <TableRow
    tabIndex={0}
        
        style={{ cursor: "pointer", backgroundColor: props.currentPokemon?.name == props.pokemon.name ? blue[100] : "white" }}
        
        key={props.pokemon.name}
        onClick={() => {
            if (props.currentPokemon?.name == props.pokemon.name) {
                props.setCurrentPokemon(null);
            } else if (data != undefined) {
                props.setCurrentPokemon(props.pokemon);
            }
        }}

      
    >
        {isLoading ? (
            <TableCell align="center">Loading...</TableCell>
        ) : error ? (
            <TableCell align="center">Error...</TableCell>
        ) : (
            data == undefined ? "" : props.selectedColumns.map((column: string) => (
                <TableCell key={column} align="center">{getValue(column)}</TableCell>
              ))
        )
        
}
      
    </TableRow>
};