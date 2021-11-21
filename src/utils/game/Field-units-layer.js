import { renderImage } from "@utils/game"

class FieldUnitsLayer {
    async init(camera, canvas, unitsMap, virusIcons, walls, worldW, worldH) {
        this._mainCamera = camera

        this._canvas = canvas
        this._ctx   = canvas.getContext('2d')

        this._unitsMap   = unitsMap
        this._virusIcons = virusIcons
        this._walls      = walls

        this._worldDimensions = {
            w: worldW,
            h: worldH
        }

        this._canvas.width  = camera.getViewport().w
        this._canvas.height = camera.getViewport().h

        this._unitsImage = await this._createUnitsImage()
    }

    async setUnitsMap(newUnitsMap) {
        this._unitsMap = newUnitsMap
        this._unitsImage = await this._createUnitsImage()
    }

    render() {
        let xView = this._mainCamera.getXOffset()
        let yView = this._mainCamera.getYOffset()

        const viewportW = this._mainCamera.getViewport().w
        const viewportH = this._mainCamera.getViewport().h

        let sx, sy, dx, dy
        let sWidth, sHeight, dWidth, dHeight

        // offset point to crop the image
        sx = xView
        sy = yView

        // dimensions of cropped image
        sWidth = viewportW
        sHeight = viewportH

        // if cropped image is smaller than canvas we need to change the source dimensions
        if (this._unitsImage.width - sx < sWidth) {
          sWidth = this._unitsImage.width - sx
        }
        if (this._unitsImage.height - sy < sHeight) {
          sHeight = this._unitsImage.height - sy
        }

        // location on canvas to draw the croped image
        dx = 0
        dy = 0
        // match destination with source to not scale the image
        dWidth = sWidth
        dHeight = sHeight

        this._ctx.clearRect(0, 0, viewportW, viewportH)

        this._ctx.drawImage(this._unitsImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    async _createUnitsImage() {
        const unitsCanvas = document.createElement('canvas')
        const ctx         = unitsCanvas.getContext('2d')

        unitsCanvas.width = this._worldDimensions.w
        unitsCanvas.height = this._worldDimensions.h

        for (let row = 0; this._unitsMap[row]; row++) {

            for (let col = 0; this._unitsMap[row][col]; col++) {
                let x = col * 20 + 3
                let y = row * 20 - 3

                const r = this._walls[this._unitsMap[row][col].belongsTo]?.r ?? 50
                const g = this._walls[this._unitsMap[row][col].belongsTo]?.g ?? 50
                const b = this._walls[this._unitsMap[row][col].belongsTo]?.b ?? 50

                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`

                if (this._unitsMap[row][col].destroyed) {
                    ctx.fillStyle = 'black'
                    ctx.fillRect(x - 3, y + 3, 20, 20)

                    continue
                }

                if (this._unitsMap[row][col].belongsTo !== -1) {
                    if (this._unitsMap[row][col].virus === 'std') {
                        await renderImage(ctx, this._virusIcons[this._unitsMap[row][col].belongsTo], x, y)
                    } else if (this._unitsMap[row][col].virus === 'wall') {
                        ctx.fillRect(x - 3, y + 3, 20, 20)
                    } else if (this._unitsMap[row][col].virus.startsWith('tesla:wing')) {
                        ctx.beginPath()
                        ctx.arc(x+8, y+13, 8, 0, Math.PI * 2, true)
                        ctx.fill()
                        ctx.closePath()
                    } else if (this._unitsMap[row][col].virus.startsWith('tesla:heart')) {
                        ctx.fillStyle='yellow'
                        ctx.beginPath()
                        ctx.arc(x+8, y+13, 8, 0, Math.PI * 2, true)
                        ctx.fill()
                        ctx.closePath()
                    } else if (this._unitsMap[row][col].virus === 'hardWall') {
                        y += 5

                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(x, y + 15)
                        ctx.lineTo(x + 15, y)
                        ctx.fill()
                        ctx.closePath()
                    }
                }
            }
        }

        const img = document.createElement('img')

        img.src = unitsCanvas.toDataURL("image/png")

        return new Promise((resolve) => {
            img.onload = () => resolve(img)
        })
    }
}

export default FieldUnitsLayer
