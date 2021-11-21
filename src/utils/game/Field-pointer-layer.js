class FieldPointerLayer {
    init(camera, canvas, cellW, cellH, worldW, worldH) {
        this._mainCamera = camera

        this._canvas = canvas
        this._ctx    = canvas.getContext('2d')

        this._canvas.width = this._mainCamera.getViewport().w
        this._canvas.height = this._mainCamera.getViewport().h

        this._cellDimensions = {
            w: cellW,
            h: cellH
        }

        this._worldDimensions = {
            w: worldW,
            h: worldH
        }

        this._pointerMoves = this._pointerMoves.bind(this)

        this._ctx.globalAlpha = 0.5

        this._pointing = false

        this._pointerClick = this._pointerClick.bind(this)
    }

    startPointing() {
        this._pointing = true

        this._canvas.onmousemove = this._pointerMoves()
        this._canvas.onclick     = this._pointerClick
    }

    stopPointing() {
        this._pointing = false
        this._canvas.onmousemove = null

        const w = this._worldDimensions.w
        const h = this._worldDimensions.h

        this._ctx.clearRect(0, 0, w, h)
    }

    _pointerMoves() {
        let row, col

        return (e) => {
            const viewportW = this._mainCamera.getViewport().w
            const viewportH = this._mainCamera.getViewport().h

            const worldW = this._worldDimensions.w
            const worldH = this._worldDimensions.h

            let rerender = false

            const cellW = this._cellDimensions.w
            const cellH = this._cellDimensions.h

            let ptrX = e.clientX
            let ptrY = e.clientY

            let cellCoords = this.getCellCoords(ptrX, ptrY)

            if (cellCoords.row < 0 || cellCoords.col < 0) {
                return
            }

            if (cellCoords.row * 20 >= worldH || cellCoords.col * 20 >= worldW) {
                return
            }

            if (cellCoords.row !== row) {
                row = cellCoords.row;
                rerender = true;
            }

            if (cellCoords.col !== col) {
                col = cellCoords.col;
                rerender = true;
            }

            if (rerender) {

                this._ctx.clearRect(0, 0, viewportW, viewportH);

                this._ctx.fillStyle = 'green'
                let renderX = (col * cellW)
                let renderY = (row * cellH)

                renderX -= this._mainCamera.getXOffset()
                renderY -= this._mainCamera.getYOffset()

                this._ctx.fillRect(renderX, renderY, cellW, cellH)
            }
        }
    }

    setClickHandler(handler) {
        this._clickHandler = handler
    }

    _pointerClick(e) {
        let ptrX = e.clientX
        let ptrY = e.clientY

        const {row, col} = this.getCellCoords(ptrX, ptrY)

        if (this._clickHandler) {
            this._clickHandler(row, col)
        }
    }

    getCellCoords(mouseX, mouseY) {
        mouseX += this._mainCamera.getXOffset()
        mouseY += this._mainCamera.getYOffset()

        const cellW = this._cellDimensions.w
        const cellH = this._cellDimensions.h

        const row = Math.floor(mouseY / cellH)
        const col = Math.floor(mouseX / cellW)

        return {row, col}
    }
}

export default FieldPointerLayer
