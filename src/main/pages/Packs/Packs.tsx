import Button from '@mui/material/Button';
import React from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';


type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id: string) => void
    changeName:(id:string)=>void
}

export const Packs = (props: PacksPropsType) => {

    return (
        <div>
            <div>
                <Button onClick={props.getAllPacks}>All packs</Button>
                <Button onClick={props.getOnlyMyPacks}>My packs</Button>
            </div>
            <Button  startIcon={<LibraryAddIcon />} onClick={props.addPackHandler} disabled={props.status === 'loading'}>
                Add pack
            </Button>
            <PacksTable/>
        </div>
    )
}