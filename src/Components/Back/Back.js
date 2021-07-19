import BackLeft from '../../assets/images/Back/Back-left.svg';
import './Back.css';
function Back(props) {
    return (
        <div className="back-button_newestAddDeveloper">
            <div className="image-div_newestAddDeveloper">
                <img src={BackLeft} alt="Back left" />
                <h6>Back</h6>
            </div>
            <div className="add-developer-div">
                <h6>{props.name}</h6>
            </div>
        </div>
    )
}
export default Back