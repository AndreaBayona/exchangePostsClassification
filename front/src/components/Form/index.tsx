import * as React from "react";
import {Title} from "../Common/fonts";
import {FORM_QUESTIONS} from "./FormQuestions";
import {Classification} from "../../models/Classification";
import {Container, FormWrapper, FormItem, Label, FreeText, Input, FormInput} from "./styles";

type Props = {
    classifiedAns?: Classification;
    submitForm: (classifiedAns: Classification) => boolean;
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

export const Form: React.FunctionComponent<Props> = ({classifiedAns, submitForm}) => {

    const relevant = useFormInputField(classifiedAns? classifiedAns.isRelevant : "");
    const learnings = useFormInputField(classifiedAns? classifiedAns.typeOfLearning : "");
    const architecture = useFormInputField(classifiedAns? classifiedAns.typeOfArchitecture : "");
    const processing = useFormInputField(classifiedAns? classifiedAns.processingModel : "");
    const mlPipeline = useFormInputField(classifiedAns? classifiedAns.mlPipeline : "");
    const interesting = useFormInputField(classifiedAns? classifiedAns.interesting : "");
    const goodPractice = useFormInputField(classifiedAns? classifiedAns.goodPractice : "");
    const pitfall = useFormInputField(classifiedAns? classifiedAns.pitfall : "");
    const references = useFormInputField(classifiedAns? classifiedAns.externalReferences : "");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let classification = {
            isRelevant: relevant.value,
            typeOfLearning: learnings.value,
            typeOfArchitecture: architecture.value,
            processingModel: processing.value,
            mlPipeline: mlPipeline.value,
            goodPractice: goodPractice.value,
            pitfall: pitfall.value,
            externalReferences: references.value,
            interesting: interesting.value,
        };
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
                    {getFormItem(mlPipeline, 4)}
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