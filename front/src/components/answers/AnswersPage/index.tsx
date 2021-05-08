import * as React from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ReactComponent as LeftArrow } from "../../../icons/chevron-left-solid.svg";
import { ReactComponent as RightArrow } from "../../../icons/chevron-right-solid.svg";

import {
  getClassifiedAnswers,
  getUnclassifiedAnswers,
} from "../../../services";
import { Question } from "../Question";

import {
  Wrapper,
  Arrows,
  QuestionNumberWrapper,
  IconBox,
  ErrorMessage,
} from "./styles";
import { Answer } from "../../../models/Answer";

const ARROWS_SIZE = 16;

export const AnswersPage = () => {
  let { username, answersGroup }: any = useParams();
  const [answers, setAnswers] = React.useState<undefined | Answer[]>(undefined);
  const [size, setSize] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  let answersList: Answer[] = [];

  React.useEffect(() => {
    if (answersGroup === "classified") {
      getClassifiedAnswers({ user: username }).then((ans) => {
        answersList = ans as Answer[];
        setAnswers(answersList);
        setSize(answersList.length);
        setShowRightArrow(answersList.length > 1);
        setLoading(false);
        console.log(answersList, answersList.length);
      });
    } else {
      getUnclassifiedAnswers({ user: username }).then((ans) => {
        answersList = ans as Answer[];
        setAnswers(answersList);
        setSize(answersList.length);
        setShowRightArrow(answersList.length > 1);
        setLoading(false);
        console.log(answersList, answersList.length);
      });
    }
  }, []);

  const manageIndex = (value: number, answers: any) => {
    setLoading(true);
    if (value > 0 && index === size - 2) {
      setShowRightArrow(false);
      setIndex(index + value);
    } else if (value < 0 && index === 1) {
      setShowLeftArrow(false);
      setIndex(index + value);
    } else {
      setShowRightArrow(true);
      setShowLeftArrow(true);
      setIndex(index + value);
    }
    setLoading(false);
    console.log(answers[index].question[0]);
  };

  if (size === 0) {
    return (
      <ErrorMessage>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <h4>Error</h4>
            <p>You do not have {answersGroup} questions.</p>
          </>
        )}
      </ErrorMessage>
    );
  }
  return (
    <Wrapper>
      <Arrows>
        <IconBox>
          {showLeftArrow && (
            <LeftArrow
              onClick={() => manageIndex(-1, answers)}
              fill="currentColor"
              width={ARROWS_SIZE}
              height={ARROWS_SIZE}
            />
          )}
        </IconBox>
        <QuestionNumberWrapper>
          Question {index + 1} out of {size}
        </QuestionNumberWrapper>
        <IconBox>
          {showRightArrow && (
            <RightArrow
              onClick={() => manageIndex(1, answers)}
              fill="currentColor"
              width={ARROWS_SIZE}
              height={ARROWS_SIZE}
            />
          )}
        </IconBox>
      </Arrows>
      {answers && !loading &&(
        <Question
          question={answers[index].question[0]}
          answer={answers[index]}
          classifierName={username}
        />
      )}
    </Wrapper>
  );
};
