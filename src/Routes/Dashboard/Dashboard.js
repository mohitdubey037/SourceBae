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
import Moment from 'react-moment';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal'



const Dashboard = () => {

    const Role = "agency";
    const agencyId = localStorage.getItem('userId');

    const [steps, setSteps] = useState(0)
    const [formRoute, setFormRoute] = useState("/")
    const [anchorEl, setAnchorEl] = useState(false);
    const [moreOption, setMoreOption] = useState(false);
    const [isPopover, setIsPopover] = useState(false);
    const [popindex, setPopIndex] = useState('');

    const [age, setAge] = React.useState('');
    const [verified, setVerified] = useState(false)
    const [allProjects, setProjects] = useState([])
    const [openmodal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const getAllProjects = () => {
        instance.get(`api/${Role}/projects/all?agencyId=${agencyId}&quotationReceived=`)
            .then(function (response) {
                setProjects(response);
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getAllProjects()
    }, [])

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
            title: 'Add Your Product',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: teamCreation,
            borderColor: '#AC92F5',
            route: "modal",
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
        if (verified && (steps === -1)) {
            if (route === "modal")
                onOpenModal()
            else
                window.location.href = route
        }
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
                            allProjects?.projects?.length > 0 ?
                            allProjects?.projects?.map((value, index) => {
                                    return (
                                        <div className="mainProjectCard">
                                            <div className="innerProjectCard">
                                                <div className="projectInformation">
                                                    <div className="projectDetails">
                                                        <div className="projectImage">
                                                            <img src={clientProfile} alt="" />
                                                        </div>
                                                        <div className="projectName">
                                                            <NavLink className="projectN" to={{
                                                                pathname: "/project-details",
                                                                state: { ...value },
                                                                condition: 'Agency',

                                                            }}
                                                            >{value?.projectName}
                                                            </NavLink>
                                                            {/* <h4>{value?.projectName}</h4>  */}
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
                                                    <p>{value?.projectDescription}</p>
                                                </div>
                                                <div className="projectTable">
                                                    <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                        <h6>Project Status</h6>
                                                        <h6 style={{ color: value?.projectCurrentStatus === "Live" ? '#5cb85c' : value?.projectCurrentStatus === 'Completed' ? '#f0ad4e' : '#d9534f', fontWeight: 'bold' }} >{value?.projectCurrentStatus}</h6>
                                                    </div>
                                                    <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                        <h6>Budget</h6>
                                                        <h6>{value?.projectProposalCost}</h6>
                                                    </div>
                                                    <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                        <h6>Creation Date</h6>
                                                        <Moment format="D MMM YYYY" withTitle><h6>{value?.createdAt}</h6></Moment>
                                                    </div>
                                                    <div style={{ borderBottom: '1px solid #d3d3d3' }}>
                                                        <h6>Duration</h6>
                                                        <h6>45</h6>
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
                                : <h2>No Data Found</h2>
                        }
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
                    {/* <button onClick={() => window.location.href = "/product-agencies"}>Interested</button> */}
                    <NavLink className='modalNavLink' to={{
                        pathname: "/product-form"
                    }}>Interested</NavLink>
                    <button style={{marginTop: 0, marginBottom: 0}} onClick={onCloseModal} >Not Interested</button>
                </div>
            </Modal>

        </>
    )
}

export default Dashboard

