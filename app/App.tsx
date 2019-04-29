import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { initializeApp, auth } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import CssBaseline from "@material-ui/core/CssBaseline";

import MapPage from "./components/pages/MapPage";
import SearchPage from "./components/pages/SearchPage";

import { User } from "./domains/User";

initializeApp({
  apiKey: "AIzaSyBTItNGmGoqu4JDuXgG7d6TOaJy8etAw-Y",
  projectId: "machi-aruki-stamp-ebook-dev",
  authDomain: "machi-aruki-stamp-ebook-dev.firebaseapp.com"
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
const App = () => {
  return (
    <>
      <CssBaseline />
      <Routing />
    </>
  );
};

export default App;
