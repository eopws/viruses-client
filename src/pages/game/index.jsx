import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

import "./game.scss"
import io from "@api/web-socket"
import { surrender as surrenderApi } from "@api/web-socket-api"
import { clearGameData } from "@redux/actions/game"
import GameField from "@components/game/game-field"
import Shop from "@components/game/shop"
import GameInfoBar from "@components/game/game-info-bar"
import Chat from "@components/game/chat"
import PauseMenu from "@components/game/pause-menu"
import GameOverMessage from "@components/game/game-over-message"

const Game = () => {
    const [modalsHidden, setModalsHidden]                   = useState(true)
    const [pauseMenuHidden, setPauseMenuHidden]             = useState(true)
    const [gameOverMessageHidden, setGameOverMessageHidden] = useState(true)

    const dispatch = useDispatch()
    const history = useHistory()

    const gameWinnerId     = useRef(null)
    const gameFinalStats = useRef(null)

    useEffect(() => {
        document.addEventListener('keydown', onToggleModals())
        document.addEventListener('keydown', onTogglePauseMenu)
    }, [])

    useEffect(() => {
        io.on('game:over', (gameEndInfo) => {
            gameFinalStats.current = gameEndInfo.stats
            gameWinnerId.current   = gameEndInfo.winnerId

            setModalsHidden(true)
            setGameOverMessageHidden(false)
        })
    }, [])

    return (
        <div>
            <GameOverMessage
                gameOverMessageHidden={gameOverMessageHidden}
                gameWinnerId={gameWinnerId.current}
                gameFinalStats={gameFinalStats.current}
                onGoToMenu={onGoToMenu}
            />
            <PauseMenu
                pauseMenuHidden={pauseMenuHidden}

                onContinue={pauseMenuOnContinue}
                onSurrender={pauseMenuOnSurrender}
                onClickSettings={pauseMenuOnClickSettings}
                onQuit={pauseMenuOnQuit}
            />
            <Chat
                chatHidden={modalsHidden}
            />
            <GameInfoBar
                gameBarHidden={modalsHidden}
            />
            <GameField />
            <Shop
                shopHidden={modalsHidden}
                hideShop={() => setModalsHidden(true)}
            />
        </div>
    )

    function onToggleModals() {
        let cooldown = false

        return (e) => {
            if (e.ctrlKey && e.code === 'KeyT' && !cooldown) {
                setModalsHidden((state) => !state)

                cooldown = true

                setTimeout(() => cooldown = false, 1000)
            }
        }
    }

    function onTogglePauseMenu(e) {
        if(e.key === "Escape") {
            setPauseMenuHidden(false)
        }
    }

    function pauseMenuOnContinue() {
        setPauseMenuHidden(true)
    }

    function pauseMenuOnSurrender() {
        surrenderApi(false)
        setPauseMenuHidden(true)
    }

    function pauseMenuOnClickSettings() {
        // blablabla
    }

    function pauseMenuOnQuit() {
        surrenderApi()
        dispatch(clearGameData())
        history.push('/')
    }

    function onGoToMenu() {
        dispatch(clearGameData())
        history.push('/')
    }
}

export default Game
