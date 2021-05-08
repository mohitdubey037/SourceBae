import React, { useEffect, useState } from 'react'
import ClientNavbar from './ClientNavbar'
import './ClientProfile.css'

import avatar from '../../assets/images/ClientDashboard/avatar.png'

import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"

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

    const [isEdit, setIsEdit] = useState(false);

    const getClientProfileApi = () => {
        const clientId = localStorage.getItem("userId")
        instance.get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
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
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(name, value)
        if (name !== "countryCode") {
            setClientData({
                ...clientData,
                [name]: value
            })
        }
    }
    const updateClientApi = () => {
        setIsEdit(false)
        console.log("update client")
    }

    useEffect(() => {
        getClientProfileApi()
    }, [])

    return (
        <>
            <ClientNavbar />

            <div className="mainClientProfile">
                <div className="innerClientProfile">
                    <div className="clientProfileHeading">
                        <h2>My Profile</h2>
                    </div>

                    <div className="myProfileInfo">
                        <div className="leftLineClient"></div>

                        {
                            isEdit === false ?
                                <div onClick={() => setIsEdit(true)} className="profileEditBtn">Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
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
                                                    isEdit ? <input type="text" value={clientData[key]} name={key} onChange={(event) => handleChange(event)} /> : <p>{clientData[key]}</p>
                                                }
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientProfile
