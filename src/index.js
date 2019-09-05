import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCU36VI_s7BD2aCJTBCTxAomUXh_e0xOsE",
  authDomain: "tien-len-multi.firebaseapp.com",
  databaseURL: "https://tien-len-multi.firebaseio.com",
  projectId: "tien-len-multi",
  storageBucket: "",
  messagingSenderId: "137319330002",
  appId: "1:137319330002:web:34caa6f7891f5a67"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
