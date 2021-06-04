import React, { useEffect, useState } from 'react'
import './dashboard.css'
import clientProfile from '../../assets/images/Logo/clientProfile.jpeg'
import quotation from '../../assets/images/Logo/quotation.png'
import addDeveloper from '../../assets/images/Logo/addDeveloper.png'
import teamCreation from '../../assets/images/Logo/teamCreation.png'

//material-ui
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Navbar from './Navbar'

import Select from '@material-ui/core/Select';

import Tooltip from 'react-power-tooltip'
import { Link, NavLink } from 'react-router-dom'
import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"


const Dashboard = () => {

    const Role = "agency"

    const [steps, setSteps] = useState(0)
    const [formRoute, setFormRoute] = useState("/")
    const [anchorEl, setAnchorEl] = useState(false);
    const [moreOption, setMoreOption] = useState(false);
    const [isPopover, setIsPopover] = useState(false);
    const [popindex, setPopIndex] = useState('');

    const [age, setAge] = React.useState('');
    const [verified, setVerified] = useState(false)

    const handleClick = (event) => {
        console.log(event)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    const cardsArray = [
        {
            title: 'Quotation',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: quotation,
            borderColor: `#28B3F3`,
            route: "/quotation"
        },
        {
            title: 'Add Developers',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: addDeveloper,
            borderColor: '#F57359',
            route: "/add-developer"
        },
        {
            title: 'Team Creation',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: teamCreation,
            borderColor: '#AC92F5',
            route: "/dashboard"
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

    const getStepsCompleted = () => {
        instance.get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                if (response.stepsCompleted === response.totalSteps)
                    setSteps(-1)
                else {
                    setSteps(response.stepsCompleted)
                    let route = `/agency-form-${helper.getNumberSpell(response.stepsCompleted)}`
                    setFormRoute(route)
                }
            })
    }

    const getAgencyProfile = (agencyId) => {

        instance.get(`/api/${Role}/agencies/get/${agencyId}`)
            .then(function (response) {
                setVerified(response.isAgencyVerified)
            })

    }

    const handleLink = (route) => {
        if (verified && (steps === -1))
            window.location.href = route
    }
    useEffect(() => {
        getStepsCompleted()
        getAgencyProfile(localStorage.getItem("userId"))
    }, [])

    useEffect(() => {
        console.log(formRoute)
    }, [formRoute])
    useEffect(() => {
        console.log(steps)
    }, [steps])

    return (
        <>
            {/* Navbar  */}
            <Navbar headingInfo="Dashboard" />

            {(!verified || steps !== -1) && <div className="mainUpdateVerify">
                <div className="innerMainVerify">

                    {!verified && steps !== -1 ?
                        <p>Please<span onClick={() => window.location.href = `${formRoute}`} >Update & Verify </span> your profile to use our services.</p>
                        :
                        <p>Please wait for your profile to be verified by us.</p>
                    }
                </div>
            </div>}

            <div className="mainClientsOptions">
                <div className="innerClientsOptions">
                    {
                        cardsArray.map((value, index) => {
                            return (
                                <Link style={{ textDecoration: "none" }} onClick={() => handleLink(value.route)}>
                                    <div className="mainQuotationCard" key={index} style={{ filter: `${(!verified || steps !== -1) ? `grayscale(100%)` : `none`}` }}>
                                        <div className="leftLine" style={{
                                            backgroundColor: value?.borderColor,
                                        }}></div>
                                        <div
                                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '999', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            onMouseOver={() => {
                                                setIsPopover(true)
                                                setPopIndex(index)
                                            }}
                                            onMouseLeave={() => setIsPopover(false)}>
                                            <i style={{ fontSize: 22, color: value?.borderColor }} class="fa fa-info-circle" aria-hidden="true"></i>
                                            {/* ADD TOOLTIP HERE */}
                                            {
                                                isPopover && popindex === index
                                                &&
                                                <Tooltip show={true} position="bottom center" textBoxWidth="120px" animation="bounce">
                                                    <span>Some text</span>
                                                </Tooltip>
                                            }
                                        </div>
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
                                </Link>
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
                            <div className="filterBtn" id="demo-simple-select-label">
                                <h4>Filter</h4>
                                {/* <div> <FilterListIcon /> </div> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    <MenuItem value={10}>Completed</MenuItem>
                                    <MenuItem value={20}>Pending</MenuItem>
                                    <MenuItem value={30}>Cancelled</MenuItem>
                                </Select>
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
                                                <div className="projectDetails" onClick={() => window.location.href = "/project-details"} style={{ cursor: 'pointer' }}>
                                                    <div className="projectImage">
                                                        <img src={clientProfile} alt="" />
                                                    </div>
                                                    {/* <div className="projectName"> */}
                                                        <NavLink className="projectName" to={{
                                                            pathname: "/project-details",
                                                            state: { ...value },
                                                            condition: 'Agency'
                                                        }}
                                                        >{value?.projectName}
                                                        </NavLink>
                                                        {/* <h4>{value?.projectName}</h4> */}
                                                    {/* </div> */}
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
                                                    <h6 style={{ color: value?.projectStatus === "Live" ? '#5cb85c' : value?.projectStatus === 'Completed' ? '#f0ad4e' : '#d9534f', fontWeight: 'bold' }} >{value?.projectStatus}</h6>
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