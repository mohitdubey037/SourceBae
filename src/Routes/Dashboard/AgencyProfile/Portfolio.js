import React, {useEffect, useState} from 'react'
import './Portfolio.css'

import portfolioImage from '../../../assets/images/AgencyProfile/portfolioImage.jpg'

function Portfolio(props) {

    const arr = [1, 2]
    // const Role = localStorage.getItem("userId");

    // const [agencyProfiledata, setAgencyProfileData] = useState({});

    // const getAgencyDevelopers = () => {
    //     instance.get(`/api/${Role}/developers/all?agencyId=${agencyId}`)
    //         .then(function (response) {
    //             setDevelopers(response)
    //         })
    //         .catch(err => {
    //             console.error(err?.response?.data?.message)
    //             setErr(err?.response?.data?.message)
    //         })
    // };
    // useEffect(() => {
    //     getAgencyDevelopers()
    // }, [])

    // const getAgencyProfile = (agencyId, profileviewStatus) => {
    //     let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
    //     instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
    //         .then(function (response) {
    //             console.log(response);
    //             setAgencyProfileData(response);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // };

    // useEffect(() => {
    //     if (Role === 'Agency') {
    //         getAgencyProfile(localStorage.getItem("userId"), false);
    //     }
    // }, []);

    return (
        <>
            <div className="mainPortfolio">
                <div className='innerPortfolio'>
                    {
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
                                        <span>View Details<i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="addMore" onClick = {() => props.history.push("/add-developer")}>
                        +
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio
