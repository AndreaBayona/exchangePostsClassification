import React from "react";
import Select from 'react-select';
import { Modal } from "react-bootstrap";
import { ReactComponent as InfoIcon } from "../../../icons/info-circle-solid.svg";
import {Error} from "../../Common/fonts";
import {FormItem, Title, Info, IconBox} from "./styles";

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
  selectedOptions: string[];
  mandatory?: boolean;
  information?: JSX.Element;
};

export const createSelectOptions = (optionsLabels: string[]) =>
  optionsLabels.map( (value, index) => {
    return {
      label: value,
      value: value,
      isFixed: false,
    }
  });

const filterSelected = (options: Option[], selected: string[], setState: any) => {
    const filtered = options.filter((value) =>
        selected.includes(value.label)
    )
    setState(filtered);
};

const getSelection = (options: Option[]): string[] =>
    options.map( (value) => {
      return value.label;
    });

export const MultipleSelection: React.FC<Props> = ({
  label,
  optionsLabels,
  disabled,
  dispatch,
  selectedOptions,
                                                       mandatory,
    information,
}) => {
 const options = React.useMemo(() => createSelectOptions(optionsLabels), [optionsLabels]);
 const [state, setState] = React.useState<any>([]);
 const selected = React.useMemo(() => filterSelected(options, selectedOptions, setState), [selectedOptions]);
 const [showInfo, setShowInfo] = React.useState(false);
  const onChange = (value: any) => {
    setState(value);
    dispatch(getSelection(value));
  };

  return (
      <>
          {showInfo && information &&
          <Modal show={showInfo} onHide={() => setShowInfo(false)}>
              <Modal.Header closeButton>
                  <Modal.Title>{label}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{information}</Modal.Body>
          </Modal>
          }
          <FormItem>
              <Info>
                  <Title>
                      {label}
                      {mandatory && <Error>*</Error>}
                  </Title>
                  {information &&
                  <IconBox>
                      <InfoIcon width={16} height={16} fill="currentColor" onClick={() => setShowInfo(true)}/>
                  </IconBox>}
              </Info>
              <Select
                  value={state}
                  isMulti
                  isClearable
                  name="colors"
                  classNamePrefix="select"
                  options={options}
                  isDisabled={disabled}
                  onChange={(value) => onChange(value)}
              />
          </FormItem>
      </>

  );
};
