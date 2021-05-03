import * as React from "react";
import { Title } from "../Common/fonts";

import { Classification } from "../../models/Classification";
import { Container, FormWrapper } from "./styles";
import { ProgressForm } from "../../contexts/form/index";
import * as formItems from "./functions";
import { MultipleSelection } from "../MultipleSelection/index";

type Props = {
  classifiedAns?: Classification;
  submitForm: (classifiedAns: Classification) => void;
};

export const Form: React.FunctionComponent<Props> = ({
  classifiedAns,
  submitForm,
}) => {
  const [state, dispatch] = React.useContext(ProgressForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let classification = {
      isRelevant: state.relevant,
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
          {formItems.getFormItem(state.interesting, 5, dispatch)}
          {formItems.getFormItem(state.relevant, 0, dispatch, state.disabled)}
        </FormWrapper>
        <MultipleSelection></MultipleSelection>

        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
};
