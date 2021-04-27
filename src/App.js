import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Mainhomepage from './Routes/LandingPage/Mainhomepage'
import Dashboard from './Routes/Dashboard/Dashboard'
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
import RespondedDetails from './Routes/Dashboard/Quotation/RespondedDetails';
import ProjectDetails from './Routes/Dashboard/ProjectDetails';


import ClientDashboard from './Routes/Client/Dashboard/Dashboard'
import HireAgencyForm1 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm1';
import HireAgencyForm2 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm2';
import HireAgencyForm3 from './Routes/Client/Dashboard/HireAgency/HireAgencyForm3';
import ShortTerm from './Routes/Client/Dashboard/ShortTerm/ShortTerm';
import HireDeveloper from './Routes/Client/Dashboard/HireDeveloper/HireDeveloper';
import AgencyList from './Routes/Client/AgencyList/AgencyList';

// import Requirement from './component/Requirement';
// import Description from './component/Description';
// import RequirementExtended from './component/RequirementExtended';
// import ThankyouPage from './component/ThankyouPage';
const App = () => (
  <Switch>
    <Route exact path='/' component={Mainhomepage} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/register:role' component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/add-developer" component={AddingDeveloper} />
    <Route exact path="/quotation" component={Quotation} />
    <Route exact path="/agency-profile" component={AgencyProfile} />
    <Route exact path="/agency-profile:id" component={AgencyProfile} />
    <Route exact path="/agency-form-one" component={AgencyForm1} />
    <Route exact path="/agency-form-two" component={AgencyForm2} />
    <Route exact path="/agency-form-three" component={AgencyForm3} />
    <Route exact path="/agency-form-four" component={AgencyForm4} />
    <Route exact path="/project-details" component={ProjectDetails} />
    <Route exact path="/login:role" component={Login} />

    {/* Client Components  */}
    <Route exact path="/client-dashboard" component={ClientDashboard} />
    <Route exact path="/hire-agency-form-one" component={HireAgencyForm1} />
    <Route exact path="/hire-agency-form-two" component={HireAgencyForm2} />
    <Route exact path="/hire-agency-form-three" component={HireAgencyForm3} />
    <Route exact path="/short-term" component={ShortTerm} />
    <Route exact path="/hire-developer" component={HireDeveloper} />
    <Route exact path="/agency-list" component={AgencyList} />


  </Switch>
)

// function App() {
//   return (
//     <Switch>
//       <Route exact path = '/' component = {Mainhomepage} />
//       <Route exact path = '/login' component = {Login} />
//       <Route exact path = '/filtration' component = {Filtration} />
//       <Route exact path = '/agency:name' component = {Agency} />
//       {/* <Route exact path="/agency" component={Agency} />
//       <Route exact path="/client" component={Client} />
//       <Route exact path="/login" component={Login} />
//       <Route exact path="/requirement" component={Requirement} />
//       <Route exact path="/requirementex" component={RequirementExtended} />
//       <Route exact path="/description" component={Description} />
//       <Route exact path="/thankyoupage" component={ThankyouPage} /> */}
//     </Switch>
//   );
// }

export default App;
