export const PIPELINE_EXPLANATIONS = [
    {
      title: 'Model requirements',
      detail: 'Designers decide which features are feasible to implement with machine learning and which can be useful for a given existing product or for a new one.Most importantly, in this stage, they also decide what types of models are most appropriate for the given problem.',
    },
    {
        title: 'Data collection',
        detail: 'Teams look for and integrate available datasets (e.g., internal or open source) or collect their own.'
    },
    {
        title: 'Data labeling',
        detail: 'Assigns ground truth labels to each record. For example, an engineer might have a set of images on hand which have not yet been labeled with the objects present in the image. Most of the supervised learning techniques require labels to be able to induce a model. Other techniques (e.g., reinforcement learning) use demonstration data or environment rewards to adjust their policies. Labels can be provided either by engineers themselves, domain experts, or by crowd workers in online crowd-sourcing platforms.'
    },
    {
        title: 'Feature engineering',
        detail: 'To all activities that are performed to extract and select informative features for machine learning models. For some models (e.g. convolutional neural networks), this stage is less explicit and often blended with the next stage, model training.'
    },
    {
        title: 'Model training ',
        detail: 'The chosen models (using the selected features) are trained and tuned on the clean, collected data and their respective labels.'
    },
    {
        title: 'Model evaluation',
        detail: 'The engineers evaluate the output model on tested or safeguard datasets using pre-defined metrics. For critical domains, this stage might also involve extensive human evaluation.'
    },
    {
        title: 'Model deployment',
        detail: 'The inference code of the model is then deployed on the targeted device(s) '
    },
    {
        title: 'Model monitoring',
        detail: 'Continuously monitored for possible errors during real-world execution.'
    },
];