import React from 'react';
import '../styles/VersusScreen.css';
import {usePlayers} from "../context/PlayersContext.tsx";



const VersusScreen: React.FC = () => {
    const {player1, player2} = usePlayers()
    return (
        <div className="versus-screen">
            <h1 className="versus-title">BATTLE <br/> 1</h1>
            <div className="player-container">
                <div className="player-model">
                    <img className="versus-model-image" src={player1?.modelVersus || ""} alt={player1?.name} />
                </div>
                <div className="vs-label">
                    <h2>VS</h2>
                </div>
                <div className="player-model">
                    <img className="versus-model-image" src={player2?.modelVersus || ""} alt={player2?.name} />
                </div>
            </div>
            <div className="icons-container">
                {Array.from(Array(6).keys()).map(() => <div className="icon"></div>)}
            </div>
        </div>
    );
};

export default VersusScreen;
