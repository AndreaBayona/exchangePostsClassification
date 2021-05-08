import React from "react";
import * as actionsForm from "./actions";

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
};
type ActionHandlers = typeof actionsForm;
export type Action = { type: keyof ActionHandlers; payload: any };
export type Reducer = React.Reducer<Form, Action>;
export type State = [Form, React.Dispatch<Action>];
