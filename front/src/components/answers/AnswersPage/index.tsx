import * as React from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ReactComponent as LeftArrow } from "../../../icons/chevron-left-solid.svg";
import { ReactComponent as RightArrow } from "../../../icons/chevron-right-solid.svg";
import {QuestionAnsElement} from "../../../models/QuestionAnsElement";

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

const ARROWS_SIZE = 16;

type ListContext = {
  list: QuestionAnsElement[];
  updateList: (list: any) => {};
  index: number;
  nextIndex: () => any;
};

const InitialAnsState: ListContext = {
  list: [],
  updateList: (list: any) => [],
  index: 0,
  nextIndex: () => [],
};
export const AnswersContext = React.createContext(InitialAnsState);

export const AnswersPage = () => {
  let { username, answersGroup }: any = useParams();
  const [answers, setAnswers] = React.useState<undefined | QuestionAnsElement[]>(undefined);
  const [actualAnswer, setActualAnswer] = React.useState<QuestionAnsElement>();
  const [size, setSize] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  let answersList: QuestionAnsElement[] = [];

  React.useEffect(() => {
    if (answersGroup === "classified") {
      getClassifiedAnswers({ user: username }).then((ans) => {
        answersList = ans as QuestionAnsElement[];
        setAnswers(answersList);
        setActualAnswer(answersList[0]);
        setSize(answersList.length);
        setShowRightArrow(answersList.length > 1);
        setLoading(false);
        console.log(answersList, answersList.length);
      });
    } else {
      getUnclassifiedAnswers({ user: username }).then((ans) => {
        answersList = ans as QuestionAnsElement[];
        setAnswers(answersList);
        setActualAnswer(answersList[0]);
        setSize(answersList.length);
        setShowRightArrow(answersList.length > 1);
        setLoading(false);
        console.log(answersList, answersList.length);
      });
    }
  }, []);

  const manageIndex = (value: number) => {
    if (value > 0 && index === size - 2) {
      setShowRightArrow(false);
      setShowLeftArrow(true);
      setIndex(index + value);
    } else if (value < 0 && index === 1) {
      setShowLeftArrow(false);
      setShowRightArrow(true);
      setIndex(index + value);
    } else {
      setShowRightArrow(true);
      setShowLeftArrow(true);
      setIndex(index + value);
    }
    if(answers && index+value >= 0 && index+value <= size) {
      setActualAnswer(answers[index+value]);
      console.log(answers[index+value].question[0]);
    }
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
              onClick={() => manageIndex(-1)}
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
              onClick={() => manageIndex(1)}
              fill="currentColor"
              width={ARROWS_SIZE}
              height={ARROWS_SIZE}
            />
          )}
        </IconBox>
      </Arrows>
      {answers && actualAnswer &&(
      <AnswersContext.Provider
          value={{list: answers, updateList: () => setAnswers, index: index, nextIndex: () => manageIndex(1)}}>
        <Question
          key={"Q"+index}
          question={actualAnswer.question[0]}
          answer={actualAnswer.answer}
          classifierName={username}
          classification={actualAnswer.classifications[0]}
        />
      </AnswersContext.Provider>
      )}
    </Wrapper>
  );
};
