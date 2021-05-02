import { Form as State } from "./types";

export const setRelevant = (state: State, relevant: boolean) => {
  return { ...state, relevant };
};

export const setLearning = (state: State, learning: string[]) => {
  return { ...state, learning };
};

export const setArchitecture = (state: State, architecture: string[]) => {
  return { ...state, architecture };
};

export const setProcessing = (state: State, processing: string[]) => {
  return { ...state, processing };
};

export const setPipeline = (state: State, pipeline: string[]) => {
  return { ...state, pipeline };
};

export const setInteresting = (state: State, interesting: boolean) => {
  const disabled = interesting ? false : true;
  return { ...state, interesting, disabled };
};

export const setGoodPractices = (state: State, goodPractice: string) => {
  return { ...state, goodPractice };
};

export const setPitfall = (state: State, pitfall: string) => {
  return { ...state, pitfall };
};

export const setReferences = (state: State, references: string) => {
  return { ...state, references };
};
