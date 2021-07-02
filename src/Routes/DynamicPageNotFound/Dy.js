import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom';
import './Dy.css';

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        // border: '2px solid red',
    },
    paper: {
        // border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70vh',
        margin: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        // marginTop: theme.spacing(2),
        justifyContent: 'center',
        maxHeight: '30vh'
    }
}))

function Dy() {
    const classes = useStyles();
    const { id } = useParams();

    let message;
    if (id === '404') {
        message = 'page not found'
    }
    if (id === '500') {
        message = 'Internal server error'
    }
    return (
        // <Container component="main" maxWidth="l">
        <div className={classes.main}>
            <div className={classes.paper}>
                <div className='emojiFace'>
                    <div className='eye_container'>
                        <div className='left-eye'></div>
                        <div className='right-eye'></div>
                    </div>
                    <span className='mouth'>
                        {/* <hr className="mouth" /> */}
                    </span>
                </div>
                <Container className={classes.container}>
                    <Typography component='h2' variant='h4'>{id}</Typography>
                    <Typography component='h2' variant='h4'>404 </Typography>
                    <Typography component='h2' variant='h4'>Page Not Found </Typography>
                    <Typography component='h2' variant='h4'>Oops</Typography>
                    <Typography component='h2' variant='h2'>{message}</Typography>
                    <Typography component='h2' variant='h6'>The Page you are looking for doesn't exist or an other error occurred.</Typography>
                    <Typography component='h2' variant='h6'>Go back, or head over over to the onesourcing.com to choose a new direction</Typography>
                </Container>
            </div>
        </div>
        // </Container>
    )
}

export default Dy;