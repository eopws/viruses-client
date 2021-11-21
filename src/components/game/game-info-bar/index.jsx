import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import "./game-info-bar.scss"
import Stopwatch from "@components/shared/stopwatch"
import UsersBar from "@components/game/users-bar"
import { setUpdateGameTime } from "@redux/actions/game"

const GameInfoBar = ({gameBarHidden}) => {
    const dispatch = useDispatch()
    const playerInGame = useSelector(({game}) => game.currentGameRoom.connectedPlayers)

    const onTimeUpdate = useCallback((newTime) => {
        dispatch(setUpdateGameTime(newTime))
    }, [])

    return (
        <div
            className={'game-info-bar ' + (gameBarHidden ? '' : 'game-info-bar--show')}
        >
            <Stopwatch
                onTimeUpdate={onTimeUpdate}
            />
            <UsersBar
                users={playerInGame}
            />
        </div>
    )
}

export default GameInfoBar
