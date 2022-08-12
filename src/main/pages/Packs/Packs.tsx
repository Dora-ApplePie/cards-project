import Button from '@mui/material/Button';
import React from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import {CardSlider} from "../../common/CardSlider/CardSlider";

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
                <div>
                    <Button color={"secondary"} variant="outlined" onClick={props.getAllPacks}>All packs</Button>
                    <Button color={"secondary"} variant="outlined" onClick={props.getOnlyMyPacks}>My packs</Button>
                </div>
                <div>
                    <Button startIcon={<LibraryAddIcon/>}
                            onClick={props.addPackHandler}
                            disabled={props.status === 'loading'}>
                        Add pack
                    </Button>
                </div>
            </span>
            <CardSlider/>
            <PacksTable/>
        </div>
    )
}