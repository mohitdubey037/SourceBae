import React, { useState } from 'react'
import './ProductForm.css'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

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
    const [businesstype, setBusinesstype] = React.useState('female');
    const [businessModal, setBusinesmodal] = useState(arr);
    const [previousFunding, setPreviousFunding] = useState('no');
    const [stage, setStage] = useState('idea');
    const [fields, setFields] = useState([{ value: null }]);


    const handleChangeBusinessType = (event) => {
        setBusinesstype(event.target.value);
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

    return (
        <>
            <div className='mainProductForm'>
                <div className="innerProductForm">
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
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={businesstype} onChange={handleChangeBusinessType}>
                                        <FormControlLabel value="female" control={<BlueRadio />} label="Fintech" />
                                        <FormControlLabel value="male" control={<BlueRadio />} label="E-commerce" />
                                        <FormControlLabel value="other" control={<BlueRadio />} label="Healthcare" />
                                        <FormControlLabel value="disabled" control={<BlueRadio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </section>
                            <section>
                                <p>5. What's your good team size?</p>
                                <input min="1" type="number" placeholder="Type only numeric value.." />
                            </section>
                            <section>
                                <p>6. Total revenue generated till now?</p>
                                <input placeholder="money should be in INR" type="number" />
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
                                    <input min="0" type="number" placeholder="Money should be in INR" />
                                </section> : null
                            }

                            <section>
                                <p>9. What is the current stage of product?</p>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={stage} onChange={handleChangeStage}>
                                        <FormControlLabel value="idea" control={<BlueRadio />} label="Idea" />
                                        <FormControlLabel value="developmet" control={<BlueRadio />} label="Development" />
                                        <FormControlLabel value="mvp" control={<BlueRadio />} label="MVP" />
                                        <FormControlLabel value="rim" control={<BlueRadio />} label="Running in Market" />

                                    </RadioGroup>
                                </FormControl>
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
                                <button type="button" onClick={() => handleAdd()}>
                                    + Add More Fields
                                </button>

                                {fields.map((field, idx) => {
                                    return (
                                        <div className="founderLink" key={`${field}-${idx}`}>
                                            <input
                                                type="text"
                                                placeholder={`Founder ${idx + 1} Linkedin Profile Link`}
                                                onChange={e => handleChangeLink(idx, e)}
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
                    <div className="subbutton">
                        <p>Upload Your Product <i class="fa fa-hand-pointer-o" aria-hidden="true"></i></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductForm
