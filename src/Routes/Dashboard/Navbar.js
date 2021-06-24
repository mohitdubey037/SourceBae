import React, { useState } from 'react'
import './dashboard.css'

import oneSourcingLogo from '../../assets/images/Logo/logo.png'
import clientLogo from '../../assets/images/Logo/clientLogo.svg'
import notificationIcon from '../../assets/images/Logo/notification.png'
import HireDeveloperLogo from '../../assets/images/AddDeveloper/developerHire.png'
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
import { useHistory } from 'react-router-dom';


import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';



const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(false);
    const [isNotification, setIsNotification] = React.useState(null);
    const routerHistory = useHistory();

    const [openmodal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleProfile = () => {
        routerHistory.push('/agency-profile');
        // window.location.href='/agency-profile';
        setAnchorEl(false);
    };


    const handleNotification = (event) => {
        setIsNotification(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setIsNotification(null);
    };

    const handleLogout = ()=>{
        handleClose()
        localStorage.removeItem("Authorization");
        localStorage.removeItem('role');
        routerHistory.push('/')
        // window.location.href = "/"
    
    }
    const open = Boolean(isNotification);
    const id = open ? 'simple-popover' : undefined;

    const goToDashboard = () => {
        // window.location.href = "/dashboard"
        routerHistory.push('/dashboard')
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
                    {/* <div className="dashboardHeading">
                        <div>
                            <h3>{props?.headingInfo}</h3>
                        </div>
                    </div> */}
                    {/* <div className="newFeatureAdded">
                        <span>New <i class="fa fa-level-down" aria-hidden="true"></i></span>
                        <button onClick={onOpenModal}>Add Your Product</button>
                    </div> */}
                    <div className="clientInfo">
                        <div className="clientCompany">
                            <img onClick={() => routerHistory.push("/agency-profile")} src={clientLogo} alt="" />
                        </div>
                        <div onClick={handleNotification} aria-describedby={id} className="clientNotification">
                            <img src={notificationIcon} alt="" />
                        </div>
                        <div className="clientNotification">
                            <img style={{width: '85%'}} onClick={() => routerHistory.push("/get-hire-developer")} src={HireDeveloperLogo} alt="" />
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
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Modal open={openmodal} onClose={onCloseModal}
                classNames={{
                    overlay: 'NavbarModalLayer',
                    modal: 'NavbarModalStyle',
                }} center>
                <h2 className="addyourproductext">Add your Product</h2>
                <div className="newFeatureDiv">
                    <p>What's <span>NEW</span> in this..?<i class="fa fa-level-down" aria-hidden="true"></i></p>

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
                    <button onClick={() => window.location.href = "/product-form"} >Interested</button>
                    <button onClick={onCloseModal} >Not Interested</button>
                </div>
            </Modal> */}
        </>
    )
}

export default Navbar
