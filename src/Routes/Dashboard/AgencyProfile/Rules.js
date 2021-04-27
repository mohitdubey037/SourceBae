import React from 'react'
import './Rules.css'

function Rules(props) {

    const arr = [
        {
            title: 'Does your company provide any kind of FREE support post deployment?',
            tick: true,
            wrong: false
        },
        {
            title: 'Is your company open to working on a fixed price modal?',
            tick: true,
            wrong: false
        },
        {
            title: 'Do have leagcy privacy,security & non-disclosure process in place?',
            tick: true,
            wrong: false
        },
        {
            title: 'Are clients from oneSourcing allowed to visit your office premises?',
            tick: false,
            wrong: true
        },
        {
            title: 'Are you open to travelling to a customer location if required?',
            tick: false,
            wrong: true
        },
        {
            title: 'Will your company accept a penalty if project delivery is not met?',
            tick: true,
            wrong: false
        },
        {
            title: 'Do you provide hosting and maintenance sevices?',
            tick: false,
            wrong: true
        },
    ]

    return (
        <>
            <div className="mainRules">
                <div className="innerRules">
                {(props?.id===null || props?.id===undefined) && <div className="editableBtn">
                        <button><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Rules</button>
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
                                            <div className="rulesMark">
                                                <i class="fa fa-check" style={{ color: value?.tick ? '#5cb85c' : '#999' }} aria-hidden="true"></i>
                                                <i class="fa fa-times" style={{ color: value?.wrong ? '#d9534f' : '#999' }} aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rules
