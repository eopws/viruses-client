
class CanvasBrush {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx    = canvas.getContext('2d')

        this.onStartDraw           = this.onStartDraw.bind(this)
        this.drawOnMouseMove       = this.drawOnMouseMove.bind(this)
        this.onStopDraw            = this.onStopDraw.bind(this)
        this.stopDrawIfOutOfCanvas = this.stopDrawIfOutOfCanvas.bind(this)

        this.setColor  = this.setColor.bind(this)
    }

    setColor(newColor) {
        const r = newColor.r
        const g = newColor.g
        const b = newColor.b

        this.ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`
    }

    mount() {
        this.canvas.addEventListener('mousedown', this.onStartDraw)
        this.canvas.addEventListener('mousemove', this.drawOnMouseMove)

        document.addEventListener('mouseup', this.onStopDraw)
        document.addEventListener('mousemove', this.stopDrawIfOutOfCanvas)
    }

    unmount() {
        this.canvas.removeEventListener('mousedown', this.onStartDraw)
        this.canvas.removeEventListener('mousemove', this.drawOnMouseMove)

        document.removeEventListener('mouseup', this.onStopDraw)
        document.removeEventListener('mousemove', this.stopDrawIfOutOfCanvas)
    }

    onStartDraw() {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.lineWidth = 15;
    }

    drawOnMouseMove(e) {
        if (this.mouseDown) {
            let x = e.clientX - this.canvas.getBoundingClientRect().left
            let y = e.clientY - this.canvas.getBoundingClientRect().top

            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    onStopDraw() {
        this.mouseDown = false
        this.ctx.closePath()
    }

    stopDrawIfOutOfCanvas(e) {
        const canvasCoords = this.canvas.getBoundingClientRect()

        if (
            (canvasCoords.left > e.clientX || canvasCoords.left + canvasCoords.width < e.clientX)
            ||
            (canvasCoords.top > e.clientY || canvasCoords.top + canvasCoords.height < e.clientY)
        ) {
            this.onStopDraw()
        }
    }
}

export default CanvasBrush
