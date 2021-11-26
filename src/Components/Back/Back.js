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
        if (Role === 'Client') {
            if (url.includes('hire-agency-form-one')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agencyNewestDashboard');
                }
            }
            else if (url.includes('hire-agency-form-two')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agency-form-one');
                }
            }
            else if (url.includes('hire-agency-form-three')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agency-form-two');
                }
            }

            else {
                props.history.goBack();
            }
        }

        else if (Role === 'Agency') {
            if (url.includes('agency-form-one') || url.includes('hire-agency-form-one')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agencyNewestDashboard');
                }
            }
            else if (url.includes('agency-form-two') || url.includes('hire-agency-form-two')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agency-form-one');
                }
            }
            else if (url.includes('agency-form-three' || url.includes('hire-agency-form-three'))) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agency-form-two');
                }
            }
            else if (url.includes('agency-form-four')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/agency-form-three');
                }
            }
            else if (url.includes('quotation')) {
                props.history.replace('/agencyNewestDashboard');
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
            <div style={{ width: url.includes('enter-email') && '84%' }} className="add-developer-div">
                <h6>{props.name}</h6>
            </div>
        </div>
    )
}
export default withRouter(Back);