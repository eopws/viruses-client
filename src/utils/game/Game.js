import io from "@api/web-socket"
import {
    Camera, FieldGridLayer, FieldUnitsLayer, FieldPointerLayer, FieldDrawUnitsLayer
} from "@utils/game"
import { fetchGameAmbience, emitStep as emitStepApi, getCellActions as getCellActionsApi } from "@api/web-socket-api"

class Game {
    async init(layers, viewportW, viewportH) {
        const gameState = await fetchGameAmbience()

        const virusIcons = {}
        const walls = {}

        for (let playerId in gameState.players) {
            virusIcons[playerId] = gameState.players[playerId].playersVirus
            walls[playerId]      = gameState.players[playerId].color
        }

        const worldW = gameState.fieldW
        const worldH = gameState.fieldH

        this.listenEvents()

        this._mainCamera = new Camera(viewportW, viewportH, worldW, worldH)

        this._gridLayer      = new FieldGridLayer()
        this._unitsLayer     = new FieldUnitsLayer()
        this._drawUnitsLayer = new FieldDrawUnitsLayer()
        this._pointerLayer   = new FieldPointerLayer()

        await this._gridLayer.init(this._mainCamera, layers.gridLayer, worldW, worldH)
        await this._unitsLayer.init(this._mainCamera, layers.unitsLayer, gameState.field, virusIcons, walls, worldW, worldH)
        await this._pointerLayer.init(this._mainCamera, layers.pointerLayer, 20, 20, worldW, worldH)

        this._drawUnitsLayer.init(this._mainCamera, layers.drawUnitsLayer, 20, 20, worldW, worldH)

        this._pointerLayer.setClickHandler((row, col) => emitStepApi({
            action: 'placeUnit', unitId: 'std', row, col
        }))

        this._pointerLayer.startPointing()
    }

    cameraStartFreeMoving() {
        this._pointerLayer.stopPointing()
    }

    cameraStopFreeMoving() {
        this._pointerLayer.startPointing()
    }

    getCamera() {
        // return link to camera object
        return this._mainCamera
    }

    placeUnitMode(unitId, unitCellsCount) {
        this._drawUnitsLayer.startDrawing(unitCellsCount)

        // stop placing standard viruses
        this._pointerLayer.setClickHandler(() => false)

        this._drawUnitsLayer.setDoneCallback((drawnCells) => {
            this._pointerLayer.setClickHandler((row, col) => emitStepApi({
                action: 'placeUnit', unitId: 'std', row, col
            }))

            emitStepApi({
                action: 'placeUnit',
                unitId,
                toCells: drawnCells
            })
        })
    }

    offPlaceUnitMode() {
        this._drawUnitsLayer.stopDrawing()

        this._pointerLayer.setClickHandler((row, col) => emitStepApi({
            action: 'placeUnit', unitId: 'std', row, col
        }))
    }

    listenEvents() {
        io.on('game:step', async (newUnitsMap) => {
            await this._unitsLayer.setUnitsMap(newUnitsMap)

            this.renderGame()
        })
    }

    renderGame() {
        this._gridLayer.render()
        this._unitsLayer.render()
    }

    getCellCoords(mouseX, mouseY) {
        return this._pointerLayer.getCellCoords(mouseX, mouseY)
    }

    cellAction(actionType, row, col) {
        emitStepApi({
            action: actionType,
            row,
            col
        })
    }

    async getVirusContextMenuContent(mouseX, mouseY) {
        const cell = this.getCellCoords(mouseX, mouseY)

        return await getCellActionsApi(cell)
    }
}

export default Game
