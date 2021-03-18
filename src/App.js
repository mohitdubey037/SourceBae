import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Mainhomepage from './Routes/LandingPage/Mainhomepage'
// import Agency from './component/Agency';
// import Client from './component/Client';
// import Login from './component/Login';

// import Requirement from './component/Requirement';
// import Description from './component/Description';
// import RequirementExtended from './component/RequirementExtended';
// import ThankyouPage from './component/ThankyouPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Mainhomepage} />
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
