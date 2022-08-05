import Button from '@mui/material/Button';
import React, {ChangeEvent, useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import {Input} from "@mui/material";
import PacksTable from "./PacksTable/PacksTable";


type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id: string) => void
    changeName:(id:string|null)=>void
}

export const Packs = (props: PacksPropsType) => {
    let [title, setTitle] = useState('')
    let [id, setId] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        return setTitle(e.currentTarget.value)
    }

    const onChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        return setId(e.currentTarget.value)
    }

    const deletePackHandler = () => {
        if (title.trim() !== '') {
            props.deletePack(title);
            setTitle('')
        }
    }

    const onChangePackHandler=()=> {
        props.changeName(id)
        setId('')
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
            <div>
                <Button onClick={deletePackHandler} disabled={props.status === 'loading'}>
                    Delete pack
                </Button>
                <Input placeholder={'Enter pack id to delete'} onChange={onChange} value={title}/>
            </div>

            <Button onClick={onChangePackHandler} disabled={props.status === 'loading'}>
                update pack name
                <Input placeholder={'Enter pack id to update name'} onChange={onChange1} value={id}/>

            </Button>
            <PacksTable/>

        </div>
    )
}