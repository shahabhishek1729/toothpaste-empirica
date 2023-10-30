import React from "react";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";

export function Result() {
  const player = usePlayer();
  const players = usePlayers();
  const opponent = players.filter((p) => p.id !== player.id)[0];

  return (
    <div>
      <p>{`You chose: ${player.round.get("decision")}`}</p>
      <p>{`Your partner chose: ${opponent?.round?.get("decision")}`}</p>
      <br />
      <p>{`You get ${player.round.get("score")} months in jail!`}</p>
      <Button handleClick={() => player.stage.set("submit", true)}>
        Play Again
      </Button>
    </div>
  );
}
