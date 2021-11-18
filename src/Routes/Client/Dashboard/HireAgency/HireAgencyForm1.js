import React, { useState, useEffect } from "react";
import Navbar from "../../../../Components/ClientNewestDashboard/Navbar/Navbar";
import "./HireAgencyForms.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

import instance from "../../../../Constants/axiosConstants";
import Spinner from "../../../../Components/Spinner/Spinner";
import Back from "../../../../Components/Back/Back";
import illustration from "../../../../assets/images/Newestdashboard/Hire-Agency-Form/illustration.svg";
import UpImage from "../../../../assets/images/Newestdashboard/Short_Term/UpImage.svg";
import DownImage from "../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg";
import "./HireAgencyForm1.css";

const BlueRadio = withStyles({
  root: {
    color: "#26AFFF",
    "&$checked": {
      color: "#26AFFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const HireAgencyForm1 = (props) => {
  // let { projectId, agencyId } = useParams();
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("userId");
  const Role = "Client";
  // const [project, setProject] = useState([]);
  const [words, setWords] = useState(0);
  const [data, setData] = useState({
    stepsCompleted: 1,
    clientId: id,
    projectName: "",
    projectDescription: "",
    projectProposalCost: "5000",
    projectExpectedStartingDays: 5,
  });

  const [error, setError] = useState({
    projectNameError: "",
    projectDescriptionError: "",
    projectExpectedStartingDaysError: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "projectDescription") {
      if (value.length <= 100) setWords(value.length);
      if (value.length > 100) setWords(100);
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (props.location.state?.agencyForm1) {
      setData(props.location.state.agencyForm1);
    }
  }, []);



  // const upArrow = () => {
  //   if (data.projectExpectedStartingDays < 180)
  //     setData({
  //       ...data,
  //       projectExpectedStartingDays: data.projectExpectedStartingDays + 1,
  //     });
  // };

  // const downArrow = () => {
  //   if (data.projectExpectedStartingDays > 5)
  //   setData({
  //     ...data,
  //     projectExpectedStartingDays: data.projectExpectedStartingDays - 1,
  //   });
  // }; 

  const handleBack = () => {
    if (window.confirm("Do you want to discard changes?") == true) {
    props.history.push(`/clientNewestDashboard`) 
  }}

  const handleSubmit = () => {
    let tempError = {
      projectNameError: "",
      projectDescriptionError: "",
      projectExpectedStartingDaysError: "",
    };
    if (data.projectName === "") {
      setError({
        ...tempError,
        projectNameError: "Project name is required",
      });
    } else if (data.projectName.length < 2) {
      setError({
        ...tempError,
        projectNameError: "Project name should be more than 2 characters.",
      });
    } else if (data.projectDescription === "") {
      setError({
        ...tempError,
        projectDescriptionError: "Project description is required",
      });
    } else if (data.projectDescription.length <= 100) {
      setError({
        ...tempError,
        projectDescriptionError:
          "Project name should be more than 100 characters.",
      });
    } 
    else if (data.projectProposalCost <= 499) {
      setError({
        ...tempError,
        projectProposalCostError:
          "Project ammount should be greater than 500 $",
      });
    }else if (data.projectExpectedStartingDays <= 4) {
      setError({
        ...tempError,
        projectExpectedStartingDaysError:
          "Project starting days should be greater than 5 days",
      });
    }
     else {
      setLoading(true);
      instance
        .post(`/api/${Role}/projects/create`,(props?.location?.state?.agencyForm1?.projectId)?{...data, id:props.location.state.agencyForm1?.projectId}:data)
        .then(function (response) {
          setLoading(false);
          data.projectId=response._id
          props.history.replace(`/hire-agency-form-two:${response._id}`, {
            agencyForm1:data,
          });
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main_HireAgencyParent">
            {/* <img className="Image1_hireAgency" src={UpImage} alt="upImage" /> */}
            <img
              className="Image2_hireAgency"
              src={DownImage}
              alt="downImage"
            />
            <div className="higherAgencyInfoArea">
              <div className="points-to-remember_hireAgencyForm1">
                <h4>About Your Project</h4>
              </div>
              <div className="cardsDetail_hireAgencyForm1">
                <div className="cards_hireAgencyForm1">
                  <div className="keep_the_project_name">
                    <p>1. Keep the project name simple and to your brand.</p>
                  </div>
                </div>

                <div className="cards_hireAgencyForm1">
                  <div className="write_about_your_project">
                    <p>
                      2. Write about your service or idea in clear manner, with
                      as many details as possible.
                    </p>
                  </div>
                </div>
                <div className="cards_hireAgencyForm1">
                  <div className="in_case_you_think">
                    <p>
                      3. In case, you think you missed any details you can
                      always edit this later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="steps_hireAgencyForm">
              <div style={{ width: "27%" }}>
                <div>
                  <p>Step 1</p>
                </div>
                <div className="color_hireAgencyForm green"></div>
              </div>

              <div
                className="diabled-step_hireAgencyForm"
                style={{ width: "27%" }}
              >
                <div>
                  <p className="grey-step_hireAgencyForm">Step 2</p>
                </div>
                <div className="color_hireAgencyForm grey"></div>
              </div>

              <div style={{ width: "27%" }}>
                <div>
                  <p className="grey-step_hireAgencyForm">Step 3</p>
                </div>
                <div className="color_hireAgencyForm grey"></div>
              </div>
            </div>

            <div className="mainHireAgencyForm1">
              <div className="innerHigherAgencyForm1">
                <div className="higherAgencyFormArea">
                  <div className="understand_your_project">
                    Help us understand more about your project..!!
                  </div>
                  <div className="input-form_hireAgencyForm1">
                    <div className="projectNameAgency">
                      <p>
                        1.&nbsp;What will be the name of your project?{" "}
                        <span className="requiredStar">*</span>
                      </p>
                      <input
                        type="text"
                        name="projectName"
                        onChange={handleChange}
                        placeholder="Enter Project Name here"
                        value={data.projectName}
                        maxLength="22"
                      />
                      {error.projectNameError && (
                        <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                          {error.projectNameError}
                        </p>
                      )}
                    </div>
                    <div className="descriptionProjectAgency">
                      <p>
                        2.&nbsp;Describe a little bit about your project?{" "}
                        <span className="requiredStar">*</span>
                      </p>
                      <textarea
                        name="projectDescription"
                        cols="30"
                        rows="6"
                        onChange={handleChange}
                        value={data.projectDescription}
                      ></textarea>
                      <div>
                        <span>More than 100 characters</span>
                        <span>{words}/100</span>
                      </div>
                      {error.projectDescriptionError && (
                        <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                          {error.projectDescriptionError}
                        </p>
                      )}
                    </div>
                    {/* <div className="budgetSectionAreaAgency">
                      <p>
                        3.&nbsp;What's your budget for this project?{" "}
                        <span className="requiredStar">*</span>
                      </p>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="projectProposalCost"
                          name="projectProposalCost"
                          value={data.projectProposalCost}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="5000"
                            control={<BlueRadio />}
                            label="$5,000"
                          />
                          <FormControlLabel
                            value="15000"
                            control={<BlueRadio />}
                            label="$15,000"
                          />
                          <FormControlLabel
                            value="25000"
                            control={<BlueRadio />}
                            label="$25,000"
                          />
                          <FormControlLabel
                            value="35000"
                            control={<BlueRadio />}
                            label="More Than $35000 Per Month"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div> */}
                    <div className="budgetSectionAreaAgency">
                      <p>
                      3.&nbsp;What's your budget for this project? (in $){" "}
                        <span className="requiredStar">*</span>{" "}
                      </p>
                      {/* <div className="daysInputAgency"> */}
                      <input
                        style={{
                          height: "35px",
                          width: "79%",
                          border: "1px solid #015F9A",
                          padding: "1rem",
                          borderRadius: "8px",
                        }}
                        name="projectProposalCost"
                        type="number"
                        onChange={handleChange}
                        min="500"
                        // max="180"
                        value={data.projectProposalCost}
                        placeholder="Text should be number "
                      />
                      {error.projectProposalCostError && (
                        <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                          {error.projectProposalCostError}
                        </p>
                      )}
                      </div>
                    <div className="numberOfDays">
                      <p>
                        4.&nbsp;How soon do you want to start? (in days){" "}
                        <span className="requiredStar">*</span>{" "}
                      </p>
                      {/* <div className="daysInputAgency"> */}
                      <input
                        style={{
                          height: "35px",
                          width: "79%",
                          border: "1px solid #015F9A",
                          padding: "1rem",
                          borderRadius: "8px",
                        }}
                        name="projectExpectedStartingDays"
                        type="number"
                        onChange={handleChange}
                        min="5"
                        // max="180"
                        value={data.projectExpectedStartingDays}
                        placeholder="Text should be number "
                      />
                      {error.projectExpectedStartingDaysError && (
                        <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                          {error.projectExpectedStartingDaysError}
                        </p>
                      )}
                      </div>
                      {/* <p>{data.projectExpectedStartingDays} days</p>
                        <div className="upArrow" onClick={upArrow}>
                          <i class="fa fa-angle-up" aria-hidden="true"></i>
                        </div>
                        {data.projectExpectedStartingDays > 5 ? ( 
                        <div className="downArrow" onClick={downArrow}>
                          <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div> 
                        ):(null)}
                      </div> */}
                    
                  </div>
                  <div className="nextbutton nextbutton_hireAgencyForm1">
                    <div
                      className="backbutton_hireAgencyForm2"
                      onClick={() => handleBack()
                        // props.history.push(`/clientNewestDashboard`)
                      }
                      style={{ backgroundColor: "#707070" }}
                    >
                      Back
                    </div>
                    <div onClick={() => handleSubmit()}>Submit</div>
                  </div>
                </div>
                <div className="illustration_hireAgencyForm1">
                  <img src={illustration} alt="agency" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HireAgencyForm1;
