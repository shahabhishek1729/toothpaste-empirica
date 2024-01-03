import {ClassicListenersCollector} from "@empirica/core/admin/classic";

export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({game}) => {

    for (let i = 0; i < 4; ++i) {
        // Iteration #1
        const round_i_1 = game.addRound({
            name: "Quality",
            task: `quality${i > 0 ? i + 1 : ''}`,
        });
        round_i_1.addStage({name: "chooseQuality", duration: 240});

        const round_i_2 = game.addRound({
            name: "Price",
            task: `price${i > 0 ? i + 1 : ''}`,
        });
        round_i_2.addStage({name: "choosePrice", duration: 240});

        const round_i_3 = game.addRound({
            name: "Advertise",
            task: `advertise${i > 0 ? i + 1 : ''}`,
        });
        round_i_3.addStage({name: "advertiseProduct", duration: 300});

        const round_i_4 = game.addRound({
            name: "Results",
            task: `results${i > 0 ? i + 1 : ''}`,
        });
        round_i_4.addStage({name: "Result", duration: 120});
    }
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
 * @param {Player} player                The player for which to compute scores
 * @param {string} roundStr              A string representing the current round number, e.g., "round1"
 * @param {number} warrantValue          How many viewers a warranted advertisement is shown to
 * @param {number} challengeProbability  The probability that a warrant is challenged (from 0 to 1)
 *
 * @return {undefined}                   Score elements are set directly on the player object in Empirica, and so
 *                                       nothing is returned.
 */
function computePlayerScore(player, roundStr, warrantValue, challengeProbability) {
    const productionQuality = player.get(roundStr.concat("_choices"))[0]
    const advertisementQuality = player.get(roundStr.concat("_choices"))[1]
    const priceOfProduct = player.get(roundStr.concat("_choices"))[2];
    const productionCost = player.get(roundStr.concat("_choices"))[3];
    const warrant = player.get(roundStr.concat("_choices"))[4];

    const profitPerProduct = priceOfProduct - productionCost;

    const currentScore = player.get("finalScore") || 0;

    // Every additional $10 spent on a warrant shows that advertisement to one additional user.
    const numShown = warrant === 0 ? 100 : warrantValue;

    // Initially, anywhere from no one to everyone the ad was shown to may purchase the product.
    let minBuyers = warrant === 0 ? 0 : 100;
    let maxBuyers = numShown;
    console.log(`Originally, there were from ${minBuyers} to ${maxBuyers} potential buyers`)

    if (priceOfProduct === 15) {
        // If the product is charged at a high price, there will be 30% fewer potential buyers.
        // If the product is advertised as low quality but sold at a high price, there will be 90% fewer buyers.
        const multiplier = advertisementQuality === "high" ? 0.7 : 0.1;
        minBuyers = ~~(minBuyers * multiplier);
        maxBuyers = ~~(maxBuyers * multiplier);
    }

    console.log(`Factoring in the price, there were from ${minBuyers} to ${maxBuyers} potential buyers`)

    // Simulates a 70% chance of a warrant being challenged
    const randomNumber = Math.random();
    console.log(`Random number was ${randomNumber}`);
    const challenged = warrant > 0 && randomNumber <= challengeProbability;

    if (challenged && productionQuality !== advertisementQuality) {
        // The ad was challenged and found to be false; reset the minBuyers and maxBuyers values as if the producer had
        // never purchased a warrant.
        minBuyers = 0;
        maxBuyers = 100;
    }

    console.log(`There were from ${minBuyers} to ${maxBuyers} potential buyers`)

    const numBuyers = randFromRange(minBuyers, maxBuyers);
    const totalProfit = profitPerProduct * numBuyers - warrant;
    const finalScore = currentScore + totalProfit;

    console.log(`Price of product was ${priceOfProduct}`)

    player.set(roundStr.concat("_productionQuality"), productionQuality);
    player.set(roundStr.concat("_advertisementQuality"), advertisementQuality);
    player.set(roundStr.concat("_priceOfProduct"), priceOfProduct);
    player.set(roundStr.concat("_productionCost"), productionCost);
    player.set(roundStr.concat("_numShown"), numShown);
    player.set(roundStr.concat("_numBuyers"), numBuyers);
    player.set(roundStr.concat("_salesCount"), totalProfit);
    player.set("finalScore", finalScore);
    player.set(roundStr.concat("_warrant"), warrant);
    player.set(roundStr.concat("_challenged"), challenged);
}

Empirica.onStageEnded(({stage}) => {
    if (!stage.round.get("task").startsWith("advertise")) return;

    const players = stage.currentGame.players;
    const {warrantValue, challengeProbability} = stage.currentGame.get("treatment")
    console.log(`The warrant value was ${warrantValue}`);
    console.log(`The challenge prob was ${challengeProbability}`);

    const stageNumStr = stage.round.get("task").replace("advertise", "");
    const roundNum = stageNumStr === "" ? 1 : parseInt(stageNumStr)
    const roundNumberText = 'round' + roundNum;

    for (const player of players)
        computePlayerScore(player, roundNumberText, warrantValue, challengeProbability);
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
