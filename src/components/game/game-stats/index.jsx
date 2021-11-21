import React, { useState } from "react"

import "./game-stats.scss"
import cupIcon from "@assets/img/game/cup.png"
import poopIcon from "@assets/img/game/poop.png"

const GameStats = ({players, stats, gameWinnerId = null, className = ''}) => {
    const [activeTabPlayer, setActiveTabPlayer] = useState(null)

    if (!players || !stats) {
        return (
            <></>
        )
    }

    return (
        <div className={`game-stats ${className}`}>
            <div className="game-stats__wrapper">
                <div className="game-stats__players-list stats-players-list">
                    {Object.keys(players).map((playerId) =>
                        <div
                            key={playerId}
                            className={'stats-tab' + (playerId === activeTabPlayer ? ' stats-tab--active' : '')}
                            onMouseOver={() => onChangeActiveTab(playerId)}
                        >
                            <div className="stats-tab__player-avatar">
                                <img src={players[playerId].avatar} alt="" />
                            </div>
                            <div className="stats-tab__text">
                                <span className="stats-tab__player-nickname">{players[playerId].nickname}</span>

                                {gameWinnerId && gameWinnerId === playerId ?
                                    <span className="stats-tab__win-state stats-tab__win-state--winner">winner</span>
                                    :
                                    <span className="stats-tab__win-state stats-tab__win-state--loser">loser</span>
                                }
                            </div>
                            <div className="stats-tab__icon">
                                {gameWinnerId && gameWinnerId === playerId ?
                                    <img src={cupIcon} alt="" />
                                    :
                                    <img src={poopIcon} alt="" />
                                }
                            </div>
                        </div>
                    )}
                </div>

                <div className="game-stats__stats-table stats-table">
                    <h3 className="stats-table__title">statistics</h3>

                    <div className="stats-table__body">
                        {stats[activeTabPlayer] && Object.keys(stats[activeTabPlayer]).map((key) =>
                            <div
                                key={key}
                                className="stats-table__row"
                            >
                                <span className="stats-table__key">{key}</span>
                                <span className="stats-table__value">{stats[activeTabPlayer][key]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    function onChangeActiveTab(playerId) {
        setActiveTabPlayer(playerId)
    }
}

export default GameStats
