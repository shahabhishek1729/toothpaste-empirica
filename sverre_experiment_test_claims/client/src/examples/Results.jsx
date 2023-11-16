import React from "react";
import { Button } from "../components/Button";

// create randomized sales for the selected product
// const randomSales = 

function handleSubmit(event, player) {
    console.log('Moving on from results round')
    const totalScore = player.get("score") || 0;
    player.set("score", totalScore + roundScore);
    player.stage.set("submit", true);
    next();
  }
  
export function SalesResults({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Sales of Chosen Product
      </h3>
      <div className="mt-2 mb-6">
        {/* <p className="text-sm text-gray-500"> */}
        <p>
          You chose to sell a high/low quality product to an audience of 100 users.
        <br />
        </p>
        <p>
          50 users bought your product.
        </p>
        <p> 
          You earned 20 dollars in sales.
        </p>
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
