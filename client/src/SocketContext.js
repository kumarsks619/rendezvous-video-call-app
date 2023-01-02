import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext()

// const SERVER_URL = 'http://localhost:5000'
const SERVER_URL = 'https://video-call-app.onrender.com'

const socket = io(SERVER_URL)

const ContextProvider = ({ children }) => {
    const userVideoRef = useRef()
    const friendVideoRef = useRef()
    const connectionRef = useRef()

    const [stream, setStream] = useState(null)
    const [user, setUser] = useState('')
    const [callData, setCallData] = useState({})
    const [isCallAccepted, setIsCallAccepted] = useState(false)
    const [isCallEnded, setIsCallEnded] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)

                userVideoRef.current.srcObject = currentStream
            })

        socket.on('me', (userID) => setUser(userID))

        socket.on('call-user', ({ from, name: callerName, signal }) => {
            setCallData({
                isReceived: true,
                from,
                name: callerName,
                signal,
            })
        })
    }, [])

    const handleCallAnswer = () => {
        setIsCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answer-call', { signal: data, to: callData.from })
        })

        peer.on('stream', (currentStream) => {
            friendVideoRef.current.srcObject = currentStream
        })

        peer.signal(callData.signal)

        connectionRef.current = peer
    }

    const handleCallUser = (userToCallID) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('call-user', {
                userToCall: userToCallID,
                signalData: data,
                from: user,
                name,
            })
        })

        peer.on('stream', (currentStream) => {
            friendVideoRef.current.srcObject = currentStream
        })

        socket.on('call-accepted', (signal) => {
            setIsCallAccepted(true)

            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const handleCallEnd = () => {
        setIsCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    return (
        <SocketContext.Provider
            value={{
                isCallEnded,
                isCallAccepted,
                callData,
                userVideoRef,
                friendVideoRef,
                stream,
                name,
                setName,
                user,
                handleCallUser,
                handleCallAnswer,
                handleCallEnd,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, ContextProvider }
