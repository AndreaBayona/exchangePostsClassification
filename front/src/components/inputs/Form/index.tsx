import * as React from "react";
import { Title, Text } from "../../Common/fonts";
import { Classification } from "../../../models/Classification";
import { ProgressForm } from "../../../contexts/form";
import {getCreatableSelectionQuestions, getBooleanFormQuestions, getAreaTextQuestions, getMultiSelectionQuestions, updateContext,} from "./functions";

import { Container, FormWrapper, SubmitButton, ErrorMessage, MandatoryFields } from "./styles";
import {
  getFormOptionsFromQuestionName,
  updateFormQuestionOptions
} from "../../../services";
import {OptionForm} from "../../../models/OptionForm";

type Props = {
  submitForm: (classifiedAns: Classification) => void;
  classification?: Classification;
  username: string;
  answerID: number;
};

const validateForm = (state: any) => {
  if(state.falsePositive === "No"){
    if(state.learning.length > 0 &&
        state.architecture.length > 0 &&
        state.processing.length > 0 &&
        state.mlPipeline.length > 0 &&
        (state.goodPracticeArray.length > 0 || state.goodPractice !== "") &&
        state.interesting !== "" &&
        state.transferLearning !== "" &&
        state.relatedMlMethod.length > 0 &&
        state.applicationArea.length > 0
    ) {
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

const updateOptions = (newOptionForm: OptionForm) => {
  console.log("INPUTS", newOptionForm);

  updateFormQuestionOptions({formOption: newOptionForm}).then(
      (ans) => {
        console.log(ans);
      },
      (ans) => {
        console.log(ans);
      }
  );
};

export const Form: React.FunctionComponent<Props> = ({
  submitForm,
  classification,
  username,
  answerID,
}) => {
  const [state, dispatch] = React.useContext(ProgressForm);
  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() =>{
    if(classification) updateContext(classification, state, dispatch)
  }, [classification])

  React.useEffect(() =>{
   setDisabledSubmit(false);
  }, [state])

  React.useEffect( () => {
    async function update() {
      await getFormOptionsFromQuestionName({question: "techniqueOptions"}).then((ans) => {
        const techniqueOptions = ans as OptionForm;
        console.log(techniqueOptions)
        dispatch({
          type: "setTechniqueOptions",
          payload: techniqueOptions,
        });
      });

      await getFormOptionsFromQuestionName({question: "pitfallOptions"}).then((ans) => {
        const pitfallOptions = ans as OptionForm;
        console.log(pitfallOptions)
        dispatch({
          type: "setPitfallOptions",
          payload: pitfallOptions,
        });
      });

      await getFormOptionsFromQuestionName({question: "goodPracticeOptions"}).then((ans) => {
        const goodPracticeOptions = ans as OptionForm;
        console.log(goodPracticeOptions)
        dispatch({
          type: "setGoodPracticeOptions",
          payload: goodPracticeOptions,
        });
      });

      await getFormOptionsFromQuestionName({question: "relatedMlMethodOptions"}).then((ans) => {
        const relatedMlMethodOptions = ans as OptionForm;
        console.log(relatedMlMethodOptions)
        dispatch({
          type: "setRelatedMlMethodOptions",
          payload: relatedMlMethodOptions,
        });
      });

      await getFormOptionsFromQuestionName({question: "applicationAreaOptions"}).then((ans) => {
        const applicationAreaOptions = ans as OptionForm;
        console.log(applicationAreaOptions)
        dispatch({
          type: "setApplicationAreaOptions",
          payload: applicationAreaOptions,
        });
        setLoading(false);
      });
    }
    update();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let classification = {
      user: username,
      AID: answerID,
      isFalsePositive: state.falsePositive === "Yes",
      typeOfLearning: state.learning,
      typeOfArchitecture: state.architecture,
      processingModel: state.processing,
      mlPipeline: state.mlPipeline,
      goodPractice: state.goodPractice,
      goodPracticeArray: state.goodPracticeArray,
      pitfallArray: state.pitfallArray,
      pitfall: state.pitfall,
      externalReferences: state.references,
      interesting: state.interesting === "Yes",
      transferLearning: state.transferLearning,
      applicationArea: state.applicationArea,
      relatedMlMethod: state.relatedMlMethod,
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
          {!loading && getCreatableSelectionQuestions(state, dispatch, updateOptions)}
          {getAreaTextQuestions(state, dispatch)}
        </FormWrapper>
        <MandatoryFields>
          <Text inheritColor>All fields marked with an asterisk (*) are required.</Text>
        </MandatoryFields>
        <SubmitButton type="submit" value="Submit" disabled={disabledSubmit}/>
        {disabledSubmit && <ErrorMessage>There are empty fields</ErrorMessage>}
      </form>
    </Container>
  );
};
