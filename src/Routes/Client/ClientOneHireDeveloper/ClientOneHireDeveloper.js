import React, { useEffect, useState } from 'react';
import './ClientOneHireDeveloper.css';
import { connect } from 'react-redux';
import instance from '../../../Constants/axiosConstants';
import { useParams } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import UpImage1 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpImage1.svg';
import DownImage2 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownImage2.svg';
import UpBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpBigImage.svg';
import DownBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownBigImage.svg';
import Back from '../../../Components/Back/Back';
import { Modal } from 'react-responsive-modal';
import styles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';

function ClientOneHireDeveloper(props) {
    // const routerHistory = useHistory();
    let { hireDeveloperId } = useParams();
    const logoLink =
        'https://api.onesourcing.in/media/images/1637044803259.svg';

    const Role = localStorage.getItem('role');

    const [singleHiredDeveloper, setSingleHiredDeveloper] = useState({});
    const [loading, setLoading] = useState(false);
    const [agencyId, setAgencyId] = useState(null);
    const [developerId, setDeveloperId] = useState(null);
    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    const onOpenModal = (agencyId, developerId) => {
        setOpen(true);
        setAgencyId(agencyId);
        setDeveloperId(developerId);
    };

    const getOneDeveloper = () => {
        setLoading(true);
        instance
            .get(`/api/${Role}/hire-developers/get/${hireDeveloperId}`)
            .then(function (response) {
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
                `/api/${Role}/hire-developers/share-developer/${hireDeveloperId}`,
                {
                    developerSharedByClient: [
                        {
                            agencyId: agencyId,
                            developerId: developerId
                        }
                    ]
                }
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
                            <Back name="Matched Developers" />
                            <div className="moreAgency_parent">
                                {/* <input
                                    type="text"
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                    value={searchText}
                                    placeholder="Search Developer"
                                    className="searchBox"
                                /> */}

                                <div className="developer-list-modal">
                                    <span className="modal-heading">
                                        Available Developers
                                    </span>
                                    <div className="developer-card-holder">
                                        {!loading
                                            ? singleHiredDeveloper?.length >
                                            0 &&
                                            singleHiredDeveloper?.map(
                                                (item) => {
                                                    let areDevsShared =
                                                        !!item
                                                            ?.isDevelopersShared
                                                            ?.length;
                                                    let developerSharedCode =
                                                        areDevsShared
                                                            ? item
                                                                ?.isDevelopersShared?.[0]
                                                                ?.developerStatus
                                                            : 0;

                                                    return (
                                                        <div
                                                            className="developer-card"
                                                            key={item?._id}
                                                        >
                                                            <span className="developer-name">
                                                                {`${item?.firstName} ${item?.lastName}`}
                                                            </span>
                                                            <div className="row-holder">
                                                                <div className="row-label">
                                                                    Designation
                                                                </div>
                                                                <div className="row-value">
                                                                    {
                                                                        item?.developerDesignation
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row-holder">
                                                                <div className="row-label">
                                                                    Year Of
                                                                    Experience
                                                                </div>
                                                                <div className="row-value">
                                                                    {
                                                                        item?.developerExperience
                                                                    }{' '}
                                                                    {item?.developerExperience >
                                                                        1
                                                                        ? 'Years'
                                                                        : 'Year'}
                                                                </div>
                                                            </div>
                                                            <div className="row-holder">
                                                                <div className="row-label">
                                                                    Skills
                                                                </div>
                                                                <div className="row-value">
                                                                    {item
                                                                        ?.developerTechnologies
                                                                        ?.length >
                                                                        0}{' '}
                                                                    {item?.developerTechnologies?.map(
                                                                        (
                                                                            tech
                                                                        ) => (
                                                                            <div
                                                                                className="skill-pill"
                                                                                key={
                                                                                    tech._id
                                                                                }
                                                                            >
                                                                                <span className="pill">
                                                                                    {
                                                                                        tech?.technologyName
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* <div className="row-holder">
                                                                <div className="row-label">
                                                                    Price
                                                                </div>
                                                                <div className="row-value">
                                                                    {
                                                                        item?.developerPriceRange
                                                                    }
                                                                    $ -{' '}
                                                                    {item?.developerPriceRange + ((item?.developerPriceRange / 100) * 20)}
                                                                    $ Per
                                                                    Month
                                                                </div>
                                                            </div> */}
                                                            <div
                                                                className={`shortlist_and_interest_parent  ${developerSharedCode ===
                                                                    2
                                                                    ? 'agency_pending'
                                                                    : developerSharedCode ===
                                                                        3
                                                                        ? 'agency_accepted'
                                                                        : 'agency_rejected'
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`${areDevsShared &&
                                                                        'button_parent'
                                                                        }`}
                                                                >
                                                                    {!areDevsShared ? (
                                                                        <button
                                                                            id={
                                                                                'RequirementsListCTA'
                                                                            }
                                                                            className={`${styles.L_login
                                                                                } ${styles.nav_Lbutton
                                                                                } ${'RequirementsListCTA'}`}
                                                                            style={{
                                                                                fontSize:
                                                                                    '0.85rem'
                                                                            }}
                                                                            onClick={() =>
                                                                                onOpenModal(
                                                                                    item?.agencyId,
                                                                                    item?._id
                                                                                )
                                                                            }
                                                                        >
                                                                            <span>
                                                                                {' '}
                                                                                Get
                                                                                Connected!!
                                                                            </span>
                                                                        </button>
                                                                    ) : areDevsShared &&
                                                                        developerSharedCode ===
                                                                        2 ? (
                                                                        <p>
                                                                            Great
                                                                            Step!!.
                                                                            Agency
                                                                            will
                                                                            be
                                                                            notified
                                                                            about
                                                                            your
                                                                            selections.
                                                                        </p>
                                                                    ) : areDevsShared &&
                                                                        developerSharedCode ===
                                                                        3 ? (
                                                                        <p>
                                                                            Greetings!!
                                                                            Agency
                                                                            accepted
                                                                            the
                                                                            request.
                                                                            SourceBae
                                                                            team
                                                                            will
                                                                            connect
                                                                            with
                                                                            you
                                                                            for
                                                                            further
                                                                            details.
                                                                        </p>
                                                                    ) : (
                                                                        <p>
                                                                            Sorry!!Agency
                                                                            declined
                                                                            your
                                                                            request,
                                                                            our
                                                                            support
                                                                            team
                                                                            will
                                                                            connect
                                                                            you
                                                                            soon
                                                                            with
                                                                            more
                                                                            profiles.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )
                                            : 'Loading...'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        open={open}
                        onClose={onCloseModal}
                        classNames={{
                            overlay: 'customOverlayAgencyProduct',
                            modal: 'customModalClientOneHireDeveloper'
                        }}
                        center
                        styles={{
                            closeButton: { outline: 'none' }
                        }}
                    >
                        <div className="want_to_accept">
                            <div className="connect_or_not">
                                <p>Shortlist this developer?</p>
                            </div>

                            <div className="interested_or_not">
                                <div
                                    className="update_now"
                                    onClick={handleDevelopers}
                                >
                                    <p>Yes</p>
                                </div>
                                <div
                                    className="update_later"
                                    onClick={onCloseModal}
                                >
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
        condition: state.condition
    };
};

export default connect(mapStateToProps)(ClientOneHireDeveloper);
