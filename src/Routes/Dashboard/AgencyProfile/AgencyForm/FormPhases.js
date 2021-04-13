import React from 'react'
import './FormPhases.css'

function FormPhases(props) {
    return (
        <>
            <div className="mainFormPhase">
                <div className="innerFormPhase">
                    <div className="stragightLine"></div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value1 ? '#02044a' : '#999' }}>01</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value2 ? '#02044a' : '#999' }}>02</h6>
                        <span>Tech Stack </span>
                    </div>
                    <div className="formPhaseCards">
                        <h6>03</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6>04</h6>
                        <span>Social Details</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPhases
