import React from "react";
import Select from 'react-select';
import {FormItem, Title} from "./styles";

type Option = {
  label: string;
  value: string;
  isFixed: boolean;
};

type Props = {
  label: string;
  optionsLabels: string[];
  disabled: boolean;
  dispatch: (newValue: string[]) => void;
};

const createSelectOptions = (optionsLabels: string[]) =>
  optionsLabels.map( (value, index) => {
    return {
      label: value,
      value: value,
      isFixed: false,
    }
  });

const getSelection = (options: Option[]): string[] =>
    options.map( (value) => {
      return value.label;
    });

export const MultipleSelection: React.FC<Props> = ({
  label,
  optionsLabels,
  disabled,
  dispatch,
}) => {
  const options = React.useMemo(() => createSelectOptions(optionsLabels), [optionsLabels]);
  const [state, setState] = React.useState<any>([]);

  const onChange = (value: any) => {
    dispatch(getSelection(value));
  };

  return (
      <FormItem>
        <Title>{label}</Title>
        <Select
            isMulti
            isClearable
            name="colors"
            classNamePrefix="select"
            options={options}
            isDisabled={disabled}
            onChange={(value) => onChange(value)}
        />
      </FormItem>
  );
};
