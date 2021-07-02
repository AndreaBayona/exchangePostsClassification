import React from "react";
import * as actionsForm from "./actions";
import {OptionForm} from "../../models/OptionForm";

export type Form = {
  falsePositive: string;
  learning: string[];
  architecture: string[];
  processing: string[];
  mlPipeline: string[];
  interesting: string;
  goodPractice: string;
  pitfall: string;
  references: string;
  disabled: boolean | undefined;
  transferLearning: string;
  techniqueOptions: OptionForm | undefined,
};
type ActionHandlers = typeof actionsForm;
export type Action = { type: keyof ActionHandlers; payload: any };
export type Reducer = React.Reducer<Form, Action>;
export type State = [Form, React.Dispatch<Action>];
