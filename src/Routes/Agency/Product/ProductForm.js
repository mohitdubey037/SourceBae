/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import "./ProductForm.css";
import { useDropzone } from 'react-dropzone';

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
    "& .MuiTypography-body1": {
      fontFamily: 'Segoe UI',
      fontSize: '12px'
    }
  }
}));


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
  const [logo, setLogo] = useState(null)
  // const [businesstype, setBusinesstype] = useState([]);
  const [wordsRequired, setWordsRequired] = useState(100);

  const [multipleSelectTech, setMultipleSelect] = useState([]);

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

  const role = localStorage.getItem('role');


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

  // const {
  //   acceptedFiles,
  //   getRootProps,
  //   getInputProps
  // } = useDropzone({
  //   accept: '.jpg, .png, .jpeg'
  // });

  // const acceptedFileItems = acceptedFiles.map(file => {
  //   return (
  //     file.path
  //   )
  // });

  // const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    setLogo(acceptedFiles);
  }, []);

  useEffect(() => {
  }, [logo]);


  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
    onDrop,
    accept: '.jpg, .png, .jpeg',
    minSize: 0,
    // maxSize,
  });

  // const isFileTooLarge = rejectedFiles?.length > 0 && rejectedFiles[0]?.size > maxSize;

  useEffect(() => {
    if (apiData.productDescription === '') {
      setWordsRequired(100);
    }
    else {
      let ab = apiData.productDescription.split(' ');
      setWordsRequired(100 - ab.length); // add 1 to totalsoFar to account for extra space since 1 space = 2 words
    }
  }, [apiData.productDescription])

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  useEffect(() => {
    setApiData({
      ...apiData,
      'productDomainId': multipleSelectTech.map(t => t.value)
    });
  }, [multipleSelectTech])

  const getAllDomains = () => {
    setLoading(true);
    instance
      .get(`api/${role}/domains/all`)
      .then(function (response) {
        setAllDomainsData(response);
        setLoading(false);
      })
      .catch((err) => {
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

  // const inputFileChoosen = (e) => {
  //   setFile(e);
  // };


  function errorValidation() {
    const err = {};

    if (logo === null) {
      err.filePicked = "Please pick up a logo for the Product";
    }

    if (apiData.productName.length < 3) {
      err.productName = "Name required";
    }

    if (apiData.productDescription.length < 100) {
      err.productDescription =
        "Description should be of minimum 100 characters.";
    }

    if (apiData.productDomainId.length === 0) {
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

    if (apiData.productFeatureLink === "") {
      err.productFeatureLink = "Invalid link";
    }

    if (apiData.productPlatformLink === "") {
      err.productPlatformLink = "Invalid link";
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
          err.productFounderLinkedinProfiles = `founder ${index + 1} url is empty`
        }
        else if (!helper.validateLinkedIn(a)) {
          err.productFounderLinkedinProfiles = `founder ${index + 1} url is incorrect`;
        }
        else {
        }
      })
    }

    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    else return false;
  };

  const uploadMedia = () => {
    // if (errorValidation()) {
    setLoading(true);
    const fileForm = new FormData();
    logo && fileForm.append(
      "files",
      logo[0],
      logo[0].name
    );
    instance.post(`api/${role}/media/create`, fileForm)
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
    // }
  };

  const handleSubmit = () => {
    if (errorValidation()) {
      setLoading(true);
      instance
        .post(`api/${role}/products/create`, apiData)
        .then((response) => {
          setLoading(false);
          onOpenModal();
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
    }
  };

  useEffect(() => {
    if (apiData.productLogo !== '') {
      handleSubmit();
    }
  }, [apiData.productLogo])

  const handleButton = () => {
    if (errorValidation()) {
      uploadMedia();
    }
  }

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
                          <p>Upload your latest logo of product  <span className="requiredStar">*</span></p>
                        </li>
                      </ul>
                      <div className="filePicker" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!isDragActive &&
                          <>
                            <p className="pick_file">{logo !== null ? logo[0].name : 'pick file'}</p>
                            <img src={fileIcon} alt="finish" />
                          </>
                        }
                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                        {isDragReject && "File type not accepted, sorry!"}
                        {/* {isFileTooLarge && (
                          <div className="text-danger mt-2">
                            File is too large.
                          </div>
                        )} */}
                      </div>

                      {errors.filePicked && (
                        <p className="error_productForm">
                          {errors.filePicked}
                        </p>
                      )}
                    </section>
                    <section>
                      <ul>
                        <li>
                          <p>What's your good product name?   <span className="requiredStar">*</span></p>
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
                          <p>Describe a bit about your product.   <span className="requiredStar">*</span></p>
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
                    <img className="image_div_child" src={form1} alt="form pic" />
                  </div>
                </div>

                <div className="form_2">
                  <div className="form2_Fields">
                    <section>
                      <ul>
                        <li>
                          <p>What type of Business product you have?   <span className="requiredStar">*</span></p>
                        </li>
                      </ul>

                      <FormControl /*variant="outlined"*/ className={classes.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={apiData.productDomainId}
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
                          <p>What's your good team size?   <span className="requiredStar">*</span></p>
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
                          <p>Total revenue generated till now?   <span className="requiredStar">*</span></p>
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
                            <span className="selectFromHere" style={{ color: "#707070", marginTop: "0.2rem", fontSize: "14px" }}>
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
                          <p>Which business modal does your product have?  <span className="requiredStar">*</span></p>
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
                        <p style={{ marginLeft: '1.4rem' }} className="error_productForm">
                          {errors.productBusinessModel}
                        </p>
                      )}
                    </section>
                  </div>
                  <div className="image_div">
                    <img className="image_div_child" src={form2} alt="form_image" />
                  </div>
                </div>

                <div className="form_3">
                  <div className="form3_Fields">
                    <section className="previousFunding">
                      <ul>
                        <li>
                          <p>Any previous funding?   <span className="requiredStar">*</span></p>
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
                        <span className="howMuchHaveYouRaised">
                          <span style={{ color: 'red', fontSize: '1.6rem' }}>*</span>How much amount have you raised yet?
                        </span>
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
                          <p>Which type of funding you are looking for?   <span className="requiredStar">*</span></p>
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
                          <p>What is the current stage of product?   <span className="requiredStar">*</span></p>
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
                          <p>How many customer you have accquired?   <span className="requiredStar">*</span></p>
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
                            <span style={{ fontFamily: "Segoe UI", color: "#707070", fontSize: "14px" }}>
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
                          <p>How many active users are there ?   <span className="requiredStar">*</span></p>
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
                    <img className="image_div_child" src={form3} alt="Form" />
                  </div>
                </div>

                <div className="form_4buttonSubmit">
                  <div className="form_4 ">
                    <div className="form4_Fields">
                      <section>
                        <ul>
                          <li>
                            <p>Your Company Location   <span className="requiredStar">*</span></p>
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
                            <p>When was your product started?   <span className="requiredStar">*</span></p>
                          </li>
                        </ul>
                        <input
                          type="date"
                          onKeyDown={(e) => e.preventDefault()}
                          name="productStartingDate"
                          value={apiData.productStartingDate}
                          onChange={handleChange}
                        />
                      </section>
                      <section>
                        <ul>
                          <li>
                            <p>Any feature link?   <span className="requiredStar">*</span></p>
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
                            <p>Any Platform link?   <span className="requiredStar">*</span></p>
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
                                <p>Founders of this product   <span className="requiredStar">*</span></p>
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
                      <img className="image_div_child" src={form4} alt="form4" />
                    </div>

                  </div>
                  <div className="submitButton_productForm">
                    <div className="subbutton" onClick={() => handleButton()}>
                      <p>Upload Your Product
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }

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
