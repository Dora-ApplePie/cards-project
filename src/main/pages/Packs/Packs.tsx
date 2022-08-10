import Button from '@mui/material/Button';
import React from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import Stack from '@mui/material/Stack';

type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id: string) => void
    changeName: (id: string) => void
}

export const Packs = (props: PacksPropsType) => {

    return (
        <div>
            <span className={s.Addbtn}>
                <Stack direction='row' spacing={2} >
                    <Button color='success' variant="contained" onClick={props.getAllPacks}>All packs</Button>
                    <Button color='success' variant="contained" onClick={props.getOnlyMyPacks}>My packs</Button>
                </Stack>
                <div>
                    <Button color='success' variant="contained" startIcon={<LibraryAddIcon/>}
                            onClick={props.addPackHandler}
                            disabled={props.status === 'loading'}>
                        Add pack
                    </Button>
                </div>
            </span>
            <PacksTable/>
        </div>
    )
}