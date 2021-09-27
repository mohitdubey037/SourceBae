import React from 'react'
import './FormPhases.css'

function FormPhases(props) {
    return (
        <>
            <div className="mainFormPhase">
                <div className="innerFormPhase">
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value1 ? '#FFFFFF' : '#E8E8E8' ,boxShadow:" 0 2px 4px 2px rgb(0 0 0 / 20%", color:"#45A4E4"}}>01</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value1 ? '#FFFFFF' : '#E8E8E8' ,boxShadow:" 0 2px 4px 2px rgb(0 0 0 / 20%", color:"#45A4E4" }}>02</h6>
                        <span>Tech Stack </span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value1 ? '#FFFFFF' : '#E8E8E8' ,boxShadow:" 0 2px 4px 2px rgb(0 0 0 / 20%", color:"#45A4E4" }}>03</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: props?.value1 ? '#FFFFFF' : '#E8E8E8' ,boxShadow:" 0 2px 4px 2px rgb(0 0 0 / 20%", color:"#45A4E4" }}>04</h6>
                        <span>Social Details</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPhases
