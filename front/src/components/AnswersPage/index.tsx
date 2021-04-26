import * as React from "react";
import {useParams, NavLink} from "react-router-dom";
import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";
import {Question} from "../Question";

import {Wrapper, Arrows, NavButtons} from './styles';
import {Answer} from "../../models/Answer";

export const AnswersPage = () => {
    let { username, answersGroup } : any = useParams();
    const [ans, setAns] = React.useState<undefined | Answer>(undefined);
    const [size, setSize] = React.useState(0);
    const [index, setIndex] = React.useState(0);
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
            });
        }
    }, []);

    const manageIndex = (value: number) => {
        if(value > 0 && index == size -1){

        }
        else if(value < 0 && index == 0){

        }
        else {
            setIndex(index+value);
            setAns(answersList[index]);
        }
    };

    return (
        <Wrapper>
            <Arrows>
                <NavButtons onClick={()=> setIndex(index-1)}>Previous</NavButtons>
                <div> {size} question(s) remaining</div>
                <NavButtons onClick={()=> setIndex(index+1)}>Next</NavButtons>
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