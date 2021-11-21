import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import "./chat.scss"
import io from "@api/web-socket"
import { sendMessage as sendMessageApi, getMessages as getMessagesApi } from "@api/web-socket-api"
import ChatMessage from "@components/game/chat-message"
import AddChatMessageForm from "@components/game/add-chat-message-form"

const Chat = ({chatHidden}) => {
    const playersInGame   = useSelector(({game}) => game.currentGameRoom.connectedPlayers)

    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)
    const [messages, setMessages] = useState([])

    const onNewMessage = useCallback(async () => {
        setMessages(await getMessagesApi())

        if (chatHidden) {
            setUnreadMessagesCount((state) => state + 1)
        }
    }, [chatHidden])

    useEffect(() => {
        io.on('chat:thereIsNewMessage', onNewMessage)

        return () => {
            io.off('chat:thereIsNewMessage', onNewMessage)
        }
    }, [onNewMessage])

    useEffect(() => {
        if (!chatHidden) {
            setUnreadMessagesCount(0)
        }
    }, [chatHidden])

    const onSendMessage = useCallback((message) => {
        sendMessageApi(message)
    }, [])

    const playersNicknames = Object.keys(playersInGame).map((playerId) => playersInGame[playerId].nickname)

    return (
        <>
            <span
                className={'chat-notification'
                    +
                    (!chatHidden || unreadMessagesCount < 1 ? '' : ' chat-notification--show')}
            >
                {unreadMessagesCount}
            </span>
            <div
                className={'game-modal game-chat ' + (chatHidden ? '' : 'game-chat--show')}
            >
                <div className="game-chat__messages">
                    {messages && messages.map((message) =>
                        <ChatMessage
                            message={{
                                senderAvatar: playersInGame[message.senderId].avatar,
                                senderNickname: playersInGame[message.senderId].nickname,
                                arrivalTime: message.createTime / 1000,
                                text: message.text,
                            }}
                            roomParticipants={playersNicknames}
                        />
                    )}
                </div>

                <AddChatMessageForm
                    onSubmit={onSendMessage}
                />
            </div>
        </>
    )
}

export default Chat
