import React, { useState, useEffect } from "react";
// import ClientNavbar from "../../ClientNavbar";
import "./HireDeveloper.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

import UpperBackground from '../../../../assets/images/HireDeveloper/Vector.svg';
import LowerBackground from '../../../../assets/images/HireDeveloper/lowerBackground.svg';

import month from "../../../../assets/images/ClientDashboard/shortTerm/calender.png";
import hourPrice from "../../../../assets/images/ClientDashboard/shortTerm/hourPrice.png";
import MultiSelect from "react-multi-select-component";
import instance from "../../../../Constants/axiosConstants";
import Back from '../../../../Components/Back/Back';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';

const BlueRadio = withStyles({
  root: {
    color: "#3A3A3A",
    "&$checked": {
      color: "#26AFFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function HireDeveloper(props) {
  const [apiData, setApiData] = useState({
    developerRolesRequired: [],
    numberOfResourcesRequired: "",
    developerTechnologiesRequired: [],
    developerExperienceRequired: "",
    preferredBillingMode: "Weekly",
    averageBudget: "",
    expectedStartDate: "",
    contractPeriod: "1 Month",
    clientId: localStorage.getItem("userId")
  });
  const [billing, setBilling] = useState(1);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };
  const options = [
    {
      label: "Frontend",
      value: "Frontend",
    },
    {
      label: "Backend",
      value: "Backend",
    },
    {
      label: "Full stack Developer",
      value: "Full stack Developer",
    },
    {
      label: "Mobile Developer",
      value: "Mobile Developer",
    },
    {
      label: "Game Developer",
      value: "Game Developer",
    },
    {
      label: "Data Scientist Developer",
      value: "Data Scientist Developer",
    },
    {
      label: "DevOps Developer",
      value: "DevOps Developer",
    },
    {
      label: "Software Developer",
      value: "Software Developer",
    },
    {
      label: "Web Developer",
      value: "Web Developer",
    },
    {
      label: "Security Developer",
      value: "Security Developer",
    },
  ];
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const changeBilling = (id) => {
    if (id !== billing) setBilling(id);
    if (id === 1)
      setApiData({
        ...apiData,
        preferredBillingMode: "Weekly",
      });
    else if (id === 2)
      setApiData({
        ...apiData,
        preferredBillingMode: "Monthly",
      });
  };

  const getAllTechnologies = () => {
    instance.get(`/api/client/technologies/all`).then(function (response) {
      const techs = response.map((tech) => {
        return {
          label: tech.technologyName,
          value: tech._id,
        };
      });
      setAllTechnologies(techs);
    });
  };

  const handleSubmit = () => {
    const body = {
      ...apiData,
      developerRolesRequired: selectedRoles.map((role) => role.value),
      developerTechnologiesRequired: selectedTechnologies.map(
        (tech) => tech.value
      ),
    };
    instance
      .post(`api/client/hire-developers/create`, body)
      .then(function (response) {
        props.history.push({
          pathname: `/get-client-hire-developer`,
          condition: `Client`,
        });
      });
  };
  useEffect(() => {
    getAllTechnologies();
  }, []);

  return (
    <>
      <div className="Navbar-parent">
        <Navbar />
      </div>
      <div className="back-parent marginLeft">
        <Back name="Hire Developer" />
      </div>
      <div className="mainHireDeveloper">
        {/* <div
          className="backArrow"
          onClick={() => {
            props.history.push("/client-dashboard");
          }}
        >
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div> */}
        {/* <div className="innerHireDeveloper"> */}
        {/* <div className="upper-background"> */}
        {/* </div> */}
        {/* <div className="lower-background"> */}
        {/* </div> */}
        {/* <img className="upper-image" src={UpperBackground} alt="upper-background" />
        <img className="lower-image" src={LowerBackground} alt="upper-background" /> */}
        <div className="hireDeveloperForm">
          <div className="hireDeveloperFormInfo">
            <div className="predilection-strip"></div>
            <h2>predilection</h2>
            <p>
              Financed new companies and Enterprises are battling to recruit
              quality engineers quicker. Even in the wake of offering higher
              remuneration, advantages and investment opportunities, the
              ability pool stays restricted.
              26,714 natural solicitations including K***book, Dunzo,
              Lenskart, IndiaGold, medcords, Shopkirana, Infobeans, pepsico,
              homelane, Razorpay, Townscript, Bewakoof, SAP, Samsung
            </p>
          </div>

          <div className="resourceNumber">
            <ul>
              <li>
                Requirement Name
              </li>
            </ul>
            <input
              type="text"
              name="requirementName"
              value={apiData.requirementName}
              placeholder="Give a name to identify requirement"
              onChange={handleChange}
            />
          </div>

          <div className="resourceNumber">
            <ul>
              <li>
                What roles are you looking for?
              </li>
            </ul>
            <MultiSelect
              options={options}
              value={selectedRoles}
              onChange={setSelectedRoles}
              labelledBy="Select"
            />
          </div>

          <div className="resourceNumber">
            <ul>
              <li>
                Number of Resources
              </li>
            </ul>
            <input
              type="number"
              min="1"
              name="numberOfResourcesRequired"
              value={apiData.numberOfResourcesRequired}
              placeholder="E.g- 1 or 2"
              onChange={handleChange}
            />
          </div>
          <div className="resourceNumber">
            <ul>
              <li>
                Skills Required
              </li>
            </ul>
            {allTechnologies.length > 0 ? (
              <MultiSelect
                options={allTechnologies}
                value={selectedTechnologies}
                onChange={setSelectedTechnologies}
                labelledBy="Select"
              />
            ) : (
              "Sorry no Technologies to select"
            )}
          </div>
          <div className="developerExperienceRequired">
            <ul>
              <li>
                Average Experience
              </li>
            </ul>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="experience"
                name="developerExperienceRequired"
                value={apiData.experience}
                onChange={handleChange}
              >
                <div className="Junior">
                  <div>
                    <FormControlLabel
                      value="Junior (1-3years)"
                      control={<BlueRadio />}
                    />
                  </div>
                  <div className="radio-description">
                    Junior (1 - 3 Years)
                  </div>
                </div>

                <div className="strip_HireDeveloper left_HireDeveloper">

                </div>

                <div className="Mid-Range">
                  <div>
                    <FormControlLabel
                      value="Mid Range (3-6 years)"
                      control={<BlueRadio />}
                    />
                  </div>
                  <div className="radio-description">
                    Mid Range ( 3 - 6  Years)
                  </div>
                </div>

                <div className="strip_HireDeveloper right_HireDeveloper">

                </div>

                <div className="Senior">
                  <div>
                    <FormControlLabel
                      value="Senior (6-9 years)"
                      control={<BlueRadio />}
                    />
                  </div>
                  <div className="radio-description">
                    Senior ( 6 - 9 Years)
                  </div>
                </div>

              </RadioGroup>
            </FormControl>
          </div>

          <div className="preferredBillingMode">
            <ul>
              <li>
                Preffered Billing
              </li>
            </ul>

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="billing"
                name="billing"
                value={apiData.experience}
                onChange={handleChange}
              >
                <div className="Weekly">
                  <div>
                    <FormControlLabel
                      value="Weekly"
                      control={<BlueRadio />}
                    />
                  </div>
                  <div className="radio-description">
                    Weekly
                  </div>
                </div>

                <div className="billing_strip_HireDeveloper">

                </div>

                <div className="Monthly">
                  <div>
                    <FormControlLabel
                      value="Monthly"
                      control={<BlueRadio />}
                    />
                  </div>
                  <div className="radio-description">
                    Monthly
                  </div>
                </div>
              </RadioGroup>
            </FormControl>

            {/* <div className="billingOptions">
                <div className="billingButton" onClick={() => changeBilling(1)}>
                  {billing === 1 ? (
                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                  ) : null}
                  <img src={hourPrice} alt="" />
                  <h6>Weekly</h6>
                </div>
                <div className="billingButton" onClick={() => changeBilling(2)}>
                  {billing === 2 ? (
                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                  ) : null}
                  <img src={month} alt="hourPrice" />
                  <h6>Monthly</h6>
                </div>
              </div> */}
          </div>

          <div className="averageBudget">
            <ul>
              <li>
                Average Budget
              </li>
            </ul>
            {billing === 1 ? (
              <FormControl component="fieldset">
                <div className="left-margin">
                  <RadioGroup
                    aria-label="averageBudget"
                    name="averageBudget"
                    value={apiData.averageBudget}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="less than $1500"
                      control={<BlueRadio />}
                      label="less than $1500"
                    />
                    <FormControlLabel
                      value="$1500-$2500"
                      control={<BlueRadio />}
                      label="$1500-$2500 Per Month"
                    />
                    <FormControlLabel
                      value="$2500-$4000"
                      control={<BlueRadio />}
                      label="$2500-$4000 Per Month"
                    />
                    <FormControlLabel
                      value="More than $4000"
                      control={<BlueRadio />}
                      label="More than $4000 Per Month"
                    />
                  </RadioGroup>
                </div>
              </FormControl>
            ) : (
              <FormControl component="fieldset">
                <div className="left-margin">
                  <RadioGroup
                    aria-label="hourlyBudget"
                    name="averageBudget"
                    value={apiData.averageBudget}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="less than $20"
                      control={<BlueRadio />}
                      label="less than $20"
                    />
                    <FormControlLabel
                      value="$20-$40"
                      control={<BlueRadio />}
                      label="$20-$40"
                    />
                    <FormControlLabel
                      value="$40-$60"
                      control={<BlueRadio />}
                      label="$40-$60"
                    />
                    <FormControlLabel
                      value="Above $60"
                      control={<BlueRadio />}
                      label="Above $60"
                    />
                  </RadioGroup>
                </div>
              </FormControl>
            )}
          </div>

          <div className="startPeriod">
            <ul>
              <li>
                Start Date
              </li>
            </ul>
            <FormControl component="fieldset">
              <div className="left-margin">
                <RadioGroup
                  aria-label="startDate"
                  name="expectedStartDate"
                  value={apiData.expectedStartDate}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Immediately"
                    control={<BlueRadio />}
                    label="Immediately"
                  />
                  <FormControlLabel
                    value="in 1 to 2 weeks"
                    control={<BlueRadio />}
                    label="in 1 to 2 weeks"
                  />
                  <FormControlLabel
                    value="more than 2 weeks"
                    control={<BlueRadio />}
                    label="more than 2 weeks"
                  />
                  <FormControlLabel
                    value="negotiable"
                    control={<BlueRadio />}
                    label="negotiable"
                  />
                </RadioGroup>
              </div>
            </FormControl>
          </div>

          <div className="contractPeriod">
            <ul>
              <li>
                Contract Periods
              </li>
            </ul>
            <select
              name="contractPeriod"
              id="contractPeriod"
              onChange={handleChange}
            >
              <option value="1 Month">1 Month</option>
              <option value="2 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
          </div>

          <div className="submitBtn">
            <div>
              <div onClick={handleSubmit}>
                Submit
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default HireDeveloper;
