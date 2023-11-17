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
  calculateAdvertiserScore(stage);
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calculateAdvertiserScore(stage) {
  if (
    stage.get("name") !== "Advertise" ||
    stage.round.get("task") !== "advertise" ||
    stage.get("name") !== "Advertise Again" ||
    stage.round.get("task") !== "advertiseAgain"
  ) {
    return;
  }

  for (const player of stage.currentGame.players) {
    let roundScore = 0;

    const playerScore = player.get("score");
    const adQuality = player.get("quality")
    if (adQuality == "high") {
      const randomDraw = getRandomInt(100)
      const salesCount = randomDraw * 15;
    } {
      const randomDraw = getRandomInt(100)
      const salesCount = randomDraw * 10;
    }

    player.round.set("buyers", randomDraw);

    const totalScore = player.get("score") || 0;
    player.set("score", totalScore + salesCount);
  }
}
