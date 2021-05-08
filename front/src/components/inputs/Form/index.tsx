import * as React from "react";
import { Title } from "../../Common/fonts";
import { Classification } from "../../../models/Classification";
import { ProgressForm } from "../../../contexts/form";
import {getBooleanFormQuestions, getAreaTextQuestions, getMultiSelectionQuestions, updateContext,} from "./functions";

import { Container, FormWrapper, SubmitButton, ErrorMessage } from "./styles";

type Props = {
  submitForm: (classifiedAns: Classification) => void;
  classification?: Classification;
};

const validateForm = (state: any) => {
  if(state.falsePositive === "No"){
    if(state.learning.length > 0 &&
        state.architecture.length > 0 &&
        state.processing.length > 0 &&
        state.mlPipeline.length > 0 &&
        state.goodPractice !== "" &&
        state.pitfall !== "" &&
        state.references !== "" &&
        state.interesting !== "") {
      return true;
    }
    else{
      return false;
    }
  }
  else if(state.falsePositive === "Yes"){
    return true;
  }
  else {
    return false;
  }
}

export const Form: React.FunctionComponent<Props> = ({
  submitForm,
  classification,
}) => {
  const [state, dispatch] = React.useContext(ProgressForm);
  const [disabledSubmit, setDisabledSubmit] = React.useState(false);

  React.useEffect(() =>{
    if(classification)
      updateContext(classification, state, dispatch)
  }, [classification])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let classification = {
      isFalsePositive: state.falsePositive === "Yes",
      typeOfLearning: state.learning,
      typeOfArchitecture: state.architecture,
      processingModel: state.processing,
      mlPipeline: state.mlPipeline,
      goodPractice: state.goodPractice,
      pitfall: state.pitfall,
      externalReferences: state.references,
      interesting: state.interesting === "Yes",
    };

    if(validateForm(state)){
      submitForm(classification);
      console.log(classification);
    }
    else {
      setDisabledSubmit(true);
    }

  };
  return (
    <Container>
      <Title>Classification form</Title>
      <form onSubmit={handleSubmit} onChange={() => setDisabledSubmit(false)}>
        <FormWrapper>
          {getBooleanFormQuestions(state, dispatch)}
          {getMultiSelectionQuestions(state, dispatch)}
          {getAreaTextQuestions(state, dispatch)}
        </FormWrapper>
        <SubmitButton type="submit" value="Submit" disabled={disabledSubmit}/>
        {disabledSubmit && <ErrorMessage>There are empty fields</ErrorMessage>}
      </form>
    </Container>
  );
};
