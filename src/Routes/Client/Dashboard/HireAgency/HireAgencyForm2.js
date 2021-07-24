/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import ClientNavbar from "../../ClientNavbar";
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar'
import MultiSelect from "react-multi-select-component";
import { useParams } from "react-router";

import * as helper from "../../../../shared/helper";
//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Back from '../../../../Components/Back/Back';

import instance from "../../../../Constants/axiosConstants";
import Spinner from "../../../../Components/Spinner/Spinner";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

const BlueRadio = withStyles({
  root: {
    color: "#26AFFF",
    "&$checked": {
      color: "#26AFFF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function HireAgencyForm2(props) {
  const Role = "client";
  let { projectId } = useParams();
  projectId = helper.cleanParam(projectId);
  console.log(projectId);
  // selecting Domains
  const id = localStorage.getItem("userId");

  const [apiData, setApiData] = useState({
    stepsCompleted: 2,
    clientId: id,
    id: projectId,
    projectDomainId: "",
    projectExpertiseRequired: [],
    agencyExperience: "capable",
  });

  const [allDomainsData, setAllDomainsData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    projectDomainIdError: "",
    projectExpertiseRequiredError: [],
    agencyExperienceError: "",
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const handleDomains = (event) => {
    const { className } = event.target;
    const toggledDomains = allDomainsData.map((domain) => {
      if (domain.domainName === className) {

        if (!domain.selected)
          setApiData({
            ...apiData,
            projectDomainId: domain._id
          })
        else
          setApiData({
            ...apiData,
            projectDomainId: ""
          })
        if (!domain.selected)
          setSelectedDomain(domain);
        else
          setApiData({
            ...apiData,
            projectDomainId: ""
          })

        return {
          ...domain,
          selected: !domain.selected,
        };
      } else {
        return {
          ...domain,
          selected: false,
        };
      }
    });
    setAllDomainsData(toggledDomains);
  };

  //Api Calls methods

  const getAllDomains = () => {
    instance
      .get(`api/${Role}/domains/all`)
      .then(function (response) {
        console.log(response);
        const domainNames = response.map((domain) => {
          return {
            ...domain,
            selected: false,
          };
        });
        setAllDomainsData(domainNames);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getExpertiseOption = () => {
    const options = selectedDomain?.expertise?.map((expertise) => {
      return {
        label: expertise.expertiseName,
        value: expertise._id,
      };
    });
    setOptions(options);
  };

  const handleSubmit = () => {

    let tempError = {
      projectDomainIdError: "",
      projectExpertiseRequiredError: [],
      agencyExperienceError: "",
    }

    if (apiData.projectDomainId === "" || apiData.projectDomainId === null)
      setError({
        ...tempError,
        projectDomainIdError: "Please Select a Domain."
      })
    else if (apiData.projectExpertiseRequired.length === 0)
      setError({
        ...tempError,
        projectExpertiseRequiredError: "Please Select a Service."
      })
    else {
      setLoading(true);
      instance
        .post(`/api/${Role}/projects/create`, apiData)
        .then(function (response) {
          console.log(response);
          setLoading(false);
          props.history.push(`/hire-agency-form-three:${projectId}`);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getExpertiseOption();
    selectedDomain?._id &&
      setApiData({
        ...apiData,
        projectDomainId: selectedDomain._id,
      });
  }, [selectedDomain]);

  useEffect(() => {
    console.log(apiData);
  });

  useEffect(() => {
    setApiData({
      ...apiData,
      projectExpertiseRequired: selected.map((service) => {
        return service.value;
      }),
    });
  }, [selected]);

  useEffect(() => {
    getAllDomains();
  }, []);
  return (
    <>
      <div className="Navbar-parent">
        <Navbar />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="mainHireAgencyFormTwo">
          <div className="innerHireAgencyFormTwo">
            <div className="techStackFields">
              <div className="stepCheck">
                <div className="step-1_hireAgencyForm1">
                  <div className="color-div_hireAgencyForm1">
                  </div>
                  <p>Step 2</p>
                </div>
              </div>
              <div className="serivcesHireAgency">
                <ul>
                  <li>
                    <p className="servicesAgencyHeading">
                      In which Domain you have good command?
                    </p>
                  </li>
                </ul>
                <div className="servicesCardsHireAgency">
                  {allDomainsData.map((domain) => {
                    return (
                      <div className="tech-container">
                        <div className={`${domain.domainName}`}
                          onClick={(event) => handleDomains(event)}
                          style={{ backgroundColor: domain.selected ? "#68E1FD" : "#white" }}>
                          <img className={`${domain.domainName}`} src={domain.domainIcon} alt="" />
                        </div>
                        <p
                          className={`${domain.domainName}`}
                          style={{ color: domain.selected ? "#fff" : "#000" }}
                        >{`${domain.domainName}`}</p>
                      </div>
                    );
                  })}
                  {error.projectDomainIdError && (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "normal",
                        fontSize: "14px",
                      }}
                    >
                      {error.projectDomainIdError}
                    </p>
                  )}
                </div>
              </div>

              <div className="monthlyBudget">
                <ul>
                  <li>
                    <p>
                      How experience should the agency be in the domain of the
                      project?
                    </p>
                  </li>
                </ul>

                <div className="domainBudgetOptions">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="agencyExperience"
                      name="agencyExperience"
                      value={apiData.agencyExperience}
                      onChange={handleChange}
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
                </div>
              </div>

              <div className="nextbutton">
                <div onClick={() => props.history.push("/hire-agency-form-one")}>
                  {/* <i class="fa fa-long-arrow-left" aria-hidden="true"></i> */}
                  Back
                </div>
                <div onClick={() => handleSubmit()}>
                  Next
                  {/* <i class="fa fa-long-arrow-right" aria-hidden="true"></i> */}
                </div>
              </div>
            </div>
            {selectedDomain && options ? (
              <div className="serviceFieldsOptions">
                <div className="servicesHireAgencyContainer">
                  <div className="serviceSelectionInput">
                    <>
                      <p className="uiuxtext">
                        Select {selectedDomain.domainName} services
                      </p>
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </>
                  </div>
                  {error.projectExpertiseRequiredError && (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "normal",
                        fontSize: "14px",
                      }}
                    >
                      {error.projectExpertiseRequiredError}
                    </p>)}
                </div>

              </div>
            ) : (
              "Please Select a Service."
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default HireAgencyForm2;
