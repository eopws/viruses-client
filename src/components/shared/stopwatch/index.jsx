import React, { memo, useEffect, useState } from "react"

import formatTime from "@utils/format-time"
import "./stopwatch.scss"

const Stopwatch = memo(({className = '', onTimeUpdate}) => {
    const [timeElapsed, setTimeElapsed] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(state => state + 1)
            onTimeUpdate(timeElapsed + 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className={`stopwatch ${className}`}>
            <span className="stopwatch__time">{formatTime(timeElapsed)}</span>
        </div>
    )
})

export default Stopwatch
