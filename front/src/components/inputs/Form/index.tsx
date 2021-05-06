import * as React from "react";
import { Title } from "../../Common/fonts";
import { BOOLEAN_QUESTION, MULTIPLE_SELECTION_QUESTION } from "./types";
import { Classification } from "../../../models/Classification";
import { Container, FormWrapper } from "./styles";
import { ProgressForm } from "../../../contexts/form";
import { SingleSelection } from "../SingleSelection";
import {MultipleSelection} from "../MultipleSelection";
import {Action} from "../../../contexts/form/types";

type Props = {
  classifiedAns?: Classification;
  submitForm: (classifiedAns: Classification) => void;
};

function getBooleanFormQuestions(state: any, dispatch: (value: Action) => void) {
  return <>
    {BOOLEAN_QUESTION.map((formQuestion, index) => {
      return (
          <SingleSelection
              key={formQuestion.label}
              formItemValue={index === 0 ? state.falsePositive : state.interesting}
              formQuestion={formQuestion}
              defaultValue={index === 0 ? "Yes" : ""}
              dispatch={(newValue) => {
                dispatch({
                  type: formQuestion.dispatch,
                  payload: newValue,
                });
              }}
              disabled={index === 0 ? false : state.disabled}
          />
      );
    })}
  </>;
}

function getMultiSelectionQuestions(state: any, dispatch: (value: Action) => void) {
  return <>
    {MULTIPLE_SELECTION_QUESTION.map((formQuestion, index) => {
      return (
          <MultipleSelection
              key={formQuestion.label + '-' + index}
              label={formQuestion.label}
              disabled={state.disabled}
              options={formQuestion.options}
          />
      );
    })}
  </>;
}

export const Form: React.FunctionComponent<Props> = ({
  classifiedAns,
  submitForm,
}) => {
  const [state, dispatch] = React.useContext(ProgressForm);
  console.log(state.disabled);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let classification = {
      isFalsePositive: state.falsePositive,
      typeOfLearning: state.learning,
      typeOfArchitecture: state.architecture,
      processingModel: state.processing,
      mlPipeline: state.mlPipeline,
      goodPractice: state.goodPractice,
      pitfall: state.pitfall,
      externalReferences: state.references,
      interesting: state.interesting,
    };
    //submitForm(classification);
  };
  return (
    <Container>
      <Title>Classification form</Title>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          {getBooleanFormQuestions(state, dispatch)}
        </FormWrapper>

        <input type="submit" value="Submit"/>
      </form>
    </Container>
  );
};
