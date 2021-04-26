import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {InputGroup, FormControl} from "react-bootstrap";
import { Answer } from "../models/Answer";
import { ClassificationRequest } from "../services";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import PickEvaluator from './PickEvaluator/index';
import {PickAnswersSet} from "./PickAnswersSet";
import {AnswersPage} from "./AnswersPage";
import { AppStyle, Header, LinkOverride, SearchBox } from "./AppStyles";
import {
  getClassifiedAnswers,
  getUnclassifiedAnswers,
  findQuestionById,
  classificateAQuestion,
} from "../services/index";

function App() {

  React.useEffect(() => {
    const id = { id: 50259726 };
    findQuestionById(id).then((ans) => {
      const answer = ans as Answer;
      console.log(answer); // Aquí se haría la asignación al estado. Si está mal el id lega undefined
    });
  });

  React.useEffect(() => {
    const classificationRequest = {
      AID: 50259726,
      classification: {
        typeOfLearning: "typeOfLearning2",
        typeOfArchitecture: "typeOfArchitecture",
        processingModel: "processingModel",
        mlPipeline: "mlPipeline",
        goodPractice: "goodPractice",
        pitfall: "pitfall",
        externalReferences: "externalReferences",
        interesting: "interesting",
      },
    } as ClassificationRequest;
    classificateAQuestion(classificationRequest).then((ans) => {
      console.log(ans);
    });
  });
  return (
    <Router>
      <AppStyle>
        <Header>
          <LinkOverride>
            <NavLink to="/">Home</NavLink>
          </LinkOverride>
          <SearchBox>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={()=>{}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Write answer id"/>
            </InputGroup>
          </SearchBox>
       </Header>
        <Switch>
          <Route exact path="/" component={PickEvaluator} />
          <Route exact path="/pickAnswers/:username" component={PickAnswersSet}/>
          <Route exact path="/answers/:username/:answersGroup" component={AnswersPage} />
        </Switch>

      </AppStyle>
    </Router>
  );
}

export default App;
