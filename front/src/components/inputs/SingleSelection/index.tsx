import * as React from "react";
import { FormItem, Label } from "./styles";
import { Action } from "../../../contexts/form/types";

type Question = {
  label: string;
  options: string[];
};

type Props = {
  formItemValue: any;
  question: Question;
  dispatch: (newValue: boolean) => void;
  disabled?: boolean;
  defaultValue: string;
};

export const SingleSelection: React.FC<Props> = ({
  formItemValue,
  question,
  dispatch,
  disabled,
  defaultValue,
}) => {
  return (
    <FormItem>
      <Label>{question.label}</Label>
      <select
        defaultValue={defaultValue}
        onChange={(newValue) =>
          dispatch(newValue.target.value == "Yes" ? true : false)
        }
        disabled={disabled ? disabled : false}
      >
        <option value="">--Please choose an option--</option>
        {question.options.map((valueOption, index) => {
          return (
            <option
              key={"q-" + question.label + "-" + index}
              value={valueOption}
              selected={valueOption === formItemValue.value}
            >
              {valueOption}
            </option>
          );
        })}
      </select>
    </FormItem>
  );
};
