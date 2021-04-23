import React, { useState } from 'react'
import './Information.css'

import gallery from '../../../assets/images/Logo/gallery.svg'
import brochure from '../../../assets/images/Logo/brochure.png'

function Information(props) {

    console.log(props,"props")
    const arr = [
        {
            title: 'Agency Name',
            inputValue: `${props?.data.agencyName}`
        },
        {
            title: 'Date of Incorporation',
            inputValue: `${props?.data?.incorporationDate}`
        },
        {
            title: 'Director Name',
            inputValue: `${props?.data?.ownerName}`
        },
        {
            title: 'Agency Email Id',
            inputValue: `${props.data.agencyEmail}`
        },
        {
            title: 'Agency Website',
            inputValue: `${props?.data?.socialPlatformDetails[0]?.platformLink}`
        },
        {
            title: 'Team Size',
            inputValue: `${props?.data?.agencyTeamSize}`
        },
        {
            title: 'Fixed Budget',
            inputValue: '$5,000-$10,000'
        },
        {
            title: 'Fixed Budget',
            inputValue: '$5,000-$10,000'
        },
        {
            title: 'Contact Number',
            inputValue: `${props?.data?.agencyPhone}`
        },
    ]

    const [isDisabled, setIsdisabled] = useState(true);

    const handleDisabled = () => {
        setIsdisabled(false)
    }
    const handleDisabledSave = () => {
        setIsdisabled(true)
    }
    return (
        <>
            <div className="mainInformation">
                <div className="innerInformation">
                    <div className="editableBtn">
                        <button onClick={handleDisabled} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Information</button>
                        {
                            isDisabled ? null : <button onClick={handleDisabledSave} >Save Your Information</button>
                        }
                    </div>
                    <div className="informationForm">
                        <div className="informationInputForm">
                            <span className="informationBorder"></span>
                            {
                                arr.map((value, index) => {
                                    return (
                                        <div key={index} style={{ backgroundColor: index % 2 == 0 ? '#f9f9f9' : '#fff' }}>
                                            <p>{value?.title}</p>
                                            <input style={{ outline: isDisabled ? 'none' : 'none', border: isDisabled ? 'none' : '1px solid #02044a' }} disabled={isDisabled} type="text" value={value?.inputValue} name="" id="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="informationImageForm">
                            <div>
                                <span className="brochureBorder"></span>
                                <span className="roundedCircle"></span>
                                <img src={gallery} alt="" />
                                <p>Gallery Image</p>
                                <h2>-</h2>
                            </div>
                            <div>
                                <span className="roundedCircle "></span>
                                <span className="brochureBorder"></span>
                                <img src={brochure} alt="" />
                                <p>Brochure</p>
                                <h2>-</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Information
