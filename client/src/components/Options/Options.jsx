import React, { useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons'

import { SocketContext } from '../../SocketContext'
import useStyles from './styles'

const Options = ({ children }) => {
    const {
        user,
        isCallAccepted,
        name,
        setName,
        isCallEnded,
        handleCallEnd,
        handleCallUser,
    } = useContext(SocketContext)
    const classes = useStyles()

    const [friendToCall, setFriendToCall] = useState('')

    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography variant="h6" gutterBottom>
                                Account Info
                            </Typography>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <CopyToClipboard text={user} className={classes.margin}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    startIcon={<Assignment fontSize="large" />}
                                >
                                    Copy Your ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>

                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography variant="h6" gutterBottom>
                                Make a Call
                            </Typography>
                            <TextField
                                label="ID to Call"
                                value={friendToCall}
                                onChange={(e) => setFriendToCall(e.target.value)}
                                fullWidth
                            />
                            {isCallAccepted && !isCallEnded ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    startIcon={<PhoneDisabled fontSize="large" />}
                                    className={classes.margin}
                                    onClick={handleCallEnd}
                                >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    startIcon={<Phone fontSize="large" />}
                                    className={classes.margin}
                                    onClick={() => handleCallUser(friendToCall)}
                                >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options
