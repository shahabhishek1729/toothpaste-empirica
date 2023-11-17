import React, {useEffect} from "react";
import { Button } from "../components/Button";

// create randomized sales for the selected product
// const randomSales = 

// function handleSubmit(event, player) {
//     console.log('Moving on from results round')
//     const totalScore = player.get("score") || 0;
//     player.set("score", totalScore + roundScore);
//     player.stage.set("submit", true);
//     next();
//   }


export function SalesResults({ next, player }) {

  const roundScore = 4

  useEffect(() => {
    // Check if the score for this round has already been updated
    const hasScoreBeenUpdated = player.round.get("scoreUpdated");

    if (!hasScoreBeenUpdated) {
      const currentScore = player.get("score") || 0;
      player.set("score", currentScore + roundScore);
      player.round.set("scoreUpdated", true); // Set the flag indicating score update
    }
  }, [player, roundScore]);

  function handleSubmit(event) {
    console.log('Moving on from results round');
    //const totalScore = player.get("score") || 0;
    //layer.set("score", totalScore + roundScore);
    player.stage.set("submit", true);
    next(); // Call the next function to move on
  }
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Sales of Chosen Product
      </h3>
      <div className="mt-2 mb-6">
        {/* <p className="text-sm text-gray-500"> */}
        <p>
          You chose to sell a {player.get("adQuality")} (should show quality) quality product to an audience of 100 users.
        <br />
        </p>
        <p>
          {} users bought your product.
        </p>
        <p> 
          You earned 20 dollars in sales.
        </p><br/>
        <p> Your score for this round is: {roundScore} </p>
        <p> Your total score is: {player.get("score")} </p><br/>
        <p> 
          Click to proceed to the next round to sell products in this marketplace.
        </p>
      </div>
      <Button handleClick={(event) => handleSubmit(event)} primary>
        I'm done!
      </Button>
    </div>
  );
}
