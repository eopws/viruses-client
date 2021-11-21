import socket from "@api/web-socket"

export async function fetchGameRooms() {
    return new Promise((resolve) => {
        socket.emit('game:getRooms', (response) => {
            resolve(response)
        })
    })
}

export async function createGameRoom(gameRoomData, playerData) {
    return new Promise((resolve) => {
        socket.emit('game:createGame', {
            gameRoomData,
            playerData,
        }, (response) => {
            resolve(response)
        })
    })
}

export async function connectToGameRoom(roomId, playerData) {
    return new Promise((resolve) => {
        socket.emit('game:connectToRoom', {
            roomId, playerData
        }, (response) => {
            resolve(response)
        })
    })
}

export async function startGame() {
    return new Promise((resolve) => {
        socket.emit('game:start', (response) => {
            resolve(response)
        })
    })
}

export async function fetchGameAmbience() {
    return new Promise((resolve) => {
        socket.emit('game:getGameAmbience', (state) => {
            resolve(state)
        })
    })
}

export async function emitStep(stepDetails) {
    socket.emit('game:step', stepDetails)
}

export async function getCellActions(cell) {
    return new Promise((resolve) => {
        socket.emit('game:getCellActions', cell, (actions) => {
            resolve(actions)
        })
    })
}

export async function fetchShopProducts() {
    return new Promise((resolve) => {
        socket.emit('game:getShopProducts', (response) => {
            resolve(response)
        })
    })
}

export async function shopTransaction(transactionDetails) {
    return new Promise((resolve) => {
        socket.emit('game:shopTransaction', transactionDetails, (response) => {
            resolve(response)
        })
    })
}

export async function sendMessage(messageContent) {
    socket.emit('chat:sendMessage', messageContent)
}

export async function getMessages() {
    return new Promise((resolve) => {
        socket.emit('chat:getMessages', (response) => {
            resolve(response)
        })
    })
}

export async function surrender(leaveBattle = true) {
    return new Promise((resolve) => {
        socket.emit('game:stopPlaying', leaveBattle, (response) => {
            resolve(response)
        })
    })
}
