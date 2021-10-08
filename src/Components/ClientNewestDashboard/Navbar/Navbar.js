import React, { useEffect, useState } from 'react';
import instance from '../../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {

    console.log(props.history.location, "routes")
    console.log(props.history.location.pathname);
    console.log(props.history.location)
    const url = props.history.location.pathname;
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (url.includes(':')) {
            const indexTemp = url.indexOf(':')
            const urlTemp = url.slice(indexTemp + 1);
            setIndex(urlTemp);
        }
    }, [])

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
        <div style={{ top: Role === 'Client' && '1rem' }} className="navbar">
            <div className="navbar-items">
                <div style={{ paddingRight: '10px' }} className="username">
                    <p style={{ color: (/*props.history.location.pathname === '/client-profile' && */ props.history.location.pathname === `/product-details:${index}`) ? 'white' : 'blue' }}>{Role === "Client" ? data[0]?.firstName + " " + data[0]?.lastName : data?.agencyName}</p>
                </div>
                <div className="userprofile-circle nav-left-item" >
                    {Role === 'Agency' ? <img src={data?.agencyLogo} /> : <img src={data?.imageurl} />}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);