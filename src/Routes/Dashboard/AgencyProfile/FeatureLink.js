import React from 'react'
import './FeatureLink.css'
import featureLink from '../../../assets/images/AgencyProfile/featureLink.jpeg'
import featureLink2 from '../../../assets/images/AgencyProfile/featureLink2.jpg'

function FeatureLink() {
    return (
        <>
            <div className="mainFeatureLink">
                <div className="innerFeatureLink">
                    <div className="featureCard">
                        <div className="featureCardDetail">
                            <div className="featureCardDate">
                                <h6>14 April</h6>
                            </div>
                            <div>
                                <h1>5 Reasons Why Business Need to Adopt DevOps</h1>
                            </div>
                        </div>
                        <div className="featureCardImage">
                            <img src={featureLink} alt="" />
                        </div>
                    </div>
                    <div className="featureCard">
                        <div className="featureCardDetail">
                            <div className="featureCardDate">
                                <h6>03 March</h6>
                            </div>
                            <div>
                                <h1>React Native App Development: An Ultimate Guide</h1>
                            </div>
                        </div>
                        <div className="featureCardImage">
                            <img src={featureLink2} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureLink
