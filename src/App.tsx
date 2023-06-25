import SelectCharacterScreen from "./components/SelectCharacterScreen.tsx";
import { useState } from "react";
import VersusScreen from "./components/VersusScreen.tsx";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<"select" | "versus">(
    "select"
  );
  const changeScreen = () =>
    setCurrentScreen((prevState) =>
      prevState === "select" ? "versus" : "select"
    );
  return (
    <div>
      {currentScreen === "select" ? (
        <SelectCharacterScreen changeScreen={changeScreen} />
      ) : (
        <VersusScreen />
      )}
    </div>
  );
};

export default App;
