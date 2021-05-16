import * as React from "react";
import {Error} from "../../Common/fonts";
import {FormItem, Label, SelectOverride, Info} from "./styles";

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
    return (
        <FormItem>
            <Info>
              <Label>{formQuestion.label}</Label>
                {mandatory && <Error>*</Error>}
            </Info>
            <SelectOverride
                onChange={(newValue) =>
                    dispatch(newValue.target.value)
                }
                disabled={!!disabled}
            >
                <option value="">Select...</option>
                {formQuestion.options.map((valueOption, index) => {
                    return (
                        <option
                            key={"q-" + formQuestion.label + "-" + index}
                            value={valueOption}
                            selected={valueOption === formItemValue}
                        >
                            {valueOption}
                        </option>
                    );
                })}
            </SelectOverride>
        </FormItem>
    );
};
