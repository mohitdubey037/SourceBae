import React from 'react';


function UserOperations() {
    return (
        <div className="user-operations">
            <div className="operation">
                <div className="operation-logo">
                    <img src={HireDeveloperIcon} alt="hire developer" />
                </div>
                <div className="operation-name">
                    <p>Hire Developer</p>
                </div>
            </div>

            <div className="operation">
                <div className="operation-logo">
                    <img src={HireAgencyIcon} alt="hire developer" />
                </div>
                <div className="operation-name">
                    <p>Hire agency</p>
                </div>
            </div>

            <div className="operation">
                <div className="operation-logo">
                    <img src={ShortTermProjectIcon} alt="hire developer" />
                </div>
                <div className="operation-name">
                    <p>Short Term Project</p>
                </div>
            </div>

            <div className="operation">
                <div className="operation-logo">
                    <img src={InvestmentIcon} alt="hire developer" />
                </div>
                <div className="operation-name">
                    <p>Interested to Investment</p>
                </div>
            </div>
        </div>
    )
}

export default UserOperations