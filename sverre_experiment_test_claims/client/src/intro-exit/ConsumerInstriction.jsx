import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <p>
        In this game, you have chose the role as User (Consumer?).
        <br />
        Your role is consumer:
        <br />

        <strong>Your goal is to purchase the right product which gives you the most utility. </strong> You will see a list of products and product descriptions chosen by producers.
        Some descriptions are true. Some of them maybe misleading. You may want to choose the one that fits in your goal. <br />
        
        You are starting with <strong>$100</strong> which can be used for purchasing products and <strong>50 utility level</strong>.
        Your fund and utility level will be updated given the result from each round.

        In <strong>each round of the game</strong>, as a Consumer, you will:
      </p>
      <p>
        (a) Provider task #1
      </p>
      <p> (b) Provider task #2 </p>
      <br />
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
