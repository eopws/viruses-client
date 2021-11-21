import React from "react"

import formatTime from "@utils/format-time"

const ChatMessage = ({message, roomParticipants}) => {
    function highlihtMentions(message, participants) {
        let div = document.createElement('div')
        div.innerHTML = message

        let messageModified = div.innerText

        for (const player of participants) {
            messageModified = messageModified.replace(`@${player}`, `<i class="mention">@${player}</i>`)
        }

        return messageModified
    }

    return (
        <div className="game-chat-message">
            <div className="game-chat-message__avatar-container">
                <img src={message.senderAvatar} />
            </div>
            <div className="game-chat-message__message-body">
                <div className="game-chat-message__top-line">
                    <span className="game-chat-message__nickname">{message.senderNickname}</span>
                    <i className="game-chat-message__top-line-separator" />
                    <span className="game-chat-message__time">{formatTime(message.arrivalTime)}</span>
                </div>

                <p
                    className="game-chat-message__text"
                    dangerouslySetInnerHTML={{__html: highlihtMentions(message.text, roomParticipants)}}
                />
            </div>
        </div>
    )
}

export default ChatMessage
