import React from "react";
import { Container } from "../PickEvaluator/styles";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

export const PickAnswersSet = () => {
  const [answers, setAnswers] = React.useState("Select an option");
  const { username }: any = useParams();
  const history = useHistory();
  console.log(username);
  return (
    <Container>
      <div>Select a set of answers</div> <br></br>
      <DropdownButton
        id={`dropdown-variants-${"Info"}`}
        variant={"Info".toLowerCase()}
        title={answers}
      >
        <Dropdown.Item
          onClick={() => {
            setAnswers("classified");
          }}
        >
          Classified
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setAnswers("not-classified");
          }}
        >
          Not classified
        </Dropdown.Item>
      </DropdownButton>
      <br></br>
      <Button
        variant="info"
        onClick={() => history.push(`/answers/${username}/${answers}`)}
      >
        Go
      </Button>{" "}
    </Container>
  );
};
