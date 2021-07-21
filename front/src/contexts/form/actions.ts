import { Form as State } from "./types";
import {OptionForm} from "../../models/OptionForm";

export const setFalsePositive = (state: State, falsePositive: string) => {
  const disabled = falsePositive !== "No";
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

export const setPipeline = (state: State, mlPipeline: string[]) => {
  return { ...state, mlPipeline };
};

export const setInteresting = (state: State, interesting: string) => {
  return { ...state, interesting };
};

export const setGoodPractices = (state: State, goodPractice: string) => {
  return { ...state, goodPractice };
};

export const setGoodPracticesArray = (state: State, goodPracticeArray: string[]) => {
  return { ...state, goodPracticeArray };
};

export const setPitfall = (state: State, pitfall: string) => {
  return { ...state, pitfall };
};

export const setPitfallArray = (state: State, pitfallArray: string[]) => {
  return { ...state, pitfallArray };
};

export const setReferences = (state: State, references: string) => {
  return { ...state, references };
};

export const setTransferLearning = (state: State, transferLearning: string) => {
  return { ...state, transferLearning };
};

export const setTechniqueOptions = (state: State, techniqueOptions: OptionForm) => {
  return { ...state, techniqueOptions };
};

export const setPitfallOptions = (state: State, pitfallOptions: OptionForm) => {
  return { ...state, pitfallOptions };
};

export const setGoodPracticeOptions = (state: State, goodPracticeOptions: OptionForm) => {
  return { ...state, goodPracticeOptions };
};

export const setRelatedMlMethod = (state: State, relatedMlMethod: string[]) => {
  return { ...state, relatedMlMethod };
};

export const setApplicationArea = (state: State, applicationArea: string[]) => {
  return { ...state, applicationArea };
};

export const setRelatedMlMethodOptions = (state: State, relatedMlMethodOptions: OptionForm) => {
  return { ...state, relatedMlMethodOptions };
};


export const setApplicationAreaOptions = (state: State, applicationAreaOptions: OptionForm) => {
  return { ...state, applicationAreaOptions };
};

