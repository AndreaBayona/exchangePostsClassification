import * as React from "react";
import { Title } from "../../common/fonts";
import { BOOLEAN_QUESTION } from "./types";
import { Classification } from "../../../models/Classification";
import { Container, FormWrapper } from "./styles";
import { ProgressForm } from "../../../contexts/form/index";
import { MultipleSelection } from "../MultipleSelection/index";
import { SingleSelection } from "../SingleSelection/index";

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
          {BOOLEAN_QUESTION.map((question, index) => {
            return (
              <SingleSelection
                key={question.label}
                formItemValue={index === 0 ? state.relevant : state.interesting}
                question={question}
                defaultValue={index === 0 ? "Yes" : ""}
                dispatch={(newValue) => {
                  dispatch({
                    type: question.dispatch,
                    payload: newValue,
                  });
                }}
                disabled={index == 0 ? false : state.disabled}
              />
            );
          })}
        </FormWrapper>

        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
};
