import React from "react"

import "./pause-menu.scss"

const PauseMenu = ({pauseMenuHidden, onContinue, onSurrender, onClickSettings, onQuit}) => {
    return (
        <>
            <div
                className={'screen-blur ' + (pauseMenuHidden ? '' : 'screen-blur--show')}
            ></div>

            <div
                className={'pause-menu ' + (pauseMenuHidden ? '' : 'pause-menu--show')}
            >
                <span className="pause-menu__title">Pause menu</span>

                <ul className="pause-menu__buttons-list">
                    <li
                        className="pause-menu__btn"
                        onClick={onContinue}
                    >
                        <span>Continue</span>
                    </li>
                    <li
                        className="pause-menu__btn"
                        onClick={onSurrender}
                    >
                        <span>Surrender</span>
                    </li>
                    <li
                        className="pause-menu__btn"
                        onClick={onClickSettings}
                    >
                        <span>Settings</span>
                    </li>
                    <li
                        className="pause-menu__btn"
                        onClick={onQuit}
                    >
                        <span>Quit</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PauseMenu
