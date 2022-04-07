import React from 'react';
import './PromotionalStrip.css';

function PromotionalStrip() {
    return (
        <div className="wrapper">
            <div className="left">
                <text className="leftDescription">requirement listing</text>
            </div>
            <div className="seperator" />
            <div className="right">
                <text className="rightHeading">SourceBae</text>
                <text className="rightDescription">
                    Connecting platform for IT clients and agencies, where the
                    clients can find the required resources in terms of
                    technologies and years of experience. The platform can also
                    be used by agencies to deploy their bench resources to
                    client's projects.
                </text>
            </div>
        </div>
    );
}

export default PromotionalStrip;
