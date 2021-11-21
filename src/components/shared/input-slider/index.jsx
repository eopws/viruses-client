import React, { useEffect, useRef } from "react"

import "./input-slider.scss"
import sliderBackground from "@assets/img/input-slider.png"
import thumbBackground from "@assets/img/input-slider-thumb.png"

const InputSlider = React.memo(({iniValue, max = 100, setValueHandler}) => {
    const slider = useRef(null)
    const thumb  = useRef(null)

    const sliderWidth = 315
    const thumbWidth  = 52

    useEffect(() => {
        const sliderThumb = thumb.current

        sliderThumb.addEventListener('mousedown', onSliderMoves)

        return () => {
            sliderThumb.removeEventListener('mousedown', onSliderMoves)
        }
    }, [])

    useEffect(() => {
        if (!thumb.current || !slider.current) {
            return;
        }

        const valuePercents = (iniValue * 100) / max
        let newThumbLeft  = (sliderWidth * valuePercents) / 100

        const rightEdge = sliderWidth - thumbWidth - 10

        // thumb is out of slider => leave thumb in slider's boundaries
        if (newThumbLeft < 10) {
            newThumbLeft = 10
        }

        if (newThumbLeft > rightEdge) {
            newThumbLeft = rightEdge
        }

        thumb.current.style.left = newThumbLeft + 'px'
    }, [])

    return (
        <div
            className="input-slider"
            ref={slider}
            style={{
                backgroundImage: `url(${sliderBackground})`,
                width: sliderWidth + 'px',
            }}
        >
            <div
                className="input-slider__thumb"
                ref={thumb}
                style={{
                    backgroundImage: `url(${thumbBackground})`,
                    width: thumbWidth + 'px'
                }}
            ></div>
        </div>
    )

    function onSliderMoves(e) {
        let shiftX = e.clientX - thumb.current.getBoundingClientRect().left

        document.addEventListener('mousemove', onMouseMoves)
        document.addEventListener('mouseup', onMouseUp)

        function onMouseMoves(e) {
            let newLeft = e.clientX - shiftX - slider.current.getBoundingClientRect().left

            // thumb is out of slider => leave thumb in slider's boundaries
            if (newLeft < 10) {
                newLeft = 10
            }

            const rightEdge = slider.current.offsetWidth - thumb.current.offsetWidth - 10

            // thumb is out of slider => leave thumb in slider's boundaries
            if (newLeft > rightEdge) {
                newLeft = rightEdge
            }

            thumb.current.style.left = newLeft + 'px'

            const newValuePercent = (((newLeft - 10)) * 100) / rightEdge
            const newValue        = (max * newValuePercent) / 100

            setValueHandler(newValue)
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMoves)
        }
      };
})

export default InputSlider
