const electron = require("electron")

export async function getConfig() {
    return new Promise((resolve) => {
        electron.ipcRenderer.send('getAppConfig')

        electron.ipcRenderer.on('giveAppConfig', (e, data) => {
            resolve(data)
        })
    })
}

export async function setConfig(newConfig) {
    return new Promise((resolve) => {
        electron.ipcRenderer.sendSync('setAppConfig', newConfig)
        resolve(true)
    })
}

export async function quitGame() {
    electron.ipcRenderer.send('quitGame')
}

export async function setVirusImage(imageDataUrl) {
    return new Promise((resolve) => {
        try {
            const regex   = /^data:.+\/(.+);base64,(.*)$/
    
            const matches = imageDataUrl.match(regex)
            const ext = matches[1]
            const data = matches[2]
            const buffer = Buffer.from(data, 'base64')

            electron.ipcRenderer.send('setVirusImage', buffer)
            resolve(true)
        } catch (e) {
            console.log(e)
            resolve(false)
        }
    })
}

export async function setPlayerAvatar(imagePath) {
    return new Promise((resolve) => {
        try {
            const avatarSet = electron.ipcRenderer.sendSync('setPlayerAvatar', imagePath)
            resolve(avatarSet)
        } catch (e) {
            console.log(e)
            resolve(false)
        }
    })
}
