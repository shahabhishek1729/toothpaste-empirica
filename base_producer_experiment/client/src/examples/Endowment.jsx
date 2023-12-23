import {
    Slider,
    usePlayer,
    usePlayers,
    useStage,
  } from "@empirica/core/player/classic/react";
  //import React from "react";
  import { Avatar } from "../components/Avatar";
  import { Button } from "../components/Button";
  import "../../node_modules/@empirica/core/dist/player-classic-react.css";
  import React, { useState, useEffect } from "react";

  
  //const [utilityPreferences, setutilityPreferences] = useState([0,0,0]);

  export function Endowment(){
    const player = usePlayer() //this hook call will define 'player'

    function onChange(e) {
        setSliderValue(e.target.value)
        setRemainingEndowmentPoints(startingEndowmentPoints - e.target.value)
        player.round.set("guess")
      }


    const [startingEndowmentPoints, setStartingEndowmentPoints] = useState(10)
    const [remainingEndowmentPoints, setRemainingEndowmentPoints] = useState(10); // State for endowment points
    const [sliderValue, setSliderValue] = useState(0); // State to keep track of the slider's value
    

    return(
        <div>
            <br /><br /><br />
            <h1><b>Endowment page</b></h1>
            <br></br>
            <br></br>

            <p>You will now select your quality preferences (utility funciton) for toothpaste. Using your <b>10</b> endowment points.</p>

            <p>Select how to spend your endowment points here. <br/>You currently have <b>{remainingEndowmentPoints}</b> endowment points left.</p>
            <br></br><br></br>

            <p><b> Your preference for durability for this product</b></p>

            <div className="h-48 w-48 pb-6">
                    <div
                        className="h-full w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage:"url(https://upload.wikimedia.org/wikipedia/commons/4/49/Toothpasteonbrush.jpg)",}}
            alt="Jelly Beans Pile"
            />
            </div>
            <br />
            <b> Performance </b>
            <br />
            <br />
            <br />
            <Slider
            value={sliderValue}
            onChange={onChange}
            disabled={false}
            min={0}
            max={5}
            />

        </div>
        
    )
  }