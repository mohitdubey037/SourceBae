import React, { useState } from 'react'
import ClientNavbar from '../../ClientNavbar'
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
import { makeStyles, withStyles } from '@material-ui/core/styles';

//multi-select
import MultiSearchSelect from "react-search-multi-select";

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
})

const BlueRadio = withStyles({
    root: {
        color: '#26AFFF',
        '&$checked': {
            color: '#26AFFF',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


// values for services in right
const arr = ["Allison", "Arthur", "Beryl", "Chantal", "Cristobal", "Danielle", "Dennis", "Ernesto", "Felix", "Fay", "Grace", "Gaston", "Gert", "Gordon"]
const brr = ["Allison", "Arthur", "Beryl", "Chantal", "Cristobal", "Danielle", "Dennis", "Ernesto", "Felix", "Fay", "Grace", "Gaston", "Gert", "Gordon"]

function HireAgencyForm2() {

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
            <ClientNavbar />

            <div className="mainHireAgencyFormTwo">
                <div className="innerHireAgencyFormTwo">
                    <div className="techStackFields">

                        <div className="stepCheck">
                            <p>Step 2</p>
                        </div>

                        <div className="serivcesHireAgency">
                            <p className="servicesAgencyHeading">1. In which services you have good command?</p>

                            <div className="servicesCardsHireAgency">
                                <div onClick={() => (setFood(!isFood), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isFood ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={uiux} alt="" />
                                    <p style={{ color: isFood ? '#fff' : '#000' }}>Food</p>
                                </div>
                                <div onClick={() => (setEcommerce(!isEcommerce), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isEcommerce ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={webdevelopment} alt="" />
                                    <p style={{ color: isEcommerce ? '#fff' : '#000' }}>E-commerce</p>
                                </div>
                                <div onClick={() => setHealth(!isHealth)} style={{ backgroundColor: isHealth ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={cmsdevelopment} alt="" />
                                    <p style={{ color: isHealth ? '#fff' : '#000' }}>CMS <br /> Health Care</p>
                                </div>
                                <div onClick={() => setEducation(!isEducation)} style={{ backgroundColor: isEducation ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={mobiledevelopment} alt="" />
                                    <p style={{ color: isEducation ? '#fff' : '#000' }}>Education</p>
                                </div>
                                <div onClick={() => setFinance(!isFinance)} style={{ backgroundColor: isFinance ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={database} alt="" />
                                    <p style={{ color: isFinance ? '#fff' : '#000' }}>Finance</p>
                                </div>
                                <div onClick={() => setTravel(!isTravel)} style={{ backgroundColor: isTravel ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={iot} alt="" />
                                    <p style={{ color: isTravel ? '#fff' : '#000' }}>Iot <br /> Travel & Booking</p>
                                </div>
                                <div onClick={() => setSocial(!isSocial)} style={{ backgroundColor: isSocial ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={iot} alt="" />
                                    <p style={{ color: isSocial ? '#fff' : '#000' }}>Iot <br /> Media & Social</p>
                                </div>
                                <div onClick={() => setEstate(!isEstate)} style={{ backgroundColor: isEstate ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={iot} alt="" />
                                    <p style={{ color: isEstate ? '#fff' : '#000' }}>Iot <br /> Real Estate</p>
                                </div>
                            </div>
                        </div>


                        <div className="monthlyBudget">
                            <p>2. How experience should the agency be in the domain of the project?</p>

                            <div className="domainBudgetOptions">
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel color="primary" value="$5000-$10000" control={<BlueRadio className={classes.root} />} label="$5000-$10000" />
                                        <FormControlLabel value="$10000-$150000" control={<BlueRadio />} label="$10000-$150000" />
                                        <FormControlLabel value="Max $15000" control={<BlueRadio />} label="Max $15000" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>


                        <div className="nextbuttton">
                            <div onClick={() => window.location.href = "/hire-agency-form-one"} ><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</div>
                            <div onClick={() => window.location.href = "/hire-agency-form-three"} >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                        </div>


                    </div>
                    <div className="serviceFieldsOptions">
                        <div className="servicesHireAgencyContainer">
                            <div className="serviceSelectionInput">
                                {
                                    isFood ? (<>
                                        <p className="uiuxtext">Select Food services</p>
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
                                    isEcommerce ? (<>
                                        <p className="uiuxtext">Select E-commerce services</p>
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

export default HireAgencyForm2
