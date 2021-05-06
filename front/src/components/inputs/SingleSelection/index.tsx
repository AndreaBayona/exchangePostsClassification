import * as React from "react";
import { FormItem, Label } from "./styles";

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
          dispatch(newValue.target.value === "Yes")
        }
        disabled={!!disabled}
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
