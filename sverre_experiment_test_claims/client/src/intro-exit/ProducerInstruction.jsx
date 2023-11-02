import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <p>
        In this game, you have chose the role as Provider (Producer?).
        <br />
        Your role is producer:
        <br />

        <strong>Your goal is to sell as many as product as you can.</strong> We will provide you a list of produces and a list of ads you want to use for this product. You can choose one product you want to sell and one product description you want to use for your ads. Some of descriptions are true. Some of them maybe misleading. You may want to choose the one that fits in your goal.

        You are starting with <strong>$100</strong> which can be used for advertising. Your fund will be updated given the result from each round.

        In <strong>each round of the game</strong>, as a provider, you will:
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
