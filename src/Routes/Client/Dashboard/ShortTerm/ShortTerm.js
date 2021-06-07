import React, { useState, useEffect } from "react";
import ClientNavbar from "../../ClientNavbar";
import "./ShortTerm.css";

import development from "../../../../assets/images/ClientDashboard/shortTerm/development.png";
import design from "../../../../assets/images/ClientDashboard/shortTerm/design.png";
import sales from "../../../../assets/images/ClientDashboard/shortTerm/sales.png";
import other from "../../../../assets/images/ClientDashboard/shortTerm/other.png";
import fixed from "../../../../assets/images/ClientDashboard/shortTerm/fixed.png";
import hour from "../../../../assets/images/ClientDashboard/shortTerm/hour.png";

//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import instance from "../../../../Constants/axiosConstants";
import { FilePicker } from "react-file-picker";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BlueRadio = withStyles({
  root: {
    color: "#26AFFF",
    "&$checked": {
      color: "#26AFFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function ShortTerm() {
  const Role = "client";
  const id = localStorage.getItem("userId");

  const [allServices, setAllServices] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("Upload");

  const [document, setDocument] = useState({
    documentLink: "",
    documentPicked: false,
    document: "",
  });

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
    // setValue(event.target.value);
    const { name, value } = event.target;
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

  function uploadMedia() {
    const formData = new FormData();
    console.log(projectFiles);

    projectFiles && formData.append("files", projectFiles, "projectFile.pdf");
    instance
      .post(`api/${Role}/media/create`, formData)
      .then(function (response) {
        console.log(response);
        setApiData({
          ...apiData,
          projectFiles: [response[0]?.mediaURL]
        });
        setButtonStatus("Post Project");
      });
  }

  const shortTermProjectApi = () => {

    instance.post(`api/${Role}/projects/create-short-term`, apiData)
    .then(function (response){
        console.log('hiii');
        setButtonStatus("Finish");
    })
  };

  const handleButton = () => {
    if (buttonStatus === "Upload") uploadMedia();
    else if (buttonStatus === "Post Project") shortTermProjectApi();
    else if (buttonStatus === "Finish")
      window.location.href = "/hire-agency-form-one";
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
    console.log(fileHandler)
    setProjectFiles(projectDoc);
  };

  useEffect(() => {
    getAllDomains();
  }, []);

  useEffect(() => {
    console.log(allServices);
  }, [allServices]);

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);
  return (
    <>
      <ClientNavbar />
      <div className="mainShortTerm">
        <div className="innerShortTerm">
          <div className="shortTermForm">
            <div className="shortTermHeading">
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
                <div
                  style={{
                    backgroundColor: service.selected ? "#3498DB" : "#fff",
                    color: service.selected ? "#fff" : "#000",
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
                  <h2 className={`${service.serviceName}`}>
                    {service.serviceName}
                  </h2>
                </div>
              );
            })}
          </div>

          <div className="shortTermProjectName">
            <p>Choose a name for your project</p>
            <input
              type="text"
              placeholder="Write here..."
              name="projectName"
              value={apiData.projectName}
              onChange={(event) => handleChange(event)}
            />
          </div>

          <div className="shortTermProjectDesc">
            <p>Tell us more about your project</p>
            <span>
              Start with a bit about yourself or your business, and include an
              overview what you need done.
            </span>
            <br />
            <textarea
              cols="30"
              rows="6"
              type="text"
              placeholder="Write here..."
              name="projectDescription"
              value={apiData.projectDescription}
              onChange={(event) => handleChange(event)}
            />
            <div className="wordsLimit">
              <p>Minimum 100 characters.</p>
              <p>0/100</p>
            </div>
          </div>

          <div className="shortTermFileUpload">
            <div className="uploadBlock">
              <div className="fileUploadButton">
                <FilePicker
                  extensions={["pdf", "jpg", "png"]}
                  onChange={(fileObj) => fileHandler(fileObj)}
                >
                  <div>
                    <i class="fa fa-upload" aria-hidden="true"></i>Upload
                  </div>
                </FilePicker>
              </div>
              <div className="uploadInfo">
                <p>
                  Upload an image or a document that might be helpful in
                  explaining your project in brief.
                </p>
              </div>
            </div>
          </div>

          <div className="shortTermOptionSelect">
            <h6>What work do you need to get done?</h6>
            <p>Choose a name for your project</p>
            <input
              type="text"
              placeholder="List of all requirements comma(,) separated"
              name="projectRequirements"
              value={apiData.projectRequirements}
              onChange={(event) => handleChange(event)}
            />
          </div>

          <div className="howToPay">
            <h6>How do you want to pay?</h6>
            <div className="innerHowToPay">
              <div
                className="fixedPrice"
                name="projectPaymentModel"
                onClick={() => handlePaymentModel(true)}
              >
                {apiData.projectPaymentModel === "Fixed Price" ? (
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                ) : null}
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

              <div
                className="fixedPrice"
                name="projectPaymentModel"
                onClick={() => handlePaymentModel(false)}
              >
                {apiData.projectPaymentModel === "By Hour" ? (
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                ) : null}
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
            </div>
          </div>

          <div className="estimatedBudget">
            <div className="estimatedBudgetText">
              <h6>What is your estimated Budget?</h6>
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

          <div className="doneButton">
            <div></div>
            <button onClick={() => handleButton()}>
              {buttonStatus}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortTerm;
