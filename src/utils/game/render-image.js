export default async function renderImage(ctx, base64img, x, y) {
    const xView = x
    const yView = y

    const image = new Image()

    image.src = base64img

    return new Promise((resolve) => {
        image.onload = () => {
            ctx.drawImage(image, xView, yView + 4, 18, 18)
            resolve(true)
        }
    })
}
