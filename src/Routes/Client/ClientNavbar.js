import React, { useState } from 'react'
import './ClientNavbar.css'

import Logo from '../../assets/images/Logo/logo.png'


import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    notificaion: {
        cursor: 'pointer',
        backgroundColor: '#999',
    },
    userProfile: {
        cursor: 'pointer',
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#02044a',
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
        cursor: 'pointer'
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const ClientNavbar = ({ isVisible }) => {

    const [show, setShow] = useState(true)

    const showVisibility = () => {
        isVisible(!show)
        setShow(!show);
    }

    const classes = useStyles();
    return (
        <>
            <div className="mainClientNavbar">
                <div className="innerClientNavbar">
                    <div className="superSourcingLogo">
                        <div>
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="navbarOptins">
                        <div className="postProject">
                            <div style={{ cursor: 'pointer' }} onClick={showVisibility}>
                                <p><i class="fa fa-plus-circle" aria-hidden="true"></i>Post Project</p>
                            </div>
                        </div>
                        <div className="clientNotification">
                            <div className={classes.root}>
                                <StyledBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar className={classes.notificaion} alt="Remy Sharp">
                                        <NotificationsActiveIcon />
                                    </Avatar>
                                </StyledBadge>
                            </div>
                        </div>
                        <div className="clientProfile">
                            <div>
                                <Avatar className={classes.userProfile} >
                                    <PermIdentityIcon />
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientNavbar
