
import { FormGroup, FormControlLabel, Checkbox, Box, Typography, Paper } from '@mui/material';
import { useEffect } from 'react';
import styles from './styles/TableColumnOptions.module.css';

type Props = {
    selectedColumns: string[];
    setSelectedColumns: (selectedColumns: string[]) => void;
}

export const TableColumnOptions = (props: Props) => {
    const COLUMNS = ["picture", "id", "name", "type", "weight", "height"];
    const OPTIONAL_COLUMNS = ["picture", "type", "weight", "height"];

    // set columns to get correct order
    const setColumns = (cols: string[]) => {
        let newstate: string[] = [];
        COLUMNS.forEach((column: string) => {
            if (cols.includes(column) || !OPTIONAL_COLUMNS.includes(column)) {
                newstate.push(column);
            }
        });
        localStorage.setItem("pokemonlist.selectedColumns", newstate.join(","));
        props.setSelectedColumns(newstate);
    };

    // get localstorage and set state
    useEffect(() => {
        const storedColumns: string[] = localStorage.getItem("pokemonlist.selectedColumns")?.split(",") || [""];
        setColumns(storedColumns);
    }, []);

    // update state + set localstorage
    const handleClick = (event: React.BaseSyntheticEvent) => {
        let newstate = [...props.selectedColumns];
        if (event.target.checked) {
            newstate.push(event.target.name);
        } else {
            newstate.splice(newstate.indexOf(event.target.name), 1);
        }
        localStorage.setItem("pokemonlist.selectedColumns", newstate.join(","));

        setColumns(newstate);

    };

    return (
        <Box 
        className={styles.container} component={Paper}>
            <Box className={styles.innercontainer}>
            <Typography fontWeight={"bold"} className={styles.optionsheader}>
                Toggle Columns
            </Typography>
            <FormGroup
                className={styles.checkboxcontainer}
            
            >
                {OPTIONAL_COLUMNS.map((column: string) => (
                    <FormControlLabel className={styles.checkbox}
                        key={column}
                        control={<Checkbox checked={props.selectedColumns.includes(column)} onChange={handleClick} name={column} />}
                        label={column.charAt(0).toUpperCase() + column.slice(1)}
                    />
                ))}
            </FormGroup>
            </Box>
        </Box>)
}; 