import { fetchGameRooms,
    createGameRoom as createGameRoomApi,
    connectToGameRoom as connectToGameRoomApi } from "@api/web-socket-api"

export function fetchRooms() {
    return async (dispatch) => {
        dispatch(setFetchingRooms(true))

        const rooms = await fetchGameRooms()

        dispatch(setGameRooms(rooms))
    }
}

export function createGameRoom(gameRoomData, playerData) {
    return async (dispatch) => {
        const newRoom = await createGameRoomApi(gameRoomData, playerData)

        if (newRoom) {
            console.log('setting room', newRoom)
            dispatch(setCurrentRoom(newRoom))
        }
    }
}

export function connectToGameRoom(roomId, playerData) {
    return async (dispatch) => {
        const newRoom = await connectToGameRoomApi(roomId, playerData)

        console.log('conn setting room', newRoom)
        dispatch(setCurrentRoom(newRoom))
    }
}

export function setGameRooms(payload) {
    return {type: "GAME:SET_GAME_ROOMS", payload}
}

export function setFetchingRooms(payload) {
    return {type: "GAME:SET_FETCHING_ROOMS", payload}
}

export function setCurrentRoom(payload) {
    return {type: "GAME:SET_CURRENT_ROOM", payload}
}

export function setGameObject(payload) {
    return {type: "GAME:SET_GAME_OBJECT", payload}
}

export function setUpdateGameTime(payload) {
    return {type: "GAME:SET_TIME_ELAPSED", payload}
}

export function clearGameData() {
    return {type: "GAME:CLEAR_DATA"}
}
