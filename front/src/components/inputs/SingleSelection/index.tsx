import * as React from "react";
import { FormItem, Label, SelectOverride } from "./styles";

type FormQuestion = {
  label: string;
  options: string[];
};

type Props = {
  formItemValue: any;
  formQuestion: FormQuestion;
  dispatch: (newValue: undefined | boolean) => void;
  disabled?: boolean;
};

export const SingleSelection: React.FC<Props> = ({
  formItemValue,
  formQuestion,
  dispatch,
  disabled,
}) => {
  return (
    <FormItem>
      <Label>{formQuestion.label}</Label>
      <SelectOverride
        onChange={(newValue) =>
          dispatch(newValue.target.value === "Select..." ?
              undefined : newValue.target.value === "Yes")
        }
        disabled={!!disabled}
      >
        <option value="">Select...</option>
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
      </SelectOverride>
    </FormItem>
  );
};
