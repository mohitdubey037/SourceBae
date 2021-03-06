/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ProfilePortfolio.css';
import instance from '../../../Constants/axiosConstants';
import { AGENCY } from '../../../shared/constants';

// import "agency" from "../../../shared/constants";
import './Rules.css';
import { SemiBold1624, SemiBold2030 } from '../../../Components/Text/Texts';

function AgencyPortfolio(props) {
    const routerHistory = useHistory();
    let propsAgencyId = props?.id || '';
    const Role = localStorage.getItem('role');
    const [agencyPortfoliodata, setAgencyPortfoliodata] = useState([]);

    const agencyId = localStorage.getItem('userId');

    const getAgencyPortfolio = (profileviewStatus) => {
        instance
            .get(
                `api/${Role}/portfolios/all?agencyId=${Role === AGENCY ? agencyId : propsAgencyId
                }`
            )
            .then(function (response) {
                setAgencyPortfoliodata(response);
            })
            .catch((err) => { });
    };

    useEffect(() => {
        getAgencyPortfolio();
    }, []);

    return (
        <>
            <div className="mainPortfolioDiv">
                <div className="portfolioHeading">
                    <SemiBold1624 text={`Portfolios ${agencyPortfoliodata.length}`} />
                    {/* <p>
                        Portfolio{agencyPortfoliodata.length > 0 ? "'S" : ''} (
                        {agencyPortfoliodata.length})
                    </p> */}
                </div>
                <div className="portfolioParent">
                    {agencyPortfoliodata.map((data) => {
                        return (
                            <div className="PortfolioMainDiv">
                                <div className="ProjectDataPortfolio">
                                    <div className="logoPortfolio">
                                        <img
                                            src={data.projectLogo}
                                            alt="logo"
                                        />
                                    </div>
                                    <div className="detialPortfolio">
                                        {/* <p>{data.projectName}</p> */}
                                        <SemiBold2030 text={data.projectName} />
                                        <div className="profile_link">
                                            <a

                                                target="_blank"
                                                href={`//${data.projectLink}`}
                                                rel="noreferrer"
                                            >
                                                {data.projectLink}
                                            </a>
                                        </div>
                                        <div className="PortfolioPriceAndTimeline">
                                            {/* <div>price</div> */}
                                            {/* <p
                                                style={{
                                                    backgroundColor: '#ffffff',
                                                    padding: '0'
                                                }}
                                            >
                                                Project Timeline
                                            </p> */}
                                            <SemiBold1624 text={'Project Timeline'} style={{ color: 'rgba(29, 36, 52, 0.5)' }} />
                                            <SemiBold1624 text={`${data.projectTimeline} days`} style={{ color: 'rgba(29, 36, 52, 0.5)' }} />

                                            {/* <p style={{ marginLeft: '15px' }}>
                                                {data.projectTimeline} days
                                            </p> */}
                                        </div>
                                        {/* <div className="profile_link">
                                            <a
                                                target="_blank"
                                                href={`//${data.projectLink}`}
                                                rel="noreferrer"
                                            >
                                                {data.projectLink}
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="ProjectDescriptionPortfolio">
                                    <p>{data.projectDescription}</p>
                                </div> */}
                            </div>
                        );
                    })}
                    {Role === 'agency' && (
                        <div
                            className="No_portfolio"
                            onClick={() => routerHistory.push('/portfolio')}
                        >
                            <div className="add-portfolio-parent">
                                <h6 className="add-portfolio">
                                    Add A Portfolio
                                </h6>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AgencyPortfolio;
