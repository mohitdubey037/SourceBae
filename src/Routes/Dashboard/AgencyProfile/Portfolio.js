import React, { useEffect, useState } from 'react';
import instance from "../../../Constants/axiosConstants";
import { withRouter } from "react-router";
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import Portfolio_edit from '../../../assets/images/Newestdashboard/Agency-Profile/Portfolio_edit.svg';

import './Portfolio.css'

import portfolioImage from '../../../assets/images/AgencyProfile/portfolioImage.jpg'

function Portfolio(props) {

    const arr = []
    const Role = localStorage.getItem("role");
    const agencyId = localStorage.getItem('userId');

    const [agencyProfiledata, setAgencyProfileData] = useState({});

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

    return (
        <>
            <div className="mainPortfolio">
                <div className='innerPortfolio'>
                    {
                        arr.length > 0 ?
                            arr.map(() => {
                                return (
                                    <div className="portfolioCard">
                                        <div className="portfolioImage">
                                            <img src={portfolioImage} alt="portfolio" />
                                        </div>
                                        <div className="portfolioDesc">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi, fuga quia molestiae necessitatibus quibusdam.</p>
                                        </div>

                                        <div className="portfolioTech">
                                            <p>JavaScript</p>
                                            <p>MongoDb</p>
                                        </div>

                                        <div className="portfolioDetailBtn">
                                            <span>View Details</span>
                                        </div>
                                    </div>
                                )
                            })
                            : 
                            <div>
                                <img style={{width: "300px"}} src={PageNotFound} alt="no_found"/>
                            </div>
                    }

                    {Role !== 'Client' &&
                        agencyProfiledata.isAgencyVerified ?
                        (<div className="addMore" onClick={() => props.history.push("/add-developer")}>
                            <div className="addIconContainer">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                        )
                        : null
                    }
                </div>
            </div>
        </>
    )
}

export default withRouter(Portfolio)
