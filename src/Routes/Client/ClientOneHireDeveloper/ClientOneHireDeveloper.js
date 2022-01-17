import React, { useEffect, useState } from "react";
import * as helper from '../../../shared/helper';
import "./ClientOneHireDeveloper.css";
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import Navbar from "../../../Components/ClientNewestDashboard/Navbar/Navbar";
import UpImage1 from "../../../assets/images/Newestdashboard/Client-one-hire-developer/UpImage1.svg";
import DownImage2 from "../../../assets/images/Newestdashboard/Client-one-hire-developer/DownImage2.svg";
import UpBigImage from "../../../assets/images/Newestdashboard/Client-one-hire-developer/UpBigImage.svg";
import DownBigImage from "../../../assets/images/Newestdashboard/Client-one-hire-developer/DownBigImage.svg";
import Back from "../../../Components/Back/Back";
import { Modal } from "react-responsive-modal";
import Moment from "react-moment";

function ClientOneHireDeveloper(props) {
  // const routerHistory = useHistory();
  let { hireDeveloperId } = useParams();
  const logoLink = "https://api.onesourcing.in/media/images/1637044803259.svg";

  const Role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [singleHiredDeveloper, setSingleHiredDeveloper] = useState({});
  const [loading, setLoading] = useState(false);
  const [disability, setDisability] = useState(false);
  const [agencyId, setAgencyId] = useState(null);

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  const onOpenModal = (agencyId) => {
    setOpen(true);
    setAgencyId(agencyId);
  };

  const getOneDeveloper = () => {
    setLoading(true);
    instance
      .get(
        `/api/${Role}/hire-developers/get/${hireDeveloperId}?clientId=${userId}`
      )
      .then(function (response) {
        console.log(response, "getonedeveloper");
        setSingleHiredDeveloper(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDevelopers = () => {
    setLoading(true);
    instance
      .patch(
        `/api/${Role}/hire-developers/update-matched-agency/${hireDeveloperId}`,
        { isShortListed: true, agencyId: agencyId }
      )
      .then((res) => {
        onCloseModal();
        getOneDeveloper();
      })
      .catch((err) => {
        setLoading(false);
      });
  };


  useEffect(() => {
    getOneDeveloper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main_parent_clientOneHireDeveloper">
            <Navbar logoLink={logoLink} />
            <img
              className="upImage1_clientOneHireDeveloper"
              src={UpImage1}
              alt="upImage1"
            />
            <img
              className="upImage2_clientOneHireDeveloper"
              src={UpBigImage}
              alt="upImage1"
            />
            <img
              className="downImage3_clientOneHireDeveloper"
              src={DownImage2}
              alt="upImage1"
            />
            <img
              className="downImage4_clientOneHireDeveloper"
              src={DownBigImage}
              alt="upImage1"
            />
            <div className="respondCards_clientOneHireDeveloper">
              <Back name="Matched Agencies" />
              <div className="moreAgency_parent">
                {Object.keys(singleHiredDeveloper).length !== 0 ? (
                  singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                    singleHiredDeveloper?.agenciesMatched?.map((agency) => {
                      let isShortListed = agency.isShortListed;
                      let interested = agency.interested;
                      return (
                        <div className="moreAgencyList new_design_clientOneHireDeveloper">
                          <div className="moreAgencyInfo">
                            <div className="agencyDesc_clientOneHireDeveloper">
                              <div className="about_the_company">
                                <h3 className="name-title">{agency?.agencyId?.agencyName}</h3>
                              </div>
                              <div className="experience_and_interest">
                                <div className="email_clientOneHireDeveloper description_parent">
                                  <p className="description_clientOne">
                                    {`Experience:`}&nbsp;
                                    <span className="description_sharedDeveloper">
                                      <Moment fromNow ago>
                                        {`${agency?.agencyId?.incorporationDate}`}
                                      </Moment>
                                    </span>
                                  </p>
                                </div>
                                <div className="email_clientOneHireDeveloper description_parent">
                                  <p className="description_clientOne">
                                    {`Interest Shown:`}&nbsp;
                                    <span className="description_sharedDeveloper">
                                      {agency?.agencyId?.interestedClientCount}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="about_the_company_clientOne">
                              <p style={{ color: '#40A3FF' }} className="description_sharedDeveloper">
                                about the company
                              </p>
                              <p style={{marginTop: '0.6rem'}} className="description_sharedDeveloper">
                                {agency?.agencyId?.agencyDescription}
                              </p>
                            </div>
                          </div>

                          <div className="shortlist_and_interest_parent">
                            <div className="button_parent">
                              {!isShortListed ? (
                                <button
                                  onClick={() =>
                                    onOpenModal(agency?.agencyId?._id)
                                  }
                                  className="moreAgencyLogo checkResource"
                                >
                                  <p>Get Connected!!</p>
                                </button>
                              ) : isShortListed && interested === 0 ? (
                                <p className="agency_pending">
                                  Great Step!!.Our support will contact you soon
                                </p>
                              ) : isShortListed && interested === 1 ? (
                                <p className="agency_accepted">
                                  Congratulations!!..Agency is interested
                                </p>
                              ) : (
                                <p className="agency_rejected_interested">
                                  Sorry!!Agency declined your request, our
                                  support team will connect you soon with more
                                  profiles.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )
                    : (
                      <div className="no_matched_agency">
                        <h2>Sorry No Matched Agencies Found.</h2>
                      </div>
                    )
                ) : (
                  <h2 className="no_matched_agency">
                    Sorry No Matched Agencies Found.
                  </h2>
                )}
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={onCloseModal}
            classNames={{
              overlay: "customOverlayAgencyProduct",
              modal: "customModalClientOneHireDeveloper",
            }}
            center
          >
            <div className="want_to_accept">
              <div className="connect_or_not">
                <p>Show interest in this agency!!</p>
              </div>

              <div className="interested_or_not">
                <div className="update_now" onClick={handleDevelopers}>
                  <p>Yes</p>
                </div>
                <div className="update_later" onClick={onCloseModal}>
                  <p>No</p>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    condition: state.condition,
  };
};

export default connect(mapStateToProps)(ClientOneHireDeveloper);
