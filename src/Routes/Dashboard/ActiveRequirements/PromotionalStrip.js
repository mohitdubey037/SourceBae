import React from 'react';
import './PromotionalStrip.css';

function PromotionalStrip() {
    return (
        <div className="wrapper">
            <div className="left">
                <text className="leftHeading">Home/recruitment listing</text>
                <text className="leftDescription">recruitment listing</text>
            </div>
            <div className="seperator" />
            <div className="right">
                <text className="rightHeading">SourceBae</text>
                <text className="rightDescription">
                    Connecting platform for IT clients and agencies, where the
                    clients can find the required resources in terms of
                    technologies and years of experience. The platform can also
                    be used by agencies to deploy their bench resources to
                    clients and their projects
                </text>
            </div>
        </div>
    );
}

export default PromotionalStrip;
