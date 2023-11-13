import {
  usePlayer,
  usePlayers,
  useRound,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Product } from "./examples/Product";
import { MineSweeper } from "./examples/MineSweeper";
import { Endowment } from "./examples/Endowment";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
        Please wait for other player(s).
      </div>
    );
  }

  switch (round.get("task")) {
    case "endowment_allocation":
      console.log("Rendering Endowment component");
      return <Endowment />
    case "jellybeans":
      return <Product />;
    case "minesweeper":
      return <MineSweeper />;
    default:
      return <div>Unknown task</div>;
  }
}
