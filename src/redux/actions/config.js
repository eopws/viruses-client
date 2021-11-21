import { getConfig, setConfig as setConfigApi } from "@api/ipc-api"

export function fetchConfig() {
    return async (dispatch) => {
        dispatch(setConfigAvailable(false))

        let newConfig = await getConfig()

        newConfig = JSON.parse(newConfig)

        dispatch(setConfig(newConfig))
    }
}

//setGlobalConfig
export function flushGlobalConfig() {
    return async (dispatch, getState) => {
        const config = getState().config.config

        await setConfigApi(config)
    }
}

export function setConfigAvailable(payload) {
    return {type: "CONFIG:AVAILABLE", payload}
}

export function setConfig(payload) {
    return {type: "CONFIG:SET", payload}
}

export function updateConfigItem(payload) {
    return {type: "CONFIG:UPDATE_ITEM", payload}
}
