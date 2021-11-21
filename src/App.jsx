import React, { memo, Suspense, useEffect } from "react"
import { HashRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import i18next from "i18next"

import { MainMenu, GameRooms, GameRoomStandby, Game } from "@pages"
import { fetchConfig } from "@redux/actions/config"
import "./App.scss"

const App = memo(() => {
    const dispatch = useDispatch()
    const { config, configAvailable } = useSelector(({config}) => config)

    useEffect(() => {
        // fetch config on first run
        dispatch(fetchConfig())
    }, [])

    useEffect(() => {
        if (configAvailable) {
            const configLang = config.language.items.lang.value
            i18next.changeLanguage(configLang)
        }
    }, [config])

    return (
        <Suspense fallback="loading">
            <HashRouter>
                <Route path="/" exact component={ MainMenu } />
                <Route path="/game-rooms" exact component={ GameRooms } />
                <Route path="/room-waiting" exact component={ GameRoomStandby } />
                <Route path="/play" exact component={ Game } />
            </HashRouter>
        </Suspense>
    )
})

export default App
