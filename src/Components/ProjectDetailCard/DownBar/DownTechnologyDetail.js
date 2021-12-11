import dot from "../../../assets/images/Newestdashboard/Agency_Details/dot.svg";

function DownTechnologyDetail(props) {
    return (
        <div className="agencyQuestions_AgencyRespondedDetails">
            <div className="straightAfterLine">
                <h4>Fixed Budget</h4>
                <ul>
                    <li style={{ listStyle: "none" }}>
                        {" "}
                        <img className="dotImg" src={dot} alt="" /> Min $
                        {props.projectProposalCost}
                    </li>
                </ul>
            </div>
            <div className="straightAfterLine">
                <h4>Estimated Timeline</h4>
                <ul>
                    <img className="dotImg" src={dot} alt="" />
                    <li
                        style={{
                            listStyle: "none",
                            display: "flex",
                            marginLeft: "-4rem",
                        }}
                    >{`${props?.projectExpectedStartingDays} Days`}</li>
                </ul>
            </div>

            {/* {props?.projectTechnologiesRequired && */}
                {props?.projectTechnologiesRequired.length > 0 ? (
                <div>
                    <h4>Technology</h4>
                    <ul>
                        {props?.projectTechnologiesRequired?.map((p) => (
                            <>
                                <img className="dotImg" src={dot} alt="" />
                                <li style={{ listStyle: "none" }}>{p?.technologyName}</li>
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h4>Services</h4>
                    <ul>
                        {props?.projectServicesRequired?.map((p) => (
                            <>
                                <img className="dotImg" src={dot} alt="" />
                                <li style={{ listStyle: "none" }}>{p?.serviceName}</li>
                            </>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DownTechnologyDetail