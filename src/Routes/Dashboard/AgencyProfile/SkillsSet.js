/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './SkillsSet.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import instance from "../../../Constants/axiosConstants"

function SkillsSet(props) {

    const Role = "agency"
    const [selectedDomainId, setSelectedDomainId] = useState("")
    const [open, setOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const [skillset, setSkillset] = useState({
        Industry: [],
        Services: [],
        Technology: []
    })

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setAddItem("")
        setOpen(false);
    }
    const [modalValue, setModalValue] = useState({})

    const [arr, setArr] = useState([
        {
            title: 'Industry',
            content: props.data.agencyDomains.map((domain) => {
                return {
                    points: domain.domainId.domainName
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
                    points: service.serviceName
                }
            })
        },
        {
            title: 'Technology',
            content: props.data.agencyTechnologies.map((technology) => {
                return {
                    points: technology.technologyName
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
                if (temp[index].content.findIndex((item) => item.points === addItem) === -1) {
                    temp[index] = {
                        ...temp[index],
                        content: [
                            temp[index].content[0],
                            {
                                points: addItem
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
                            points: addItem
                        }
                    ]
                }
            }

            setArr(temp)
        }
        onCloseModal()

    }

    const handleSelect = (event) => {
        const [id, name] = event.target.value.split(" ")
        setSelectedDomainId(id)
        setAddItem(name)
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
                agencyDomains: [{
                    domainId: selectedDomainId,
                    domainBaseAmount: 100,
                    isAmountNegotiable: true
                }]
            })
    }

    useEffect(() => {
        getAllIndustries()
    }, [])

    useEffect(() => {
        console.log(arr)
    }, [arr])

    useEffect(() => {
        if (skillset.Industry.length > 0 && skillset.Services.length === 0)
            getAllServices()
        else if (skillset.Services.length > 0 && skillset.Technology.length === 0)
            getAllTechs()
        // else
        //     // console.log(skillset)

    }, [skillset])
    return (
        <>
            <div className="mainSkillsSet">
                <div className="innerSkillsSet">
                    {/* {(props?.id === null || props?.id === undefined) && } */}
                    {(props?.id === null || props?.id === undefined) && editStatus ? <div className="editableBtn">
                        <button onClick={() => handleEdit(false)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Submit</button>
                    </div> : <div className="editableBtn">
                        <button onClick={() => handleEdit(true)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Skills Set</button>
                    </div>}
                    <div className="skillsSetsContent">
                        <div className="skillsSetBorder"></div>
                        <div className="skillsSetSemiCircle" style={{ zIndex: -1 }}></div>
                        {
                            arr.map((value) => {
                                return (
                                    <div className="skillsSetTable">
                                        <div className="skillsSetTableHeading">
                                            <p>{value?.title}</p>
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
                                        {editStatus && <div className="editButtons">
                                            <div className={value?.title} onClick={() => { handleAddData(value) }}>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </div>
                                        </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={{
                overlay: 'customOverlay',
                modal: 'editModal',
            }} >
                <h2 className="modalHeading">{`Add ${modalValue?.title}`}</h2>
                {/* <div className="skillsSetsContent">
                    <div className="skillsSetBorder" />
                    
                    <div className="skillsSetTable">
                        <div className="skillsSetTableHeading">
                            <p>{`${modalValue?.title}`}</p>
                        </div>
                        <div className="skillsSetTableContent">
                            <input type="text" value={addItem} name="addItem" onChange={(e) => { setAddItem(e.target.value) }} />
                            <button onClick={() => handleAddItem(modalValue)}>Add</button>
                        </div>
                    </div>
                </div> */}
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
                            (modalValue?.title === "Services") &&
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
