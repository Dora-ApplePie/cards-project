import Button from '@mui/material/Button';
import React, {ChangeEvent, FC, useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import {Input} from "@mui/material";


type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id:string) => void
}

export const Packs = (props:PacksPropsType) => {
    let [title, setTitle] = useState('')

    const onChangeH = (e: ChangeEvent<HTMLInputElement>) => {
        return setTitle(e.currentTarget.value)
    }

    const deletePackHandler =()=> {
        if (title.trim() !== '') {
            props.deletePack(title);
            setTitle('')
        }
    }

    return (
        <div>
            <div>
                <Button onClick={props.getAllPacks}>All packs</Button>
                <Button onClick={props.getOnlyMyPacks}>My packs</Button>
            </div>
            <Button onClick={props.addPackHandler} disabled={props.status === 'loading'}>
                Add pack
            </Button>
            <Button onClick={deletePackHandler} disabled={props.status === 'loading'}>
                Delete pack
            </Button>

            <Input placeholder={'Enter pack id for delete'} onChange={onChangeH} value={title}/>
        </div>
    )
}