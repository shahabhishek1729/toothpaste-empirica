import React, {useState} from "react";
import {usePlayer} from "@empirica/core/player/classic/react";
import {Button} from "../components/Button";

export function Price({roundNumber}) {
    const player = usePlayer();

    const roundID = `round${roundNumber}`;

    function handleSubmit() {
        console.log(`Production price was ${player.get("priceOfProduct")}`)
        player.set(roundID.concat("_priceOfProduct"), selectedIdx === 0 ? 10 : 15);
        player.stage.set("submit", true);
    }

    const [selectedIdx, setSelectedIdx] = useState(-1);

    return (
        <div className="flex flex-col items-center" style={{marginTop: "20px"}}>
            <h1 style={{fontSize: "38px", fontStyle: "bold", fontFamily: "Futura"}}>Choose Price</h1>
            <p style={{fontFamily: "Avenir", fontSize: "20px", marginTop: "20px"}}>How much would you like to sell a
                single tube of toothpaste for?</p>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "20px",
                marginTop: "50px"
            }}>
                <div className="option" style={{cursor: "pointer"}} onClick={_ => setSelectedIdx(0)}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#FA6B84",
                        color: "#FFF",
                        border: "none",
                        outline: selectedIdx === 0 ? "4px solid #FA6B84" : "none",
                        outlineOffset: "3px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        marginRight: "10px",
                        width: "370px"
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>Sell for $10</h2>
                        <p style={{fontWeight: "lighter", fontFamily: "Avenir"}}>This is a price typical of <b>low
                            quality</b> toothpaste.
                        </p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpastestandard.jpg" alt="Low quality toothpaste"/>
                </div>
                <div style={{cursor: "pointer"}}
                     onClick={_ => setSelectedIdx(1)}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#00CDBB",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "15px",
                        outline: selectedIdx === 1 ? "4px solid #00CDBB" : "none",
                        outlineOffset: "3px",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginLeft: "10px",
                        width: "370px"
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>
                            Sell for $15</h2>
                        <p style={{fontWeight: "lighter", fontFamily: "Avenir"}}>This is a price typical of <b>high
                            quality</b> toothpaste.
                        </p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpaseamazing.jpg" alt="Low quality toothpaste"/>
                </div>
            </div>

            <Button handleClick={handleSubmit} style={{paddingBottom: "100px", marginBottom: "100px"}}> Next Page
                →</Button>
        </div>
    );
}
