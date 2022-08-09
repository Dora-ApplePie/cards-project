import React, {ChangeEvent, FC} from 'react'
import {useParams} from 'react-router-dom';
import {Button} from "@material-ui/core";
import {Input} from "@mui/material";

type PropsType = {
    closeModal: () => void
    inputFirst: string
    inputSecond: string
    onChangeTextFirst: (value: string) => void
    onChangeTextSecond: (value: string) => void
    addTextHandler: (id: string, value1: string, value2: string) => void
    title: string
}

export const ModalCard: FC<PropsType> = ({
                                             closeModal,
                                             inputFirst,
                                             onChangeTextFirst,
                                             onChangeTextSecond,
                                             addTextHandler,
                                             title, inputSecond
                                         }) => {
    const paramsCard = useParams<{ cardId: string }>()
    const params = useParams<{ packId: string }>()

    const onChangeCallbackForFirstInput = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeTextFirst(event.currentTarget.value)
    }

    const onChangeCallbackForSecondInput = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeTextSecond(event.currentTarget.value)
    }

    const successHandler = () => {
        if (paramsCard.cardId) {
            addTextHandler(paramsCard.cardId, inputFirst, inputSecond)
        } else if (params.packId) {
            addTextHandler(params.packId, inputFirst, inputSecond)
        }
    }


    return (
        <div>
            <div>
                <div >
                    <Button onClick={closeModal} >
                        <span >&times;</span>
                    </Button>
                </div>
                <div >{title}</div>
                <div >
                    <Input onChange={onChangeCallbackForFirstInput}  value={inputFirst}
                                    placeholder='question'/>
                    <Input onChange={onChangeCallbackForSecondInput}
                                    value={inputSecond}
                                    placeholder='answer'/>
                    <Button  onClick={successHandler}
                                 disabled={!(inputFirst || inputSecond)}>Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}

