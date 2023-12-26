import {ClassicListenersCollector} from "@empirica/core/admin/classic";
import {Player} from "@empirica/core";

export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({game}) => {

    const round0 = game.addRound({
        name: "Advertise",
        task: "advertise",
    });
    round0.addStage({name: "advertiseProduct", duration: 240});

    const round1 = game.addRound({
        name: "Results",
        task: "results",
    });
    round1.addStage({name: "Result", duration: 140});

    const round2 = game.addRound({
        name: "Advertise",
        task: "advertise2",
    });
    round2.addStage({name: "advertiseProduct", duration: 240});

    const round3 = game.addRound({
        name: "Results",
        task: "results2",
    });
    round3.addStage({name: "Result", duration: 140});

    const round4 = game.addRound({
        name: "Advertise",
        task: "advertise3",
    });
    round4.addStage({name: "advertiseProduct", duration: 240});

    const round5 = game.addRound({
        name: "Results",
        task: "results3",
    });
    round5.addStage({name: "Result", duration: 140});

    const round6 = game.addRound({
        name: "Advertise",
        task: "advertise4",
    });
    round6.addStage({name: "advertiseProduct", duration: 240});

    const round7 = game.addRound({
        name: "Game Results",
        task: "results4",
    });
    round7.addStage({name: "Result", duration: 140});

});

Empirica.onRoundStart(({round}) => {
});

Empirica.onStageStart(({stage}) => {
});

function randFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Computes the score for a single player after completing a round
 * @param {Player} player     The player for which to compute scores
 * @param {string} roundStr   A string representing the current round number, e.g., "round1"
 * @return {undefined}        Score elements are set directly on the player object in Empirica, and so nothing is returned.
 */
function computePlayerScore(player, roundStr) {
    const productionQuality = player.get(roundStr.concat("_choices"))[0]
    const advertisementQuality = player.get(roundStr.concat("_choices"))[1]
    const priceOfProduct = player.get(roundStr.concat("_choices"))[2];
    const productionCost = player.get(roundStr.concat("_choices"))[3];
    const warrant = player.get(roundStr.concat("_choices"))[4];

    const profitPerProduct = priceOfProduct - productionCost;

    const currentScore = player.get("score") || 0;

    // Every additional $10 spent on a warrant shows that advertisement to one additional user.
    const numExtra = ~~(warrant / 10);
    const numShown = 100 + numExtra;

    // Initially, anywhere from no one to everyone the ad was shown to may purchase the product.
    let minBuyers, maxBuyers = numShown;

    // advertisementQuality must always be a string, so we'll check for strict equality (===)
    // priceOfProduct may be stored as string or int, so we'll only check for loose equality (==)
    if (advertisementQuality === "high")
        minBuyers = priceOfProduct == 10 ? 70 : 50;
    else {
        minBuyers = priceOfProduct == 10 ? 50 : 10;
        maxBuyers = ~~(numShown * (priceOfProduct == 10 ? 0.8 : 0.2));
    }

    const challenged = advertisementQuality !== productionQuality;

    if (challenged) {
        minBuyers /= 2;
        maxBuyers /= 2;
    }

    const numBuyers = randFromRange(minBuyers, maxBuyers);
    const totalProfit = profitPerProduct * numBuyers - warrant;
    const finalScore = currentScore + totalProfit;

    player.set("productionQuality", productionQuality);
    player.set("advertisementQuality", advertisementQuality);
    player.set("priceOfProduct", priceOfProduct);
    player.set("productionCost", productionCost);
    player.set("numShown", numShown);
    player.set("numBuyers", numBuyers);
    player.set("salesCount", totalProfit);
    player.set("finalScore", finalScore);
    player.set("warrant", warrant);
    player.set("challenged", challenged);
}

Empirica.onStageEnded(({stage}) => {
    if (!stage.round.get("task").startsWith("advertise")) return;

    const players = stage.currentGame.players;
    console.log(`SERVER: There were ${players.length} players`)

    const stageNumStr = stage.round.get("task").replace("advertise", "");
    const roundNum = stageNumStr === "" ? 1 : parseInt(stageNumStr)
    const roundNumberText = 'round' + roundNum;

    console.log(`This was round number ${roundNum} with text ${roundNumberText}`)

    for (const player of players)
        computePlayerScore(player, roundNumberText);
});

Empirica.onRoundEnded(({round}) => {
});

Empirica.onGameEnded(({game}) => {
});

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
        if (adQuality === "extraordinary") {
            randomDraw = getRandomInt(100)
            salesCount = randomDraw * 15;
        }
        {
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
