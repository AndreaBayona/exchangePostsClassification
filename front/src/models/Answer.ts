import { Question } from "./Question";
import {Classification} from "./Classification";

export type Answer = {
  _id: string;
  type: string;
  user: string;
  QID: number;
  url_AcceptedAns: string;
  ParentId: string;
  AcceptedAnswerId: number;
  AScore: number;
  ATags: string;
  AID: number;
  ABody: string;
  question: Question[];
  classification: Classification;
  classified: boolean;
};
