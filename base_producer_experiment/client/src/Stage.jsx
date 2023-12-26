import {
    usePlayer,
    usePlayers,
    useRound,
} from "@empirica/core/player/classic/react";
import {Loading} from "@empirica/core/player/react";
import React from "react";
import {Advertisement} from "./pages/Advertise";
import {SalesResults} from "./pages/Results";

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

    console.log(`There were ${players.length} players in the game`)
    switch (round.get("task")) {
        case "advertise":
            return < Advertisement roundNumber={1}/>;
        case "results":
            return <SalesResults players={players}/>;
        case "advertise2":
            return <Advertisement roundNumber={2}/>;
        case "results2":
            return <SalesResults players={players}/>;
        case "advertise3":
            return <Advertisement roundNumber={3}/>;
        case "results3":
            return <SalesResults players={players}/>;
        case "advertise4":
            return <Advertisement roundNumber={4}/>;
        case "results4":
            return <SalesResults players={players}/>;
        default:
            return <div>Unknown task</div>;
    }
}
