import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

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
      <CssBaseline />
      <Routing />
    </>
  );
};

export default App;
