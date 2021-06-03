import styled from "styled-components";

export const DISPATCH_TYPES = [
  "setFalsePositive",
  "setLearning",
  "setArchitecture",
  "setProcessing",
  "setPipeline",
  "setInteresting",
  "setGoodPractices",
  "setPitfall",
  "setReferences",
  "setTransferLearning",
] as const;

export const MULTIPLE_SELECTION_QUESTION = [
  {
    label: "Types of learning",
    options: [
      "Supervised",
      "Unsupervised",
      "Semi-supervised",
      "Reinforcement learning",
      "Unclear",
      "General",
      "Applies to more than one",
    ],
    dispatch: DISPATCH_TYPES[1],
    getActualVal: (state: any): string[] => state.learning,
    mandatory: true,
  },
  {
    label: "Types of architecture",
    options: [
      "Deep",
      "Shallow",
      "unclear",
      "General",
      "Applies to more than one",
    ],
    dispatch: DISPATCH_TYPES[2],
    getActualVal: (state: any): string[] => state.architecture,
    mandatory: true,
  },
  {
    label: "Models of  processing",
    options: [
      "Batch",
      "Online",
      "Unclear",
      "General",
      "Applies to more than one",
    ],
    dispatch: DISPATCH_TYPES[3],
    getActualVal: (state: any): string[] => state.processing,
    mandatory: true,
  },
  {
    label: "Stages in the ML pipeline ",
    options: [
      "Model requirements",
      "Data collection",
      "Data labeling",
      "Feature engineering",
      "Model training",
      "Model evaluation",
      "Model deployment",
      "Model monitoring",
      "General",
      "Applies to more than one",
    ],
    dispatch: DISPATCH_TYPES[4],
    getActualVal: (state: any): string[] => state.mlPipeline,
    mandatory: true,
  },
];

export const SINGLE_SELECTION_QUESTION = [
  {
    label: "It is a false positive?",
    options: ["Yes", "No"],
    dispatch: DISPATCH_TYPES[0],
    disabled: false,
    getActualVal: (state: any) => state.falsePositive,
    mandatory: true,
  },
  {
    label: "Is it an interesting case to discuss?",
    options: ["Yes", "No"],
    dispatch: DISPATCH_TYPES[5],
    getActualVal: (state: any) => state.interesting,
    mandatory: true,
  },
  {
    label: "Is it related to transfer learning?",
    options: ["Yes", "No", "Not clear"],
    dispatch: DISPATCH_TYPES[9],
    getActualVal: (state: any) => state.transferLearning,
    mandatory: true,
  },
];

export const TEXT_AREA_QUESTIONS = [
  {
    label: "Suggested Good practice",
    dispatch: DISPATCH_TYPES[6],
    getActualVal: (state: any) => state.goodPractice,
    mandatory: true,
  },
  {
    label: "Pitfall/mistake/error that is related to good practice",
    dispatch: DISPATCH_TYPES[7],
    getActualVal: (state: any) => state.pitfall,
    mandatory: false,
  },
  {
    label: "External references",
    dispatch: DISPATCH_TYPES[8],
    getActualVal: (state: any) => state.references,
    mandatory: false,
  },
];

export type Question = {
  label: string;
  options: string[];
};
