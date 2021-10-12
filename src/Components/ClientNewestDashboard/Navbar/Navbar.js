import React, { useEffect, useState } from 'react';
import instance from '../../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
    const url = props.history.location.pathname;
    const Role = localStorage.getItem('role');
    const roleId = localStorage.getItem("userId");
    const [data, setData] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (url.includes(':')) {
            const indexTemp = url.indexOf(':')
            const urlTemp = url.slice(indexTemp + 1);
            setIndex(urlTemp);
        }
        console.log(url.includes('/shared-developers'))
    }, [])


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
        <div style={{ top: Role === 'Client' && '1rem' }} className={`navbar ${props.history.location.pathname === '/agencyNewestDashboard' && 'navbar_agency'}`}>
            <div className="navbar-items">
                <div style={{ paddingRight: '10px' }} className="username">
                    <p style={{
                        color: (props.history.location.pathname === '/client-profile' ||
                            props.history.location.pathname === `/product-details:${index}` ||
                            url.includes('/shared-developers')) ? 'white' : 'blue'
                    }}>{Role === "Client" ? data[0]?.firstName + " " + data[0]?.lastName : data?.agencyName}</p>
                </div>
                <div className="userprofile-circle nav-left-item" >
                    {Role === 'Agency' ? <img src={data?.agencyLogo} /> : <img src={data?.imageurl} />}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);