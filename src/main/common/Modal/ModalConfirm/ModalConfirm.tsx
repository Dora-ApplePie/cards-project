import React, {FC} from 'react'
import {Button, Stack} from "@mui/material"
import s from './../ModalUpload.module.css'
import CloseIcon from "@mui/icons-material/Close";


type PropsType = {
    confirmHandler: (id: string) => void
    cancelHandler: () => void
    title: string
    packID?: string
    cardId?:string

}

export const ModalConfirm: FC<PropsType> = ({confirmHandler, cancelHandler, title,packID, cardId}) => {


    const successHandler = () => {
        if (packID) {
            confirmHandler(packID)
        } else if (cardId) {
            confirmHandler(cardId)
        }
    }


    return (
            <div className={s.wrapper}>
                <div className={s.modal}>
                    <div className={s.closeBtnWrapper}>
                        <Button className={s.buttonClose} onClick={cancelHandler} size="medium"><CloseIcon fontSize="large"/></Button>
                    </div>
                    <div className={s.title}>{title}</div>
                    <Stack  direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={successHandler}>Yes</Button>
                        <Button variant="contained" color="error" onClick={cancelHandler}>No</Button>
                    </Stack>
                </div>
            </div>
    )
}

