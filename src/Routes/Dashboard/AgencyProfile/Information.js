import React, { useState } from 'react'
import './Information.css'

import moment from 'moment'
import instance from "../../../Constants/axiosConstants"

function Information(props) {

    const Role ='agency'
    const day = moment(`${props?.data?.incorporationDate}`).format("MM-DD-YYYY")
    console.log(props,"props")
    const [arr, setArr] = useState([
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
    ])

    const [isDisabled, setIsdisabled] = useState(true);

    const handleDisabled = () => {
        setIsdisabled(false)
    }
    const handleDisabledSave = () => {
        setIsdisabled(true)
        updateAgency()
    }

    const permanentDisable = (name)=>{
        if(name ==="Director Name" || name ==="Agency Website" || name==="Team Size" || name==="Agency Email Id"){
            console.log(name)
            return false
        }
        else return true
    }
    const handleChange = (event)=>{
        const {name, value} = event.target
        console.log(name,value)
        let temp = [...arr]
        let index = temp.findIndex((item)=> item.title===name)
        console.log(index)
        temp[index].inputValue = value
        setArr(temp)
    }

    const updateAgency = () => {
        const id = localStorage.getItem("userId")
        instance.patch(`/api/${Role}/agencies/update/${id}`,
        {
            agencyTeamSize:arr[5].inputValue,
            ownerName:arr[2].inputValue,
            agencyEmail: arr[3].inputValue,
            socialPlatformDetails: [
                {
                    platformName: "website",
                    platformLink: arr[4].inputValue
                }
            ]
        }
            )
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
                                            <input style={{ outline: isDisabled ? 'none' : 'none', border: permanentDisable(value?.title) || isDisabled ? 'none' : '1px solid #02044a' }} disabled={permanentDisable(value?.title) || isDisabled} type="text" value={value?.inputValue} name={value?.title} onChange = {(event)=>handleChange(event)} id="" />
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
