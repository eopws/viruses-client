import React from "react"
import { useSelector } from "react-redux"
import GameStats from "@components/game/game-stats"

import "./game-over-message.scss"

const GameOverMessage = ({gameOverMessageHidden, gameWinnerId, gameFinalStats, onGoToMenu}) => {
    const playersInGame   = useSelector(({game}) => game.currentGameRoom.connectedPlayers)

    return (
        <>
            <div
                className={'screen-blur ' + (gameOverMessageHidden ? '' : 'screen-blur--show')}
            ></div>
            <button
                className={'to-menu-btn ' + (gameOverMessageHidden ? 'to-menu-btn--hide' : '')}
                onClick={onGoToMenu}
            >
                Main<br />Menu
            </button>
            <div
                className={'game-over-message' + (gameOverMessageHidden ? '' : ' game-over-message--show')}
            >
                <h2 className="game-over-message__title">Game Over</h2>
                <GameStats
                    className="game-over-message__stats-modal"
                    players={playersInGame}
                    stats={gameFinalStats}
                    gameWinnerId={gameWinnerId}
                />
            </div>
        </>
    )
}

export default GameOverMessage
