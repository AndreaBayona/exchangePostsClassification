import * as React from "react";
import { FORM_QUESTIONS, DISPATCH_TYPES } from "./types";
import { FormItem, Label } from "./styles";
import { Action } from "../../contexts/form/types";

export const getFormItem = (
  formItemValue: any,
  indexQuestion: number,
  dispatch: React.Dispatch<Action>
) => {
  return (
    <FormItem>
      <Label>{FORM_QUESTIONS[indexQuestion].label}</Label>
      <select
        value={formItemValue.value}
        onChange={(newValue) =>
          dispatch({
            type: DISPATCH_TYPES[indexQuestion],
            payload: newValue.target.value == "Yes" ? true : false,
          })
        }
      >
        <option value="">--Please choose an option--</option>
        {FORM_QUESTIONS[indexQuestion].options.map((valueOption, index) => (
          <option
            key={"q-" + indexQuestion + "-" + index}
            value={valueOption}
            selected={valueOption === formItemValue.value}
          >
            {valueOption}
          </option>
        ))}
      </select>
    </FormItem>
  );
};
