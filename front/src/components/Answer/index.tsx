import * as React from 'react';

import {Text, Title} from "../Common/fonts";
import {Button} from "../Common/buttons";
import {Form} from "../Form";
import {Classification} from "../../models/Classification";

import {Container, Option, Options, Url} from "./styles";

export type AnswerInfo = {
    bodyText: string;
    score: number;
    url: string;
    type: string;
    classified: boolean;
    classification?: Classification;
};

type Props = {
    answer: AnswerInfo;
    type: string;
};

const Submit = (classification: Classification) => {

    console.log("INPUTS", classification);
    return true;
};

export const Answer: React.FunctionComponent<Props> = ({answer, type}) => {

    const [edit, setEdit ] = React.useState(false);

    return (<Container>
        <Title>{type}</Title>
        <br/>
        <Text>
            {answer.bodyText}
        </Text>
        <Url>
            <a href={answer.url}>Original answer URL</a>
        </Url>
        <Options>
            <Button onClick={()=> setEdit(!edit)}>
                <Text inheritColor>Classify / edit</Text>
            </Button>
        </Options>
        <div>
            {edit && <Form classifiedAns={answer.classification} submitForm={Submit}/>}
        </div>
    </Container>)
};