/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
import "react-responsive-modal/styles.css";
import logo from "../../../assets/images/Logo/logo.png";
import PageNotFound from "../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg";

import ProductIcon from '../../../assets/images/Newestdashboard/Product_Detail/product_detail.svg';
import * as helper from "../../../shared/helper";
import instance from "../../../Constants/axiosConstants";
import Spinner from '../../../Components/Spinner/Spinner';
import { Modal } from "react-responsive-modal";
import Moment from "react-moment";
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../Components/Back/Back';
import Profile_image1 from '../../../assets/images/Newestdashboard/Client_Profile/UpImage.svg';
import Profile_image2 from '../../../assets/images/Newestdashboard/Client_Profile/DownImage.svg';


function ProductDetails(props) {
  const logoLink = "https://api.onesourcing.in/media/images/1637044803259.svg";

  let { productId } = useParams();
  productId = productId || "";

  const Role = localStorage.getItem("role");
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState([]);
  const [similarAgency, setSimilarAgency] = useState([]);
  const [detailsInJson, setDetailsInJson] = useState();
  const [err, setErr] = useState();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    agencyId: '',
    subject: '',
    message: '',
    linkedIn: ''
  })

  const onOpenModal = (agencyId) => {
    setOpen(true);
    setForm({
      ...form,
      agencyId: agencyId
    })
  }
  const onCloseModal = () => setOpen(false);

  const getProduct = () => {
    setLoading(true)
    instance
      .get(`/api/${Role}/products/get/${productId}`)
      .then((response) => {
        setLoading(false)
        if (Role === 'Client') {
          setSimilarAgency(response.similarAgencies);
        }
        setDetails([response.product]);
        setDetailsInJson(response.product);
      })
      .catch((err) => {
        setLoading(false)
        setErr(err?.response?.data?.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  const handleValidation = () => {
    const err = {}
    if (form.subject === '') {
      err.subject = "subject can't be empty";
    }
    else if (form.message === '') {
      err.message = "message can't be empty";
    }
    else if (form.linkedIn === '') {
      err.linkedIn = "linked url is required";
    }
    else if (!helper.validateLinkedIn(form.linkedIn)) {
      err.linkedIn = "invalid linked url";
    }
    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    else return false;
  }

  const handleConnect = (agencyId) => {
    if (handleValidation()) {
      instance.post(`/api/${Role}/products/connect-agency`, form)
        .then(res => {
          onCloseModal()
        })
        .catch(err => {
        })
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);

  const brr = [
    {
      heading: "Product Stage",
      content: [
        {
          ans: detailsInJson && detailsInJson?.productCurrentStatus,
        },
      ],
    },
    {
      heading: "Customers Accquired",
      content: [
        {
          ans: detailsInJson?.productCustomerAccquired,
        },
      ],
    },
    {
      heading: "Active Users",
      content: [
        {
          ans: detailsInJson?.productActiveUsers,
        },
      ],
    },
    {
      heading: "Feature Link",
      content: [
        {
          ans: detailsInJson?.productFeatureLink,
        },
      ],
    },
    {
      heading: "Platform Link",
      content: [
        {
          ans: detailsInJson?.productPlatformLink,
        },
      ],
    },
  ];

  const arr = [
    {
      heading: "Product Name",
      content: [
        {
          ans: detailsInJson?.productName,
        },
      ],
    },
    {
      heading: "Headquarter",
      content: [
        {
          ans: detailsInJson?.productCompanyLocation,
        },
      ],
    },
    {
      heading: "Business Model",
      content: [
        {
          ans: detailsInJson?.productBusinessModel,
        },
      ],
    },
    {
      heading: "Business Product",
      content: [
        {
          ans:
            detailsInJson?.productDomain !== undefined
              ? detailsInJson?.productDomain?.domainName
              : null,
        },
      ],
    },
    {
      heading: "Founding Date",
      content: [
        {
          ans: (
            <Moment format="D MMM YYYY" withTitle>
              {detailsInJson?.createdAt}
            </Moment>
          ),
        },
      ],
    },
    {
      heading: "Team Size",
      content: [
        {
          ans: detailsInJson?.productTeamSize,
        },
      ],
    },
    {
      heading: "Founders",
      content: [
        {
          ans: detailsInJson?.productFounderLinkedinProfiles,
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({});

  const formHandler = (event) => {
    const { name, value } = event.target;
    setModalForm({
      ...modalForm,
      [name]: value,
    });
  };

  const dummyForm = {
    clientId: localStorage.getItem("userId"),
    productId,
  };

  const postSubmitHandler = () => {
    instance
      .post(`/api/${Role}/investments/create`, dummyForm)
      .then((response) => {
        onCloseModal();
      })
      .catch((err) => {
      });
  };

  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);

  return (
    <>
      <Navbar logoLink={logoLink}/>
      {loading === true ? <Spinner /> :
        err ? (
          <>
            <div style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
              <img height="300px" src={PageNotFound} alt="no_data_img" />
              <h6>{err}</h6>
            </div>
          </>
        ) : (
          details.length > 0 &&
          details?.map((value, index) => {
            return (
              <div className="mainProductDetails">
                <img className="Image1" src={Profile_image1} alt="signup" />
                <img className="Image2" src={Profile_image2} alt="signup" />

                <Back name="Product Details" />
                <div style={{justifyContent: similarAgency?.length < 0 && 'center'}} className={
                    Role === "Client"
                      ? "innerProductDetails"
                      : "innerProductDetails_conditional"
                  }
                >
                  <div
                    className={Role === "Client"
                      ? "productDetailsArea"
                      : "productDetailsArea_conditional"
                    }
                  >
                    <div className="productDetailsHeader">
                      <div className="productDetailsImage">
                        <img src={value?.agencyId?.agencyLogo} alt="" />
                      </div>
                      <div className="peoductNameTags">
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '0.7rem' }}>
                          <h1>{value?.agencyId?.agencyName}</h1>
                          {Role === "Client" && (
                            <span
                              className="view-profile_productDetails"
                              onClick={() =>
                                props.history.push({
                                  pathname: `/agency-profile:${value?.agencyId?._id}`,
                                  condition: `Client`,
                                })
                              }
                            >
                              View Profile
                            </span>
                          )}
                        </div>
                        <p>{value?.agencyId?.agencyDescription}</p>
                        <div className="productTags">
                          {value?.agencyId?.agencyDomains.map((a) => {
                            return (
                              <span>
                                <img src={ProductIcon} alt="productIcon" />
                                <p style={{ marginLeft: '0.5rem' }}>{a?.domainId?.domainName}</p>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {Role === 'Client' &&
                      <div className="connectButton">
                        <div></div>
                        <div onClick={() => onOpenModal(value.agencyId._id)}>
                          <p>
                            Connect
                            <i
                              class="fa fa-long-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </div>
                      </div>
                    }

                    <div className="productDetailsDiv">
                      <div className="headerInformation">
                        <h3>Product Information</h3>
                        <div className="productDesc">
                          <div className="productDescPara">
                            <p>{value?.productDescription}</p>
                          </div>
                          <div className="productDescImage">
                            <div className="imageContainer">
                                <img src={value?.productLogo} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="allPoints">
                      {arr.map((value, index) => {
                        return (
                          <div style={{ display: (value.content[0].ans === '' || value.content[0].ans === null) && 'none' }} className="allPointsCard">
                            <div className="allPointCardHeading">
                              <ul>
                                <li>
                                  {value?.heading}
                                </li>
                              </ul>
                            </div>
                            <div className="allPointsCardContent">
                              {value?.content.map((val) => {
                                return (
                                  <>
                                    {value?.heading === "Founders" ? (
                                      <>
                                        {val?.ans?.length > 0 &&
                                          val?.ans?.map((link) => {
                                            return (
                                              <>
                                                <a
                                                  target="_blank"
                                                  href={link}
                                                  rel="noreferrer"
                                                >
                                                  {link}
                                                </a>
                                              </>
                                            );
                                          })}
                                      </>
                                    ) : (
                                      <p>{val?.ans}</p>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="productFunding">
                      <div>
                        <h3>Funding</h3>
                      </div>
                      <div className="innerProductFunding">
                        <div className="totalRevenue">
                          <div>
                            <span>Total Revenue</span>
                            <p>₹100k</p>
                          </div>
                        </div>
                        <div className="totalFunding">
                          <span className="middleLine"></span>
                          <div>
                            <span>Total Funding</span>
                            <p>₹5000k</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="workingStatus">
                      <div className="workingStatusHeading">
                        <h3>Product Status</h3>
                      </div>
                      <div className="workingStatusInfo">
                        {brr.map((value, index) => {
                          return (
                            <div style={{ display: value.content[0].ans === '' && 'none' }} className="allPointsCard">
                              <div className="allPointCardHeading">
                                <ul>
                                  <li>
                                    {value?.heading}
                                  </li>
                                </ul>
                              </div>
                              <div className="allPointsCardContent">
                                {value?.content.map((val) => {
                                  return (
                                    <>
                                      {value?.heading === "Feature Link" ||
                                        value?.heading === "Platform Link" ? (
                                        <>
                                          <a
                                            target="_blank"
                                            href={val?.ans}
                                            rel="noreferrer"
                                          >
                                            {val?.ans}
                                          </a>
                                        </>
                                      ) : (
                                        <p>{val?.ans}</p>
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  {Role === "Client" &&
                    similarAgency?.length > 0 ?
                    (
                      <div className="innerMoreAgencie">
                        <div className="moreAgencyHeading">
                          <h3>Similar Agencies</h3>
                        </div>
                        {similarAgency?.map(value => (
                          <div className="moreAgencyList_productDetails">
                            <div style={{ cursor: "pointer" }}
                              onClick={() => props.history.push(
                                `/product-details/${value._id}`
                              )}
                              className="moreAgencyCard_productDetails"
                            >
                              <div className="moreAgencyLogo_productDetails">
                                <div>
                                  <img src={logo} alt="alt" />
                                </div>
                                <p>not coming name</p>
                              </div>
                              <div className="moreAgencyInfo_productDetails">
                                <p>{value?.agencyId?.agencyDescription}</p>
                              </div>
                            </div>
                          </div>
                        ))
                        }
                      </div>
                    ) : null
                  }
                </div>
              </div>
            );
          })
        )
      }

      <Modal open={open} onClose={onCloseModal} classNames={{
        overlay: 'customOverlayAgencyProduct',
        modal: 'customModalAgencyProduct',
      }} center>
        <div className="modalHeaderProduct">
          <h2>Get Connected</h2>
        </div>
        <div className="productModalForm">
          <p className="toText">To : Founder at SheThink</p>

          <div className="productModalInput">
            <p>Subject</p>
            <input name="subject" onChange={handleChange} type="text" placeholder="Enter your subject" />
            {errors.subject && (
              <p className="error_productAgencies">
                {errors.subject}
              </p>
            )}
          </div>
          <div className="productModalInput">
            <p>Message</p>
            <textarea name="message" onChange={handleChange} cols="30" rows="6" type="text" placeholder="Enter your message here" />
            {errors.message && (
              <p className="error_productAgencies">
                {errors.message}
              </p>
            )}
          </div>
          <div className="productModalInput">
            <p>Linkedin URL</p>
            <input name="linkedIn" onChange={handleChange} type="text" placeholder="Enter your url" />
            {errors.linkedIn && (
              <p className="error_productAgencies">
                {errors.linkedIn}
              </p>
            )}
          </div>
        </div>
        <div className="connectedButton">
          <div onClick={() => handleConnect()}>
            <p>Get connected to the Company <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetails;
