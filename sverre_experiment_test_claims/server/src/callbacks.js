import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  const round0 = game.addRound({
    name: "Advertise",
    task: "advertise",
  });
  round0.addStage({ name: "advertiseProduct", duration: 120 });

  const round1 = game.addRound({
    name: "Results",
    task: "results",
  });
  round1.addStage({ name: "Result", duration: 45 });

  const round2 = game.addRound({
    name: "Advertise Again",
    task: "advertiseAgain",
  });
  round2.addStage({ name: "advertiseProduct", duration: 120 });
  
  const round3 = game.addRound({
    name: "Game Results",
    task: "gameResults",
  });
  round3.addStage({ name: "Result", duration: 45 });

});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {
  calculateJellyBeansScore(stage);
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

// Note: this is not the actual number of beans in the pile, it's a guess...
const jellyBeansCount = 634;

function calculateJellyBeansScore(stage) {
  if (
    stage.get("name") !== "Answer" ||
    stage.round.get("task") !== "jellybeans"
  ) {
    return;
  }

  for (const player of stage.currentGame.players) {
    let roundScore = 0;

    const playerGuess = player.round.get("guess");

    if (playerGuess) {
      const deviation = Math.abs(playerGuess - jellyBeansCount);
      const score = Math.round((1 - deviation / jellyBeansCount) * 10);
      roundScore = Math.max(0, score);
    }

    player.round.set("score", roundScore);

    const totalScore = player.get("score") || 0;
    player.set("score", totalScore + roundScore);
  }
}