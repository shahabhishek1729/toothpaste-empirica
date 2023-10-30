import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <p>
        In this game, you will be partnered with another experiment participant.
        <br />
        In <strong>each round of the game</strong>, you and your partner will:
      </p>
      <p>
        (a) choose whether to work together or to look out for your own
        interests
      </p>
      <p> (b) see each others choices and the results of your choices </p>
      <br />
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
