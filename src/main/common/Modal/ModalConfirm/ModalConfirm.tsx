import React, {FC} from 'react'
import {Button} from "@mui/material";

type PropsType = {
    confirmHandler: (id: string) => void
    cancelHandler: () => void
    title: string
    packID?: string
    cardId?: string

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
        <>
            <div>
                <div>
                    <div>
                        <Button onClick={cancelHandler}><span>&times;</span></Button>
                    </div>
                    <div>{title}</div>
                    <div>
                        <Button onClick={successHandler}>Yes</Button>
                        <Button onClick={cancelHandler}>No</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

