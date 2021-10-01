import React, { useState, useEffect } from "react";
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import "./ShortTerm.css";

import fixed from "../../../../assets/images/ClientDashboard/shortTerm/fixed.png";
import hour from "../../../../assets/images/ClientDashboard/shortTerm/hour.png";

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
    color: "#26AFFF",
    "&$checked": {
      color: "#26AFFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function ShortTerm(props) {
  const Role = localStorage.getItem('role');
  const id = localStorage.getItem("userId");

  const [words, setWords] = useState(0);
  const [allServices, setAllServices] = useState([]);
  const buttonStatus = "Post Project"

  const [apiData, setApiData] = useState({
    clientId: id,
    projectName: "",
    projectDescription: "",
    projectFiles: [],
    projectRequirements: "",
    projectProposalCost: "",
    projectServicesRequired: [],
    projectPaymentModel: "",
  });
  const [projectFiles, setProjectFiles] = useState(null);
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'projectDescription') {
      if (value.length <= 100)
        setWords(value.length);
      if (value.length > 100)
        setWords(100);
    }
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
    if (apiData.projectName === "") {
      toast.error("Project Name can't be empty.")
      return false
    }
    else if (apiData.projectDescription === "") {
      toast.error("Project Description can't be empty.")
      return false
    }
    else if (projectFiles === null || projectFiles === undefined) {
      toast.error("Please Upload a project Document")
      return false
    }
    else if (apiData.projectRequirements === "") {
      toast.error("Project Requiremnet an't be empty.")
      return false
    }
    else if (apiData.projectProposalCost === "") {
      toast.error("Please select a project proposal cost.")
      return false
    }
    else if (apiData.projectServicesRequired.length === 0) {
      toast.error("Please select a project Service.")
      return false
    }
    else if (apiData.projectPaymentModel === "") {
      toast.error("Please select a project Payment Model.")
      return false
    }
    return true
  }

  function uploadMedia() {
    const formData = new FormData();

    if (validation()) {
      formData.append("files", projectFiles, "projectFile.pdf");
      instance
        .post(`api/${Role}/media/create`, formData)
        .then(function (response) {
          console.log(response);
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
    console.log(projectDoc);
    setProjectFiles(projectDoc);
  };

  useEffect(() => {
    getAllDomains();
  }, []);

  useEffect(() => {
    console.log(allServices);
  }, [allServices]);

  useEffect(() => {
    console.log(projectFiles?.name);
  }, [projectFiles])

  useEffect(() => {
    console.log(apiData);
    if (apiData.projectFiles.length !== 0) {
      shortTermProjectApi();
    }
  }, [apiData]);
  return (
    <>
      <Navbar />
      <div className="mainShortTerm">
        <Back name="Short Term" />
        <div className="innerShortTerm">
          <div className="shortTermForm">
            <div className="shortTermHeading">
              <div className="shortTerm_OrangeColor">
              </div>
              <h1>Short Term Projects</h1>
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
            {allServices.map((service) => {
              return (
                <div className="tech-container_shortTerm">
                  <div style={{
                    backgroundColor: service.selected ? "#3498DB" : "#fff",
                    color: service.selected ? "#fff" : "#000",
                    textAlign: 'center'
                  }}
                    className={`${service.serviceName}`}
                    onClick={(event) => handleServices(event)}
                  >
                    <span className={`${service.serviceName}`}></span>
                    <img className={`${service.serviceName}`} src={service.serviceIcon} alt="icon" />
                  </div>
                  <h2 className={`${service.serviceName}`}>
                    {service.serviceName}
                  </h2>
                </div>
              );
            })}
          </div>

          <div className="shortTermProjectName">
            <ul>
              <li>
                Choose a name for your project
              </li>
            </ul>
            <div>
              <input
                type="text"
                placeholder="Give a name to identity requirement"
                name="projectName"
                value={apiData.projectName}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className="shortTermProjectDesc">
            <ul>
              <li>
                Tell us more about your project
              </li>
            </ul>
            <div className="startABit_shortTermProjectDesc">
              Start with a bit about yourself or your business, and include an
              overview what you need done.
            </div>
            <div>
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
          </div>

          <div className="shortTermFileUpload">
            <div className="uploadBlock">
              <div className="fileUploadButton">
                <FilePicker
                  extensions={['jpg', 'pdf', 'png', 'jpeg', 'xlsx']}
                  onChange={(fileObj) => fileHandler(fileObj)}
                  onError={errMsg => toast.error(errMsg)}
                >
                  <div>
                    Upload
                  </div>
                </FilePicker>
              </div>
              <div className="uploadInfo">
                <p>{`${projectFiles?.name ?? "Upload an image or a document that might be helpful in explaining your project in brief."}`}</p>
              </div>
            </div>
          </div>

          <div className="shortTermOptionSelect">
            <ul>
              <li>
                What work do you need to get done?
              </li>
            </ul>

            <div>
              <div>
                List of all requirements comma(,) separated
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Ex: Blog Section, Dashboard, Admin Panel,etc"
                name="projectRequirements"
                value={apiData.projectRequirements}
                onChange={(event) => handleChange(event)}
              // style={{ width: "100%", padding:"1rem" }}
              />
            </div>
          </div>

          <div className="howToPay">
            <ul>
              <li>
                How do you want to pay?
              </li>
            </ul>
            <div className="innerHowToPay">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="howToPay"
                  name="projectPaymentModel"
                  value={apiData.projectPaymentModel}
                  onChange={(event) => handleChange(event)}

                // onChange={(event) => handlePaymentModel(true)}
                >

                  <div className="fixedPrice" name="projectPaymentModel">
                    <FormControlLabel
                      color="primary"
                      value="Fixed Price"
                      control={<BlueRadio className={classes.root} />}
                    />
                    {/* {apiData.projectPaymentModel === "Fixed Price" ? (
                      <i class="fa fa-check-circle" aria-hidden="true"></i>
                    ) : null} */}
                    <div className="fixedImage">
                      <img src={fixed} alt="" />
                    </div>
                    <div className="fixedContent">
                      <h6>Pay fixed price</h6>
                      <p>
                        Agree on a price and release payemnt when the job is done.
                        Best for one-off tasks.
                      </p>
                    </div>
                  </div>

                  <div className="fixedPrice" name="projectPaymentModel">
                    <FormControlLabel
                      value="By Hour"
                      control={<BlueRadio className={classes.root} />}
                    />
                    {/* {apiData.projectPaymentModel === "By Hour" ? (
                      <i class="fa fa-check-circle" aria-hidden="true"></i>
                    ) : null} */}
                    <div className="fixedImage">
                      <img src={hour} alt="hour" />
                    </div>
                    <div className="fixedContent">
                      <h6>Pay by the hour</h6>
                      <p>
                        Hire based on an hourly rate and pay for hours billed. Best
                        for ongoing work
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className="estimatedBudget">
            <div className="estimatedBudgetText">
              <ul>
                <li>
                  What is your estimated Budget?
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
                    label="$5000-$10000"
                  />
                  <FormControlLabel
                    value="10000"
                    control={<BlueRadio />}
                    label="$10000-$150000"
                  />
                  <FormControlLabel
                    value="15000"
                    control={<BlueRadio />}
                    label="Max $15000"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className="post-project">
            <div onClick={() => handleButton()}>
              Post Project
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortTerm;
