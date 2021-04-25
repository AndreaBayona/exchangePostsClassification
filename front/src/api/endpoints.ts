export const SERVER_URL = "http://localhost:3000";

export const UNCLASSIFIED_ANSWERS = "/unclassifiedAnswers";

export const CLASSIFIED_ANSWERS = "/classifiedAnswers";

export const GET_ANSWERS_BY_USER = "/getByUserName";

export const UPDATE_QUESTION = "/updateQuestion";

export function getUnclassifiedAnswers () {
    fetch(SERVER_URL+UNCLASSIFIED_ANSWERS, {
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
};

