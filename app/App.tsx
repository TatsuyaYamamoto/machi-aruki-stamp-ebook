import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MapPage from "./components/pages/MapPage";
import StampPage from "./components/pages/StampPage";

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/map" component={MapPage} />
      <Route path="/stamp" component={StampPage} />
    </Switch>
  </BrowserRouter>
);
const App = () => {
  return (
    <>
      <Routing />
    </>
  );
};

export default App;
