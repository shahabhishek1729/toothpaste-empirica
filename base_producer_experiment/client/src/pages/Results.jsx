import React from "react";
import {Button} from "../components/Button";
import {usePlayer} from "@empirica/core/player/classic/react";

export function SalesResults({players}) {
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
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div className="p-20">
                <h1 style={{fontFamily: "Futura", fontSize: "28px"}}>Sales</h1>
                <div className="text-lg mt-2 mb-6">
                    <p style={{fontFamily: "Avenir"}}>
                        You chose to produce <b>{productionQuality}</b> quality toothpaste.
                    </p>
                    <p style={{fontFamily: "Avenir"}}>
                        You chose to advertise it as a <b>{advertisementQuality}</b> quality product.
                        You sold it at a price of <b>${priceOfProduct}</b>.
                        You also put a <b>${warrant}</b> warrant behind your ad to show it to more users.

                        {warrantChallenged ?
                            <p style={{fontFamily: "Avenir"}}>However, your warrant was <b>challenged</b>, and your ad
                                was found to be misleading!
                            </p> : null}

                        <br/> <br/>
                    </p>

                    <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

                    <p style={{fontFamily: "Avenir"}}>
                        It was advertised to an audience of {numShown} users, and {numBuyers} users bought your product.
                    </p>
                    <p style={{fontFamily: "Avenir"}}>
                        You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold
                        = {salesCount + warrant} points in sales. Factoring in the cost of your ad warrant, you earned
                        ${salesCount + warrant} - ${warrant} = ${salesCount} points this round.
                    </p><br/>
                    <p style={{fontFamily: "Avenir"}}> Your score for this round is: {salesCount} </p>
                    <p style={{fontFamily: "Avenir"}}> Your total score is: {salesCount + currentScore} </p><br/>
                    <p style={{fontFamily: "Avenir"}}>
                        Click to proceed to the next round to sell products in this marketplace.
                    </p>
                </div>


                <Button handleClick={handleSubmit} primary>
                    I'm done!
                </Button>
            </div>
            {LeaderboardEntry(player, players)}
        </div>
    );
}

function LeaderboardEntry(player, players) {
    return (
        <div className="mt-3 sm:mt-5 pt-20 pr-20">
            <h1 style={{fontFamily: "Futura", fontSize: "28px"}}>Leaderboard</h1>
            <h1>Net profit in market:
                ${players.map(player_ => player_.get("finalScore")).reduce((s, a) => s + a, 0)}</h1>
            <table style={{border: "2px solid gray", width: "400px", height: "100px"}}>
                <tr>
                    <th style={{borderBottom: "1px solid black", paddingLeft: "30px", fontFamily: "Avenir"}}>ID</th>
                    <th style={{borderBottom: "1px solid black", fontFamily: "Avenir"}}>Score this Round</th>
                    <th style={{borderBottom: "1px solid black", paddingRight: "20px", fontFamily: "Avenir"}}>Total
                        Score
                    </th>
                </tr>

                {players.map(player_ =>
                    <tr>
                        <td style={{
                            textAlign: "center",
                            paddingLeft: "30px",
                            fontFamily: "Avenir"
                        }}>{player.id === player_.id ? "You" : player_.id}</td>
                        <td style={{textAlign: "center", fontFamily: "Avenir"}}>{player_.get("salesCount")}</td>
                        <td style={{
                            textAlign: "center",
                            paddingRight: "20px",
                            fontFamily: "Avenir"
                        }}>{player_.get("finalScore")}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}