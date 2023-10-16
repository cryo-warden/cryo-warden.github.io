import { useGameEngine } from "Game/GameEngineContext";
import Button from "UI/Button";

const Self = () => {
  const engine = useGameEngine();

  const speak = () => {
    engine.executeAction({
      type: "speak",
      message: "Hello!",
    });
  };

  return (
    <div>
      Details and actions about the player character.
      <Button onClick={speak}>Say something.</Button>
    </div>
  );
};

export default Self;
