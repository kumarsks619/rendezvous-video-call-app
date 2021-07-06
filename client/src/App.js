import React from 'react'
import { Typography, AppBar } from '@material-ui/core'

import VideoWindow from './components/VideoWindow/VideoWindow'
import Options from './components/Options/Options'
import Notifications from './components/Notifications/Notifications'
import useStyles from './styles.js'
import './App.css'

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h3" align="center">
                    Rendezvous - Video Chat
                </Typography>
            </AppBar>

            <VideoWindow />

            <Options>
                <Notifications />
            </Options>
        </div>
    )
}

export default App
