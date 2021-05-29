import * as React from "react";
import Select from 'react-select';
import {Error} from "../../Common/fonts";
import {FormItem, Label, Info} from "./styles";
import {createSelectOptions} from "../MultipleSelection";

type FormQuestion = {
    label: string;
    options: string[];
};

type Props = {
    formItemValue: string;
    formQuestion: FormQuestion;
    dispatch: (newValue: string) => void;
    disabled?: boolean;
    mandatory?: boolean;
};

export const SingleSelection: React.FC<Props> = ({
                                                     formItemValue,
                                                     formQuestion,
                                                     dispatch,
                                                     disabled,
                                                     mandatory,
                                                 }) => {
    const options = React.useMemo(() => createSelectOptions(formQuestion.options), [formQuestion]);
    const [state, setState] = React.useState<any>();

    React.useEffect(() => {
        setState({
            label: formItemValue,
            value: formItemValue,
            isFixed: false,
        })
    }, [formItemValue]);

    const onChange = (value: any) => {
        setState(value);
        dispatch(value!.label);
    };

    return (
        <FormItem>
            <Info>
              <Label>{formQuestion.label}</Label>
                {mandatory && <Error>*</Error>}
            </Info>
            <Select
                value={state}
                options={options}
                isDisabled={!!disabled}
                onChange={(newValue) => onChange(newValue)}
            />
        </FormItem>
    );
};
