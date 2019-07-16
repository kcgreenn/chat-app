import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import LoginComponent from "./Login/Login";
import SignupComponent from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard";

import * as serviceWorker from "./serviceWorker";

// Firebase Initialization
import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCd8Zv2Tyy9jfJRDTRCofuZc0uPUN9Fbdo",
  authDomain: "chat-app-dbad0.firebaseapp.com",
  databaseURL: "https://chat-app-dbad0.firebaseio.com",
  projectId: "chat-app-dbad0",
  storageBucket: "chat-app-dbad0.appspot.com",
  messagingSenderId: "815773259909",
  appId: "1:815773259909:web:9c4ea096c7512ab3"
});

const routing = (
  <Router>
    <Route path="/login" component={LoginComponent} />
    <Route path="/signup" component={SignupComponent} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
