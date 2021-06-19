import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Mainhomepage from './Routes/LandingPage/Mainhomepage'
import Dashboard from './Routes/Dashboard/Dashboard'
import PageNotFound from './Routes/PageNotFound/PageNotFound';
// import Filtration from './Routes/Filtration/Filtration';
// import Agency from './Routes/Agency/Agency';
// import Agency from './component/Agency';
// import Client from './component/Client';
import Login from './Routes/Login/Login';
import Signup from './Routes/SignUp/Signup';
import Register from './Routes/Register/Register';
// import AddDeveloper from './Routes/Dashboard/AddDeveloper.js/AddDeveloper';
import AddingDeveloper from './Routes/Dashboard/AddDeveloper.js/AddingDeveloper';
import Quotation from './Routes/Dashboard/Quotation/Quotation';
import AgencyProfile from './Routes/Dashboard/AgencyProfile';
import AgencyForm1 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm1';
import AgencyForm2 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm2';
import AgencyForm3 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm3';
import AgencyForm4 from './Routes/Dashboard/AgencyProfile/AgencyForm/AgencyForm4';
import AgencyProjectDashboard from './Routes/Dashboard/AgencyProjectDashboard';
// import RespondedDetails from './Routes/Dashboard/Quotation/RespondedDetails';
import ProjectDetails from './Routes/Dashboard/ProjectDetails';
import AgencyProjectDetails from './Routes/Dashboard/AgencyProjectDetails';


import ClientDashboard from './Routes/Client/Dashboard/Dashboard'
import HireAgencyForm1 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm1';
import HireAgencyForm2 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm2';
import HireAgencyForm3 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm3';
import ShortTerm from './Routes/Client/Dashboard/ShortTerm/ShortTerm';
import HireDeveloper from './Routes/Client/Dashboard/HireDeveloper/HireDeveloper';
import AgencyList from './Routes/Client/AgencyList/AgencyList';
import ClientProfile from './Routes/Client/ClientProfile';
import ProductForm from './Routes/Agency/Product/ProductForm';
import ProductDetails from './Routes/Agency/Product/ProductDetails';
import ProductAgencies from './Routes/Agency/Product/ProductAgencies';
import CustomRoute from './HOCRoute/CustomRoute';

const App = () => {
  
  return (
  <Switch>
    <Route exact path='/' component={Mainhomepage} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path="/login:role" component={Login} />
    <Route exact path='/register:role' component={Register} />
    <Route exact path="/page-not-found" component = {PageNotFound} />

    <CustomRoute condition="Agency" exact path="/dashboard" component={Dashboard} />
    <CustomRoute condition="Agency" exact path="/agency-project-dashboard" component={AgencyProjectDashboard}/>
    <CustomRoute condition="Agency" exact path="/add-developer" component={AddingDeveloper} />
    <CustomRoute condition="Agency" exact path="/quotation" component={Quotation} />
    <CustomRoute condition="Agency" exact path="/agency-profile" component={AgencyProfile} />
    <CustomRoute condition="Client" exact path="/agency-profile:id" component={AgencyProfile} />
    <CustomRoute condition="Agency" exact path="/agency-form-one" component={AgencyForm1} />
    <CustomRoute condition="Agency" exact path="/agency-form-two" component={AgencyForm2} />
    <CustomRoute condition="Agency" exact path="/agency-form-three" component={AgencyForm3} />
    <CustomRoute condition="Agency" exact path="/agency-form-four" component={AgencyForm4} />
    <CustomRoute condition="Agency" exact path="/product-form" component={ProductForm} />
    <CustomRoute condition="Agency" exact path="/agency-project-details:projectId" component={AgencyProjectDetails} />

    {/* Both */}
    <Route exact path="/agency-project-details" component={AgencyProjectDetails} />

    {/* Client Components  */}
    <CustomRoute condition="Client" exact path="/project-details:projectId" component={ProjectDetails} />
    <CustomRoute condition="Client" exact path="/client-dashboard" component={ClientDashboard} />
    <CustomRoute condition="Client" exact path="/client-dashboard" component={ClientDashboard} />
    <CustomRoute condition='Client' exact path="/project-details/:projectId/:agencyId" component={ProjectDetails} />
    <CustomRoute condition='Client' exact path="/product-agencies" component={ProductAgencies} />
    <CustomRoute condition="Client" exact path="/hire-agency-form-one" component={HireAgencyForm1} />
    <CustomRoute condition="Client" exact path="/hire-agency-form-two:projectId" component={HireAgencyForm2} />
    <CustomRoute condition="Client" exact path="/hire-agency-form-three:projectId" component={HireAgencyForm3} />
    <CustomRoute condition="Client" exact path="/short-term" component={ShortTerm} />
    <CustomRoute condition="Client" exact path="/hire-developer" component={HireDeveloper} />
    <CustomRoute condition="Client" exact path="/agency-list:projectId" component={AgencyList} />
    <CustomRoute condition="Client" exact path="/client-profile" component={ClientProfile} />
    <CustomRoute condition="Client" exact path="/product-details" component={ProductDetails} />
    <CustomRoute condition="Client" component={PageNotFound} />

  </Switch>
)}


export default App;

