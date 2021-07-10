import './RightSide.css'
import itemIllustration from "../../../assets/images/Newestdashboard/RightSide/itemIllustration.svg";
import getInTouch from "../../../assets/images/Newestdashboard/RightSide/GetInTouch.svg";

function RightSide() {
    return (
        <div className="content-rightBody">
            <div className="rightBody-navigation">
                <div className="navigation-name active">
                    <p>Update</p>
                </div>
                <div className="navigation-name">
                    <p>Important</p>
                </div>
                <div className="navigation-name">
                    <p>Current</p>
                </div>
            </div>
            <div className="navigation-item">
                <div className="item-illustration">
                    <img src={itemIllustration} alt="item illustration" />
                </div>
                <div className="item-content">
                    <div className="itemContent-heading">
                        <div className="heading-text">
                            <p>Get In Touch</p>
                        </div>
                        <div className="heading-illustration">
                            <img src={getInTouch} alt="get in touch" />
                        </div>
                    </div>
                    <div className="itemContent-videoCard"></div>
                    <div className="itemContent-cta">
                        <div className="cta-item">
                            Call To Action
                            <div className="view-details-btn">
                                <button>View Detail</button>
                            </div>
                        </div>
                        <div className="cta-item">
                            Call To Action
                            <div className="view-details-btn">
                                <button>View Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSide
