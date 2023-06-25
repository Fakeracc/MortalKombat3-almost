import React, { useEffect, useState } from "react";
import "../styles/VersusScreen.css";
import { usePlayers } from "../context/PlayersContext.tsx";

const VersusScreen: React.FC = () => {
    const { player1, player2 } = usePlayers();

    const [inputValue, setInputValue] = useState("");
    const [icons, setIcons] = useState(Array.from(Array(6).keys()).map(() => ""));
    const [replaceBackground, setReplaceBackground] = useState(false)

    useEffect(() => {
        if (inputValue) {
            const inputText = inputValue.substring(0, 6);
            const updatedIcons = Array.from(inputText).map((char) => char);
            setIcons(updatedIcons);
        }
    }, [inputValue]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key.toUpperCase();
        const dictionary = ["Q", "W", "E", "R", "T", "Y"];

        if (dictionary.includes(key)) {
            const index = Math.min(inputValue.length - 2, 3);
            const updatedIcons = [...icons];
            updatedIcons.splice(index + 1, 1, key);
            setIcons(updatedIcons);
            setInputValue((prevValue) => prevValue + key);
        }
        if (inputValue === "QWERTY") {
            const audio = new Audio("src/assets/music/prepare.mp3")
            audio.play()
        } else if (inputValue === "QWEQWE") {
            setReplaceBackground(true)
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
                        <div className="replaced-icon" key={index}>
                            {item}
                        </div>
                    ) : (
                        <div className="icon" key={index}></div>
                    )
                )}
            </div>
        </div>
    );
};

export default VersusScreen;
