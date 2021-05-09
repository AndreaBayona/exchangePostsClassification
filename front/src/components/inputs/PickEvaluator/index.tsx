import React from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

const PickEvaluator = () => {
  const [evaluator, setEvaluator] = React.useState("Select one option");
  const history = useHistory();
  return (
    <Container>
      <div>Select evaluator name</div> <br></br>
      <DropdownButton
        id={`dropdown-variants-${"Info"}`}
        variant={"Info".toLowerCase()}
        title={evaluator}
      >
        <Dropdown.Item
          onClick={() => {
            setEvaluator("Ana");
          }}
        >
          Ana
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setEvaluator("Mario");
          }}
        >
          Mario
        </Dropdown.Item>
      </DropdownButton>
      <br></br>
      <Button
        variant="info"
        onClick={() => history.push(`/pickAnswers/${evaluator}`)}
      >
        Go
      </Button>{" "}
    </Container>
  );
};

export default PickEvaluator;
