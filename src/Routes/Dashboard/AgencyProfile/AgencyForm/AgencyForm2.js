/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import FormPhases from "./FormPhases";
import { NavLink } from "react-router-dom";

//axios instance
import instance from "../../../../Constants/axiosConstants";

//services
import uiux from "../../../../assets/images/agencyForm/uiux.png";

//material-ui
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import { makeStyles } from '@material-ui/core/styles';

//multi-select
import MultiSearchSelect from "react-search-multi-select";
import Spinner from "../../../../Components/Spinner/Spinner";
import { toast } from "react-toastify";

// const useStyles = makeStyles({
//     root: {
//         '&:hover': {
//             backgroundColor: 'transparent',
//         },
//     },
// })

function AgencyForm2(props) {

  const Role = "agency";
  const [loading, setLoading] = useState(true);

  // selecting Domains
  const [allDomainsData, setAllDomainsData] = useState([]);

  //selecting services
  const [allServicesData, setAllServicesData] = useState([]);
  const [selectedServicesId, setSelectedServicesId] = useState([]);
  const [selectedTechName, setSelectedTechNames] = useState([]);

  //selecting Techs
  const [allTechData, setAllTechData] = useState([]);
  const [visibleTechData, setVisibleTechData] = useState([]);
  const [visibleTechNames, setVisibleTechNames] = useState([]);
  const [dom, setDom] = useState([]);

  //API DATA STATE VARIABLES
  const [apiData, setApiData] = useState({
    stepsCompleted: "3",
    agencyDomains: [],
    agencyServices: [],
    agencyTechnologies: [],
    agencyMonthlyBudget: "",
  });

  // const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "budget")
      setApiData({
        ...apiData,
        agencyMonthlyBudget: value,
      });
  };

  const handleTechSelect = (arr) => {
    setSelectedTechNames(arr);
  };

  const setAgencyTechnologies = () => {
        const selectedTechs = selectedTechName.map((tech) => {
          return visibleTechData[tech]._id;
        });
        setApiData({
          ...apiData,
          agencyTechnologies: selectedTechs,
        });
  };

  const setAgencyDomains = async () => {
    const selects = await allDomainsData.filter(
      (domain) => domain.selected === true
    );
    setDom(selects);
  };

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

  // const handleNext = () => {
  //     setAgencyDomains()
  //     setAgencyTechnologies()
  // }
  //Api Calls methods

  const getAllDomains = () => {
    instance.get(`api/${Role}/domains/all`).then(function (response) {
      console.log(response);
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
      return domain;
    });
    setAllDomainsData(toggledDomains);
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
    // document.body.scrollIntoView({ behavior: 'smooth' })
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

  const getSelectedServicesIds = (allServices) => {
    return allServices
      .filter(function (service) {
        return service.selected === true;
      })
      .map(function (service) {
        return service._id;
      });
  };

  const createAgencyForm2Api = () => {
    setLoading(true);
    instance
      .post(`api/${Role}/agencies/create`, apiData)
      .then(function (response) {
        // setStatus("Next")
        setLoading(false);
        props.history.push("/agency-form-three");
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
    if (
      allDomainsData.length !== 0 &&
      allTechData.length !== 0 &&
      allServicesData.length !== 0
    ) {
      setLoading(false);
    }
    setAgencyDomains();
  }, [allDomainsData, allServicesData, allTechData]);

  useEffect(() => {
    // setSelectedServicesId(getSelectedServicesIds(allServicesData));
    // setApiData({
    //   ...apiData,
    //   agencyServices: getSelectedServicesIds(allServicesData),
    // });
  }, [allServicesData]);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    const filteredTech = {};
    allTechData.forEach((tech) => {
      if (selectedServicesId.indexOf(tech.serviceId) !== -1) {
        filteredTech[tech.technologyName] = tech;
      }
    });
    setVisibleTechData(filteredTech);
    setVisibleTechNames(Object.keys(filteredTech));
  }, [selectedServicesId, allTechData]);


  const handleNext = () => {
    if (dom.length > 0) {
      if (getSelectedServicesIds(allServicesData).length > 0) {
        setSelectedServicesId(getSelectedServicesIds(allServicesData));
        setApiData({
          ...apiData,
          agencyServices: getSelectedServicesIds(allServicesData),
        });

        if (selectedTechName.length > 0) {
          setAgencyTechnologies();
          if(apiData.agencyMonthlyBudget!==""){
              createAgencyForm2Api()
          }
          else{
            toast.error("Please select a value for monthly budget.")
          }
        }
        else{
            toast.error("Please Select at least one Technology.")
        }
      }
      else{
          toast.error("Please Select at least one Service.")
      }
    }
    else{
        toast.error("Please Select at least one domain.")
    }
  };

  return (
    <>
      <Navbar />
      <FormPhases value1={true} value2={true} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="mainTechStackForm">
          <div className="innerTechStackForm">
            <div className="techStackFields">
              <div className="domainsFields">
                <p className="domainHeading">
                  1. Which business sector are you targeting?
                </p>
                <div className="domainFieldsCard">
                  {allDomainsData?.length > 0 ? (
                    allDomainsData.map((domain) => {
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
                    })
                  ) : (
                    <p>Sorry No Data Found.</p>
                  )}
                </div>
              </div>

              <div className="serivcesAgency">
                <p className="servicesHeading">
                  2. In which services you have good command?
                </p>
                <div className="servicesCardsAgency">
                  {allServicesData?.length > 0 ? (
                    allServicesData.map((service) => {
                      return (
                        <div
                          className={`${service.serviceName}`}
                          onClick={(event) => handleServices(event)}
                          style={{
                            backgroundColor: service.selected
                              ? "#02044a"
                              : "#D6EAF8",
                          }}
                        >
                          <img
                            className={`${service.serviceName}`}
                            src={uiux}
                            alt=""
                          />
                          {/* <p style={{ color: isUiUx ? '#fff' : '#000' }}>UI/UX <br /> Design</p> */}
                          <p
                            className={`${service.serviceName}`}
                            style={{
                              color: service.selected ? "#fff" : "#000",
                            }}
                          >{`${service.serviceName}`}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p>Sorry No Data Found.</p>
                  )}
                </div>
              </div>

              <div className="monthlyBudget">
                <p>3. What is the monthly budget?</p>
                <div className="domainBudgetOptions">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="budget"
                      name="budget"
                      value={apiData.agencyMonthlyBudget}
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

              <div className="nextBtn">
                {/* <NavLink to="/agency-form-one" ><i className="fa fa-long-arrow-left" aria-hidden="true"></i>Back</NavLink> */}
                <NavLink
                  to="/agency-form-one"
                  style={{ textDecoration: "none" }}
                >
                  <button className="next-click">
                    <i className="fa fa-long-arrow-left" aria-hidden="true" />
                    Back
                  </button>
                </NavLink>
                <button
                  style={{ backgroundColor: "blue" }}
                  className="next-click"
                  onClick={(event) => {
                    handleNext(event);
                  }}
                >
                  Next
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                </button>
                {/* </NavLink> */}
              </div>
            </div>
            <div className="serviceFieldsOptions">
              <div className="servicesContainer">
                <div className="serviceSelectionInput">
                  {visibleTechNames?.length ? (
                    <>
                      <p className="uiuxtext">Select Technologies</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <MultiSearchSelect
                          searchable={true}
                          showTags={true}
                          multiSelect={true}
                          width="23vw"
                          onSelect={handleTechSelect}
                          options={visibleTechNames}
                          primaryColor="#D6EAF8"
                          secondaryColor="#02044a"
                          textSecondaryColor="#fff"
                          className="UIUXServices"
                          textColor="#02044a"
                        />
                      </div>
                    </>
                  ) : (
                    <p>Please select one or more services.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AgencyForm2;
