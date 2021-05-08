import * as React from "react";
import { Title } from "../../Common/fonts";
import { Classification } from "../../../models/Classification";
import { ProgressForm } from "../../../contexts/form";
import {getBooleanFormQuestions, getAreaTextQuestions, getMultiSelectionQuestions} from "./functions";

import { Container, FormWrapper, SubmitButton } from "./styles";

const validateForm = (disabledSubmit: any, state: any, setDisabledSubmit: any) => {
  console.log("falsePositive", state.falsePositive);
  if(!state.falsePositive){
    if(state.learning.length !== 0 &&
        state.architecture.length !== 0 &&
        state.processing.length !== 0 &&
        state.mlPipeline.length !== 0 &&
        state.goodPractice !== '' &&
        state.goodPractice !== undefined &&
        state.pitfall !== '' &&
        state.pitfall !== undefined &&
        state.references !== '' &&
        state.references !== undefined &&
        state.interesting !== undefined) {
      setDisabledSubmit(false);
    }
    else setDisabledSubmit(true);
  }
  else if(state.falsePositive){
    setDisabledSubmit(false);
  }
  else {
    setDisabledSubmit(true);
  }
  console.log("falsePositive", state.falsePositive);
  console.log("disabledSubmit", disabledSubmit);
}

type Props = {
  submitForm: (classifiedAns: Classification) => void;
};

export const Form: React.FunctionComponent<Props> = ({
  submitForm,
}) => {
  const [state, dispatch] = React.useContext(ProgressForm);
  const [disabledSubmit, setDisabledSubmit] = React.useState(true);

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

    submitForm(classification);
  };
  return (
    <Container>
      <Title>Classification form</Title>
      <form onSubmit={handleSubmit} onChange={() => validateForm(disabledSubmit, state, setDisabledSubmit)}>
        <FormWrapper>
          {getBooleanFormQuestions(state, dispatch)}
          {getMultiSelectionQuestions(state, dispatch)}
          {getAreaTextQuestions(state, dispatch)}
        </FormWrapper>
        <SubmitButton type="submit" value="Submit" disabled={disabledSubmit}/>
      </form>
    </Container>
  );
};
