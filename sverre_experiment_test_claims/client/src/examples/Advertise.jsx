import {
    Slider,
    usePlayer,
    usePlayers,
    useStage,
  } from "@empirica/core/player/classic/react";
  import React from "react";
  import { Avatar } from "../components/Avatar";
  import { Button } from "../components/Button";
  import "@empirica/core/player/classic/react";
  
  export function Advertisement() {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();
  
    function handleChange() {
      console.log("something happened");
    }
  
    // function handleSubmit(e) {/*Here we need to pass what kind of advertisement option the player chose*/
    //   player.set("adQuality", e.target.adQuality)
    //   console.log("saved quality to player object")
    //   player.stage.set("submit", true);
    // }
    function handleSubmit(e, quality) {
      player.set("adQuality", quality);
      console.log("Saved quality to player object: ", quality, " ", player.id);
      player.stage.set("submit", true);
    }
    
    let product = <ProductLayout />;
  
    const isResultStage = stage.get("name") === "result";
  
    if (players.length > 1) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? (
              <>
                <div className="text-gray-500 text-2xl">You</div>
                <div className="border-b-3 border-blue-500/50 pb-2 mb-8">
                  {PlayerScore(player, () => {}, isResultStage)}
                </div>
              </>
            ) : null}
            {players
              .filter((p) => p.id !== player.id)
              .map((p) => PlayerScore(p, handleChange, isResultStage))}
          </div>
        </div>
      );
    } else if (players.length == 1 && isResultStage) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? PlayerScore(player, () => {}, isResultStage) : null}
          </div>
        </div>
      );
    }
    return (
      <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
        {/* <p>
          {isResultStage
            ? "Result"
            : "Determine the True Quality of the Product."}
        </p> */}
          <div style={{'font-size': '20px'}}>Your product is <b>Ordinary Toothpaste</b>. Choose how you want to advertise it. 
          <br/><br/>
          <b>Note: </b>You have the ability to make any kind of advertisement about this ordinary toothpaste in order to maximize your points.
          </div>
        <div className="flex justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
          <ProductLayout title="Ordinary Toothpaste" price="10" on_button_click={(e) => handleSubmit(e, "ordinary")}/>
          <div className="h-72 w-24 pb-6"></div>
          <ProductLayout title="Claim: Extraordinary Toothpaste offers Cavity Protection" price="15" on_button_click={(e) => handleSubmit(e, "extraordinary")}/> {/*Here we need to pass what kind of advertisement option the player chose*/ }
        </div>
            {/* {!isResultStage ? (
              <Slider
                value={player.round.get("quality_param")}
                onChange={handleChange}
                disabled={stage.get("name") !== "Answer"}
                max={3}
              />
            ) : null} */}
      
            
      </div>
    );
  }
  
  function ProductLayout({ title, imageUrl, price, quality, on_button_click }) {
    return (
      <div className="h-72 w-72 pb-6">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div className="flex">
          <h2 style={{'font-size': '20px'}}>{title}. 
          <br/>
          {price} points per unit sold</h2>
        </div>
        {/* <Button handleClick={on_button_click} adQuality={quality} primary>
          💸 Advertise
        </Button> */}
        <br/>
        <Button handleClick={on_button_click} primary>
          💸 Select this advertisement
            </Button>


      </div>
    );
  }
  
  function PlayerScore(player, onChange, isResultStage) {
    return (
      <div key={player.id} className="py-4">
        <div className="flex items-center space-x-6">
          <div className="h-12 w-12 shrink-0">
            <Avatar player={player} />
          </div>

          {isResultStage ? (
            <div className="flex flex-col items-center space-y-0.5">
              <div className="text-2xl font-semibold leading-none font-mono">
                {player.round.get("score") || 0}
              </div>
              <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
                Score
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    );
  }