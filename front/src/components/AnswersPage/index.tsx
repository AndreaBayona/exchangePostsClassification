import * as React from "react";
import {useParams} from "react-router-dom";
import {ReactComponent as LeftArrow} from '../../icons/chevron-left-solid.svg';
import {ReactComponent as RightArrow} from '../../icons/chevron-right-solid.svg';

import {getClassifiedAnswers, getUnclassifiedAnswers} from "../../services";
import {Question} from "../Question";

import {Wrapper, Arrows, QuestionNumberWrapper, IconBox, ErrorMessage} from './styles';
import {Answer} from "../../models/Answer";

const ARROWS_SIZE = 16;

export const AnswersPage = () => {
    let {username, answersGroup}: any = useParams();
    const [answ, setAnsw] = React.useState<undefined | Answer[]>(undefined);
    const [size, setSize] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [showLeftArrow, setShowLeftArrow] = React.useState(false);
    const [showRightArrow, setShowRightArrow] = React.useState(false);
    let answersList: Answer[] = [];

    React.useEffect(() => {
        if (answersGroup === "classified") {
            getClassifiedAnswers({user: username}).then((ans) => {
                answersList = ans as Answer[];
                setAnsw(answersList);
                setSize(answersList.length);
                setShowRightArrow(answersList.length > 1);
                console.log(answersList, answersList.length)
            });
        } else {
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
        if (value > 0 && index == size - 2) {
            setShowRightArrow(false);
            setIndex(index + value);
        } else if (value < 0 && index == 1) {
            setShowLeftArrow(false);
            setIndex(index + value);
        } else {
            setShowRightArrow(true);
            setShowLeftArrow(true);
            setIndex(index + value);
        }
    };

    if (size === 0) {
        return (
            <ErrorMessage>
                <h4>Error</h4>
                <p>You do not have {answersGroup} questions.</p>
            </ErrorMessage>
        )
    }
    return (
        <Wrapper>
            <Arrows>
                <IconBox>
                    {showLeftArrow &&
                    <LeftArrow onClick={() => manageIndex(-1)} fill="currentColor" width={ARROWS_SIZE}
                               height={ARROWS_SIZE}/>
                    }
                </IconBox>
                <QuestionNumberWrapper>Question {index + 1} out of {size}</QuestionNumberWrapper>

                <IconBox>
                    {showRightArrow &&
                    <RightArrow onClick={() => manageIndex(1)} fill="currentColor" width={ARROWS_SIZE}
                                height={ARROWS_SIZE}/>
                    }
                </IconBox>

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