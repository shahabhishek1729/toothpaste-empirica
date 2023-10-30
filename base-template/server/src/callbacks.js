import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const treatment = game.get("treatment");
  const { numRounds } = treatment;

  for (let i = 0; i < treatment.numRounds; i++) {
    const round = game.addRound({
      name: `Round ${i + 1}`,
    });
    round.addStage({ name: "choice", duration: 10000 });
    round.addStage({ name: "result", duration: 10000 });
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  //compute our score.
  const players = stage.currentGame.players;
  for (const player of players) {
    const opponent = players.filter((p) => p.id !== player.id)[0];
    const playerChoice = player.round.get("decision");
    const opponentChoice = opponent?.round?.get("decision");

    let score;
    if (playerChoice === "testify" && opponentChoice === "testify") {
      score = 6;
    } else if (playerChoice === "testify" && opponentChoice === "silent") {
      score = 0;
    } else if (playerChoice === "silent" && opponentChoice === "testify") {
      score = 12;
    } else {
      score = 2;
    }
    player.round.set("score", score);

    const currentScore = player.get("score") || 0;
    player.set("score", score + currentScore);
  }
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
