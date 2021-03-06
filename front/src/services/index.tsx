import { Classification } from "../models/Classification";
import {OptionForm} from "../models/OptionForm";

export type ClassificationRequest = {
  classification: Classification;
};

export type OptionFormRequest = {
  formOption: OptionForm;
};

const objectToQueryString = (obj: any) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};
//172.24.98.191
const SERVER = "172.24.98.191";
const PORT = 8080; //3000
const URL = `http://${SERVER}:${PORT}/answers`;

const UNCLASSSIFIED_ANSWERS = "/unclassifiedAnswers?";
const CLASSSIFIED_ANSWERS = "/classifiedAnswers?";
const FIND_BY_ID = "/findById?";
const CLASSIFICATE_QUESTION = "/classificate";
const GET_FORM_OPTIONS = "/getOptions?";
const UPDATE_FORM_OPTIONS = "/updateOption";

type User = { user: string };
type Id = { id: number };
type FormQuestion = {question: string};

export const getUnclassifiedAnswers = (user: User) => {
  const QUERY_PARAMS_URL = objectToQueryString(user);
  const UNCLASSSIFIED_ANSWERS_URL =
    URL + UNCLASSSIFIED_ANSWERS + QUERY_PARAMS_URL;
  return fetch(UNCLASSSIFIED_ANSWERS_URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => res.json());
};

export const getClassifiedAnswers = (user: User) => {
  const QUERY_PARAMS_URL = objectToQueryString(user);
  const CLASSSIFIED_ANSWERS_URL = URL + CLASSSIFIED_ANSWERS + QUERY_PARAMS_URL;
  console.log("CLASSSIFIED_ANSWERS_URL", CLASSSIFIED_ANSWERS_URL);
  return fetch(CLASSSIFIED_ANSWERS_URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => res.json());
};

export const findQuestionById = (id: Id) => {
  const QUERY_PARAMS_URL = objectToQueryString(id);
  console.log(QUERY_PARAMS_URL);
  const URL_REQUEST = URL + FIND_BY_ID + QUERY_PARAMS_URL;
  return fetch(URL_REQUEST, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return undefined;
  });
};

export const classificateAQuestion = (
  classification: ClassificationRequest
) => {
  const URL_REQUEST = URL + CLASSIFICATE_QUESTION;
  return fetch(URL_REQUEST, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(classification),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status === 200) {
      return "sucesss";
    }
    throw new Error("Backend error " + res.status);
  });
};

export const updateFormQuestionOptions = (
    option: OptionFormRequest
) => {
  const URL_REQUEST = URL + UPDATE_FORM_OPTIONS;
  return fetch(URL_REQUEST, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(option),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status === 200) {
      return option;
    }
    throw new Error("Backend error " + res.status);
  });
};

export const getFormOptionsFromQuestionName = (question : FormQuestion) => {
  const QUERY_PARAMS_URL = objectToQueryString(question);
  console.log(QUERY_PARAMS_URL);
  const URL_REQUEST = URL + GET_FORM_OPTIONS + QUERY_PARAMS_URL;
  return fetch(URL_REQUEST, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": `http://${SERVER}:${PORT}`,
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return undefined;
  });
}