import {
    Slider, useGame,
    usePlayer,
    usePlayers,
    useStage,
} from "@empirica/core/player/classic/react";
import React, {useState} from "react";
import {Button} from "../components/Button";
import "@empirica/core/player/classic/react";

export function Advertisement({roundNumber}) {
    const player = usePlayer();
    const roundNumberText = "round" + roundNumber;
    const game = useGame();

    const {warrantCost, warrantValue} = game.get("treatment");
    console.log(`The warrant cost was ${warrantCost}`)
    console.log(`The warrant value was ${warrantValue}`)

    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [warrantAdded, setWarrantAdded] = useState(false);

    function handleChange() {
        console.log("something happened");
    }

    function handleSubmit() {
        console.log("Player.stage set to true");

        player.set(roundNumberText.concat("_choices"), [
            player.get(roundNumberText.concat("_productionQuality")),
            player.round.get("advertisementQuality"),
            player.get(roundNumberText.concat("_priceOfProduct")),
            player.get(roundNumberText.concat("_productionCost")),
            warrantAdded ? warrantCost : 0
        ]);

        player.stage.set("submit", true); //player.stage.submit();
    }

    // const isResultStage = stage.get("name") === "result";

    // if (players.length > 1) {
    //     <div className="grid grid-cols-2 items-center">
    //         {/* {product} */}
    //         <div>
    //             {isResultStage ? (
    //                 <>
    //                     <div className="text-gray-500 text-2xl">You</div>
    //                     <div className="border-b-3 border-blue-500/50 pb-2 mb-8">
    //                         {PlayerScore(player, () => {
    //                         }, isResultStage)}
    //                     </div>
    //                 </>
    //             ) : null}
    //             {players
    //                 .filter((p) => p.id !== player.id)
    //                 .map((p) => PlayerScore(p, handleChange, isResultStage))}
    //         </div>
    //     </div>
    // } else if (players.length === 1 && isResultStage) {
    // product = (
    // <div className="grid grid-cols-2 items-center">
    //     {/* {product} */}
    //     <div>
    //         {isResultStage ? PlayerScore(player, () => {
    //         }, isResultStage) : null}
    //     </div>
    // </div>
    // );
    // }

    return (
        <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10 mt-10">
            <h1 style={{fontFamily: "Avenir", fontSize: "18px"}}>
                <b>Choose how you want to advertise it.</b> All your products will be
                advertised this way.
            </h1>
            <p style={{fontFamily: "Avenir", maxWidth: "800px", textAlign: "center"}}>
                When people are buying, they will only know the price and the advertised
                quality. They will not know the true quality until they have bought the
                product, by which point no returns will be accepted. You have the ability to make <em>any kind of
                advertisement</em> about your product in order to maximize your sales.
            </p>
            {player.round.get("advertisementQuality") ?
                <p style={{fontFamily: "Avenir"}}>Your current choice is to advertise your product as:{" "}
                    <b>{player.round.get("advertisementQuality")} </b> quality toothpaste.</p> : null}

            <div className="container"
                 style={{
                     display: "flex",
                     justifyContent: "space-around",
                     alignItems: "center",
                     margin: "20px",
                     marginTop: "50px"
                 }}>
                <div className="option" style={{cursor: "pointer"}} onClick={_ => {
                    setSelectedIdx(0);
                    player.round.set("advertisementQuality", "low");
                }}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#FA6B84",
                        color: "#FFF",
                        outline: selectedIdx === 0 ? "4px solid #FA6B84" : "none",
                        outlineOffset: "3px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        marginRight: "10px",
                        width: "370px",
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>Advertise as Low
                            Quality</h2>
                        <p style={{fontWeight: "normal", fontFamily: "Avenir"}}>This ad will be shown
                            to <b>{(warrantAdded ? warrantValue : 100) + " "}
                                viewers</b>,
                            of which a subset may decide to buy your product.</p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpastestandard.jpg" alt="Low quality toothpaste"/>
                </div>
                <div className="option" style={{cursor: "pointer"}} onClick={_ => {
                    setSelectedIdx(1);
                    player.round.set("advertisementQuality", "high");
                }}>
                    <div className="option" style={{
                        textAlign: "center", padding: "20px",
                        backgroundColor: "#00CDBB",
                        color: "#FFF",
                        borderRadius: "20px",
                        outline: selectedIdx === 1 ? "4px solid #00CDBB" : "none",
                        outlineOffset: "3px",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginLeft: "10px",
                        width: "370px"
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>Advertise as High
                            Quality</h2>
                        <p style={{fontWeight: "normal", fontFamily: "Avenir"}}>This ad will be shown
                            to <b>{(warrantAdded ? warrantValue : 100) + " "}
                                viewers</b>,
                            of which a subset may decide to buy your product.</p>
                    </div>
                    <img
                        style={{width: "350px"}}
                        src="/images/toothpaseamazing.jpg" alt="Low quality toothpaste"/>
                </div>
            </div>
            {/*<div className="flex justify-center space-x-4">*/}
            {/*    /!* This flex container will lay out its children (products) in a row *!/*/}
            {/*    <AdvertisementAlternative*/}
            {/*        title="Standard Toothpaste (low quality)"*/}
            {/*        quality="low"*/}
            {/*        imageUrl={"url(/images/toothpastestandard.jpg)"}*/}
            {/*        on_button_click={(e) => handleAdverisementChoice(e, "low")}*/}
            {/*    />*/}
            {/*    <AdvertisementAlternative*/}
            {/*        title="Amazing Toothpaste (high quality)"*/}
            {/*        quality="high"*/}
            {/*        imageUrl={"url(/images/toothpaseamazing.jpg)"}*/}
            {/*        on_button_click={(e) => handleAdverisementChoice(e, "high")}*/}
            {/*    />*/}
            {/*</div>*/}
            {NLineBreaks(0)}
            <div className={"flex justify-center space-x-4"}>
                <h1 style={{fontFamily: "Avenir", maxWidth: "800px", textAlign: "center"}}>You also have the option to
                    add
                    a
                    warrant to your
                    advertisement; by choosing to warrant your
                    advertisement, you are putting up ${warrantCost} claiming that the advertisement is true
                    and
                    should be shared to {warrantValue} viewers (instead of 100 without a
                    warrant).
                    Anyone, including a competitor, could challenge this
                    warrant if your ad's claims are false. If the warrant is challenged and the ad is found to be false,
                    the warrant will be revoked and the money spent on it will be lost.</h1>
                <br/>
            </div>
            <div>
                <div className="container" style={{
                    cursor: "pointer",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingBottom: "20px",
                    paddingTop: "5px",
                    outline: warrantAdded ? "3px solid #6688FF" : "1px solid #AAAAAA",
                    outlineOffset: "3px",
                    borderRadius: "15px",
                }} onClick={_ => setWarrantAdded(!warrantAdded)}>
                    <input
                        style={{
                            borderRadius: "999px",
                            cursor: "pointer"
                        }}
                        type="checkbox"
                        id="addWarrant"
                        checked={warrantAdded}
                        readOnly={true}
                    />
                    <div className="option" style={{
                        textAlign: "center",
                        color: "#000",
                        fontSize: "16px",
                        marginRight: "10px",
                        width: "370px",
                    }}>
                        <h2 style={{fontWeight: "bold", fontFamily: "Avenir", fontSize: "24px"}}>
                            Warrant my Advertisement</h2>
                        <p style={{fontWeight: "normal", fontFamily: "Avenir"}}>This will cost
                            you <b>${warrantCost}</b>, but if
                            selected, this ad will be shown
                            to <b>{warrantValue} viewers</b>, as opposed to 100 viewers without a warrant.</p>
                    </div>
                </div>
            </div>
            <ProfitMarginCalculation producerPlayer={player} warrantAdded={warrantAdded} warrantCost={warrantCost}
                                     roundStr={roundNumberText}/>
            <Button handleClick={e => handleSubmit(e)}> Go to market (next round) </Button>
            <br/>
        </div>
    );
}

function ProfitMarginCalculation({producerPlayer, warrantAdded, warrantCost, roundStr}) {
    let profit =
        producerPlayer.get(roundStr.concat("_priceOfProduct")) -
        producerPlayer.get(roundStr.concat("_productionCost"));
    if (warrantAdded) {
        return (
            <div>
                <p style={{fontFamily: "Avenir", maxWidth: "800px", textAlign: "center"}}>
                    You have chosen to produce{" "}
                    <b>{producerPlayer.get(roundStr.concat("_productionQuality"))}</b> quality
                    toothpaste and advertise it as{" "}
                    <b>{producerPlayer.round.get(roundStr.concat("_advertisementQuality"))}</b> quality
                    toothpaste
                    <b> charging ${producerPlayer.get(roundStr.concat("_priceOfProduct"))}</b>.
                    This gives a <b>profit of ${profit}</b> per product sold.
                    You have also put up a <b>warrant of
                    ${warrantCost}</b>, claiming that your
                    advertisement is true and should be shown
                    to <b>{~~(producerPlayer.round.get("warrant") / 5) + 100 + " "}viewers</b>.</p>

            </div>
        );
    } else {
        return (
            <div>
                <p style={{fontFamily: "Avenir", maxWidth: "800px", textAlign: "center"}}>
                    You have chosen to produce{" "}
                    <b>{producerPlayer.get(roundStr.concat("_productionQuality"))}</b> quality
                    toothpaste and advertise it as{" "}
                    <b>{producerPlayer.round.get(roundStr.concat("_advertisementQuality"))}</b> quality
                    toothpaste
                    <b> charging ${producerPlayer.get(roundStr.concat("_priceOfProduct"))}</b>.
                    This gives a <b>profit of ${profit}</b> per product sold.</p>
            </div>);
    }
}

function NLineBreaks(n) {
    return [...Array(n).keys()].map(item => <br/>)
}
