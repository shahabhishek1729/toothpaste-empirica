import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  const adQuality = player.get("adQuality");
  const currentScore = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers

  let points = 10;
  const numBuyers = Math.floor(Math.random() * 100);

  switch (adQuality) {
    case "extraordinary":
      points = 15;
  }
  console.log(adQuality, currentScore, numBuyers);

  const salesCount = numBuyers * points;
  const finalScore = currentScore + salesCount

  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
    player.set("score", finalScore);
  }
  
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Sales of Chosen Product
      </h3>
      <div className="mt-2 mb-6">
        {/* <p className="text-sm text-gray-500"> */}
        <p>
          You were given an ordinary product.
        </p>
        <p>
          You chose to advertise it as an {adQuality} product.
        <br /> <br />
        </p>
        <p>
          It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
        </p>
        <p> 
          You earned {points} points per product x {numBuyers} units sold = {salesCount} points in sales.
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