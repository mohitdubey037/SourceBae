import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ClientNavbar from '../../ClientNavbar'

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

function HireAgencyForm3() {

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
            <div className="mainHireAgencyForm3">
                <div className="innerHireAgencyForm3">
                    <div className="techStackFields">

                        <div className="stepCheck">
                            <p>Step 3</p>
                        </div>

                        <div className="HireAgencyForm3Heading">
                            <h2>How can <span> OneSoucing </span> can help you?</h2>
                        </div>

                        <div className="serivcesHireAgency">
                            <p className="servicesAgencyHeadingForm3">which kind of application or service would you require?</p>

                            <div className="servicesCardsHireAgency">
                                <div onClick={() => (setUiUx(!isUiUx), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isUiUx ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={uiux} alt="" />
                                    <p style={{ color: isUiUx ? '#fff' : '#000' }}>UI/UX <br /> Design</p>
                                </div>
                                <div onClick={() => (setWeb(!isWeb), document.body.scrollIntoView({ behavior: 'smooth' }))} style={{ backgroundColor: isWeb ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={webdevelopment} alt="" />
                                    <p style={{ color: isWeb ? '#fff' : '#000' }}>Web <br /> Development</p>
                                </div>
                                <div onClick={() => setCMS(!isCMS)} style={{ backgroundColor: isCMS ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={cmsdevelopment} alt="" />
                                    <p style={{ color: isCMS ? '#fff' : '#000' }}>CMS <br />  Development</p>
                                </div>
                                <div onClick={() => setMobile(!isMobile)} style={{ backgroundColor: isMobile ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={mobiledevelopment} alt="" />
                                    <p style={{ color: isMobile ? '#fff' : '#000' }}>Mobile Development</p>
                                </div>
                                <div onClick={() => setDatabase(!isDatabase)} style={{ backgroundColor: isDatabase ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={database} alt="" />
                                    <p style={{ color: isDatabase ? '#fff' : '#000' }}>Database Development</p>
                                </div>
                                <div onClick={() => setIOT(!isIOT)} style={{ backgroundColor: isIOT ? '#26AFFF' : '#DFF5FF' }} >
                                    <img src={iot} alt="" />
                                    <p style={{ color: isIOT ? '#fff' : '#000' }}>Iot <br /> Development</p>
                                </div>
                            </div>
                        </div>

                        <div className="nextbuttton">
                            <div onClick={() => window.location.href = "/hire-agency-form-two"} ><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</div>
                            <div>Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                        </div>


                    </div>
                    <div className="serviceFieldsOptions">
                        <div className="servicesHireAgencyContainer">
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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
                            <div className="serviceSelectionInput">
                                {
                                    isCMS ? (<>
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

export default HireAgencyForm3
