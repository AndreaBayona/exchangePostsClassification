import * as React from "react";

import { Answer } from "../Answer";
import { Text, Title } from "../../Common/fonts";
import { Container, Divider, Header, Url } from "./styles";
import { Question as QuestionData } from "../../../models/Question";
import { Answer as AnswerData } from "../../../models/Answer";
import {Classification} from "../../../models/Classification";

type Props = {
  question: QuestionData;
  answer: AnswerData;
  classifierName: string;
  classification?: Classification;
};

export const Question: React.FunctionComponent<Props> = ({
  question,
  answer,
  classifierName,
  classification,
}) => {
  return (
    <Container>
      <Header>
        <Title inheritColor>Question ID: {question.QID}</Title>
        <span>
          <Text>Classifier: {classifierName}</Text>
          <Text>Score: {question.QScore}</Text>
        </span>
      </Header>
      <Title>{question.Qtitle}</Title>
      <br />
      <Text>
        <span dangerouslySetInnerHTML={{ __html: question.QBody }} />
      </Text>
      <Url>
        <a href={question.url_question}>Original question URL</a>
      </Url>
      <Divider />
      <Answer
        key={"AnswerID"+answer._id}
        answer={answer}
        userName={classifierName}
        classification={classification}
        type={
          answer.type === "accepted" ? "Accepted answer" : "Most voted answer"
        }
      />
    </Container>
  );
};
