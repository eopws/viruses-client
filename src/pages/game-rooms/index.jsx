import React, { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import { fetchRooms, createGameRoom, connectToGameRoom } from "@redux/actions/game"

import GameRoom from "@components/game-rooms/game-room"
import NumberField from "@components/shared/number-field"
import playersIcon from "@assets/img/players-ico.png"
import fieldIcon from "@assets/img/field-ico.png"
import { TextField } from "@components/shared"
import playersVirus from "@assets/virus.png"
import playersAvatar from "@assets/avatar.png"
import "./game-rooms.scss"

// баг с загрузкой аватарки

const GameRooms = memo(() => {
    const dispatch = useDispatch()
    const gameRooms = useSelector(({game}) => game.gameRooms)
    const { config, configAvailable}    = useSelector(({config}) => config)
    const { currentGameRoom: gameRoom } = useSelector(({game}) => game)

    const [fieldW, setFieldW]             = useState(0)
    const [fieldH, setFieldH]             = useState(0)
    const [playersCount, setPlayersCount] = useState()
    const [roomName, setRoomName]         = useState()

    const history = useHistory()

    useEffect(() => {
        dispatch(fetchRooms())
    }, [])

    useEffect(() => {
        if (gameRoom) {
            history.push('/room-waiting')
        }
    }, [gameRoom])

    const onCreateGameRoom = () => {
        dispatch(createGameRoom({
            fieldW,
            fieldH,
            name: roomName,
            playersCount
        }, {
            nickname: config?.player?.items?.nickname?.value,
            playersVirus,
            playersAvatar,
            color: config?.player?.items?.color?.value
        }))
    }

    const onConnectToGameRoom = (roomId) => {
        dispatch(connectToGameRoom(roomId, {
            nickname: config?.player?.items?.nickname?.value,
            playersVirus,
            playersAvatar,
            color: config?.player?.items?.color?.value
        }))
    }

    if (!configAvailable) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="game-rooms-container">
            <div className="game-rooms">
                <div className="game-rooms__list">
                    {Object.keys(gameRooms).map((gameRoomId) =>
                        <GameRoom
                            key={gameRoomId}
                            gameRoomData={gameRooms[gameRoomId]}
                            onConnect={onConnectToGameRoom}
                        />
                    )}
                </div>

                <div className="game-rooms__create-room create-room">
                    <div className="create-room__wrapper">
                        <div className="create-room__element create-room-element">
                            <div
                                className="create-room-element__icon icon"
                                style={{
                                    backgroundImage: `url(${playersIcon})`
                                }}
                            ></div>

                            <div className="create-room-element__text">
                                <NumberField
                                    className="create-room__players-input"
                                    min={2}
                                    max={4}
                                    setValueHandler={(newPlayesCount) => setPlayersCount(newPlayesCount)}
                                />
                            </div>
                        </div>

                        <div className="create-room__element create-room-element">
                            <div
                                className="create-room-element__icon icon"
                                style={{
                                    backgroundImage: `url(${fieldIcon})`
                                }}
                            ></div>

                            <div className="create-room-element__text">
                                <NumberField
                                    className="create-room__field-size-input"
                                    setValueHandler={(newFieldW) => setFieldW(newFieldW)}
                                />
                                <span className="create-room-element__value-separator">:</span>
                                <NumberField
                                    className="create-room__field-size-input"
                                    setValueHandler={(newFieldH) => setFieldH(newFieldH)}
                                />
                            </div>
                        </div>

                        <div className="create-room__element create-room-element">
                            <div className="create-room-element__text">
                                <span className="create-room-element__value-label">name:</span>
                                <TextField
                                    className="create-room__room-name"
                                    setValueHandler={(newRoomName) => setRoomName(newRoomName)}
                                />
                            </div>
                        </div>

                        <div className="create-room__element">
                            <button
                                className="create-room__start-btn"
                                onClick={onCreateGameRoom}
                            >Start game</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="blackout" />
        </div>
    )
})

export default GameRooms
