import React, { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'

import { SocketContext } from '../../SocketContext'
import useStyles from './styles'

const VideoWindow = () => {
    const {
        userVideoRef,
        friendVideoRef,
        isCallAccepted,
        isCallEnded,
        name,
        callData,
        stream,
    } = useContext(SocketContext)
    const classes = useStyles()

    return (
        <Grid container className={classes.gridContainer}>
            {/* User's Video */}
            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            {name || 'Name'}
                        </Typography>
                        <video
                            playsInline
                            muted
                            autoPlay
                            ref={userVideoRef}
                            className={classes.video}
                        />
                    </Grid>
                </Paper>
            )}

            {/* Friend's Video */}
            {isCallAccepted && !isCallEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            {callData.name || 'Name'}
                        </Typography>
                        <video
                            playsInline
                            autoPlay
                            ref={friendVideoRef}
                            className={classes.video}
                        />
                    </Grid>
                </Paper>
            )}
        </Grid>
    )
}

export default VideoWindow
