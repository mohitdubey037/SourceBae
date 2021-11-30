/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import FormPhases from "./FormPhases";
import Back from '../../../../Components/Back/Back';

//axios instance
import instance from "../../../../Constants/axiosConstants";

//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

//multi-select
import MultiSearchSelect from "react-search-multi-select";
import Spinner from "../../../../Components/Spinner/Spinner";
import { toast } from "react-toastify";
import useIsFirstRender from "../../../../Utils/useIsFirstRender";
import { useIsFocusVisible } from "@material-ui/core";

import MultiSelect from "react-multi-select-component";

import './ResponsiveAgencyForm.css';

function AgencyForm2(props) {

  const isFirstRender = useIsFocusVisible();
  const Role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState('');

  const propData = props.location.state ? props.location.state : {}

  const url = props.history.location.pathname;

  // selecting Domains
  const [allDomainsData, setAllDomainsData] = useState([]);

  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedServices, setSelectedServices] = useState(null);

  //selecting services
  const [allServicesData, setAllServicesData] = useState([]);
  const [selectedServicesId, setSelectedServicesId] = useState([]);
  const [selectedTechName, setSelectedTechNames] = useState([]);

  //selecting Techs
  const [allTechData, setAllTechData] = useState([]);
  const [visibleTechData, setVisibleTechData] = useState(null);
  const [visibleTechNames, setVisibleTechNames] = useState([]);
  const [toggle, setToggle] = useState(null);

  const [selectedDomainHL, setSelectedDomainHL] = useState('');
  const [dom, setDom] = useState([]);

  //API DATA STATE VARIABLES
  const [apiData, setApiData] = useState({
    stepsCompleted: 3,
    agencyDomains: [],
    agencyServices: [],
    agencyTechnologies: [],
    agencyMonthlyBudget: propData?.agencyForm2?.agencyMonthlyBudget ? propData?.agencyForm2?.agencyMonthlyBudget : "",
  });

  const getStepsCompleted = () => {
    instance.get(`api/${Role}/agencies/steps-completed`)
      .then(function (response) {
        setSteps(response.stepsCompleted);
      });
  };

  useEffect(() => {
    getStepsCompleted();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "budget")
      setApiData({
        ...apiData,
        agencyMonthlyBudget: value,
      });
  };

  const handleTechSelect = (arr) => {
    // setSelectedTechNames(arr);
    setSelectedTechNames(arr.value);
  };

  const goBack = () => {
    if (url.includes('agency-form-one')) {
      props.history.replace('/agencyNewestDashboard');
    }
    else if (url.includes('agency-form-two')) {
      props.history.replace('/agency-form-one', propData);
    }
    else if (url.includes('agency-form-three')) {
      props.history.replace('/agency-form-two');
    }
    else if (url.includes('agency-form-four')) {
      props.history.replace('/agency-form-three');
    }
    else {
      props.history.goBack();
    }
  }

  const setAgencyTechnologies = () => {
    const selectedTechs = selectedTechName.map((tech) => {
      return visibleTechData[tech.value]._id;
    });
    setApiData({
      ...apiData,
      agencyTechnologies: selectedTechs,
    });
    setToggle(!toggle);
  };

  const setAgencyDomains = async () => {
    const selects = await allDomainsData.filter(
      (domain) => domain.selected === true
    );
    setDom(selects);
  };

  //Api Calls methods

  const getAllDomains = () => {
    instance.get(`api/${Role}/domains/all`).then(function (response) {
      const domainNames = response.map((domain) => {
        return {
          ...domain,
          selected: false,
        };
      });
      setAllDomainsData(domainNames);
    });
  };

  const handleDomains = (event) => {
    const { className } = event.target;
    const toggledDomains = allDomainsData.map((domain) => {
      if (domain.domainName === className) {
        return {
          ...domain,
          selected: !domain.selected,
        };
      }
      return {
        ...domain,
        selected: false,
      }
    });
    setAllDomainsData(toggledDomains);
  };

  const getSelectedServicesIds = (allServices) => {
    return allServices
      .filter(function (service) {
        return service.selected === true;
      })
      .map(function (service) {
        return service._id;
      });
  };

  const getAllServices = () => {
    instance.get(`api/${Role}/services/all`).then(function (response) {
      const servicesNames = response.map((service) => {
        return {
          ...service,
          selected: false,
        };
      });
      setAllServicesData(servicesNames);
    });
  };

  const handleServices = (event) => {
    const { className } = event.target;
    const toggledServices = allServicesData.map((service) => {
      if (service.serviceName === className)
        return {
          ...service,
          selected: !service.selected,
        };
      return service;
    });
    setAllServicesData(toggledServices);
  };

  useEffect(() => {
    setSelectedServicesId(getSelectedServicesIds(allServicesData));
  }, [allServicesData]);

  useEffect(() => {
  }, [visibleTechNames])

  useEffect(() => {
  }, [selectedTechName])

  useEffect(() => {
    const filteredTech = {};
    // if (selectedServicesId.length > 0) {
    allTechData.forEach((tech) => {
      if (selectedServicesId.indexOf(tech.serviceId) !== -1) {
        filteredTech[tech.technologyName] = tech;
      }
    });
    setVisibleTechData(filteredTech);
    setVisibleTechNames(Object.keys(filteredTech));
    setApiData({
      ...apiData,
      agencyServices: selectedServicesId,
    });
    // }
  }, [selectedServicesId]);

  const getAllTechs = () => {
    instance.get(`api/${Role}/technologies/all`).then(function (response) {
      const techNames = response.map((tech) => {
        return {
          ...tech,
          selected: false,
        };
      });
      setAllTechData(techNames);
    });
  };

  const createAgencyForm2Api = () => {
    setLoading(true);
    instance
      .post(`api/${Role}/agencies/create`, apiData)
      .then(function (response) {
        setLoading(false);
        propData.agencyForm2 = apiData;
        props.history.push("/agency-form-three", propData);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllDomains();
    getAllServices();
    getAllTechs();
  }, []);

  useEffect(() => {
    setApiData({
      ...apiData,
      agencyDomains: dom.map((domain) => {
        return {
          domainId: domain._id,
          domainBaseAmount: 100,
          isAmountNegotiable: true,
        };
      }),
    });
  }, [dom]);

  useEffect(() => {
    if (toggle !== null) {
      if (apiData.agencyMonthlyBudget !== "") {
        createAgencyForm2Api();
      } else {
        toast.error("Please select a value for monthly budget.");
      }
    }
  }, [toggle]);

  useEffect(() => {
    if (
      allDomainsData.length !== 0 &&
      allTechData.length !== 0 &&
      allServicesData.length !== 0
    ) {
      setLoading(false);
    }
    setAgencyDomains();
  }, [allDomainsData, allServicesData, allTechData]);

  const handleNext = () => {
    if (dom.length > 0) {
      if (getSelectedServicesIds(allServicesData).length > 0) {
        if (selectedTechName.length > 0) {
          setAgencyTechnologies();
        } else {
          toast.error("Please Select at least one Technology.");
        }
      } else {
        toast.error("Please Select at least one Service.");
      }
    } else {
      toast.error("Please Select at least one domain.");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="agency-form_parent">
          <Navbar />
          <Back name="Agency form 2" />
          <FormPhases steps={steps} />
          <div className="mainTechStackFormParent">
            {/* <div className="mainTechStackForm"> */}
            <div className="innerTechStackForm">
              <div className="techStackFields">
                <div className="domainsFields">
                  <p className="domainHeading">
                    1. Which business sector are you targeting?
                    <span className="requiredStar">
                      *
                    </span>
                  </p>
                  <div className="servicesCardsHireAgency agencyForm2 domainChild">
                    {allDomainsData?.length > 0 ? (
                      allDomainsData.map((domain) => {
                        return (
                          <div className="tech-container">
                            <div className={`${domain.domainName}`} onClick={(event) => handleDomains(event)}
                            >
                              <img style={{ filter: domain.selected ? " invert(90%) sepia(21%) saturate(287%) hue-rotate(150deg) brightness(98%) contrast(98%)" : "none" }} className={`${domain.domainName}`} src={domain.domainIcon} alt="" />
                            </div>
                            <p className={`${domain.domainName}`}>
                              {`${domain.domainName}`}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p>Sorry No Data Found.</p>
                    )}
                  </div>
                </div>

                <div className="serivcesAgency">
                  <p className="servicesHeading">
                    2. In which services you have good command?
                    <span className="requiredStar">
                      *
                    </span>
                  </p>
                  <div className="servicesCardsHireAgency agencyForm2">
                    {allServicesData?.length > 0 ? (
                      allServicesData.map((service) => {
                        return (
                          <div className="tech-container">
                            <div className={`${service.serviceName}`} onClick={(event) => handleServices(event)}
                            >
                              <img style={{ filter: service.selected ? " invert(90%) sepia(21%) saturate(287%) hue-rotate(150deg) brightness(98%) contrast(98%)" : "none" }} className={`${service.serviceName}`} src={service.serviceIcon} alt="" />
                            </div>
                            <p className={`${service.serviceName}`}>
                              {`${service.serviceName}`}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p>Sorry No Data Found.</p>
                    )}
                  </div>
                </div>

                <div className="monthlyBudget">
                  <p>3. What is the monthly budget?
                    <span className="requiredStar">
                      *
                    </span>
                  </p>
                  <div className="domainBudgetOptions">
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="budget"
                        name="budget"
                        value={apiData?.agencyMonthlyBudget}
                        defaultChecked={apiData?.agencyMonthlyBudget}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1000"
                          control={<Radio />}
                          label="1000$-3000$"
                        />
                        <FormControlLabel
                          value="3000"
                          control={<Radio />}
                          label="3000$-5000$"
                        />
                        <FormControlLabel
                          value="5000"
                          control={<Radio />}
                          label="50000$-7000$"
                        />
                        <FormControlLabel
                          value="7000"
                          control={<Radio />}
                          label="7000$-10000$"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div className="nextBtn bothBtn">
                  <button onClick={() => goBack()} style={{ backgroundColor: '#707070' }}>
                    Back
                  </button>
                  <button style={{ backgroundImage: 'linear-gradient(to right, #45a4e4, #259af0, #1a8ef9, #377fff, #5c6dff)' }} className="next-click" onClick={() => { handleNext() }}>
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className={`${visibleTechNames?.length ? "serviceFieldsOptions_agencyForm2" : "conditional_please_select"}`}>
              <div className="serviceSelectionInput input_agencyForm2">
                {
                  // visibleTechData !== null ?
                  visibleTechNames?.length ? (
                    <>
                      <p className="uiuxtext uiuxtext_agencyForm3">Select Technologies</p>
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        {/* <MultiSearchSelect
                          className="UIUXServices"
                          searchable={true}
                          showTags={true}
                          multiSelect={true}
                          width="23vw"
                          onSelect={(arr) => handleTechSelect(arr)}
                          options={visibleTechNames}
                          primaryColor="#D6EAF8"
                          secondaryColor="#02044a"
                          textSecondaryColor="#fff"
                          textColor="black"
                        /> */}

                        <MultiSelect
                          options={visibleTechNames.map(t => ({ "label": t, "value": t }))}
                          value={selectedTechName}
                          onChange={setSelectedTechNames}
                          labelledBy="Select"
                          className="multi-select"
                        />

                      </div>
                    </>
                  ) : (
                    <p>Please select one or more services.</p>
                  )
                  // :
                  // <p>No Technologies Found...</p>
                }
              </div>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}

export default AgencyForm2;
