import Game from "./components/Game/Game";

import "./App.css";
import { Rect } from "general/DevGraphics/Rect";

const App = () => (
  <div className="App">
    <div className="body">
      <Rect />
      <Game />
    </div>
    <div className="header">cryo warden, work in progress site</div>
    <div className="footer"></div>
  </div>
);

export default App;
