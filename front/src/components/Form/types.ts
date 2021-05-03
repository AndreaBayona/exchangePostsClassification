export const FORM_QUESTIONS = [
  {
    label: "It is a false positive?",
    options: ["Yes", "No"],
    freeInput: false,
  },
  {
    label: "Types of learning",
    options: [
      "Supervised",
      "Unsupervised",
      "Semi-supervised",
      "Reinforcement learning",
      "Unclear",
      "General",
      "Applies to more than one"
    ],
    freeInput: false,
  },
  {
    label: "Types of architecture",
    options: ["Deep", "Shallow", "unclear", "General", "Applies to more than one"],
    freeInput: false,
  },
  {
    label: "Models of  processing",
    options: ["Batch", "Online", "Unclear", "General", "Applies to more than one"],
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
      "Model monitoring",
      "General",
      "Applies to more than one"
    ],
    freeInput: false,
  },
  {
    label: "Is it an interesting case to discuss?",
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
