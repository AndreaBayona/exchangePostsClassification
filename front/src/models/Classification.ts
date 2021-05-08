export type Classification = {
  isFalsePositive: boolean | undefined;
  typeOfLearning: string[];
  typeOfArchitecture: string[];
  processingModel: string[];
  mlPipeline: string[];
  goodPractice: string;
  pitfall: string;
  externalReferences: string;
  interesting: boolean | undefined;
};
