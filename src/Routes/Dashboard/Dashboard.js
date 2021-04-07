import React, { useState } from 'react'
import './dashboard.css'

import oneSourcingLogo from '../../assets/images/Logo/logo.png'
import clientLogo from '../../assets/images/Logo/clientLogo.svg'
import notificationIcon from '../../assets/images/Logo/notification.png'
import clientProfile from '../../assets/images/Logo/clientProfile.jpeg'
import quotation from '../../assets/images/Logo/quotation.png'
import addDeveloper from '../../assets/images/Logo/addDeveloper.png'
import teamCreation from '../../assets/images/Logo/teamCreation.png'

//material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Navbar from './Navbar'




const Dashboard = () => {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(false);
    const [moreOption, setMoreOption] = useState(false);

    const handleClick = (event) => {
        console.log(event)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const optionHandle = (value) => {
        if (value == 'Add Developers') {
            window.location.href = "/add-developer"
        }
        else if (value == 'Quotation') {
            window.location.href = "/quotation"
        }
        else {
            alert(value)
        }
    }

    const cardsArray = [
        {
            title: 'Quotation',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: quotation,
            borderColor: `#28B3F3`,
        },
        {
            title: 'Add Developers',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: addDeveloper,
            borderColor: '#F57359'
        },
        {
            title: 'Team Creation',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: teamCreation,
            borderColor: '#AC92F5'
        },
    ]

    const moreOptions = [
        'None',
        'Atria',
        'Callisto',
        'Dione',
        'Ganymede',
    ];
    const moreHandleClick = (event) => {
        setMoreOption(event.currentTarget);
    };

    const moreHandleClose = () => {
        setMoreOption(null);
    };


    const allProjects = [
        {
            projectName: 'Project Name',
            desc: '',
            projectStatus: 'Live',
            budget: '$96',
            creationDate: '6 Dec 2020',
            duration: '180 Days',
            projectType: 'fintech'
        },
        {
            projectName: 'Project Name',
            desc: '',
            projectStatus: 'Live',
            budget: '$96',
            creationDate: '6 Dec 2020',
            duration: '180 Days',
            projectType: 'fintech'
        },
        {
            projectName: 'Project Name',
            desc: '',
            projectStatus: 'Completed',
            budget: '$96',
            creationDate: '6 Dec 2020',
            duration: '180 Days',
            projectType: 'fintech'
        },
        {
            projectName: 'Project Name',
            desc: '',
            projectStatus: 'Pending',
            budget: '$96',
            creationDate: '6 Dec 2020',
            duration: '180 Days',
            projectType: 'fintech'
        },
        {
            projectName: 'Project Name',
            desc: '',
            projectStatusText: 'Project',
            projectStatus: 'Completed',
            budget: '$96',
            creationDate: '6 Dec 2020',
            duration: '180 Days',
            projectType: 'fintech'
        },
    ]

    return (
        <>
            {/* Navbar  */}
            <Navbar headingInfo="Dashboard" />

            <div className="mainClientsOptions">
                <div className="innerClientsOptions">
                    {
                        cardsArray.map((value, index) => {
                            return (
                                <div className="mainQuotationCard" key={index} onClick={() => optionHandle(value?.title)} >
                                    <div className="leftLine" style={{
                                        backgroundColor: value?.borderColor
                                    }}></div>
                                    <div className="innerQuotationCard">
                                        <div className="quotationImage">
                                            <img src={value?.image} alt="" />
                                        </div>
                                        <div className="quotationInfo">
                                            <h2>{value?.title}</h2>
                                            <p>{value?.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>



            <div className="mainProjects">
                <div className="innerProjects">
                    <div className="projectHeading">
                        <div>
                            <h2>Your Projects</h2>
                        </div>
                        <div className="filtering">
                            <div className="filterBtn">
                                <h4>Filter</h4>
                                <div> <FilterListIcon /> </div>
                            </div>
                        </div>
                    </div>
                    <div className="allProjects">
                        {
                            allProjects.map((value, index) => {
                                return (
                                    <div className="mainProjectCard">
                                        <div className="innerProjectCard">
                                            <div className="projectInformation">
                                                <div className="projectDetails">
                                                    <div className="projectImage">
                                                        <img src={clientProfile} alt="" />
                                                    </div>
                                                    <div className="projectName">
                                                        <h4>{value?.projectName}</h4>
                                                    </div>
                                                </div>
                                                <div className="moreDetails">
                                                    <Button
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={moreHandleClick}
                                                    >
                                                        <MoreHorizIcon />
                                                    </Button>
                                                    <Menu
                                                        id="long-menu"
                                                        anchorEl={moreOption}
                                                        keepMounted
                                                        open={moreOption}
                                                        onClose={moreHandleClose}
                                                    >
                                                        {moreOptions.map((option) => (
                                                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="projectDescription">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet viverra eget ut enim, massa.</p>
                                            </div>
                                            <div className="projectTable">
                                                <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                    <h6>Project Status</h6>
                                                    <h6 style={{ color: value?.projectStatus == "Live" ? '#5cb85c' : value?.projectStatus == 'Completed' ? '#f0ad4e' : '#d9534f', fontWeight: 'bold' }} >{value?.projectStatus}</h6>
                                                </div>
                                                <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                    <h6>Budget</h6>
                                                    <h6>{value?.budget}</h6>
                                                </div>
                                                <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                    <h6>Creation Date</h6>
                                                    <h6>{value?.creationDate}</h6>
                                                </div>
                                                <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                    <h6>Duration</h6>
                                                    <h6>{value?.duration}</h6>
                                                </div>
                                                <div >
                                                    <h6>Project type</h6>
                                                    <h6>{value?.projectType}</h6>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard