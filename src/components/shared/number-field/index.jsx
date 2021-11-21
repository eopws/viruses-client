import React, { useState } from 'react'

import "./number-field.scss"

const NumberField = ({iniValue = 0, className = '', min = null, max = null, setValueHandler}) => {
    const [inputValue, setInputValue] = useState(iniValue)

    const onInputChanges = ((e) => {
        let newNumber = +e.target.value

        newNumber = max !== null ? Math.min(max, newNumber) : newNumber
        newNumber = min !== null ? Math.max(min, newNumber) : newNumber

        setValueHandler(newNumber)
        setInputValue(newNumber)
    })

    return (
        <input
            className={`number-field ${className}`}
            type="number"
            value={inputValue}
            onChange={onInputChanges}
            spellCheck="false"
        />
    )
}

export default NumberField
