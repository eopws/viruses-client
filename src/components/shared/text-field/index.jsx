import React, { useState } from 'react'

import "./text-field.scss"

const TextField = ({iniValue = '', className = '', setValueHandler}) => {
    const [inputValue, setInputValue] = useState(iniValue)

    const onInputChanges = ((e) => {
        setInputValue(e.target.value)
        setValueHandler(e.target.value)
    })

    return (
        <input
            className={`text-field ` + className}
            type="text"
            value={inputValue}
            onChange={onInputChanges}
            spellCheck="false"
        />
    )
}

export default TextField
