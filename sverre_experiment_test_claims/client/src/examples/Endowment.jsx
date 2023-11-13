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

  


  export function Endowment(){
    const player = usePlayer() //this hook call will define 'player'

    function onChange(e) {
        setSliderValue(e.target.value)
        setRemainingEndowmentPoints(startingEndowmentPoints - e.target.value)
      }


    const [startingEndowmentPoints, setStartingEndowmentPoints] = useState(10)
    const [remainingEndowmentPoints, setRemainingEndowmentPoints] = useState(10); // State for endowment points
    const [sliderValue, setSliderValue] = useState(0); // State to keep track of the slider's value
    

    return(
        <div>
            
            <h1>Endowment page</h1>

            <p>You will now select your quality preferences (utility funciton) for toothspase. Using your <b>10</b> endowment points.</p>
            
            <p>Select how to spend your endowment points here.</p>
            <p>You currently have <b>{remainingEndowmentPoints}</b> endowment points left</p>
            <br></br><br></br>

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