import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Mainhomepage from "./Routes/LandingPage/Mainhomepage";
import PageNotFound from "./Routes/PageNotFound/PageNotFound";
import Login from "./Routes/Login/Login";
import Register from "./Routes/Register/Register.jsx";
import VerifyPage from "./Components/Verify_Page/Verify_Page";
// import NewReactPage from './Components/NewReactPage/NewReactPage';

import AddingDeveloper from "./Routes/Dashboard/AddDeveloper.js/AddingDeveloper";
import Quotation from "./Routes/Dashboard/Quotation/Quotation";
import AgencyProfile from "./Routes/Dashboard/AgencyProfile";
import AgencyForm1 from "./Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm1";
import AgencyForm2 from "./Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm2";
import AgencyForm3 from "./Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm3";
import AgencyForm4 from "./Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm4";
import ProjectDetails from "./Routes/Dashboard/ProjectDetails";
import AgencyProjectDetails from "./Routes/Dashboard/AgencyProjectDetails";

import HireAgencyForm1 from "./Routes/Client/Dashboard/HireAgency/HireAgencyForm1";
import HireAgencyForm2 from "./Routes/Client/Dashboard/HireAgency/HireAgencyForm2";
import HireAgencyForm3 from "./Routes/Client/Dashboard/HireAgency/HireAgencyForm3";
import ShortTerm from "./Routes/Client/Dashboard/ShortTerm/ShortTerm";
import HireDeveloper from "./Routes/Client/Dashboard/HireDeveloper/HireDeveloper";

import AgencyList from "./Routes/Client/AgencyList/AgencyList";
import ClientProfile from "./Routes/Client/ClientProfile";
import CustomRoute from "./HOCRoute/CustomRoute";
import GetClientHireDeveloper from "./Routes/Client/ClientHireDeveloper/getClientHireDeveloper";
import ClientOneHireDeveloper from "./Routes/Client/ClientOneHireDeveloper/ClientOneHireDeveloper";
import SharedDevelopers from "./Routes/Client/SharedDevelopers/SharedDevelopers";
import PasswordReset from "./Routes/PasswordReset/PasswordReset";
import EnterEmail from "./Routes/EnterEmail/EnterEmail";

import ProductForm from "./Routes/Agency/Product/ProductForm";
import ProductDetails from "./Routes/Agency/Product/ProductDetails";
import ProductAgencies from "./Routes/Agency/Product/ProductAgencies";
import Portfolio from "./Routes/Agency/Portfolio/Portfolio";

import ClientNewestDashboard from "./Routes/Client/ClientNewestDashboard";
import AgencyNewestDashboard from "./Routes/Dashboard/AgencyNewestDashboard";

import AgencyNewestAllProject from "./Routes/Dashboard/AgencyNewestAllProject";

import { withRouter } from "react-router";
import "./App.css";
import firebaseConfig from "./firebase";
import Notification from "./Utils/Notification";
import store from "./Redux/Store/store";
import { CLIENT, AGENCY } from "./shared/constants";

const App = (props) => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const msg = firebaseConfig.messaging();
    if (window.Notification.permission === "granted") {
      msg.onMessage((message) => {
        setShow(true);
        setNotification({
          title: message?.notification?.title,
          body: message?.notification?.body,
        });
        store.dispatch({
          type: "NOTIFICATION",
          notification: 1,
        });
        setShow(false);
      });
    }
  }, []);

  return (
    <>
      {show ? (
        <Notification
          title={notification.title}
          body={notification.body}
          show={show}
        />
      ) : null}

      <Switch>
        <Route exact path="/" component={Mainhomepage} />
        <Route exact path="/Verify_Page" component={VerifyPage} />
        <Route exact path="/login/:role" component={Login} />
        <Route exact path="/register/:role" component={Register} />
        <Route exact path="/enter-email" component={EnterEmail} />
        <Route exact path="/password-reset/:token" component={PasswordReset} />

        <Route exact path="/page-not-found" component={PageNotFound} />

        <Route
          exact
          path="/agencyNewestAllProject"
          component={AgencyNewestAllProject}
        />

        <CustomRoute
          condition={AGENCY}
          exact
          path="/agencyNewestDashboard"
          component={AgencyNewestDashboard}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/add-developer"
          component={AddingDeveloper}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/quotation"
          component={Quotation}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-form-one"
          component={AgencyForm1}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-form-two"
          component={AgencyForm2}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-form-three"
          component={AgencyForm3}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-form-four"
          component={AgencyForm4}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/product-form"
          component={ProductForm}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-project-details/:projectId"
          component={AgencyProjectDetails}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/agency-profile"
          component={AgencyProfile}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/portfolio"
          component={Portfolio}
        />
        <CustomRoute
          condition={AGENCY}
          exact
          path="/shared-developers"
          component={SharedDevelopers}
        />

        {/* <CustomRoute condition={AGENCY} exact path="/agency-project-dashboard" component={AgencyProjectDashboard} /> */}
        {/* Both */}
        <Route
          exact
          path="/agency-project-details"
          component={AgencyProjectDetails}
        />
        <Route
          exact
          path="/product-details/:productId"
          component={ProductDetails}
        />
        {/* Client Components  */}
        <CustomRoute
          condition={CLIENT}
          exact
          path="/agency-profile/:id"
          component={AgencyProfile}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/product-agencies"
          component={ProductAgencies}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/clientNewestDashboard"
          component={ClientNewestDashboard}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/client-one-hire-developer/:hireDeveloperId"
          component={ClientOneHireDeveloper}
        />
        {/* <CustomRoute condition={CLIENT} exact path="/shared-developers/:hireDeveloperId/:agencyId" component={SharedDevelopers} /> */}

        <CustomRoute
          condition={CLIENT}
          exact
          path="/get-client-hire-developer"
          component={GetClientHireDeveloper}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/project-details/:projectId"
          component={ProjectDetails}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/project-details/:projectId/:agencyId"
          component={ProjectDetails}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/hire-agency-form-one"
          component={HireAgencyForm1}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/hire-agency-form-two/:projectId"
          component={HireAgencyForm2}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/hire-agency-form-three/:projectId"
          component={HireAgencyForm3}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/short-term"
          component={ShortTerm}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/hire-developer"
          component={HireDeveloper}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/agency-list/:projectId"
          component={AgencyList}
        />
        <CustomRoute
          condition={CLIENT}
          exact
          path="/client-profile"
          component={ClientProfile}
        />
        <CustomRoute component={PageNotFound} />
        {/* <Suspence fallback={<div>...loading</div>}></Suspence> */}
      </Switch>
    </>
  );
};

export default withRouter(App);
