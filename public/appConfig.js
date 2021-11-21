const electron = require('electron')
const path = require('path')
const fs = require('fs')

class AppConfig {
    static get defaultSettings() {
        return {
            "sound": {
                "label": "SOUND",
                "items": {
                    "SFX": {
                        "value": 50,
                        "max": 100,
                        "type": "slider",
                        "label": "SFX"
                    },
                    "backgroundMusic": {
                        "value": 50,
                        "max": 100,
                        "type": "slider",
                        "label": "background music"
                    }
                }
            },
            "player": {
                "label": "PLAYER",
                "items": {
                    "nickname": {
                        "value": "",
                        "max": 20,
                        "type": "text",
                        "label": "nickname"
                    },
                    "avatar": {
                        "value": null,
                        "max": 20,
                        "type": "file",
                        "mimeType":"image/*",
                        "label": "avatar"
                    },
                    "color": {
                        "value": null,
                        "type": "hidden"
                    }
                }
            },
            "language": {
                "label": "languageLabel",
                "items": {
                    "lang": {
                        "value": "en",
                        "type": "enum",
                        "values": [
                            "en",
                            "ru",
                            "ua"
                        ],
                        "label": "languageLabel"
                    }
                }
            }
        }
    }

    constructor(opts) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData')

        this._path = path.join(userDataPath, 'viruses-online-config.json')

        // create config if not exist
        fs.closeSync(fs.openSync(this._path, 'a+'))

        try {
            this._data = parseDataFile(this._path)
        } catch (e) {
            this.setConfigToDefault()
            this._data = AppConfig.defaultSettings;
        }
    }

    setConfigToDefault() {
        const config = JSON.stringify(AppConfig.defaultSettings)
        fs.writeFileSync(this._path, config)
    }

    getConfig() {
        return this._data ?? {}
    }

    updateConfig(newConfigValues) {
        const intermediateConfig = JSON.parse(JSON.stringify(this._data))

        try {
            for (let block in newConfigValues) {
                for (let item in newConfigValues[block].items) {
                    intermediateConfig[block].items[item].value = newConfigValues[block].items[item].value
                }
            }
        } catch (e) {
            console.log(e)
            return false
        }

        const config = JSON.stringify(intermediateConfig)
        fs.writeFileSync(this._path, config)

        this._data = intermediateConfig
    }

}

function parseDataFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    } catch(error) {
        throw new Error('App JSON config error')
    }
}

module.exports = AppConfig
