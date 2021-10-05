import BackLeft from '../../assets/images/Back/GroupBack.svg';
import './Back.css';
import { withRouter } from "react-router";

function Back(props) {

    const goBack = () => {
        props.history.goBack();
    }
    return (
        <div className="back-button_newestAddDeveloper">
            <div className="image-div_newestAddDeveloper">
                <div className="hover" onClick={goBack}>
                    <img src={BackLeft} alt="done" />
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