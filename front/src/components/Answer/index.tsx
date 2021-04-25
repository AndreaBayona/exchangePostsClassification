import * as React from 'react';

import {Text, Title} from "../Common/fonts";
import {Button} from "../Common/buttons";

import {Container, Option, Options, Url} from "./styles";

export type AnswerInfo = {
    bodyText: string;
    score: number;
    url: string;
    type: string;
    classified: boolean;
};

type Props = {
    answer: AnswerInfo;
    type: string;
};

export const Answer: React.FunctionComponent<Props> = ({answer, type}) => {

    const [read, setRead] = React.useState(false);
    const [edit, setEdit ] = React.useState(false);

    const manageRead = () => {
        if(edit) {setEdit(false)};
        setRead(!read);
    }

    const manageEdit = () => {
        if(read) {setRead(false)};
        setEdit(!edit);
    }

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
            {answer.classified &&
            <Button onClick={manageRead}>
                <Text inheritColor>Read classification</Text>
            </Button>
            }
            <Button onClick={manageEdit}>
                <Text inheritColor>Classify / edit</Text>
            </Button>
        </Options>
        <div>
            {read && <p>Read</p>}
            {edit && <p>classify</p>}
        </div>
    </Container>)
};