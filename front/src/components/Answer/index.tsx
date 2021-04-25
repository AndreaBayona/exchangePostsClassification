import * as React from 'react';

import {Text, Title} from "../Common/fonts";

import {Container, Option, Options, Url} from "./styles";

export type AnswerInfo = {
    bodyText: string;
    score: number;
    url: string;
    type: string;
    classified: boolean;
    read: () => JSX.Element;
    classify: () => JSX.Element;
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
            <Option open={read} onClick={manageRead}>
                <Text inheritColor>Read classification</Text>
            </Option>
            }
            <Option open={edit} onClick={manageEdit}>
                <Text inheritColor>Classify</Text>
            </Option>
        </Options>
        <div>
            {read && <>{answer.read()}</>}
            {edit && <>{answer.classify()}</>}
        </div>
    </Container>)
};