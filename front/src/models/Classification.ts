export type Classification = {
  _id?: string;
  user: string;
  AID: number;
  isFalsePositive: boolean | undefined;
  typeOfLearning: string[];
  typeOfArchitecture: string[];
  processingModel: string[];
  mlPipeline: string[];
  goodPractice?: string;
  goodPracticeArray: string[];
  pitfall?: string;
  pitfallArray: string[];
  externalReferences: string;
  interesting: boolean | undefined;
  transferLearning: string;
  relatedMlMethod: string[];
  applicationArea: string[];
};