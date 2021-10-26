import { useState, useEffect } from 'react';
import BackLeft from '../../assets/images/Back/GroupBack.svg';
import './Back.css';
import { withRouter } from "react-router";
import instance from '../../Constants/axiosConstants';

function Back(props) {

    const [steps, setSteps] = useState('');
    const Role = localStorage.getItem('role');
    const verificationStatus = localStorage.getItem('isVerified');
    const url = props.history.location.pathname;

    const goBack = () => {
        if (Role === 'Agency') {
            if (url.includes('agency-form-one')) {
                props.history.push('/agencyNewestDashboard');
            }
            else if (url.includes('agency-form-two')) {
                props.history.push('/agency-form-one');
            }
            else if (url.includes('agency-form-three')) {
                props.history.push('/agency-form-two');
            }
            else if (url.includes('agency-form-four')) {
                props.history.push('/agency-form-three');
            }
            else {
                props.history.goBack();
            }
        }
        else {
            props.history.goBack();
        }
    }

    const getStepsCompleted = () => {
        instance.get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                setSteps(response.stepsCompleted);
            });
    };

    useEffect(() => {
        if (url.includes('/agency-form-one') || url.includes('/agency-form-two') ||
            url.includes('/agency-form-three') || url.includes('/agency-form-four')) {
            getStepsCompleted();
        }
    }, [])

    return (
        <div className="back-button_newestAddDeveloper">
            <div className="image-div_newestAddDeveloper" onClick={goBack}>
                <div className="hover">
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