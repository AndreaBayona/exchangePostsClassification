import * as React from 'react';

import {Text, Title} from "../Common/fonts";
import {Button} from "../Common/buttons";
import {Form} from "../Form";
import {Classification} from "../../models/Classification";
import {Answer as AnswerData} from "../../models/Answer";

import {Container, Option, Options, Url} from "./styles";

type Props = {
    answer: AnswerData;
    type: string;
};

const Submit = (classification: Classification) => {

    console.log("INPUTS", classification);
    return true;
};

export const Answer: React.FunctionComponent<Props> = ({answer, type}) => {

    const [edit, setEdit ] = React.useState(false);

    return (<Container>
        <Title>{type + ' ' + answer.AID}</Title>
        <Text>Score: {answer.AScore}</Text>
        <br/>
        <Text>
            {answer.ABody}
        </Text>
        <Url>
            <a href={answer.url_AcceptedAns}>Original answer URL</a>
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