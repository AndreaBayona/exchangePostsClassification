import React from "react";
import {Container} from "../PickEvaluator/styles";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import { useParams } from 'react-router-dom';

export const PickAnswersSet = () => {
    const [answers, setAnswers] = React.useState("Select one option");
    const { username } : any = useParams();
    console.log(username);
    return (
        <Container>
            <div>Select a set of answers</div> <br></br>
            <DropdownButton
                id={`dropdown-variants-${"Info"}`}
                variant={"Info".toLowerCase()}
                title={answers}
            >
                <Dropdown.Item
                    onClick={() => {
                        setAnswers("Classified");
                    }}
                >
                    Classified
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        setAnswers("Not-classified");
                    }}
                >
                    Not classified
                </Dropdown.Item>
            </DropdownButton>
            <br></br>
            <Button variant="info">Go</Button>{" "}
        </Container>
    );
};