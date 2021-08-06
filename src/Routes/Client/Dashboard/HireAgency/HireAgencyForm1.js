import React, { useState, useEffect } from "react";
import ClientNavbar from "../../ClientNavbar";
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import "./HireAgencyForms.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import instance from "../../../../Constants/axiosConstants"
import Spinner from "../../../../Components/Spinner/Spinner";
import Back from '../../../../Components/Back/Back';

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
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    if (name === 'projectDescription') {
      if (value.length <= 100)
      setWords(value.length);
    }
    setData({
      ...data,
      [name]: value,
    });
  };


  useEffect(() => {
    console.log(words);
  }, [words])

  const upArrow = () => {
    if (data.projectExpectedStartingDays < 180)
      setData({
        ...data,
        projectExpectedStartingDays: data.projectExpectedStartingDays + 1,
      });
  };

  const downArrow = () => {
    setData({
      ...data,
      projectExpectedStartingDays: data.projectExpectedStartingDays - 1,
    });
  };


  const handleSubmit = () => {
    let tempError = {
      projectNameError: "",
      projectDescriptionError: "",
    }
    if (data.projectName === "") {
      setError(
        {
          ...tempError,
          projectNameError: 'Project name is required',
        }
      )
    }
    else if (data.projectName.length < 2) {
      setError(
        {
          ...tempError,
          projectNameError: 'Project name should be more than 2 characters.',
        }
      )
    }
    else if (data.projectDescription === "") {
      setError(
        {
          ...tempError,
          projectDescriptionError: 'Project description is required',
        }
      )
    }
    else if (data.projectDescription.length <= 100) {
      setError(
        {
          ...tempError,
          projectDescriptionError: 'Project name should be more than 100 characters.',
        }
      )
    }
    else {
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
  }

  return (
    <>
      <div className="Navbar-parent">
        <Navbar />
      </div>

      {loading ? <Spinner /> :

        <>
          <div className="higherAgencyInfoArea">
            <div className="points-to-remember_hireAgencyForm1">
              <h4>Points to Remember</h4>
            </div>
            <div className="cardsDetail_hireAgencyForm1">
              <div className="cards_hireAgencyForm1">
                <div>
                  <p>1. Keep the project name simple and to your brand.</p>
                </div>
                <div className="black-bubble-1"></div>
              </div>
              <div className="cards_hireAgencyForm1">
                <p>2. Write about your service or idea in clear manner, with as many details as possible.</p>
                <div className="black-bubble-2"></div>
              </div>
              <div className="cards_hireAgencyForm1">
                <div className="black-bubble-3"></div>
                <p>
                  3. In case, you think you missed any details you can always edit
                  this later.
                </p>
              </div>
            </div>
          </div>

          <div className="mainHireAgencyForm1">
            <div className="color-div_hireAgencyForm"></div>
            <div className="innerHigherAgencyForm1">
              <div className="stepCheck">
                <div className="color-div_hireAgencyForm1">
                </div>
                <p><span className="ste">Ste</span>p 1</p>
              </div>
              <div className="higherAgencyFormArea">
                <div className="understand_your_project">Help us understand more about your project..!!</div>
                <div className="input-form_hireAgencyForm1">
                  <div className="projectNameAgency">
                    <ul>
                      <li>
                        <p>What will be the name of your project?</p>
                      </li>
                    </ul>
                    <input
                      type="text"
                      name="projectName"
                      onChange={handleChange}
                      placeholder="Give A Name To Identify Requirement"
                      value={data.projectName}
                    />
                    {error.projectNameError && (
                      <p
                        style={{
                          color: "red",
                          fontWeight: "normal",
                          fontSize: "14px",
                        }}
                      >
                        {error.projectNameError}
                      </p>
                    )}
                  </div>
                  <div className="descriptionProjectAgency">
                    <ul>
                      <li>
                        <p>Describe a little bit about your project?</p>
                      </li>
                    </ul>
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
                      <p
                        style={{
                          color: "red",
                          fontWeight: "normal",
                          fontSize: "14px",
                        }}
                      >
                        {error.projectDescriptionError}
                      </p>
                    )}
                  </div>
                  <div className="budgetSectionAreaAgency">
                    <ul>
                      <li>
                        <p>What's your budget for this project?</p>
                      </li>
                    </ul>
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
                          label="$15,000-$25,000"
                        />
                        <FormControlLabel
                          value="20000"
                          control={<BlueRadio />}
                          label="$25,000-$4,000"
                        />
                        <FormControlLabel
                          value="50000"
                          control={<BlueRadio />}
                          label="More Than $4000 Per Month"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="numberOfDays">
                    <ul>
                      <li>
                        <p>How soon do you want to start?</p>
                      </li>
                    </ul>
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
                </div>
                <div className="nextbuttton">
                  {/* <span></span> */}
                  <div onClick={() => handleSubmit()}>
                    Submit
                    {/* <i class="fa fa-long-arrow-right" aria-hidden="true"></i> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="steps_hireAgencyForm">
              <div>
                <div >
                  <p>Step 1</p>
                </div>
                <div className='color_hireAgencyForm green'></div>
              </div>

              <div className="black-strip_hireAgencyForm1 strip1"></div>

              <div className="diabled-step_hireAgencyForm">
                <div>
                  <p className="grey-step_hireAgencyForm">Step 2</p>
                </div>
                <div className='color_hireAgencyForm grey'></div>
              </div>

              <div className="black-strip_hireAgencyForm1 strip2"></div>

              <div>
                <div>
                  <p className="grey-step_hireAgencyForm">Step 3</p>
                </div>
                <div className='color_hireAgencyForm grey'></div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default HireAgencyForm1;
