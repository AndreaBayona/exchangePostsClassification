import * as React from "react";
import { FormItem, Label } from "./styles";

type FormQuestion = {
  label: string;
  options: string[];
};

type Props = {
  formItemValue: any;
  formQuestion: FormQuestion;
  dispatch: (newValue: boolean) => void;
  disabled?: boolean;
  defaultValue: string;
};

export const SingleSelection: React.FC<Props> = ({
  formItemValue,
  formQuestion,
  dispatch,
  disabled,
  defaultValue,
}) => {
  return (
    <FormItem>
      <Label>{formQuestion.label}</Label>
      <select
        defaultValue={defaultValue}
        onChange={(newValue) =>
          dispatch(newValue.target.value !== "No")
        }
        disabled={!!disabled}
      >
        <option value="">--Please choose an option--</option>
        {formQuestion.options.map((valueOption, index) => {
          return (
            <option
              key={"q-" + formQuestion.label + "-" + index}
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
