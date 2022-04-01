import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from './Routes/L_About_us/Components/Page';
import PageNotFound from './Routes/PageNotFound/PageNotFound';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register.jsx';
import VerifyPage from './Components/Verify_Page/Verify_Page';

import AddingDeveloper from './Routes/Dashboard/AddDeveloper.js/AddingDeveloper';
import Quotation from './Routes/Dashboard/Quotation/Quotation';
import AgencyProfile from './Routes/Dashboard/AgencyProfile';
import AgencyForm1 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm1';
import AgencyForm2 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm2';
import AgencyForm3 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm3';
import AgencyForm4 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm4';
import ProjectDetails from './Routes/Dashboard/ProjectDetails';
import AgencyProjectDetails from './Routes/Dashboard/AgencyProjectDetails';

import HireAgencyForm1 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm1';
import HireAgencyForm2 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm2';
import HireAgencyForm3 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm3';
import ShortTerm from './Routes/Client/Dashboard/ShortTerm/ShortTerm';
import HireDeveloper from './Routes/Client/Dashboard/HireDeveloper/HireDeveloper';

import AgencyList from './Routes/Client/AgencyList/AgencyList';
import ClientProfile from './Routes/Client/ClientProfile';
import CustomRoute from './HOCRoute/CustomRoute';
import GetClientHireDeveloper from './Routes/Client/ClientHireDeveloper/getClientHireDeveloper';
import ClientOneHireDeveloper from './Routes/Client/ClientOneHireDeveloper/ClientOneHireDeveloper';
import SharedDevelopers from './Routes/Client/SharedDevelopers/SharedDevelopers';
import PasswordReset from './Routes/PasswordReset/PasswordReset';
import EnterEmail from './Routes/EnterEmail/EnterEmail';

import ProductForm from './Routes/Agency/Product/ProductForm';
import ProductDetails from './Routes/Agency/Product/ProductDetails';
import ProductAgencies from './Routes/Agency/Product/ProductAgencies';
import Portfolio from './Routes/Agency/Portfolio/Portfolio';

import ClientNewestDashboard from './Routes/Client/ClientNewestDashboard';
import AgencyNewestDashboard from './Routes/Dashboard/AgencyNewestDashboard';

import AgencyNewestAllProject from './Routes/Dashboard/AgencyNewestAllProject';

import { withRouter } from 'react-router';
import './App.css';
import firebaseConfig from './firebase';
import store from './Redux/Store/store';
import { CLIENT, AGENCY } from './shared/constants';
import { ErrorBoundary } from 'react-error-boundary';
import firebase from 'firebase/app';
import LandingPage from '../src/Routes/MainLandingPage/Page.jsx';
import ActiveRequirements from './Routes/Dashboard/ActiveRequirements/ActiveRequirements';
import RequirementListing from './Routes/Agency/RequirementList/RequirementListing';
import DevelopersRequest from './Routes/Client/DeveloperRequest/DeveloperRequest';
import { AGENCYROUTES, CLIENTROUTES, USERROUTES } from './Navigation/CONSTANTS';
import { useHistory } from 'react-router-dom';
const App = () => {
    const history = useHistory();
    useEffect(() => {
        if (
            firebase.messaging.isSupported() &&
            window.Notification.permission === 'granted'
        ) {
            const msg = firebaseConfig.messaging();
            msg.onMessage(() => {
                store.dispatch({
                    type: 'NOTIFICATION',
                    notification: 1
                });
            });
        }
    }, []);
    return (
        <>
            <ErrorBoundary
                FallbackComponent={() => (
                    <div
                        style={{
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <h4>
                            An Error Occured while performing the last action.
                        </h4>
                        <br />
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary"
                        >
                            Try again
                        </button>
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="btn btn-primary mt-2"
                        >
                            Redirect to SourceBae.com
                        </button>
                    </div>
                )}
            >
                <Switch>
                    {/* USER ROUTES */}
                    <Route
                        exact
                        path={USERROUTES.HOME}
                        component={LandingPage}
                    />
                    <Route
                        exact
                        path={USERROUTES.NOT_FOUND}
                        component={PageNotFound}
                    />
                    <Route exact path={USERROUTES.ABOUT_US} component={Page} />
                    <Route
                        exact
                        path={USERROUTES.ACTIVE_REQUIREMENTS}
                        component={ActiveRequirements}
                    />

                    <Route
                        exact
                        path={USERROUTES.VERIFY_PAGE}
                        component={VerifyPage}
                    />

                    <Route
                        exact
                        path={USERROUTES.RESET_PASSWORD}
                        component={PasswordReset}
                    />

                    <Route exact path={AGENCYROUTES.REGISTER}>
                        <Register history={history} roles={AGENCY} />
                    </Route>
                    <Route exact path={CLIENTROUTES.REGISTER}>
                        <Register history={history} roles={CLIENT} />
                    </Route>
                    <Route
                        exact
                        path="/enter-email/:role"
                        component={EnterEmail}
                    />

                    {/* AGENCY ROUTES */}

                    <Route exact path={CLIENTROUTES.LOGIN}>
                        <Login history={history} roles={CLIENT} />
                    </Route>

                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.DASHBOARD}
                        component={AgencyNewestDashboard}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.ADD_DEVELOPER}
                        component={AddingDeveloper}
                    />

                    <Route exact path={AGENCYROUTES.LOGIN}>
                        <Login history={history} roles={AGENCY} />
                    </Route>

                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST}
                        component={RequirementListing}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.QUOTATIONS}
                        component={Quotation}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.AGENCY_UPDATE_1}
                        component={AgencyForm1}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.AGENCY_UPDATE_2}
                        component={AgencyForm2}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.AGENCY_UPDATE_3}
                        component={AgencyForm3}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.AGENCY_UPDATE_4}
                        component={AgencyForm4}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.PRODUCT_FORM}
                        component={ProductForm}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={`${AGENCYROUTES.PROJECT_DETAILS}/:projectId`}
                        component={AgencyProjectDetails}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.PROFILE}
                        component={AgencyProfile}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.PORTFOLIO}
                        component={Portfolio}
                    />
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={AGENCYROUTES.SHARED_DEVELOPERS}
                        component={SharedDevelopers}
                    />

                    {/* Both */}
                    <CustomRoute
                        condition={AGENCY}
                        exact
                        path={`${AGENCYROUTES.PRODUCT_DETAILS}/:productId`}
                        component={ProductDetails}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.PRODUCT_DETAILS}/:productId`}
                        component={ProductDetails}
                    />

                    {/* Client Components  */}

                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.DEVELOPER_REQUESTS}
                        component={DevelopersRequest}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.PROJECT_LIST}
                        component={AgencyNewestAllProject}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.INVESTMENT_OPPORTUNITIES}
                        component={ProductAgencies}
                    />

                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.SHORTLIST_DEVELOPER}/:hireDeveloperId`}
                        component={ClientOneHireDeveloper}
                    />

                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.DEVELOPER_HIRE_REQUIREMENTS}
                        component={GetClientHireDeveloper}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path="/project-details/:projectId"
                        component={ProjectDetails}
                    />

                    {/* CLIENT ROUTES */}
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.HIRE_DEVELOPER}
                        component={HireDeveloper}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.PROJECT_DETAILS}/:projectId/:agencyId`}
                        component={ProjectDetails}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1}
                        component={HireAgencyForm1}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_2}/:projectId`}
                        component={HireAgencyForm2}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_3}/:projectId`}
                        component={HireAgencyForm3}
                    />

                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${AGENCYROUTES.PROFILE}/:id`}
                        component={AgencyProfile}
                    />

                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.DASHBOARD}
                        component={ClientNewestDashboard}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.CREATE_SHORT_TERM_PROJECT}
                        component={ShortTerm}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={`${CLIENTROUTES.AGENCIES_LIST}/:projectId`}
                        component={AgencyList}
                    />
                    <CustomRoute
                        condition={CLIENT}
                        exact
                        path={CLIENTROUTES.PROFILE}
                        component={ClientProfile}
                    />
                    <CustomRoute component={PageNotFound} />
                </Switch>
            </ErrorBoundary>
        </>
    );
};

export default withRouter(App);
