const initialState = {
    gameRooms: {},
    fetchingRooms: false,
    currentGameRoom: null,
    gameObject: null,
    timeElapsed: 0,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "GAME:SET_GAME_ROOMS": {
            return {
                ...state,
                gameRooms: payload,
                fetchingRooms: false,
            }
        }

        case "GAME:SET_FETCHING_ROOMS": {
            return {
                ...state,
                fetchingRooms: payload,
            }
        }

        case "GAME:SET_CURRENT_ROOM": {
            return {
                ...state,
                currentGameRoom: payload,
            }
        }

        case "GAME:SET_GAME_OBJECT": {
            return {
                ...state,
                gameObject: payload,
            }
        }

        case "GAME:SET_TIME_ELAPSED": {
            return {
                ...state,
                timeElapsed: payload,
            }
        }

        case "GAME:CLEAR_DATA": {
            return {
                gameRooms: {},
                fetchingRooms: false,
                currentGameRoom: null,
                gameObject: null,
                timeElapsed: 0,
            }
        }

        default:
            return state
    }
}
