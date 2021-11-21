import React, { memo, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

import { setGameObject } from "@redux/actions/game"
import { Game as GameStateController } from "@utils/game"
import "./game-field.scss"

let mouseDown = false
let shiftDown = false

const GameField = memo(() => {
    const dispatch = useDispatch()

    const game = useRef(null)

    const [virusContextMenuContent, setVirusContextMenu] = useState(null)
    const virusContextMenu                               = useRef(null)

    const gridLayer      = useRef(null)
    const unitsLayer     = useRef(null)
    const drawUnitsLayer = useRef(null)
    const pointerLayer   = useRef(null)

    useEffect(() => {
        game.current = new GameStateController()

        game.current.init(
            { // layers
                gridLayer: gridLayer.current,
                unitsLayer: unitsLayer.current,
                drawUnitsLayer: drawUnitsLayer.current,
                pointerLayer: pointerLayer.current,
            },
            window.innerWidth || document.documentElement.clientWidth, // viewport width
            window.innerHeight || document.documentElement.clientHeight // viewport height
        )
            .then(() => {
                game.current.renderGame()

                dispatch(setGameObject(game.current))
            })
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)

        document.addEventListener('keydown', onToggleShift)
        document.addEventListener('keyup', onToggleShift)

        document.addEventListener('mousemove', moveCamera())
    }, [])

    useEffect(() => {
        document.addEventListener('contextmenu', onShowVirusContextMenu)

        document.addEventListener('click', onHideVirusContextMenu)
    }, [])

    return (
        <div>
            <canvas
                ref={gridLayer}
                className="canvas-grid-layer"
            />
            <canvas
                ref={unitsLayer}
                className="canvas-units-layer"
            />
            <canvas
                ref={drawUnitsLayer}
                className="canvas-draw-units-layer"
            />
            <canvas
                ref={pointerLayer}
                className="canvas-pointer-layer"
            />

            <div
                className={`virus-context-menu ` + (virusContextMenuContent ? 'virus-context-menu--show' : '')} 
                ref={virusContextMenu}
            >
                {virusContextMenuContent?.actions?.map((action) =>
                    <div
                        className="virus-context-menu__item"
                        onClick={() => onContextMenuAction(action.type)}
                    >
                        {String(action.type)}
                    </div>
                )}
            </div>
        </div>
    )

    function onMouseDown() {
        mouseDown = true

        if (mouseDown && shiftDown) {
            game.current?.cameraStartFreeMoving()
        }
    }

    function onMouseUp() {
        mouseDown = false

        game.current?.cameraStopFreeMoving()
    }

    function onToggleShift(e) {
        shiftDown = e.shiftKey

        if (mouseDown && shiftDown) {
            game.current?.cameraStartFreeMoving()
        }
    }

    function moveCamera() {
        let prevY = null
        let prevX = null

        return (e) => {
            if (!mouseDown || !shiftDown) {
                prevX = prevY = null
                return
            }

            if (prevX != null && prevY != null) {
                const camShiftX = e.clientX - prevX
                const camShiftY = e.clientY - prevY

                game.current.getCamera().moveXRel(-camShiftX)
                game.current.getCamera().moveYRel(-camShiftY)

                game.current.renderGame()
            }

            prevX = e.clientX
            prevY = e.clientY
        }
    }

    async function onShowVirusContextMenu(e) {
        const menuCoords = virusContextMenu.current.getBoundingClientRect()

        virusContextMenu.current.style.left = e.clientX + 'px'
        virusContextMenu.current.style.top = e.clientY + 'px'

        let actions = await game.current.getVirusContextMenuContent(e.clientX, e.clientY)
        const cell  = game.current.getCellCoords(e.clientX, e.clientY)

        if (actions) {
            setVirusContextMenu({
                row: cell.row,
                col: cell.col,
                actions
            })
        }
    }

    function onContextMenuAction(action) {
        const {row, col} = virusContextMenuContent

        game.current.cellAction(action, row, col)
    }

    function onHideVirusContextMenu(e) {
        setVirusContextMenu(null)
    }
})

export default GameField
