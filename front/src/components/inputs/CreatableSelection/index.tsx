import React from "react";
import CreatableSelect from 'react-select/creatable'
import { Modal } from "react-bootstrap";
import { ReactComponent as InfoIcon } from "../../../icons/info-circle-solid.svg";
import { ReactComponent as BackIcon } from "../../../icons/arrow-circle-left-solid.svg";
import {Error} from "../../Common/fonts";
import { Message } from "../Form/styles";
import {FormItem, Title, Info, IconBox} from "./styles";
import {OptionForm} from "../../../models/OptionForm";
type Option = {
    label: string;
    value: string;
    isFixed: boolean;
};

type Props = {
    label: string;
    optionsForm: OptionForm;
    disabled: boolean;
    dispatch: (newValue: string[]) => void;
    selectedOptions: string[];
    mandatory?: boolean;
    information?: JSX.Element | string;
    history?: JSX.Element | string;
    updateOptions: (newValue: OptionForm) => void;
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

export const CreatableSelection: React.FC<Props> = ({
                                                       label,
                                                        optionsForm,
                                                       disabled,
                                                       dispatch,
                                                       selectedOptions,
                                                       mandatory,
                                                       information,
                                                        updateOptions,
    history,
                                                   }) => {
    const optionsLabels = optionsForm.options;
    const options = React.useMemo(() => createSelectOptions(optionsLabels), [optionsLabels]);
    const [state, setState] = React.useState<any>([]);
    const selected = React.useMemo(() => filterSelected(options, selectedOptions, setState), [selectedOptions]);
    const [showInfo, setShowInfo] = React.useState(false);
    const [showHistory, setShowHistory] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onChange = (value: any) => {
        setState(value);
        dispatch(getSelection(value));
    };

    const onChangeInput = (value: any) => {
        console.log(value);
        setLoading(true)
        if(value !== ""){
            options.push({
                label: value,
                value: value,
                isFixed: false,
            })
        }
        setLoading(false)
    };

    React.useEffect(() => {
        return () => {
            optionsForm.options = getSelection(options);
            updateOptions(optionsForm);
        }
    }, [])

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
            {showHistory && history &&
            <Modal show={showHistory} onHide={() => setShowHistory(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Past data</Modal.Title>
                </Modal.Header>
                <Modal.Body>{history}</Modal.Body>
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
                    {history &&
                    <IconBox>
                        <BackIcon width={16} height={16} fill="currentColor" onClick={() => setShowHistory(true)}/>
                    </IconBox>}
                </Info>
                <Message>To insert a new option, write it on the box and type ENTER. The new option will appear in the list.</Message>
                <CreatableSelect
                    isMulti
                    value={state}
                    options={options}
                    isLoading={loading}
                    isDisabled={disabled || loading}
                    onCreateOption={(inputValue) => onChangeInput(inputValue)}
                    onChange={(value) => onChange(value)}
                />
            </FormItem>
        </>

    );
};
