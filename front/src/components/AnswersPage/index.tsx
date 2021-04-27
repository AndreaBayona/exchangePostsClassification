import * as React from "react";
import {useParams} from "react-router-dom";
import {Alert} from "react-bootstrap";

import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";
import {Question} from "../Question";

import {Wrapper, Arrows, NavButtons, AlertWrapper} from './styles';
import {Answer} from "../../models/Answer";

export const AnswersPage = () => {
    let { username, answersGroup } : any = useParams();
    const [answ, setAnsw] = React.useState<undefined | Answer[]>(undefined);
    const [size, setSize] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    let answersList: Answer[] = [];

    React.useEffect(() => {
        if(answersGroup === "classified"){
            getClassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAnsw(answersList);
                setSize(answersList.length);
                console.log(answersList, answersList.length)
            });
        }
        else {
            getUnclassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAnsw(answersList);
                setSize(answersList.length);
                console.log(answersList, answersList.length)
            });
        }
    }, []);

    const manageIndex = (value: number) => {
        console.log("INDEX", index)
        if(value > 0 && index == size -1){
            setShow(true);
            setMsg("You have reached the end of the list");
        }
        else if(value < 0 && index == 0){
            setShow(true);
            setMsg("You have reached the beginning of the list");
        }
        else {
            setIndex(index+value);
            console.log("ARRAY", answ);
        }
    };
    return (
        <Wrapper>
            {show &&
                <AlertWrapper>
                    <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                        <p> {msg}</p>
                    </Alert>
                </AlertWrapper>
            }
            <Arrows>
                <NavButtons onClick={()=> manageIndex(-1)}>Previous</NavButtons>
                <div>Question {index + 1} out of {size}</div>
                <NavButtons onClick={()=> manageIndex(1)}>Next</NavButtons>
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