import React from 'react'
import Homepage9 from './component/Homepage9';
import Homepage5 from './component/Homepage5';

import { Route, Switch } from 'react-router-dom';
import SecondPage from './component/SecondPage';
import Requirement from './component/Requirement';
import Description from './component/Description';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage9} />
      <Route exact path="/next_page" component={Homepage5} />
      <Route exact path="/requirement" component={Requirement} />
      <Route exact path="/description" component={Description} />
      {/* <Route exact path="/next_page1" component={SecondPage} /> */}
    </Switch>
  );
}

export default App;
