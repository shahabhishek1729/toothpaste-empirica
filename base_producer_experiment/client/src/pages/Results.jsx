import React from "react";
import {Button} from "../components/Button";
import {usePlayer} from "@empirica/core/player/classic/react";

export function SalesResults({roundNumber}) {
    const player = usePlayer();

    const productionQuality = player.get("productionQuality");
    const advertisementQuality = player.get("advertisementQuality");
    const priceOfProduct = player.get("priceOfProduct");
    const productionCost = player.get("productionCost");
    const numShown = player.get("numShown");
    const numBuyers = player.get("numBuyers");
    const salesCount = player.get("salesCount");
    const finalScore = player.get("finalScore");
    const warrant = player.get("warrant");
    const warrantChallenged = player.get("challenged");
    const currentScore = player.get("score") || 0;

    // Display the toothpaste quality the user chose to produce
    let imageUrl = "";
    if (advertisementQuality === "high") {
        imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
    } else if (advertisementQuality === "low") {
        imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
    }

    function handleSubmit() {
        console.log('Moving on from results round');
        player.stage.set("submit", true);
        player.set("score", finalScore);
    }

    return (
        <div className="mt-3 sm:mt-5 p-20">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
                Sales
            </h1>
            <div className="text-lg mt-2 mb-6">
                {/* <p className="text-sm text-gray-500"> */}
                <p>
                    You chose to produce a <b>{productionQuality}</b> quality product.
                </p>
                <p>
                    You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
                    You sold it at a price of <b>${priceOfProduct}</b>.
                    You also put a <b>${warrant}</b> warrant behind your ad to show it to more users.

                    {warrantChallenged ?
                        <p>However, your warrant was <b>challenged</b>, and your ad was found to be misleading!
                        </p> : null}

                    <br/> <br/>
                </p>

                <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

                <p>
                    It was advertised to an audience of {numShown} users, and {numBuyers} users bought your product.
                </p>
                <p>
                    You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold
                    = {salesCount + warrant} points in sales. Factoring in the cost of your ad warrant, you earned
                    ${salesCount + warrant} - ${warrant} = ${salesCount} points this round.
                </p><br/>
                <p> Your score for this round is: {salesCount} </p>
                <p> Your total score is: {salesCount + currentScore} </p><br/>
                <p>
                    Click to proceed to the next round to sell products in this marketplace.
                </p>
            </div>

            <Button handleClick={handleSubmit} primary>
                I'm done!
            </Button>
        </div>
    );
}