import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <p>
      <strong>Instruction:</strong>
In this game, there are two roles: producers and consumers. You will be randomly assigned to one of these roles. <br />

Producers will sell products and provide corresponding product information, while consumers will purchase products based on their own preferences and the product information provided.<br />
      </p>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
