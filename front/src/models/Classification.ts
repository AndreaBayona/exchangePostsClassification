export type Classification = {
  _id?: string;
  user: string;
  AID: number;
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