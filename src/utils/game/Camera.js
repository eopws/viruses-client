class Camera {
    constructor(viewportW, viewportH, xBoundary, yBoundary) {
        this._x         = 0
        this._y         = 0
        this._viewportW = viewportW
        this._viewportH = viewportH
        this._xBoundary    = xBoundary
        this._yBoundary    = yBoundary
    }

    getXOffset() {
        if (this.observable) {
            this._x = this.observable.x - (this._viewportW / 2)

            if (this._x < 0) {
                this._x = 0
            }

            if (this._x > this._xBoundary) {
                this._x = this._xBoundary
            }
        }

        return this._x
    }

    getYOffset() {
        if (this.observable) {
            this._y = this.observable.y - (this._viewportH / 2)

            if (this._y < 0) {
                this._y = 0
            }

            if (this._y > this._yBoundary) {
                this._y = this._yBoundary
            }
        }

        return this._y
    }

    getViewport() {
        return {
            w: this._viewportW,
            h: this._viewportH,
        }
    }

    setX(x) {
        if (x <= this._xBoundary) {
            this._x = x
        }
    }

    setY(y) {
        if (this._y + y <= this._yBoundary) {
            this._y = y
        }
    }

    moveXRel(x) {
        const cameraXBoundary = this._x + x// + (this._viewportW * 0.75)

        /*if ((this._x + x + this._viewportW) >= (this._xBoundary + 200) || (this._x + x) < -200) {
            return
        }*/

        if (x < 0) {
            if ((this._x + x) < -200) {
                return
            }
        } else {
            if ((this._x + x + this._viewportW) >= (this._xBoundary + 200)) {
                return
            }
        }

        this._x += x
    }

    moveYRel(y) {
        const cameraYBoundary = this._y + y// + (this._viewportH * 0.75)

        /*if ((this._y + y + this._viewportH) >= (this._yBoundary + 200) || (this._y + y) < -200) {
            return
        }*/

        if (y < 0) {
            if ((this._y + y) < -200) {
                return
            }
        } else {
            if ((this._y + y + this._viewportH) >= (this._yBoundary + 200)) {
                return
            }
        }

        this._y += y
    }

    logCamPosition() {
        console.log('Cam X:', this._x)
        console.log('Cam Y:', this._y)
    }

    observe(object) {
        this.observable = object
    }
}

export default Camera
