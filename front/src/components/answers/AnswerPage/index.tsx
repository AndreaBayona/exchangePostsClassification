import * as React from "react";
import { useParams } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { findQuestionById } from "../../../services";
import { AlertWrapper, ErrorMessage } from "../AnswersPage/styles";
import {QuestionAnsElement} from "../../../models/QuestionAnsElement";
import { Question } from "../Question";


export const AnswerPage = () => {
  let { id }: any = useParams();
  const [show, setShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [answerData, setAnswerData] = React.useState<undefined | QuestionAnsElement>(
    undefined
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!!id) {
      const idObj = { id: id };
      findQuestionById(idObj).then((ans) => {
        const answer = ans[0] as QuestionAnsElement;
        if (!answer) {
          setLoading(false);
          setShow(true);
          setMsg(`There is no answer with this id ${id}`);
        } else {
          setLoading(false);
          setAnswerData(answer);
        }
      });
    }
  }, id);

  return (
    <>
      {loading && (
        <ErrorMessage>
          <Spinner animation="border" variant="primary" />
        </ErrorMessage>
      )}
      {show && (
        <AlertWrapper>
          <Alert variant="primary" onClose={() => setShow(false)} dismissible>
            <p> {msg}</p>
          </Alert>
        </AlertWrapper>
      )}
      {answerData && (
        <Question
            key={answerData._id}
            question={answerData.question[0]}
            answer={answerData.answer}
            classifierName={answerData.user}
            classification={answerData.classifications[0]}
        />
      )}
    </>
  );
};
