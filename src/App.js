import React from 'react'
import { Route, Switch } from 'react-router-dom';

// import ReactGA from 'react-ga';

import Mainhomepage from './Routes/LandingPage/Mainhomepage'
import Dashboard from './Routes/Dashboard/Dashboard'
import Filtration from './Routes/Filtration/Filtration';
// import Agency from './component/Agency';
// import Client from './component/Client';
// import Login from './component/Login';

// import Requirement from './component/Requirement';
// import Description from './component/Description';
// import RequirementExtended from './component/RequirementExtended';
// import ThankyouPage from './component/ThankyouPage';

// const trackingId = "G-SWJ1QYVF44";

// ReactGA.initialize(trackingId);
// ReactGA.set({
//   userId: currentUserId(),
//   // any data that is relevant to the user session
//   // that you would like to track with google analytics
// })
function App() {
  return (
    <Switch>
      {/* <Route exact path = '/dashboard' component = {Dashboard} /> */}
      <Route exact path = '/filtration' component = {Filtration} />
      <Route exact path="/dashboard" component={Dashboard} />
      {/* <Route exact path="/agency" component={Agency} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/requirement" component={Requirement} />
      <Route exact path="/requirementex" component={RequirementExtended} />
      <Route exact path="/description" component={Description} />
      <Route exact path="/thankyoupage" component={ThankyouPage} /> */}
    </Switch>
  );
}

export default App;
