import React, { useState, useEffect } from "react";
import "./ProductForm.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../../Dashboard/Navbar";
import instance from '../../../Constants/axiosConstants';
import Spinner from '../../../Components/Spinner/Spinner';
import * as helper from '../../../shared/helper';

import product from "../../../assets/images/ClientDashboard/product.svg";
import product1 from "../../../assets/images/ClientDashboard/product1.svg";
import product2 from "../../../assets/images/ClientDashboard/product2.svg";
import product3 from "../../../assets/images/ClientDashboard/product3.svg";
import product4 from "../../../assets/images/ClientDashboard/product4.svg";
import product5 from "../../../assets/images/ClientDashboard/product5.svg";
import success from "../../../assets/images/agencyForm/success.gif";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const BlueRadio = withStyles({
  root: {
    color: "#2E86C1",
    "&$checked": {
      color: "#2E86C1",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  menuFont: {
    fontFamily: "Poppins",
  },
  inputField: {
    fontFamily: "Poppins",
  },
  radioBox: {
    borderWidth: 1,
    borderColor: "#000",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  getContentAnchorEl: () => null,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Ed-Tech",
//   "IT",
//   "Travel",
//   "CRM",
//   "Food Delivery",
//   "E-commerce",
//   "Fintech",
//   "HealthCare",
// ];
const fundType = [
  "SEED",
  "SERIES-A",
  "SERIES-B",
  "SERIES-C",
  "VENTURE-ROUND",
  "ANGEL",
  "CORPORATE-ROUND",
  "DEBT-FINANCING",
  "EQUITY-CROWDFUNDING",
  "GRANT",
  "PRE-SEED",
];
const arr = [
  {
    status: false,
    value: "B2B",
  },
  {
    status: false,
    value: "B2C",
  },
  {
    status: false,
    value: "B2B2C",
  },
  {
    status: false,
    value: "B2G",
  },
];
const brr = [
  {
    status: false,
    value: "Idea",
  },
  {
    status: false,
    value: "Development",
  },
  {
    status: false,
    value: "MVP",
  },
  {
    status: false,
    value: "Running in Market",
  },
];

function ProductForm() {
  const [fundingMoneyRaised, setMoneyRaised] = useState("");
  const [businessModal, setBusinesmodal] = useState(arr);
  const [currentStage, setCurrentStage] = useState(brr);
  const [fields, setFields] = useState([{ value: null }]);
  const [openmodal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null);
  const [allDomainsData, setAllDomainsData] = useState([]);
  const [businesstype, setBusinesstype] = useState([]);

  const [domainName, setDomainName] = useState('');

  const [errors, setErrors] = useState({});


  const [apiData, setApiData] = useState({
    agencyId: localStorage.getItem("userId"),
    productName: "",
    productLogo: "",
    productDescription: "",
    productDomain: "",
    productTeamSize: "",
    productRevenueGenerated: "",
    productBusinessModel: "",
    productPreviousFunding: "",
    productFundingTypeLookingFor: "",
    productCurrentStatus: "",
    productCustomerAccquired: "",
    productActiveUsers: "",
    productCompanyLocation: "",
    productStartingDate: Date.now(),
    productFeatureLink: "",
    productPlatformLink: "",
    productFounderLinkedinProfiles: [],
  });
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const classes = useStyles();

  const Role = "agency"

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
    // setBusinesstype(value);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
    setBusinesstype(value);
    setDomainName(value);
  };

  const getAllDomains = () => {
    setLoading(true);
    instance.get(`api/${Role}/domains/all`)
      .then(function (response) {
        console.log(response);
        setAllDomainsData(response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllDomains()
  }, [])

  function handleChangeLink(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    console.log(values);
    setFields(values);
    setApiData({ ...apiData, productFounderLinkedinProfiles: values.map((link) => link.value) })
  }

  function handleAdd() {
    const values = [...fields, { value: "" }];
    console.log(values);
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const handleBusinnesModal = (id) => {
    if (businessModal[id].status === false) {
      let newarr = [...businessModal];
      newarr.map(function (x) {
        x.status = false;
        return x;
      });
      setApiData({ ...apiData, productBusinessModel: newarr[id].value });
      newarr[id].status = true;

      setBusinesmodal(newarr);
    } else {
      let newarr = [...businessModal];
      newarr[id].status = false;
      setApiData({ ...apiData, productBusinessModel: "" });
      setBusinesmodal(newarr);
    }
  };

  const handleCurrentStage = (id) => {
    if (currentStage[id].status === false) {
      let newarr = [...currentStage];
      newarr.map(function (x) {
        x.status = false;
        return x;
      });
      setApiData({ ...apiData, productCurrentStatus: newarr[id].value });
      newarr[id].status = true;

      setCurrentStage(newarr);
    } else {
      let newarr = [...currentStage];
      // arr = arr;
      newarr.map(function (x) {
        x.status = false;
        return x;
      });
      setApiData({ ...apiData, productCurrentStatus: "" });
      setCurrentStage(newarr);
    }
  };

  const inputFileChoosen = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }

  const updateButtonHandler = () => {
    setLoading(true)
    console.log(file);
    const formData = new FormData();

    file && formData.append(
      "files",
      file,
      "file"
    );

    instance.post(`api/${Role}/media/create`, formData)
      .then(function (response) {
        console.log(response)
        setApiData({
          ...apiData,
          productLogo: response[0].mediaURL
        })
        setLoading(false)
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const validateInfo = () => {
    const err = {}

    if (apiData.productName.length < 3) {
      err.productName = "Name required"
    }

    if (apiData.productDescription.length < 10) {
      err.productDescription = 'Description required'
    }

    if (apiData.productDomain === '') {
      err.productDomain = 'Domain required'
    }

    if (apiData.productTeamSize === '') {
      err.productTeamSize = "Team Size required"
    }

    if (apiData.productRevenueGenerated === '') {
      err.productRevenueGenerated = 'Revenue required'
    }

    if (apiData.productBusinessModel === '') {
      err.productBusinessModel = "Business Model required"
    }

    if (apiData.productPreviousFunding === '') {
      err.productPreviousFunding = 'Previous Funding required'
    }

    if (apiData.productFundingTypeLookingFor === '') {
      err.productFundingTypeLookingFor = "Funding type required"
    }

    if (apiData.productCurrentStatus === '') {
      err.productCurrentStatus = "Current status required"
    }

    if (apiData.productCustomerAccquired === '') {
      err.productCustomerAccquired = "Customer field required"
    }

    if (apiData.productActiveUsers === '') {
      err.productActiveUsers = "Active users required"
    }

    if (apiData.productCompanyLocation === '') {
      err.productCompanyLocation = "Company Location required"
    }

    if (apiData.productFeatureLink === "") {
      err.productFeatureLink = 'Feature Link required'
    }

    if (!helper.validateLink(apiData.productFeatureLink)) {
      err.productFeatureLink = 'Wrong Feature link Provided'
    }

    if (apiData.productPlatformLink === "") {
      err.productPlatformLink = 'Platform Link required'
    }

    if (!helper.validateLink(apiData.productPlatformLink)) {
      err.productPlatformLink = 'Wrong Platform link Provided'
    }

    if (fields[0].value === null) {
      err.productFounderLinkedinProfiles = 'Founder link is required.'
    }

    if (!helper.validateLink(fields[0].value)) {
      err.productFounderLinkedinProfiles = 'Invalid link provided.'
    }
    setErrors(err);
    if (Object.keys(err).length === 0)
      return true
    else
      return false

  }

  const uploadProduct = () => {
    console.log(apiData)

    if (validateInfo()) {
      setLoading(true);
      instance.post(`api/${Role}/products/create`, apiData)
        .then(response => {
          setLoading(false);
          onOpenModal();
          console.log(response);
        })
        .catch(error => {
          setLoading(false);
        })
    }
    else {
      console.log(errors)
    }
  }

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);
  return (
    <>
      <Navbar />
      {loading && <Spinner />}
      <div className="mainProductForm">
        <div className="innerProductForm">
          <div className="leftBorderLineProduct"></div>
          <div className="productTagLine">
            <h1>
              we focus on <br /> Your Story
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              beatae quibusdam pariatur est quas id. Lorem, ipsum dolor sit amet
            </p>
          </div>
          <div className="productIllustration">
            <div>
              <img src={product} alt="product" />
            </div>
          </div>
        </div>
      </div>

      <div className="productsHeadlines">
        <div className="innerProductHeadlines">
          <h3>
            {" "}
            <span> Clients </span> want to know your product..!!{" "}
          </h3>
          <p>
            Fill the form below so that client will know the details of your
            product.
          </p>
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
                <input
                  onChange={inputFileChoosen}
                  type="file"
                  name=""
                  id="fileInput"
                  accept="image/png, image/gif, image/jpeg"
                />
                <button style={{ margin: 0 }} onClick={updateButtonHandler}>Update</button>
              </section>
              <section>
                <p>2. What's your good product name?</p>
                <input
                  type="text"
                  placeholder="Type Here.."
                  name="productName"
                  value={apiData.productName}
                  onChange={handleChange}
                />
                {errors.productName && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productName}</p>}
              </section>
              <section>
                <p>3. Describe a bit about your product.</p>
                <textarea
                  placeholder="Minimum words should be 100"
                  name="productDescription"
                  value={apiData.productDescription}
                  onChange={handleChange}
                  cols="30"
                  rows="6"
                  maxLength='100'
                ></textarea>
                {errors.productDescription && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productDescription}</p>}
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
                    id="demo-checkbox"
                    name="productDomain"
                    // multiple
                    displayEmpty
                    value={domainName}
                    onChange={(event) => handleSelectChange(event)}
                    input={<Input />}
                    renderValue={(selected) => {
                      if (selected === '') {
                        return (
                          <span
                            style={{ fontFamily: "Poppins", color: "#999" }}
                          >
                            Select from here
                          </span>
                        );
                      }
                      return allDomainsData.filter(ad => selected.includes(ad._id)).map(t => t.domainName).join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {allDomainsData.map((ad) => (
                      <MenuItem key={ad._id} value={ad._id}>
                        <Checkbox
                          color="primary"
                          checked={businesstype.indexOf(ad._id) > -1}
                        />
                        <ListItemText primary={ad.domainName} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.productDomain && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productDomain}</p>}
                </FormControl>
              </section>
              <section>
                <p>5. What's your good team size?</p>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={apiData.productTeamSize}
                    name="productTeamSize"
                    onChange={(event) => handleChange(event)}
                    displayEmpty
                    className={classes.inputField}
                  >
                    <MenuItem value="">
                      <span style={{ fontFamily: "Poppins", color: "#999" }}>
                        Select from here
                      </span>
                    </MenuItem>
                    <MenuItem value={"1-10"}>01-10</MenuItem>
                    <MenuItem value={"10-50"}>10-50</MenuItem>
                    <MenuItem value={"50-100"}>50-100</MenuItem>
                    <MenuItem value={"more"}>More</MenuItem>
                  </Select>
                  {errors.productTeamSize && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productTeamSize}</p>}
                </FormControl>
              </section>
              <section>
                <p>6. Total revenue generated till now?</p>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={apiData.productRevenueGenerated}
                    name="productRevenueGenerated"
                    onChange={(event) => handleChange(event)}
                    displayEmpty
                    className={classes.inputField}
                  >
                    <MenuItem value="">
                      <span style={{ fontFamily: "Poppins", color: "#999" }}>
                        Select from here
                      </span>
                    </MenuItem>
                    <MenuItem value={"0-1000"}>$ 0-1000</MenuItem>
                    <MenuItem value={"1000-10000"}>$ 1000-10k</MenuItem>
                    <MenuItem value={"more"}>More</MenuItem>
                  </Select>
                  {errors.productRevenueGenerated && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productRevenueGenerated}</p>}
                </FormControl>
              </section>

              <section>
                <p>7. Which business modal does your product have?</p>
                <div className="radioGroupButtons">
                  {businessModal.map((value, index) => {
                    return (
                      <div
                        className="radioButton"
                        onClick={() => handleBusinnesModal(index)}
                      >
                        <span>
                          {value?.status === true ? <div></div> : null}
                        </span>
                        <h6>{value?.value}</h6>
                      </div>
                    );
                  })}
                </div>
                {errors.productBusinessModel && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productBusinessModel}</p>}
              </section>
            </div>
          </div>

          <div className="form_3">
            <div className="form3_Fields">
              <section className="previousFunding">
                <p>8. Any previous funding?</p>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="productPreviousFunding"
                    value={apiData.productPreviousFunding}
                    onChange={(event) => handleChange(event)}
                  >
                    <FormControlLabel
                      value="true"
                      control={<BlueRadio />}
                      label="YES"
                    />
                    <FormControlLabel
                      value="false"
                      control={<BlueRadio />}
                      label="NO"
                    />
                  </RadioGroup>
                </FormControl>
                {errors.productPreviousFunding && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productPreviousFunding}</p>}
              </section>
              {apiData.productPreviousFunding === "true" ? (
                <section className="amountRaised">
                  <span>How much amount have you raised yet?</span>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={apiData.fundingMoneyRaised}
                      name="fundingMoneyRaised"
                      onChange={(event) => handleChange(event)}
                      displayEmpty
                      className={classes.inputField}
                    >
                      <MenuItem value="">
                        <span style={{ fontFamily: "Poppins", color: "#999" }}>
                          Select from here
                        </span>
                      </MenuItem>
                      <MenuItem value={10}>$ 0-1000</MenuItem>
                      <MenuItem value={20}>$ 1000-10k</MenuItem>
                      <MenuItem value={30}>More</MenuItem>
                    </Select>
                  </FormControl>
                </section>
              ) : null}
              <section className="previousFunding">
                <p>9. Which type of funding you are looking for?</p>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={apiData.productFundingTypeLookingFor}
                    name="productFundingTypeLookingFor"
                    onChange={(event) => handleChange(event)}
                    displayEmpty
                    className={classes.inputField}
                  >
                    <MenuItem value="">
                      <span style={{ fontFamily: "Poppins", color: "#999" }}>
                        Select from here
                      </span>
                    </MenuItem>
                    <MenuItem value={"Seed"}>SEED</MenuItem>
                    <MenuItem value={"Series-A"}>SERIES-A</MenuItem>
                    <MenuItem value={"Series-B"}>SERIES-B</MenuItem>
                    <MenuItem value={"Series-C"}>SERIES-C</MenuItem>
                    <MenuItem value={"Venture-Round"}>VENTURE-ROUND</MenuItem>
                    <MenuItem value={"Angel"}>Angel</MenuItem>
                    <MenuItem value={"Corporate-Round"}>
                      Corporate-Round
                    </MenuItem>
                    <MenuItem value={"Debt-Financing"}>DEBT-FINANCING</MenuItem>
                    <MenuItem value={"Equity-Crowdfunding"}>
                      EQUITY-CROWDFUNDING
                    </MenuItem>
                    <MenuItem value={"Grant"}>Grant</MenuItem>
                    <MenuItem value={"Pre-Seed"}>Pre-Seed</MenuItem>
                  </Select>
                </FormControl>
                {errors.productFundingTypeLookingFor && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productFundingTypeLookingFor}</p>}
              </section>

              <section class="currentStage">
                <p>10. What is the current stage of product?</p>
                <div className="currentStageRadios">
                  {currentStage.map((value, index) => {
                    return (
                      <div
                        style={{
                          borderColor: value.status === true ? "#2E86C1" : null,
                        }}
                        className="radioButton"
                        onClick={() => handleCurrentStage(index)}
                      >
                        <span>
                          {value?.status === true ? <div></div> : null}
                        </span>
                        <h6>{value?.value}</h6>
                      </div>
                    );
                  })}
                </div>
                {errors.productCurrentStatus && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productCurrentStatus}</p>}
              </section>

              <section>
                <p>11. How many customer you have accquired?</p>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="productCustomerAccquired"
                    value={apiData.productCustomerAccquired}
                    onChange={(event) => handleChange(event)}
                    displayEmpty
                    className={classes.inputField}
                  >
                    <MenuItem value="">
                      <span style={{ fontFamily: "Poppins", color: "#999" }}>
                        Select from here
                      </span>
                    </MenuItem>
                    <MenuItem value={"0-100"}>0-100</MenuItem>
                    <MenuItem value={"100-200"}>100-200</MenuItem>
                    <MenuItem value={"200-300"}>200-300</MenuItem>
                    <MenuItem value={"More than 300"}>More than 300</MenuItem>
                  </Select>
                  {errors.productCustomerAccquired && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productCustomerAccquired}</p>}
                </FormControl>
              </section>

              <section>
                <p>12. How many active users are there ?</p>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={apiData.productActiveUsers}
                    name="productActiveUsers"
                    onChange={(event) => handleChange(event)}
                    displayEmpty
                    className={classes.inputField}
                  >
                    <MenuItem value="">
                      <span style={{ fontFamily: "Poppins", color: "#999" }}>
                        Select from here
                      </span>
                    </MenuItem>
                    <MenuItem value={"0-100"}>0-100</MenuItem>
                    <MenuItem value={"100-200"}>100-200</MenuItem>
                    <MenuItem value={"200-300"}>200-300</MenuItem>
                    <MenuItem value={"More than 300"}>More than 300</MenuItem>
                  </Select>
                  {errors.productActiveUsers && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productActiveUsers}</p>}
                </FormControl>
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
                <p>13. Your Company Location</p>
                <input
                  type="text"
                  placeholder="Type here..."
                  name="productCompanyLocation"
                  value={apiData.productCompanyLocation}
                  onChange={handleChange}
                />
                {errors.productCompanyLocation && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productCompanyLocation}</p>}
              </section>
              <section>
                <p>14. When was your product started?</p>
                <input
                  type="date"
                  name="productStartingDate"
                  value={apiData.productStartingDate}
                  onChange={handleChange}
                />
              </section>
              <section>
                <p>15. Any feature link?</p>
                <input
                  type="text"
                  placeholder="Type here..."
                  name="productFeatureLink"
                  value={apiData.productFeatureLink}
                  onChange={handleChange}
                />
                {errors.productFeatureLink && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productFeatureLink}</p>}
              </section>
              <section>
                <p>16. Any Platform link?</p>
                <input
                  type="text"
                  placeholder="Type here..."
                  name="productPlatformLink"
                  value={apiData.productPlatformLink}
                  onChange={handleChange}
                />
                {errors.productPlatformLink && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productPlatformLink}</p>}
              </section>
            </div>
          </div>

          <div className="form_5">
            <div className="form5_Fields">
              <section>
                <p>17. Founders of this product</p>

                <div className="">
                  <div className="founder_Link">
                    <input
                      type="text"
                      placeholder={`Founder 1 Linkedin Profile Link`}
                      onChange={(e) => handleChangeLink(0, e)}
                    />
                    <button type="button" onClick={() => handleAdd()}>
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                {errors.productFounderLinkedinProfiles && <p style={{ color: 'red', fontWeight: 'normal', fontSize: '14px' }}>{errors.productFounderLinkedinProfiles}</p>}
                {fields.map((field, idx) => {
                  if (idx === 0) {
                    return ""
                  }
                  else {

                    return (
                      <div className="founderLink" key={`${field}-${idx}`}>
                        <input
                          type="text"
                          placeholder={`Founder ${idx + 1} Linkedin Profile Link`}
                          onChange={(e) => handleChangeLink(idx, e)}
                        />
                        <div onClick={() => handleRemove(idx)}>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                      </div>
                    );
                  }
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
          <div className="subbutton" onClick={uploadProduct}>
            <p>
              Upload Your Product{" "}
              <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={openmodal}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        classNames={{
          overlay: "NavbarModalLayer",
          modal: "NavbarModalStyle",
        }}
        center
      >
        <h2 className="addyourproductext">Your Product</h2>
        <div className="successfullProduct">
          <div className="successImage">
            <div>
              <img src={success} alt="" />
            </div>
          </div>
          <div className="successfullyText">
            <p>Your product has been successfully uploaded.</p>
            <span>Wait for the client to response.</span>
          </div>
        </div>
        <div className="modalButton">
          <button onClick={() => (window.location.href = "/agency-profile")}>
            Go to Profile
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProductForm;
