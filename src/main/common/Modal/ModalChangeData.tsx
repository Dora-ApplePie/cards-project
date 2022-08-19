import React, {ChangeEvent, FC} from 'react'
import {useParams} from 'react-router-dom';
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import s from './Modal.module.css'
import CloseIcon from '@mui/icons-material/Close';
type PropsType = {
    closeModal: () => void
    input: string
    onChangeText: (value: string) => void
    addTextHandler?: (id: string, value: string) => void
    addNewItemHandler?: (value: string) => void
    title: string
    isAddingForm: boolean
    packId: string
}

export const ModalChangeData: FC<PropsType> = ({
                                             packId,
                                             closeModal,
                                             input,
                                             onChangeText,
                                             addTextHandler,
                                             title,
                                             addNewItemHandler,
                                             isAddingForm
                                         }) => {
    const paramsCard = useParams<{ cardId: string }>()

    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeText(event.currentTarget.value)
    }
    const successHandler = () => {
        if (packId) {
            addTextHandler && addTextHandler(packId, input)
        } else if (paramsCard.cardId) {
            addTextHandler && addTextHandler(paramsCard.cardId, input)
        }
    }

    const successAddHandler = () => {
        addNewItemHandler && addNewItemHandler(input)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.modal}>
                <div className={s.closeBtnWrapper}>
                    <Button color="secondary" className={s.buttonClose} onClick={closeModal} size="medium"><CloseIcon fontSize="large"/></Button>
                </div>
                <div className={s.title}>{title}</div>
                <div>
                    <Input color="secondary"  className={s.input} onChange={onChangeCallback} value={input} autoFocus={true}/>
                    <Button color="secondary" className={s.buttonAccept} onClick={isAddingForm ? successAddHandler : successHandler} disabled={!input}
                    >Ok</Button>
                </div>
            </div>
        </div>
    )
}