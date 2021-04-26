import * as React from "react";
import {useParams} from "react-router-dom";
import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";

import {Wrapper, Arrows} from './styles';
import {Answer} from "../../models/Answer";

export const AnswersPage = () => {
    let { username, answersGroup } : any = useParams();
    const [ans, setAns] = React.useState<undefined | Answer>(undefined);
    const [index, setIndex] = React.useState(0);
    console.log(username + " " + answersGroup);
    let answersList = [];

    React.useEffect(() => {
        if(answersGroup === "classified"){
            getClassifiedAnswers(username).then((ans) => {
                answersList = ans as Answer[];
            });
        }
        else {
            getUnclassifiedAnswers(username).then((ans) => {
                answersList = ans as Answer[];
            });
        }

    });

    console.log(answersList.length)

    return (
        <Wrapper>
            <p>Hola</p>
        </Wrapper>
    );

};