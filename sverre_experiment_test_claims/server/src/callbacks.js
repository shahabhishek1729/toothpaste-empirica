import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  const round0 = game.addRound({
    name: "Advertise",
    task: "advertise",
  });
  round0.addStage({ name: "advertiseProduct", duration: 480 });

  const round1 = game.addRound({
    name: "Results",
    task: "results",
  });
  round1.addStage({ name: "Result", duration: 140 });

  const round2 = game.addRound({
    name: "Advertise Again",
    task: "advertiseAgain",
  });
  round2.addStage({ name: "advertiseProduct", duration: 480 });
  
  const round3 = game.addRound({
    name: "Game Results",
    task: "gameResults",
  });
  round3.addStage({ name: "Result", duration: 140 });

});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {
  // calculateAdvertiserScore(stage);
});

Empirica.onStageEnded(({ stage }) => {});

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
    console.log('calculating advertiser score')
    let adQuality = player.get("adQuality")
    let salesCount = 0
    let randomDraw = 0
    if (adQuality == "extraordinary") {
      randomDraw = getRandomInt(100)
      salesCount = randomDraw * 15;
    } {
      let randomDraw = getRandomInt(100)
      salesCount = randomDraw * 10;
    }

    player.set("numBuyers", randomDraw);

    let totalScore = player.get("score") || 0;
    player.set("salesCount", salesCount);
    player.set("score", totalScore + salesCount);
    player.set("scoreUpdated", true)
  }
}
