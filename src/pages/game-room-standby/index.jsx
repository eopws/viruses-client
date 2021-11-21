import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import io from "@api/web-socket"
import { clearGameData } from "@redux/actions/game"
import { setCurrentRoom } from "@redux/actions/game"
import { startGame as startGameApi } from "@api/web-socket-api"

const GameRoomStandby = () => {
    const dispatch = useDispatch()
    const gameRoom = useSelector(({game}) => game.currentGameRoom)
    const history = useHistory()

    const onGameStarts = () => {
        history.push('/play')
    }

    const onRoomDestroyed = useCallback(() => {
        history.push('/')
        dispatch(clearGameData())
    }, [])

    const onPlayerConnectedToRoom = useCallback((newPlayer) => {
        const newCurrentRoomObject = JSON.parse(JSON.stringify(gameRoom))

        newCurrentRoomObject.connectedPlayers[newPlayer.id] = newPlayer.object

        dispatch(setCurrentRoom(newCurrentRoomObject))
    }, [gameRoom])

    useEffect(() => {
        io.on('game:over', onRoomDestroyed)

        return () => {
            io.off('game:over', onRoomDestroyed)
        }
    }, [])

    useEffect(() => {
        io.on('game:starts', onGameStarts)
        io.on('game:playerConnectedToRoom', onPlayerConnectedToRoom)

        return () => {
            io.off('game:starts', onGameStarts)
            io.off('game:playerConnectedToRoom', onPlayerConnectedToRoom)
        }
    }, [onPlayerConnectedToRoom])

    const onStartGame = useCallback(() => {
        startGameApi()
    }, [])

    const connectedPlayersCount = Object.keys(gameRoom.connectedPlayers).length

    if (gameRoom == null) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
            {Object.keys(gameRoom.connectedPlayers).map((playerId) => {
                return <div key={playerId}>
                    {gameRoom.connectedPlayers[playerId].nickname}
                </div>
            })}
            {`Players: ${connectedPlayersCount}/${gameRoom.maxPlayers}`}<br/>
            {`Field: ${gameRoom.fieldW}:${gameRoom.fieldH}`}

            <button
                onClick={onStartGame}
            >
                Start game
            </button>
        </div>
    )
}

export default GameRoomStandby
