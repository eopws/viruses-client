export default function renderGrid(ctx, camera, grid, viewportW, viewportH) {
    let xView = camera.x
    let yView = camera.y

    let sx, sy, dx, dy
    let sWidth, sHeight, dWidth, dHeight

    // offset point to crop the image
    sx = xView
    sy = yView

    // dimensions of cropped image
    sWidth = viewportW
    sHeight = viewportH

    // if cropped image is smaller than canvas we need to change the source dimensions
    if (grid.width - sx < sWidth) {
      sWidth = grid.width - sx
    }
    if (grid.height - sy < sHeight) {
      sHeight = grid.height - sy
    }

    // location on canvas to draw the croped image
    dx = 0
    dy = 0
    // match destination with source to not scale the image
    dWidth = sWidth
    dHeight = sHeight

    ctx.drawImage(grid, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}