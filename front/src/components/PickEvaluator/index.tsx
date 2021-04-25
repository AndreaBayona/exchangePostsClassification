import React from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {PickAnswersSet} from '../PickAnswersSet/index';

import { Container, LinkOverride } from "./styles";

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

      <Button variant="info">
          <LinkOverride>
              <Link to="/pickAnswers">Go</Link>
          </LinkOverride>

       </Button>{" "}
        <Route path="/pickAnswers">
            <PickAnswersSet/>
        </Route>
    </Container>
  );
};

export default PickEvaluator;
