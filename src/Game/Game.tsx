import './Game.css';
import Log from './Log/Log';
import Focus from './Focus/Focus';
import Self from './Self/Self';
import Others from './Others/Others';
import { useMemo } from 'react';
import { createEngine } from 'GameEngine/Engine';
import { GameEngineContext } from './GameEngineContext';

const Game = () => {
  const engine = useMemo(() => createEngine(), []);

  return (
    <GameEngineContext.Provider value={engine}>
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
    </GameEngineContext.Provider >
  );
};

export default Game;
