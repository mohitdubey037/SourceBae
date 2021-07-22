import BackLeft from '../../assets/images/Back/Back-left.svg';
import './Back.css';
import { withRouter } from "react-router";

function Back(props) {
    console.log(props);

    const goBack = () => {
        console.log('hii')
    }
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
export default withRouter(Back);