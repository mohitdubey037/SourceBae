import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Mainhomepage from './Routes/LandingPage/Mainhomepage'
import Dashboard from './Routes/Dashboard/Dashboard'
import Filtration from './Routes/Filtration/Filtration';
import Agency from './Routes/Agency/Agency';
// import Agency from './component/Agency';
// import Client from './component/Client';
import Login from './Routes/Login/Login';
import Signup from './Routes/SignUp/Signup';
import Register from './Routes/Register/Register';

// import Requirement from './component/Requirement';
// import Description from './component/Description';
// import RequirementExtended from './component/RequirementExtended';
// import ThankyouPage from './component/ThankyouPage';

const App = () => (
  <Switch>
    <Route exact path = '/' component = {Mainhomepage} />
    <Route exact path = '/signup' component = {Signup} />
    <Route exact path = '/register:as' component = {Register} />
  </Switch>
)

// function App() {
//   return (
//     <Switch>
//       <Route exact path = '/' component = {Mainhomepage} />
//       <Route exact path = '/login' component = {Login} />
//       <Route exact path = '/filtration' component = {Filtration} />
//       <Route exact path="/dashboard" component={Dashboard} />
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
