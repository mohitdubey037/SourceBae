import React, { useState, useEffect } from "react";
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
import illustration from '../../../../assets/images/Newestdashboard/Hire-Agency-Form/illustration.svg';
import UpImage from '../../../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import './HireAgencyForm1.css';

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
      if (value.length > 100)
        setWords(100);
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
          props.history.replace(`/hire-agency-form-two:${response._id}`)
        })
        .catch(err => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      <Navbar />
      {loading ? <Spinner /> :
        <>
          <div className="main_HireAgencyParent">
            <img className="Image1_hireAgency" src={UpImage} alt="upImage" />
            <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
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
                    <p>2. Write about your service or idea in clear manner, with as many details as possible.</p>
                  </div>
                </div>
                <div className="cards_hireAgencyForm1">
                  <div className="in_case_you_think">
                    <p>3. In case, you think you missed any details you can always edit this later.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="steps_hireAgencyForm">
              <div style={{ width: "27%" }}>
                <div >
                  <p>Step 1</p>
                </div>
                <div className='color_hireAgencyForm green'></div>
              </div>

              <div className="diabled-step_hireAgencyForm" style={{ width: "27%" }}>
                <div>
                  <p className="grey-step_hireAgencyForm">Step 2</p>
                </div>
                <div className='color_hireAgencyForm grey'></div>
              </div>

              <div style={{ width: "27%" }}>
                <div>
                  <p className="grey-step_hireAgencyForm">Step 3</p>
                </div>
                <div className='color_hireAgencyForm grey'></div>
              </div>
            </div>

            <div className="mainHireAgencyForm1">
              <div className="innerHigherAgencyForm1">
                <div className="higherAgencyFormArea">
                  <div className="understand_your_project">Help us understand more about your project..!!</div>
                  <div className="input-form_hireAgencyForm1">
                    <div className="projectNameAgency">
                      <p>1.&nbsp;What will be the name of your project?</p>
                      <input
                        type="text"
                        name="projectName"
                        onChange={handleChange}
                        placeholder="Give A Name To Identify Requirement"
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
                      <p>2.&nbsp;Describe a little bit about your project?</p>
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
                    <div className="budgetSectionAreaAgency">
                      <p>3.&nbsp;What's your budget for this project?</p>
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
                      <p>4.&nbsp;How soon do you want to start?</p>
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
                  <div className="nextbutton nextbutton_hireAgencyForm1">
                    <div className="backbutton_hireAgencyForm2" onClick={() => props.history.push(`/clientNewestDashboard`)} style={{ backgroundColor: "#707070" }}>
                      Back
                    </div>
                    <div onClick={() => handleSubmit()}>
                      Submit
                    </div>
                  </div>
                </div>
                <div className="illustration_hireAgencyForm1">
                  <img src={illustration} alt="agency" />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default HireAgencyForm1;
