import { useEffect } from 'react';
import BackLeft from '../../assets/images/Back/GroupBack.svg';
import './Back.css';
import { withRouter } from 'react-router';
import instance from '../../Constants/axiosConstants';
import { AGENCY, CLIENT } from '../../shared/constants';
import { AGENCYROUTES, CLIENTROUTES } from '../../Navigation/CONSTANTS';

function Back(props) {
    const role = localStorage.getItem('role');

    const url = props.history.location.pathname;

    const goBack = () => {
        if (role === CLIENT) {
            if (url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1)) {
                if (
                    window.confirm(
                        'Your Previous Saved Documents Will Be Lost'
                    ) === true
                ) {
                    props.history.replace(CLIENTROUTES.DEVELOPER_REQUESTS);
                }
            } else if (url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_2)) {
                if (
                    props.formState2.projectDomainId !== '' ||
                    props.formState2.projectExpertiseRequired.length > 0 ||
                    props.formState2.agencyExperience !== ''
                ) {
                    if (
                        window.confirm(
                            'Your Previous Saved Documents Will Be Lost'
                        ) === true
                    ) {
                        props.history.replace(
                            CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1,
                            props.propData
                        );
                    }
                } else {
                    props.history.replace(
                        CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1
                    );
                }
            } else if (url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_3)) {
                if (
                    props.formState3.projectTechnologiesRequired.length > 0 ||
                    props.formState3.projectServicesRequired.length > 0
                ) {
                    if (
                        window.confirm(
                            'Your Previous Saved Documents Will Be Lost'
                        ) === true
                    ) {
                        props.history.replace(
                            `${CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_2}/${props.formState3.id}`,
                            props.oldFormData
                        );
                    }
                } else {
                    props.history.replace(
                        `${CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_2}/${props.formState3.id}`,
                        props.oldFormData
                    );
                }
            } else {
                props.history.goBack();
            }
        } else if (role === AGENCY) {
            if (
                url.includes('agency-form-one') ||
                url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1)
            ) {
                if (
                    window.confirm(
                        'Your Previous Saved Documents Will Be Lost'
                    ) === true
                ) {
                    props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
                }
            } else if (
                url.includes(AGENCYROUTES.AGENCY_UPDATE_2) ||
                url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_2)
            ) {
                if (
                    window.confirm(
                        'Your Previous Saved Documents Will Be Lost'
                    ) === true
                ) {
                    props.history.replace(AGENCYROUTES.AGENCY_UPDATE_1);
                }
            } else if (
                url.includes(AGENCYROUTES.AGENCY_UPDATE_3) ||
                url.includes(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_3)
            ) {
                if (
                    window.confirm(
                        'Your Previous Saved Documents Will Be Lost'
                    ) === true
                ) {
                    props.history.replace(AGENCYROUTES.AGENCY_UPDATE_2);
                }
            } else if (url.includes(AGENCYROUTES.AGENCY_UPDATE_4)) {
                if (
                    window.confirm(
                        'Your Previous Saved Documents Will Be Lost'
                    ) === true
                ) {
                    props.history.replace(AGENCYROUTES.AGENCY_UPDATE_3);
                }
            } else if (url.includes(AGENCYROUTES.QUOTATIONS)) {
                props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
            } else if (url.includes(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST))
                props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
            else {
                props.history.goBack();
            }
        } else {
            props.history.goBack();
        }
    };

    const getStepsCompleted = () => {
        instance
            .get(`api/${role}/agencies/steps-completed`)
            .then(function (response) { });
    };

    useEffect(() => {
        if (
            url.includes(AGENCYROUTES.AGENCY_UPDATE_1) ||
            url.includes(AGENCYROUTES.AGENCY_UPDATE_2) ||
            url.includes(AGENCYROUTES.AGENCY_UPDATE_3) ||
            url.includes(AGENCYROUTES.AGENCY_UPDATE_4)
        ) {
            getStepsCompleted();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="back-button_newestAddDeveloper">
            <div className="image-div_newestAddDeveloper" onClick={goBack}>
                <div className="hover">
                    <img src={BackLeft} alt="done" />
                </div>
                <h6>Back</h6>
            </div>
            <div
                style={{ width: url.includes('enter-email') && '84%' }}
                className="add-developer-div"
            >
                <h6>{props.name}</h6>
            </div>
        </div>
    );
}
export default withRouter(Back);
