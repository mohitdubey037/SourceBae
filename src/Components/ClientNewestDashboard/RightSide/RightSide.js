import './RightSide.css'
import itemIllustration from "../../../assets/images/Newestdashboard/RightSide/itemIllustration.svg";
import getInTouch from "../../../assets/images/Newestdashboard/RightSide/GetInTouch.svg";
import CallIcon from '../../../assets/images/Newestdashboard/Dashboard/phone_call.svg';

function RightSide() {
    return (
        <div className="content-rightBody_parent">
            {/* <div className="content-rightBody"> */}
                <div className="navigation-item">
                    <div className="itemContent-1"></div>
                    <div className="itemContent-heading">
                        <div className="heading-text">
                            <p>Get In Touch</p>
                            <img src={CallIcon} alt="callIcon"/>
                        </div>
                    </div>
                    <div className="itemContent-videoCard"></div>
                    <div className="itemContent-cta">
                        <div className="cta-item">
                            <div>
                                <p>Call To Action</p>
                            </div>
                            <div className="view-details-btn">
                                <button>View Detail</button>
                            </div>
                        </div>
                        <div className="cta-item">
                            <div>
                                <p>Call To Action</p>
                            </div>
                            <div className="view-details-btn">
                                <button>View Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>


    )
}

export default RightSide
