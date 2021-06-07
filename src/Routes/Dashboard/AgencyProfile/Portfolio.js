import React from 'react'
import './Portfolio.css'

import portfolioImage from '../../../assets/images/AgencyProfile/portfolioImage.jpg'

function Portfolio() {

    const arr = [1, 2, 3, 4, 5]

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

                    <div className="addMore" onClick = {()=> window.location.href="/add-developer"}>
                        +
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio
