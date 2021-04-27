import { Classification } from "../models/Classification";
export type ClassificationRequest = {
  AID: number;
  classification: Classification;
};
const objectToQueryString = (obj: any) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

const URL = "http://localhost:8080/answers";

const UNCLASSSIFIED_ANSWERS = "/unclassifiedAnswers?";
const CLASSSIFIED_ANSWERS = "/classifiedAnswers?";
const FIND_BY_ID = "/findById?";
const CLASSIFICATE_QUESTION = "/classificateAQuestion";

type User = { user: string };
type Id = { id: number };

export const getUnclassifiedAnswers = (user: User) => {
  const QUERY_PARAMS_URL = objectToQueryString(user);
  const UNCLASSSIFIED_ANSWERS_URL =
    URL + UNCLASSSIFIED_ANSWERS + QUERY_PARAMS_URL;
  return fetch(UNCLASSSIFIED_ANSWERS_URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
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
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => res.json());
};

export const findQuestionById = (id: Id) => {
  const QUERY_PARAMS_URL = objectToQueryString(id);
  console.log(QUERY_PARAMS_URL);
  const FIND_QUESTION_BY_ID_URL = URL + FIND_BY_ID + QUERY_PARAMS_URL;
  return fetch(FIND_QUESTION_BY_ID_URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status == 200) {
      return res.json();
    }
    return undefined;
  });
};

export const classificateAQuestion = (
  classification: ClassificationRequest
) => {
  const FIND_QUESTION_BY_ID_URL = URL + CLASSIFICATE_QUESTION;
  return fetch(FIND_QUESTION_BY_ID_URL, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(classification),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((res) => {
    if (res.status == 200) {
      return "sucesss";
    }
    return "err";
  });
};
