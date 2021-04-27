import React, { useState } from 'react'
import './SkillsSet.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function SkillsSet(props) {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const arr = [
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
    ]

    return (
        <>
            <div className="mainSkillsSet">
                <div className="innerSkillsSet">
                {(props?.id===null || props?.id===undefined) && <div className="editableBtn">
                        <button onClick={onOpenModal} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Skills Set</button>
                    </div>}
                    <div className="skillsSetsContent">
                        <div className="skillsSetBorder"></div>
                        <div className="skillsSetSemiCircle"></div>
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
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>


            <Modal open={open} onClose={onCloseModal} center focusTrapped={true} >
                <h2 className="modalHeading">Edit Your Skills</h2>
                <div className="skillsSetsContent">
                    <div className="skillsSetBorder"></div>
                    <div className="skillsSetSemiCircle"></div>
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
                                </div>
                            )
                        })
                    }

                </div>
            </Modal>
        </>
    )
}

export default SkillsSet
