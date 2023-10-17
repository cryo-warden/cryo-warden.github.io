import { useDemoWorldContainer } from "../GameEngineContext";

const Self = () => {
  const { executeAction } = useDemoWorldContainer();

  const speak = () => {
    executeAction({
      type: "speak",
      message: ["Hello!"],
    });
  };

  return <div>Details and actions about the player character.</div>;
};

export default Self;
