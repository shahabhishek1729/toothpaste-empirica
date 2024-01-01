import {
    usePlayer,
    usePlayers,
    useRound,
} from "@empirica/core/player/classic/react";
import {Loading} from "@empirica/core/player/react";
import React from "react";
import {Advertisement} from "./pages/Advertise";
import {SalesResults} from "./pages/Results";
import {Quality} from "./pages/Quality";
import {Price} from "./pages/Price";

export function Stage() {
    const player = usePlayer();
    const players = usePlayers();
    const round = useRound();

    if (player.stage.get("submit")) {
        if (players.length === 1) {
            return <Loading/>;
        }
        return (
            <div className="text-center text-gray-400 pointer-events-none">
                Please wait for other player(s).
            </div>
        );
    }

    const task = round.get("task");
    const lastChar = task.slice(-1);
    const taskName = isNaN(lastChar) ? task : task.slice(0, task.length - 1);
    const roundNumber = isNaN(lastChar) ? 1 : parseInt(lastChar);

    switch (taskName) {
        case "quality":
            return < Quality roundNumber={roundNumber}/>;
        case "advertise":
            return <Advertisement roundNumber={roundNumber}/>;
        case "price":
            return <Price roundNumber={roundNumber}/>
        case "results":
            return <SalesResults players={players} roundNumber={roundNumber}/>;
        default:
            return <div>Unknown task</div>;
    }
}
