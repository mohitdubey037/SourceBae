import React, { useState } from 'react'
import './Information.css'

import gallery from '../../../assets/images/Logo/gallery.svg'
import brochure from '../../../assets/images/Logo/brochure.png'
import moment from 'moment'

function Information(props) {

    const day = moment(`${props?.data?.incorporationDate}`).format("MM-DD-YYYY")
    console.log(props,"props")
    const arr = [
        {
            title: 'Agency Name',
            inputValue: `${props?.data.agencyName}`,
            disabled: false
        },
        {
            title: 'Date of Incorporation',
            inputValue: `${day}`,
            disabled: false
        },
        {
            title: 'Director Name',
            inputValue: `${props?.data?.ownerName}`,
            disabled: false
        },
        {
            title: 'Agency Email Id',
            inputValue: `${props.data.agencyEmail}`,
            disabled: props?.id ? true: false
        },
        {
            title: 'Agency Website',
            inputValue: `${props?.data?.socialPlatformDetails[0]?.platformLink}`,
            disabled: false
        },
        {
            title: 'Team Size',
            inputValue: `${props?.data?.agencyTeamSize}`,
            disabled: false
        },
        {
            title: 'Fixed Budget',
            inputValue: `${props?.data?.agencyMonthlyBudget}$-${props?.data?.agencyMonthlyBudget + 2*1000}$`,
            disabled: props?.id ? true: false
        },
        {
            title: 'Contact Number',
            inputValue: `${props?.data?.agencyPhone}`,
            disabled: props?.id ? true: false
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
                   {(props?.id===null || props?.id===undefined) && <div className="editableBtn">
                        <button onClick={handleDisabled} ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Information</button>
                        {
                            isDisabled ? null : <button onClick={handleDisabledSave} >Save Your Information</button>
                        }
                    </div>}
                    <div className="informationForm">
                        <div className="informationInputForm">
                            <span className="informationBorder"></span>
                            {
                                arr.map((value, index) => {
                                    if(!value.disabled){
                                    return (
                                        <div key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                            <p>{value?.title}</p>
                                            <input style={{ outline: isDisabled ? 'none' : 'none', border: isDisabled ? 'none' : '1px solid #02044a' }} disabled={isDisabled} type="text" value={value?.inputValue} name="" id="" />
                                        </div>
                                    )}
                                    else
                                        return ""
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Information
