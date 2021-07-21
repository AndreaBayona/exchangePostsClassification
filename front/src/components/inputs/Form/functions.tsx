import * as React from "react";

import {Action} from "../../../contexts/form/types";
import {Classification} from "../../../models/Classification";

import {Error} from "../../Common/fonts";
import {DescriptionList} from "../../descriptionList";

import {MultipleSelection} from "../MultipleSelection";
import {SingleSelection} from "../SingleSelection";
import {CreatableSelection} from "../CreatableSelection";

import {SINGLE_SELECTION_QUESTION, MULTIPLE_SELECTION_QUESTION, TEXT_AREA_QUESTIONS, CREATABLE_SELECTION_QUESTION} from "./types";
import {PIPELINE_EXPLANATIONS} from "./descriptions";
import {FormInput, FreeText, Label, TextAreaOverride, Message} from "./styles";

export function getBooleanFormQuestions(state: any, dispatch: (value: Action) => void) {
    return <>
        {SINGLE_SELECTION_QUESTION.map((formQuestion, index) => {
            return (
                <SingleSelection
                    key={formQuestion.label}
                    formItemValue={formQuestion.getActualVal(state)}
                    formQuestion={formQuestion}
                    dispatch={(newValue) => {
                        dispatch({
                            type: formQuestion.dispatch,
                            payload: newValue,
                        });
                    }}
                    disabled={index === 0 ? false : state.disabled}
                    mandatory={formQuestion.mandatory}
                />
            );
        })}
    </>;
}

export function getAreaTextQuestions(state: any, dispatch: (value: Action) => void) {
    return <FreeText>
        {TEXT_AREA_QUESTIONS.map((formQuestion, index) => {
            return (
                <FormInput key={formQuestion.label + "" + index}>
                    <Label htmlFor="">
                        {formQuestion.label}
                        {formQuestion.mandatory && <Error>*</Error>}
                    </Label>
                    <Message>All entries must be written in separate lines</Message>
                    <TextAreaOverride
                        value={formQuestion.getActualVal(state)}
                        disabled={state.disabled}
                        onChange={(newValue) => {
                            dispatch({
                                type: formQuestion.dispatch,
                                payload: newValue.target.value,
                            });
                        }}
                    />
                </FormInput>
            );
        })}
    </FreeText>;
};

export function getMultiSelectionQuestions(state: any, dispatch: (value: Action) => void) {
    return <>
        {MULTIPLE_SELECTION_QUESTION.map((formQuestion, index) => {
            return (
                <MultipleSelection
                    key={formQuestion.label + '-' + index}
                    label={formQuestion.label}
                    disabled={state.disabled}
                    optionsLabels={formQuestion.options}
                    selectedOptions={formQuestion.getActualVal(state)}
                    dispatch={(newValue) => {
                        dispatch({
                            type: formQuestion.dispatch,
                            payload: newValue,
                        });
                    }}
                    mandatory={formQuestion.mandatory}
                    information={formQuestion.dispatch ==='setPipeline' ?
                    <DescriptionList descriptions={PIPELINE_EXPLANATIONS}/> :
                        undefined
                    }
                />
            );
        })}
    </>;
};

export function getCreatableSelectionQuestions(state: any, dispatch: (value: Action) => void, updateOptions: (value: any) => void) {
    console.log(state)
    return <>
        {CREATABLE_SELECTION_QUESTION.map((formQuestion, index) => {
            return (
                <CreatableSelection
                    key={formQuestion.label + '-' + index}
                    label={formQuestion.label}
                    disabled={state.disabled}
                    optionsForm={formQuestion.getActualValOption(state)}
                    selectedOptions={formQuestion.getActualVal(state)}
                    dispatch={(newValue) => {
                        dispatch({
                            type: formQuestion.dispatch,
                            payload: newValue,
                        });
                    }}
                    mandatory={formQuestion.mandatory}
                    information={undefined}
                    history={formQuestion.getOldVal ? formQuestion.getOldVal(state) : undefined}
                    updateOptions={updateOptions}
                />
            );
        })}
    </>;
};

export function updateContext(classification: Classification, state: any, dispatch: (value: Action) => void) {
    dispatch({type: "setFalsePositive", payload: classification.isFalsePositive ? "Yes" : "No",});
    dispatch({type: "setArchitecture",payload: classification.typeOfArchitecture,});
    dispatch({type: "setGoodPracticesArray", payload: classification.goodPracticeArray || [],});
    dispatch({type: "setGoodPractices", payload: classification.goodPractice,});
    dispatch({type: "setInteresting", payload: classification.interesting ? "Yes" : "No",});
    dispatch({type: "setLearning", payload: classification.typeOfLearning,});
    dispatch({type: "setPipeline", payload: classification.mlPipeline,});
    dispatch({type: "setPitfallArray", payload: classification.pitfallArray || [],});
    dispatch({type: "setPitfall", payload: classification.pitfall,});
    dispatch({type: "setProcessing", payload: classification.processingModel,});
    dispatch({type: "setReferences", payload: classification.externalReferences,});
    dispatch({type: "setTransferLearning", payload: classification.transferLearning,});
    dispatch({type: "setRelatedMlMethod", payload: classification.relatedMlMethod || [],});
    dispatch({type: "setApplicationArea", payload: classification.applicationArea || [],});
};