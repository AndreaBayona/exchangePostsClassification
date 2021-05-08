import * as React from "react";
import { Form, Reducer, State } from "./types";
import { createReducer } from "../../hooks/createReducer";
import * as actionsForm from "./actions";

const INITIAL_STATE: Form = {
  falsePositive: undefined,
  learning: [],
  architecture: [],
  processing: [],
  mlPipeline: [],
  interesting: undefined,
  goodPractice: "",
  pitfall: "",
  references: "",
  disabled: true,
};

export const ProgressForm = React.createContext<State>([
  INITIAL_STATE,
  () => undefined,
]);

export const FormProvider: React.FunctionComponent = ({ children }) => {
  const reducer = createReducer<Form, typeof actionsForm>(
    INITIAL_STATE,
    actionsForm
  );
  const [state, dispatch] = React.useReducer<Reducer>(reducer, INITIAL_STATE);

  return (
    <ProgressForm.Provider value={[state, dispatch]}>
      {children}
    </ProgressForm.Provider>
  );
};
