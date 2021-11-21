import { renderImage } from "@utils/game"

export default function renderFieldMap(ctx, camera, fieldMap, virusIcons, viewportW, viewportH, worldW, worldH) {
    ctx.clearRect(0, 0, viewportW, viewportH)
    ctx.fillStyle = 'red'
    ctx.font = '20px serif'

    let fromRow = Math.ceil(camera.y / 20)
    let fromCol = Math.ceil(camera.x / 20)

    fromRow = fromRow > -1 ? fromRow : 0
    fromCol = fromCol > -1 ? fromCol : 0

    const toRow = Math.ceil((camera.y + viewportH) / 20)
    const toCol = Math.ceil((camera.x + viewportW) / 20)

    for (let row = fromRow; row < toRow; row++) {
        if (!fieldMap[row]) {
            break
        }

        for (let col = fromCol; col < toCol; col++) {
            if (fieldMap[row][col]) {
                let x = col * 20 + 3
                let y = row * 20 + 17

                if (fieldMap[row][col].belongsTo !== -1) {
                    //renderImage(ctx, camera, virusIcons[fieldMap[row][col].belongsTo], x, y)

                    x -= camera.x;
                    y -= camera.y;

                    // azaza
                    ctx.fillStyle = 'yellow';
                    ctx.fillText('X', x, y, 19);
                }
            }
        }
    }
}
