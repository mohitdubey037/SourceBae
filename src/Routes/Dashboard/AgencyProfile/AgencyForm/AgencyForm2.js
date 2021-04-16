import React, { useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { NavLink } from 'react-router-dom'

//domains
import food from '../../../../assets/images/agencyForm/food.png'
import ecommerce from '../../../../assets/images/agencyForm/ecommerce.png'
import healthcare from '../../../../assets/images/agencyForm/healthcare.png'
import socialmedia from '../../../../assets/images/agencyForm/socialmedia.png'
import realestate from '../../../../assets/images/agencyForm/realestate.png'
import education from '../../../../assets/images/agencyForm/education.png'
import finance from '../../../../assets/images/agencyForm/finance.png'
import travel from '../../../../assets/images/agencyForm/travel.png'

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

    // selecting Domains
    const [isFood, setFood] = useState(false);
    const [isEcommerce, setEcommerce] = useState(false);
    const [isHealth, setHealth] = useState(false);
    const [isSocial, setSocial] = useState(false);
    const [isEstate, setEstate] = useState(false);
    const [isEducation, setEducation] = useState(false);
    const [isFinance, setFinance] = useState(false);
    const [isTravel, setTravel] = useState(false);

    //selecting services
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
                                <div onClick={() => setFood(!isFood)} style={{ backgroundColor: isFood ? '#02044a' : '#D6EAF8' }} >
                                    <img src={food} alt="" />
                                    <p style={{ color: isFood ? '#fff' : '#000' }}>Food</p>
                                </div>
                                <div onClick={() => setEcommerce(!isEcommerce)} style={{ backgroundColor: isEcommerce ? '#02044a' : '#D6EAF8' }} >
                                    <img src={ecommerce} alt="" />
                                    <p style={{ color: isEcommerce ? '#fff' : '#000' }}>E-commerce</p>
                                </div>
                                <div onClick={() => setHealth(!isHealth)} style={{ backgroundColor: isHealth ? '#02044a' : '#D6EAF8' }}>
                                    <img src={healthcare} alt="" />
                                    <p style={{ color: isHealth ? '#fff' : '#000' }}>Health & Care</p>
                                </div>
                                <div onClick={() => setSocial(!isSocial)} style={{ backgroundColor: isSocial ? '#02044a' : '#D6EAF8' }}>
                                    <img src={socialmedia} alt="" />
                                    <p style={{ color: isSocial ? '#fff' : '#000' }}>Social & Media</p>
                                </div>
                                <div onClick={() => setEstate(!isEstate)} style={{ backgroundColor: isEstate ? '#02044a' : '#D6EAF8' }}>
                                    <img src={realestate} alt="" />
                                    <p style={{ color: isEstate ? '#fff' : '#000' }}>Real Estate</p>
                                </div>
                                <div onClick={() => setEducation(!isEducation)} style={{ backgroundColor: isEducation ? '#02044a' : '#D6EAF8' }}>
                                    <img src={education} alt="" />
                                    <p style={{ color: isEducation ? '#fff' : '#000' }}>Education</p>
                                </div>
                                <div onClick={() => setFinance(!isFinance)} style={{ backgroundColor: isFinance ? '#02044a' : '#D6EAF8' }}>
                                    <img src={finance} alt="" />
                                    <p style={{ color: isFinance ? '#fff' : '#000' }}>Finance</p>
                                </div>
                                <div onClick={() => setTravel(!isTravel)} style={{ backgroundColor: isTravel ? '#02044a' : '#D6EAF8' }}>
                                    <img src={travel} alt="" />
                                    <p style={{ color: isTravel ? '#fff' : '#000' }}>Travel</p>
                                </div>
                            </div>
                        </div>


                        <div className="domainBudget">
                            <p>2. What is the budget of your domain?</p>

                            <div className="domainBudgetOptions">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={budget} onChange={handleChangeBudget}>
                                        <FormControlLabel color="primary" value="$5000-$10000" control={<Radio className={classes.root} />} label="$5000-$10000" />
                                        <FormControlLabel value="$10000-$150000" control={<Radio />} label="$10000-$150000" />
                                        <FormControlLabel value="Max $15000" control={<Radio />} label="Max $15000" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>


                        <div className="serivcesAgency">
                            <p className="servicesHeading">3. In which services you have good command?</p>

                            <div className="servicesCardsAgency">
                                <div onClick={() => (setUiUx(!isUiUx), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isUiUx ? '#02044a' : '#D6EAF8' }} >
                                    <img src={uiux} alt="" />
                                    <p style={{ color: isUiUx ? '#fff' : '#000' }}>UI/UX <br /> Design</p>
                                </div>
                                <div onClick={() => (setWeb(!isWeb), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isWeb ? '#02044a' : '#D6EAF8' }} >
                                    <img src={webdevelopment} alt="" />
                                    <p style={{ color: isWeb ? '#fff' : '#000' }}>Web <br /> Development</p>
                                </div>
                                <div onClick={() => setCMS(!isCMS)} style={{ backgroundColor: isCMS ? '#02044a' : '#D6EAF8' }} >
                                    <img src={cmsdevelopment} alt="" />
                                    <p style={{ color: isCMS ? '#fff' : '#000' }}>CMS <br />  Development</p>
                                </div>
                                <div onClick={() => setMobile(!isMobile)} style={{ backgroundColor: isMobile ? '#02044a' : '#D6EAF8' }} >
                                    <img src={mobiledevelopment} alt="" />
                                    <p style={{ color: isMobile ? '#fff' : '#000' }}>Mobile Development</p>
                                </div>
                                <div onClick={() => setDatabase(!isDatabase)} style={{ backgroundColor: isDatabase ? '#02044a' : '#D6EAF8' }} >
                                    <img src={database} alt="" />
                                    <p style={{ color: isDatabase ? '#fff' : '#000' }}>Database Development</p>
                                </div>
                                <div onClick={() => setIOT(!isIOT)} style={{ backgroundColor: isIOT ? '#02044a' : '#D6EAF8' }} >
                                    <img src={iot} alt="" />
                                    <p style={{ color: isIOT ? '#fff' : '#000' }}>Iot <br /> Development</p>
                                </div>
                            </div>
                        </div>


                        <div className="monthlyBudget">
                            <p>4. What is the monthly budget?</p>

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
                            <NavLink to="/agency-form-three" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                        </div>


                    </div>
                    <div className="serviceFieldsOptions">
                        <div className="servicesContainer">
                            <div className="serviceSelectionInput">
                                {
                                    isUiUx ? (<>
                                        <p className="uiuxtext">Select UI/UX services</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <MultiSearchSelect searchable={true} showTags={true} multiSelect={true} width="23vw" onSelect={handleChangeSelect} options={selected} primaryColor="#D6EAF8"
                                                secondaryColor="#02044a"
                                                textSecondaryColor="#fff"
                                                className="UIUXServices"
                                                showTags={true}
                                                textColor="#02044a" />
                                        </div>
                                    </>) : null
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
