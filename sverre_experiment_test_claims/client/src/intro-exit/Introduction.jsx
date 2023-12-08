import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-1 sm:mt-5 p-10">
      <h1 className="text-lg leading-6 font-large text-gray-900" style={{'font-size': '30px'}}>
        Marketplace Instructions
      </h1>
      <div className="text-lg mt-10 mb-6">
        {/* <p className="text-sm text-gray-500"> */}
        <div style={{'font-size': '20px'}}>
          In this marketplace, you will have to choose what your priorities are <b>as an advertiser</b>. You will be shown multiple products.
        <br />
          In <strong>each round of the game</strong>, you will:
        </div>
        <br />
        <div>
          (a) choose a type of advertisement to sell the given product.
        </div>
        <div> 
          (b) obtain the results, gains and losses, based on the sales of the advertised product. 
        </div>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
