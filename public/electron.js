const path      = require('path')
const fs        = require('fs')
const sharp     = require('sharp')

const { ipcMain, app, BrowserWindow } = require('electron')
const isDev                  = require('electron-is-dev')

const AppConfig = require('./appConfig')

let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (!isDev) {
        win.setMenu(null)
    }

    // and load the index.html of the app.
    // win.loadFile("index.html")
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )

    // Open the DevTools.
    if (isDev) {
        //win.webContents.openDevTools({ mode: 'detach' })
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// appConfig
const gameConfig = new AppConfig()

ipcMain.on('getAppConfig', (e) => {
    const configJSON = JSON.stringify(gameConfig.getConfig())

    win.webContents.send('giveAppConfig', configJSON)
})

ipcMain.on('setAppConfig', (e, newConfig) => {
    gameConfig.updateConfig(newConfig)
    e.returnValue = true
})

// quit message
ipcMain.on('quitGame', () => {
    app.quit()
})

ipcMain.on('setVirusImage', (e, imageDataBuffer) => {
    sharp(imageDataBuffer)
    .resize(64, 64)
    .toFile('src/assets/virus.png', (err, info) => false)
})

ipcMain.on('setPlayerAvatar', (e, imagePath) => {
    const avatarInfo = fs.statSync(imagePath)
    const avatarSize = avatarInfo.size

    if (avatarSize > 40720) {
        e.returnValue = false
        return
    }

    fs.copyFile(imagePath, 'src/assets/avatar.png', (err) => {
        e.returnValue = !err
    })
})
