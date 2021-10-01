import React, { useEffect, useState } from 'react';
import notificationIcon from "../../../assets/images/Newestdashboard/Navbar/notification_icon.svg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import instance from '../../../Constants/axiosConstants';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {

    const roleId = localStorage.getItem("userId");

    const Role = localStorage.getItem('role');

    const [data, setData] = useState({});

    useEffect(() => {
        if (Role === 'Client') {
            instance.get(`/api/${Role}/clients/get/${roleId}`)
                .then(function (response) {
                    console.log(response);
                    setData(response);
                })
                .catch(err => {
                    console.log(err?.response?.data?.message)
                })
        }

        else {
            instance.get(`/api/${Role}/agencies/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [])


    return (
        <div className="navbar">
            <div className="navbar-items">
                <div style={{paddingRight: '10px'}} className="username nav-left-item">
                    <p>{Role === "Client" ? data[0]?.firstName + " " + data[0]?.lastName : data?.agencyName}</p>
                </div>
                <div className="userprofile-circle nav-left-item" >
                    {Role === 'Agency' ? <img src={data?.agencyLogo}/> : <img src={data?.imageurl}/>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;