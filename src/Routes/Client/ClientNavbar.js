import React, { useState } from 'react'
import './ClientNavbar.css'

import Logo from '../../assets/images/Logo/logo.png'


import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';


import notification from '../../assets/images/ClientDashboard/notification.svg'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

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

const ClientNavbar = ({ isVisible }, props) => {

    const routerHistory = useHistory();

    const [show, setShow] = useState(true);
    const [isNotification, setIsnotification] = useState(false);
    const [openmodal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const [anchr, setanchr] = useState(false);


    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);

    const showVisibility = () => {
        isVisible(!show)
        setShow(!show);
    }

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleProfile = () => {
        // window.location.href = '/client-profile';
        routerHistory.push('/client-profile');
        setAnchorEl(false);
    };

    const handleClick = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.target);
    };

    const handleLogout = () => {
        handleClose()
        localStorage.removeItem("Authorization");
        localStorage.removeItem('role');
        // window.location.href = "/"
        routerHistory.push('/');
    }

    const notificationPanel = (event) => {
        setIsnotification(!isNotification)
    }

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    const classes = useStyles();
    return (
        <>
            <div className="mainClientNavbar">
                <div className="innerClientNavbar">
                    <div className="superSourcingLogo">
                        <div style={{ cursor: 'pointer' }} onClick={() => routerHistory.push("/client-dashboard")} >
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="navbarOptins">
                        <div className="investmentArea">
                            <div className="investmentButton" onClick={onOpenModal} >
                                <p >Interested to Investment</p>
                                <span>New <i class="fa fa-level-down" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        {/* <div className="postProject"> */}
                        {isVisible ?
                            <div className="postProject">
                                <div style={{ cursor: 'pointer' }} onClick={showVisibility}>
                                    <p><i class="fa fa-plus-circle" aria-hidden="true"></i>Post Project</p>
                                </div>
                            </div>
                            :
                            null
                        }
                        {/* </div> */}
                        <div className="clientNotification" >
                            <div className={classes.root} onClick={notificationPanel}>
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
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                                <Avatar className={classes.userProfile} >
                                    <PermIdentityIcon />
                                </Avatar>
                            </div>

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={anchorEl}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>


            <div className={isNotification ? 'overlay' : null} ></div>
            <div className={isNotification ? 'notificationPanel open' : 'notificationPanel'}>
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="closeNotification">
                            <i onClick={notificationPanel} className="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <div className="allNotification">
                            <div className="allNotificationIcon">
                                <img src={notification} alt="" />
                            </div>
                            <div className="allNotificationText">
                                <p>All Notification</p>
                            </div>

                        </div>
                        <div className="notificationsCard">
                            {
                                arr.map(() => {
                                    return (
                                        <div className="notificationPoint">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et officia laboriosam repellendus, sit impedit.</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={openmodal} onClose={onCloseModal}
                classNames={{
                    overlay: 'NavbarModalLayer',
                    modal: 'NavbarModalStyle',
                }} center>
                <h2 className="addyourproductext">Add your Product</h2>
                <div className="newFeatureDiv">
                    <p>What's <span>NEW</span> in this..?<i className="fa fa-level-down" aria-hidden="true"></i></p>

                    <p className="productText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, necessitatibus! Provident, nemo. Aperiam fugiat quo earum dignissimos. Aliquid, nostrum dolorem!</p>

                    <ul>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div className="modalButton">
                    <button onClick={() => routerHistory("/product-agencies")} >Interested</button>
                    <button onClick={onCloseModal} >Not Interested</button>
                </div>
            </Modal>

        </>
    )
}

export default ClientNavbar