import * as React from "react";
import {useParams} from "react-router-dom";
import {Alert} from "react-bootstrap";

import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";
import {Question} from "../Question";

import {Wrapper, Arrows, NavButtons, AlertWrapper} from './styles';
import {Answer} from "../../models/Answer";

export const AnswersPage = () => {
    let { username, answersGroup } : any = useParams();
    const [ans, setAns] = React.useState<undefined | Answer>(undefined);
    const [size, setSize] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    console.log(username + " " + answersGroup);
    let answersList: Answer[] = [];

    React.useEffect(() => {
        if(answersGroup === "classified"){
            getClassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAns(answersList[0]);
                setSize(answersList.length);
                console.log(answersList, answersList.length)
            });
        }
        else {
            getUnclassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAns(answersList[0]);
                setSize(answersList.length);
                console.log(answersList, answersList.length)
            });
        }
    }, []);

    const manageIndex = (value: number) => {
        console.log("INDEXXX", index)
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
            setAns(answersList[index]);
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
                <div> {size} question(s) remaining</div>
                <NavButtons onClick={()=> manageIndex(1)}>Next</NavButtons>
            </Arrows>
            {ans &&
            <Question
                question={ans.question[0]}
                answer={ans}
                classifierName={username}/>
            }
        </Wrapper>
    );
};