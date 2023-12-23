import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({roundNumber}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  const roundNumberText = 'round' + roundNumber;
  
  //const adQuality = player.get("adQuality");
  const productionQuality = player.get(roundNumberText.concat("_choices"))[0]
  const advertisementQuality = player.get(roundNumberText.concat("_choices"))[1]
  const priceOfProduct = player.get(roundNumberText.concat("_choices"))[2]
  const productionCost = player.get(roundNumberText.concat("_choices"))[3]
  let imageUrl = "";
  //console.log('roundNumberText', roundNumberText)
  if (advertisementQuality === "high") {
    imageUrl = "/images/toothpaseamazing.jpg"; // Replace with the actual URL for high quality
  } else if (advertisementQuality === "low") {
    imageUrl = "/images/toothpastestandard.jpg"; // Replace with the actual URL for low quality
  }

  const currentScore = player.get("score") || 0; // , adQuality, points, salesCount, numBuyers
  
  //let points = 10;
  let points = priceOfProduct

  const min = 10;
  const max = 90;
  
  //  switch (advertisementQuality){
  //    case "high":
  //      switch (priceOfProduct) {case "high": min = 50; break; case "low": min = 70; break;
  //      };
  //    case "low":
  //      switch (priceOfProduct) {case "high": min =10, max=20; break; case "low": min = 50, max = 80; break;}
  //  }
  const numBuyers = Math.floor((Math.random() * (max - min ) + min)) ;


  const salesCount = numBuyers * (priceOfProduct - productionCost);
  const finalScore = currentScore + salesCount

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
        <br /> <br />
        </p>

        <img src={imageUrl} alt="Toothpaste Standard" width="250" height="250"/>

        
        <p>
          It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
        </p>
        <p> 
          You earned ${priceOfProduct - productionCost}  per product x {numBuyers} units sold = {salesCount} points in sales.
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