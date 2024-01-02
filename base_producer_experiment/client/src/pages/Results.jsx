import React from "react";
import {Button} from "../components/Button";
import {usePlayer} from "@empirica/core/player/classic/react";

export function SalesResults({players, roundNumber}) {
    const player = usePlayer();

    const roundStr = `round${roundNumber}_`

    const productionQuality = player.get(roundStr.concat("productionQuality"));
    const advertisementQuality = player.get(roundStr.concat("advertisementQuality"));
    const priceOfProduct = player.get(roundStr.concat("priceOfProduct"));
    const productionCost = player.get(roundStr.concat("productionCost"));
    const numShown = player.get(roundStr.concat("numShown"));
    const numBuyers = player.get(roundStr.concat("numBuyers"));
    const salesCount = player.get(roundStr.concat("salesCount"));
    const finalScore = player.get(roundStr.concat("finalScore"));
    const warrant = player.get(roundStr.concat("warrant"));
    const warrantChallenged = player.get(roundStr.concat("challenged"));
    const currentScore = player.get(roundStr.concat("score")) || 0;

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
        player.set(roundStr.concat("score"), finalScore);
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
                        {warrant > 0 ?
                            <p style={{fontFamily: "Avenir"}}>You also put a <b>${warrant}</b> warrant behind your ad to
                                show it to more users.</p> : null}

                        {warrantChallenged && productionQuality !== advertisementQuality ?
                            <p style={{fontFamily: "Avenir"}}>However, your warrant was <b>challenged</b>, and your ad
                                was found to be misleading! As a penalty, your warrant was <b>revoked</b> and the money
                                you
                                spent on it was lost.
                            </p> : null}

                        {warrantChallenged && productionQuality === advertisementQuality ?
                            <p style={{fontFamily: "Avenir"}}>Your warrant was <b>challenged</b>, but your ad
                                was found to be honest, so no additional actions were taken.
                            </p> : null}

                        <br/> <br/>
                    </p>

                    <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

                    <p style={{fontFamily: "Avenir"}}>
                        It was advertised to an audience of {numShown} users, and {numBuyers} users bought your product.
                    </p>
                    <p style={{fontFamily: "Avenir"}}>
                        You earned ${priceOfProduct - productionCost} per product x {numBuyers} units sold
                        = {salesCount + warrant} points in sales. {warrant > 0 ?
                        <p style={{fontFamily: "Avenir"}}>Factoring in the cost of your ad warrant, you earned
                            ${salesCount + warrant} - ${warrant} = ${salesCount} points this round.</p> : null}
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
            {LeaderboardEntry(roundStr, player, players)}
        </div>
    );
}

function LeaderboardEntry(roundStr, player, players) {
    // Sort the leaderboard in descending order of final score
    players.sort((player1, player2) => {
        return player1.get(roundStr.concat("_finalScore")) < player2.get(roundStr.concat("_finalScore")) ? 1 : 0;
    })

    return (
        <div className="mt-3 sm:mt-5 pt-20 pr-20">
            <h1 style={{fontFamily: "Futura", fontSize: "28px"}}>Leaderboard</h1>
            <h1>Net profit in market:
                ${players.map(player_ => player_.get(roundStr.concat("finalScore"))).reduce((s, a) => s + a, 0)}</h1>
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
                        <td style={{
                            textAlign: "center",
                            fontFamily: "Avenir"
                        }}>{player_.get(roundStr.concat("salesCount"))}</td>
                        <td style={{
                            textAlign: "center",
                            paddingRight: "20px",
                            fontFamily: "Avenir"
                        }}>{player_.get(roundStr.concat("finalScore"))}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}