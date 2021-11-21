import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const BackgroundMusic = ({urls, loop = true}) => {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
    const audio = useRef(null)

    const { config, configAvailable } = useSelector(({config}) => config)

    useEffect(() => {
        if (configAvailable) {
            audio.current.volume = config.sound.items.backgroundMusic.value / 100
        }
    }, [config])

    useEffect(() => {
        // initially set to zero, then replaced with value from config
        audio.current.volume = 0

        audio.current.src = urls[currentAudioIndex]

        audio.current.addEventListener('canplay', () => {
            audio.current?.play()
        })

        audio.current.onended   = () => {
            if (urls[currentAudioIndex + 1]) {
                setCurrentAudioIndex(currentAudioIndex + 1)
            } else {
                setCurrentAudioIndex(0)
            }
        }
    }, [])

    return (
        <audio ref={audio}></audio>
    )
}

export default BackgroundMusic
