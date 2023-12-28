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

    switch (round.get("task")) {
        case "quality":
            return < Quality roundNumber={1}/>;
        case "advertise":
            return <Advertisement roundNumber={1}/>;
        case "results":
            return <SalesResults players={players}/>;
        case "quality2":
            return < Quality roundNumber={2}/>;
        case "advertise2":
            return <Advertisement roundNumber={1}/>;
        case "results2":
            return <SalesResults players={players}/>;
        case "quality3":
            return < Quality roundNumber={3}/>;
        case "advertise3":
            return <Advertisement roundNumber={1}/>;
        case "results3":
            return <SalesResults players={players}/>;
        case "quality4":
            return < Quality roundNumber={4}/>;
        case "advertise4":
            return <Advertisement roundNumber={1}/>;
        case "results4":
            return <SalesResults players={players}/>;
        default:
            return <div>Unknown task</div>;
    }
}
