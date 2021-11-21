import React, { useState } from "react"
import sendMsgIcon from "@assets/img/game/send-icon.png"

const AddChatMessageForm = ({onSubmit}) => {
    const [sendMessageInput, setSendMessageInput] = useState('')

    const onMessageInputChange = (e) => {
        setSendMessageInput(e.target.value)
    }

    const onClickSend = () => {
        onSubmit(sendMessageInput)
        setSendMessageInput('')
    }

    return (
        <div className="game-chat__add-message-form add-chat-message-form">
            <input
                className="add-chat-message-form__input"
                placeholder="type a message..."
                value={sendMessageInput}
                onChange={onMessageInputChange}
            />
            <i
                className="add-chat-message-form__send-icon"
                onClick={onClickSend}
                style={{
                    backgroundImage: `url(${sendMsgIcon})`
                }}
            ></i>
        </div>
    )
}

export default AddChatMessageForm
