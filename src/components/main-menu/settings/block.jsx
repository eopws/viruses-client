import React, { useCallback, memo } from "react"
import { useTranslation } from "react-i18next"

import { InputSlider, TextField, Enumeration, FileUploader } from "@components/shared"

const Block = memo(({title, items, setValueHandler}) => {
    const { t: translation } = useTranslation('main-menu')

    const getConfigField = useCallback((type, props) => {
        switch (type) {
            case 'slider':
                return <InputSlider {...props} />

            case 'text':
                return <TextField {...props} />

            case 'enum':
                return <Enumeration {...props} />

            case 'file':
                return <FileUploader {...props} />

            default:
                break;
        }
    }, [])

    return (
        <div className="settings-modal-body__block">
            <div className="settings-modal-body__block-title">
                <span>{translation(title)}</span>
            </div>
            <div className="settings-modal-body__block-body settings-group">
                {Object.keys(items).map((key) => {
                    const item = items[key]

                    if (item.type === 'hidden') {
                        return ''
                    }

                    const props = {
                        ...item,
                        iniValue: item.value,
                        setValueHandler: (value) => setValueHandler(key, value)
                    }

                    return ( <div
                        className="settings-group__item"
                        key={key}
                    >
                        <div className="settings-group__item-wrapper">
                            <div className="settings-group__item-left">
                                <div className="settings-group__item-left-wrapper">
                                    <span>{translation(item.label)}</span>
                                </div>
                            </div>
                            <div className="settings-group__item-right">
                                {getConfigField(item.type, props)}
                            </div>
                        </div>
                    </div> )
                })}
            </div>
        </div>
    )
})

export default Block
