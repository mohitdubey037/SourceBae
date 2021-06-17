import React, { useState, useEffect } from "react";
import ClientNavbar from "../../ClientNavbar";
import "./HireAgencyForms.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import instance from "../../../../Constants/axiosConstants"
import Spinner from "../../../../Components/Spinner/Spinner";

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

  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("userId");
  const Role = "Client";
  const [data, setData] = useState({
    stepsCompleted: 1,
    clientId: id,
    projectName: "",
    projectDescription: "",
    projectProposalCost: "",
    projectExpectedStartingDays: 5,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const upArrow = () => {
    if (data.projectExpectedStartingDays < 180)
      setData({
        ...data,
        projectExpectedStartingDays: data.projectExpectedStartingDays + 15,
      });
  };

  const downArrow = () => {
    if (data.projectExpectedStartingDays > 30)
      setData({
        ...data,
        projectExpectedStartingDays: data.projectExpectedStartingDays - 15,
      });
  };

  // const hireAgencyStep1 = () => {
  //   setLoading(true)
  //   console.log(data);
  //   instance.post(`/api/${Role}/projects/create`, data)
  //     .then(function (response) {
  //       console.log(response);
  //       console.log(buttonStatus);
  //       setButtonStatus("Next")
  //       setProjectId(response._id)
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(false)
  //     })
  // };

  // useEffect(() => {
  //   console.log(buttonStatus);
  // }, [buttonStatus]);

  // const handleButton = () => {
  //   if (buttonStatus === "Submit") {
  //     hireAgencyStep1();
  //   }
  //   else if (buttonStatus === "Next" && projectId) {
  //     window.location.href = `/hire-agency-form-two:${projectId}`
  //   }
  // };

  const handleSubmit = () => {
    setLoading(true)
    console.log(data);
    instance.post(`/api/${Role}/projects/create`, data)
      .then(function (response) {
        setLoading(false);
        props.history.push(`/hire-agency-form-two:${response._id}`)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  return (
    <>
      <ClientNavbar />
      {loading ? <Spinner /> :
        <div className="mainHireAgencyForm1">
          <div
            className="backArrow"
            onClick={() => {
              props.history.push("/client-dashboard");
            }}
          >
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div className="innerHigherAgencyForm1">
            <div className="higherAgencyFormArea">
              <div className="stepCheck">
                <p>Step 1</p>
                <span>Help us understand more about your project..!!</span>
              </div>
              <div className="projectNameAgency">
                <p>1. What will be the name of your project?</p>
                <input
                  type="text"
                  name="projectName"
                  onChange={handleChange}
                  placeholder="Start from here.."
                  value={data.projectName}
                />
              </div>
              <div className="descriptionProjectAgency">
                <p>2. Describe a little bit about your project?</p>
                <textarea
                  name="projectDescription"
                  cols="30"
                  rows="6"
                  onChange={handleChange}
                  value={data.projectDescription}
                ></textarea>
                <div>
                  <span>More than 100 characters</span>
                  <span>0/100</span>
                </div>
              </div>
              <div className="budgetSectionAreaAgency">
                <p>3. What's your budget for this project?</p>
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
                      label="Below $5,000"
                    />
                    <FormControlLabel
                      value="10000"
                      control={<BlueRadio />}
                      label="$5,000-$10,000"
                    />
                    <FormControlLabel
                      value="20000"
                      control={<BlueRadio />}
                      label="$10,000-$20,000"
                    />
                    <FormControlLabel
                      value="50000"
                      control={<BlueRadio />}
                      label="$20,000-$50,000"
                    />
                    <FormControlLabel
                      value="9999999999"
                      control={<BlueRadio />}
                      label="More than $50,000"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="numberOfDays">
                <p>4. How soon do you want to start?</p>
                <div className="daysInputAgency">
                  <p>{data.projectExpectedStartingDays} days</p>
                  <div className="upArrow" onClick={upArrow}>
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                  </div>
                  <div className="downArrow" onClick={downArrow}>
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="nextbuttton">
                <span></span>
                <div onClick={() => handleSubmit()}>
                  Submit
                  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="higherAgencyInfoArea">
              <h4>Points to Remember</h4>
              <p>1. Keep the project name simple and to your brand.</p>
              <p>
                2. Write about your service or idea in clear manner, with as many
                details as possible.
            </p>
              <p>
                3. In case, you think you missed any details you can always edit
                this later.
            </p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default HireAgencyForm1;
