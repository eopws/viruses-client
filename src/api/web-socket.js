import io from "socket.io-client"

const socket = io('https://' + process.env.REACT_APP_API_URL)

export default socket
