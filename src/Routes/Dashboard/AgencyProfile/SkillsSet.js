import React, { useState, useEffect } from 'react'
import './SkillsSet.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import instance from "../../../Constants/axiosConstants";
import Skillset_edit from '../../../assets/images/Newestdashboard/Agency-Profile/Skill-Set_edit.svg';

function SkillsSet(props) {
    const Role = localStorage.getItem('role');
    const [agencyProfiledata, setAgencyProfileData] = useState({})
    const [selectedId, setSelectedId] = useState("")
    const [open, setOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const [selectedServicesId, setSelectedServicesId] = useState([])
    const [visibleTechData, setVisibleTechData] = useState([])
    const [skillset, setSkillset] = useState({
        Industry: [],
        Services: [],
        Technology: []
    })
    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                // console.log(response);
                setAgencyProfileData(response);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        if (Role === 'Agency') {
            getAgencyProfile(localStorage.getItem("userId"), false);
        }
    }, []);

    const handleDisabledCancel = () => {
        setEditStatus(false)
    }

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setAddItem("")
        setOpen(false);
    }
    const [modalValue, setModalValue] = useState({})

    const [arr, setArr] = useState([
        {
            title: 'Industry',
            content: props?.data?.agencyDomains.map((domain) => {
                return {
                    points: domain?.domainId?.domainName || "",
                    id: domain?.domainId?._id || ""
                }
            })
        },
        {
            title: 'Expertise',
            content: [
                {
                    points: 'Corporative Reservation'
                },
                {
                    points: 'Online Food Ordering'
                },
                {
                    points: 'Food Delivery Tracking'
                },
            ]
        },
        {
            title: 'Services',
            content: props.data.agencyServices.map((service) => {

                return {
                    points: service.serviceName,
                    id: service._id
                }
            })
        },
        {
            title: 'Technology',
            content: props.data.agencyTechnologies.map((technology) => {
                return {
                    points: technology.technologyName,
                    id: technology._id
                }
            })
        },
        {
            title: 'Language of Content',
            content: [
                {
                    points: 'English'
                },

            ]
        },
        {
            title: 'Relevant Exp In Industry',
            content: [
                {
                    points: '1yr 2months'
                },

            ]
        },
    ])


    const [addItem, setAddItem] = useState("")

    const handleEdit = (status) => {
        setEditStatus(status)
        if (status === false) {
            updateAgency()
        }
    }

    const handleAddData = (modalValue) => {
        setModalValue(modalValue)
        onOpenModal()
    }

    const handleAddItem = (arrItem) => {
        let temp = arr
        let index = temp.indexOf(arrItem)
        if (index > -1 && addItem !== "") {

            if (temp[index].title === "Industry") {
                if (temp[index].content.findIndex((item) => item.id === selectedId) === -1) {
                    temp[index] = {
                        ...temp[index],
                        content: [
                            temp[index].content[0],
                            {
                                points: addItem,
                                id: selectedId
                            }
                        ]
                    }
                }

            }

            else if (temp[index].title === "Services") {
                if (temp[index].content.findIndex((item) => item.id === selectedId) === -1) {

                    setSelectedServicesId([...selectedServicesId, selectedId])
                    temp[index] = {
                        ...temp[index],
                        content: [
                            ...temp[index].content,
                            {
                                points: addItem,
                                id: selectedId
                            }
                        ]
                    }
                }

            }

            else if (temp[index].title === "Technology") {
                if (temp[index].content.findIndex((item) => item.id === selectedId) === -1) {

                    temp[index] = {
                        ...temp[index],
                        content: [
                            ...temp[index].content,
                            {
                                points: addItem,
                                id: selectedId
                            }
                        ]
                    }
                }

            }
            else {
                temp[index] = {
                    ...temp[index],
                    content: [
                        ...temp[index].content,
                        {
                            points: addItem,
                            id: selectedId
                        }
                    ]
                }
            }
            updateAgency()
            setArr(temp)
            setEditStatus(false);
        }
        onCloseModal()

    }

    const handleSelect = (event) => {

        const { value } = event.target
        const splits = value.split(" ")
        setSelectedId(splits[0])
        setAddItem(value.replace(splits[0], "").slice(1))
    }

    //Api Calls methods

    const getAllIndustries = async () => {
        instance.get(`api/${Role}/domains/all`)
            .then(function (response) {

                const domainNames = response.map((domain) => {
                    return {
                        ...domain,
                        selected: false
                    }
                })
                setSkillset({
                    ...skillset,
                    Industry: domainNames
                })
            })
    }

    const getAllTechs = () => {
        instance.get(`api/${Role}/technologies/all`)
            .then(function (response) {
                const techNames = response.map((tech) => {
                    return {
                        ...tech,
                        selected: false
                    }
                })
                setSkillset({
                    ...skillset,
                    Technology: techNames
                })
            })
    }

    const getAllServices = () => {
        instance.get(`api/${Role}/services/all`)
            .then(function (response) {
                const servicesNames = response.map((service) => {
                    return {
                        ...service,
                        selected: false
                    }
                })
                setSkillset({
                    ...skillset,
                    Services: servicesNames
                })
            })
    }

    const updateAgency = () => {
        const id = localStorage.getItem("userId")
        instance.patch(`/api/${Role}/agencies/update/${id}`,
            {
                agencyDomains: arr[0].content.map((domain) => {
                    return {
                        domainId: domain.id,
                        domainBaseAmount: 100,
                        isAmountNegotiable: true
                    }
                }),
                agencyServices: arr[2].content.map((service) => {
                    return service.id
                }),

                agencyTechnologies: arr[3].content.map((tech) => {
                    return tech.id
                })

            }
        )
            .then(resp => {
                console.log(resp);
            })
    }

    useEffect(() => {
        getAllIndustries()
        const serviceIds = []
        props.data.agencyServices.forEach((service) => {
            serviceIds.push(service._id)
        })
        setSelectedServicesId(serviceIds)
    }, [])

    useEffect(() => {
        setVisibleTechData(skillset.Technology.filter((tech) => selectedServicesId.indexOf(tech.serviceId) !== -1))
    }, [selectedServicesId])


    useEffect(() => {
        if (skillset.Industry.length > 0 && skillset.Services.length === 0)
            getAllServices()
        else if (skillset.Services.length > 0 && skillset.Technology.length === 0)
            getAllTechs()

        setVisibleTechData(skillset.Technology.filter((tech) => selectedServicesId.indexOf(tech.serviceId) !== -1))
    }, [skillset])
    return (
        <>
            <div className="mainSkillsSet">
                <div className="innerSkillsSet">
                    {Role !== 'Client' ?
                        agencyProfiledata.isAgencyVerified &&
                        <div className="skill-set_parent_parent">
                            <div className="skill-set_parent">
                                {/* <img src={Skillset_edit} alt="Skill-Set" /> */}
                                <p>SKILL SET</p>
                            </div>
                            <i onClick={() => handleEdit(true)} className="fa fa-pencil-square-o Edit-icon_information" aria-hidden="true"></i>

                            {/* <div className="editable_parent"> */}
                            {/* <div className="editableBtn" style={{ position: 'relative' }}>
                                    <button onClick={() => handleEdit(false)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Submit</button>
                                </div> */}
                            {/* <div className="editableBtn">
                                    <button onClick={() => handleEdit(true)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Skills Set</button>
                                </div> */}
                            {/* </div> */}
                        </div>
                        : null}

                    <div className="skillsSetsContent">
                        {/* <div className="skillsSetBorder"></div> */}
                        {/* <div className="skillsSetSemiCircle" style={{ zIndex: -1 }}></div> */}
                        {
                            arr.map((value) => {
                                return (
                                    <div className="skillsSetTable">
                                        <div className="skillsSetTableHeading">
                                            <ul>
                                                <li>
                                                    {value?.title}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="skillsSetTableContent">
                                            {
                                                value?.content.map((item) => {
                                                    return (
                                                        <p>{item?.points}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        {editStatus && (value.title !== 'Language of Content' && value.title !== 'Relevant Exp In Industry' && value.title !== 'Expertise') && <div className="editButtons">
                                            <div className={value?.title}>
                                                <button style={{cursor: value?.title === 'Industry' && 'auto' }} disabled={value?.title === 'Industry' && true} onClick={() => { handleAddData(value) }} className='plusIcon_skillSet'>
                                                    <i class="fa fa-plus " aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {editStatus ?
                    <div onClick={handleDisabledCancel} className="information_save_parent">
                        <div className="information_cancel">
                            <p>Cancel</p>
                        </div>
                    </div>:null}
                    {/* {editStatus &&
                        <div onClick={() => handleEdit(false)} className="information_save_parent">
                            <div className="information_save">
                                <p>Submit</p>
                            </div>
                        </div>
                    } */}
                </div>

            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={{
                overlay: 'customOverlay',
                modal: 'editModal',
            }} >
                <h2 className="modalHeading">{`Add ${modalValue?.title}`}</h2>
                <div className="modalEditContainer">
                    <div className="modalQuestion">
                        <p>{`${modalValue?.title}`}</p>
                    </div>
                    <div className="modaInput">
                        {(modalValue?.title === "Industry")
                            ?
                            (

                                props?.data?.agencyDomains.length < 2 ?
                                    <select onChange={(event) => handleSelect(event)}>
                                        <option>None</option>
                                        {

                                            skillset?.Industry && skillset?.Industry.map((domain) => {
                                                return <option label={domain.domainName} value={`${domain._id} ${domain.domainName}`} />
                                            })

                                        }
                                    </select>

                                    :
                                    <p>Sorry. No more Idustries can be added.</p>)

                            :
                            (modalValue?.title === "Services")
                                ?
                                <select onChange={(event) => handleSelect(event)}>
                                    <option>None</option>
                                    {

                                        skillset?.Services
                                        &&
                                        skillset?.Services.map((service) => {
                                            return <option label={service.serviceName} value={`${service._id} ${service.serviceName}`} />
                                        })

                                    }
                                </select>
                                :
                                <select onChange={(event) => handleSelect(event)}>
                                    <option>None</option>
                                    {

                                        visibleTechData
                                        &&
                                        visibleTechData.map((technology) => {
                                            return <option label={technology.technologyName} value={`${technology._id} ${technology.technologyName}`} />
                                        })

                                    }
                                </select>
                        }

                        {/* <input value={addItem} name="addItem" onChange={(e) => { setAddItem(e.target.value) }} type="text" /> */}
                    </div>
                    <div class="addmodalButtons">
                        <div></div>
                        <div className="addBtn">
                            <p onClick={() => handleAddItem(modalValue)}>Add</p>
                        </div>
                    </div>

                </div>
                
            </Modal>

        </>
    )
}

export default SkillsSet
