import React from "react";
import env from "react-dotenv";

const QUESTIONS_END_POINT = "/questions";
const URL = env.API_URL + QUESTIONS_END_POINT;
const TestComponent = () => {
  fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.preguntas);
    });

  return <div></div>;
};

export default TestComponent;
