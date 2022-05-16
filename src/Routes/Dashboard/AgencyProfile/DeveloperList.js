import React, { useEffect, useState } from 'react';
import './DeveloperList.css';
import instance from '../../../Constants/axiosConstants';
import { useHistory } from 'react-router-dom';
import TrashIcon from '../../../assets/images/Newestdashboard/Agency-Profile/material-delete.svg';
import { Modal } from 'react-responsive-modal';
import developerImage from '../../../assets/images/Newestdashboard/Agency-Profile/add-developer.svg';
import {
    withStyles,
    FormGroup,
    Switch,
    Grid,
    Typography
} from '@material-ui/core';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';
import { experienceRange } from '../../../shared/helper';
// import editImage from '../../../assets/images/OtherIcons/edit.png';
import editImage from '../../../assets/images/AgencyProfile/Group.svg';
import greenCheck from '../../../assets/images/AgencyProfile/greenCheck.svg';
import deleteIcon from '../../../assets/images/AgencyProfile/delete.svg';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 14,
        padding: 0,
        borderColor: '#fff'
    },
    switchBase: {
        padding: 2,
        top: -2,
        left: -2,
        // color: 'green',
        color: 'blue',
        // border: '1px solid #EBF5FB',
        '&$checked': {
            transform: 'translateX(14px)',
            color: '#FF0000',
            '& + $track': {
                opacity: 0.82,
                backgroundColor: 'blue'
                // border: '2px solid #FF0000',
            },
            // border: '1px solid #FF0000'
        }
    },
    thumb: {
        width: '12px',
        height: '12px',
        boxShadow: 'none',
        borderRadius: '46%',
        color: 'white',
        marginTop: '1px',
        marginLeft: '1px'
    },
    track: {
        borderRadius: 78 / 2,
        backgroundColor: 'green',
        opacity: 0.82
    },
    checked: {}
}))(Switch);

function DeveloperList(props) {
    const routerHistory = useHistory();
    const Role = localStorage.getItem('role');
    const agencyId = localStorage.getItem('userId');
    const [developers, setDevelopers] = useState([]);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [developerId, setDeveloperId] = useState(null);
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState();
    const [toggleIndexes, setToggleIndexes] = useState({});
    const [state, setState] = useState({
        checked: false
    });


    const getAgencyDevelopers = () => {
        if (agencyId)
            instance
                .get(`/api/${Role}/developers/all?agencyId=${agencyId}`)
                .then(function (response) {
                    let temp = {};

                    response.forEach((dev, index) => {
                        temp[index] = !dev.isDeveloperActive;
                    });
                    setToggleIndexes(temp);
                    setDevelopers(response);
                })
                .catch((err) => {
                    setErr(err?.response?.data?.message);
                });
    };
    const updateDevelopers = (data, developerId) => {
        let url = `/api/${Role}/developers/update/${developerId}`;
        instance
            .patch(url, data)
            .then((res) => { })
            .catch((err) => { });
    };

    const handleChangeToggle = (event, ind) => {
        let tempIndexes = { ...toggleIndexes };
        if (tempIndexes[ind]) {
            tempIndexes[ind] = !tempIndexes[ind];
        } else {
            tempIndexes[ind] = true;
        }
        setToggleIndexes(tempIndexes);

        let tempDevs = developers;
        tempDevs[ind].isDeveloperActive = !tempDevs[ind].isDeveloperActive;

        let data = {
            isDeveloperActive: developers[ind].isDeveloperActive
        };
        updateDevelopers(data, developers[ind]._id);
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const deleteDevelopers = () => {
        instance
            .delete(`api/${Role}/developers/delete/${developerId}`)
            .then(function (response) {
                setOpenWithdrawModal(false);
                const tempDevelopers = developers.filter(
                    (dev) => dev._id !== developerId
                );
                setDevelopers(tempDevelopers);
            })
            .catch((error) => { });
    };

    const IndexSetter = (index) => {
        setToggleIndexes(toggleIndexes);
        setOpen(!open);
    };

    useEffect(() => {
        getAgencyDevelopers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const deleteFunctionality = (agencyId) => {
        setDeveloperId(agencyId);
        setOpenWithdrawModal(true);
    };

    const editDeveloper = (id) => {
        routerHistory.push(`${AGENCYROUTES.ADD_DEVELOPER}/${id}`)
    }

    return (
        <div className='mainDeveloper_list' style={{ height: '600px', overflowY: 'scroll' }}>
            {/* <div className="mainDeveloperList"> */}
            <div
                className="innerDeveloperList"
                style={{ backgroundColor: err && 'white' }}
            >
                {developers.map((developer, index) => {
                    return (
                        <>
                            <div className="developerCard">
                                <div
                                    className="cross-icon"
                                    onClick={() =>
                                        deleteFunctionality(developer._id)
                                    }
                                >
                                    <img src={deleteIcon} alt="trash" />
                                </div>
                                <div
                                    className="group-icon"
                                    onClick={() =>
                                        editDeveloper(developer._id)
                                    }
                                >
                                    <img src={editImage} alt="edit" />
                                </div>
                                <div className="developerNameExp">
                                    <div className="developerName">
                                        <div style={{ display: 'flex', alignItems: 'center' }} >
                                            <h2>{`${developer.firstName
                                                .charAt(0)
                                                .toUpperCase() +
                                                developer.firstName.slice(1)
                                                } ${developer.lastName
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                developer.lastName.slice(1)
                                                }`}</h2>
                                            {/* <img
                                                src={editImage}
                                                onClick={() =>
                                                    editDeveloper(developer._id)
                                                }
                                                style={{ height: '20px', width: '20px', marginLeft: '14px', cursor: 'pointer' }}
                                            /> */}
                                        </div>

                                        <img src={greenCheck} className='rounded_developerList' alt="" />
                                        {/* <div
                                            className={`rounded_developerList ${toggleIndexes[index] &&
                                                'conditionalColor'
                                                }`}
                                        ></div> */}
                                    </div>
                                    <div className="developerExp">
                                        <span style={{ marginRight: '5px' }}><p>Status-</p></span>
                                        {toggleIndexes[index] ? (

                                            <p
                                            // style={{
                                            //     color: '#FF0000'
                                            // }}
                                            >
                                                Unavailable
                                            </p>
                                        ) : (
                                            <p>Available</p>
                                        )}
                                    </div>
                                </div>

                                <div className="developerTech">
                                    <h6 style={{ color: 'rgba(29, 36, 52, 0.7)' }} >Techstack</h6>
                                    <div className="developerTechNames">
                                        {developer.developerTechnologies.map(
                                            (tech) => {
                                                return (
                                                    <p>
                                                        {
                                                            tech.technologyName
                                                        }
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="developerBudgetResume">
                                    <div className="developerBudget">
                                        <div className="developer-detail">
                                            <div>
                                                <p style={{ color: 'rgba(29, 36, 52, 0.7)' }} >Experience</p>
                                                <h6>{experienceRange(developer.developerExperience)}</h6>
                                            </div>

                                            <div>
                                                <p style={{ color: 'rgba(29, 36, 52, 0.7)' }} >Timeline</p>
                                                <h6>
                                                    {parseInt(
                                                        developer.developerAvailability
                                                    ) === 0
                                                        ? `Immediately Available`
                                                        : `${developer.developerAvailability} Weeks`}
                                                </h6>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center' }} ><p style={{ color: 'rgba(29, 36, 52, 0.7)' }} >Budget</p></div>
                                                <h6>
                                                    ${developer?.developerPriceRange}
                                                    {' '}-{' '}
                                                    ${developer?.developerPriceRange + ((developer?.developerPriceRange / 100) * 20)}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="developers_content">
                                        <div
                                            className="developers-status_parent"
                                            onClick={() =>
                                                IndexSetter(index)
                                            }
                                        >
                                            <div className="developer-status_developerList">
                                                <p style={{ color: 'rgba(29, 36, 52, 0.7)' }} >Developer Status</p>
                                            </div>
                                            <div
                                                style={{
                                                    display:
                                                        open &&
                                                        toggleIndexes ===
                                                        index &&
                                                        'none'
                                                }}
                                                className="availability_toggle"
                                            >
                                                <FormGroup>
                                                    <Typography component="div">
                                                        <Grid
                                                            component="label"
                                                            container
                                                            alignItems="center"
                                                            spacing={1}
                                                        >
                                                            <Grid
                                                                item
                                                                className="statusLabel"
                                                            >
                                                                Available
                                                            </Grid>
                                                            <Grid item>
                                                                <AntSwitch
                                                                    checked={
                                                                        !!toggleIndexes[
                                                                        index
                                                                        ]
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleChangeToggle(
                                                                            event,
                                                                            index
                                                                        )
                                                                    }
                                                                    name="checked"
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                className="statusLabel"
                                                            >
                                                                Unavailable
                                                            </Grid>
                                                        </Grid>
                                                    </Typography>
                                                </FormGroup>
                                                <div className="developerResume">
                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                `${developer.developerDocuments[0].documentLink}`,
                                                                '_blank'
                                                            )
                                                        }
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    className="developerCard"
                    onClick={() =>
                        routerHistory.push(AGENCYROUTES.ADD_DEVELOPER)
                    }
                >
                    <div className="add-developer_parent">
                        <img src={developerImage} alt="developerImage" />
                        <h6 className="addDeveloperText">Add Developer</h6>
                    </div>
                </div>
                {/* : null */}
                {/* } */}
                {/* </div> */}
            </div>

            <Modal
                open={openWithdrawModal}
                onClose={() => {
                    setOpenWithdrawModal(false);
                }}
                styles={{
                    closeButton: { outline: 'none' }
                }}
                center
                classNames={{
                    overlay: 'QuotationModalOverlay',
                    modal: 'QuotationModal QuotationModal_DeveloperList'
                }}
            >
                <div className="rejection_modal_clientCommentBox">
                    <div className="reject-reason_label reject_or_not-label">
                        <h2 style={{ fontSize: '1rem', marginTop: '0rem' }}>
                            Do you want to delete developer from Agency's
                            Profile !!
                        </h2>
                    </div>
                </div>
                <div className="reject_or_not">
                    <div onClick={deleteDevelopers}>
                        <p>Yes</p>
                    </div>
                    <div
                        onClick={() => {
                            setOpenWithdrawModal(false);
                        }}
                    >
                        <p>No</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeveloperList;
