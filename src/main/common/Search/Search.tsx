import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React, {ChangeEvent} from "react";
import {useAppSelector} from "../../../app/hooks";

type TableRowPackType = {
    value: string
    callback: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Search = (props: TableRowPackType) => {
    const {value, callback} = props;

    const status = useAppSelector(state => state.app.status);

    return (
        <>
            <TextField
                fullWidth
                sx={{backgroundColor: 'rgb(239,239,239)', border: 'none', margin: '15px 0'}}
                size="small"
                color="secondary"
                placeholder="Search"
                disabled={status === 'loading'}
                value={value}
                onChange={callback}
                InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
            />
        </>
    )
}