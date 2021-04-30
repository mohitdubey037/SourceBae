import React, { useState } from 'react'
import './SkillsSet.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function SkillsSet(props) {

    const [open, setOpen] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setAddItem("")
        setOpen(false);
    }
    const [modalValue, setModalValue] = useState({})

    const [arr, setArr] = useState([
        {
            title: 'Industry',
            content: [
                {
                    points: 'Food'
                }
            ]
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
            content: [
                {
                    points: 'Web Development'
                },
                {
                    points: 'Mobile Development'
                },
            ]
        },
        {
            title: 'Technology',
            content: [
                {
                    points: 'Html/Css'
                },
                {
                    points: 'Php'
                },
                {
                    points: 'JavaScript'
                },
                {
                    points: 'ReactJs'
                },
                {
                    points: 'NodeJs'
                },
                {
                    points: 'Laravel'
                },
                {
                    points: 'Bootstrap'
                },
                {
                    points: 'React Native'
                },
            ]
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
    }

    const handleAddData = (modalValue) => {
        console.log(modalValue)
        setModalValue(modalValue)
        onOpenModal()
    }

    const handleAddItem = (arrItem) => {
        console.log(addItem)
        let temp = arr
        let index = temp.indexOf(arrItem)
        if (index > -1) {

            temp[index] = {
                ...temp[index],
                content: [
                    ...temp[index].content,
                    {
                        points: addItem
                    }
                ]
            }
            setArr(temp)
        }
        onCloseModal()

    }

    return (
        <>
            <div className="mainSkillsSet">
                <div className="innerSkillsSet">
                    {(props?.id === null || props?.id === undefined) && <div className="editableBtn">
                        <button onClick={() => handleEdit(true)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Skills Set</button>
                    </div>}
                    {(props?.id === null || props?.id === undefined) && editStatus && <div className="editableBtn">
                        <button onClick={() => handleEdit(false)} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Submit</button>
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
                                            <button className={value?.title} onClick={() => { handleAddData(value) }}>
                                                +
                                            </button>
                                        </div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} center focusTrapped={true} >
                <h2 className="modalHeading">{`Add ${modalValue?.title}`}</h2>
                <div className="skillsSetsContent">
                    <div className="skillsSetBorder" />
                    <div className="skillsSetSemiCircle" style={{ zIndex: -1 }} />
                    <div className="skillsSetTable">
                        <div className="skillsSetTableHeading">
                            <p>{`${modalValue?.title}`}</p>
                        </div>
                        <div className="skillsSetTableContent">
                            <input type="text" value={addItem} name="addItem" onChange={(e) => { setAddItem(e.target.value) }} />
                            <button onClick={() => handleAddItem(modalValue)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default SkillsSet
