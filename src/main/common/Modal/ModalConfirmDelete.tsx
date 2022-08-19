import React, {FC} from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import s from './Modal.module.css'
import CloseIcon from "@mui/icons-material/Close";


type PropsType = {
    confirmHandler: (id: string) => void
    closeModal: () => void
    title: string
    packID?: string
    cardId?:string

}

export const ModalConfirmDelete: FC<PropsType> = ({confirmHandler, closeModal, title,packID, cardId}) => {


    const successHandler = () => {
        if (packID) {
            confirmHandler(packID)
        } else if (cardId) {
            confirmHandler(cardId)
        }
    }


    return (
            <div className={s.wrapper} onClick={closeModal}>
                <div className={s.modal}  onClick={e => {e.stopPropagation()}}>
                    <div className={s.closeBtnWrapper}>
                        <Button color="secondary" className={s.buttonClose} onClick={closeModal} size="medium"><CloseIcon fontSize="large"/></Button>
                    </div>
                    <div className={s.title}>{title}</div>
                    <Stack  direction="row" spacing={2}>
                        <Button color="secondary" variant="outlined" onClick={successHandler}>Delete</Button>
                        <Button color="secondary" variant="contained" onClick={closeModal}>Cancel</Button>
                    </Stack>
                </div>
            </div>
    )
}

