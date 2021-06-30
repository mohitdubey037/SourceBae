/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ClientNavbar from "../../ClientNavbar";
import MultiSelect from "react-multi-select-component";
import { useParams } from 'react-router'

import * as helper from "../../../../shared/helper"
//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
  projectId = helper.cleanParam(projectId)
  console.log(projectId);
  // selecting Domains
  const id = localStorage.getItem("userId");

  const [apiData, setApiData] = useState({
    stepsCompleted: 2,
    clientId: id,
    id: projectId,
    projectDomainId: "",
    projectExpertiseRequired: [],
    agencyExperience: ""
  });

  const [allDomainsData, setAllDomainsData] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target
    setApiData({
      ...apiData,
      [name]: value
    })
  };

  const handleDomains = (event) => {
    const { className } = event.target;
    const toggledDomains = allDomainsData.map((domain) => {
      if (domain.domainName === className) {
        setSelectedDomain(domain);
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
    instance.get(`api/${Role}/domains/all`)
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
      .catch(err => {
        setLoading(false)
        console.log(err?.response?.data?.message)
        setErr(err?.response?.data?.message)
      })
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

  // const hireAgencyStep2 = () => {
  //   setLoading(true)
  //   instance.post(`/api/${Role}/projects/create`,apiData)
  //   .then(function(response){
  //       console.log(response);
  //       setButtonStatus("Next");
  //       setLoading(false)
  //   })
  //   .catch(err => {
  //     setLoading(false)
  //   })
  // };

  // const handleButton = () => {
  //   if (buttonStatus === "Submit") {
  //     hireAgencyStep2();
  //   }
  //   else if(buttonStatus === "Next" && projectId) {
  //     window.location.href=`/hire-agency-form-three:${projectId}`
  //   }
  // };

  const handleSubmit = () => {
    setLoading(true)
    instance.post(`/api/${Role}/projects/create`, apiData)
      .then(function (response) {
        console.log(response);
        // setButtonStatus("Next");
        setLoading(false);
        props.history.push(`/hire-agency-form-three:${projectId}`)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getExpertiseOption();
    selectedDomain?._id && setApiData({
      ...apiData,
      projectDomainId: selectedDomain._id
    })
  }, [selectedDomain]);

  useEffect(() => {
    console.log(apiData);
  })


  useEffect(() => {
    setApiData({
      ...apiData,
      projectExpertiseRequired: selected.map((service) => { return service.value })
    })
  }, [selected])

  useEffect(() => {
    getAllDomains();
  }, []);
  return (
    <>
      <ClientNavbar />
      <div
        className="backArrow_hireAgencyForm2"
        onClick={() => {
          props.history.goBack();
        }}
      >
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      {loading ? <Spinner /> :
        <div className="mainHireAgencyFormTwo">
          <div className="innerHireAgencyFormTwo">
            <div className="techStackFields">
              <div className="stepCheck">
                <p>Step 2</p>
              </div>

              <div className="serivcesHireAgency">
                <p className="servicesAgencyHeading">
                  1. In which services you have good command?
                </p>

                <div className="servicesCardsHireAgency">
                  {allDomainsData.map((domain) => {
                    return (
                      <div
                        className={`${domain.domainName}`}
                        onClick={(event) => handleDomains(event)}
                        style={{
                          backgroundColor: domain.selected
                            ? "#02044a"
                            : "#D6EAF8",
                        }}
                      >
                        <img
                          className={`${domain.domainName}`}
                          src={domain.domainIcon}
                          alt=""
                        />
                        <p
                          className={`${domain.domainName}`}
                          style={{ color: domain.selected ? "#fff" : "#000" }}
                        >{`${domain.domainName}`}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="monthlyBudget">
                <p>
                  2. How experience should the agency be in the domain of the
                  project?
                </p>

                <div className="domainBudgetOptions">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="agencyExperience"
                      name="agencyExperience"
                      value={apiData.agencyExperience}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        color="primary"
                        value="capable"
                        control={<BlueRadio className={classes.root} />}
                        label="Capable"
                      />
                      <FormControlLabel
                        value="skilled"
                        control={<BlueRadio />}
                        label="Skilled"
                      />
                      <FormControlLabel
                        value="proficient"
                        control={<BlueRadio />}
                        label="Proficient"
                      />
                      <FormControlLabel
                        value="accomplished"
                        control={<BlueRadio />}
                        label="Accomplished"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div className="nextbuttton">
                <div
                  onClick={() => (props.history.push("/hire-agency-form-one"))}
                >
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                </div>
                <div
                  /*style={{backgroundColor:colors[buttonStatus]}}*/
                  onClick={() =>
                    handleSubmit()
                  }
                >
                  Submit <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="serviceFieldsOptions">
              <div className="servicesHireAgencyContainer">
                <div className="serviceSelectionInput">

                  {selectedDomain && options ? (
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
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default HireAgencyForm2;
