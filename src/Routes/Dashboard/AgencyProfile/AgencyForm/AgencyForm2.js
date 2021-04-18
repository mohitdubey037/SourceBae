import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { NavLink } from 'react-router-dom'

//axios instance
import instance from "../../../../Constants/axiosConstants"

//services
import uiux from '../../../../assets/images/agencyForm/uiux.png'
import webdevelopment from '../../../../assets/images/agencyForm/webdevelopment.png'
import cmsdevelopment from '../../../../assets/images/agencyForm/cmsdevelopment.png'
import mobiledevelopment from '../../../../assets/images/agencyForm/mobiledevelopment.png'
import database from '../../../../assets/images/agencyForm/database.png'
import iot from '../../../../assets/images/agencyForm/iot.png'

//material-ui
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

//multi-select
import MultiSearchSelect from "react-search-multi-select";



const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
})


// values for services in right
const arr = ["Allison", "Arthur", "Beryl", "Chantal", "Cristobal", "Danielle", "Dennis", "Ernesto", "Felix", "Fay", "Grace", "Gaston", "Gert", "Gordon"]
const brr = ["Allison", "Arthur", "Beryl", "Chantal", "Cristobal", "Danielle", "Dennis", "Ernesto", "Felix", "Fay", "Grace", "Gaston", "Gert", "Gordon"]

function AgencyForm2() {

    const Role = "agency"
    // selecting Domains
    const [allDomainsData, setAllDomainsData] = useState([])

    //selecting services
    const [allServicesData, setAllServicesData] = useState([])

    const [selectedServicesId, setSelectedServicesId] = useState([])

    //selecting Techs
    const [allTechData, setAllTechData] = useState([])
    const [visibleTechData, setVisibleTechData] = useState([])
    const [visibleTechNames, setVisibleTechNames] = useState([])

    const [isUiUx, setUiUx] = useState(false);
    const [isWeb, setWeb] = useState(false);
    const [isCMS, setCMS] = useState(false);
    const [isMobile, setMobile] = useState(false);
    const [isDatabase, setDatabase] = useState(false);
    const [isIOT, setIOT] = useState(false);

    //services-option-selection
    const [selected, setSelected] = useState(arr);
    const [webService, setWebservice] = useState(brr);

    const classes = useStyles();

    //selecting domain budget
    const [value, setValue] = React.useState('$5000-$10000');
    const [budget, setBudget] = useState('$5000-$10000')

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChangeBudget = (event) => {
        setBudget(event.target.value);
    };

    const handleChangeSelect = (arr) => {
        console.log(arr);
    }
    const handleChangeWeb = (arr) => {
        console.log(arr);
    }

    //Api Calls methods

    const getAllDomains = () => {
        instance.get(`api/${Role}/domains/all`)
            .then(function (response) {

                const domainNames = response.map((domain) => {
                    return {
                        ...domain,
                        selected: false
                    }
                })
                setAllDomainsData(domainNames)
                // setAllDomains(domainNames)
            })
    }

    const handleDomains = (event) => {
        const { className } = event.target
        console.log(className)
        const toggledDomains = allDomainsData.map((domain) => {
            if (domain.domainName === className)
                return {
                    ...domain,
                    selected: !domain.selected
                }

            return domain
        })

        setAllDomainsData(toggledDomains)

    }

    const getAllServices = () => {
        instance.get(`api/${Role}/services/all`)
            .then(function (response) {
                const servicesNames = response.map((service) => {
                    return {
                        ...service,
                        selected: false
                    }
                })
                setAllServicesData(servicesNames)
            })
    }


    const handleServices = (event) => {

        // document.body.scrollIntoView({ behavior: 'smooth' })
        const { className } = event.target
        const toggledServices = allServicesData.map((service) => {
            if (service.serviceName === className)
                return {
                    ...service,
                    selected: !service.selected
                }

            return service
        })

        setAllServicesData(toggledServices)

    }

    const getAllTechs = () => {
        instance.get(`api/${Role}/technologies/all`)
            .then(function (response) {
                // setAllServicesData(response)
                const techNames = response.map((tech) => {
                    return {
                        ...tech,
                        selected: false
                    }
                })
                setAllTechData(techNames)
            })
    }



    const handleTechs = () => {

    }

    function getSelectedServicesIds(allServices) {
        return allServices
            .filter(function (service) {
                return service.selected === true;
            })
            .map(function (service) {
                return service._id;
            });
    }

    useEffect(() => {
        getAllDomains()
        getAllServices()
        getAllTechs()
    }, [])

    useEffect(() => {
        setSelectedServicesId(getSelectedServicesIds(allServicesData))

    }, [allServicesData])

    useEffect(() => {
        const filteredTech = allTechData.filter((tech) => {
            if (selectedServicesId.indexOf(tech.serviceId) !== -1)
                return tech
        })

        setVisibleTechData(filteredTech)
    }, [selectedServicesId, allTechData])

    useEffect(()=>{
        console.log(visibleTechData)
        setVisibleTechNames(
            visibleTechData.map((tech)=>{
                return tech.technologyName
            })
        )
    },[visibleTechData])

    return (
        <>
            <Navbar />

            <FormPhases value1={true} value2={true} />

            <div className="mainTechStackForm">
                <div className="innerTechStackForm">
                    <div className="techStackFields">

                        <div className="domainsFields">
                            <p className="domainHeading">1. Which business sector are you targeting?</p>
                            <div className="domainFieldsCard">
                                {allDomainsData?.length > 0 ? allDomainsData.map((domain) => {
                                    return (
                                        <div className={`${domain.domainName}`} onClick={(event) => handleDomains(event)} style={{ backgroundColor: domain.selected ? '#02044a' : '#D6EAF8' }} >
                                            <img className={`${domain.domainName}`} src={domain.domainIcon} alt="" />
                                            <p className={`${domain.domainName}`} style={{ color: domain.selected ? '#fff' : '#000' }}>{`${domain.domainName}`}</p>
                                        </div>
                                    )
                                })
                                    :
                                    <p>Sorry No Data Found.</p>
                                }
                            </div>
                        </div>




                        <div className="serivcesAgency">
                            <p className="servicesHeading">2. In which services you have good command?</p>
                            <div className="servicesCardsAgency">

                                {allServicesData?.length > 0 ? allServicesData.map((service) => {
                                    return (
                                        <div className={`${service.serviceName}`} onClick={(event) => handleServices(event)} style={{ backgroundColor: service.selected ? '#02044a' : '#D6EAF8' }} >
                                            <img className={`${service.serviceName}`} src={uiux} alt="" />
                                            {/* <p style={{ color: isUiUx ? '#fff' : '#000' }}>UI/UX <br /> Design</p> */}
                                            <p className={`${service.serviceName}`} style={{ color: service.selected ? '#fff' : '#000' }}>{`${service.serviceName}`}</p>
                                        </div>
                                    )
                                })
                                    :
                                    <p>Sorry No Data Found.</p>
                                }
                            </div>
                        </div>


                        <div className="monthlyBudget">
                            <p>3. What is the monthly budget?</p>

                            <div className="domainBudgetOptions">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel color="primary" value="$5000-$10000" control={<Radio className={classes.root} />} label="$5000-$10000" />
                                        <FormControlLabel value="$10000-$150000" control={<Radio />} label="$10000-$150000" />
                                        <FormControlLabel value="Max $15000" control={<Radio />} label="Max $15000" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>


                        <div className="nextBtn">
                            <NavLink to="/agency-form-one" ><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</NavLink>
                            <NavLink to="/agency-form-three" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                        </div>


                    </div>
                    <div className="serviceFieldsOptions">
                        <div className="servicesContainer">
                            <div className="serviceSelectionInput">
                                {
                                    visibleTechNames?.length ? (<>
                                        <p className="uiuxtext">Select UI/UX services</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <MultiSearchSelect searchable={true} showTags={true} multiSelect={true} width="23vw" onSelect={handleChangeSelect} options={visibleTechNames} primaryColor="#D6EAF8"
                                                secondaryColor="#02044a"
                                                textSecondaryColor="#fff"
                                                className="UIUXServices"
                                                showTags={true}
                                                textColor="#02044a" />
                                        </div>
                                    </>) : <p>Please select one or more services.</p>
                                }
                            </div>
                            <div className="serviceSelectionInput">
                                {
                                    isWeb ? (<>
                                        <p className="uiuxtext">Select Web services</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <MultiSearchSelect searchable={true} showTags={true} multiSelect={true} width="23vw" onSelect={handleChangeSelect} options={webService} primaryColor="#D6EAF8"
                                                secondaryColor="#02044a"
                                                textSecondaryColor="#fff"
                                                className="UIUXServices"
                                                showTags={true}
                                                textColor="#02044a" />
                                        </div>
                                    </>) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyForm2
