import React, { memo, useCallback } from 'react'

import "./enumeration.scss"

const Enumeration = memo(({values, iniValue, setValueHandler}) => {
    const onValueChanges = useCallback((lang) => {
        setValueHandler(lang)
    }, [])

    return (
        <ul className="language-picker">
            {values.map((item) =>
                <li
                    key={item}
                    className="language-picker__item"
                >
                    <span
                        className={iniValue === item ? 'active' : ''}
                        onClick={() => onValueChanges(item)}
                    >
                        {item}
                    </span>
                </li>
            )}
        </ul>
    )
})

export default Enumeration
