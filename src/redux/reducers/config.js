const initialState = {
    config: {},
    configAvailable: false,
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case "CONFIG:SET": {
            return {
                ...state,
                configAvailable: true,
                config: payload,
            }
        }

        case "CONFIG:AVAILABLE": {
            return {
                ...state,
                configAvailable: payload,
            }
        }

        case "CONFIG:UPDATE_ITEM": {
            const newConfig = JSON.parse(JSON.stringify(state.config))

            newConfig[payload.block].items[payload.key].value = payload.value

            return {
                ...state,
                config: newConfig
            }
        }

        default:
            return state
    }
}
