import { useState, useEffect } from 'react';
import BackLeft from '../../assets/images/Back/GroupBack.svg';
import './Back.css';
import { withRouter } from "react-router";
import instance from '../../Constants/axiosConstants';
import * as helper from "../../shared/helper";
import { AGENCY, CLIENT } from '../../shared/constants';

function Back(props) {
    const [steps, setSteps] = useState('');
    const role = localStorage.getItem('role')

    const url = props.history.location.pathname;

    const goBack = () => {
        if (role === CLIENT) {
            if (url.includes('hire-agency-form-one')) {
                if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                    props.history.replace('/clientNewestDashboard');
                }
            }
            else if (url.includes('hire-agency-form-two')) {
                if (props.formState2.projectDomainId !== '' || props.formState2.projectExpertiseRequired.length > 0 || props.formState2.agencyExperience !== '') {
                    if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                        props.history.replace('/hire-agency-form-one', props.propData);
                    }
                }
                else {
                    props.history.replace('/hire-agency-form-one');
                }
            }
            else if (url.includes('hire-agency-form-three')) {
                if (props.formState3.projectTechnologiesRequired.length > 0 || props.formState3.projectServicesRequired.length > 0) {
                    if (window.confirm("Your Previous Saved Documents Will Be Lost") == true) {
                        // props.history.replace(`/clientNewestDashboard`);
                        props.history.replace(`/hire-agency-form-two:${props.formState3.id}`, props.oldFormData);
                    }
                }
                else {
                    props.history.replace(`/hire-agency-form-two:${props.formState3.id}`, props.oldFormData);
                }
            }

            else {
                props.history.goBack();
            }
        }

        else if (role === AGENCY) {
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
        instance.get(`api/${role}/agencies/steps-completed`)
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