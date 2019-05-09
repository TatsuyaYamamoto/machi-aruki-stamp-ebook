import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { initializeApp, auth } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "styled-components";

import MapPage from "./components/pages/MapPage";
import SearchPage from "./components/pages/SearchPage";

import { User } from "./domains/User";

initializeApp({
  apiKey: "AIzaSyCfQGifstP7j9cJMMI6sym965OpIlPoKbU",
  authDomain: "numazu-machi-aruki-dev.firebaseapp.com",
  projectId: "numazu-machi-aruki-dev"
});

auth()
  .signInAnonymously()
  .then(user => {
    console.log("success to login.", user);
    User.create(user.user);
  });

const toDefaultPage = () => <Redirect to={`/map`} />;

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/map" component={MapPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="*" component={toDefaultPage} />
    </Switch>
  </BrowserRouter>
);

const theme = createMuiTheme({});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routing />
        </MuiThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
