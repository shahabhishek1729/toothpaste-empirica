import {usePlayer} from "@empirica/core/player/classic/react";
import React, {useState} from "react";
import {Button} from "../components/Button";

export function Quality({roundNumber}) {
    const player = usePlayer();

    const roundID = `round${roundNumber}`;

    function handleSubmit() {
        console.log(`Proudction quality was ${player.get("productionQuality")}`)
        console.log(`Proudction cost was ${player.get("productionCost")}`)
        player.stage.set("submit", true);
    }

    function chooseLowQuality() {
        player.set("productionQuality", "low");
        player.set("productionCost", 5);
    }

    function chooseHighQuality() {
        player.set("productionQuality", "high");
        player.set("productionCost", 9);
    }

    const [selectedIdx, setSelectedIdx] = useState(-1);

    return (
        <div className="flex flex-col items-center" style={{marginTop: "20px"}}>
            <h1 style={{fontSize: "38px", fontStyle: "bold", fontFamily: "Futura"}}>Choose Quality</h1>
            <p style={{fontFamily: "Avenir", fontSize: "20px", marginTop: "20px"}}>You are a producer of toothpaste, and
                you may choose
                what quality you would like to produce.</p>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "20px",
                marginTop: "50px"
            }}>
                <div style={{cursor: "pointer"}} onClick={_ => {
                    setSelectedIdx(0);
                    chooseLowQuality();
                }}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#FA6B84",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "15px",
                        outline: selectedIdx === 0 ? "4px solid #FA6B84" : "none",
                        outlineOffset: "3px",
                        fontSize: "16px",
                        marginRight: "10px",
                        width: "370px"
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>Produce Low
                            Quality</h2>
                        <p style={{fontWeight: "lighter", fontFamily: "Avenir"}}>This will cost you <b>$5</b> to
                            produce,
                            and you
                            may advertise it as you wish.</p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpastestandard.jpg" alt="Low quality toothpaste"/>
                </div>
                <div style={{cursor: "pointer"}}
                     onClick={_ => {
                         setSelectedIdx(1);
                         chooseHighQuality();
                     }}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#00CDBB",
                        color: "#FFF",
                        // border: "none",
                        outline: selectedIdx === 1 ? "4px solid #00CDBB" : "none",
                        outlineOffset: "3px",
                        borderRadius: "15px",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginLeft: "10px",
                        width: "370px"
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>Produce High
                            Quality</h2>
                        <p style={{fontWeight: "lighter", fontFamily: "Avenir"}}>This will cost you <b>$9</b> to
                            produce,
                            and you
                            may advertise it as you wish.</p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpaseamazing.jpg" alt="Low quality toothpaste"/>
                </div>
            </div>

            <Button handleClick={handleSubmit} style={{paddingBottom: "100px"}}> Next Page →</Button>
        </div>
    );
}
