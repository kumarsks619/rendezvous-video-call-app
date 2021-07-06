const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    },
})

app.use(cors())

app.get('/', (req, res) => {
    res.send('Rendezvous server is up and running!')
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('call-ended')
    })

    socket.on('call-user', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('call-user', { signal: signalData, from, name })
    })

    socket.on('answer-call', (data) => {
        io.to(data.to).emit('call-accepted', data.signal)
    })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
