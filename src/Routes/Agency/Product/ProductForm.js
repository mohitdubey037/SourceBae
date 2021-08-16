/* eslint-disable react-hooks/exhaustive-deps */
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
// import Navbar from "../../Dashboard/Navbar";
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import instance from "../../../Constants/axiosConstants";
import Spinner from "../../../Components/Spinner/Spinner";
import * as helper from "../../../shared/helper";
import moment from 'moment'
import clsx from 'clsx';

import product from "../../../assets/images/ClientDashboard/product.svg";
import product1 from "../../../assets/images/ClientDashboard/product1.svg";
import product2 from "../../../assets/images/ClientDashboard/product2.svg";
import product3 from "../../../assets/images/ClientDashboard/product3.svg";
import product4 from "../../../assets/images/ClientDashboard/product4.svg";
import product5 from "../../../assets/images/ClientDashboard/product5.svg";
import success from "../../../assets/images/agencyForm/success.gif";
import Back from '../../../Components/Back/Back';
import MultiSelect from "react-multi-select-component";

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
    fontFamily: "Inter",
  },
  inputField: {
    fontFamily: "Inter",
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

  let totalSoFar = 0;

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

  const Role = "agency";

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
    setFile(e.target.files[0]);
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
        console.log(apiData.productFounderLinkedinProfiles);
        console.log(a, index);
        if (a === '') {
          err.productFounderLinkedinProfiles = `Linked in Url of product founder ${index + 1} is empty`
        }
        else if (!helper.validateLinkedIn(a)) {
          err.productFounderLinkedinProfiles = `Linked in url of product founder ${index + 1} is wrong`;
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
      <div className="product-form">
        <Back name="product-form" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>

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
            <div className="innerProductFormArea productForm">
              {/* <div className="straightLine">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div> */}
              <div className="form_1">
                {/* <div className="illustrationArea">
                  <img src={product1} alt="" />
                </div> */}

                <div className="one_line">
                  <div className="orange_color">
                    <div className="one-orange_color">
                      <p>01</p>
                    </div>
                  </div>
                </div>
                <div className="form1_Fields">
                  <section>
                    <ul>
                      <li>
                        <p>Upload your latest logo of product</p>
                      </li>
                    </ul>
                    <input
                      onChange={inputFileChoosen}
                      type="file"
                      name=""
                      id="fileInput"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                    {errors.filePicked && (
                      <p
                        className="error_productForm"
                      >
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
                    <p style={{ fontWeight: 'normal', textAlign: 'right' }}>{wordsRequired} words required</p>
                    {errors.productDescription && (
                      <p className="error_productForm">
                        {errors.productDescription}
                      </p>
                    )}
                  </section>
                </div>
              </div>

              <div className="form_2">
                {/* <div className="illustrationArea">
                  <img src={product2} alt="" />
                </div> */}
                <div className="two_line">
                  <div className="orange_color">
                    <div className="one-orange_color">
                      <p>02</p>
                    </div>
                  </div>
                </div>
                <div className="form2_Fields">
                  <section>
                    <ul>
                      <li>
                        <p>What type of Business product you have?</p>
                      </li>
                    </ul>

                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={domainName}
                        name="productDomainId"
                        onChange={(event) => handleSelectChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span style={{ fontFamily: "Inter", color: "#999" }}>
                            Select from here
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
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={apiData.productTeamSize}
                        name="productTeamSize"
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span style={{ fontFamily: "Inter", color: "#999" }}>
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
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={apiData.productRevenueGenerated}
                        name="productRevenueGenerated"
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span
                            style={{ fontFamily: "Inter", color: "#999" }}
                          >
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
              </div>

              <div className="form_3">
                <div className="three_line">
                  <div className="orange_color">
                    <div className="one-orange_color">
                      <p>03</p>
                    </div>
                  </div>
                </div>
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
                    {errors.productPreviousFunding && (
                      <p className="error_productForm">
                        {errors.productPreviousFunding}
                      </p>
                    )}
                  </section>
                  {apiData.productPreviousFunding === "true" ? (
                    <section className="amountRaised">
                      <span>How much amount have you raised yet?</span>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={apiData.projectPreviousFundingRaised}
                          name="projectPreviousFundingRaised"
                          onChange={(event) => handleChange(event)}
                          displayEmpty
                          className={clsx(classes.root, classes.inputField)}
                        >
                          <MenuItem value="">
                            <span
                              style={{ fontFamily: "Inter", color: "#999" }}
                            >
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
                  <section className="previousFunding">
                    <ul>
                      <li>
                        <p>Which type of funding you are looking for?</p>
                      </li>
                    </ul>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={apiData.productFundingTypeLookingFor}
                        name="productFundingTypeLookingFor"
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span
                            style={{ fontFamily: "Inter", color: "#999" }}
                          >
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
                          <div
                            style={{
                              borderColor:
                                value.status === true ? "#2E86C1" : null,
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
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="productCustomerAccquired"
                        value={apiData.productCustomerAccquired}
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span
                            style={{ fontFamily: "Inter", color: "#999" }}
                          >
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
                    <FormControl variant="outlined" className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={apiData.productActiveUsers}
                        name="productActiveUsers"
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                      >
                        <MenuItem value="">
                          <span
                            style={{ fontFamily: "Inter", color: "#999" }}
                          >
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
                {/* <div className="illustrationArea">
                  <img src={product3} alt="" />
                </div> */}
              </div>

              <div className="form_4">
                {/* <div className="illustrationArea">
                  <img src={product4} alt="" />
                </div> */}
                <div className="four_line">
                  <div className="orange_color">
                    <div className="one-orange_color">
                      <p>04</p>
                    </div>
                  </div>
                </div>
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
              </div>

              {/* <div className="form_5"> */}

              {/* <div className="illustrationArea">
                  <img src={product5} alt="" />
                </div> */}
              {/* </div> */}
              <div className="submitButton productForm">
                <div className="innerSubmitButton">
                  <div className="subbutton" onClick={() => updateButtonHandler()}>
                    <p>
                      Upload Your Product{" "}
                      <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                    </p>
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
            {/* <div>
              <img src={success} alt="" />
            </div> */}
          </div>
          <div className="successfullyText">
            <p>Your product has been successfully uploaded.</p>
            <span>Wait for the client to response.</span>
          </div>
        </div>
        <div className="modalButton">
          <button onClick={() => props.history.push("/agency-profile")}>
            Go to Profile
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProductForm;
