import "./Game.css";
import Log from "./Log/Log";
import Focus from "./Focus/Focus";
import Self from "./Self/Self";
import Others from "./Others/Others";
import {
  DemoWorldContainerContext,
  useNewGameEngine,
} from "./GameEngineContext";

const Game = () => {
  const engine = useNewGameEngine();

  return (
    engine && (
      <DemoWorldContainerContext.Provider value={engine}>
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
      </DemoWorldContainerContext.Provider>
    )
  );
};

export default Game;
