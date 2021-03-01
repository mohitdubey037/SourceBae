import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Mainhomepage from './component/Mainhomepage';
import Agency from './component/Agency';
import Client from './component/Client';
import Requirement from './component/Requirement';
import Description from './component/Description';
import RequirementExtended from './component/RequirementExtended';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Mainhomepage} />
      <Route exact path="/agency" component={Agency} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/requirement" component={Requirement} />
      <Route exact path="/requirementex" component={RequirementExtended} />
      <Route exact path="/description" component={Description} />
    </Switch>
  );
}

export default App;
