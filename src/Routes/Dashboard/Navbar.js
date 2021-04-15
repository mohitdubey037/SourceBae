import React, { useState } from 'react'
import './dashboard.css'

import oneSourcingLogo from '../../assets/images/Logo/logo.png'
import clientLogo from '../../assets/images/Logo/clientLogo.svg'
import notificationIcon from '../../assets/images/Logo/notification.png'
import clientProfile from '../../assets/images/Logo/clientProfile.svg'

//material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


function Navbar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(false);
    const [isNotification, setIsNotification] = React.useState(null);

    const handleClick = (event) => {
        console.log(event)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleNotification = (event) => {
        setIsNotification(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setIsNotification(null);
    };

    const open = Boolean(isNotification);
    const id = open ? 'simple-popover' : undefined;

    const goToDashboard = () => {
        window.location.href = "/dashboard"
    }

    return (
        <>
            <div className="mainNavbar">
                <div className="innerNavbar">
                    <div className="oneSourcingLogo">
                        <div>
                            <img onClick={goToDashboard} src={oneSourcingLogo} alt="" />
                        </div>
                    </div>
                    <div className="dashboardHeading">
                        <div>
                            <h3>{props?.headingInfo}</h3>
                        </div>
                    </div>
                    <div className="clientInfo">
                        <div className="clientCompany">
                            <img onClick={() => window.location.href = "/agency-profile"} src={clientLogo} alt="" />
                        </div>
                        <div onClick={handleNotification} aria-describedby={id} className="clientNotification">
                            <img src={notificationIcon} alt="" />
                        </div>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={isNotification}
                            onClose={handleNotificationClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>The content of the Popover.
                            <br />  and you are not the owner</Typography>
                        </Popover>
                        <div className="userProfile">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="clientProfile">
                                <img src={clientProfile} alt="" />
                            </div>

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={anchorEl}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
