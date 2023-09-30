import Log from './Log/Log';
import Focus from './Focus/Focus';
import Self from './Self/Self';
import Others from './Others/Others';

import './Game.css';
import { useState } from 'react';

// WIP Initialize game state and add it to a context.

const Game = () => {
  const [] = useState();
  const [game, setGame] = useState(null);

  return (
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
  );
};

export default Game;
