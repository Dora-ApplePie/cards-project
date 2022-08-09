import React, {ChangeEvent, FC} from 'react'
import {useParams} from 'react-router-dom';
import {Button, Input} from "@mui/material";

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

export const ModalBase: FC<PropsType> = ({
                                             packId,
                                             closeModal,
                                             input,
                                             onChangeText,
                                             addTextHandler,
                                             title,
                                             addNewItemHandler,
                                             isAddingForm
                                         }) => {
    const paramsPack = useParams<{ packId: string }>()
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
        <div>
            <div>
                <div>
                    <Button onClick={closeModal}><span>&times;</span></Button>
                </div>
                <div>{title}</div>
                <div>
                    <Input onChange={onChangeCallback} value={input}/>
                    <Button onClick={isAddingForm ? successAddHandler : successHandler} disabled={!input}
                    >Ok</Button>
                </div>
            </div>
        </div>
    )
}

