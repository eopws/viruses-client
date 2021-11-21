class FieldGridLayer {
    async init(camera, canvas, gridW, gridH) {
        this._mainCamera = camera

        this._canvas = canvas
        this._ctx = canvas.getContext('2d')

        this._gridDimensions = {
            w: gridW,
            h: gridH
        }

        this._canvas.width  = camera.getViewport().w
        this._canvas.height = camera.getViewport().h

        this._grid = await FieldGridLayer.createGrid(gridW, gridH)
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
        if (this._grid.width - sx < sWidth) {
          sWidth = this._grid.width - sx
        }
        if (this._grid.height - sy < sHeight) {
          sHeight = this._grid.height - sy
        }

        // location on canvas to draw the croped image
        dx = 0
        dy = 0
        // match destination with source to not scale the image
        dWidth = sWidth
        dHeight = sHeight

        this._ctx.clearRect(0, 0, viewportW, viewportH)

        this._ctx.drawImage(this._grid, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    static async createGrid(width, height) {
        const data = `<svg width="${width}px" height="${height}px" xmlns="http://www.w3.org/2000/svg"> \
            <defs> \
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"> \
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" stroke-width="1" /> \
                    <path d="M 0 20 L 20 20" fill="none" stroke="black" stroke-width="1" /> \
                    <path d="M 20 0 L 20 20" fill="none" stroke="black" stroke-width="1" /> \
                </pattern> \
            </defs> \
            <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
        </svg>`;

        /*const data = `<svg width="${width}px" height="${height}px" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"> \
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" stroke-width="1" /> \
            </pattern> \
            <pattern id="grid" width="90" height="90" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>`;*/

        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);

        img.src = url;

        return new Promise((resolve) => {
            img.onload = () => {
                resolve(img)
            }
        })
    }
}

export default FieldGridLayer
