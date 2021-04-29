import React, {useState} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import './Rules.css'

function Rules(props) {



    const [arr, setArr] = useState(
        [
        {
            title: 'Does your company provide any kind of FREE support post deployment?',
            name: `Deployment Support`,
            status: true,
            wrong: false
        },
        {
            title: 'Is your company open to working on a fixed price model?',
            name: `Fixed price model`,
            status: true,
            wrong: false
        },
        {
            title: 'Do have leagcy privacy,security & non-disclosure process in place?',
            name: `legacy process`,
            status: true,
            wrong: false
        },
        {
            title: 'Are clients from oneSourcing allowed to visit your office premises?',
            name: `office visit`,
            status: false,
            wrong: true
        },
        {
            title: 'Are you open to travelling to a customer location if required?',
            name: `customer location traveling`,
            status: false,
            wrong: true
        },
        {
            title: 'Will your company accept a penalty if project delivery is not met?',
            name: `project delivery penalty`,
            status: true,
            wrong: false
        },
        {
            title: 'Do you provide hosting and maintenance sevices?',
            name: `hosting and maintenace services`,
            status: false,
            wrong: true
        },
    ])
    const [editRules, setEditRules] = useState(false)

    const handleEditRules=(value)=>{
        setEditRules(value)
    }

    const handleRules = (event,rule)=>{
        const {value} = event.target
        let index = arr.indexOf(rule)

        let tempArr = [...arr]
        tempArr[index].status = value==="true"?true:false
        setArr(tempArr)
    }

    return (
        <>
            <div className="mainRules">
                <div className="innerRules">
                {(props?.id===null || props?.id===undefined) && <div className="editableBtn">
                        <button onClick={()=>{handleEditRules(true)}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Rules</button>
                    </div>}
                    <div className="rulesCard">
                        <div className="rulesUpper">
                            <div className="openTiming">
                                <h4><i class="fa fa-clock-o" aria-hidden="true"></i>Opening &  Closing Time</h4>
                                <p>9:00AM to 5:00PM</p>
                            </div>
                            <div className="weekendOpening">
                                <h4><i class="fa fa-calendar" aria-hidden="true"></i>Weekend Open</h4>
                                <p>Yes</p>
                            </div>
                        </div>

                        <div className="rulesQuestions">
                            {
                                arr.map((value) => {
                                    return (
                                        <div className="questionPart">
                                            <div className="leftQuestion">
                                                <p>{value?.title}</p>
                                            </div>

                                        
                                            {!editRules && <div className="rulesMark">
                                                {value?.status
                                                ?
                                                <i class="fa fa-check" style={{ color:'#5cb85c'}} aria-hidden="true"/>
                                                :
                                                <i class="fa fa-times" style={{ color:'#d9534f'}} aria-hidden="true"/>
                                                }
                                            </div>}

                                            {editRules && <FormControl component="fieldset">
                                                    <RadioGroup aria-label={value?.name} name={value?.name} value={`${value?.status}`} onChange={(event)=>handleRules(event,value)}>
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                    </FormControl>}
                                        </div>
                                    )
                                })
                            }
                             {editRules &&  <div className="submitEditBtn">
                                <button onClick={()=>{handleEditRules(false)}}>Submit</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rules
