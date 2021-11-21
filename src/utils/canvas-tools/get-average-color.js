export default function getCanvasAverageColor(canvas, ctx) {
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        imageData,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!ctx) {
        return defaultRGB;
    }

    try {
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    } catch(e) {
        return defaultRGB;
    }

    length = imageData.length;

    while ( (i += blockSize * 4) < length ) {
        // check alpha channel
        if (imageData[i + 3] !== 255) continue

        count++
        rgb.r += imageData[i];
        rgb.g += imageData[i+1];
        rgb.b += imageData[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}
