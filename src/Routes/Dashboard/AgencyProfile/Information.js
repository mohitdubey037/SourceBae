import React, { useState, useEffect } from 'react'
import './Information.css';
import axios from 'axios';
import { useParams } from "react-router";
import Information_edit from '../../../assets/images/Newestdashboard/Agency-Profile/Information_edit.svg';
import moment from 'moment'
import instance from "../../../Constants/axiosConstants";
import Alert from '@material-ui/lab/Alert';
import * as helper from "../../../shared/helper";
import { toast } from "react-toastify";

function Information(props) {

    // const { id } = useParams();
    const Role = localStorage.getItem('role');
    const day = moment(`${props?.data?.incorporationDate}`).format("MM-DD-YYYY");

    const [agencyProfiledata, setAgencyProfileData] = useState({})

    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                setAgencyProfileData(response);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        if (Role === 'Agency') {
            getAgencyProfile(localStorage.getItem("userId"), false);
        }
    }, []);

    const handleErrorsValidation = (url) => {
        if (!helper.validateLink(url)) {
            toast.error('Wrong link provided');
            return false;
        }
        else {
            return true;
        }
    }

    const [arr, setArr] = useState([
        {
            title: 'Agency Name',
            inputValue: `${props?.data.agencyName}`,
            disabled: false
        },
        {
            title: 'Date of Incorporation',
            inputValue: `${day}`,
            disabled: false
        },
        {
            title: 'Director Name',
            inputValue: `${props?.data?.ownerName}`,
            disabled: false
        },
        {
            title: 'Agency Email Id',
            inputValue: `${props.data.agencyEmail}`,
            disabled: props?.id ? true : false
        },
        {
            title: 'Agency Website',
            inputValue: `${props?.data?.socialPlatformDetails[0]?.platformLink}`,
            disabled: false
        },
        {
            title: 'Team Size',
            inputValue: `${props?.data?.agencyTeamSize}`,
            disabled: false
        },
        {
            title: 'Fixed Budget',
            inputValue: `${props?.data?.agencyMonthlyBudget}$-${props?.data?.agencyMonthlyBudget + 2 * 1000}$`,
            disabled: props?.id ? true : false
        },
        {
            title: 'Contact Number',
            inputValue: `${props?.data?.agencyPhone}`,
            disabled: props?.id ? true : false
        },
    ])

    const [isDisabled, setIsdisabled] = useState(true);

    const handleDisabled = () => {
        setIsdisabled(false)
    }
    const handleDisabledSave = () => {
        setIsdisabled(true)
        updateAgency()
    }

    const handleDisabledCancel = () => {
        setIsdisabled(true)
    }

    const permanentDisable = (name) => {
        if (name === "Director Name" || name === "Agency Website" || name === "Team Size" ) {
            return false
        }
        else return true
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        let temp = [...arr]
        let index = temp.findIndex((item) => item.title === name)
        temp[index].inputValue = value
        setArr(temp)
    }

    const updateAgency = () => {

        const ay = arr.find(a => a.title === 'Agency Website');
        if (handleErrorsValidation(ay.inputValue) === true) {
            const id = localStorage.getItem("userId")
            instance.patch(`/api/${Role}/agencies/update/${id}`,
                {
                    agencyTeamSize: arr[5].inputValue,
                    ownerName: arr[2].inputValue,
                    agencyEmail: arr[3].inputValue,
                    socialPlatformDetails: [
                        {
                            platformName: "website",
                            platformLink: arr[4].inputValue
                        }
                    ]
                }
            )
        }

    }
    return (
        <>
            <div className="mainInformation">
                <div className="innerInformation">
                    {Role === 'Agency' ?
                        agencyProfiledata.isAgencyVerified &&
                        <div className="editableBtn">
                            <div className="information_parent">
                                {/* <img src={Information_edit} alt="information_edit" /> */}
                                <p>INFORMATION</p>
                            </div>
                            <i onClick={handleDisabled} class="fa fa-pencil-square-o Edit-icon_information" aria-hidden="true"></i>
                        </div>
                        : null
                    }
                    <div className="informationForm">
                        <div className="informationInputForm">
                            {/* <span className="informationBorder"></span> */}
                            {
                                arr.map((value, index) => {
                                    if (!value.disabled) {
                                        return (
                                            <div className="informationTitle" key={index}>
                                                <ul>
                                                    <li>{value?.title}</li>
                                                </ul>
                                                <input style={{
                                                    outline: isDisabled ? 'none' : 'none',
                                                    border: permanentDisable(value?.title) || isDisabled ? 'none' : '1px solid #02044a'
                                                }}
                                                    disabled={permanentDisable(value?.title) || isDisabled}
                                                    type="text"
                                                    value={value?.inputValue}
                                                    name={value?.title}
                                                    onChange={(event) => handleChange(event)}
                                                    id="" />
                                            </div>
                                        )
                                    }
                                    else
                                        return ""
                                })
                            }
                        </div>
                    </div>
                </div>
                {isDisabled ? null :

                     <>
                    <div onClick={handleDisabledCancel} className="information_save_parent">
                        <div className="information_save">
                            <p>Cancel</p>
                        </div>
                    </div>
                    <div onClick={handleDisabledSave} className="information_save_parent">
                        <div className="information_save">
                            <p>Submit</p>
                        </div>
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default Information
