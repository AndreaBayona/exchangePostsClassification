import * as React from "react";
import {Title} from "../Common/fonts";
import {Container, DescriptionElement, TitleWrapper} from "./styles";

export type Description = {
    title: string;
    detail: string;
};

type Props = {
    descriptions: Description[];
};

export const DescriptionList: React.FunctionComponent<Props> = ({descriptions}) => {

    return (
    <Container>
        {descriptions.map( (value, index) => (
            <DescriptionElement key={'des'+index}>
                <TitleWrapper>
                    <Title>{value.title}</Title>
                </TitleWrapper>
                {value.detail}
            </DescriptionElement>
        ))
        }
    </Container>
    );
};