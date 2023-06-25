import React, {useState, useEffect, KeyboardEvent, useRef} from 'react';
import '../styles/SelectCharacterScreen.css';
import {fighters} from "../data/mockFighters.ts";
import {usePlayers} from "../context/PlayersContext.tsx";

interface Fighter {
    id: number;
    name: string;
    avatar: string;
    modelSelect?: string;
    modelVersus?: string;
}

interface SelectScreen {
  changeScreen: () => void;
}


const SelectCharacterScreen: React.FC<SelectScreen> = ({changeScreen}) => {
    const {player1, player2, setPlayer2, setPlayer1} = usePlayers()
    const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

    const maxRows = 3;
    const maxColumns = 5;
    const fightersPerRow = maxColumns;

    const [row, setRow] = useState(1);
    const [column, setColumn] = useState(1);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case 'ArrowUp':
                setRow((prevRow) => (prevRow === 1 ? maxRows : prevRow - 1));
                break;
            case 'ArrowDown':
                setRow((prevRow) => (prevRow === maxRows ? 1 : prevRow + 1));
                break;
            case 'ArrowLeft':
                setColumn((prevColumn) => {
                    if (prevColumn === 1) {
                        return maxColumns; // Move to the last column of the previous row
                    } else if (row === 1 && prevColumn === 2) {
                        return maxColumns; // Move to the last column of the previous row when moving from the second column of the first row
                    } else {
                        return prevColumn - 1;
                    }
                });
                break;
            case 'ArrowRight':
                setColumn((prevColumn) => {
                    if (prevColumn === maxColumns) {
                        return prevColumn - (maxColumns - 1); // Move to the first column of the next row
                    } else if (row === maxRows && prevColumn === maxColumns - 1) {
                        return 1; // Move to the first column of the next row when moving from the second-to-last column of the last row
                    } else {
                        return prevColumn + 1;
                    }
                });
                break;
            case 'Enter':
                if (selectedFighter) {
                    if (!player1) {
                        setPlayer1(selectedFighter);
                    } else if (!player2 && selectedFighter !== player1) {
                        setPlayer2(selectedFighter);
                    }
                }
                break;
            default:
                break;
        }
    };

    const prevSelectedFighter = useRef<Fighter | null>(null);

    useEffect(() => {
        const selectedFighterIndex = (row - 1) * fightersPerRow + column - 1;
        const newSelectedFighter =
            selectedFighterIndex >= 0 && selectedFighterIndex < fighters.length
                ? fighters[selectedFighterIndex]
                : null;

        if (newSelectedFighter !== prevSelectedFighter.current) {
            setSelectedFighter(newSelectedFighter);
            prevSelectedFighter.current = newSelectedFighter;
        }


    }, [row, column, fighters, fightersPerRow]);

    useEffect(() => {
        if(player1 && player2) {
            setTimeout(changeScreen, 4000)
        }
    },[player1, player2])

    return (
        <div className="select-character-screen" autoFocus onKeyDown={handleKeyDown} tabIndex={0}>
            <div className="title">SELECT YOUR FIGHTERS</div>
            <div className="characters-container ">
                {player1 ? <img className="character-model" src={player1.avatar} alt={player1.name} /> : <div className="character-model"/>}
                <div className="character-grid">
                    {fighters.map((fighter) => (
                        <div
                            key={fighter.id}
                            className={`character ${selectedFighter?.name === fighter.name ? 'selected' : ''} ${
                                player1?.name === fighter.name || player2?.name === fighter.name ? 'chosen' : ''
                            }`}
                            onClick={() => setSelectedFighter(fighter)}
                        >
                            <img src={fighter.avatar} alt={fighter.name} className="character-avatar" />
                        </div>
                    ))}
                </div>
                {player2 ? <img src={player2.avatar} alt={player2.name} className="character-model" /> : <div className="character-model"/>}
            </div>
            <div className="zone">KOMBAT ZONE: SOUL CHAMBER</div>
        </div>
    );
};

export default SelectCharacterScreen;
