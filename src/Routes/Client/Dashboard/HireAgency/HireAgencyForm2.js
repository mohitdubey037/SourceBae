/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar'
import MultiSelect from "react-multi-select-component";
import { useParams } from "react-router";

import * as helper from "../../../../shared/helper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import UpImage from '../../../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

import instance from "../../../../Constants/axiosConstants";
import Spinner from "../../../../Components/Spinner/Spinner";
import './HireAgencyForm2.css';

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
  const Role = localStorage.getItem('role');
  let { projectId } = useParams();
  projectId = helper.cleanParam(projectId);
  console.log(projectId);
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


  // useEffect(() => {
  //   if (props.location.state) {
  //     setApiData({
  //       stepsCompleted: 2,
  //       // clientId: props.location.state.apiData.id,
  //       // id:props.location.state.apiData.projectId,
  //       projectDomainId: "",
  //       // projectExpertiseRequired: props.location.state.apiData.projectExpertiseRequired,
  //       agencyExperience: "capable",
  //     });
  //   }
  // }, []);


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
console.log(props,"hsfnhire2222")
  const getAllDomains = () => {
    instance
      .get(`api/${Role}/domains/all`,apiData)
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
        .post(`/api/${Role}/projects/create`,apiData)
        .then(function (response) {
          console.log(response);
          setLoading(false);
          props.history.replace(`/hire-agency-form-three:${projectId}`,apiData);
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
      <Navbar />

      {loading ? (
        <Spinner />
      ) : (
        <div className="mainHireAgencyFormTwo">
          <img className="Image1_hireAgency" src={UpImage} alt="upImage" />
          <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
          <div className="steps_hireAgencyForm2">
            <div className="step3_disabled" style={{ width: "30%" }}>
              <div >
                <p>Step 1</p>
              </div>
              <div className='color_hireAgencyForm2 green'></div>
            </div>

            <div className="diabled-step_hireAgencyForm" style={{ width: "30%" }}>
              <div>
                <p className="grey-step_hireAgencyForm">Step 2</p>
              </div>
              <div className='color_hireAgencyForm2 green'></div>
            </div>

            <div className="step3_disabled" style={{ width: "30%" }}>
              <div>
                <p className="grey-step_hireAgencyForm">Step 3</p>
              </div>
              <div className='color_hireAgencyForm2 grey'></div>
            </div>
          </div>
          <div className="servicesHirecover">
            {selectedDomain && options &&
              (
                <>
                  <div className="serviceFieldsOptions">
                    <div className="servicesHireAgencyContainer hireAgencyForm2">
                      <div className="serviceSelectionInput">
                        <>
                          <p className="uiuxtext">
                            Select {selectedDomain.domainName} services    <span style={{fontSize:"12px"}} className="requiredStar">*</span>
                          </p>
                          <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                            className="margin-left"
                          />
                        </>
                      </div>
                    </div>
                  </div>
                  {error.projectExpertiseRequiredError && (
                    <p className="error_hireAgencyForm2 error-select_hireAgencyForm2">
                      {error.projectExpertiseRequiredError}
                    </p>)}
                </>
              )
            }
          </div>
          <div className="innerHireAgencyFormTwo">
            <div className="techStackFields">
              <div className="serivcesHireAgency">
                <ul>
                  <li>
                    <p className="servicesAgencyHeading">
                      In which Domain you have good command?    <span className="requiredStar">*</span>
                    </p>
                  </li>
                </ul>
                <div className="servicesCardsHireAgency">
                  {allDomainsData.map((domain) => {
                    return (
                      <div className="tech-container">
                        <div className={`${domain.domainName}`} onClick={(event) => handleDomains(event)}
                          style={{ filter: domain.selected ? " invert(90%) sepia(21%) saturate(287%) hue-rotate(150deg) brightness(98%) contrast(98%)" : "none" }}>
                          <img className={`${domain.domainName}`} src={domain.domainIcon} alt="image" />
                        </div>
                        <p className={`${domain.domainName}`} style={{ color: "#707070", fontFamily: "Segoe UI", fontSize: "12px" }}>
                          {`${domain.domainName}`}</p>
                      </div>
                    );
                  })}
                </div>
                {error.projectDomainIdError && (
                  <p className="error_hireAgencyForm2">
                    {error.projectDomainIdError}
                  </p>
                )}
              </div>

              <div className="monthlyBudget">
                <ul>
                  <li>
                    <p>
                      How experience should the agency be in the domain of the
                      project?     <span className="requiredStar">*</span>
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
                <div className="backbutton_hireAgencyForm2" onClick={() => props.history.push(`/hire-agency-form-one`,{data:apiData})} style={{ backgroundColor: "#707070" }}>
                  Back
                </div>
                <div onClick={() => handleSubmit()}>
                  Next
                </div>
              </div>
            </div>
            {/* {selectedDomain && options &&
                (
                  <div className="serviceFieldsOptions">
                    <div className="servicesHirecover">
                 </div>
                    <div className="servicesHireAgencyContainer hireAgencyForm2">
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
                            className="margin-left"
                          />
                        </>
                      </div>
                      {error.projectExpertiseRequiredError && (
                        <p className="error_hireAgencyForm2 error-select_hireAgencyForm2">
                          {error.projectExpertiseRequiredError}
                        </p>)}
                    </div>
                  </div>
                )
              } */}
          </div>
        </div>
      )}
    </>
  );
}

export default HireAgencyForm2;
