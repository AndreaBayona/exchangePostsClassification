import * as React from "react";
import {useParams} from "react-router-dom";
import {Alert} from "react-bootstrap";

import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";
import {Question} from "../Question";

import {Wrapper, Arrows, NavButtons, QuestionNumberWrapper} from './styles';
import {Answer} from "../../models/Answer";

export const AnswersPage = () => {
    let { username, answersGroup } : any = useParams();
    const [answ, setAnsw] = React.useState<undefined | Answer[]>(undefined);
    const [size, setSize] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [showLeftArrow, setShowLeftArrow] = React.useState(false);
    const [showRightArrow, setShowRightArrow] = React.useState(false);
    let answersList: Answer[] = [];

    React.useEffect(() => {
        if(answersGroup === "classified"){
            getClassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAnsw(answersList);
                setSize(answersList.length);
                setShowRightArrow(answersList.length > 1);
                console.log(answersList, answersList.length)
            });
        }
        else {
            getUnclassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAnsw(answersList);
                setSize(answersList.length);
                setShowRightArrow(answersList.length > 1);
                console.log(answersList, answersList.length)
            });
        }
    }, []);

    const manageIndex = (value: number) => {
        console.log("INDEX", index)
        if(value > 0 && index == size -1){
            setShowRightArrow(false);
        }
        else if(value < 0 && index == 0){
            setShowLeftArrow(false);
        }
        else {
            setShowRightArrow(true);
            setShowLeftArrow(true);
            setIndex(index+value);
            console.log("ARRAY", answ);
        }
    };
    return (
        <Wrapper>
            <Arrows>
                {showLeftArrow && <NavButtons onClick={()=> manageIndex(-1)}>Previous</NavButtons>}
                <QuestionNumberWrapper>Question {index + 1} out of {size}</QuestionNumberWrapper>
                {showRightArrow && <NavButtons onClick={()=> manageIndex(1)}>Next</NavButtons>}
            </Arrows>
            {answ &&
            <Question
                question={answ[index].question[0]}
                answer={answ[index]}
                classifierName={username}/>
            }
        </Wrapper>
    );
};