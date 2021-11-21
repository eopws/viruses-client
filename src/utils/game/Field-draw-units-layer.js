class FieldDrawUnitsLayer {
    init(camera, canvas, cellW, cellH, worldW, worldH) {
        this._mainCamera = camera

        this._canvas = canvas
        this._ctx = canvas.getContext('2d')

        this._cellDimensions = {
            w: cellW,
            h: cellH
        }

        this._worldDimensions = {
            w: worldW,
            h: worldH
        }

        this._canvas.width  = camera.getViewport().w
        this._canvas.height = camera.getViewport().h

        this._onDrawCell = this._onDrawCell.bind(this)
    }

    setDoneCallback(callback) {
        this._doneCallback = callback
    }

    startDrawing(cellsToDrawCount) {
        this._cellsToDrawCount = cellsToDrawCount
        this._cellsDrawn  = []

        this._canvas.style.zIndex = 5

        document.addEventListener('click', this._onDrawCell)
    }

    stopDrawing() {
        this._cellsToDrawCount = 0
        this._cellsDrawn  = []

        this._canvas.style.zIndex = 4

        const viewportW = this._mainCamera.getViewport().w
        const viewportH = this._mainCamera.getViewport().h

        this._ctx.clearRect(0, 0, viewportW, viewportH)

        document.removeEventListener('click', this._onDrawCell)
    }

    _onDrawCell(e) {
        const targetCell = this._getCellCoords(e.clientX, e.clientY)

        this._cellsDrawn.push([targetCell.col, targetCell.row])

        const cellW = this._cellDimensions.w
        const cellH = this._cellDimensions.h

        let renderX = (targetCell.col * cellW)
        let renderY = (targetCell.row * cellH)

        renderX -= this._mainCamera.getXOffset()
        renderY -= this._mainCamera.getYOffset()

        this._ctx.fillStyle = 'red'
        this._ctx.fillRect(renderX, renderY, cellW, cellH)

        if (this._cellsToDrawCount <= this._cellsDrawn?.length) {
            this._doneCallback(this._cellsDrawn)
            this.stopDrawing()

            return
        }
    }

    _getCellCoords(mouseX, mouseY) {
        mouseX += this._mainCamera.getXOffset()
        mouseY += this._mainCamera.getYOffset()

        const cellW = this._cellDimensions.w
        const cellH = this._cellDimensions.h

        const row = Math.floor(mouseY / cellH)
        const col = Math.floor(mouseX / cellW)

        return {row, col}
    }
}

export default FieldDrawUnitsLayer
