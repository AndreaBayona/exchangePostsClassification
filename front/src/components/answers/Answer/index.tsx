import * as React from "react";

import { Text, Title} from "../../Common/fonts";
import { Button } from "../../Common/buttons";
import { Form } from "../../inputs/Form";
import { Classification } from "../../../models/Classification";
import { Answer as AnswerData } from "../../../models/Answer";

import { Container, Options, Url } from "./styles";
import {
    classificateAQuestion, ClassificationRequest,
} from "../../../services";
import { AlertWrapper } from "../AnswersPage/styles";
import { Modal } from "react-bootstrap";

import { FormProvider } from "../../../contexts/form";
import {AnswersContext} from "../AnswersPage";

type Props = {
  answer: AnswerData;
  classification?: Classification;
  type: string;
  userName: string;
};

export const Answer: React.FunctionComponent<Props> = ({ answer, type, userName, classification }) => {
  const [edit, setEdit] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [classy, setClassy] = React.useState(classification);

  const {list, updateList, index} = React.useContext(AnswersContext);

  const Submit = (newClassification: Classification) => {
    console.log("INPUTS", newClassification);
      const classificationRequest = {
          classification: newClassification,
      } as ClassificationRequest;
    classificateAQuestion(classificationRequest).then(
      (ans) => {
        console.log(ans);
        setMsg("Your classification has been saved correctly!");
        setShow(true);
        setClassy(newClassification);
        updateList(list[index].classifications[0] = newClassification)
      },
      (ans) => {
        setMsg("Your form could not not be saved. Try again.");
        setShow(true);
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
            <Form
                key={"Classification" + answer.AID}
                submitForm={Submit}
                classification={classy}
                username={userName}
                answerID={answer.AID} />
          </FormProvider>
        )}
      </div>
    </Container>
  );
};
