import * as React from "react";
import {Text, Title} from "../Common/fonts";
import {FORM_QUESTIONS} from "./FormQuestions";
import {Container, FormWrapper, FormItem, Label, FreeText, Input, FormInput} from "./styles";

type Props = {
    answers: string[];
    classified: boolean;
    submitForm: (inputs: string[]) => boolean;
};

const useFormInputField = (initialValue: string = "") => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = React.useCallback(
        (e: any) => setValue(e.target.value),
        []
    );
    return { value, onChange };
};

function getFormItem(formItemValue: { onChange: (e: any) => void; value: string }, indexQuestion: number) {
    return <FormItem>
        <Label>
            {FORM_QUESTIONS[indexQuestion].label}
        </Label>
        <select value={formItemValue.value} onChange={formItemValue.onChange}>
            <option value="">--Please choose an option--</option>
            {FORM_QUESTIONS[indexQuestion].options.map(
                (value, index) =>
                    <option key={"q-"+indexQuestion+"-"+index} value={value}>{value}</option>
            )}
        </select>
    </FormItem>;
}

export const Form: React.FunctionComponent<Props> = ({answers, classified, submitForm}) => {
    const relevant = useFormInputField(answers[0]);
    const learnings = useFormInputField(answers[1]);
    const architecture = useFormInputField(answers[2]);
    const processing = useFormInputField(answers[3]);
    const stages = useFormInputField(answers[4]);
    const interesting = useFormInputField(answers[5]);
    const goodPractice = useFormInputField(answers[6]);
    const pitfall = useFormInputField(answers[7]);
    const references = useFormInputField(answers[8]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let classification = [relevant.value, learnings.value, architecture.value, processing.value,
        stages.value, goodPractice.value, pitfall.value, references.value, interesting.value
        ];
        submitForm(classification);
    };
    return (
        <Container>
            <Title>Classification form</Title>
            <form onSubmit={handleSubmit}>
                <FormWrapper>
                    {getFormItem(relevant, 0)}
                    {getFormItem(learnings, 1)}
                    {getFormItem(architecture, 2)}
                    {getFormItem(processing, 3)}
                    {getFormItem(stages, 4)}
                    {getFormItem(interesting, 5)}
                </FormWrapper>
                <FreeText>
                    <FormInput>
                        <Label htmlFor="">{FORM_QUESTIONS[6].label}</Label>
                        <Input
                            {...goodPractice}
                        />
                    </FormInput>
                    <FormInput>
                        <Label htmlFor="">{FORM_QUESTIONS[7].label}</Label>
                        <Input
                            {...pitfall}
                        />
                    </FormInput>
                    <FormInput>
                        <Label htmlFor="">{FORM_QUESTIONS[8].label}</Label>
                        <Input
                            {...references}
                        />
                    </FormInput>
                </FreeText>
                <input type="submit" value="Submit"/>
            </form>
        </Container>

    );
}