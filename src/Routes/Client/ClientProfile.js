import React, { useEffect, useState } from 'react'
import ClientNavbar from './ClientNavbar'
import './ClientProfile.css'
import NO_Data_ICON from '../Dashboard/no_data_icon.jpg';
import avatar from '../../assets/images/ClientDashboard/avatar.png'

import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import Spinner from '../../Components/Spinner/Spinner'

function ClientProfile() {

    const Role = "client"
    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        countryCode: "",
        userPhone: "",
        userDesignation: "",
        companyName: "",
    })
    const [err, setErr] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);

    const getClientProfileApi = () => {
        const clientId = localStorage.getItem("userId")
        instance.get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
                console.log(response);
                setClientData({
                    firstName: response[0].firstName,
                    lastName: response[0].lastName,
                    userName: response[0].userName,
                    userEmail: response[0].userEmail,
                    countryCode: response[0].countryCode,
                    userPhone: response[0].userPhone,
                    companyName: response[0].companyName,
                    userDesignation: response[0].userDesignation,
                })
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
                console.log(err?.response?.data?.message)
                setErr(err?.response?.data?.message)
            })
    };

    const updateClientApi = () => {
        const body = {
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            companyName: clientData.companyName,
            userDesignation: clientData.userDesignation,
        }
        const clientId = localStorage.getItem("userId")
        instance.patch(`/api/${Role}/clients/update/${clientId}`,body)
            .then(function (response) {
                console.log(response);
                setClientData({
                    firstName: response[0].firstName,
                    lastName: response[0].lastName,
                    userName: response[0].userName,
                    userEmail: response[0].userEmail,
                    countryCode: response[0].countryCode,
                    userPhone: response[0].userPhone,
                    companyName: response[0].companyName,
                    userDesignation: response[0].userDesignation,
                })
                setLoading(false);
                setIsEdit(false)
            })
            .catch(err => {
                setLoading(false)
                setIsEdit(false)
                console.log(err?.response?.data?.message)
                setErr(err?.response?.data?.message)
            })
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(name, value)
        if (name !== "countryCode" && name!=="userEmail" &&  name!=="userName" &&  name!=="userPhone") {
            setClientData({
                ...clientData,
                [name]: value
            })
        }
        else{
            alert("!Not allowed")
        }
    }

    useEffect(() => {
        getClientProfileApi()
    }, [])

    return (
        <>
            <ClientNavbar />
            {err ?
                <>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <img height="300px" src={NO_Data_ICON} alt="no_data_img" />
                        <h6>{err}</h6>
                    </div>
                </>
                :
                loading ? <Spinner /> :

                    <div className="mainClientProfile">
                        <div className="innerClientProfile">
                            <div className="clientProfileHeading">
                                <h2>My Profile</h2>
                            </div>

                            <div className="myProfileInfo">
                                <div className="leftLineClient"></div>

                                {
                                    isEdit === false ?
                                        <div onClick={() => setIsEdit(true)} className="profileEditBtn">Edit <i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                        :
                                        (
                                            <><div onClick={() => setIsEdit(false)} className="cancel">Cancel</div>
                                                <div onClick={() => updateClientApi()} className="save">Save</div>
                                            </>)
                                }

                                <div className="myProfileCard">
                                    <div className="avatarArea">
                                        <div>
                                            <img src={avatar} alt="" />
                                        </div>
                                    </div>
                                    <div className="clientProfileDetails">
                                        {Object.keys(clientData).map((key) => {
                                            return (
                                                <div className="clientProfilDesc">
                                                    <div className="clientFormHeading">
                                                        <p>{helper.multiwordCapitalize(helper.camelcaseToWords(key))}</p>
                                                    </div>
                                                    <div className="clientFormAnswer">
                                                        {
                                                            isEdit && (key !== "countryCode" && key!=="userEmail" &&  key!=="userName" &&  key!=="userPhone")? <input type="text" value={clientData[key]} name={key} onChange={(event) => handleChange(event)} /> : <p>{clientData[key]}</p>
                                                        }
                                                    </div>
                                                </div>)
                                        })}
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
