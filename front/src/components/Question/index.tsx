import * as React from 'react';

import {Answer} from "../Answer";
import {Text, Title} from "../Common/fonts";
import {Container, Divider, Header, Url} from './styles';
import {Question as QuestionData} from "../../models/Question";
import {Answer as AnswerData} from "../../models/Answer";

type Props = {
    question: QuestionData;
    answer: AnswerData;
    classifierName: string
};

export const Question: React.FunctionComponent<Props> = ({question, answer, classifierName}) => {

    return (
        <Container>
            <Header>
                <Title inheritColor>Question {question.QID}</Title>
                <span>
                     <Text>Classifier: {classifierName}</Text>
                     <Text>Score: {question.QScore}</Text>
                </span>
            </Header>
            <Title>{question.Qtitle}</Title>
            <br/>
            <Text>{question.QBody}</Text>
            <Url>
                <a href={question.url_question}>Original question URL</a>
            </Url>
            <Divider/>
            <Answer answer={answer} type={answer.type === 'accepted' ? 'Accepted answer' : 'Most voted answer'}/>
        </Container>
    )
};