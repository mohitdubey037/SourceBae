import React, { useState, useEffect } from "react";
import Navbar from "../../../../Components/ClientNewestDashboard/Navbar/Navbar";
import "./ShortTerm.css";

import fixed from "../../../../assets/images/Newestdashboard/Short_Term/payment.svg";
import hour from "../../../../assets/images/Newestdashboard/Short_Term/hourglass.svg";

//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import instance from "../../../../Constants/axiosConstants";
import { FilePicker } from "react-file-picker";
import { toast } from "react-toastify";
import Back from "../../../../Components/Back/Back";
import FileUploadImage from "../../../../assets/images/Newestdashboard/Short_Term/short_term.svg";
import UpImage from "../../../../assets/images/Newestdashboard/Short_Term/UpImage.svg";
import DownImage from "../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const BlueRadio = withStyles({
  root: {
    "&$checked": {
      color: "#26AFFF",
    },
    padding: "0",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function ShortTerm(props) {
  const Role = localStorage.getItem("role");
  const id = localStorage.getItem("userId");

  const [words, setWords] = useState(0);
  const [allServices, setAllServices] = useState([]);
  const [errors, setErrors] = useState({});

  const [apiData, setApiData] = useState({
    clientId: id,
    projectName: "",
    projectDescription: "",
    projectFiles: [],
    projectExpectedTimeline: "5",
    projectRequirements: "",
    projectProposalCost: "",
    projectServicesRequired: [],
    projectPaymentModel: "",
    agencyExperience: "",
    projectHourBasisCost: "",
  });
  const [projectFiles, setProjectFiles] = useState(null);
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "projectDescription") {
      if (value.length <= 100) setWords(value.length);
      if (value.length > 100) setWords(100);
    }
    setApiData({
      ...apiData,
      [name]: value,
    });
  };
  const handleChangeRadio = (name, value) => {
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const handleServices = (event) => {
    const { className } = event.target;
    const toggledServices = allServices.map((service) => {
      setApiData({
        ...apiData,
        projectServicesRequired: [service._id],
      });
      if (service.serviceName === className) {
        return {
          ...service,
          selected: !service.selected,
        };
      } else {
        return {
          ...service,
          selected: false,
        };
      }
    });
    setAllServices(toggledServices);
  };

  const validation = () => {
    const err = {};
    if (apiData.projectName === "") {
      err.projectName = 'Project name can"t be empty.';
    } else if (apiData.projectDescription.length === "") {
      err.projectDescription = 'Project description can"t be empty.';
    } else if (apiData.projectDescription.length < 100) {
      err.projectDescription =
        "Project description should be more than 100 characters";
    } else if (projectFiles === null || projectFiles === undefined) {
      err.projectUpload = "Please upload a project Document";
    } else if (apiData.projectRequirements === "") {
      err.projectRequirements = "Project qequirement ain't be empty.";
    } else if (apiData.projectPaymentModel === "") {
      err.projectPaymentModel = "Please select a project Payment Model.";
    } else if (apiData.projectHourBasisCost === "" && apiData.projectPaymentModel === "By Hour") {
        err.projectHourBasisCost =
          "Please select a Hourly project proposal cost.";
    } else if (apiData.projectProposalCost === "") {
      err.projectProposalCost = "Please select a project proposal cost.";
    } else if (apiData.projectServicesRequired.length === 0) {
      err.projectServicesRequired = "Please select a project service.";
    } else if (apiData.projectExpectedTimeline === "") {
      err.projectExpectedTimeline =
        "Please select Project Expected Starting Days.";
    } else if (apiData.projectExpectedTimeline < 5) {
      err.projectExpectedTimeline = "Please choose more than 5 days .";
    } else if (apiData.agencyExperience === "") {
      err.agencyExperience = "Please select a Agency Experience.";
    }

    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    else return false;
  };

  function uploadMedia() {
    const formData = new FormData();

    if (validation()) {
      formData.append("files", projectFiles, "projectFile.pdf");
      instance
        .post(`api/${Role}/media/create`, formData)
        .then(function (response) {
          setApiData({
            ...apiData,
            projectFiles: [response[0]?.mediaURL],
          });
        });
    }
  }

  const shortTermProjectApi = () => {
    if (apiData.projectFiles.length > 0) {
      instance
        .post(`api/${Role}/projects/create-short-term`, apiData)
        .then(function (response) {
          props.history.replace(`/agency-list:${response.project._id}`);
        });
    } else {
      toast.error("Please Upload Project Document.");
    }
  };

  const handleButton = () => {
    uploadMedia();
  };

  const handlePaymentModel = (status) => {
    if (status)
      setApiData({
        ...apiData,
        projectPaymentModel: "Fixed Price",
      });
    else
      setApiData({
        ...apiData,
        projectPaymentModel: "By Hour",
      });
  };

  //Api Calls methods
  const getAllDomains = () => {
    instance.get(`api/${Role}/services/all`).then(function (response) {
      const serviceNames = response.map((service) => {
        return {
          ...service,
          selected: false,
        };
      });
      setAllServices(serviceNames);
    });
  };

  const fileHandler = (projectDoc) => {
    setProjectFiles(projectDoc);
  };

  useEffect(() => {
    getAllDomains();
  }, []);

  useEffect(() => {
  }, [allServices]);

  useEffect(() => {
  }, [projectFiles]);

  useEffect(() => {
    if (apiData.projectFiles.length !== 0) {
      shortTermProjectApi();
    }
  }, [apiData]);
  return (
    <>
      <Navbar />
      <div className="mainShortTerm">
        <img className="Image1_shortTerm" src={UpImage} alt="upImage" />
        <img className="Image2_shortTerm" src={DownImage} alt="downImage" />
        <Back name="Short Term" />
        <div className="innerShortTerm">
          <div className="shortTermForm">
            <div className="shortTermHeading">
              <h2>Short Term Projects</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                modi pariatur animi, beatae ab tempore.
              </p>
            </div>
          </div>

          <div className="tellUsWhatYouNeed">
            <h6>Tell Us What You Need..!!</h6>
          </div>

          <div className="shortTermProjectType">
            <p className="select_technology_shortTerm">
              Please select a service <span style={{ color: "red" }}>*</span>
            </p>
            <div className="shortTermProjectType_child">
              {allServices.map((service) => {
                return (
                  <div className="tech-container_shortTerm">
                    <div
                      style={{
                        filter: service.selected
                          ? " invert(90%) sepia(21%) saturate(287%) hue-rotate(150deg) brightness(98%) contrast(98%)"
                          : "none",
                        color: service.selected ? "#fff" : "#000",
                        textAlign: "center",
                        padding: "5px 2px 1px 4px",
                      }}
                      className={`${service.serviceName}`}
                      onClick={(event) => handleServices(event)}
                    >
                      <span className={`${service.serviceName}`}></span>
                      <img
                        className={`${service.serviceName}`}
                        src={service.serviceIcon}
                        alt="icon"
                      />
                    </div>
                    <h2 className={`${service.serviceName}`}>
                      {service.serviceName}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="left_and_right_side">
            <div className="left_side_shortTerm">
              <div className="shortTermProjectName">
                <ul>
                  <li>
                    Choose a name for your project{" "}
                    <span className="requiredStar">*</span>
                  </li>
                </ul>
                <div>
                  <input
                    type="text"
                    placeholder="Give a name to identity requirement"
                    name="projectName"
                    value={apiData.projectName}
                    maxLength="22"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.projectName && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectName}
                  </p>
                )}
              </div>

              <div className="shortTermProjectDesc">
                <ul>
                  <li>
                    Tell us more about your project{" "}
                    <span className="requiredStar" style={{ color: "red" }}>
                      *
                    </span>
                  </li>
                </ul>
                <div className="startABit_shortTermProjectDesc">
                  Start with a bit about yourself or your business, and include
                  an overview what you need done.
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <textarea
                    cols="30"
                    rows="6"
                    type="text"
                    name="projectDescription"
                    value={apiData.projectDescription}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="wordsLimit">
                  <p>Minimum 100 characters.</p>
                  <p>{words}/100</p>
                </div>
                {errors.projectDescription && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectDescription}
                  </p>
                )}
              </div>

              <div className="shortTermFileUpload">
                <div className="uploadBlock">
                  <div className="fileUploadButton">
                    <div
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        width: "20%",
                      }}
                    >
                      <FilePicker
                        extensions={["jpg", "pdf", "png", "jpeg", "xlsx"]}
                        onChange={(fileObj) => fileHandler(fileObj)}
                        onError={(errMsg) => toast.error(errMsg)}
                      >
                        <img
                          className="fileUpload_shortTerm"
                          src={FileUploadImage}
                          alt="image"
                        />
                      </FilePicker>{" "}
                      <span className="requiredStar">*</span>
                    </div>
                  </div>
                  <div className="uploadInfo">
                    <p>{`${
                      projectFiles?.name ??
                      "Upload an image or a document that might be helpful in explaining your project in brief."
                    }`}</p>
                  </div>
                </div>
                {errors.projectUpload && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectUpload}
                  </p>
                )}
              </div>

              <div className="shortTermOptionSelect">
                <ul>
                  <li>
                    What work do you need to get done?{" "}
                    <span className="requiredStar">*</span>
                  </li>
                </ul>

                <div>
                  <div>List of all requirements comma(,) separated</div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Ex: Blog Section, Dashboard, Admin Panel,etc"
                    name="projectRequirements"
                    value={apiData.projectRequirements}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
              {errors.projectRequirements && (
                <p className="error_productForm_shortTerm">
                  {errors.projectRequirements}
                </p>
              )}
            </div>

            <div className="right_side_shortTerm">
              <div className="howToPay">
                <ul>
                  <li>
                    How do you want to pay?{" "}
                    <span className="requiredStar">*</span>
                  </li>
                </ul>
                <div className="innerHowToPay">
                  <FormControl component="fieldset">
                    <RadioGroup
                      className={classes.root}
                      aria-label="howToPay"
                      name="projectPaymentModel"
                      value={apiData.projectPaymentModel}
                      // onChange={(event) => handleChange(event)}
                    >
                      <div
                        className="fixedPrice"
                        name="projectPaymentModel"
                        onClick={() =>
                          handleChangeRadio(
                            "projectPaymentModel",
                            "Fixed Price"
                          )
                        }
                      >
                        <FormControlLabel
                          color="primary"
                          value="Fixed Price"
                          control={<BlueRadio className={classes.root} />}
                        />
                        <div className="fixedImage">
                          <img src={fixed} alt="" />
                        </div>
                        <div className="fixedContent">
                          <h6>Pay fixed price</h6>
                          <p>
                            Agree on a price and release payemnt when the job is
                            done. Best for one-off tasks.
                          </p>
                        </div>
                      </div>

                      <div
                        style={{ marginTop: "1rem" }}
                        className="fixedPrice"
                        name="projectPaymentModel"
                        onClick={() =>
                          handleChangeRadio("projectPaymentModel", "By Hour")
                        }
                      >
                        <FormControlLabel
                          value="By Hour"
                          control={<BlueRadio className={classes.root} />}
                        />
                        <div className="fixedImage">
                          <img src={hour} alt="hour" />
                        </div>
                        <div className="fixedContent">
                          <h6>Pay by the hour</h6>
                          <p>
                            Hire based on an hourly rate and pay for hours
                            billed. Best for ongoing work
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
                {errors.projectPaymentModel && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectPaymentModel}
                  </p>
                )}
              </div>

              {apiData.projectPaymentModel === "By Hour" ? (
                <div className="hourlyPaymentBudget">
                  <div>
                    <ul>
                      <li>
                        What is your Hourly Budget?{" "}
                        <span className="requiredStar">*</span>
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="projectHourBasisCost"
                        name="projectHourBasisCost"
                        value={apiData.projectHourBasisCost}
                        onChange={(event) => handleChange(event)}
                      >
                        <FormControlLabel
                          color="primary"
                          value="1"
                          control={<BlueRadio className={classes.root} />}
                          label="$0 - $15"
                        />
                        <FormControlLabel
                          value="15"
                          control={<BlueRadio />}
                          label="$15 - $30"
                        />
                        <FormControlLabel
                          value="30"
                          control={<BlueRadio />}
                          label="Max $30"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {errors.projectHourBasisCost && (
                    <p className="error_productForm_shortTerm">
                      {errors.projectHourBasisCost}
                    </p>
                  )}
                </div>
              ) : null}

              <div className="estimatedBudget">
                <div className="estimatedBudgetText">
                  <ul>
                    <li>
                      What is your estimated Budget?{" "}
                      <span className="requiredStar">*</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="projectProposalCost"
                      name="projectProposalCost"
                      value={apiData.projectProposalCost}
                      onChange={(event) => handleChange(event)}
                    >
                      <FormControlLabel
                        color="primary"
                        value="5000"
                        control={<BlueRadio className={classes.root} />}
                        label="$5000 - $10000"
                      />
                      <FormControlLabel
                        value="10000"
                        control={<BlueRadio />}
                        label="$10000 - $150000"
                      />
                      <FormControlLabel
                        value="15000"
                        control={<BlueRadio />}
                        label="Max $15000"
                        style={{ marginTop: "0.5rem" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                {errors.projectProposalCost && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectProposalCost}
                  </p>
                )}
              </div>
              {console.log(apiData,"apidata")}
              <div className="numberOfDays">
                <ul  style={{marginLeft:"0"}}><li>
                  How soon do you want to start?{" "}
                  <span className="requiredStar">*</span>{" "}
                </li></ul>
                {/* <div className="daysInputAgency"> */}
                <input
                  style={{
                    height: "35px",
                    width: "21rem",
                    border: "1px solid #015F9A",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                  name="projectExpectedTimeline"
                  type="number" 
                  onChange={(event) => handleChange(event)}
                  min="5"
                  value={apiData.projectExpectedTimeline}
                  placeholder="Text should be number "
                />
                {errors.projectExpectedTimeline && (
                  <p className="error_productForm_shortTerm">
                    {errors.projectExpectedTimeline}
                  </p>
                )}
                {/* <p>{data.projectExpectedTimeline} days</p>
                        <div className="upArrow" onClick={upArrow}>
                          <i class="fa fa-angle-up" aria-hidden="true"></i>
                        </div>
                        {data.projectExpectedTimeline > 5 ? ( 
                        <div className="downArrow" onClick={downArrow}>
                          <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div> 
                        ):(null)}
                      </div> */}
              </div>
              <div className="agencyExperience">
                <ul>
                  <li>
                    <p>
                      How experience should the agency be in the domain of the
                      project? <span className="requiredStar">*</span>
                    </p>
                  </li>
                </ul>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="agencyExperience"
                      name="agencyExperience"
                      value={apiData.agencyExperience}
                      onChange={(event) => handleChange(event)}
                    >
                      <div className="radio-label_hireAgencyForm2">
                        <FormControlLabel
                          color="primary"
                          value="capable"
                          control={<BlueRadio className={classes.root} />}
                          label="Capable"
                        />
                      </div>
                      <div className="radio-label_hireAgencyForm2">
                        <FormControlLabel
                          value="skilled"
                          control={<BlueRadio />}
                          label="Skilled"
                        />
                      </div>
                      <div className="radio-label_hireAgencyForm2">
                        <FormControlLabel
                          value="proficient"
                          control={<BlueRadio />}
                          label="Proficient"
                        />
                      </div>
                      <div className="radio-label_hireAgencyForm2">
                        <FormControlLabel
                          value="accomplished"
                          control={<BlueRadio />}
                          label="Accomplished"
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                {errors.agencyExperience && (
                  <p className="error_productForm_shortTerm">
                    {errors.agencyExperience}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="post-project">
            <p onClick={() => handleButton()}>Post Project</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortTerm;
