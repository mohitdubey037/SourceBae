import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../Components/Back/Back';

import './AddingDeveloper.css';
import dev from '../../../assets/images/AddDeveloper/dev.svg';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import instance, { axiosPatchModule } from '../../../Constants/axiosConstants';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select'

import Spinner from '../../../Components/Spinner/Spinner';
import RadioWithLabel from '../../../Components/RadioWithLabel/RadioWithLabel';
import MultiSelect from 'react-multi-select-component';
import { FaFileUpload } from 'react-icons/fa';

import { addDelay, upload } from '../../../shared/helper';
import { toast } from 'react-toastify';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../../../Components/ProgressBar/ProgressBar';
import LeftQuickInfoSection from './LeftQuickInfoSection/LeftQuickInfoSection';
import InputField from '../../../Components/InputField/InputField';
import { Bold1619, Bold2024, Medium1624, Regular1421, SemiBold1624 } from '../../../Components/Text/Texts';
import { addingDeveloperStrs as strs, chooseFile, dragAndDrop, submit } from '../../../Constants/strings';
import Dot from '../../../Components/Dot/Dot';
import RedStar from '../../../Components/RedStar/RedStar';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import { availability, experience } from './radioConstants';
import { Images } from '../../../assets/images';
import ButtonFilled from '../../../Components/Button/ButtonFilled';
import { useClickOutside } from '@mantine/hooks';

function AddingDeveloper(props) {
  const logoLink = 'https://api.onesourcing.in/media/images/1637044803259.svg';

  const Role = localStorage.getItem('role');
  const [primaryRoles, setprimaryRoles] = useState([])

  const [developerData, setDeveloperData] = React.useState({
    firstName: '',
    lastName: '',
    agencyId: localStorage.getItem('userId') ?? '',
    developerDesignation: '',
    developerTechnologies: [],
    developerDocuments: [
      {
        documentName: '',
        documentLink: ''
      }
    ],
    developerExperience: '1',
    developerPriceRange: '',
    developerAvailability: '0',
    developerRoles: []
  });

  const [techs, setTechs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [haveResumeLink, sethaveResumeLink] = useState(false)
  const [selectRoles, setselectRoles] = useState([])
  const [selectedTechnologies, setselectedTechnologies] = useState([])
  const [roleBasedTechnologies, setroleBasedTechnologies] = useState([``])
  const [showRolesPicker, setshowRolesPicker] = useState(false)
  const [showTechNSkillPicker, setshowTechNSkillPicker] = useState(false)

  const { id } = useParams()

  const rolePickerRef = useClickOutside(() => setshowRolesPicker(false));
  const techNSkillPickerRef = useClickOutside(() => setshowTechNSkillPicker(false));


  const autoFillFields = data => {
    // console.log(data)
    let technologies = []
    let technologiesIds = []
    let devRoles = []
    data.developerTechnologies?.forEach(item => {
      technologies.push({ label: item.technologyName, value: item._id })
      technologiesIds.push(item?._id)
    })
    // data?.developerRoles?.forEach(item => {
    //   devRoles.push({ value: item, label: item })
    // })
    setDeveloperData({
      firstName: data?.firstName,
      lastName: data?.lastName,
      agencyId: data?.agencyId,
      developerDesignation: data?.developerDesignation,
      developerTechnologies: technologiesIds,
      developerDocuments: data?.developerDocuments,
      developerExperience: data?.developerExperience.toString(),
      developerPriceRange: data?.developerPriceRange.toString(),
      developerAvailability: data?.developerAvailability.toString(),
      developerRoles: data?.developerRoles
    })
    console.log({
      firstName: data?.firstName,
      lastName: data?.lastName,
      agencyId: data?.agencyId,
      developerDesignation: data?.developerDesignation,
      developerTechnologies: technologiesIds,
      developerDocuments: data?.developerDocuments,
      developerExperience: data?.developerExperience.toString(),
      developerPriceRange: data?.developerPriceRange.toString(),
      developerAvailability: data?.developerAvailability.toString(),
      developerRoles: data?.developerRoles
    })
    setselectRoles(devRoles)
    setResume([{ name: 'Resume' }])
    sethaveResumeLink(true)
    setselectedTechnologies(technologies)
  }

  const getDeveloperDetails = () => {
    instance.get(`api/${Role}/developers/get/${id}`)
      .then(function (response) {
        autoFillFields(response)
      })
      .catch(err => console.log(err))
  }

  const fetchRoles = () => {
    instance.get(`api/${Role}/developer-roles/all`).then(function (response) {
      let _temp = []
      response?.forEach(item => {
        _temp.push({
          label: item.roleName,
          value: item._id
        })
      })
      setprimaryRoles(_temp);
    });
  }

  useEffect(() => {
    setDeveloperData({
      ...developerData,
      developerTechnologies: selectedTechnologies.map((t) => t.value)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTechnologies]);

  useEffect(() => {
    setDeveloperData({
      ...developerData,
      developerRoles: selectRoles.map(t => t.value)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectRoles]);

  useEffect(() => {
    fetchRoles()
    id && getDeveloperDetails()
  }, [])


  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setResume(acceptedFiles);
      sethaveResumeLink(false)
    } else {
      toast.error('Only .jpg, .jpeg, .png, files are allowed');
    }
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject } =
    useDropzone({
      onDrop,
      accept: '.pdf,.doc,.docx',
      minSize: 0,
      multiple: false
    });

  const handleChange = (event, type) => {
    const { name, value } = event.currentTarget;
    if (type === 'negoPrice') {
      if (value > 3) {
        setDeveloperData({
          ...developerData,
          [name]: value
        });
      }
    } else {
      setDeveloperData({
        ...developerData,
        [name]: value
      });
    }
  };

  const getAllTechs = () => {
    instance.get(`api/${Role}/technologies/all`).then(function (response) {
      setTechs(response);
      setLoading(false);
    });
  };

  const errorValidation = () => {
    const errors = {};
    if (developerData.firstName === '') {
      errors.firstName = 'First Name is required';
    } else if (developerData.lastName === '') {
      errors.lastName = 'Last Name is required';
    } else if (developerData.developerDesignation === '') {
      errors.developerDesignation = 'Developer Designation is required';
    } else if (developerData.developerDesignation.length < 4) {
      errors.developerDesignation =
        'Developer Designation must be at least 4 character';
    } else if (developerData.developerRoles.length == 0) {
      errors.developerRoles = 'Please select role';
    } else if (developerData.developerTechnologies.length === 0) {
      errors.developerTechnologies = 'Technologies is required';
    } else if (developerData.developerPriceRange === '') {
      errors.developerPrice = 'Developer Price is required';
    } else if (developerData.developerExperience === '') {
      errors.developerExperience = 'Developer Experience is required';
    } else if (developerData.developerAvailability === '') {
      errors.developerAvailability = 'Developer Availability is required';
    } else if (resume === null) {
      errors.developerResume = 'Resume is required';
    } else if (developerData.developerAvailability === null) {
      errors.developerAvailability = 'Developer Availability is required';
    } else if (developerData.developerAvailability === 'Negotiable') {
      errors.developerAvailability = 'Please enter a day';
    }
    Object.keys(errors).length && toast.error(errors[Object.keys(errors)[0]])
    setErrors(errors);
    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  async function uploadMedia() {
    try {
      const detail = await upload(resume, Role);
      if (detail) {
        let data = {
          ...developerData,
          developerDocuments: [
            {
              documentName: 'Resume',
              documentLink: detail
            }
          ]
        }
        id ? updateDeveloper(data) : createDeveloperApi(data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const createDeveloperApi = (data) => {
    setLoading(true);
    instance
      .post(`api/${Role}/developers/create`, (data))
      .then(function (response) {
        setLoading(false);
        props.history.replace({
          pathname: AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST,
          origin: 'addingDeveloper'
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const updateDeveloper = (data) => {
    axiosPatchModule(`/api/${Role}/developers/update/${id}`, data)
      .then(res => {
        if (res?.code == 206) {
          toast.success(res?.message)
          props.history(-1)
        }
      })
      .catch(err => {
        let response = err?.response
        if (response?.data?.code == 400) {
          return toast.error(response?.data?.message)
        }
      })
      .finally(() => setLoading(false))
  }

  const handleButton = () => {
    if (errorValidation()) {
      if (haveResumeLink) {
        id ? updateDeveloper(developerData) : createDeveloperApi(developerData)
      } else {
        uploadMedia();
      }
    }
  };

  useEffect(() => {
    getAllTechs();
  }, []);

  const customItemRenderer = ({ checked, option, onClick, disabled }) => {
    return (
      <div
        className={`item-renderer ${disabled && 'disabled'} custom-item-renderer`}
      >
        <input
          type="checkbox"
          onChange={onClick}
          checked={checked}
          tabIndex={-1}
          disabled={disabled}
        />
        <p>{option.label}</p>
      </div>
    );
  };


  const roleChoiceMade = role => {
    setselectRoles([role])
    setshowRolesPicker(false)
    instance.get(`/api/${Role}/technologies/${role?.value}`)
      .then(res => {
        let _temp = []
        res?.forEach(item => {
          _temp.push({
            label: item.technologyName,
            value: item._id
          })
        })
        setroleBasedTechnologies(_temp)
      })
      .catch(() => {
        toast.error('Oops! something went wrong!')
        setselectRoles([])
        setselectedTechnologies([])
        setroleBasedTechnologies([])
      })
  }

  const generateTechString = () => {
    let str = selectedTechnologies?.map(ele => ele.label).join(', ')
    return str.slice(0, 20)
  }


  return (
    <>
      <Navbar logoLink={logoLink} />

      {loading ? (
        <Spinner />
      ) : (
        <div className='mt-14 flex w-full p-4 bg-fafafb ' >
          <div className='flex w-1/4 h-full bg-fafafb' >
            <LeftQuickInfoSection />
          </div>
          <div className='flex flex-col w-3/4 m-3 p-4 rounded-10 border-1e1e1e border bg-fafafb shadow-[0_25px_35px_rgba(0,0,0,0.07)]' >
            <div className='grid grid-cols-3 gap-y-10' >
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.firstName} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="firstName"
                  value={developerData.firstName}
                  placeholder={strs.label.firstName}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.lastName} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="lastName"
                  value={developerData.lastName}
                  placeholder={strs.label.lastName}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.designation} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="developerDesignation"
                  value={developerData.developerDesignation}
                  placeholder={strs.label.designation}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col cursor-pointer' >
                <RequiredLabel text={strs.label.roles} />
                <SizedBox height={'6px'} width={'6px'} />
                <div
                  ref={rolePickerRef}
                  className='bg-f9f9f9 w-4/5 border flex items-center border-1e1e1e rounded-md p-3 h-14 relative'
                  onClick={() => setshowRolesPicker(true)}
                >
                  {selectRoles[0]?.label ? <Medium1624 text={selectRoles[0]?.label} /> : <p className='text-gray-400' >{strs.label.roles}</p>}
                  <img src={Images.downArrowPink} style={{ position: 'absolute', top: '22px', right: '22px' }} />
                  {showRolesPicker && <div className='absolute top-16 border rounded-md py-3 bg-white w-full left-0 max-h-72 overflow-scroll' >
                    {
                      primaryRoles?.map(item => (
                        <div
                          key={item.value}
                          className={`${item?.value == selectRoles[0]?.value && 'bg-primary-pink-300'} w-full justify-center flex py-2 cursor-pointer`}
                          onClick={() => roleChoiceMade(item)}
                        >
                          <SemiBold1624 text={item?.label} />
                        </div>
                      ))
                    }
                  </div>}
                </div>
              </div>
              <div className='flex flex-col cursor-pointer' >
                <RequiredLabel text={strs.label.techAndSkill} />
                <SizedBox height={'6px'} width={'6px'} />
                <div
                  ref={techNSkillPickerRef}
                  className='bg-f9f9f9 w-4/5 border flex items-center border-1e1e1e rounded-md p-3 h-14 relative'
                  onClick={() => setshowTechNSkillPicker(true)}
                >
                  {selectedTechnologies[0]?.label
                    ? <Medium1624 text={generateTechString()} />
                    : <p className='text-gray-400' >{strs.label.techAndSkill}</p>}
                  <img src={Images.downArrowPink} style={{ position: 'absolute', top: '22px', right: '22px' }} />
                  {showTechNSkillPicker && <div className='absolute top-16 border rounded-md py-3 bg-white w-full left-0 max-h-72 overflow-scroll' >
                    {
                      roleBasedTechnologies?.map(item => (
                        <div
                          key={item.value}
                          className={`${selectedTechnologies?.some(tech => tech.value === item.value) && 'bg-primary-pink-300'} w-full justify-center flex py-2 cursor-pointer`}
                          onClick={() => setselectedTechnologies([...selectedTechnologies, item])}
                        >
                          <SemiBold1624 text={item?.label} />
                        </div>
                      ))
                    }
                  </div>}
                  {/* <RequiredLabel text={strs.label.techAndSkill} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="user"
                  id="filled-number"
                  placeholder={strs.label.techAndSkill}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                /> */}
                </div>
              </div>
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.email} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="user"
                  id="filled-number"
                  placeholder={strs.label.email}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.linkedin} hideStar />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="developerLinkedin"
                  placeholder={strs.label.linkedin}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col' >
                <RequiredLabel text={strs.label.price} />
                <SizedBox height={'6px'} width={'6px'} />
                <InputField
                  type="text"
                  name="developerPriceRange"
                  value={developerData.developerPriceRange}
                  placeholder={strs.label.price}
                  className='bg-f9f9f9 border border-1e1e1e rounded-md p-3 w-4/5 h-14'
                  onChange={handleChange}
                />
              </div>
            </div>

            <SizedBox height={'48px'} />
            <div>
              <RequiredLabel text={strs.label.experience} />
              <SizedBox height={'6px'} width={'6px'} />
              <div className='flex justify-between w-10/12' >
                {
                  experience?.map(item => (
                    <RadioWithLabel
                      key={item.value}
                      label={item.label}
                      name={'developerExperience'}
                      value={item.value}
                      selected={item.value === developerData.developerExperience}
                      onClick={(e, selected) => handleChange(e)}
                    />
                  ))
                }
              </div>
            </div>

            <SizedBox height={'48px'} />
            <div>
              <RequiredLabel text={strs.label.availability} />
              <SizedBox height={'6px'} width={'6px'} />
              <div className='flex justify-between w-10/12' >
                {
                  availability?.map(item => (
                    <RadioWithLabel
                      key={item.value}
                      label={item.label}
                      name={'developerAvailability'}
                      value={item.value}
                      selected={item.value === developerData.developerAvailability}
                      onClick={(e, selected) => handleChange(e)}
                    />
                  ))
                }
              </div>
            </div>

            <SizedBox height={'48px'} />
            <div
              className='flex justify-center items-center border-1 p-6 border-dashed border-black rounded-md'
              {...getRootProps()}
            >
              {!isDragActive && (
                <>
                  <input
                    {...getInputProps()}
                  />
                  <FaFileUpload style={{ opacity: 0 }} />
                  <div className='flex flex-col justify-center items-center' >
                    <img src={Images.cloud} className='mb-2' />
                    <Bold1619 text={dragAndDrop} />
                    <SizedBox height={'8px'} />
                    <Bold1619 text={'or'} />
                    <SizedBox height={'8px'} />
                    <div
                      className='bg-primary-pink-700 hover:bg-primary-pink-900 py-2 px-3 rounded-lg border cursor-pointer justify-center items-center flex'
                    >
                      <img src={Images.paperClip} className='mr-2' />
                      <Bold1619 text={resume ? resume[0].name : chooseFile} style={{ color: '#fff' }} />
                    </div>
                    <SizedBox height={'8px'} />
                    <Bold1619 text={strs.maxUploadSize} style={{ opacity: '0.5' }} />
                  </div>
                  {/* {resume ===
                    null ? (
                    <p className="select_file">
                      click
                      to
                      select
                      files
                    </p>
                  ) : (
                    <p
                      className="logo_detail"
                      title={
                        resume !==
                        null &&
                        resume[0]
                          .name
                      }
                    >
                      {resume !==
                        null &&
                        resume[0]
                          .name}
                    </p>
                  )} */}
                </>
              )}
            </div>

            <SizedBox height={'50px'} />
            <div className='flex justify-center' >
              <ButtonFilled label={submit} onClick={handleButton} />
            </div>

          </div>
          {/* <LeftQuickInfoSection /> */}
          {/* <div className="mainAddingDeveloper_parent">
                        <Back name="Add Developer" />
                        <div className="mainAddingDeveloper">
                            <div className="addingDeveloperHeadings">
                                <h1>Adding Developer</h1>
                                <p>
                                    Your team is the face of your firm at
                                    sourcebae , the details you mention will be
                                    your packaging to the clients, represent
                                    them in the best way you can.
                                </p>
                                <div className="pointsToRemember">
                                    <h2>Points To Remember</h2>
                                    <div style={{ paddingTop: '1rem' }}>
                                        <div>
                                            <ul>
                                                <li>
                                                    <p>Fill Form Carefully.</p>
                                                </li>
                                                <li>
                                                    <p>Drop the Resume.</p>
                                                </li>
                                                <li>
                                                    <p>
                                                        We will reach you
                                                        shortly.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={dev}
                                    alt="NotFound"
                                    style={{
                                        margin: '1rem 0rem 0rem 5rem',
                                        width: '80%'
                                    }}
                                />
                            </div>
                            <div className="innerAddingDeveloper">
                                <div className="inputForm">
                                    <div className="inputField1">
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                First Name
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={developerData.firstName}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.firstName && (
                                                <p className="error_paragraph basic">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Last Name
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={developerData.lastName}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.lastName && (
                                                <p className="error_paragraph basic">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="developerDesignation_addingDeveloper">
                                            <h4>
                                                Designation
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="E.g- Angular Developer"
                                                name="developerDesignation"
                                                value={
                                                    developerData.developerDesignation
                                                }
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.developerDesignation && (
                                                <p className="error_paragraph basic">
                                                    {
                                                        errors.developerDesignation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="inputField2">
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Roles
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <Select
                                                options={primaryRoles}
                                                className='multi-select'
                                                isClearable={false}
                                                value={selectRoles}
                                                styles={{
                                                    control: (base, state) => ({
                                                        ...base,
                                                        border: "1px solid #45a4ea",
                                                    })
                                                }}
                                                onChange={role => roleChoiceMade(role)}
                                            />
                                            {errors.developerRoles && (
                                                <p className="error_paragraph experience">
                                                    {
                                                        errors.developerRoles
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Technology & Skills
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <Select
                                                options={roleBasedTechnologies}
                                                className='multi-select'
                                                isClearable={false}
                                                value={selectedTechnologies}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        border: "1px solid #45a4ea",
                                                    }),
                                                    multiValue: (base) => ({
                                                        ...base,
                                                        minWidth: 'auto',
                                                    }),
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        overflow: 'scroll',
                                                        flexWrap: 'nowrap'
                                                    }),
                                                }}
                                                onChange={val => setselectedTechnologies([val])}
                                            />

                                            {errors.developerTechnologies && (
                                                <p className="error_paragraph experience">
                                                    {
                                                        errors.developerTechnologies
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="developerDesignation_addingDeveloper">
                                            <div
                                                className="uploadBlock_addingDeveloper"
                                                {...getRootProps()}
                                            >
                                                <div className="fileUploadButton_addingDeveloper">
                                                    <section className="container_addingDeveloper">
                                                        <div className="file_click_addingDeveloper">
                                                            <input
                                                                {...getInputProps()}
                                                            />
                                                            {!isDragActive && (
                                                                <>
                                                                    <FaFileUpload />
                                                                    {resume ===
                                                                        null ? (
                                                                        <p className="select_file">
                                                                            click
                                                                            to
                                                                            select
                                                                            files
                                                                        </p>
                                                                    ) : (
                                                                        <p
                                                                            className="logo_detail"
                                                                            title={
                                                                                resume !==
                                                                                null &&
                                                                                resume[0]
                                                                                    .name
                                                                            }
                                                                        >
                                                                            {resume !==
                                                                                null &&
                                                                                resume[0]
                                                                                    .name}
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                            {isDragActive &&
                                                                !isDragReject &&
                                                                "Drop it like it's hot!"}
                                                            {isDragReject &&
                                                                'File type not accepted, sorry!'}
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>

                                            {errors.developerResume && (
                                                <p className="error_paragraph experience">
                                                    {errors.developerResume}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>

                                        <h4 className='priceTag' style={{ display: 'flex' }} >
                                            Price
                                            <span className="requiredStar">
                                                *
                                            </span>
                                            <p style={{ fontSize: '12px', padding: '4px' }} >(in Dollar)</p>
                                        </h4>
                                        <input
                                            type="number"
                                            className='priceRangeClass'
                                            placeholder="$5000"
                                            name="developerPriceRange"
                                            value={developerData.developerPriceRange}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        /> / month
                                        {errors.developerPrice && (
                                            <p className="error_paragraph">
                                                {errors.developerPrice}
                                            </p>
                                        )}
                                    </div>
                                    <div className="yearsOfExperience_addingDeveloper">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Years of Experience{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <div className="experience-radio-parent">
                                                <RadioGroup
                                                    aria-label="developerExperience"
                                                    name="developerExperience"
                                                    value={
                                                        developerData.developerExperience
                                                    }
                                                    onChange={(event) =>
                                                        handleChange(event)
                                                    }
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio />}
                                                        label="Junior(1-3years)"
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '1'
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="3"
                                                        control={<Radio />}
                                                        label="Mid Range(3-6years)"
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '3'
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="6"
                                                        control={<Radio />}
                                                        label="Senior(6-9years)"
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '6'
                                                        }
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </FormControl>
                                        {errors.developerExperience && (
                                            <p className="error_paragraph">
                                                {errors.developerExperience}
                                            </p>
                                        )}
                                    </div>

                                    <div className="availabilityArea">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Availability{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="developerAvailability"
                                                name="developerAvailability"
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Immediately"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '0'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="less than 2 weeks"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '1'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="More than 2 weeks"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '2'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="Negotiable"
                                                    control={<Radio />}
                                                    label="Negotiable"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        'Negotiable'
                                                    }
                                                />
                                            </RadioGroup>
                                            {developerData.developerAvailability !==
                                                '0' &&
                                                developerData.developerAvailability !==
                                                '1' &&
                                                developerData.developerAvailability !==
                                                '2' &&
                                                developerData.developerAvailability !==
                                                null && (
                                                    <input
                                                        min={4}
                                                        type="number"
                                                        className="availability_days"
                                                        placeholder="Enter Days"
                                                        name="developerAvailability"
                                                        onChange={(event) =>
                                                            handleChange(
                                                                event,
                                                                'negoPrice'
                                                            )
                                                        }
                                                    />
                                                )}
                                        </FormControl>
                                        {errors.developerAvailability && (
                                            <p
                                                style={{
                                                    marginTop:
                                                        developerData.developerAvailability &&
                                                        '0'
                                                }}
                                                className="error_paragraph"
                                            >
                                                {errors.developerAvailability}
                                            </p>
                                        )}
                                    </div>
                                    <div className="submitButton">
                                        <button onClick={handleButton}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      )}
    </>
  );
}

export const RequiredLabel = ({ text, hideStar }) => (
  <div className='flex' >
    <Dot className={'m-2'} />
    <Regular1421 text={text} />
    {!hideStar ? <RedStar /> : <SizedBox height={'24px'} width={'24px'} />}
  </div>
)

export default AddingDeveloper;
