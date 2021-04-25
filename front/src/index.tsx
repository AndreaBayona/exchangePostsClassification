import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import env from "react-dotenv";

const QUESTIONS_END_POINT = "/questions";
const URL = "http://localhost:3000" + QUESTIONS_END_POINT;
fetch(URL, {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
