import React, { useState } from 'react'
import './ProductForm.css'
import ClientNavbar from '../../Client/ClientNavbar';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import product from '../../../assets/images/ClientDashboard/product.svg'
import product1 from '../../../assets/images/ClientDashboard/product1.svg'
import product2 from '../../../assets/images/ClientDashboard/product2.svg'
import product3 from '../../../assets/images/ClientDashboard/product3.svg'
import product4 from '../../../assets/images/ClientDashboard/product4.svg'
import product5 from '../../../assets/images/ClientDashboard/product5.svg'



const BlueRadio = withStyles({
    root: {
        color: '#2E86C1',
        '&$checked': {
            color: '#2E86C1',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    menuFont: {
        fontFamily: 'Poppins'
    },
    inputField: {
        fontFamily: 'Poppins'
    },
    radioBox: {
        borderWidth: 1,
        borderColor: '#000'
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Ed-Tech',
    'IT',
    'Travel',
    'CRM',
    'Food Delivery',
    'E-commerce',
    'Fintech',
    'HealthCare',
];



function ProductForm() {
    const arr = [
        {
            'status': false,
            'value': 'B2B'
        },
        {
            'status': false,
            'value': 'B2A'
        },
        {
            'status': false,
            'value': 'B2C'
        },
    ]
    const brr = [
        {
            'status': false,
            'value': 'Idea'
        },
        {
            'status': false,
            'value': 'Development'
        },
        {
            'status': false,
            'value': 'MVP'
        },
        {
            'status': false,
            'value': 'Running in Market'
        },
    ]

    const [businesstype, setBusinesstype] = React.useState('');
    const [revenueGenerated, setRevenueGenerated] = useState('');
    const [moneyRaised, setMoneyRaised] = useState('');
    const [businessModal, setBusinesmodal] = useState(arr);
    const [currentStage, setCurrentStage] = useState(brr);
    const [previousFunding, setPreviousFunding] = useState('no');
    const [stage, setStage] = useState('idea');
    const [fields, setFields] = useState([{ value: null }]);

    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChangePerson = (event) => {
        setPersonName(event.target.value);
    };

    // const handleChangeMultiple = (event) => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     setPersonName(value);
    // };


    const handleChangeBusinessType = (event) => {
        setBusinesstype(event.target.value);
    };
    const handleChangeRevenueGenerated = (event) => {
        setRevenueGenerated(event.target.value);
    };
    const handleChangeMoneyRaised = (event) => {
        setMoneyRaised(event.target.value);
    };
    const handleChangePreviousFunding = (event) => {
        setPreviousFunding(event.target.value);
    };
    const handleChangeStage = (event) => {
        setStage(event.target.value);
    };

    function handleChangeLink(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    const handleBusinnesModal = (id) => {
        // var brr = arr;
        if (businessModal[id].status == false) {
            let newarr = [...businessModal]
            // arr = arr;
            newarr[id].status = true

            setBusinesmodal(newarr);
        }
        else {
            let newarr = [...businessModal]
            // arr = arr;
            newarr[id].status = false

            setBusinesmodal(newarr);
            // arr = arr;
        }
    }
    const handleCurrentStage = (id) => {
        // var brr = arr;
        if (currentStage[id].status == false) {
            let newarr = [...currentStage]
            // arr = arr;
            newarr.map(function (x) {
                x.status = false;
                return x
            })
            console.log("mewarr", newarr);
            newarr[id].status = true

            setCurrentStage(newarr);
        }
        else {
            let newarr = [...currentStage]
            // arr = arr;
            newarr.map(function (x) {
                x.status = false;
                return x
            })

            setCurrentStage(newarr);
            // arr = arr;
        }
    }

    return (
        <>
            <ClientNavbar />
            <div className='mainProductForm'>
                <div className="innerProductForm">
                    <div className="leftBorderLineProduct"></div>
                    <div className="productTagLine">
                        <h1>we focus on <br /> Your Story</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro beatae quibusdam pariatur est quas id. Lorem, ipsum dolor sit amet</p>
                    </div>
                    <div className="productIllustration">
                        <div>
                            <img src={product} alt="" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="productsHeadlines">
                <div className="innerProductHeadlines">
                    <h3> <span> Clients </span> want to know your product..!! </h3>
                    <p>Fill the form below so that client will know the details of your product.</p>
                </div>
            </div>

            <div className="mainProductFormArea">
                <div className="innerProductFormArea">
                    <div className="straightLine">
                        <span>01</span>
                        <span>02</span>
                        <span>03</span>
                        <span>04</span>
                        <span>05</span>
                    </div>
                    <div className="form_1">
                        <div className="illustrationArea">
                            <img src={product1} alt="" />
                        </div>
                        <div className="form1_Fields">
                            <section>
                                <p>1. Upload your latest logo of product</p>
                                <input type="file" name="" id="" />
                            </section>
                            <section>
                                <p>2. What's your good product name?</p>
                                <input type="text" placeholder="Type Here.." />
                            </section>
                            <section>
                                <p>3. Describe a bit about your product.</p>
                                <textarea placeholder="Minimum words should be 100" name="" id="" cols="30" rows="6"></textarea>
                            </section>
                        </div>
                    </div>

                    <div className="form_2">
                        <div className="illustrationArea">
                            <img src={product2} alt="" />
                        </div>
                        <div className="form2_Fields">
                            <section>
                                <p>4. What type of Business product you have?</p>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        displayEmpty
                                        value={personName}
                                        onChange={handleChangePerson}
                                        input={<Input />}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>;
                                            }

                                            return selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                    >

                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox color="primary" checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </section>
                            <section>
                                <p>5. What's your good team size?</p>
                                {/* <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={businesstype} onChange={handleChangeBusinessType}>
                                        <FormControlLabel value="female" control={<BlueRadio />} label="0-10" />
                                        <FormControlLabel value="male" control={<BlueRadio />} label="10-50" />
                                        <FormControlLabel value="other" control={<BlueRadio />} label="5O-100" />
                                        <FormControlLabel value="others" control={<BlueRadio />} label="More" />
                                    </RadioGroup>
                                </FormControl> */}
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={businesstype}
                                        onChange={handleChangeBusinessType}
                                        displayEmpty
                                        className={classes.inputField}
                                    >
                                        <MenuItem value="">
                                            <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>
                                        </MenuItem>
                                        <MenuItem value={10}>01-10</MenuItem>
                                        <MenuItem value={20}>10-50</MenuItem>
                                        <MenuItem value={30}>50-100</MenuItem>
                                        <MenuItem value={40}>More</MenuItem>
                                    </Select>
                                </FormControl>
                            </section>
                            <section>
                                <p>6. Total revenue generated till now?</p>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={revenueGenerated}
                                        onChange={handleChangeRevenueGenerated}
                                        displayEmpty
                                        className={classes.inputField}
                                    >
                                        <MenuItem value="">
                                            <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>
                                        </MenuItem>
                                        <MenuItem value={10}>$ 0-1000</MenuItem>
                                        <MenuItem value={20}>$ 1000-10k</MenuItem>
                                        <MenuItem value={30}>More</MenuItem>
                                    </Select>
                                </FormControl>
                            </section>

                            <section>
                                <p>7. Which business modal is your product have?</p>
                                <div className="radioGroupButtons">

                                    {
                                        businessModal.map((value, index) => {
                                            return (
                                                <div className="radioButton" onClick={() => handleBusinnesModal(index)}>
                                                    <span>
                                                        {value?.status == true ? <div></div> : null}
                                                    </span>
                                                    <h6>{value?.value}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                    </div>


                    <div className="form_3">
                        <div className="form3_Fields">
                            <section className="previousFunding">
                                <p>8. Any previous funding?</p>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={previousFunding} onChange={handleChangePreviousFunding}>
                                        <FormControlLabel value="yes" control={<BlueRadio />} label="YES" />
                                        <FormControlLabel value="no" control={<BlueRadio />} label="NO" />

                                    </RadioGroup>
                                </FormControl>

                            </section>
                            {
                                previousFunding == 'yes' ? <section className="amountRaised">
                                    <span>How much amount have you raised yet?</span>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={moneyRaised}
                                            onChange={handleChangeMoneyRaised}
                                            displayEmpty
                                            className={classes.inputField}
                                        >
                                            <MenuItem value="">
                                                <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>
                                            </MenuItem>
                                            <MenuItem value={10}>$ 0-1000</MenuItem>
                                            <MenuItem value={20}>$ 1000-10k</MenuItem>
                                            <MenuItem value={30}>More</MenuItem>
                                        </Select>
                                    </FormControl>
                                </section> : null
                            }

                            <section class="currentStage">
                                <p>9. What is the current stage of product?</p>
                                <div className="currentStageRadios">
                                    {
                                        currentStage.map((value, index) => {
                                            return (
                                                <div style={{ borderColor: value.status == true ? '#2E86C1' : null }} className="radioButton" onClick={() => handleCurrentStage(index)}>
                                                    <span>
                                                        {value?.status == true ? <div></div> : null}
                                                    </span>
                                                    <h6>{value?.value}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </section>

                            <section>
                                <p>10. How many customer you have accquired?</p>
                                <input type="number" min="0" placeholder="value should be numeric value" />
                            </section>

                            <section>
                                <p>11. How many active users are there ?</p>
                                <input type="number" placeholder="value should be numeric value" />
                            </section>


                        </div>
                        <div className="illustrationArea">
                            <img src={product3} alt="" />
                        </div>
                    </div>


                    <div className="form_4">
                        <div className="illustrationArea">
                            <img src={product4} alt="" />
                        </div>
                        <div className="form4_Fields">
                            <section>
                                <p>12. Your Company Location</p>
                                <input type="text" placeholder="Type here..." />
                            </section>
                            <section>
                                <p>13. When was your product started?</p>
                                <input type="date" name="" id="" />
                            </section>
                            <section>
                                <p>14. Any feature link?</p>
                                <input type="text" placeholder="Type here..." name="" id="" />
                            </section>
                            <section>
                                <p>15. Any Platform link?</p>
                                <input type="text" placeholder="Type here..." name="" id="" />
                            </section>
                        </div>
                    </div>

                    <div className="form_5">

                        <div className="form5_Fields">
                            <section>
                                <p>16. Founders of this product</p>

                                <div className="">
                                    <div className="founder_Link" >
                                        <input
                                            type="text"
                                            placeholder={`Founder 1 Linkedin Profile Link`}
                                            onChange={e => handleChangeLink(0, e)}
                                        />
                                        <button type="button" onClick={() => handleAdd()}>
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                {fields.map((field, idx) => {
                                    return (
                                        <div className="founderLink" key={`${field}-${idx}`}>
                                            <input
                                                type="text"
                                                placeholder={`Founder ${idx + 2} Linkedin Profile Link`}
                                                onChange={e => handleChangeLink(idx + 1, e)}
                                            />
                                            <div onClick={() => handleRemove(idx)}>
                                                <i class="fa fa-times" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>
                        </div>
                        <div className="illustrationArea">
                            <img src={product5} alt="" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="submitButton">
                <div className="innerSubmitButton">
                    <div className="subbutton" onClick={() => window.location.href = "/product-agencies"} >
                        <p>Upload Your Product <i class="fa fa-hand-pointer-o" aria-hidden="true"></i></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductForm
