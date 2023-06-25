// PS: I don't know how should work functionality with versus codes, but seems like should work like this

import React, { useState } from "react";
import "../styles/VersusScreen.css";
import { usePlayers } from "../context/PlayersContext.tsx";

const VersusScreen: React.FC = () => {
    const { player1, player2 } = usePlayers();

    const [inputValue, setInputValue] = useState("");
    const [icons, setIcons] = useState(Array.from(Array(6).keys()).map(() => ""));
    const [replaceBackground, setReplaceBackground] = useState(false)


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key.toUpperCase();
        const dictionary = ["Q", "W", "E", "R", "T", "Y"];

        if (dictionary.includes(key)) {
            const index = Math.min(inputValue.length, 5);
            const updatedIcons = [...icons];
            updatedIcons[index] = key;
            setIcons(updatedIcons);
            setInputValue((prevValue) => prevValue + key);
        }
        if (inputValue === "QWERTY") {
            const audio = new Audio("src/assets/music/prepare.mp3");
            audio.play();
        } else if (inputValue === "QWEQWE") {
            setReplaceBackground(true);
        }
    };


    return (
        <div className={`versus-screen ${replaceBackground ? "replaced" : ""}`} tabIndex={0} onKeyDown={handleKeyDown}>
            <h1 className="versus-title">
                BATTLE <br /> 1
            </h1>
            <div className="player-container">
                <div className="player-model">
                    <img
                        className="versus-model-image"
                        src={player1?.modelVersus || ""}
                        alt={player1?.name}
                    />
                </div>
                <div className="vs-label">
                    <h2>VS</h2>
                </div>
                <div className="player-model">
                    <img
                        className="versus-model-image"
                        src={player2?.modelVersus || ""}
                        alt={player2?.name}
                    />
                </div>
            </div>
            <div className="icons-container">
                {icons.map((item, index) =>
                    item ? (
                        <span className="replaced-icon" key={index}>
                            <span>{item}</span>
                        </span>
                    ) : (
                        <div className="icon" key={index}></div>
                    )
                )}
            </div>
        </div>
    );
};

export default VersusScreen;
