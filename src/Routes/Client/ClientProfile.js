import React, { useEffect, useState } from 'react'
import './ClientProfile.css'
import PageNotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import avatar from '../../assets/images/Newestdashboard/Client_Profile/client_profile.svg';
import uploadImage from '../../assets/images/Newestdashboard/Client_Profile/camera_icon.png';
import { toast } from "react-toastify";

import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../Components/Back/Back';

import { FilePicker } from 'react-file-picker';

import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import Spinner from '../../Components/Spinner/Spinner';
import Profile_image1 from '../../assets/images/Newestdashboard/Client_Profile/UpImage.svg';
import Profile_image2 from '../../assets/images/Newestdashboard/Client_Profile/DownImage.svg';
import { FaCamera } from "react-icons/fa";

function ClientProfile() {

    const formValueKey = {
        firstName: "First Name",
        lastName: "Last Name",
        userName: "User Name",
        userEmail: "Email",
        countryCode: "Country Code",
        userPhone: "Phone Number",
        userDesignation: "Designation",
        companyName: "Company Name"
    }

    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId")
    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        countryCode: "",
        userPhone: "",
        userDesignation: "",
        companyName: "",
        clientLogo: null
    })
    const [err, setErr] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState();
    const [show, setShow] = useState();
    const [isShown, setIsShown] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    let logoURL;

    const getClientProfileApi = () => {
        const clientId = localStorage.getItem("userId")
        instance.get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
                let temp = {
                    firstName: response[0].firstName,
                    lastName: response[0].lastName,
                    userName: response[0].userName,
                    userEmail: response[0].userEmail,
                    countryCode: response[0].countryCode,
                    userPhone: response[0].userPhone,
                    companyName: response[0].companyName,
                    userDesignation: response[0].userDesignation,
                    clientLogo: response[0].clientLogo
                }
                setClientData(temp)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
                setErr(err?.response?.data?.message)
            })
    };

    const inputFileChoosen = (ev) => {
        setFile(ev)
        let reader = new FileReader();
        reader.readAsDataURL(ev)
        reader.onload = () => {
            setShow(reader.result) ;
            setIsUploaded(true)
        }
    }

    // useEffect(() => {
    // }, [file]);
    const handleCancel = () => {
        setIsEdit(false);
        setIsUploaded(false);
    }

    useEffect(() => {
    }, [clientData, file])

    const uploadMedia = async () => {
        const formData = new FormData();
        formData.append(
            "files",
            file,
            file.name
        );
        await instance.post(`api/${Role}/media/create`, formData)
            .then(function (response) {
                logoURL = response[0].mediaURL;
            })
            .catch(err => {
            })
    }

    const updateClientApi = async () => {
        await uploadMedia();
        const body = {
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            companyName: clientData.companyName,
            userDesignation: clientData.userDesignation,
            clientLogo: logoURL
        }
        instance.patch(`/api/${Role}/clients/update/${clientId}`, body)
            .then(function (response) {
                setLoading(false);
                setIsEdit(false)
                setIsUploaded(false)
                setShow()
                setClientData({
                    ...clientData,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    companyName: response.companyName,
                    userDesignation: response.userDesignation,
                    clientLogo: response.clientLogo
                })
            })
            .catch(err => {
                setLoading(false)
                setIsEdit(false)
                setErr(err?.response?.data?.message)
            })
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name !== "countryCode" && name !== "userEmail" && name !== "userName" && name !== "userPhone") {
            setClientData({
                ...clientData,
                [name]: value
            })
        }
        else {
            alert("!Not allowed")
        }
    }

    useEffect(() => {
        getClientProfileApi()
    }, [])

    return (
        <>
            <Navbar />
            {err ?
                <>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <img height="300px" src={PageNotFound} alt="no_data_img" />
                        <h6>{err}</h6>
                    </div>
                </>
                :
                loading ? <Spinner /> :
                    <div className="mainClient_parent">
                        {/* <img className="Image1" src={Profile_image1} alt="signup" /> */}
                        <img className="Image2" src={Profile_image2} alt="signup" />

                        <Back name="Client Profile" />
                        <div className="mainClientProfile">
                            <div className="innerClientProfile">
                                <div className="clientProfileHeading" style={{ display: "flex", justifyContent: "center" }}>
                                    <h2>My Profile</h2>
                                </div>

                                <div className="myProfileInfo">
                                    {
                                        isEdit === false ?
                                            <div onClick={() => setIsEdit(true)} className="profileEditBtn">Edit <i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                            :
                                            (
                                                <><div onClick={handleCancel} className="cancel">Cancel</div>
                                                    <div onClick={() => updateClientApi()} className="save">Save</div>
                                                </>
                                            )
                                    }

                                    <div className="myProfileCard">
                                        <div className="avatarArea">
                                            <div className={`avatarArea_div ${isShown && 'conditional_filter_clientProfile'}`}>
                                                { clientData.clientLogo && !isUploaded ?
                                                        <img className="avatarImg" src={clientData.clientLogo} alt="signup" />
                                                    :
                                                   isUploaded ?
                                                        <img className="avatarImg" src={show} alt="signup" />
                                                        :
                                                        <img className="avatarImg" src={avatar} alt="signup" />
                                                }
                                            </div>
                                            {isEdit === true &&
                                                <FilePicker
                                                    extensions={['jpg', 'png', 'jpeg']}
                                                    onChange={inputFileChoosen}
                                                    onError={errMsg => toast.error(errMsg)}
                                                >
                                                    <FaCamera
                                                        onMouseEnter={() => setIsShown(true)}
                                                        onMouseLeave={() => setIsShown(false)}
                                                        className="client_profile_image" />
                                                </FilePicker>
                                            }
                                        </div>
                                        
                                        <div className="clientProfileDetails">
                                            {Object.keys(clientData).map((key) => {
                                                if (key !== 'clientLogo') {
                                                    return (
                                                        <div className="clientProfilDesc">
                                                            <div className="clientFormHeading">
                                                                <p>{formValueKey[key]}</p>
                                                            </div>
                                                            <div className="clientFormAnswer">
                                                                {
                                                                    isEdit && (key !== "countryCode" && key !== "userEmail" && key !== "userName" && key !== "userPhone") ? <input type="text" value={clientData[key]} name={key} onChange={(event) => handleChange(event)} /> : <p>{clientData[key]}</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default ClientProfile
