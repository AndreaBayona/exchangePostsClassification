export const FORM_QUESTIONS = [
  {
    label: "Is it relevant to the project?",
    options: ["Yes", "No"],
    freeInput: false,
  },
  {
    label: "Types of learnings",
    options: [
      "Supervised",
      "Unsupervised",
      "Semi-supervised",
      "Reinforcement learning",
      "Unclear",
    ],
    freeInput: false,
  },
  {
    label: "Types of architecture",
    options: ["Deep", "Shallow", "unclear"],
    freeInput: false,
  },
  {
    label: "Models of  processing",
    options: ["Batch", "Online", "Unclear"],
    freeInput: false,
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
      "  Model monitoring",
    ],
    freeInput: false,
  },
  {
    label: "Is it interesting?",
    options: ["Yes", "No"],
    freeInput: false,
  },
  {
    label: "Suggested Good practice",
    options: [],
    freeInput: true,
  },
  {
    label: "Pitfall/mistake/error that is related to good practice",
    options: [],
    freeInput: true,
  },
  {
    label: "External references",
    options: [],
    freeInput: true,
  },
];

export const DISPATCH_TYPES = [
  "setRelevant",
  "setLearning",
  "setArchitecture",
  "setProcessing",
  "setPipeline",
  "setInteresting",
  "setGoodPractices",
  "setPitfall",
  "setReferences",
] as const;
