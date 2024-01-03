# Empirica Take-Home Programming Tasks

This repository contains my implementation of the core task and three bonuses involved in the take-home interview.

## Summary of major changes:
* Moved scoring functionality server-side to ensure all scoring computations were done before displaying the results page, implemented in the following function in `server/callbacks.js`
```js
function computePlayerScore(player, roundStr, warrantValue, challengeProbability)
```
* Built out a system warrant advertisements, with appropriate incentives and penalities built-in. The parameters for penalizing and incentivizing warrants are also included as treatments in the Empirica config files, so they can be customized when launching a new experiment to determine their ideal values.
* Added a synced leaderboard to the Results page, so that users can see how the market is doing after a certain round.
* Built a basic admin dashboard in `Admin Dashboard.ipynb` to track and visualize users' decisions over the rounds of an experiment
* Restructured the UI of the experimenmt and broke up the user's decisions into three pages, with page 1 comprising production quality decisions, page 2 involving the selling price, and the third page offering advertisement-related options.
* Basic code refactoring (extracted functions for repeated tasks and added documentation in some instances). For instances, the following function was extracted from `Advertisements.jsx`:
```js
function NLineBreaks(n) {
    return [...Array(n).keys()].map(item => <br/>)
}
```

## Short Answer Responses
**Short Answer (500 words)**: *Discuss how you would plan the feature including any designs, references, links to resources you’ve used to determine the best way to develop such a feature.*<br/>
```
The way I would implement warrants in this marketplace is similar to stamps of verification present in other marketplaces today (more on which is described in question 2 below). The general idea is that a producer can either choose to spend $W on a warrant, for which their ad would be visible to V users; alternatively, the producer can choose not to warrant their advertisement, in which case the ad will be shown to 100 users. By default, we set the minimum possible number of buyers to 0 (if no warrant) or 100 (if there is a warrant), and the maximum number of potential buyers to 100 (if no warrant) or V (if there is a warrant). The process for choosing these values is described in more detail later in this response, but in short, this allows for producers sharing honest information to have very little chance of being penalized, whereas producers being dishonest in advertisements would fare worse. However, these values for the minimum and maximum number of buyers may change due to one of two scenarios:
1. The product is advertised as high-quality toothpaste and costs $15: since fewer people would likely pay a premium for high-quality toothpaste, this cuts the number of potential buyers by 30%. That is, the maximum number of buyers in this scenario is 0.7V if the producer warranted their ad, or (0.7)(100) = 70 otherwise.
2. The product is advertised as low-quality toothpaste and costs $15: in this case, even fewer people would pay a premium for toothpaste advertised as low-quality, and so this would reduce the number of potential buyers by 90%. This sets the maximum number of buyers in this scenario to 0.1V if the producer warranted their ad, or 0.1 * 100 = 10 otherwise.

We then perform a random draw from [minBuyers, maxBuyers) to determine how many of the ad's viewers would actually purchase the toothpaste. The user's sales can be computed with this value, and this information is then displayed to the user on the Results page.

To determine the ideal values of V, and W, I set out with two goals in mind:
1. Producers with honest ads should have as little chance of being penalized for warranting their ads as possible.
2. Producers with dishonest ads should fare worse than producers being honest. More specifically, a dishonest producer is defined as one that manufactures low-quality toothpaste, yet markets high-quality toothpaste to consumers. Although there is another possiblitiy (making high-quality toothpaste yet marketing low-quality toothpaste), this is less likely and is penalized by default, so it won't be considered below.

After simulating multiple possible values for V and W, I settled on the following: a warrant should cost $1000, and should spread the ad to 2000 users. However, I also added these parameters as factors in the Empirica `treatments.yaml` file, so that experiment administrators can change them to observe the effects of different rewards/penalties. My tests can be found at this Desmos page.

Resources:
Empirica Docs
Empirica Video
StackOverflow
```

**Short Answer (500 words)**: *Discuss why this feature is reflective of a real-world marketplace and what kind of trade-offs you would want to consider to make this feature easy for users to employ.*<br/>
```
Here is my answer to question #2.
```
