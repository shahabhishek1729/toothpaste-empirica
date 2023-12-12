import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { usePlayer } from "@empirica/core/player/classic/react";
import { useRef } from "react";

export function SalesResults({}) {
  console.log('calculating advertiser score');
  const player = usePlayer();
  //const adQuality = player.get("adQuality");
  const productionQuality = player.get("round1choice")[0]
  const advertisementQuality = player.get("round1choice")[1]
  const priceOfProduct = player.get("round1choice")[2]

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
          You chose to produce a <b>{productionQuality}</b> quality product.
        </p>
        <p>
          You chose to advertise it as a <b>{advertisementQuality}</b> product.
          <p>You sold it at a price of <b>${priceOfProduct}</b></p>
        <br /> <br />
        </p>
        
        <p>
          It was advertised to an audience of 100 users, and {numBuyers} users bought your product.
        </p>
        <p> 
          You earned {priceOfProduct} points per product x {numBuyers} units sold = {salesCount} points in sales.
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