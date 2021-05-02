import * as actionsForm from "./actions";
export type Form = {
  relevant: boolean;
  learning: string[];
  architecture: string[];
  processing: string[];
  mlPipeline: string[];
  interesting: boolean;
  goodPractice: string;
  pitfall: string;
  references: string;
};
type ActionHandlers = typeof actionsForm;
export type Action = { type: keyof ActionHandlers; payload: any };
export type Reducer = React.Reducer<Form, Action>;
export type State = [Form, React.Dispatch<Action>];
