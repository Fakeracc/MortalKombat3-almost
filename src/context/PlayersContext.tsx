import { Fighter } from "../types/fighter.ts";
import React, { createContext, useContext, useState } from "react";

interface IPlayersContext {
  player1: Fighter | null;
  player2: Fighter | null;
  setPlayer1: (fighter: Fighter) => void;
  setPlayer2: (fighter: Fighter) => void;
}

interface PlayersProviderProps {
    children: React.ReactNode
}

const PlayersContext = createContext<IPlayersContext>({
  player1: null,
  player2: null,
  setPlayer1: () => console.log("implement context for getting player1"),
  setPlayer2: () => console.log("implement context for getting player2"),
});

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined)
    throw new Error("usePlayers must be used within PlayersProvider");
  return context;
};

const PlayersProvider: React.FC<PlayersProviderProps> = ({ children }) => {
  const [player1, setPlayer1] = useState<Fighter | null>(null);
  const [player2, setPlayer2] = useState<Fighter | null>(null);

  const value = {
    player1,
    player2,
    setPlayer1,
    setPlayer2,
  };

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export default PlayersProvider;
