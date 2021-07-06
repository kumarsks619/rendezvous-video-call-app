import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

import { SocketContext } from '../../SocketContext'
import useStyles from './styles'

const Notifications = () => {
    const { handleCallAnswer, callData, isCallAccepted } = useContext(SocketContext)
    const classes = useStyles()

    return (
        <>
            {callData.isReceived && !isCallAccepted && (
                <div className={classes.wrapper}>
                    <h2>{callData.name} is calling...</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCallAnswer}
                        className={classes.button}
                    >
                        Answer
                    </Button>
                </div>
            )}
        </>
    )
}

export default Notifications
