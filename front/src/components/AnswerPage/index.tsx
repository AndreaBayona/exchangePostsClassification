import * as React from "react";
import {useParams} from "react-router-dom";
import {findQuestionById} from "../../services";
import {Answer as AnswerData} from "../../models/Answer";
import {AlertWrapper, Wrapper} from "../AnswersPage/styles";
import {Alert} from "react-bootstrap";
import {Question} from "../Question";

export const AnswerPage = () => {

    let { id } : any = useParams();
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [answerData, setAnswerData] = React.useState<undefined | AnswerData>(undefined);
    console.log("ENTROOOO", id)

    React.useEffect(() => {
        if(!!id) {
            const idObj = { id: id };
            findQuestionById(idObj).then((ans) => {
                const answer = ans as AnswerData;
                console.log(answer);
                if(!answer){
                    setShow(true);
                    setMsg(`There is no answer with this id ${id}`);
                }
                else {
                    setAnswerData(answer)
                }
            });
        }
    }, []);

    return (
        <>
            {show &&
            <AlertWrapper>
                <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    <p> {msg}</p>
                </Alert>
            </AlertWrapper>
            }
            {answerData &&
            <Question question={answerData.question[0]} answer={answerData} classifierName={answerData.user}/>
            }
        </>
    );
};