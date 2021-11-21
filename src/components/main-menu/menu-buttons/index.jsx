import React, { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { quitGame } from "@api/ipc-api"
import "./menu-buttons.scss"
import pickerBackground from "@assets/img/menu/menu-item-picker.png"

const MenuButtons = ({setVisiblePopup}) => {
    const picker        = useRef(null)
    const buttonsList   = useRef(null)
    const buttonListTop = useRef(null)

    const { t: translation } = useTranslation('main-menu')

    useEffect(() => {
        buttonsList.current.addEventListener('mouseover', (e) => {
            if (!e.target.classList.contains('menu-buttons__button')) {
                return;
            }

            movePickerTo(e.target);
        });
    }, [])

    useEffect(() => {
        if (buttonsList.current) {
            buttonListTop.current = buttonsList.current.getBoundingClientRect().top
        }
    }, [buttonsList])

    return (
        <div className="menu-buttons">
            <ul
                className="menu-buttons__buttons-list"
                ref={buttonsList}
            >
                <li className="menu-buttons__button">
                    <Link to="/game-rooms">
                        {translation('playBtn')}
                    </Link>
                </li>
                <li
                    className="menu-buttons__button"
                    onClick={settingsHandler}
                >
                    {translation('settingsBtn')}
                </li>
                <li
                    className="menu-buttons__button"
                    onClick={createVirusHandler}
                >
                    {translation('createVirusBtn')}
                </li>
                <li
                    className="menu-buttons__button"
                    onClick={quitGame}
                >
                    {translation('quitBtn')}
                </li>
            </ul>

            <div
                className="menu-buttons__picker"
                ref={picker}
                style={{
                    backgroundImage: `url(${pickerBackground})`,
                }}
            ></div>
        </div>
    )

    function settingsHandler() {
        setVisiblePopup('settings')
    }

    function createVirusHandler() {
        setVisiblePopup('createVirus')
    }

    function movePickerTo(button) {
        const buttonTop = button.getBoundingClientRect().top - 80 - buttonListTop.current

        picker.current.style.top = buttonTop + 'px'
    }
}

export default MenuButtons
