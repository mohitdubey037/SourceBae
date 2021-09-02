import BackLeft from '../../assets/images/Back/Back-left.svg';
import './Back.css';
import { withRouter } from "react-router";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Back(props) {

    const goBack = () => {
        props.history.goBack();
    }
    return (
        <div className="back-button_newestAddDeveloper">
            <div className="image-div_newestAddDeveloper">
                {/* <img onClick={goBack} src={BackLeft} alt="Back left" /> */}
                <div className="hover" onClick={goBack}>
                    <ArrowBackIosIcon className="back-icon" />
                </div>
                <h6>Back</h6>
            </div>
            <div className="add-developer-div">
                <h6>{props.name}</h6>
            </div>
        </div>
    )
}
export default withRouter(Back);