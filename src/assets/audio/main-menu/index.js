const bgAudios = []

for (let i = 1; true; i++) {
    try {
        const audio = require(`./bg-${i}.mp3`)

        if (audio) {
            bgAudios.push(audio.default)
        } else {
            break
        }
    } catch(e) {
        break
    }
}

export default bgAudios
