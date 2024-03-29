import React, {ChangeEvent, FC, KeyboardEvent} from 'react'
import Button from '@mui/material/Button';
import Input from "@mui/material/Input";
import s from './Modal.module.css'
import CloseIcon from "@mui/icons-material/Close";


type PropsType = {
    closeModal: () => void
    question: string
    answer: string
    onChangeQuestion: (value: string) => void
    onChangeAnswer: (value: string) => void
    addTextHandler: (id: string, value1: string, value2: string) => void
    title: string
    cardId?: string
    packId?: string
}

export const ModalCard: FC<PropsType> = ({
                                             closeModal,
                                             question,
                                             onChangeQuestion,
                                             onChangeAnswer,
                                             addTextHandler,
                                             title,
                                             cardId,
                                             answer,
                                             packId
                                         }) => {

    const onChangeCallbackForQuestion = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeQuestion(event.currentTarget.value)
    }

    const onChangeCallbackForAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeAnswer(event.currentTarget.value)
    }

    const successHandler = () => {
        if (cardId) {
            addTextHandler(cardId, question, answer)
        } else if (packId) {
            addTextHandler(packId, question, answer)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    console.log(cardId)


    return (
        <div className={s.wrapper} onClick={closeModal} onKeyUp={onKeyPressHandler}>
            <div className={s.modal} onClick={e => {e.stopPropagation()}}>
                <div className={s.closeBtnWrapper}>
                    <Button color="secondary"  className={s.buttonClose} onClick={closeModal} size="medium">
                        <CloseIcon fontSize="large"/>
                    </Button>
                </div>
                <div className={s.title}>{title}</div>
                <div >
                    <Input color='secondary' className={s.input}  onChange={onChangeCallbackForQuestion}  value={question} autoFocus={true}
                                    placeholder='question'/>
                    <Input color='secondary' className={s.input}  onChange={onChangeCallbackForAnswer}
                                    value={answer}
                                    placeholder='answer'/>
                    <Button color="secondary" className={s.buttonAccept} onClick={successHandler}
                                 disabled={!(question && answer)}>Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}

