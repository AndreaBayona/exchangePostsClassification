import { Form as State } from "./types";

export const setFalsePositive = (state: State, falsePositive: boolean) => {
  const disabled = falsePositive;
  return { ...state, falsePositive, disabled };
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
  return { ...state, interesting };
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
