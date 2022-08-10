import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import useDebounce from "../../utils/useDebounce";
import {setPage, setSearchPackName} from "../../pages/Packs/PacksTable/packsTableReducer";

export const Search = () => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce<string>(value, 1000);

    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
        dispatch(setPage(1));
    }, [debouncedValue])

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);

    }

  return (
      <TextField
          fullWidth
          sx={{backgroundColor: 'rgba(234,219,255,0.68)'}}
          size="small"
          placeholder="Search"
          disabled={status === 'loading'}
          value={value}
          onChange={handleChangeValue}
          InputProps={{startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>}}
      />
  )
}