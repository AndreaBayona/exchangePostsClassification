import {Action} from "../../../contexts/form/types";
import {BOOLEAN_QUESTION, MULTIPLE_SELECTION_QUESTION, TEXT_AREA_QUESTIONS} from "./types";
import {SingleSelection} from "../SingleSelection";
import {FormInput, FreeText, Label, TextAreaOverride} from "./styles";
import {MultipleSelection} from "../MultipleSelection";
import * as React from "react";

const getYesOrNoString = (value : boolean | undefined) => {
    if(value === undefined) {
        return "Select...";
    }
    else if (value){
        return "Yes";
    }
    else {
        return "No";
    }
};

export function getBooleanFormQuestions(state: any, dispatch: (value: Action) => void) {
    return <>
        {BOOLEAN_QUESTION.map((formQuestion, index) => {
            return (
                <SingleSelection
                    key={formQuestion.label}
                    formItemValue={index === 0 ? getYesOrNoString(state.falsePositive) : getYesOrNoString(state.interesting)}
                    formQuestion={formQuestion}
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

export function getAreaTextQuestions(state: any, dispatch: (value: Action) => void) {
    return <FreeText>
        {TEXT_AREA_QUESTIONS.map((formQuestion, index) => {
            return (
                <FormInput key={formQuestion.label + "" + index}>
                    <Label htmlFor="">{formQuestion.label}</Label>
                    <TextAreaOverride
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
}

export function getMultiSelectionQuestions(state: any, dispatch: (value: Action) => void) {
    return <>
        {MULTIPLE_SELECTION_QUESTION.map((formQuestion, index) => {
            return (
                <MultipleSelection
                    key={formQuestion.label + '-' + index}
                    label={formQuestion.label}
                    disabled={state.disabled}
                    optionsLabels={formQuestion.options}
                    dispatch={(newValue) => {
                        dispatch({
                            type: formQuestion.dispatch,
                            payload: newValue,
                        });
                    }}
                />
            );
        })}
    </>;
}