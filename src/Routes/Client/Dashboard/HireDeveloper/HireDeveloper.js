import React, { useState, useEffect } from "react";
import ClientNavbar from "../../ClientNavbar";
import "./HireDeveloper.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

import month from "../../../../assets/images/ClientDashboard/shortTerm/calender.png";
import hourPrice from "../../../../assets/images/ClientDashboard/shortTerm/hourPrice.png";
import MultiSelect from "react-multi-select-component";
import instance from "../../../../Constants/axiosConstants";

const BlueRadio = withStyles({
  root: {
    color: "#26AFFF",
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
    clientId:localStorage.getItem("userId")
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
      <ClientNavbar />
      <div className="mainHireDeveloper">
        <div
          className="backArrow"
          onClick={() => {
            props.history.push("/client-dashboard");
          }}
        >
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div className="innerHireDeveloper">
          <div className="hireDeveloperForm">
            <div className="hireDeveloperFormInfo">
              <h2>predilection</h2>
              <p>
                Financed new companies and Enterprises are battling to recruit
                quality engineers quicker. Even in the wake of offering higher
                remuneration, advantages and investment opportunities, the
                ability pool stays restricted.{" "}
              </p>
              <p>
                26,714 natural solicitations including K***book, Dunzo,
                Lenskart, IndiaGold, medcords, Shopkirana, Infobeans, pepsico,
                homelane, Razorpay, Townscript, Bewakoof, SAP, Samsung
              </p>
            </div>

            <div className="resourceNumber">
              <p>1. Requirement Name</p>
              <input
                type="text"
                name="requirementName"
                value={apiData.requirementName}
                placeholder="Give a name to identify requirement"
                onChange={handleChange}
              />
            </div>

            <div className="resourceNumber">
              <p>2. What roles are you looking for?</p>
              <MultiSelect
                options={options}
                value={selectedRoles}
                onChange={setSelectedRoles}
                labelledBy="Select"
              />
            </div>

            <div className="resourceNumber">
              <p>3. Number of Resources</p>
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
              <p>4. Skills Required</p>
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
              <p>5. Average Experience</p>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="experience"
                  name="developerExperienceRequired"
                  value={apiData.experience}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Junior (1-3years)"
                    control={<BlueRadio />}
                    label="Junior (1-3years)"
                  />
                  <FormControlLabel
                    value="Mid Range (3-6 years)"
                    control={<BlueRadio />}
                    label="Mid Range (3-6 years)"
                  />
                  <FormControlLabel
                    value="Senior (6-9 years)"
                    control={<BlueRadio />}
                    label="Senior (6-9 years)"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="preferredBillingMode">
              <p>6. Preffered Billing</p>
              <div className="billingOptions">
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
              </div>
            </div>

            <div className="averageBudget">
              <p>7. Average Budget</p>
              {billing === 1 ? (
                <FormControl component="fieldset">
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
                      label="$1500-$2500"
                    />
                    <FormControlLabel
                      value="$2500-$4000"
                      control={<BlueRadio />}
                      label="$2500-$4000"
                    />
                    <FormControlLabel
                      value="More than $4000"
                      control={<BlueRadio />}
                      label="More than $4000"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <FormControl component="fieldset">
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
                </FormControl>
              )}
            </div>

            <div className="startPeriod">
              <p>8. Start Date</p>
              <FormControl component="fieldset">
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
              </FormControl>
            </div>

            <div className="contractPeriod">
              <p>9. Contract Periods</p>
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
              <div></div>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HireDeveloper;
