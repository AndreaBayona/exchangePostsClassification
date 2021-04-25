import * as React from 'react';

import {Answer, AnswerInfo} from "../Answer";
import {Text, Title} from "../Common/fonts";
import {Container, Divider, Header, Url} from './styles';

export type QuestionInfo = {
    id: number;
    title: string;
    bodyText: string;
    score: number;
    url: string;
};

type Props = {
    question: QuestionInfo;
    acceptedAnswer: AnswerInfo;
    mostVotedAnswer?: AnswerInfo;
    classifierName: string
};

export const Question: React.FunctionComponent<Props> = ({question, acceptedAnswer, mostVotedAnswer, classifierName}) => {

    return (
        <Container>
            <Header>
                <Title inheritColor>Question {question.id}</Title>
                <span>
                     <Text>Classifier: {classifierName}</Text>
                     <Text>Score: {question.score}</Text>
                </span>
            </Header>
            <Title>{question.title}</Title>
            <br/>
            <Text>{question.bodyText}</Text>
            <Url>
                <a href={question.url}>Original question URL</a>
            </Url>
            <Divider/>
            <Answer answer={acceptedAnswer} type="Accepted answer"/>
            {mostVotedAnswer &&
                <>
                    <Divider/>
                    <Answer answer={mostVotedAnswer} type="Most voted answer"/>
                </>
            }
        </Container>
    )
};