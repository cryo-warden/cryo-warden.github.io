import "./Game.css";
import Log from "./Log/Log";
import Focus from "./Focus/Focus";
import Self from "./Self/Self";
import Others from "./Others/Others";
import { UIStateContext, useNewUIState } from "./UIState/UIState";

const Game = () => {
  const uiState = useNewUIState();

  return (
    <UIStateContext.Provider value={uiState}>
      <div className="Game">
        <div className="log">
          <Log />
        </div>
        <div className="focus">
          <Focus />
        </div>
        <div className="self">
          <Self />
        </div>
        <div className="others">
          <Others />
        </div>
      </div>
    </UIStateContext.Provider>
  );
};

export default Game;
