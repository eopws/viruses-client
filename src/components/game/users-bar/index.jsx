import React, { useCallback, useEffect, useRef, useState } from "react"

import turnPointerBg from "@assets/img/game/turn-pointer.png"
import io from "@api/web-socket"
import UsersBarItem from "@components/game/users-bar-item"
import "./users-bar.scss"

const UsersBar = ({users}) => {
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0)
    const turnPointer = useRef(null)

    const onTurnSwitches = useCallback((newPlayerTurn) => {
        setCurrentPlayerTurn(newPlayerTurn)
    }, [])

    useEffect(() => {
        io.on('game:turnSwitches', onTurnSwitches)

        return () => {
            io.off('game:turnSwitches', onTurnSwitches)
        }
    }, [])

    return (
        <div className="game-info-bar__users-bar users-bar">
            <div className="users-bar__wrapper">
                {Object.keys(users).map((playerId, playerIndex) => {
                    if (playerId === currentPlayerTurn) {
                        moveTurnPointerToItem(playerIndex)
                    }

                    return (<UsersBarItem
                        key={playerId}
                        user={users[playerId]}
                    />)
                })}

                <div
                    ref={turnPointer}
                    className="users-bar__turn-pointer"
                    style={{
                        backgroundImage: `url(${turnPointerBg})`
                    }}
                ></div>
            </div>
        </div>
    )

    function moveTurnPointerToItem(itemIndex) {
        if (turnPointer.current) {
            turnPointer.current.style.top = itemIndex * 64 + 21 + 'px'
        }
    }
}

export default UsersBar
