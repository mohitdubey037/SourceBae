/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { FilePicker } from 'react-file-picker'

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import instance from "../../../Constants/axiosConstants";
import Spinner from "../../../Components/Spinner/Spinner";
import form1 from "../../../assets/images/Newestdashboard/ProductForm/product form1.svg"
import form2 from "../../../assets/images/Newestdashboard/ProductForm/product form2.svg"
import form3 from "../../../assets/images/Newestdashboard/ProductForm/product form3.svg"
import form4 from "../../../assets/images/Newestdashboard/ProductForm/product form4.svg"
import * as helper from "../../../shared/helper";
import moment from 'moment'
import clsx from 'clsx';

import fileIcon from '../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import success from "../../../assets/images/agencyForm/success.gif";
import Back from '../../../Components/Back/Back';

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const BlueRadio = withStyles({
  root: {
    // width: "1.2rem",
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
    width: "70%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  check: {
    fontSize: "0.7rem",
    fontFamily: 'Segoe UI',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  menuFont: {
    fontFamily: "Segoe UI",
  },
  inputField: {
    fontFamily: "Segoe UI",
    border: "1px solid #45A4EA",
    borderRadius: "5px",
    marginTop: "0.2rem",
    marginLeft: "1rem",
    width: "100%",
  },
  radioBox: {
    borderWidth: 1,
    borderColor: "#000",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      color: "green",
      padding: "11.5px 14px"
    },
    "& .MuiTypography-body1": {
      fontFamily: 'Segoe UI',
      fontSize: '12px'
    },
    "& MuiMenuItem": {
      fontSize: "0.8rem"
    }
  }
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

function ProductForm(props) {
  const [businessModal, setBusinesmodal] = useState(arr);
  const [currentStage, setCurrentStage] = useState(brr);
  const [fields, setFields] = useState([{ value: null }]);
  const [openmodal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [allDomainsData, setAllDomainsData] = useState([]);
  // const [businesstype, setBusinesstype] = useState([]);
  const [wordsRequired, setWordsRequired] = useState(100);

  const [multipleSelectTech, setMultipleSelect] = useState([]);

  const [domainName, setDomainName] = useState("");

  const [errors, setErrors] = useState({});

  const [apiData, setApiData] = useState({
    agencyId: localStorage.getItem("userId"),
    productName: "",
    productLogo: "",
    productDescription: "",
    productDomainId: "",
    productTeamSize: "",
    productRevenueGenerated: "",
    productBusinessModel: "",
    productPreviousFunding: "",
    projectPreviousFundingRaised: "",
    productFundingTypeLookingFor: "",
    productCurrentStatus: "",
    productCustomerAccquired: "",
    productActiveUsers: "",
    productCompanyLocation: "",
    productStartingDate: moment().format("YYYY-MM-DD"),
    productFeatureLink: "",
    productPlatformLink: "",
    productFounderLinkedinProfiles: [],
  });
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const classes = useStyles();

  // const Role = "agency";
  const Role = localStorage.getItem('role');


  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };
  const handleDescChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (apiData.productDescription === '') {
      setWordsRequired(100);
    }
    else {
      let ab = apiData.productDescription.split(' ');
      console.log(ab);
      setWordsRequired(100 - ab.length); // add 1 to totalsoFar to account for extra space since 1 space = 2 words
    }
  }, [apiData.productDescription])

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
    // setBusinesstype(value);
    setDomainName(value);
  };

  useEffect(() => {
    console.log(multipleSelectTech);
    setApiData({
      ...apiData,
      'productDomainId': multipleSelectTech.map(t => t.value)
    });
  }, [multipleSelectTech])

  useEffect(() => {
    console.log(apiData);
  }, [apiData])

  const getAllDomains = () => {
    setLoading(true);
    instance
      .get(`api/${Role}/domains/all`)
      .then(function (response) {
        console.log(response);
        setAllDomainsData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllDomains();
    setErrors({})
  }, []);

  function handleChangeLink(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    setApiData({
      ...apiData,
      productFounderLinkedinProfiles: values.map((link) => link.value),
    });
  }

  function handleAdd() {
    const values = [...fields, { value: "" }];
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
    console.log("e", e)
    setFile(e);
  };


  function validateInfo() {
    const err = {};

    if (apiData.productName.length < 3) {
      err.productName = "Name required";
    }

    if (apiData.productDescription.length < 100) {
      err.productDescription =
        "Description should be of minimum 100 characters.";
    }

    if (apiData.productDomainId === "") {
      err.productDomainId = "Domain required";
    }

    if (apiData.productTeamSize === "") {
      err.productTeamSize = "Team Size required";
    }

    if (apiData.productRevenueGenerated === "") {
      err.productRevenueGenerated = "Revenue required";
    }

    if (apiData.productBusinessModel === "") {
      err.productBusinessModel = "Business Model required";
    }

    if (apiData.productPreviousFunding === "") {
      err.productPreviousFunding = "Previous Funding required";
    }

    if (apiData.productPreviousFunding === "true" && apiData.projectPreviousFundingRaised === "") {
      err.fundingMoneyRaised = "Funding Money Raised is Required.";
    }
    if (apiData.productFundingTypeLookingFor === "") {
      err.productFundingTypeLookingFor = "Funding type Required.";
    }

    if (apiData.productCurrentStatus === "") {
      err.productCurrentStatus = "Current status Required.";
    }

    if (apiData.productCustomerAccquired === "") {
      err.productCustomerAccquired = "Customer field Required.";
    }

    if (apiData.productActiveUsers === "") {
      err.productActiveUsers = "Active users Required.";
    }

    if (apiData.productCompanyLocation === "") {
      err.productCompanyLocation = "Company Location Required.";
    }

    if (apiData.productPlatformLink !== "" && !helper.validateLink(apiData.productPlatformLink)) {
      err.productPlatformLink = "Wrong Platform link Provided";
    }

    if (apiData.productFounderLinkedinProfiles.length === 0) {
      err.productFounderLinkedinProfiles = "Please add atleast one founder profile."
    }

    if (apiData.productFounderLinkedinProfiles.length === 0) {
      err.productFounderLinkedinProfiles = "Please add atleast one founder profile."
    }

    if (apiData.productFounderLinkedinProfiles.length > 0) {
      apiData.productFounderLinkedinProfiles.forEach((a, index) => {
        if (a === '') {
          err.productFounderLinkedinProfiles = `LinkedIn url of product founder ${index + 1} is empty`
        }
        else if (!helper.validateLinkedIn(a)) {
          err.productFounderLinkedinProfiles = `LinkedIn url of product founder ${index + 1} is wrong`;
        }
        else {
          console.log('validated');
        }
      })
    }

    if (file === null) {
      err.filePicked = "Please pick up a logo for the Product";
    }
    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    else return false;
  };

  const updateButtonHandler = () => {
    if (validateInfo()) {
      setLoading(true);
      const formData = new FormData();

      file !== null && formData.append("files", file, file?.name);

      instance
        .post(`api/${Role}/media/create`, formData)
        .then(function (response) {
          setApiData({
            ...apiData,
            productLogo: response[0].mediaURL,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const uploadProduct = () => {
    if (validateInfo()) {
      setLoading(true);
      instance
        .post(`api/${Role}/products/create`, apiData)
        .then((response) => {
          setLoading(false);
          onOpenModal();
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      console.error(errors);
    }
  };

  useEffect(() => {
    if (apiData.productLogo !== "") {
      uploadProduct()
    }
  }, [apiData]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="productForm_parent">
            <Back name="Product Form " />
            <div className="productsHeadlines">
              <div className="innerProductHeadlines">
                <h3>
                  <span> Clients </span> want to know your product..!!
                </h3>
                <p>
                  Fill the form below so that client will know the details of your
                  product.
                </p>
              </div>
            </div>

            <div className="mainProductFormArea">
              <div className="innerProductFormArea productForm">
                <div className="form_1">
                  <div className="form1_Fields">
                    <section>
                      <ul>
                        <li>
                          <p>Upload your latest logo of product</p>
                        </li>
                      </ul>
                      <FilePicker
                        extensions={['jpg', 'png', 'jpeg']}
                        onChange={inputFileChoosen}
                        onError={errMsg => toast.error(errMsg)}
                      >
                        <button className="filePicker">
                          <p style={{ marginTop: "0", color: "#707070", fontFamily: "Segoe UI", fontSize: "14px" }}>{file ? file.name : 'pick file'}</p>
                          <img src={fileIcon} alt="finish" />
                        </button>
                      </FilePicker>
                      {errors.filePicked && (
                        <p className="error_productForm">
                          {errors.filePicked}
                        </p>
                      )}
                    </section>
                    <section>
                      <ul>
                        <li>
                          <p>What's your good product name?</p>
                        </li>
                      </ul>
                      <input
                        type="text"
                        placeholder="Type Here.."
                        name="productName"
                        value={apiData.productName}
                        onChange={handleChange}
                      />
                      {errors.productName && (
                        <p className="error_productForm">
                          {errors.productName}
                        </p>
                      )}
                    </section>
                    <section>
                      <ul>
                        <li>
                          <p>Describe a bit about your product.</p>
                        </li>
                      </ul>
                      <textarea
                        placeholder="Minimum words should be 100"
                        name="productDescription"
                        value={apiData.productDescription}
                        onChange={handleDescChange}
                        cols="30"
                        rows="6"
                      ></textarea>
                      <div className="character_specification">
                        <p style={{ marginTop: "0" }}>More than 100 characters</p>
                        <p style={{ marginTop: "0" }}>{wordsRequired} words required</p>
                      </div>
                      {errors.productDescription && (
                        <p className="error_productForm">
                          {errors.productDescription}
                        </p>
                      )}
                    </section>

                  </div>
                  <div className="image_div">
                    <img className="image_div_child" src={form1} />
                  </div>
                </div>

                <div className="form_2">
                  <div className="form2_Fields">
                    <section>
                      <ul>
                        <li>
                          <p>What type of Business product you have?</p>
                        </li>
                      </ul>

                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={domainName}
                          name="productDomainId"
                          onChange={(event) => handleSelectChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span style={{ fontSize: "14px", color: "#707070", marginTop: "0.2rem", fontFamily: "Segoe UI" }}>
                              Select From here
                            </span>
                          </MenuItem>
                          {allDomainsData.map((ad) => (
                            <MenuItem key={ad._id} value={ad._id}>
                              {ad.domainName}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.productDomainId && (
                          <p className="error_productForm">
                            {errors.productDomainId}
                          </p>
                        )}
                      </FormControl>
                    </section>
                    <section>
                      <ul>
                        <li>
                          <p>What's your good team size?</p>
                        </li>
                      </ul>
                      <FormControl className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={apiData.productTeamSize}
                          name="productTeamSize"
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span style={{ fontFamily: "Segoe UI", color: "#707070", marginTop: "0.2rem", fontSize: '14px' }} className="selectFromHere">
                              Select from here
                            </span>
                          </MenuItem>
                          <MenuItem value={"1-10"}>01-10</MenuItem>
                          <MenuItem value={"10-50"}>10-50</MenuItem>
                          <MenuItem value={"50-100"}>50-100</MenuItem>
                          <MenuItem value={"more"}>More</MenuItem>
                        </Select>
                        {errors.productTeamSize && (
                          <p className="error_productForm">
                            {errors.productTeamSize}
                          </p>
                        )}
                      </FormControl>
                    </section>
                    <section>
                      <ul>
                        <li>
                          <p>Total revenue generated till now?</p>
                        </li>
                      </ul>
                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={apiData.productRevenueGenerated}
                          name="productRevenueGenerated"
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span className="selectFromHere" style={{ color: "#707070", marginTop: "0.2rem", fontSize: "14px"}}>
                              Select from here
                            </span>
                          </MenuItem>
                          <MenuItem value={"0-1000"}>$ 0-1000</MenuItem>
                          <MenuItem value={"1000-10000"}>$ 1000-10k</MenuItem>
                          <MenuItem value={"more"}>More</MenuItem>
                        </Select>
                        {errors.productRevenueGenerated && (
                          <p className="error_productForm">
                            {errors.productRevenueGenerated}
                          </p>
                        )}
                      </FormControl>
                    </section>

                    <section>
                      <ul>
                        <li>
                          <p>Which business modal does your product have?</p>
                        </li>
                      </ul>
                      <div className="radioGroupButtons">
                        {businessModal.map((value, index) => {
                          return (
                            <div className="radioButton" onClick={() => handleBusinnesModal(index)}>
                              <span>
                                {value?.status === true ? <div></div> : null}
                              </span>
                              <h6>{value?.value}</h6>
                            </div>
                          );
                        })}
                      </div>
                      {errors.productBusinessModel && (
                        <p className="error_productForm">
                          {errors.productBusinessModel}
                        </p>
                      )}
                    </section>
                  </div>
                  <div className="image_div">
                    <img className="image_div_child" src={form2} />
                  </div>
                </div>

                <div className="form_3">
                  <div className="form3_Fields">
                    <section className="previousFunding">
                      <ul>
                        <li>
                          <p>Any previous funding?</p>
                        </li>
                      </ul>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="gender"
                          name="productPreviousFunding"
                          value={apiData.productPreviousFunding}
                          onChange={(event) => handleChange(event)}
                        >
                          <FormControlLabel
                            className={clsx(classes.root)}
                            value="true"
                            control={<BlueRadio />}
                            label="YES"
                          />
                          <FormControlLabel
                            className={clsx(classes.root)}
                            value="false"
                            control={<BlueRadio />}
                            label="NO"
                          />
                        </RadioGroup>
                      </FormControl>
                      {errors.productPreviousFunding && (
                        <p className="error_productForm">
                          {errors.productPreviousFunding}
                        </p>
                      )}
                    </section>
                    {apiData.productPreviousFunding === "true" ? (
                      <section className="amountRaised">
                        <span className="howMuchHaveYouRaised"><li>How much amount have you raised yet?</li></span>
                        <FormControl /*variant="outlined"*/ className={classes.formControl}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={apiData.projectPreviousFundingRaised}
                            name="projectPreviousFundingRaised"
                            onChange={(event) => handleChange(event)}
                            displayEmpty
                            className={clsx(classes.root, classes.inputField)}
                          >
                            <MenuItem value="">
                              <span className="selectFromHere">
                                Select from here
                              </span>
                            </MenuItem>
                            <MenuItem value={"0-1000"}>$ 0-1000</MenuItem>
                            <MenuItem value={"1000-10k"}>$ 1000-10k</MenuItem>
                            <MenuItem value={"More"}>More</MenuItem>
                          </Select>
                        </FormControl>
                        {errors.fundingMoneyRaised && (
                          <p className="error_productForm">
                            {errors.fundingMoneyRaised}
                          </p>
                        )}
                      </section>
                    ) : null}
                    <section className="previousFunding typeOfFunding">
                      <ul>
                        <li>
                          <p>Which type of funding you are looking for?</p>
                        </li>
                      </ul>
                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={apiData.productFundingTypeLookingFor}
                          name="productFundingTypeLookingFor"
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span className="selectFromHere">
                              Select from here
                            </span>
                          </MenuItem>
                          <MenuItem value={"Seed"}>Seed</MenuItem>
                          <MenuItem value={"Series-A"}>Series-A</MenuItem>
                          <MenuItem value={"Series-B"}>Series-B</MenuItem>
                          <MenuItem value={"Series-C"}>Series-C</MenuItem>
                          <MenuItem value={"Venture-Round"}>
                            Venture-Round
                          </MenuItem>
                          <MenuItem value={"Angel"}>Angel</MenuItem>
                          <MenuItem value={"Corporate-Round"}>
                            Corporate-Round
                          </MenuItem>
                          <MenuItem value={"Debt-Financing"}>
                            Debt-Financing
                          </MenuItem>
                          <MenuItem value={"Equity-Crowdfunding"}>
                            Equity-Crowdfunding
                          </MenuItem>
                          <MenuItem value={"Grant"}>Grant</MenuItem>
                          <MenuItem value={"Pre-Seed"}>Pre-Seed</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.productFundingTypeLookingFor && (
                        <p className="error_productForm">
                          {errors.productFundingTypeLookingFor}
                        </p>
                      )}
                    </section>

                    <section className="currentStage">
                      <ul>
                        <li>
                          <p>What is the current stage of product?</p>
                        </li>
                      </ul>
                      <div className="currentStageRadios">
                        {currentStage.map((value, index) => {
                          return (
                            <div style={{ borderColor: value.status === true ? "#2E86C1" : null }}
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
                      {errors.productCurrentStatus && (
                        <p className="error_productForm">
                          {errors.productCurrentStatus}
                        </p>
                      )}
                    </section>

                    <section>
                      <ul>
                        <li>
                          <p>How many customer you have accquired?</p>
                        </li>
                      </ul>
                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="productCustomerAccquired"
                          value={apiData.productCustomerAccquired}
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span style={{fontFamily: "Segoe UI", color: "#707070", fontSize: "14px" }}>
                              Select from here
                            </span>
                          </MenuItem>
                          <MenuItem value={"0-100"}>0-100</MenuItem>
                          <MenuItem value={"100-200"}>100-200</MenuItem>
                          <MenuItem value={"200-300"}>200-300</MenuItem>
                          <MenuItem value={"More than 300"}>
                            More than 300
                          </MenuItem>
                        </Select>
                        {errors.productCustomerAccquired && (
                          <p className="error_productForm">
                            {errors.productCustomerAccquired}
                          </p>
                        )}
                      </FormControl>
                    </section>

                    <section>
                      <ul>
                        <li>
                          <p>How many active users are there ?</p>
                        </li>
                      </ul>
                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={apiData.productActiveUsers}
                          name="productActiveUsers"
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span className="selectFromHere">
                              Select from here
                            </span>
                          </MenuItem>
                          <MenuItem value={"0-100"}>0-100</MenuItem>
                          <MenuItem value={"100-200"}>100-200</MenuItem>
                          <MenuItem value={"200-300"}>200-300</MenuItem>
                          <MenuItem value={"More than 300"}>
                            More than 300
                          </MenuItem>
                        </Select>
                        {errors.productActiveUsers && (
                          <p className="error_productForm">
                            {errors.productActiveUsers}
                          </p>
                        )}
                      </FormControl>
                    </section>
                  </div>
                  <div className="image_div">
                    <img className="image_div_child" src={form3} />
                  </div>
                </div>

                <div className="form_4buttonSubmit">
                  <div className="form_4 ">
                    <div className="form4_Fields">
                      <section>
                        <ul>
                          <li>
                            <p>Your Company Location</p>
                          </li>
                        </ul>
                        <input
                          type="text"
                          placeholder="Type here..."
                          name="productCompanyLocation"
                          value={apiData.productCompanyLocation}
                          onChange={handleChange}
                        />
                        {errors.productCompanyLocation && (
                          <p className="error_productForm">
                            {errors.productCompanyLocation}
                          </p>
                        )}
                      </section>
                      <section>
                        <ul>
                          <li>
                            <p>When was your product started?</p>
                          </li>
                        </ul>
                        <input
                          type="date"
                          name="productStartingDate"
                          value={apiData.productStartingDate}
                          onChange={handleChange}
                        />
                      </section>
                      <section>
                        <ul>
                          <li>
                            <p>Any feature link?</p>
                          </li>
                        </ul>
                        <input
                          type="text"
                          placeholder="Type here..."
                          name="productFeatureLink"
                          value={apiData.productFeatureLink}
                          onChange={handleChange}
                        />
                        {errors.productFeatureLink && (
                          <p className="error_productForm">
                            {errors.productFeatureLink}
                          </p>
                        )}
                      </section>
                      <section>
                        <ul>
                          <li>
                            <p>Any Platform link?</p>
                          </li>
                        </ul>
                        <input
                          type="text"
                          placeholder="Type here..."
                          name="productPlatformLink"
                          value={apiData.productPlatformLink}
                          onChange={handleChange}
                        />
                        {errors.productPlatformLink && (
                          <p className="error_productForm">
                            {errors.productPlatformLink}
                          </p>
                        )}
                      </section>
                      <section>
                        <div className="form5_Fields">
                          <section>
                            <ul>
                              <li>
                                <p>Founders of this product</p>
                              </li>
                            </ul>
                            {errors.productFounderLinkedinProfiles && (
                              <p className="error_productForm">
                                {errors.productFounderLinkedinProfiles}
                              </p>
                            )}
                            <div>
                              <div className="founder_Link">
                                <input
                                  style={{ marginBottom: '10px' }}
                                  type="text"
                                  placeholder={`Founder 1 Linkedin Profile Link`}
                                  onChange={(e) => handleChangeLink(0, e)}
                                />
                                <button type="button" onClick={() => handleAdd()}>
                                  <i className="fa fa-plus" aria-hidden="true"></i>
                                </button>
                              </div>
                            </div>

                            {fields.map((field, idx) => {
                              if (idx === 0) {
                                return "";
                              } else {
                                return (
                                  <div className="founderLink" key={`${field}-${idx}`}>
                                    <input
                                      type="text"
                                      placeholder={`Founder ${idx + 1
                                        } Linkedin Profile Link`}
                                      onChange={(e) => handleChangeLink(idx, e)}
                                    />
                                    <div onClick={() => handleRemove(idx)}>
                                      <i className="fa fa-times" aria-hidden="true"></i>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </section>
                        </div>
                      </section>

                    </div>
                    <div className="image_div">
                      <img className="image_div_child" src={form4} />
                    </div>

                  </div>
                  <div className="submitButton_productForm">
                    <div className="subbutton" onClick={() => updateButtonHandler()}>
                      <p>Upload Your Product
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
          <button onClick={() => props.history.replace("/agency-profile")}>
            Go to Profile
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProductForm;
