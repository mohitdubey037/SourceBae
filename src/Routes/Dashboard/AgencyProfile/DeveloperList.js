import React, { useEffect, useState } from 'react'
import './DeveloperList.css'
import instance from "../../../Constants/axiosConstants";
import { useHistory } from 'react-router-dom';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import TrashIcon from '../../../assets/images/Newestdashboard/Agency-Profile/material-delete.svg';
import { Modal } from "react-responsive-modal";
import developerImage from '../../../assets/images/Newestdashboard/Agency-Profile/add-developer.svg';
import { withStyles, FormGroup, Switch, Grid, Typography, Button } from '@material-ui/core';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 14,
        padding: 0,
        borderColor: "#fff",
    },
    switchBase: {
        padding: 2,
        top: -2,
        left: -2,
        color: 'green',
        border: "1px solid #EBF5FB",
        "&$checked": {
            transform: "translateX(14px)",
            color: '#FF0000',
            "& + $track": {
                opacity: 0.82,
                backgroundColor: "blue",
                // border: '2px solid #FF0000',
            },
            border: "1px solid #FF0000",
        },
    },
    thumb: {
        width: '12px',
        height: '12px',
        boxShadow: "none",
        borderRadius: '46%',
        color: 'white',
        marginTop: '1px',
        marginLeft: '1px'
    },
    track: {
        borderRadius: 78 / 2,
        backgroundColor: "blue",
        opacity: 0.82,
    },
    checked: {},
}))(Switch);

function DeveloperList(props) {
    const routerHistory = useHistory();
    const Role = localStorage.getItem('role')
    const agencyId = localStorage.getItem("userId")
    const [developers, setDevelopers] = useState([]);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [developerId, setDeveloperId] = useState(null);
    const [open, setOpen] = useState(false);

    const [err, setErr] = useState();
    const [toggleIndexes, setToggleIndexes] = useState({});

    const [state, setState] = useState({
        checked: false
    })

    const [agencyProfiledata, setAgencyProfileData] = useState({});
    const getAgencyDevelopers = () => {
        instance.get(`/api/${Role}/developers/all?agencyId=${agencyId}`)
            .then(function (response) {
                setDevelopers(response)
            })
            .catch(err => {
                console.error(err?.response?.data?.message)
                setErr(err?.response?.data?.message)
            })
    };

    const handleChangeToggle = (event, ind) => {
        let tempIndexes = { ...toggleIndexes }
        if (tempIndexes[ind]) {
            tempIndexes[ind] = !tempIndexes[ind]
        }
        else {
            tempIndexes[ind] = true
        }
        setToggleIndexes(tempIndexes)
        setState({ ...state, [event.target.name]: event.target.checked })
    };

    const deleteDevelopers = () => {
        console.log('hi');
        instance.delete(`api/${Role}/developers/delete/${developerId}`)
            .then(function (response) {
                setOpenWithdrawModal(false);
                const tempDevelopers = developers.filter(dev => dev._id !== developerId);
                setDevelopers(tempDevelopers);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const IndexSetter = (index) => {
        console.log(index);
        setToggleIndexes(index);
        setOpen(!open)
    }

    useEffect(() => {
        getAgencyDevelopers()
    }, [])

    useEffect(() => {
    }, [open])

    useEffect(() => {
    }, [developerId])

    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                setAgencyProfileData(response);
            })
            .catch((err) => {
            });
    };

    const deleteFunctionality = (agencyId) => {
        setDeveloperId(agencyId);
        setOpenWithdrawModal(true);
    }

    useEffect(() => {
        if (Role === 'Agency') {
            getAgencyProfile(agencyId, false);
        }
    }, []);



    return (
        <>
            <div className="mainDeveloperList">
                <div className="innerDeveloperList" style={{ backgroundColor: err && 'white' }}>
                    {err ?
                        <>
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img height="300px" src={PageNotFound} alt="no_data_img" />
                                <h6>{err}</h6>
                            </div>
                        </>
                        :
                        developers.map((developer, index) => {
                            return (
                                <div className="developerCard">
                                    <div className="cross-icon" onClick={() => deleteFunctionality(developer._id)}>
                                        {/* <img src={crossIcon} alt="cross-icon" /> */}
                                        {/* <i className="fas fa-trash-alt"></i> */}
                                        <img src={TrashIcon} alt="trash" />
                                    </div>
                                    <div className="developerNameExp">
                                        <div className="developerName">
                                            <div>
                                                <h2>{`${developer.firstName.charAt(0).toUpperCase() + developer.firstName.slice(1)} ${developer.lastName.charAt(0).toUpperCase() + developer.lastName.slice(1)}`}</h2>
                                            </div>
                                            {/* <p>{`${developer.developerExperience} year`}</p> */}
                                            <div className={`rounded_developerList ${state.checked && toggleIndexes[index] && "conditionalColor"}`}></div>
                                        </div>
                                        <div className="developerExp">
                                            {(toggleIndexes[index]) ?
                                                <p style={{ color: '#FF0000' }}>Unavailable</p>
                                                :
                                                <p>Available</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="developerTech">
                                        <h6>Techstack</h6>
                                        <div className="developerTechNames">
                                            {developer.developerTechnologies.map((tech) => {
                                                return <p>{tech.technologyName}</p>
                                            })}
                                        </div>
                                    </div>

                                    <div className="developerBudgetResume">
                                        <div className="developerBudget">
                                            <div className="developer-detail">
                                                <div>
                                                    <p>Experience</p>
                                                    <h6>{`${developer.developerExperience} year`}</h6>
                                                </div>

                                                <div>
                                                    <p>Timeline</p>
                                                    <h6>{developer.developerAvailability === -1 ? `Immediately Avaialable` : `${developer.developerAvailability} Weeks`}</h6>
                                                </div>
                                                <div>
                                                    <p>Budget</p>
                                                    <h6>{`$${developer.developerPriceRange}-$${developer.developerPriceRange + 3 * 1000}`}</h6>
                                                </div>
                                            </div>
                                            {/* <div className="developer-detail">

                                            </div> */}
                                        </div>

                                        <div className="developers_content">
                                            <div className="developers-status_parent" onClick={() => IndexSetter(index)}>
                                                <div className="developer-status_developerList">
                                                    <p>Developer Status</p>
                                                </div>
                                                <div style={{ display: (open && toggleIndexes === index) && 'none' }} className="availability_toggle">
                                                    <FormGroup>
                                                        <Typography component="div">
                                                            <Grid
                                                                component="label"
                                                                container
                                                                alignItems="center"
                                                                spacing={1}
                                                            >
                                                                <Grid item className="statusLabel">
                                                                    Available
                                                                </Grid>
                                                                <Grid item>
                                                                    <AntSwitch
                                                                        checked={!!toggleIndexes[index]}
                                                                        onChange={(event) => handleChangeToggle(event, index)}
                                                                        name="checked"
                                                                    />
                                                                </Grid>
                                                                <Grid item className="statusLabel">
                                                                    Unavailable
                                                                </Grid>
                                                            </Grid>
                                                        </Typography>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="developerResume">
                                                <button onClick={() => window.open(`${developer.developerDocuments[0].documentLink}`, "_blank")} >Download</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {Role === 'Agency' ?
                        agencyProfiledata.isAgencyVerified &&
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="developerCard" onClick={() => routerHistory.push("/add-developer")}>
                            <div className="add-developer_parent">
                                {/* <img src={addDeveloper} alt="" style={{ width: '25%', objectFit: 'contain' }} /> */}
                                <img src={developerImage} alt="developerImage" />
                                <h6 className="addDeveloperText">Add Developer</h6>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>

            <Modal
                open={openWithdrawModal}
                onClose={() => { setOpenWithdrawModal(false) }}
                center
                classNames={{
                    overlay: "QuotationModalOverlay",
                    modal: "QuotationModal",
                }}
            >
                <div className="rejection_modal_clientCommentBox">
                    <div className="reject-reason_label reject_or_not-label">
                        <h2>Are you sure..!!</h2>
                    </div>
                </div>
                <div className='reject_or_not'>
                    <div onClick={deleteDevelopers}>
                        <p>Yes</p>
                    </div>
                    <div onClick={() => { setOpenWithdrawModal(false) }}>
                        <p>No</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default DeveloperList
