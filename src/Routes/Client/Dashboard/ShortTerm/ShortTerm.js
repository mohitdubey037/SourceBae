import React, { useState, useEffect } from 'react'
import ClientNavbar from '../../ClientNavbar'
import './ShortTerm.css'


import development from '../../../../assets/images/ClientDashboard/shortTerm/development.png'
import design from '../../../../assets/images/ClientDashboard/shortTerm/design.png'
import sales from '../../../../assets/images/ClientDashboard/shortTerm/sales.png'
import other from '../../../../assets/images/ClientDashboard/shortTerm/other.png'
import fixed from '../../../../assets/images/ClientDashboard/shortTerm/fixed.png'
import hour from '../../../../assets/images/ClientDashboard/shortTerm/hour.png'

import { FilePicker } from 'react-file-picker'


//material-ui
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import instance from '../../../../Constants/axiosConstants';


const useStyles = makeStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: '100%',
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        getContentAnchorEl: () => null,
        style: {
            maxHeight: 280,
            width: 250,
            top: 350,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const BlueRadio = withStyles({
    root: {
        color: '#26AFFF',
        '&$checked': {
            color: '#26AFFF',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


function ShortTerm() {

    const Role = 'client';


    // const [projectType, setProjectType] = useState('');
    // const [projectName, setProjectName] = useState('');
    // const [personName, setPersonName] = React.useState([]);
    const [select, setSelect] = useState();
    const [selectPay, setSelectpay] = useState();
    const [value, setValue] = React.useState('$5000-$10000');
    const [services, setServices] = useState([])

    // const [selectedFile, setSelectedFile] = React.useState('');
    const clientId = localStorage.getItem("userId");

    let [state, setState] = useState({ clientId: clientId })

    const [document, setDocument] = useState({
        documentLink: "",
        documentPicked: false,
        document: ""
    })

    // const [projectDescription, setProjectDescription] = useState('');


    const getAllServices = () => {
        instance.get(`api/${Role}/services/all`)
            .then(function (response) {
                console.log(response);
                const serviceNames = response.map((service) => {
                    return {
                        ...service,
                        selected: false
                    }
                })
                setServices(serviceNames);
            })
    }


    useEffect(() => {
        getAllServices()
    }, [])


    const theme = useTheme();

    const classes = useStyles();

    const handleChange = (event) => {
        const { name, value } = event.target
        setValue(event.target.value);
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleChangeValue = (event) => {
        const { name, value } = event.target
        // setPersonName(event.target.value);
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const mainFormHandler = (event) => {
        const { name, value } = event.target
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    // const projectTypeHandler = (value) => {
    //     // const {name, value } = event.target
    //     // setProjectType(value)
    //     console.log(value);
    //     setState(prevState => ({ ...prevState, 'projectType': value }));
    // }

    const selectPaying = (id, name) => {
        if (select == id) {
            setSelectpay();
        }
        else
            setSelectpay(id)
        setState(prevState => ({ ...prevState, projectPaymentModel: name }));
    }

    const fileHandler = (document) => {
        setDocument({
            ...document,
            documentPicked: true,
            document
        })

        // setState(prevState => ({ ...prevState, projectFiles: file }))
    }

    // console.log(document);

    // useEffect(()=>{
    //     console.log(state,"uploaded")
    // },[state])

    const selectPost = (id) => {
        if (select == id) {
            setSelect();
        }
        else
            setSelect(id)
            const idVar = []
            idVar.push(id);
        setState(prevState => ({ ...prevState, projectServicesRequired: idVar }));
    }


    const postFileUploader = async (document) => {
        const formData = new FormData();
        document && formData.append(
            "files",
            document
        );
        console.log(formData);
        return new Promise((resolve, reject) => {
            instance.post(`api/${Role}/media/create`, formData)
                .then(function (response) {
                    console.log(response);
                    setDocument({
                        ...document,
                        documentLink: response[0].mediaURL
                    })
                    resolve(1)
                })
        })
    }

    const postProjectUploader = () => {
        instance.post(`/api/${Role}/projects/create-short-term`, state)
            .then(function (response) {
                console.log(response, "response");
            })
    }

    const handlePostButton = () => {
        let fileUploaderPromise = postFileUploader(document.document)
        setState(prevState => ({ ...prevState, projectFiles: document }));
        Promise.all([fileUploaderPromise]).
        then(() => {
            postProjectUploader()
        })
    }


    console.log(state);

    // const projectNameHandler = (event) => {
    //     const {name, value } = event.target
    //     setProjectName(event.target.value);
    //     setState(prevState => ({...prevState, key:value}))
    // }

    // const projectDescriptionHandler = (event) => {
    //     const {name, value } = event.target
    //     setProjectName(event.target.value);
    //     setState(prevState => ({...prevState, key:value}))
    // }


    return (
        <>
            <ClientNavbar />
            <div className="mainShortTerm">
                <div className="innerShortTerm">
                    <div className="shortTermForm">
                        <div className="shortTermHeading">
                            <h1>Short Term Projects</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui modi pariatur animi, beatae ab tempore.</p>
                        </div>
                    </div>

                    <div className="tellUsWhatYouNeed">
                        <h6>Tell Us What You Need..!!</h6>
                    </div>

                    <div className="shortTermProjectType">
                        {services?.length > 0 ? services.map((s) => {
                            return (
                                <div onClick={() => selectPost(s._id)} name={`${s.serviceName}`} style={{ backgroundColor: s.select == s._id ? '#3498DB' : '#fff', color: s.select == s._id ? '#fff' : '#000' }} className="shortTermProjectCard">
                                    <span className="leftLineProject"></span>
                                    <img className={`${s.serviceIcon}`} src={s.serviceIcon} alt="" />
                                    <p>{`${s.serviceName}`}</p>
                                </div>
                            )
                            {/* <div onClick={() => selectPost(2)} style={{ backgroundColor: select == 2 ? '#3498DB' : '#fff', color: select == 2 ? '#fff' : '#000' }} className="shortTermProjectCard">
                                    <span className="leftLineProject"></span>
                                    <img src={s.icon} alt="" />
                                    <h2>Design & Creative</h2>
                                </div>
                                <div onClick={() => selectPost(3)} style={{ backgroundColor: select == 3 ? '#3498DB' : '#fff', color: select == 3 ? '#fff' : '#000' }} className="shortTermProjectCard">
                                    <span className="leftLineProject"></span>
                                    <img src={s.icon} alt="" />
                                    <h2>Sales & Marketing</h2>
                                </div>
                                <div onClick={() => selectPost(4)} style={{ backgroundColor: select == 4 ? '#3498DB' : '#fff', color: select == 4 ? '#fff' : '#000' }} className="shortTermProjectCard">
                                    <span className="leftLineProject"></span>
                                    <img src={s.icon} alt="" />
                                    <h2>Other</h2>
                                </div> */}
                            // )
                        })
                            :
                            <p>Sorry No Data Found.</p>
                        }
                    </div>

                    <div className="shortTermProjectName">
                        <p>Choose a name for your project</p>
                        <input onChange={mainFormHandler} type="text" placeholder="Write here..." name="projectName" id="" />
                    </div>


                    <div className="shortTermProjectDesc">
                        <p>Tell us more about your project</p>
                        <span>Start with a bit about yourself or your business, and include an overview what you need done.</span>
                        <br />
                        <textarea onChange={mainFormHandler} cols="30" rows="6" type="text" placeholder="Write here..." name="projectDescription" id="" />
                        <div className="wordsLimit">
                            <p>Minimum 100 characters.</p>
                            <p>0/100</p>
                        </div>
                    </div>

                    {/* onChange={(event) => fileHandler(event)} */}

                    <div className="shortTermFileUpload">
                        <div className="uploadBlock">
                            <FilePicker
                                extensions={['pdf', 'jpg', 'png']}
                                onChange={fileObj => fileHandler(fileObj)}>
                                <button className="pick_btn"><i class="fa fa-upload" aria-hidden="true"></i>Pick File</button>
                            </FilePicker>
                            <div className="uploadInfo">
                                <p>Upload an image or a document that might be helpful in explaining your project in brief.</p>
                            </div>
                        </div>
                    </div>

                    <div className="shortTermOptionSelect">
                        <h6>What work do you need to get done?</h6>
                        <FormControl className={classes.formControl}>
                            <div className="shortTermProjectName">
                                <input type='text' placeholder="Write here..." onChange={handleChangeValue} name='projectRequirements' />
                            </div>

                            {/* <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                multiple
                                displayEmpty
                                value={personName}
                                onChange={handleChangeValue}
                                input={<Input />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Choose from here</em>;
                                    }

                                    return selected.join(', ');
                                }}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} name='PersonName' value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select> */}
                        </FormControl>
                    </div>

                    <div className="howToPay">
                        <h6>How do you want to pay?</h6>
                        <div className="innerHowToPay">
                            <div className="fixedPrice" onClick={() => selectPaying(1, 'Fixed Price')} >
                                {
                                    selectPay == 1 ? <i class="fa fa-check-circle" aria-hidden="true"></i> : null
                                }
                                <div className="fixedImage">
                                    <img src={fixed} alt="" />
                                </div>
                                <div className="fixedContent">
                                    <h6>Pay fixed price</h6>
                                    <p>Agree on a price and release payemnt when the job is done. Best for one-off tasks.</p>
                                </div>
                            </div>

                            <div className="fixedPrice" onClick={() => selectPaying(2, 'Fixed Content')} >

                                {
                                    selectPay == 2 ? <i class="fa fa-check-circle" aria-hidden="true"></i> : null
                                }
                                <div className="fixedImage">
                                    <img src={hour} alt="" />
                                </div>
                                <div className="fixedContent">
                                    <h6>Pay by the hour</h6>
                                    <p>Hire based on an hourly rate and pay for hours billed. Best for ongoing work</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="estimatedBudget">
                        <div className="estimatedBudgetText">
                            <h6>What is your estimated Budget?</h6>
                        </div>
                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="projectProposalCost" value={value} onChange={handleChange}>
                                    <FormControlLabel color="primary" value="5000" control={<BlueRadio className={classes.root} />} label="$5000-$10000" />
                                    <FormControlLabel value="10000" control={<BlueRadio />} label="$10000-$150000" />
                                    <FormControlLabel value="15000" control={<BlueRadio />} label="Max $15000" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>


                    <div className="doneButton">
                        <div></div>
                        <button onClick={handlePostButton}>Post Project<i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShortTerm