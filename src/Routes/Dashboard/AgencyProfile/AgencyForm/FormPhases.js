import './FormPhases.css';
import './StepPhases.css';

function FormPhases(props) {
    return (
        <>
            <div className="mainFormPhase">
                <div className="innerFormPhase">
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: (props?.steps > 1 ) && '#0dcaf0'}}>01</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: (props?.steps > 2) && '#0dcaf0'}}>02</h6>
                        <span>Tech Stack </span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: (props?.steps > 3) && '#0dcaf0'}}>03</h6>
                        <span>Personel Details</span>
                    </div>
                    <div className="formPhaseCards">
                        <h6 style={{ backgroundColor: (props?.steps > 4) && '#0dcaf0'}}>04</h6>
                        <span>Social Details</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPhases
