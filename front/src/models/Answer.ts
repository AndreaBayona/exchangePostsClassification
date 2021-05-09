import {Classification} from "./Classification";
import {Question} from "./Question";

export type Answer = {
  _id: string;
  type: string;
  QID: number;
  url_AcceptedAns: string;
  ParentId: string;
  AcceptedAnswerId: number;
  AScore: number;
  ATags: string;
  AID: number;
  ABody: string;
};


export type AnswerById = {
  _id: string;
  type: string;
  QID: number;
  url_AcceptedAns: string;
  ParentId: string;
  AcceptedAnswerId: number;
  AScore: number;
  ATags: string;
  AID: number;
  ABody: string;
  classification: Classification[];
  question: Question[];
};
