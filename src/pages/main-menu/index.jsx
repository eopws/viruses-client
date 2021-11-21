import React, { useEffect, useRef, useState, memo } from 'react'

import bgAudios from "@assets/audio/main-menu"
import MenuButtons from "@components/main-menu/menu-buttons"
import Settings from "@components/main-menu/settings"
import CreateVirus from "@components/main-menu/create-virus"
import pageBackground from "@assets/img/menu/background.png"
import virusLogo from "@assets/img/menu/virus-logo.png"
import "./main-menu.scss"
import { BackgroundMusic } from "@components/shared"

const MainMenu = memo(() => {
    const [visiblePopup, setVisiblePopup] = useState(null)
    const menuPage     = useRef(null)
    const menuPageBlur = useRef(null)

    useEffect(() => {
        const menuPageBlurBlock = menuPageBlur.current
        menuPageBlurBlock.addEventListener('click', resetPopups)

        return () => {
            menuPageBlurBlock.removeEventListener('click', resetPopups)
        }
    }, [])

    return (
        <>
            <div
                className="menu-page"
                style={{
                    backgroundImage: `url(${pageBackground})`,
                }}
                ref={menuPage}
            >
                <div className="menu-page__left">
                    <div className="menu-page__logo">
                        <div
                            style={{
                                backgroundImage: `url(${virusLogo})`
                            }}
                        ></div>
                    </div>

                    <MenuButtons
                        setVisiblePopup={setVisiblePopup}
                    />
                </div>

                <div className="blackout"></div>
            </div>

            <div
                className={'screen-blur ' + (visiblePopup ? 'screen-blur--show' : '')}
                ref={menuPageBlur}
            ></div>

            <Settings visible={visiblePopup === 'settings'} />
            <CreateVirus visible={visiblePopup === 'createVirus'} />
            <BackgroundMusic urls={bgAudios} />

            <div className="vesion-info">Win64 1.0 beta build</div>
        </>
    )

    function resetPopups() {
        setVisiblePopup(null)
    }
})

export default MainMenu
