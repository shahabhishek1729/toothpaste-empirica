# Empirica Take-Home Programming Tasks

This repository contains my implementation of the core task and three bonuses involved in the take-home interview.

## Summary of major changes:
* Moved scoring functionality server-side to ensure all scoring computations were done before displaying the results page
* Built out a system warrant advertisements, with appropriate incentives and penalities built-in. The parameters for penalizing and incentivizing warrants are also included as treatments in the Empirica config files, so they can be customized when launching a new experiment to determine their ideal values.
* Added a synced leaderboard to the Results page, so that users can see how the market is doing after a certain round.
* Built a basic admin dashboard in `Admin Dashboard.ipynb` to track and visualize users' decisions over the rounds of an experiment
* Restructured the UI of the experimenmt and broke up the user's decisions into three pages, with page 1 comprising production quality decisions, page 2 involving the selling price, and the third page offering advertisement-related options.
* Basic code refactoring (extracted functions for repeated tasks and added documentation in some instances)

## Short Ansewr Responses
**Short Answer (500 words)**: Discuss how you would plan the feature including any designs, references, links to resources you’ve used to determine the best way to develop such a feature.
Here is my answer to question #1.

**Short Answer (500 words)**: Discuss why this feature is reflective of a real-world marketplace and what kind of trade-offs you would want to consider to make this feature easy for users to employ.
Here is my answer to question #2.
