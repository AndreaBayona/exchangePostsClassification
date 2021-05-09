import { Question } from "./Question";
import {Classification} from "./Classification";
import {Answer} from "./Answer";

export type QuestionAnsElement = {
    _id: string;
    AID: number;
    user: string;
    classifications: Classification[];
    question: Question[];
    answer: Answer;
};