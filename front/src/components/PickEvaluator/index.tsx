import React from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Container } from "./styles";
const options = ["Valerie", "Ana", "Andrea"];
const defaultOption = "";
const PickEvaluator = () => {
  const [evaluator, setEvaluator] = React.useState("Select one option");
  return (
    <Container>
      <div>Selecciona un evaluador</div> <br></br>
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
            setEvaluator("Andrea");
          }}
        >
          Andrea
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setEvaluator("Valerie");
          }}
        >
          Valerie
        </Dropdown.Item>
      </DropdownButton>
      <br></br>
      <Button variant="info">Seleccionar</Button>{" "}
    </Container>
  );
};

export default PickEvaluator;
