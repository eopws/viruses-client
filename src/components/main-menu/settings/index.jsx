import React, { memo, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import Block from "./block"
import { updateConfigItem, flushGlobalConfig } from "@redux/actions/config"
import "./settings.scss"

const Settings = memo(({visible}) => {
    const dispatch = useDispatch()
    const { config, configAvailable } = useSelector(({config}) => config)

    const { t: translation } = useTranslation('main-menu')

    useEffect(() => {
        if (!visible && configAvailable) {
            dispatch(flushGlobalConfig())
        }
    }, [visible])

    const setValueHandler = useCallback((block, key, value) => {
        dispatch(updateConfigItem({
            block,
            key,
            value
        }))
    }, [config])

    if (!configAvailable) {
        return (
            <></>
        )
    }

    return (
        <div
            className={'settings-modal' + (visible ? ' settings-modal--show' : '')}
        >
            <div className="settings-modal__wrapper">
                <div className="settings-modal__top">
                    <h1 className="settings-modal__title">{translation('gameSettingsLabel')}</h1>
                </div>
                <div className="settings-modal__body settings-modal-body">
                    {Object.keys(config).map((blockKey) => {
                            const block = config[blockKey]

                            return <Block
                                key={blockKey}
                                title={block.label}
                                items={block.items}
                                setValueHandler={(key, value) => setValueHandler(blockKey, key, value)}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
})

export default Settings
