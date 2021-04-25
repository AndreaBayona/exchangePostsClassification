export const QData = {
    id: 1000,
    title: "What's the best practice for Boltzmann Exploration temperature in RL?",
    bodyText: "<p>I'm currently modeling DQN in Reinforcement Learning. My question is: what are the best practices related to Boltzmann Exploration? My current thoughts are: (1) Let the temperature decay through training and finally stop at 0.01, when the method will always select the best practice, with almost no randomness. (2) Standardize the predicted Q values before feeding into the softmax function.</p>&#xA;<p>Currently, I'm using (2), and the reward is suffering from high variance. I'm wondering whether it has something to do with the exploration method?</p>&#xA;",
    score: 1,
    url: "https://ai.stackexchange.com/questions/22064",
};

export const QAns = {
    bodyText: "<p>Do you have to use Boltzmann exploration, strictly? There is a modification for Boltzmann exploration called Mellow-max. It, basically, provides an adaptive temperature for Boltzmann exploration.</p>&#xA;<p>Here is the link for the paper for tuning mellow-max with deep reinforcement learning (DQN is often mentioned): <a href=\"http://cs.brown.edu/people/gdk/pubs/tuning_mellowmax_drlw.pdf\" rel=\"nofollow noreferrer\">http://cs.brown.edu/people/gdk/pubs/tuning_mellowmax_drlw.pdf</a></p>&#xA;<p>Here is the link for mellow-max implemented with SARSA (I recommend reading this first, to get an understanding of mellow-max): <a href=\"https://arxiv.org/pdf/1612.05628.pdf\" rel=\"nofollow noreferrer\">https://arxiv.org/pdf/1612.05628.pdf</a></p>&#xA;",
    score: 1,
    url: "https://ai.stackexchange.com/questions/22197",
    type: 'accepted',
    classified: true,
    read: () => <>Read</>,
    classify: () => <>Classify</>,
};
