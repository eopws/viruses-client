import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import "./create-virus.scss"
import { updateConfigItem, flushGlobalConfig } from "@redux/actions/config"
import ColorPicker from "@components/shared/color-picker"
import constructorBg from "@assets/img/menu/virus-construct-bg.png"
import { CanvasBrush as Brush } from "@utils/canvas-tools"
import { setVirusImage } from "@api/ipc-api"
import { getCanvasAverageColor } from "@utils/canvas-tools"

const CreateVirus = ({visible}) => {
    const dispatch = useDispatch()

    const canvasContainer = useRef(null)
    const virusCanvas     = useRef(null)
    const brush           = useRef(null)

    let modalClassName = 'create-virus-modal'

    if (visible) {
        modalClassName += ' create-virus-modal--show'
    }

    useEffect(() => {
        const containerHeight = canvasContainer.current.clientHeight
        const containerWidth  = canvasContainer.current.clientWidth

        if (containerWidth > 0 && containerHeight > 0) {
            virusCanvas.current.width  = containerWidth / 1.5
            virusCanvas.current.height = containerHeight / 1.25
        }
    })

    useEffect(() => {
        if (virusCanvas.current) {
            brush.current = new Brush(virusCanvas.current)
            brush.current.mount()
        }
    }, [])

    useEffect(() => {
        const isCanvasEmpty = !(virusCanvas
        .current
        .getContext('2d')
        .getImageData(0, 0, virusCanvas.current?.width, virusCanvas.current?.height)
        .data
        .some(channel => channel !== 0))

        if (!visible && virusCanvas.current && !isCanvasEmpty) {
            const canvasDataUrl = virusCanvas.current.toDataURL()

            setVirusImage(canvasDataUrl)

            const canvasAvgColor = getCanvasAverageColor(virusCanvas.current, virusCanvas.current.getContext('2d'))

            dispatch(updateConfigItem({
                block: 'player',
                key: 'color',
                value: canvasAvgColor
            }))

            dispatch(flushGlobalConfig())
        }
    }, [visible])

    const onSetColor = (newColor) => {
        if (brush.current) {
            brush.current.setColor(newColor)
        }
    }

    return (
        <div
            className={modalClassName}
            style={{
                backgroundImage: `url(${constructorBg})`
            }}
        >
            <div className="create-virus-modal__virus">
                <div
                    ref={canvasContainer}
                    className="create-virus-modal__virus-wrapper"
                >
                    <canvas
                        ref={virusCanvas}
                        className="virus-canvas"
                    ></canvas>
                </div>
            </div>

            <div className="create-virus-modal__palette">
                <ColorPicker
                    width={200}
                    height={300}
                    setColor={onSetColor}
                />
            </div>
        </div>
    )
}

export default CreateVirus
