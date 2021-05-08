import * as React from "react";

import { Text, Title} from "../../Common/fonts";
import { Button } from "../../Common/buttons";
import { Form } from "../../inputs/Form";
import { Classification } from "../../../models/Classification";
import { Answer as AnswerData } from "../../../models/Answer";

import { Container, Options, Url } from "./styles";
import {
  classificateAQuestion,
  ClassificationRequest,
} from "../../../services";
import { AlertWrapper } from "../AnswersPage/styles";
import { Modal } from "react-bootstrap";

import { FormProvider } from "../../../contexts/form";

type Props = {
  answer: AnswerData;
  type: string;
};

export const Answer: React.FunctionComponent<Props> = ({ answer, type }) => {
  const [edit, setEdit] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const Submit = (classification: Classification) => {
    const classificationRequest = {
      AID: answer.AID,
      classification: classification,
    } as ClassificationRequest;
    console.log("INPUTS", classification);
    classificateAQuestion(classificationRequest).then(
      (ans) => {
        console.log(ans);
        setShow(true);
        setMsg("Your classification has been saved correctly!");
        answer.classification = classification;
        answer.classified = true;
      },
      (ans) => {
        setShow(true);
        setMsg("Your form could not not be saved. Try again.");
        console.log(ans);
      }
    );
  };

  return (
    <Container>
      {show && (
        <AlertWrapper>
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Form information</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
          </Modal>
        </AlertWrapper>
      )}
      <Title>{type + " ID: " + answer.AID}</Title>
      <Text>Score: {answer.AScore}</Text>
      <br />
      <Text>
        <span dangerouslySetInnerHTML={{ __html: answer.ABody }} />
      </Text>
      <Url>
        <a href={answer.url_AcceptedAns}>Original answer URL</a>
      </Url>
      <Options>
        <Button onClick={() => setEdit(!edit)}>
          <Text inheritColor>Classify / edit</Text>
        </Button>
      </Options>
      <div>
        {edit && (
          <FormProvider>
            <Form submitForm={Submit} classification={answer.classification} />
          </FormProvider>
        )}
      </div>
    </Container>
  );
};
