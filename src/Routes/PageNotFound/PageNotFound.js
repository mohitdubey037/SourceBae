import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontWeight: 'bold',
        margin: '10px'
    },
    label: {
        textTransform: 'capitalize'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        fontFamily: 'Open Sans',
        fontWeight: '900'
    },
    paragraphStyling: {
        textAlign: 'center'
    }
});

export default function PageNotFound(props) {
    const Role = localStorage.getItem('role');
    const classes = useStyles();

    const homePage = () => {
        // localStorage.removeItem("Authorization");
        // localStorage.removeItem('role');
        if (Role === 'Client') {
            props.history.replace('/client-newest-dashboard');
        } else if (Role === 'Agency') {
            props.history.replace('/agency-newest-dashboard');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <Container className={classes.container}>
            <Typography
                style={{ fontSize: '135px', fontWeight: '900', margin: '10px' }}
                variant="h1"
            >
                Oops!
            </Typography>
            <Typography
                style={{ fontWeight: 'bold', margin: '10px' }}
                variant="h6"
            >
                404 - PAGE NOT FOUND
            </Typography>
            <div className={classes.paragraphStyling}>
                <Typography
                    style={{
                        margin: '10px',
                        padding: '0 20%',
                        width: '80ch',
                        color: 'black'
                    }}
                    variant="body1"
                >
                    The page you are looking for might have been removed, had
                    its name changed or is temporarily unavailable
                </Typography>
            </div>
            <Button
                classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-root-x`
                    label: classes.label // class name, e.g. `classes-nesting-label-x`
                }}
                onClick={homePage}
                variant="contained"
            >
                GO TO HOMEPAGE
            </Button>
        </Container>
    );
}
