import React from "react"

import playersIcon from "@assets/img/players-ico.png"
import fieldIcon from "@assets/img/field-ico.png"
import "./room.scss"

const GameRoom = ({gameRoomData, onConnect}) => {
    const connectedPlayersCount = Object.keys(gameRoomData.connectedPlayers).length

    const masterAvatar = gameRoomData.master.avatar

    console.log('master avatar', masterAvatar)

    return (
        <div
            className="game-room"
            onClick={() => onConnect(gameRoomData.roomId)}
        >
            <div className="game-room__wrapper">
                <div
                    className="game-room__avatar"
                    style={{
                        backgroundImage: `url(${masterAvatar})`
                    }}
                >
                </div>

                <div className="game-room__element room-naming">
                    <span className="room-naming__name">{gameRoomData.name}</span>
                    <span className="room-naming__creator">{gameRoomData.master.nickname}</span>
                </div>

                <div className="game-room__element create-room-element">
                    <div
                        className="create-room-element__icon icon"
                        style={{
                            backgroundImage: `url(${playersIcon})`
                        }}
                    ></div>

                    <div className="create-room-element__text">
                        <span className="create-room-element__value-label">{connectedPlayersCount}</span>
                        <span className="create-room-element__value-separator">/</span>
                        <span className="create-room-element__value-label">{gameRoomData.maxPlayers}</span>
                    </div>
                </div>

                <div className="game-room__element create-room-element">
                    <div
                        className="create-room-element__icon icon"
                        style={{
                            backgroundImage: `url(${fieldIcon})`
                        }}
                    ></div>

                    <div className="create-room-element__text">
                        <span className="create-room-element__value-label">{gameRoomData.fieldW}</span>
                        <span className="create-room-element__value-label">:</span>
                        <span className="create-room-element__value-label">{gameRoomData.fieldH}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameRoom
