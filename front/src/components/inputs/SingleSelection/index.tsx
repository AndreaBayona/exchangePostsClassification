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
    formItemValue: any;
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


    return (
        <FormItem>
            <Info>
              <Label>{formQuestion.label}</Label>
                {mandatory && <Error>*</Error>}
            </Info>
            <Select
                options={options}
                isDisabled={!!disabled}
                onChange={(newValue) =>
                {dispatch(newValue!.label)}}
            />
        </FormItem>
    );
};
